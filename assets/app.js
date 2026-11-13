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
    const link = p.feature ? `<span class="private">Private internal tool. Screens use blurred sample data.</span>` : '';
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

  // Hero reel: first screen of every project, doubled for a seamless loop.
  const reelItems = P.map((p) => `<figure class="reel-item" data-slug="${p.slug}"><div class="frame"><img src="${src(p, 1)}" alt="${p.title}" loading="lazy"></div><figcaption>${p.title}</figcaption></figure>`).join('');
  const reel = document.getElementById('reel');
  reel.innerHTML = reelItems + reelItems.replace(/<figure /g, '<figure aria-hidden="true" ');
  reel.addEventListener('click', (e) => {
    const f = e.target.closest('.reel-item'); if (!f) return;
    const p = P.find((x) => x.slug === f.dataset.slug);
    open([1, 2, 3, 4].map((i) => ({ src: src(p, i), cap: p.title })), 0);
  });

  // Tools marquee: the list is doubled so the loop is seamless.
  const tools = window.TOOLS.map((t) => `<span>${t}</span>`).join('');
  document.getElementById('track').innerHTML = tools + tools;

  // Ads proof gallery
  const proof = document.getElementById('proof');
  proof.innerHTML = window.PROOF.map((x, i) => `<figure data-proof="${i}"><img loading="lazy" src="${x.src}" alt="${x.cap}"><figcaption>${x.cap}</figcaption></figure>`).join('');

  // Filters
  const tabs = document.querySelectorAll('.filters button');
  tabs.forEach((b) => b.addEventListener('click', () => {
    tabs.forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
    const f = b.dataset.f;
    grid.querySelectorAll('.card').forEach((c) => { c.style.display = f === 'all' || c.dataset.group === f ? '' : 'none'; });
  }));

  // Scroll reveal
  const els = document.querySelectorAll('.reveal, .card, .proof figure');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('in'));
  }

  // Lightbox: works on any list of {src, cap}
  const lb = document.getElementById('lb');
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-cap');
  let list = [], idx = 0;
  function show() { img.src = list[idx].src; cap.textContent = `${list[idx].cap} (${idx + 1} of ${list.length})`; }
  function open(l, i) { list = l; idx = i; show(); lb.hidden = false; document.body.style.overflow = 'hidden'; }
  function close() { lb.hidden = true; document.body.style.overflow = ''; }
  function step(d) { idx = (idx + d + list.length) % list.length; show(); }
  grid.addEventListener('click', (e) => {
    const s = e.target.closest('.shot'); if (!s) return;
    const p = P.find((x) => x.slug === s.dataset.slug);
    open([1, 2, 3, 4].map((i) => ({ src: src(p, i), cap: p.title })), +s.dataset.i - 1);
  });
  proof.addEventListener('click', (e) => {
    const f = e.target.closest('figure'); if (!f) return;
    open(window.PROOF, +f.dataset.proof);
  });
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
