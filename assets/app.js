(function () {
  const grid = document.getElementById('grid');
  const P = window.PROJECTS;
  const src = (p, i) => `assets/shots/${p.slug}/${i}.webp`;

  function shot(p, i, cls) {
    return `<div class="shot ${cls || ''}" data-slug="${p.slug}" data-i="${i}"><img loading="lazy" src="${src(p, i)}" alt="${p.title}, screen ${i}"></div>`;
  }

  function card(p, n) {
    const media = p.kind === 'app'
      ? `<div class="phones">${[4, 1, 2, 3].map((i) => shot(p, i)).join('')}</div>`
      : `${shot(p, 1, 'main')}<div class="thumbs">${shot(p, 2)}${shot(p, 3)}${shot(p, 4, 'mob')}</div>`;
    return `<article class="card ${p.kind}" data-group="${p.group}">
      <div class="shots">${media}</div>
      <div class="body">
        <div class="meta"><span class="role">${p.role}</span><span class="num">${String(n).padStart(2, '0')}</span></div>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <a class="live" href="${p.url}" target="_blank" rel="noopener">View live</a>
      </div>
    </article>`;
  }

  grid.innerHTML = P.map((p, i) => card(p, i + 1)).join('');
  document.getElementById('s-projects').textContent = P.length;

  document.querySelectorAll('.filters button').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach((x) => x.classList.toggle('on', x === b));
    const f = b.dataset.f;
    grid.querySelectorAll('.card').forEach((c) => { c.style.display = f === 'all' || c.dataset.group === f ? '' : 'none'; });
  }));

  // Ads rows
  const A = window.ADS;
  const max = Math.max(...A.best.map((r) => r.leads));
  document.getElementById('ads-rows').innerHTML = A.best.map((r) => `
    <div class="ad-row"><span>${r.label}</span><div class="bar"><i style="width:${(r.leads / max) * 100}%"></i></div>
    <span class="v"><b>${r.leads}</b> leads · $${r.cpl.toFixed(2)}</span></div>`).join('');

  // Lightbox
  const lb = document.getElementById('lb');
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-cap');
  let cur = null, idx = 1;
  function show() { img.src = src(cur, idx); cap.textContent = `${cur.title} · ${idx} of 4`; }
  function open(slug, i) { cur = P.find((p) => p.slug === slug); idx = +i; show(); lb.hidden = false; document.body.style.overflow = 'hidden'; }
  function close() { lb.hidden = true; document.body.style.overflow = ''; }
  function step(d) { idx = ((idx - 1 + d + 4) % 4) + 1; show(); }
  grid.addEventListener('click', (e) => { const s = e.target.closest('.shot'); if (s) open(s.dataset.slug, s.dataset.i); });
  lb.querySelector('.lb-x').onclick = close;
  lb.querySelector('.prev').onclick = () => step(-1);
  lb.querySelector('.next').onclick = () => step(1);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
})();
