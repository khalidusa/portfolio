(function () {
  const grid = document.getElementById('grid');
  const P = window.PROJECTS;
  const src = (p, i) => `assets/shots/${p.slug}/${i}.webp`;

  function shot(p, i, cls) {
    return `<div class="shot ${cls || ''}" data-slug="${p.slug}" data-i="${i}"><img loading="lazy" src="${src(p, i)}" alt="${p.title}, screen ${i}"></div>`;
  }

  function media(p) {
    if (p.kind === 'app') return `<div class="phones">${[4, 1, 2, 3].map((i) => shot(p, i)).join('')}</div>`;
    if (p.kind === 'portal') return `${shot(p, 1, 'main')}<div class="thumbs even">${shot(p, 2)}${shot(p, 3)}${shot(p, 4)}</div>`;
    return `${shot(p, 1, 'main')}<div class="thumbs">${shot(p, 2)}${shot(p, 3)}${shot(p, 4, 'mob')}</div>`;
  }

  function card(p) {
    const kindCls = p.kind === 'app' ? 'app' : 'site';
    const points = p.points ? `<ul class="points">${p.points.map((t) => `<li>${t}</li>`).join('')}</ul>` : '';
    const link = p.url
      ? `<a class="live" href="${p.url}" target="_blank" rel="noopener">View live</a>`
      : `<span class="private">Private internal tool. Screens use blurred sample data.</span>`;
    return `<article class="card ${kindCls}${p.feature ? ' feature' : ''}" data-group="${p.group}">
      <div class="shots">${media(p)}</div>
      <div class="body">
        <span class="role">${p.role}</span>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        ${points}
        <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        ${link}
      </div>
    </article>`;
  }

  grid.innerHTML = P.map(card).join('');
  document.getElementById('s-projects').textContent = P.length;

  // Filters
  const tabs = document.querySelectorAll('.filters button');
  tabs.forEach((b) => b.addEventListener('click', () => {
    tabs.forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
    const f = b.dataset.f;
    grid.querySelectorAll('.card').forEach((c) => { c.style.display = f === 'all' || c.dataset.group === f ? '' : 'none'; });
  }));

  // Best campaigns
  document.getElementById('ads-rows').innerHTML = window.ADS.best.map((r) => `
    <div><span class="lbl">${r.label}</span><span class="n">${r.leads} leads</span><span class="c"><strong>$${r.cpl.toFixed(2)}</strong> per lead</span></div>`).join('');

  // Scroll reveal
  const els = document.querySelectorAll('.reveal, .card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('in'));
  }

  // Lightbox
  const lb = document.getElementById('lb');
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-cap');
  let cur = null, idx = 1;
  function show() { img.src = src(cur, idx); cap.textContent = `${cur.title}, ${idx} of 4`; }
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
