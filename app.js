/* ============ Protección básica ============ */
// No dejar que otra web meta el portfolio en un iframe (GitHub Pages no permite cabeceras).
try {
  if (window.top !== window.self && window.top.location.origin !== location.origin) throw 0;
} catch (e) {
  document.documentElement.style.display = 'none';
}

// Email y teléfono se montan aquí para que no estén en el HTML y los bots de spam no los recojan.
const CONTACT = {
  email: ['pepearenasvenegas', 'gmail.com'].join('@'),
  phone: ['+34', '684', '322', '182']
};

function fillContact() {
  document.querySelectorAll('[data-copy-email]').forEach(el => el.setAttribute('data-copy', CONTACT.email));
  document.querySelectorAll('[data-email-text]').forEach(el => { el.textContent = CONTACT.email; });
  document.querySelectorAll('[data-phone]').forEach(function (a) {
    a.href = 'tel:' + CONTACT.phone.join('');
    a.textContent = CONTACT.phone.join(' ');
  });
}
fillContact();

/* ============ Estado de idioma ============ */
let currentLang = localStorage.getItem('portfolio-lang') || 'es';

function t(lang, key) {
  return key.split('.').reduce((o, k) => (o ? o[k] : undefined), UI[lang]);
}

/* ============ Tema (claro/oscuro) ============ */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

const sunPath = '<circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>';
const moonPath = '<path d="M20 14.5a8.5 8.5 0 1 1-8.9-11.4 7 7 0 0 0 8.9 11.4Z"/>';

function updateThemeLabel() {
  if (!themeLabel) return;
  const theme = root.getAttribute('data-theme');
  themeLabel.textContent = theme === 'dark' ? t(currentLang, 'theme.toLight') : t(currentLang, 'theme.toDark');
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (themeIcon) {
    themeIcon.innerHTML = theme === 'dark' ? moonPath : sunPath;
    themeIcon.setAttribute('fill', theme === 'dark' ? 'var(--sidebar-icon-line)' : 'none');
    themeIcon.setAttribute('stroke', theme === 'dark' ? 'none' : 'var(--sidebar-icon-line)');
    themeIcon.setAttribute('stroke-width', '2.2');
    themeIcon.setAttribute('stroke-linecap', 'round');
    themeIcon.setAttribute('stroke-linejoin', 'round');
  }
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) themeColorMeta.setAttribute('content', theme === 'dark' ? '#0c0c0a' : '#ec6ea0');
  updateThemeLabel();
  localStorage.setItem('portfolio-theme', theme);
}

if (themeToggle) {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);
}

/* ============ Idioma (ES/EN) ============ */
const langToggle = document.getElementById('langToggle');
const langIcon = document.getElementById('langIcon');
const langLabel = document.getElementById('langLabel');

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('portfolio-lang', lang);

  if (langIcon) langIcon.textContent = lang.toUpperCase();
  if (langLabel) langLabel.textContent = t(lang, 'lang.target');

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const val = t(lang, el.getAttribute('data-i18n'));
    if (val === undefined) return;
    el.textContent = val;
    const navIcon = el.closest('.nav-icon');
    if (navIcon) {
      navIcon.setAttribute('title', val);
      navIcon.setAttribute('aria-label', val);
    }
  });

  updateThemeLabel();
  const reprintBtn = document.getElementById('reprint');
  if (reprintBtn) {
    reprintBtn.title = t(lang, 'hero.reprint');
    reprintBtn.setAttribute('aria-label', t(lang, 'hero.reprint'));
    if (typeof snapPosterLabel === 'function') snapPosterLabel();
  }
  renderAbout(lang);
  renderHome(lang);
  renderDetail(lang);
  initReveal();
}

if (langToggle) {
  langToggle.addEventListener('click', function () {
    applyLang(currentLang === 'es' ? 'en' : 'es');
  });
}

/* ============ Toast ============ */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('toast-show');
  void toast.offsetWidth;
  toast.classList.add('toast-show');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('toast-show'), 2400);
}

/* ============ Copiar email al portapapeles ============ */
function fallbackCopy(value) {
  const ta = document.createElement('textarea');
  ta.value = value;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  document.body.removeChild(ta);
  return ok;
}

document.addEventListener('click', function (e) {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  e.preventDefault();
  const value = btn.getAttribute('data-copy');

  function done(ok) {
    showToast(ok ? t(currentLang, 'toast.copied') : t(currentLang, 'toast.failed') + value);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value).then(() => done(true)).catch(() => done(fallbackCopy(value)));
  } else {
    done(fallbackCopy(value));
  }
});

/* ============ Lightbox de galería ============ */
let currentGallery = [];
let lightboxIndex = 0;
let lightboxEl = null;

function normalizeMedia(entry) {
  return typeof entry === 'string'
    ? { type: 'image', src: entry }
    : { type: 'video', src: entry.video, poster: entry.poster };
}

function buildLightbox() {
  if (lightboxEl) return lightboxEl;
  const el = document.createElement('div');
  el.className = 'lightbox';
  el.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close">✕</button>
    <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous">‹</button>
    <img class="lightbox-img" src="" alt="">
    <video class="lightbox-video" controls playsinline preload="none"></video>
    <button type="button" class="lightbox-nav lightbox-next" aria-label="Next">›</button>
  `;
  document.body.appendChild(el);
  el.addEventListener('click', function (e) {
    if (e.target === el) closeLightbox();
  });
  el.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  el.querySelector('.lightbox-prev').addEventListener('click', () => showLightboxImage(lightboxIndex - 1));
  el.querySelector('.lightbox-next').addEventListener('click', () => showLightboxImage(lightboxIndex + 1));
  lightboxEl = el;
  return el;
}

function stopLightboxVideo() {
  if (!lightboxEl) return;
  const video = lightboxEl.querySelector('.lightbox-video');
  video.pause();
  video.removeAttribute('src');
  video.load();
}

function showLightboxImage(index) {
  if (!currentGallery.length) return;
  lightboxIndex = (index + currentGallery.length) % currentGallery.length;
  const el = buildLightbox();
  const media = currentGallery[lightboxIndex];
  const img = el.querySelector('.lightbox-img');
  const video = el.querySelector('.lightbox-video');
  stopLightboxVideo();
  if (media.type === 'video') {
    img.hidden = true;
    video.hidden = false;
    video.poster = media.poster || '';
    video.src = media.src;
    video.play().catch(() => {});
  } else {
    video.hidden = true;
    img.hidden = false;
    img.src = media.src;
  }
  el.classList.toggle('lightbox-single', currentGallery.length < 2);
}

function openLightbox(index) {
  showLightboxImage(index);
  buildLightbox().classList.add('lightbox-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  stopLightboxVideo();
  if (lightboxEl) lightboxEl.classList.remove('lightbox-open');
  document.body.style.overflow = '';
}

document.addEventListener('click', function (e) {
  const thumb = e.target.closest('.gallery-thumb');
  if (thumb) {
    openLightbox(Number(thumb.getAttribute('data-gallery-index')));
    return;
  }
  const trailerBtn = e.target.closest('[data-play-video]');
  if (trailerBtn) {
    e.preventDefault();
    currentGallery = [{ type: 'video', src: trailerBtn.getAttribute('data-play-video'), poster: trailerBtn.getAttribute('data-poster') }];
    openLightbox(0);
  }
});

document.addEventListener('keydown', function (e) {
  if (!lightboxEl || !lightboxEl.classList.contains('lightbox-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1);
  if (e.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1);
});

/* ============ Render de "Sobre mí" ============ */
function renderAbout(lang) {
  const idiomasList = document.getElementById('idiomas-list');
  const socialList = document.getElementById('social-list');
  const experienceEl = document.getElementById('experience-timeline');
  const educationEl = document.getElementById('education-timeline');
  if (!idiomasList && !socialList && !experienceEl && !educationEl) return;

  const about = UI[lang].about;

  if (idiomasList) idiomasList.innerHTML = about.idiomasList.map(i => `<li>${i.lang} — ${i.level}</li>`).join('');
  if (socialList) socialList.innerHTML = about.socialList.map(s => `<li>${s}</li>`).join('');

  const timelineItem = it => `<div class="timeline-item"><p class="when">${it.when}</p><h5>${it.title}</h5><p>${it.desc}</p></div>`;
  if (experienceEl) experienceEl.innerHTML = about.experience.map(timelineItem).join('');
  if (educationEl) educationEl.innerHTML = about.education.map(timelineItem).join('');
}

/* ============ Helpers de render de proyectos ============ */
function coverMarkup(cover, langData, lang) {
  const badgeHtml = langData.badge ? `<span class="badge">${langData.badge}</span>` : '';
  if (cover.type === 'image') {
    return `<div class="card-thumb">${badgeHtml}<img src="${cover.src}" alt="${langData.alt || ''}" loading="lazy"></div>`;
  }
  if (cover.type === 'brand') {
    return `<div class="card-thumb brand-cover">${badgeHtml}
      <div class="brand-top" style="background:${cover.top.bg};color:${cover.top.color}">${langData.coverTop}</div>
      <div class="brand-bottom" style="background:${cover.bottom.bg};color:${cover.bottom.color}">
        <span class="brand-title">${langData.coverBottom}</span>
        ${langData.coverTagline ? `<span class="brand-tagline">${langData.coverTagline}</span>` : ''}
      </div>
    </div>`;
  }
  const tintClass = cover.tint && cover.tint !== 'default' ? ` tint-${cover.tint}` : '';
  return `<div class="card-thumb placeholder${tintClass}">${badgeHtml}
    <span class="ph-icon">🖼</span>${t(lang, 'placeholder.pending')}<br>${cover.note}
  </div>`;
}

/* ============ Fuente propia para el título de cada proyecto ============
   Una sola petición a Google Fonts con &text= : solo se descargan las letras de los
   títulos, así que cada fuente pesa unos pocos KB. */
const TITLE_FONTS = {
  'Chewy': 'Chewy',
  'Bangers': 'Bangers',
  'Silkscreen': 'Silkscreen:wght@700',
  'Pixelify Sans': 'Pixelify+Sans:wght@700',
  'Space Grotesk': 'Space+Grotesk:wght@700',
  'Courier Prime': 'Courier+Prime:wght@700',
  'Press Start 2P': 'Press+Start+2P',
  'Nunito': 'Nunito:wght@900',
  'Playfair Display': 'Playfair+Display:wght@800',
  'Space Mono': 'Space+Mono:wght@700'
};

(function loadTitleFonts() {
  const all = PROJECTS.games.concat(PROJECTS.other).filter(p => p.font);
  if (!all.length) return;
  const families = [...new Set(all.map(p => TITLE_FONTS[p.font]).filter(Boolean))];
  const titles = all.map(p => p.es.title + p.en.title).join('');
  const chars = [...new Set((titles + titles.toUpperCase()).replace(/\s/g, ''))].join('') + ' ';
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?' + families.map(f => 'family=' + f).join('&') +
    '&display=swap&text=' + encodeURIComponent(chars);
  document.head.appendChild(link);
})();

function titleStyle(item) {
  return item.font ? ` style="font-family: '${item.font}', 'Archivo Black', sans-serif"` : '';
}

function cardMarkup(item, kind, lang, index) {
  const d = item[lang];
  const tags = (d.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
  const delay = Math.min(index || 0, 6) * 70;
  // Cada tarjeta es un bloque de color del póster; el color rota rosa → oliva → crema
  return `<a class="card card-c${(index || 0) % 3} reveal" style="transition-delay:${delay}ms" href="project.html?slug=${item.slug}&kind=${kind}">
    <div class="card-inner">
      ${coverMarkup(item.cover, d, lang)}
      <div class="card-body">
        <h4 class="card-title"${titleStyle(item)}>${d.title}</h4>
        <p class="card-desc">${d.summary}</p>
        <div class="card-tags">${tags}</div>
        <span class="card-go" aria-hidden="true">→</span>
      </div>
    </div>
  </a>`;
}

function featuredMarkup(item, lang) {
  const d = item[lang];
  const href = `project.html?slug=${item.slug}&kind=games`;
  const tags = (d.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
  const highlights = (d.highlights || []).map(h => `<li>${h}</li>`).join('');
  const trailerBtn = item.video
    ? `<button type="button" class="pill pill-accent" data-play-video="${item.video.src}" data-poster="${item.video.poster || ''}">${t(lang, 'featured.trailer')}</button>`
    : '';
  return `<article class="featured reveal">
    <a class="featured-media" href="${href}" aria-label="${d.title}">
      <img class="featured-art" src="${item.cover.src}" alt="${d.alt || ''}">
      ${item.logo ? `<img class="featured-logo" src="${item.logo}" alt="${d.title}">` : ''}
      ${d.badge ? `<span class="badge">${d.badge}</span>` : ''}
    </a>
    <div class="featured-body">
      <p class="featured-label">${t(lang, 'featured.label')}</p>
      <h4 class="featured-title"${titleStyle(item)}>${d.title}</h4>
      <p class="featured-summary">${d.summary}</p>
      ${highlights ? `<ul class="featured-highlights">${highlights}</ul>` : ''}
      <div class="card-tags">${tags}</div>
      <div class="featured-actions">
        ${trailerBtn}
        <a class="pill" href="${href}">${t(lang, 'featured.view')} →</a>
      </div>
    </div>
  </article>`;
}

/* ============ Render de la home ============ */
function renderHome(lang) {
  const gamesGrid = document.getElementById('games-grid');
  const otherGrid = document.getElementById('other-grid');
  const featuredEl = document.getElementById('featured-game');
  if (!gamesGrid && !otherGrid) return;

  const featured = PROJECTS.games.find(g => g.featured);
  if (featuredEl) featuredEl.innerHTML = featured ? featuredMarkup(featured, lang) : '';
  const rest = PROJECTS.games.filter(g => g !== featured);
  if (gamesGrid) gamesGrid.innerHTML = rest.map((g, i) => cardMarkup(g, 'games', lang, i)).join('');
  if (otherGrid) otherGrid.innerHTML = PROJECTS.other.map((o, i) => cardMarkup(o, 'other', lang, i)).join('');

  const ghCard = document.getElementById('github-card');
  if (ghCard) {
    ghCard.href = GITHUB_CARD.url;
    ghCard.querySelector('h4').textContent = GITHUB_CARD[lang].title;
    ghCard.querySelector('p').innerHTML = GITHUB_CARD[lang].desc;
  }
}

/* ============ Render de la página de detalle ============ */
function renderDetail(lang) {
  const root = document.getElementById('project-detail');
  if (!root) return;

  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const kind = params.get('kind') === 'other' ? 'other' : 'games';
  const item = (PROJECTS[kind] || []).find(p => p.slug === slug);

  if (!item) {
    root.innerHTML = `<div class="section-head"><h3 class="section-title">${t(lang, 'detail.notFoundTitle')}</h3></div>
      <p><a class="pill" href="index.html">${t(lang, 'detail.notFoundBack')}</a></p>`;
    document.title = t(lang, 'detail.notFoundTitle') + ' — Jose Arenas';
    return;
  }

  const d = item[lang];
  document.title = d.title + ' — Jose Arenas';
  currentGallery = (item.gallery || []).map(normalizeMedia);

  const tags = (d.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
  const desc = (d.description || []).map(p => `<p>${p}</p>`).join('');

  const metaHtml = (d.meta && d.meta.length)
    ? `<div class="detail-meta">${d.meta.map(m => `<div><span class="meta-label">${m.label}</span><span class="meta-value">${m.value}</span></div>`).join('')}</div>`
    : '';

  const roleItems = Array.isArray(d.role) ? d.role : (d.role ? [d.role] : []);
  const roleHtml = roleItems.length
    ? `<div class="detail-role"><h4>${t(lang, 'detail.role')}</h4><ul class="role-list">${roleItems.map(r => `<li>${r}</li>`).join('')}</ul></div>`
    : '';

  const galleryHtml = currentGallery.length
    ? `<div class="detail-block"><h4>${t(lang, 'detail.gallery')}</h4><div class="gallery-grid">${
        currentGallery.map((m, i) => {
          const thumbSrc = m.type === 'video' ? m.poster : m.src;
          const playBadge = m.type === 'video' ? '<span class="gallery-play" aria-hidden="true">▶</span>' : '';
          return `<button type="button" class="gallery-thumb${m.type === 'video' ? ' is-video' : ''}" data-gallery-index="${i}"><img src="${thumbSrc}" alt="${d.title} — ${i + 1}" loading="lazy">${playBadge}</button>`;
        }).join('')
      }</div></div>`
    : '';

  const controlsHtml = (d.controls && d.controls.length)
    ? `<div class="detail-block"><h4>${t(lang, 'detail.howToPlay')}</h4><ul class="plain-list">${d.controls.map(c => `<li>${c}</li>`).join('')}</ul></div>`
    : '';

  const creditsHtml = (item.credits && item.credits.length)
    ? `<div class="detail-block"><h4>${t(lang, 'detail.credits')}</h4><ul class="credits-list">${item.credits.map(c => `<li><span>${c.name}</span><span class="credit-role">${c.role}</span></li>`).join('')}</ul></div>`
    : '';

  const links = [];
  if (item.external && d.external) {
    links.push(`<a class="pill pill-accent" href="${item.external.url}" target="_blank" rel="noopener">${d.external.label} ↗</a>`);
  }
  if (item.repo) {
    links.push(`<a class="pill" href="${item.repo}" target="_blank" rel="noopener">${t(lang, 'detail.repo')} ↗</a>`);
  }
  if (!links.length && item.video) {
    links.push(`<button type="button" class="pill pill-accent" data-play-video="${item.video.src}" data-poster="${item.video.poster || ''}">${t(lang, 'featured.trailer')}</button>`);
  }
  const externalHtml = links.join('');

  const coverHtml = item.video
    ? `<div class="card-thumb detail-thumb detail-video"><video controls playsinline preload="none" poster="${item.video.poster || item.cover.src}" src="${item.video.src}"></video></div>`
    : coverMarkup(item.cover, d, lang).replace('card-thumb', 'card-thumb detail-thumb');

  root.innerHTML = `
    <a class="back-link" href="index.html">${t(lang, 'detail.back')}</a>
    <div class="detail-cover">${coverHtml}</div>
    <div class="section-head" style="margin-top:34px;">
      <h3 class="section-title"${titleStyle(item)}>${d.title}</h3>
      ${PROJECT_TILE[item.slug] ? decoMarkup(PROJECT_TILE[item.slug], 'deco-detail') : ''}
    </div>
    <div class="card-tags" style="margin-bottom:22px;">${tags}</div>
    <div class="detail-body">
      <div class="detail-main">
        ${desc}
        ${roleHtml}
        ${galleryHtml}
        ${controlsHtml}
        ${creditsHtml}
      </div>
      <div class="detail-side">
        ${metaHtml}
        <div class="detail-external">${externalHtml}</div>
        ${PROJECT_ILLUSTRATION[item.slug] ? decoMarkup(PROJECT_ILLUSTRATION[item.slug], 'deco-side') : ''}
      </div>
    </div>
  `;
}

/* ============ Scroll reveal ============ */
let revealObserver = null;
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.is-visible)');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  }
  els.forEach(el => revealObserver.observe(el));
}

/* ============ Nav: selector de niveles ============
   Los botones van unidos por un camino punteado que se rellena al hacer scroll:
   llega a cada icono justo cuando su sección entra en pantalla. */
function initNavPath() {
  const bar = document.querySelector('.sidebar-top');
  if (!bar) return;
  const icons = Array.from(bar.querySelectorAll('.nav-icon'));
  const boxes = icons.map(a => a.querySelector('.icon-box'));
  const sections = ['inicio', 'juegos', 'otros-proyectos', 'sobre-mi'].map(id => document.getElementById(id));
  const onHome = sections.every(Boolean);

  const track = document.createElement('span');
  const fill = document.createElement('span');
  const cursor = document.createElement('span');
  track.className = 'nav-path';
  fill.className = 'nav-path-fill';
  cursor.className = 'nav-cursor';
  [track, fill, cursor].forEach(el => el.setAttribute('aria-hidden', 'true'));
  bar.prepend(track, fill);
  bar.append(cursor);

  // En la página de proyecto, el "nivel" es la sección a la que pertenece
  const fixedLevel = document.getElementById('project-detail')
    ? (new URLSearchParams(location.search).get('kind') === 'other' ? 2 : 1)
    : null;

  let centers = [], cross = 0, horizontal = false;

  function measure() {
    horizontal = getComputedStyle(bar).flexDirection === 'row';
    bar.classList.toggle('is-horizontal', horizontal);
    const base = bar.getBoundingClientRect();
    centers = boxes.map(function (b) {
      const r = b.getBoundingClientRect();
      return horizontal ? r.left + r.width / 2 - base.left : r.top + r.height / 2 - base.top;
    });
    const r0 = boxes[0].getBoundingClientRect();
    cross = horizontal ? r0.top + r0.height / 2 - base.top : r0.left + r0.width / 2 - base.left;
    cursor.style.left = (r0.left - base.left - 13) + 'px';

    const len = centers[centers.length - 1] - centers[0];
    const s = track.style;
    if (horizontal) Object.assign(s, { left: centers[0] + 'px', top: cross - 1.5 + 'px', width: len + 'px', height: '3px' });
    else Object.assign(s, { top: centers[0] + 'px', left: cross - 1.5 + 'px', height: len + 'px', width: '3px' });
    const f = fill.style;
    if (horizontal) Object.assign(f, { left: centers[0] + 'px', top: cross - 1.5 + 'px', height: '3px' });
    else Object.assign(f, { top: centers[0] + 'px', left: cross - 1.5 + 'px', width: '3px' });
  }

  // Posición continua en el camino: 0 = Inicio … 3 = Sobre mí
  function progress() {
    if (!onHome) return fixedLevel;
    const max = document.documentElement.scrollHeight - innerHeight;
    const y = scrollY;
    let prev = 0;
    const arrive = sections.map(function (sec, i) {
      const a = i === 0 ? 0 : Math.max(prev, Math.min(sec.offsetTop - innerHeight * 0.45, max));
      prev = a;
      return a;
    });
    for (let i = arrive.length - 1; i >= 0; i--) {
      if (y >= arrive[i]) {
        const next = arrive[i + 1];
        return next === undefined || next <= arrive[i] ? i : i + (y - arrive[i]) / (next - arrive[i]);
      }
    }
    return 0;
  }

  let lastActive = -1;
  function update() {
    const p = progress();
    if (p === null) return;
    const i = Math.floor(p + 1e-6);
    const head = i >= centers.length - 1 ? centers[centers.length - 1] : centers[i] + (p - i) * (centers[i + 1] - centers[i]);
    fill.style[horizontal ? 'width' : 'height'] = Math.max(0, head - centers[0]) + 'px';

    if (i !== lastActive) {
      icons.forEach((a, k) => a.classList.toggle('is-active', k === i));
      cursor.style.top = centers[i] + 'px';
      cursor.classList.add('is-on');
      lastActive = i;
    }
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }

  function relayout() { measure(); lastActive = -1; update(); }
  relayout();
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', relayout);
  if (document.fonts) document.fonts.ready.then(relayout);
}

/* ============ Toques de los toggles ============ */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

// Cambio de tema directo: se apagan las transiciones un instante para que nada funda
function switchTheme(next) {
  root.classList.add('theme-switching');
  applyTheme(next);
  resetPoster();
  void root.offsetHeight;
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
}

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    switchTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// La ficha de idioma da la vuelta como una carta
if (langToggle) {
  langToggle.addEventListener('click', function () {
    if (reduceMotion.matches || !langIcon) return;
    langIcon.animate(
      [{ rotate: 'y 90deg' }, { rotate: 'y 0deg' }],
      { duration: 420, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
    );
  });
}

/* ============ Reimprimir el póster ============
   Pulsar «Portfolio 2026» baraja los colores de los bloques dentro de la paleta.
   Reglas: bloques que se tocan nunca repiten color y el texto siempre contrasta. */
const POSTER_INK = {
  pink: ['#ec6ea0', '#17140f'], olive: ['#5b6b1a', '#f2ede2'], cream: ['#f2ede2', '#17140f'],
  charcoal: ['#1d1b17', '#f2ede2'], ink: ['#17140f', '#f2ede2'], deep: ['#cf4e86', '#f2ede2']
};
const POSTER_SETS = {
  dark: { blocks: ['pink', 'olive', 'cream', 'charcoal'], dots: ['#ec6ea0', '#f2ede2'] },
  light: { blocks: ['ink', 'olive', 'cream', 'deep'], dots: ['#17140f', '#f2ede2', '#5b6b1a'] }
};
// Vecinos en la cuadrícula del póster (a = JOSE, c = ARE, d = NAS, e = texto, f = espiral)
const POSTER_NEIGHBOURS = [['a', 'c'], ['a', 'd'], ['c', 'd'], ['c', 'e'], ['d', 'e'], ['e', 'f']];
let lastPosterKey = '';

function shuffled(list) {
  return list.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(p => p[1]);
}

function randomPoster(set) {
  for (let i = 0; i < 200; i++) {
    const pick = {};
    ['a', 'c', 'd', 'e', 'f'].forEach(k => { pick[k] = set.blocks[Math.floor(Math.random() * set.blocks.length)]; });
    const ok = POSTER_NEIGHBOURS.every(([x, y]) => pick[x] !== pick[y]);
    const key = Object.values(pick).join();
    if (ok && key !== lastPosterKey) { lastPosterKey = key; return pick; }
  }
  return null;
}

function reprintPoster() {
  const poster = document.querySelector('.poster');
  if (!poster) return;
  const theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const set = POSTER_SETS[theme];
  const pick = randomPoster(set);
  if (!pick) return;
  const vars = {};
  ['a', 'c', 'd', 'f'].forEach(function (k) {
    vars[`--p${k}-bg`] = POSTER_INK[pick[k]][0];
    vars[`--p${k}-fg`] = POSTER_INK[pick[k]][1];
  });
  const [eBg, eFg] = POSTER_INK[pick.e];
  vars['--pe-bg'] = eBg;
  vars['--pe-fg'] = eFg;
  // El rol va en color de acento: rosa sobre oscuros, oliva sobre crema, negro sobre rosas
  vars['--pe-accent'] = pick.e === 'cream' ? '#5b6b1a' : (pick.e === 'pink' || pick.e === 'deep') ? '#17140f' : '#ec6ea0';
  vars['--dot'] = shuffled(set.dots)[0];
  Object.entries(vars).forEach(([k, v]) => poster.style.setProperty(k, v));
  poster.classList.remove('is-reprinting');
  void poster.offsetWidth;
  poster.classList.add('is-reprinting');
}

function resetPoster() {
  const poster = document.querySelector('.poster');
  if (poster) poster.removeAttribute('style');
  lastPosterKey = '';
}

const reprintBtn = document.getElementById('reprint');
if (reprintBtn) reprintBtn.addEventListener('click', reprintPoster);

/* ============ Guiño: la oveja ============
   Pulsar la oveja del pie → salta y dice «¡Beeeee!». */
function bleat(sheepEl) {
  if (!sheepEl) return;
  let bubble = sheepEl.querySelector('.bleat');
  if (!bubble) {
    bubble = document.createElement('span');
    bubble.className = 'bleat';
    sheepEl.appendChild(bubble);
  }
  bubble.textContent = t(currentLang, 'hero.bleat');
  sheepEl.classList.remove('is-bleating');
  void sheepEl.offsetWidth;
  sheepEl.classList.add('is-bleating');
  clearTimeout(sheepEl._bleatTimer);
  sheepEl._bleatTimer = setTimeout(() => sheepEl.classList.remove('is-bleating'), 1800);
}

const footerSheep = document.querySelector('.footer-sheep');
if (footerSheep) footerSheep.addEventListener('click', () => bleat(footerSheep));

/* ============ Etiqueta «Portfolio 2026» encajada en la trama ============
   La trama usa background-repeat: space (puntos enteros y centrados). La etiqueta se
   coloca entre filas y columnas de puntos, así tapa los mismos arriba y abajo. */
function snapPosterLabel() {
  const box = document.querySelector('.pb-dots');
  const label = document.getElementById('reprint');
  if (!box || !label || getComputedStyle(label).display === 'none') return;
  const cell = 22;
  const W = box.clientWidth, H = box.clientHeight;
  const nx = Math.floor(W / cell), ny = Math.floor(H / cell);
  if (nx < 3 || ny < 3) return;
  const px = (W - cell) / (nx - 1), py = (H - cell) / (ny - 1);
  Object.assign(label.style, { left: '', top: '', width: '', height: '', right: '' });
  const w0 = label.offsetWidth, h0 = label.offsetHeight;
  const cols = Math.max(1, Math.ceil(w0 / px)), rows = Math.max(1, Math.ceil(h0 / py));
  const right = W - cell / 2 - px / 2;
  Object.assign(label.style, {
    right: 'auto',
    left: (right - cols * px) + 'px',
    top: (cell / 2 + py / 2) + 'px',
    width: (cols * px) + 'px',
    height: (rows * py) + 'px'
  });
}
addEventListener('resize', snapPosterLabel);
if (document.fonts) document.fonts.ready.then(snapPosterLabel);

/* ============ Los ojos del gato robot siguen al ratón ============ */
(function initCatEyes() {
  const photo = document.querySelector('.about-photo');
  if (!photo || !matchMedia('(pointer: fine)').matches) return;
  let raf = 0, mx = 0, my = 0;
  addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      const eyes = photo.querySelector('.cat-eyes');
      if (!eyes) return;
      const r = photo.getBoundingClientRect();
      const dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height * 0.5);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 300);
      eyes.setAttribute('transform', `translate(${(dx / d * 7 * k).toFixed(2)} ${(dy / d * 5 * k).toFixed(2)})`);
    });
  }, { passive: true });
})();

/* ============ Arranque ============ */
applyLang(currentLang);
initNavPath();
snapPosterLabel();
