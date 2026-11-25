/* =====================================================================
   Blísters de Housegotchi: uno por juego del portfolio. Todos llevan el rótulo
   de Housegotchi y, debajo, el logo del juego; cambian el cartón y las piezas.
   · En la página de cada juego (project.html) se ve su blíster con «Recoger».
   · En housegotchi.html van dentro de la caja de cacharros: sacas uno, lo
     abres y sus piezas caen a la mesa; «Guardar» las devuelve al blíster.
   El de Tourist Trap viene de regalo, para que la mesa nunca empiece vacía.
   Lo que llevas recogido y lo que está abierto se guarda en el navegador:
   hg-caja (blísters recogidos) y hg-fuera (los que tienen las piezas en la mesa).
   Usa t() y currentLang de i18n.js/app.js, si están.
   ===================================================================== */
(function () {
  'use strict';

  // logo: el del juego, recortado de su portada (herramientas/logos_blister.py).
  const BLISTERS = [
    { slug: 'tourist-trap', juego: 'Tourist Trap', piezas: ['chiringuito', 'chef', 'rogelio'],
      logo: 'assets/img/housegotchi/logos/tourist-trap.webp' },
    { slug: 'offline-working-sheep', juego: 'Offline Working Sheep', piezas: ['luna', 'robot'],
      logo: 'assets/img/housegotchi/logos/offline-working-sheep.webp' },
    { slug: 'dig-me-out', juego: 'Dig Me Out!', piezas: ['mina', 'minera'],
      logo: 'assets/img/housegotchi/logos/dig-me-out.webp' },
    { slug: 'chatdefenderxp', juego: 'ChatDefender XP', piezas: ['gato'],
      logo: 'assets/img/housegotchi/logos/chatdefenderxp.webp' },
    { slug: 'pizza-kaisen', juego: 'Pizza Kaisen', piezas: ['arena', 'roni', 'pina'],
      logo: 'assets/img/housegotchi/logos/pizza-kaisen.webp' },
    { slug: 'figurines-please', juego: 'Figurines Please', piezas: ['puesto', 'tendero', 'pastor'],
      logo: 'assets/img/housegotchi/logos/figurines-please.webp' }
  ];
  const REGALO = 'tourist-trap';

  // Cómo se pinta cada pieza dentro del blíster (carcasa, tinte y lo de la pantalla).
  // Rutas enteras para que publicar.py las encuentre.
  const CARCASA = {
    jumbo: 'assets/img/housegotchi/jumbo-magenta.webp',
    largo: 'assets/img/housegotchi/largo-magenta.webp',
    casita: 'assets/img/housegotchi/casita-magenta.webp',
    oliva: 'assets/img/housegotchi/casita-oliva.webp'
  };
  const PIEZA = {
    chiringuito: { forma: 'jumbo', escena: true },
    mina: { forma: 'jumbo', escena: true },
    arena: { forma: 'jumbo', escena: true },
    puesto: { forma: 'jumbo', escena: true },
    chef: { forma: 'casita' },
    rogelio: { forma: 'casita' },
    robot: { forma: 'casita', carcasa: 'oliva' },
    minera: { forma: 'casita' },
    roni: { forma: 'casita' },
    pina: { forma: 'casita', carcasa: 'oliva' },
    tendero: { forma: 'casita', carcasa: 'oliva' },
    pastor: { forma: 'casita' },
    luna: { forma: 'largo' },
    gato: { forma: 'largo' }
  };

  /* ---------- lo que llevas ---------- */
  function leer(k) {
    try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; }
  }
  function escribir(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin memoria, sin drama */ }
  }
  const existe = (slug) => BLISTERS.some((b) => b.slug === slug);

  // Quien jugó con los sobres de antes (mina, gato) no pierde nada.
  (function migrar() {
    if (leer('hg-caja')) return;
    const sobres = leer('hg-sobres') || (leer('hg-ampliacion-mina') === true ? ['mina'] : null);
    if (!sobres) return;
    const caja = [REGALO, 'offline-working-sheep'];
    if (sobres.indexOf('mina') >= 0) caja.push('dig-me-out');
    if (sobres.indexOf('gato') >= 0) caja.push('chatdefenderxp');
    escribir('hg-caja', caja);
    escribir('hg-fuera', caja.slice());
  })();

  function caja() {
    const c = (leer('hg-caja') || []).filter(existe);
    if (c.indexOf(REGALO) < 0) c.unshift(REGALO);
    return c;
  }
  const tiene = (slug) => caja().indexOf(slug) >= 0;
  function recoger(slug) {
    if (!existe(slug) || tiene(slug)) return false;
    escribir('hg-caja', caja().concat(slug));
    return true;
  }
  const fuera = () => (leer('hg-fuera') || []).filter((s) => existe(s) && tiene(s));
  const ponerFuera = (lista) => escribir('hg-fuera', lista.filter(existe));

  /* ---------- dibujo ---------- */
  const lang = () => (typeof currentLang !== 'undefined' ? currentLang : 'es');
  function tr(key) {
    return (typeof t === 'function' ? t(lang(), key) : '') || '';
  }
  const txt = (key, vars) => Object.keys(vars || {}).reduce((s, k) => s.split('{' + k + '}').join(vars[k]), tr(key));

  function pieza(id) {
    const p = PIEZA[id];
    const img = CARCASA[p.carcasa || p.forma];
    const dentro = p.escena
      ? '<i class="hg-pack-scr hg-pack-scr-' + id + '"></i>'
      : '<i class="hg-pack-pj hg-pack-pj-' + id + '"></i>';
    return '<span class="hg-pack-piece hg-pack-' + p.forma + ' hgb-p-' + id + '">' +
      '<img src="' + img + '" alt="" decoding="async" draggable="false">' + dentro + '</span>';
  }

  // El cartón entero. opts.mini: la versión pequeña de la caja (sin lista).
  function markup(slug, opts) {
    const b = BLISTERS.find((x) => x.slug === slug);
    if (!b) return '';
    const n = b.piezas.length;
    const k = 'housegotchi.bl.' + slug + '.';
    return '<div class="hg-pack-card hgb-' + slug + ' hgb-n' + n + '" data-hgb="' + slug + '">' +
      '<span class="hg-pack-hole" aria-hidden="true"></span>' +
      '<p class="hg-pack-brand">Housegotchi</p>' +
      '<img class="hg-pack-logo" src="' + b.logo + '" alt="' + b.juego + '" decoding="async" draggable="false">' +
      '<div class="hg-pack-tray">' +
        '<div class="hg-pack-items" aria-hidden="true">' + b.piezas.map(pieza).join('') + '</div>' +
        '<span class="hg-pack-bubble" aria-hidden="true"><span class="hg-pack-shine"></span></span>' +
      '</div>' +
      (opts && opts.mini ? '' :
        '<p class="hg-pack-list" data-i18n="' + k + 'lista">' + tr(k + 'lista') + '</p>' +
        '<p class="hg-pack-small">' + txt(n === 1 ? 'housegotchi.packSmall1' : 'housegotchi.packSmall', { n: n }) + '</p>') +
      '</div>';
  }

  window.HGB = {
    BLISTERS: BLISTERS, REGALO: REGALO,
    get: (slug) => BLISTERS.find((b) => b.slug === slug) || null,
    deJuego: (slug) => BLISTERS.find((b) => b.slug === slug) || null,
    caja: caja, tiene: tiene, recoger: recoger, fuera: fuera, ponerFuera: ponerFuera,
    markup: markup, txt: txt
  };
})();
