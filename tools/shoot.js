// Takes 4 screenshots per site: desktop hero, two desktop sections (or sub-pages), and mobile.
// Usage: node shoot.js [slug ...]   (no args = all sites)
const puppeteer = require('puppeteer-core');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sites = require('./sites.json');
const OUT = path.join(__dirname, '..', 'assets', 'shots');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  } catch {
    // Some sites keep a socket open; take what has rendered.
  }
  await sleep(2500);
  // Hide common popups and chat bubbles so they don't cover the work.
  await page.addStyleTag({
    content: `[id*="cookie" i],[class*="cookie" i],[class*="consent" i],iframe[src*="chat" i],[id*="chat-widget" i],[class*="chat-widget" i]{display:none!important}`,
  }).catch(() => {});
}


// Hides company names: brand words in text, inputs, logos in header/nav/footer, and images marked as logos.
const BRAND = /(vance\s*credit|vancecredit(\.com)?|\bvance\b|green\s*light(\s*recover)?|greenlightrecover|veridex(\s*mobility)?|ez\s*rentals?(\s*(&|and)\s*leasing)?|ezrentalsandleasing|ez\s*tow(\s*now)?|eztownow|\btow\s*now\b|driveezmd|\bEZ\b|gtac(\s*finance)?|gtacfinance|great times are coming|alina|somados|سومادوس|mody(\s*car\s*wash)?|modycarwash)/gi;
async function hideBrand(page) {
  await page.evaluate((src, flags) => {
    const re = new RegExp(src, flags);
    if (!document.getElementById('kb-st')) {
      const st = document.createElement('style'); st.id = 'kb-st';
      // Stylesheet rules survive framework re-renders that wipe added classes.
      st.textContent = '.kb,img[src*="logo" i],img[alt*="logo" i],[class*="logo" i] img,[class*="logo" i] svg,header img,nav img,footer img{filter:blur(7px)!important}';
      document.head.appendChild(st);
    }
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const hits = [];
    let n; while ((n = w.nextNode())) { re.lastIndex = 0; if (re.test(n.nodeValue) && n.parentElement && !n.parentElement.closest('script,style')) hits.push(n); }
    for (const t of hits) {
      const frag = document.createDocumentFragment(); let last = 0; const v = t.nodeValue; re.lastIndex = 0; let m;
      while ((m = re.exec(v))) { frag.append(v.slice(last, m.index)); const s = document.createElement('span'); s.className = 'kb'; s.textContent = m[0]; frag.append(s); last = m.index + m[0].length; }
      frag.append(v.slice(last)); t.replaceWith(frag);
    }
    document.querySelectorAll('input,textarea').forEach((i) => { re.lastIndex = 0; if (re.test(i.value)) i.classList.add('kb'); });
    const logoSel = 'header img, header svg, nav img, nav svg, footer img, footer svg, [class*="logo" i], [id*="logo" i], [class*="brand" i] img, [class*="brand" i] svg, img[alt*="logo" i], img[src*="logo" i], a[href="/"] img, a[href="./"] img, a[href="index.html"] img';
    document.querySelectorAll(logoSel).forEach((e) => { const r = e.getBoundingClientRect(); if (r.width < 400 && r.height < 200) e.classList.add('kb'); });
    // Any small image or icon in the top band of the page is almost always the logo.
    document.querySelectorAll('img, svg, picture').forEach((e) => { const r = e.getBoundingClientRect(); const top = r.top + window.scrollY; if (top < 130 && r.width > 12 && r.width < 280 && r.height < 130 && r.left < window.innerWidth * 0.45) e.classList.add('kb'); });
    document.querySelectorAll('img').forEach((i) => { re.lastIndex = 0; if (re.test((i.alt || '') + ' ' + (i.src || '').split('/').pop())) i.classList.add('kb'); });
    // Video embeds show the channel and title in their top bar; cover it with a blur strip.
    document.querySelectorAll('iframe').forEach((f) => {
      const r = f.getBoundingClientRect(); if (r.width < 120) return;
      const d = document.createElement('div');
      d.style.cssText = `position:absolute;left:${r.left + window.scrollX}px;top:${r.top + window.scrollY}px;width:${r.width}px;height:${Math.min(80, r.height)}px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);z-index:2147483647;pointer-events:none`;
      document.body.appendChild(d);
    });
    // Inline !important beats any site CSS that resets filter on logos.
    document.querySelectorAll('.kb, img[src*="logo" i], img[alt*="logo" i], [class*="logo" i] img, [class*="logo" i] svg, header img, nav img, footer img').forEach((e) => e.style.setProperty('filter', 'blur(7px)', 'important'));
    document.title = 'Portfolio';
  }, BRAND.source, BRAND.flags).catch(() => {});
  await sleep(300);
}

async function save(buf, file) {
  await sharp(buf).resize({ width: 1440, withoutEnlargement: true }).webp({ quality: 78 }).toFile(file);
}

async function shoot(browser, site) {
  const dir = path.join(OUT, site.slug);
  fs.mkdirSync(dir, { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const views = site.views || [
    { url: site.url, scroll: 0 },
    { url: site.url, scroll: 1 },
    { url: site.url, scroll: 2.2 },
  ];
  let i = 1;
  for (const v of views.slice(0, 3)) {
    await open(page, v.url);
    if (v.js) {
      await page.evaluate(v.js).catch(() => {});
      await sleep(1200);
    }
    if (v.scroll) {
      await page.evaluate((s) => window.scrollTo(0, Math.round(window.innerHeight * s)), v.scroll);
      await sleep(1200);
    }
    await hideBrand(page);
    await save(await page.screenshot({ type: 'png' }), path.join(dir, `${i++}.webp`));
  }

  const m = await browser.newPage();
  await m.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
  await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await open(m, site.mobileUrl || site.url);
  await hideBrand(m);
  await sharp(await m.screenshot({ type: 'png' })).resize({ width: 780 }).webp({ quality: 78 }).toFile(path.join(dir, '4.webp'));
  await m.close();
  await page.close();
  console.log('ok', site.slug);
}

(async () => {
  const only = process.argv.slice(2);
  for (const s of sites.filter((s) => !only.length || only.includes(s.slug))) {
    // Fresh browser per site: one heavy page can take the whole browser down.
    const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars'] });
    try { await shoot(browser, s); } catch (e) { console.log('FAIL', s.slug, e.message); }
    await browser.close().catch(() => {});
  }
})();
