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
    await save(await page.screenshot({ type: 'png' }), path.join(dir, `${i++}.webp`));
  }

  const m = await browser.newPage();
  await m.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
  await m.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await open(m, site.mobileUrl || site.url);
  await sharp(await m.screenshot({ type: 'png' })).resize({ width: 780 }).webp({ quality: 78 }).toFile(path.join(dir, '4.webp'));
  await m.close();
  await page.close();
  console.log('ok', site.slug);
}

(async () => {
  const only = process.argv.slice(2);
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars'] });
  for (const s of sites.filter((s) => !only.length || only.includes(s.slug))) {
    try { await shoot(browser, s); } catch (e) { console.log('FAIL', s.slug, e.message); }
  }
  await browser.close();
})();
