// Builds one shareable page per project (work/<slug>/index.html) from assets/projects.js,
// plus an HTML card per project that render-og.sh turns into the LinkedIn preview image.
// Run: node scripts/build-pages.mjs && sh scripts/render-og.sh
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SITE = 'https://khalidusa.github.io/portfolio';

const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'assets/projects.js'), 'utf8'), ctx);
const P = ctx.window.PROJECTS;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const urlSlug = (p) => p.title.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Short, plain description for link previews (LinkedIn shows about 150 characters).
const blurb = (p) => {
  const first = p.summary.split(/(?<=\.)\s/)[0];
  return first.length > 160 ? first.slice(0, 157).replace(/\s\S*$/, '') + '...' : first;
};

// Short hash of the preview image, so LinkedIn fetches a fresh copy whenever the image changes.
const ogVersion = (slug) => {
  const f = path.join(ROOT, 'assets/og', `${slug}.jpg`);
  return fs.existsSync(f) ? crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex').slice(0, 8) : '1';
};

function page(p, i) {
  const slug = urlSlug(p);
  const prev = P[(i - 1 + P.length) % P.length];
  const next = P[(i + 1) % P.length];
  const shots = [1, 2, 3, 4];
  const isApp = p.kind === 'app';
  const points = p.points ? `<ul class="pp-points">${p.points.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : '';
  const note = '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)} | Khalid Dhannoon</title>
<meta name="description" content="${esc(blurb(p))}">
<meta name="author" content="Khalid Dhannoon">
<link rel="canonical" href="${SITE}/work/${slug}/">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Khalid Dhannoon, Marketing and Web Portfolio">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(blurb(p))}">
<meta property="og:url" content="${SITE}/work/${slug}/">
<meta property="og:image" content="${SITE}/assets/og/${slug}.jpg?v=${ogVersion(slug)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="627">
<meta property="og:image:alt" content="${esc(p.title)}: screenshot of the project">
<meta name="twitter:card" content="summary_large_image">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#000000">
<link rel="stylesheet" href="../../assets/styles.css">
</head>
<body>
<header class="top">
  <div class="wrap top-in">
    <a class="mark" href="../../">Khalid Dhannoon</a>
    <nav>
      <a href="../../#work">All work</a>
      <a href="../../#contact" class="nav-cta">Contact</a>
    </nav>
  </div>
</header>
<main class="wrap pp">
  <a class="pp-back" href="../../#work">&larr; All projects</a>
  <div class="pp-head">
    <span class="role">${esc(p.role)}</span>
    <h1>${esc(p.title)}</h1>
    <p class="pp-lede">${esc(p.summary)}</p>
    ${points}
    <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
    ${note}
  </div>
  <div class="pp-shots${isApp ? ' app' : ''}">
    ${shots.map((n) => `<figure><img src="../../assets/shots/${p.slug}/${n}.webp" alt="${esc(p.title)}, screen ${n}" loading="${n === 1 ? 'eager' : 'lazy'}"></figure>`).join('\n    ')}
  </div>
  <nav class="pp-nav" aria-label="More projects">
    <a href="../${urlSlug(prev)}/"><small>Previous</small>${esc(prev.title)}</a>
    <a href="../${urlSlug(next)}/" class="nx"><small>Next</small>${esc(next.title)}</a>
  </nav>
  <section class="pp-cta">
    <h2>Have a project in mind?</h2>
    <p class="pp-lede">I can build something like this for you.</p>
    <div class="cta-row">
      <a class="btn" href="mailto:khaliddhannoon@hotmail.com?subject=Project%20inquiry">Start a project</a>
      <a class="btn dark" href="https://www.linkedin.com/in/khalid-dhannoon/" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </section>
</main>
<footer class="wrap foot">&copy; 2026 Khalid Dhannoon</footer>
</body>
</html>
`;
}

// 1200x627 preview card: title on the left, the first screenshot on the right.
function ogCard(p) {
  const isApp = p.kind === 'app';
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;background:#000}
  .c{position:relative;width:1200px;height:627px;overflow:hidden;background:#000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased}
  .g{position:absolute;border-radius:50%;filter:blur(90px)}
  .a{width:620px;height:460px;right:-60px;top:-180px;background:rgba(124,92,255,.55)}
  .b{width:520px;height:380px;left:-120px;bottom:-240px;background:rgba(76,150,255,.30)}
  .t{position:absolute;left:64px;top:0;bottom:0;width:430px;display:flex;flex-direction:column;justify-content:center}
  .k{font-size:18px;color:rgba(255,255,255,.6);margin-bottom:18px}
  h1{margin:0;font-size:54px;line-height:1.04;font-weight:600;letter-spacing:-.04em}
  .tg{margin-top:26px;display:flex;flex-wrap:wrap;gap:8px}
  .tg span{font-size:16px;color:rgba(255,255,255,.75);background:#171718;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);padding:6px 12px;border-radius:8px}
  .n{position:absolute;left:64px;bottom:44px;font-size:17px;color:rgba(255,255,255,.5)}
  .s{position:absolute;right:-40px;top:70px;width:680px;border-radius:16px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,.16),0 40px 80px -30px rgba(124,92,255,.6)}
  .s img{display:block;width:100%;height:487px;object-fit:cover;object-position:top}
  .s.app{width:640px}
  </style></head><body><div class="c">
  <div class="g a"></div><div class="g b"></div>
  <div class="t"><div class="k">${esc(p.role)}</div><h1>${esc(p.title)}</h1>
  <div class="tg">${p.tags.slice(0, 3).map((t) => `<span>${esc(t)}</span>`).join('')}</div></div>
  <div class="n">Khalid Dhannoon &middot; Marketing &amp; Web</div>
  <div class="s${isApp ? ' app' : ''}"><img src="file://${ROOT}/assets/shots/${p.slug}/1.webp"></div>
  </div></body></html>`;
}

const ogTmp = path.join(ROOT, 'tools/og-src');
fs.mkdirSync(ogTmp, { recursive: true });
fs.mkdirSync(path.join(ROOT, 'assets/og'), { recursive: true });
const list = [];
P.forEach((p, i) => {
  const slug = urlSlug(p);
  const dir = path.join(ROOT, 'work', slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(p, i));
  fs.writeFileSync(path.join(ogTmp, `${slug}.html`), ogCard(p));
  list.push(`${p.slug} ${slug}`);
});
fs.writeFileSync(path.join(ogTmp, 'list.txt'), list.join('\n') + '\n');
console.log(list.join('\n'));
