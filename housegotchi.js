/* =====================================================================
   Housegotchi jugable (portada)
   Cada casita pequeña es la casa de un bichito; los jumbos son escenarios
   (el chiringuito, la mina, la arena y el puesto, cada uno en su blíster) y
   el largo, una cosa (la luna). Las piezas se arrastran
   por una mesa de módulos y caen con muelle en el hueco libre más cercano.
   Si dos quedan pegadas por un lado hacen «clic» (imán):
   · dos casitas lado a lado: los bichitos se saludan en la pared;
   · una casita pegada al escenario: su bichito se va allí de visita, hace
     sus cosas, charla con los que haya y luego vuelve a casa;
   · una casita pegada a la luna: su bichito se queda dormido un rato.
   Tres botones, tres acciones:
   · casita: A acción con su frase · B saltar (tres seguidos: mareo)
     · W ir al escenario (o volver, o saludar). Si duerme, A o B lo despiertan.
   · escenario: A fiesta (en la mina, picar; en la arena, empujón; en el
     puesto, vender) · B la ola · W llamar a los vecinos (o cerrar)
   La mina tiene una DEUDA en el cartel: sube sola con los intereses y baja
   cuando los de dentro pican. Viene en el blíster de Dig Me Out!.
   · luna: A estrella fugaz y un deseo · B nana (los vecinos se duermen)
     · W día/noche (eso lo hace app.js; aquí los bichitos dan las buenas noches)
   Sin JS se queda la rejilla quieta del CSS.
   Usa t() y currentLang de app.js (se carga antes).
   ===================================================================== */
(function () {
  'use strict';

  const board = document.querySelector('[data-hg-board]');
  if (!board) return;
  const bar = document.querySelector('.hg-bar');

  // Datos de herramientas/sprites_housegotchi.py (tamaño del fotograma, eje del
  // cuerpo y anchura del cuerpo, en píxeles del sprite).
  const PJ = {
    chef:  { w: 45, h: 44, eje: 14, cuerpo: 26, anims: { idle: 2, andar: 4, accion: 4 } },
    rogelio: { w: 33, h: 35, eje: 14, cuerpo: 26, anims: { idle: 2, andar: 4, accion: 4 } },
    robot: { w: 37, h: 36, eje: 16, cuerpo: 30, anims: { idle: 2, andar: 4, accion: 4 } },
    minera: { w: 40, h: 36, eje: 12, cuerpo: 18, anims: { idle: 2, andar: 4, accion: 4 } }, // herramientas/pj_minera.py
    // Pizza Kaisen y Figurines Please (herramientas/pjs_pizza_belen.py).
    roni: { w: 52, h: 38, eje: 25, cuerpo: 18, anims: { idle: 2, andar: 4, accion: 4 } },
    pina: { w: 46, h: 42, eje: 22, cuerpo: 26, anims: { idle: 2, andar: 4, accion: 4 } },
    tendero: { w: 38, h: 40, eje: 17, cuerpo: 16, anims: { idle: 2, andar: 4, accion: 4 } },
    pastor: { w: 40, h: 39, eje: 17, cuerpo: 20, anims: { idle: 2, andar: 4, accion: 4 } },
    luna:  { w: 67, h: 49, eje: 33.5, cuerpo: 67, anims: { idle: 3, accion: 3 }, fijo: true, suelo: 34 },
    // El gato largo (herramientas/pj_gato.py): el fotograma es alto porque al
    // estirarse llega casi al techo; sentado solo mide «cabeza».
    gato:  { w: 44, h: 124, cabeza: 40, eje: 21, cuerpo: 30, anims: { idle: 2, accion: 6 }, fijo: true, suelo: 5, fps: { idle: 1.2, accion: 5 } }
  };
  // Rutas escritas enteras para que publicar.py las encuentre y las copie.
  const IMG = {
    'chef-idle': 'assets/img/housegotchi/sprites/chef-idle.png',
    'chef-andar': 'assets/img/housegotchi/sprites/chef-andar.png',
    'chef-accion': 'assets/img/housegotchi/sprites/chef-accion.png',
    'rogelio-idle': 'assets/img/housegotchi/sprites/rogelio-idle.png',
    'rogelio-andar': 'assets/img/housegotchi/sprites/rogelio-andar.png',
    'rogelio-accion': 'assets/img/housegotchi/sprites/rogelio-accion.png',
    'robot-idle': 'assets/img/housegotchi/sprites/robot-idle.png',
    'robot-andar': 'assets/img/housegotchi/sprites/robot-andar.png',
    'robot-accion': 'assets/img/housegotchi/sprites/robot-accion.png',
    'minera-idle': 'assets/img/housegotchi/sprites/minera-idle.png',
    'minera-andar': 'assets/img/housegotchi/sprites/minera-andar.png',
    'minera-accion': 'assets/img/housegotchi/sprites/minera-accion.png',
    'roni-idle': 'assets/img/housegotchi/sprites/roni-idle.png',
    'roni-andar': 'assets/img/housegotchi/sprites/roni-andar.png',
    'roni-accion': 'assets/img/housegotchi/sprites/roni-accion.png',
    'pina-idle': 'assets/img/housegotchi/sprites/pina-idle.png',
    'pina-andar': 'assets/img/housegotchi/sprites/pina-andar.png',
    'pina-accion': 'assets/img/housegotchi/sprites/pina-accion.png',
    'tendero-idle': 'assets/img/housegotchi/sprites/tendero-idle.png',
    'tendero-andar': 'assets/img/housegotchi/sprites/tendero-andar.png',
    'tendero-accion': 'assets/img/housegotchi/sprites/tendero-accion.png',
    'pastor-idle': 'assets/img/housegotchi/sprites/pastor-idle.png',
    'pastor-andar': 'assets/img/housegotchi/sprites/pastor-andar.png',
    'pastor-accion': 'assets/img/housegotchi/sprites/pastor-accion.png',
    'luna-idle': 'assets/img/housegotchi/sprites/luna-idle.png',
    'luna-accion': 'assets/img/housegotchi/sprites/luna-accion.png',
    'gato-idle': 'assets/img/housegotchi/sprites/gato-idle.png',
    'gato-accion': 'assets/img/housegotchi/sprites/gato-accion.png'
  };
  const FPS = { idle: 2.5, andar: 8, accion: 6 };
  const PX = 0.75;        // cqw de una casita por píxel de sprite (en el jumbo, la mitad: mismo tamaño en pantalla)
  const PANTALLA = 80.87; // ancho de la pantalla en cqw de su carcasa
  const VEL = 0.2;        // anchos de pantalla de casita por segundo al andar
  const SALTO = 0.5;      // segundos que dura un salto

  // Colocación de serie (columna, fila) de cada pieza, esté o no en la mesa.
  // Mucho hueco libre para jugar: Curro (el chef) empieza pegado al chiringuito
  // y la minera a la mina. Las filas crecen con las piezas que haya fuera.
  const LAYOUTS = {
    ancho: {
      cols: 6, rows: 4,
      pos: { chiringuito: [0, 0], chef: [2, 0], rogelio: [3, 2], robot: [4, 3], luna: [5, 0], mina: [0, 4], minera: [2, 5], gato: [5, 4],
        arena: [0, 7], roni: [2, 7], pina: [1, 9], puesto: [4, 7], tendero: [3, 8], pastor: [5, 9] }
    },
    movil: {
      cols: 2, rows: 4,
      pos: { chiringuito: [0, 0], chef: [0, 2], robot: [1, 3], luna: [0, 4], rogelio: [1, 6], mina: [0, 8], minera: [1, 10], gato: [0, 11],
        arena: [0, 13], roni: [0, 15], pina: [1, 15], puesto: [0, 17], tendero: [0, 19], pastor: [1, 19] }
    }
  };
  // Frases propias de cada escenario (si faltan, las de serie del chiringuito).
  const ZONAS = { mina: 'housegotchi.enMina.', arena: 'housegotchi.enArena.', puesto: 'housegotchi.enPuesto.' };
  const DE_SERIE = { pegar: 'housegotchi.escena.', llega: 'housegotchi.llega.', charla: 'housegotchi.charla.' };
  // Lo que paga cada picotazo en la mina (la minera sabe lo que hace).
  const PAGA = { minera: 5 };
  const PAD = 12;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const lang = () => (typeof currentLang !== 'undefined' ? currentLang : 'es');
  const tr = (key) => (typeof t === 'function' ? t(lang(), key) : undefined) || '';
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ---------- sonido (apagado de serie) ---------- */
  // Efectos de herramientas: sacados de la carpeta de sonidos n64 de Pepe y
  // pasados a mp3 mono pequeñito. Rutas enteras para que publicar.py las copie.
  // Si un efecto no ha cargado todavía, suena el pitido de reserva.
  const SFX = {
    abrir: 'assets/audio/housegotchi/abrir.mp3',
    caer: 'assets/audio/housegotchi/caer.mp3',
    iman: 'assets/audio/housegotchi/iman.mp3',
    soltar: 'assets/audio/housegotchi/soltar.mp3',
    coger: 'assets/audio/housegotchi/coger.mp3',
    salto: 'assets/audio/housegotchi/salto.mp3',
    accion: 'assets/audio/housegotchi/accion.mp3',
    curro: 'assets/audio/housegotchi/curro.mp3',
    rogelio: 'assets/audio/housegotchi/rogelio.mp3',
    robot: 'assets/audio/housegotchi/robot.mp3',
    saludo: 'assets/audio/housegotchi/saludo.mp3',
    visita: 'assets/audio/housegotchi/visita.mp3',
    volver: 'assets/audio/housegotchi/volver.mp3',
    charla: 'assets/audio/housegotchi/charla.mp3',
    fiesta: 'assets/audio/housegotchi/fiesta.mp3',
    llamar: 'assets/audio/housegotchi/llamar.mp3',
    estrella: 'assets/audio/housegotchi/estrella.mp3',
    deseo: 'assets/audio/housegotchi/deseo.mp3',
    buho: 'assets/audio/housegotchi/buho.mp3',
    mareo: 'assets/audio/housegotchi/mareo.mp3',
    error: 'assets/audio/housegotchi/error.mp3',
    recolocar: 'assets/audio/housegotchi/recolocar.mp3',
    sonido: 'assets/audio/housegotchi/sonido.mp3'
  };
  // Sonido propio de la acción (A) de cada bichito.
  const SFX_PJ = { chef: 'curro', rogelio: 'rogelio', robot: 'robot', minera: 'accion', luna: 'estrella', gato: 'saludo',
    roni: 'iman', pina: 'caer', tendero: 'charla', pastor: 'deseo' };
  let soundOn = false;
  let audioCtx = null;
  const buffers = {};
  let cargando = false;

  function ctx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }
  function cargarSonidos() {
    if (cargando) return;
    cargando = true;
    Object.keys(SFX).forEach(function (k) {
      fetch(SFX[k])
        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(r.status)))
        .then((b) => ctx().decodeAudioData(b))
        .then(function (buf) { buffers[k] = buf; })
        .catch(function () { /* se queda el pitido */ });
    });
  }
  function beep(f0, f1, dur, vol, delay) {
    if (!soundOn) return;
    try {
      const c = ctx();
      const now = c.currentTime + (delay || 0);
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(f0, now);
      o.frequency.exponentialRampToValueAtTime(Math.max(f1, 30), now + dur);
      g.gain.setValueAtTime(vol || 0.035, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.connect(g);
      g.connect(c.destination);
      o.start(now);
      o.stop(now + dur);
    } catch (e) { /* sin sonido, sin drama */ }
  }
  // sfx('salto', { rate, vol, delay, beep: [f0, f1, dur] })
  function sfx(nombre, o) {
    if (!soundOn) return;
    o = o || {};
    const buf = buffers[nombre];
    if (!buf) { if (o.beep) beep(o.beep[0], o.beep[1], o.beep[2], o.beep[3], o.delay); return; }
    try {
      const c = ctx();
      const src = c.createBufferSource();
      const g = c.createGain();
      src.buffer = buf;
      src.playbackRate.value = o.rate || 1;
      g.gain.value = o.vol == null ? 0.45 : o.vol;
      src.connect(g);
      g.connect(c.destination);
      src.start(c.currentTime + (o.delay || 0));
    } catch (e) { /* sin sonido, sin drama */ }
  }
  // El paquete (más abajo, otro bloque) también suena.
  window.hgSfx = sfx;
  // Musiquilla de los dos altavoces del escenario.
  function jingle() {
    if (buffers.fiesta) { sfx('fiesta'); return; }
    [523, 659, 784, 1047].forEach(function (f, i) { beep(f, f, 0.11, 0.03, i * 0.12); });
  }

  /* ---------- lo que se guarda en el navegador ---------- */
  function guardado(k, v) {
    try {
      if (v === undefined) return JSON.parse(localStorage.getItem(k));
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) { /* sin memoria, sin drama */ }
    return null;
  }
  // Las piezas de la mesa salen de los blísters de la caja de cacharros
  // (blister.js): solo se ven las de los blísters abiertos.
  const HGB = window.HGB;
  if (HGB) {
    const abiertos = new Set(HGB.fuera());
    board.querySelectorAll('.hg-casa').forEach((el) => { el.hidden = !abiertos.has(el.dataset.blister); });
  }

  /* ---------- piezas del tablero ---------- */
  function nuevaCasa(el) {
    const escena = el.dataset.escena;
    return {
      el: el,
      id: escena || el.dataset.pj,
      tipo: escena ? 'escena' : 'casa',
      w: +el.dataset.w || 1,
      h: +el.dataset.h || 1,
      c: 0,
      r: 0,
      screen: el.querySelector('.hg-screen'),
      nameEl: el.querySelector('.hg-name'),
      dueño: null
    };
  }
  // Todas las piezas tienen su objeto desde el principio; «casas» son las que
  // están ahora en la mesa.
  const todas = Array.from(board.querySelectorAll('.hg-casa')).map(nuevaCasa);
  const casas = todas.filter((c) => !c.el.hidden);
  const esEscena = (casa) => casa.tipo === 'escena';
  const azar = (lista) => lista[Math.floor(Math.random() * lista.length)] || null;
  const ghost = board.querySelector('.hg-ghost');
  const comboEl = board.querySelector('.hg-combo');

  /* ---------- bichitos ---------- */
  function nuevoBicho(casa) {
    const pj = casa.id;
    const def = PJ[pj];
    const el = casa.screen.querySelector('.hg-sprite');
    el.style.setProperty('--fw', def.w);
    el.style.setProperty('--fh', def.h);
    el.style.setProperty('--eje', def.eje);
    const ch = {
      pj: pj, def: def, el: el, casa: casa, home: casa,
      x: 0.5, dir: 1, state: 'idle', anim: '', frame: 0, ft: 0,
      target: 0.5, next: null, loops: 0, loopsDone: 0,
      timer: rnd(1, 4), jumpT: -1, busy: false,
      ganas: rnd(4, 8), estancia: 0,
      dormido: 0, zz: 0, saltos: [], cola: false
    };
    casa.dueño = ch;
    setAnim(ch, 'idle');
    return ch;
  }
  const chars = casas.filter((c) => c.tipo === 'casa').map(nuevoBicho);
  const bichos = chars.filter((ch) => !ch.def.fijo);

  // Fracción de pantalla que mide un píxel del sprite donde esté ahora (en el
  // jumbo la pantalla es el doble de ancha).
  const pxf = (ch) => PX / ch.casa.w / PANTALLA;
  // Margen para que el cuerpo no se salga y punto de salida (sprite entero fuera).
  const margen = (ch) => (ch.def.cuerpo / 2) * pxf(ch) + 0.03;
  const fuera = (ch) => Math.max(ch.def.eje, ch.def.w - ch.def.eje) * pxf(ch) + 0.02;
  const enCasa = (ch) => ch.casa === ch.home;
  const centro = (casa) => casa.c + casa.w / 2;

  /* ---------- bocadillos, estrellas y siestas ---------- */
  // Una de las frases de una clave de i18n (van separadas por «|»).
  function frase(key) {
    const partes = (tr(key) || '').split('|').filter(Boolean);
    return partes.length ? partes[Math.floor(Math.random() * partes.length)] : '';
  }

  // Bocadillo de LCD encima de la cabeza del bichito; se va solo.
  function bocadillo(ch, texto, ms, clase) {
    if (!texto) return;
    const el = document.createElement('span');
    el.className = 'hg-bocadillo' + (clase ? ' ' + clase : '');
    el.textContent = texto;
    // Uno por bichito: el nuevo sustituye al anterior en vez de amontonarse.
    if (ch.boc) ch.boc.remove();
    ch.boc = el;
    const cabeza = (ch.def.cabeza || ch.def.h) * PX / ch.casa.w + 1.5;
    el.style.bottom = 'calc(' + (ch.def.suelo || 9) + '% + ' + cabeza.toFixed(2) + 'cqw)';
    el.style.setProperty('--k', 1 / ch.casa.w);
    el.style.setProperty('--dur', (ms || 1700) + 'ms');
    ch.casa.screen.appendChild(el);
    // Que no se salga de la pantalla por los lados.
    const W = ch.casa.screen.clientWidth || 1;
    const half = (el.offsetWidth / 2 + 3) / W;
    el.style.left = (Math.min(Math.max(ch.x, half), 1 - half) * 100).toFixed(1) + '%';
    setTimeout(function () { el.remove(); }, ms || 1700);
  }

  // Estrellitas de píxel que parpadean en una pantalla (la nana de la luna).
  function estrellas(casa, n, ms) {
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.className = 'hg-estrella';
      el.style.left = rnd(8, 88).toFixed(1) + '%';
      el.style.top = rnd(6, 52).toFixed(1) + '%';
      el.style.animationDelay = (i * 0.13).toFixed(2) + 's';
      el.style.setProperty('--k', 1 / casa.w);
      casa.screen.appendChild(el);
      setTimeout(function () { el.remove(); }, ms);
    }
  }

  // Estrella fugaz que cruza la pantalla en diagonal, a saltos (sin girar).
  function fugaz(casa) {
    const el = document.createElement('span');
    el.className = 'hg-fugaz';
    el.style.top = rnd(6, 22).toFixed(1) + '%';
    el.style.setProperty('--k', 1 / casa.w);
    casa.screen.appendChild(el);
    setTimeout(function () { el.remove(); }, 1100);
  }

  // Siesta: se queda quieto, echa zetas y se despierta solo al rato.
  function dormir(ch, seg) {
    if (ch.def.fijo || ch.busy || ch.dormido > 0 || !enCasa(ch)) return false;
    idle(ch);
    ch.busy = true;
    ch.dormido = seg;
    ch.zz = 0;
    return true;
  }
  function despertar(ch, decir) {
    if (ch.dormido <= 0) return false;
    ch.dormido = 0;
    ch.busy = false;
    ch.casa.screen.querySelectorAll('.hg-zz').forEach((el) => el.remove());
    idle(ch);
    jump(ch);
    if (decir) bocadillo(ch, frase('housegotchi.despertar'), 1200);
    return true;
  }

  function setAnim(ch, anim) {
    if (!ch.def.anims[anim]) anim = 'idle';
    if (ch.anim === anim) return;
    ch.anim = anim;
    ch.frame = 0;
    ch.ft = 0;
    ch.loopsDone = 0;
    ch.el.style.setProperty('--img', 'url("' + IMG[ch.pj + '-' + anim] + '")');
    ch.el.style.setProperty('--n', ch.def.anims[anim]);
    ch.el.style.backgroundPositionX = '0%';
  }

  function idle(ch) {
    ch.state = 'idle';
    ch.next = null;
    ch.timer = rnd(2, 6);
    setAnim(ch, 'idle');
  }

  function walkTo(ch, x, next) {
    if (!ch.def.anims.andar) { if (next) next(); return; }
    ch.state = 'walk';
    ch.target = x;
    ch.next = next || null;
    if (Math.abs(x - ch.x) > 0.001) ch.dir = x > ch.x ? 1 : -1;
    setAnim(ch, 'andar');
  }

  function act(ch, loops, next) {
    ch.state = 'act';
    ch.loops = loops || 2;
    ch.next = next || null;
    setAnim(ch, 'accion');
    ch.loopsDone = 0;
  }

  function jump(ch, rate) {
    if (ch.jumpT >= 0) return false;
    ch.jumpT = 0;
    sfx('salto', { rate: rate || rnd(0.95, 1.1), vol: 0.35, beep: [300, 760, 0.13] });
    return true;
  }

  function update(ch, dt) {
    // fotogramas
    const n = ch.def.anims[ch.anim];
    ch.ft += dt;
    const paso = 1 / ((ch.def.fps && ch.def.fps[ch.anim]) || (ch.def.fijo ? 2 : FPS[ch.anim]));
    while (ch.ft >= paso) {
      ch.ft -= paso;
      ch.frame++;
      if (ch.frame >= n) { ch.frame = 0; ch.loopsDone++; }
    }

    // estado
    if (ch.state === 'idle' && ch.dormido > 0) {
      ch.dormido -= dt;
      ch.zz -= dt;
      if (ch.zz <= 0) { ch.zz = 1.4; bocadillo(ch, 'z Z z', 1400, 'hg-zz'); }
      if (ch.dormido <= 0) { ch.dormido = 0.001; despertar(ch, false); }
    } else if (ch.state === 'idle') {
      ch.timer -= dt;
      if (ch.timer <= 0) {
        if (!reduce.matches && !ch.busy && ch.def.anims.andar && !mareado(ch)) {
          const m = margen(ch);
          walkTo(ch, rnd(m, 1 - m), function () { idle(ch); });
        } else {
          ch.timer = rnd(2, 6);
        }
      }
    } else if (ch.state === 'walk') {
      const d = ch.target - ch.x;
      const step = VEL * dt / ch.casa.w;
      if (Math.abs(d) <= step) {
        ch.x = ch.target;
        const next = ch.next;
        ch.next = null;
        if (next) next(); else idle(ch);
      } else {
        ch.x += Math.sign(d) * step;
        ch.dir = d > 0 ? 1 : -1;
      }
    } else if (ch.state === 'act') {
      if (ch.loopsDone >= ch.loops) {
        const next = ch.next;
        ch.next = null;
        if (next) next(); else idle(ch);
      }
    }

    // salto (va aparte: se puede saltar andando). Si pulsaste B en el aire,
    // vuelve a saltar nada más tocar suelo. Reglas de pantallita LCD: nada se
    // deforma ni cae entre dos píxeles.
    let jy = 0;
    if (ch.jumpT >= 0) {
      ch.jumpT += dt;
      if (ch.jumpT >= SALTO) {
        ch.jumpT = -1;
        if (ch.cola) { ch.cola = false; saltar(ch); }
      } else {
        jy = Math.round(Math.sin(Math.PI * ch.jumpT / SALTO) * 12); // en píxeles del sprite
      }
    }
    render(ch, jy);
  }

  function render(ch, jy) {
    const n = ch.def.anims[ch.anim];
    ch.el.style.backgroundPositionX = n > 1 ? (ch.frame / (n - 1)) * 100 + '%' : '0%';
    const p = pxf(ch);
    ch.el.style.left = (Math.round(ch.x / p) * p * 100).toFixed(3) + '%';
    ch.el.style.setProperty('--flip', ch.dir);
    ch.el.style.setProperty('--jy', (jy * PX / ch.casa.w).toFixed(3));
  }

  // B: salto, y tres seguidos lo marean.
  function saltar(ch) {
    if (!jump(ch)) return;
    const ahora = performance.now();
    ch.saltos = ch.saltos.filter((t0) => ahora - t0 < 1800).concat(ahora);
    if (ch.saltos.length >= 3) {
      ch.saltos = [];
      setTimeout(function () { marear(ch, 2.2); }, SALTO * 1000);
    }
    ola(ch.casa);
  }

  // Mareado: mira a un lado y a otro a saltos y no está para nada (A y W le cuestan).
  const mareado = (ch) => ch.mareo > performance.now();
  function marear(ch, seg) {
    ch.mareo = performance.now() + seg * 1000;
    ch.el.classList.add('is-mareado');
    bocadillo(ch, frase('housegotchi.mareo'), 1500, 'hg-mareo');
    sfx('mareo', { vol: 0.35, beep: [500, 300, 0.25] });
    clearTimeout(ch.mareoT);
    ch.mareoT = setTimeout(function () { ch.el.classList.remove('is-mareado'); }, seg * 1000);
  }

  // Salto contagioso: las piezas pegadas botan una detrás de otra, como una ola.
  function ola(desde) {
    if (reduce.matches) return;
    const vistas = new Set([desde]);
    let frente = [desde];
    let paso = 0;
    while (frente.length) {
      paso++;
      const sig = [];
      frente.forEach(function (pieza) {
        prevConn.forEach(function (info) {
          if (info.izq !== pieza && info.der !== pieza) return;
          const o = otra(info, pieza);
          if (vistas.has(o)) return;
          vistas.add(o);
          sig.push(o);
          dentroDe(o).forEach(function (ch) {
            setTimeout(function () { jump(ch, 1 + paso * 0.08); }, paso * 170);
          });
        });
      });
      frente = sig;
    }
  }

  // Reacción de la carcasa: se hunde al pulsar, niega si ahora no puede, golpe al caer.
  function pulso(casa, clase) {
    casa.el.classList.remove('is-clic', 'is-no', 'is-land', 'is-snap');
    void casa.el.offsetWidth;
    casa.el.classList.add(clase);
  }
  // El botón dibujado se hunde (también con el teclado, que no tiene :active).
  function hundir(btn) {
    if (!btn) return;
    btn.classList.remove('is-hundido');
    void btn.offsetWidth;
    btn.classList.add('is-hundido');
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.classList.remove('is-hundido'); }, 160);
  }
  function no(casa) {
    pulso(casa, 'is-no');
    sfx('error', { vol: 0.2, beep: [160, 110, 0.1] });
  }

  /* ---------- etiquetas accesibles ---------- */
  function setLabel(casa) {
    const label = tr(casa.tipo === 'escena' ? 'housegotchi.escenaLabel' : 'housegotchi.casa');
    if (label) casa.el.setAttribute('aria-label', label.replace('{pj}', casa.nameEl.textContent));
  }
  // Al cambiar de idioma (app.js cambia <html lang>), rehacerlas.
  new MutationObserver(function () { todas.forEach(setLabel); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  /* ---------- tablero ---------- */
  let mode = '';
  let u = 0;

  // Filas de la mesa y colocación de serie (con la mina, más filas).
  // La mesa mide lo que pidan las piezas que hay fuera (su sitio de serie o el
  // de ahora, el que esté más abajo).
  const filas = () => {
    const pos = posiciones();
    return Math.max(LAYOUTS[mode].rows, ...casas.map((c) => Math.max(c.r, pos[c.id][1]) + c.h));
  };
  // Sitio de serie de cada pieza, sin las filas que se quedarían vacías porque
  // su blíster sigue en la caja: lo que hay fuera sube y no quedan huecos.
  function posiciones() {
    const base = LAYOUTS[mode].pos;
    // De serie: filas que ocupa alguna pieza (las que no, son huecos queridos
    // entre grupos y se quedan). Fuera: las que ocupa lo que hay en la mesa.
    const deSerie = [], usada = [];
    const marca = (fila, id, h) => { for (let r = base[id][1]; r < base[id][1] + h; r++) fila[r] = true; };
    board.querySelectorAll('.hg-casa').forEach(function (el) {
      const id = el.dataset.escena || el.dataset.pj;
      if (base[id]) marca(deSerie, id, +el.dataset.h || 1);
    });
    casas.forEach(function (c) { marca(usada, c.id, c.h); });
    const out = {};
    Object.keys(base).forEach(function (id) {
      let vacias = 0;
      for (let r = 0; r < base[id][1]; r++) if (deSerie[r] && !usada[r]) vacias++;
      out[id] = [base[id][0], base[id][1] - vacias];
    });
    return out;
  }

  function layoutDefault() {
    const pos = posiciones();
    casas.forEach(function (casa) {
      casa.c = pos[casa.id][0];
      casa.r = pos[casa.id][1];
    });
  }

  function place(casa) {
    casa.el.style.left = PAD + casa.c * u + 'px';
    casa.el.style.top = PAD + casa.r * u + 'px';
  }

  function layout() {
    const nuevo = board.clientWidth < 620 ? 'movil' : 'ancho';
    if (nuevo !== mode) {
      mode = nuevo;
      layoutDefault();
      prevConn = conexiones();
    }
    const L = LAYOUTS[mode];
    u = (board.clientWidth - 2 * PAD) / L.cols;
    board.style.height = (u * filas() + 2 * PAD) + 'px';
    casas.forEach(function (casa) {
      casa.el.style.width = casa.w * u + 'px';
      if (!drag || drag.casa !== casa || !drag.active) place(casa);
    });
  }

  const solapa = (c, r, w, h, o) => c < o.c + o.w && o.c < c + w && r < o.r + o.h && o.r < r + h;

  function libre(casa, c, r) {
    const L = LAYOUTS[mode];
    if (c < 0 || r < 0 || c + casa.w > L.cols || r + casa.h > filas()) return false;
    return casas.every((o) => o === casa || !solapa(c, r, casa.w, casa.h, o));
  }

  // Hueco libre más cercano a una posición en píxeles (esquina de arriba a la izquierda).
  function hueco(casa, left, top) {
    const L = LAYOUTS[mode];
    let mejor = null;
    let dist = Infinity;
    for (let r = 0; r <= filas() - casa.h; r++) {
      for (let c = 0; c <= L.cols - casa.w; c++) {
        if (!libre(casa, c, r)) continue;
        const d = Math.hypot(PAD + c * u - left, PAD + r * u - top);
        if (d < dist) { dist = d; mejor = [c, r]; }
      }
    }
    return mejor || [casa.c, casa.r];
  }

  /* ---------- imanes: quién toca a quién ---------- */
  let prevConn = new Map();
  const clave = (a, b) => (casas.indexOf(a) < casas.indexOf(b) ? a.id + '|' + b.id : b.id + '|' + a.id);

  function conexiones() {
    const out = new Map();
    for (let i = 0; i < casas.length; i++) {
      for (let j = i + 1; j < casas.length; j++) {
        const a = casas[i];
        const b = casas[j];
        const filas = a.r < b.r + b.h && b.r < a.r + a.h;
        const cols = a.c < b.c + b.w && b.c < a.c + a.w;
        let info = null;
        if (filas && a.c + a.w === b.c) info = { horiz: true, izq: a, der: b };
        else if (filas && b.c + b.w === a.c) info = { horiz: true, izq: b, der: a };
        else if (cols && a.r + a.h === b.r) info = { horiz: false, izq: a, der: b };
        else if (cols && b.r + b.h === a.r) info = { horiz: false, izq: b, der: a };
        if (info) out.set(clave(a, b), info);
      }
    }
    return out;
  }
  const pegadas = (a, b) => prevConn.get(clave(a, b)) || null;
  const otra = (info, casa) => (info.izq === casa ? info.der : info.izq);
  // Fijos: los de carcasa larga (luna, gato). No se van de visita ni saludan.
  const esFijo = (casa) => casa.tipo === 'casa' && casa.dueño.def.fijo;
  const esPj = (casa, id) => casa.tipo === 'casa' && casa.id === id;

  function revisarImanes() {
    const ahora = conexiones();
    let nueva = null;
    let prioridad = -1;
    ahora.forEach(function (info, key) {
      if (prevConn.has(key)) return;
      [info.izq, info.der].forEach(function (casa) {
        casa.el.classList.remove('is-snap');
        void casa.el.offsetWidth;
        casa.el.classList.add('is-snap');
      });
      const a = info.izq;
      const b = info.der;
      let p = 0;
      if (esEscena(a) !== esEscena(b)) {
        // Casita pegada a un escenario: su bichito se anima a ir enseguida (a ese).
        const e = esEscena(a) ? a : b;
        const casa = otra(info, e);
        if (!esFijo(casa)) {
          casa.dueño.ganas = Math.min(casa.dueño.ganas, rnd(0.6, 1.4));
          casa.dueño.destino = e;
          p = 2;
        } else {
          imanEscena(casa.dueño, e);
          p = 2;
        }
      } else if (esEscena(a)) {
        p = 1; // dos escenarios juntos: solo la pegatina
      } else if (esFijo(a) || esFijo(b)) {
        if (esFijo(a)) imanFijo(a.dueño, b);
        if (esFijo(b)) imanFijo(b.dueño, a);
        p = 1;
      } else if (info.horiz) {
        saludo(a, b);
        p = 1;
      }
      if (p > prioridad) { prioridad = p; nueva = info; }
    });
    prevConn = ahora;
    if (nueva) {
      sfx('iman', { beep: [520, 880, 0.09] });
      combo(nueva);
    }
  }

  // Una pieza fija (luna o gato) se pega a una casita o a la otra fija.
  function imanFijo(ch, o) {
    const libre = !ch.busy && ch.state === 'idle';
    const vecino = o.tipo === 'casa' && !esFijo(o) ? o.dueño : null;
    if (ch.pj === 'luna') {
      if (libre) act(ch, 1);
      if (vecino) dormir(vecino, rnd(6, 9));
    } else if (ch.pj === 'gato') {
      // Se estira para ver quién ha llegado; el vecino da un brinco al verlo.
      if (libre) act(ch, 1);
      if (vecino && enCasa(vecino) && !vecino.busy) setTimeout(function () { jump(vecino); }, 500);
    }
  }

  // Una pieza fija pegada a un escenario.
  function imanEscena(ch, e) {
    const libre = !ch.busy && ch.state === 'idle';
    if (libre) act(ch, 1);
    if (ch.pj === 'luna') {
      // Chiringuito: verbena bajo la luna. Mina: la alumbra (ver picar).
      estrellas(e, e.id === 'mina' ? 5 : 8, 3600);
      if (e.id !== 'mina') verbena(e);
    }
  }

  // Los que estén en el escenario bailan con notas (la A del chiringuito y la
  // verbena de la luna).
  function verbena(e) {
    const dentro = enEscena(e);
    dentro.forEach(function (ch, i) {
      if (ch.busy) return;
      act(ch, 3);
      setTimeout(function () { bocadillo(ch, i % 2 ? '♫' : '♪', 1500, 'hg-nota'); }, i * 220);
    });
    return dentro.length;
  }

  /* ---------- pegatinas ---------- */
  let comboTimer = 0;
  function pegatina(key, x, y) {
    comboEl.setAttribute('data-i18n', key);
    comboEl.textContent = tr(key) || tr('housegotchi.combo.otro');
    const half = comboEl.offsetWidth / 2 + 8;
    x = Math.min(Math.max(x, half), board.clientWidth - half);
    comboEl.style.left = x + 'px';
    comboEl.style.top = Math.max(y, 20) + 'px';
    comboEl.classList.add('on');
    clearTimeout(comboTimer);
    comboTimer = setTimeout(function () { comboEl.classList.remove('on'); }, 2600);
  }

  // Clave de frase de un escenario: la suya (p. ej. housegotchi.enMina.llega.robot)
  // o, si no tiene, la de serie (housegotchi.llega.robot).
  function claveZona(e, tipo, pj) {
    const k = ZONAS[e.id] && ZONAS[e.id] + tipo + '.' + pj;
    return k && tr(k) ? k : DE_SERIE[tipo] + pj;
  }

  function combo(info) {
    const a = info.izq;
    const b = info.der;
    let key;
    if (esEscena(a) !== esEscena(b)) {
      const e = esEscena(a) ? a : b;
      key = claveZona(e, 'pegar', otra(info, e).id);
    } else {
      key = 'housegotchi.combo.' + [a.id, b.id].sort().join('+');
      // Pareja con una fija sin frase propia: la de esa fija («Shhh…», «¡Miau!»).
      if (!tr(key) && (esFijo(a) || esFijo(b))) key = 'housegotchi.combo.' + (esFijo(a) ? a : b).id;
    }
    apuntarCombo(key);
    let x, y;
    if (info.horiz) {
      x = PAD + (a.c + a.w) * u;
      y = PAD + (Math.max(a.r, b.r) + Math.min(a.r + a.h, b.r + b.h)) / 2 * u - u * 0.35;
    } else {
      x = PAD + (Math.max(a.c, b.c) + Math.min(a.c + a.w, b.c + b.w)) / 2 * u;
      y = PAD + (a.r + a.h) * u;
    }
    pegatina(key, x, y);
  }

  // Aviso encima de una pieza (p. ej. «júntalo con alguien»).
  function aviso(casa, key) {
    pegatina(key, PAD + centro(casa) * u, PAD + casa.r * u + u * 0.12);
    sfx('error', { vol: 0.3, beep: [160, 110, 0.12] });
  }

  /* ---------- vecinos: saludo en la pared ---------- */
  const libreParaSocial = (ch) => !ch.busy && !ch.def.fijo && ch.state !== 'act' && enCasa(ch);

  function saludo(izq, der) {
    const a = izq.dueño;
    const b = der.dueño;
    if (!libreParaSocial(a) || !libreParaSocial(b)) return false;
    let listos = 0;
    function hecho() { if (++listos === 2) { a.busy = b.busy = false; } }
    [a, b].forEach(function (ch) {
      ch.busy = true;
      const dir = ch === a ? 1 : -1;
      const fin = function () {
        ch.dir = dir;
        bocadillo(ch, frase('housegotchi.saludo'), 1500);
        if (ch === a) sfx('saludo', { vol: 0.35, beep: [520, 880, 0.08] });
        act(ch, 2, function () { idle(ch); hecho(); });
      };
      if (reduce.matches) fin();
      else walkTo(ch, ch === a ? 1 - margen(ch) : margen(ch), fin);
    });
    return true;
  }

  /* ---------- escenario: ir, charlar y volver ---------- */
  // El bichito sale por el lado que da al escenario y entra por el contrario.
  function mover(ch, casa, entraPorIzq) {
    // Si mientras tanto alguien guardó la pieza (o al bichito), no se mueve.
    if (chars.indexOf(ch) < 0 || casas.indexOf(casa) < 0) return;
    casa.screen.appendChild(ch.el);
    ch.casa = casa;
    ch.x = entraPorIzq ? -fuera(ch) : 1 + fuera(ch);
    render(ch, 0);
  }

  // Escenarios pegados a una pieza.
  const escenasDe = (casa) => casas.filter((e) => esEscena(e) && pegadas(casa, e));

  // Ir de visita a un escenario pegado (si no dices cuál, a uno cualquiera).
  function irEscena(ch, e) {
    if (ch.busy || ch.def.fijo || !enCasa(ch)) return false;
    e = e || azar(escenasDe(ch.home));
    if (!e || !pegadas(ch.home, e)) return false;
    ch.busy = true;
    ch.destino = null;
    const derecha = centro(ch.home) < centro(e);
    walkTo(ch, derecha ? 1 + fuera(ch) : -fuera(ch), function () {
      mover(ch, e, derecha);
      const m = margen(ch);
      walkTo(ch, rnd(m + 0.08, 1 - m - 0.08), function () {
        bocadillo(ch, frase(claveZona(e, 'llega', ch.pj)), 1700);
        if (e.id === 'mina') setTimeout(function () { pagar(ch, 1); }, 700);
        act(ch, 2, function () {
          ch.busy = false;
          ch.estancia = rnd(10, 18);
          idle(ch);
        });
      });
      sfx('visita', { vol: 0.35, beep: [700, 1040, 0.08] });
    });
    return true;
  }

  function volver(ch) {
    if (ch.busy || enCasa(ch)) return false;
    ch.busy = true;
    const izquierda = centro(ch.home) < centro(ch.casa);
    walkTo(ch, izquierda ? -fuera(ch) : 1 + fuera(ch), function () {
      mover(ch, ch.home, !izquierda);
      sfx('volver', { vol: 0.3 });
      const m = margen(ch);
      walkTo(ch, rnd(m + 0.1, 1 - m - 0.1), function () {
        ch.busy = false;
        ch.ganas = rnd(14, 26);
        idle(ch);
      });
    });
    return true;
  }

  const enEscena = (e) => bichos.filter((ch) => ch.casa === e);

  // Dos que coinciden en el escenario se acercan, se miran y hacen lo suyo.
  function charla(a, b) {
    a.busy = b.busy = true;
    if (a.x > b.x) { const tmp = a; a = b; b = tmp; }
    const medio = rnd(0.35, 0.65);
    const gap = (a.def.cuerpo / 2 + 3) * pxf(a);
    const gapB = (b.def.cuerpo / 2 + 3) * pxf(b);
    let listos = 0;
    function llegar() {
      if (++listos < 2) return;
      a.dir = 1;
      b.dir = -1;
      sfx('charla', { vol: 0.3, beep: [600, 800, 0.06] });
      const e = a.casa;
      bocadillo(a, frase(claveZona(e, 'charla', a.pj)), 1600);
      setTimeout(function () { if (b.casa === e) bocadillo(b, frase(claveZona(e, 'charla', b.pj)), 1600); }, 800);
      let fin = 0;
      const acabar = function (ch) { return function () { idle(ch); if (++fin === 2) a.busy = b.busy = false; }; };
      act(a, 2, acabar(a));
      act(b, 2, acabar(b));
    }
    walkTo(a, medio - gap, llegar);
    walkTo(b, medio + gapB, llegar);
  }

  let charlaIn = rnd(6, 10);
  let saludoIn = rnd(12, 20);
  function social(dt) {
    if (reduce.matches) return;
    bichos.forEach(function (ch) {
      if (ch.busy) return;
      if (enCasa(ch)) {
        const es = escenasDe(ch.home);
        if (!es.length) return;
        ch.ganas -= dt;
        if (ch.ganas <= 0) { ch.ganas = rnd(14, 26); irEscena(ch, es.indexOf(ch.destino) >= 0 ? ch.destino : azar(es)); }
      } else {
        ch.estancia -= dt;
        if (ch.estancia <= 0) volver(ch);
      }
    });

    charlaIn -= dt;
    if (charlaIn <= 0) {
      charlaIn = rnd(7, 12);
      casas.filter(esEscena).sort(() => Math.random() - 0.5).some(function (e) {
        const libres = enEscena(e).filter((ch) => !ch.busy && ch.state !== 'act');
        if (libres.length < 2) return false;
        libres.sort(() => Math.random() - 0.5);
        charla(libres[0], libres[1]);
        return true;
      });
    }

    saludoIn -= dt;
    if (saludoIn <= 0) {
      saludoIn = rnd(16, 28);
      const pares = [];
      prevConn.forEach(function (info) {
        if (info.horiz && info.izq.tipo === 'casa' && info.der.tipo === 'casa' &&
            !esFijo(info.izq) && !esFijo(info.der)) pares.push(info);
      });
      if (pares.length) {
        const p = pares[Math.floor(Math.random() * pares.length)];
        saludo(p.izq, p.der);
      }
    }
  }

  /* ---------- bucle ---------- */
  let raf = 0;
  let last = 0;
  let visible = false;

  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    chars.forEach((ch) => update(ch, dt));
    social(dt);
    minaTick(dt);
    raf = requestAnimationFrame(tick);
  }
  function arrancar() {
    if (raf || !visible || document.hidden) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }
  function parar() {
    cancelAnimationFrame(raf);
    raf = 0;
  }
  new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    if (visible) arrancar(); else parar();
  }, { rootMargin: '100px' }).observe(board);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) parar(); else arrancar();
  });

  /* ---------- botones ---------- */
  function pulsar(casa, tecla) {
    // Toda pulsación se nota: el botón se hunde (y si no puede, la carcasa niega).
    hundir(casa.el.querySelector('.hg-key-' + tecla));
    if (casa.tipo === 'escena') return pulsarEscena(casa, tecla);
    const ch = casa.dueño;
    if (ch.def.fijo) return (ch.pj === 'gato' ? pulsarGato : pulsarLuna)(ch, tecla);
    // Dormido: A o B lo despiertan (W, no: así no se va medio dormido).
    if (ch.dormido > 0) {
      if (tecla !== 'w') { despertar(ch, true); sfx('accion', { beep: [660, 990, 0.07] }); }
      else no(casa);
      return;
    }
    if (tecla === 'b') {
      // En el aire: se apunta y salta nada más caer.
      if (ch.jumpT >= 0) ch.cola = true;
      else saltar(ch);
      return;
    }
    if (tecla !== 'b' && mareado(ch)) { no(casa); bocadillo(ch, '@_@', 900, 'hg-mareo'); return; }
    if (tecla === 'a') {
      if (ch.busy) { no(casa); return; }
      sfx(SFX_PJ[ch.pj] || 'accion', { vol: 0.4, beep: [660, 990, 0.07] });
      bocadillo(ch, frase('housegotchi.dice.' + ch.pj), 1600);
      act(ch, 2);
      return;
    }
    // W: bichito → ir, volver o saludar.
    if (!enCasa(ch)) { if (!volver(ch)) ch.estancia = 0; return; }
    if (ch.busy) { no(casa); return; }
    if (irEscena(ch)) return;
    let vecino = null;
    prevConn.forEach(function (info) {
      if (!vecino && info.horiz && (info.izq === casa || info.der === casa)) {
        const o = otra(info, casa);
        if (o.tipo === 'casa' && !esFijo(o)) vecino = info;
      }
    });
    if (vecino && saludo(vecino.izq, vecino.der)) return;
    jump(ch);
    aviso(casa, 'housegotchi.solo');
  }

  // Bichitos de las casitas pegadas a una pieza.
  function vecinosDe(casa) {
    const out = [];
    prevConn.forEach(function (info) {
      if (info.izq !== casa && info.der !== casa) return;
      const o = otra(info, casa);
      if (o.tipo === 'casa' && !esFijo(o)) out.push(o.dueño);
    });
    return out;
  }

  // Luna: A estrella fugaz y deseo · B nana (y, si ya duermen, sus sueños).
  // W lo lleva app.js: día/noche. Pegada a vecinos los duerme; al chiringuito,
  // verbena; a la mina, la alumbra y los picotazos pagan el doble.
  function pulsarLuna(luna, tecla) {
    if (luna.state === 'act') { no(luna.casa); return; }
    if (tecla === 'a') {
      fugaz(luna.casa);
      sfx('estrella', { vol: 0.4, beep: [1200, 600, 0.3] });
      act(luna, 1);
      // Con la mina abierta, a veces el deseo es que baje la deuda… y se cumple.
      const rebaja = deudaEl && !pagando && deuda.valor > 10 && Math.random() < 0.4;
      setTimeout(function () {
        bocadillo(luna, rebaja ? tr('housegotchi.deseoDeuda') : frase('housegotchi.deseo'), 1900);
        sfx('deseo', { vol: 0.35, beep: [880, 1320, 0.12] });
        if (rebaja) {
          deuda.valor = Math.max(1, Math.round(deuda.valor * 0.85));
          pintarDeuda();
          guardado('hg-deuda', deuda);
          const mina = casas.find((c) => c.id === 'mina');
          if (mina) estrellas(mina, 4, 2400);
        }
      }, 650);
    } else if (tecla === 'b') {
      estrellas(luna.casa, 7, 4200);
      sfx('buho', { vol: 0.35, beep: [400, 300, 0.4] });
      act(luna, 2);
      const vecinos = vecinosDe(luna.casa);
      // Los que ya dormían sueñan (cada uno con lo suyo); los demás se duermen.
      const soñando = vecinos.filter((ch) => ch.dormido > 0);
      soñando.forEach(function (ch, i) {
        ch.dormido = Math.max(ch.dormido, 4);
        ch.zz = 2.6;
        setTimeout(function () { bocadillo(ch, frase('housegotchi.sueña.' + ch.pj), 2400, 'hg-sueño'); }, 300 + i * 350);
      });
      const dormidos = vecinos.filter((ch) => dormir(ch, rnd(6, 9)));
      if (soñando.length) return;
      if (dormidos.length) aviso(luna.casa, 'housegotchi.nana');
      else if (!vecinos.length) aviso(luna.casa, 'housegotchi.lunaSola');
    }
  }

  // Gato largo: A se estira hasta el techo · B ronronea (despierta con mimos a
  // los vecinos dormidos) · W tira el vaso de la mesa, como todo gato.
  let vasoTimer = 0;
  function pulsarGato(gato, tecla) {
    if (gato.state === 'act') { no(gato.casa); return; }
    const casa = gato.casa;
    if (tecla === 'a') {
      sfx('saludo', { vol: 0.35, rate: 1.3, beep: [700, 1100, 0.15] });
      act(gato, 1);
      // Si la luna está pegada, se estira para llegar a ella.
      const luna = prevConnCon(casa).find((o) => esPj(o, 'luna'));
      setTimeout(function () {
        bocadillo(gato, luna ? tr('housegotchi.gatoLuna') : frase('housegotchi.dice.gato'), 1600);
      }, 900);
    } else if (tecla === 'b') {
      sfx('charla', { vol: 0.3, rate: 0.7, beep: [120, 140, 0.35] });
      bocadillo(gato, 'rrr rrr', 1800, 'hg-zz');
      const vecinos = vecinosDe(casa);
      const despiertos = vecinos.filter((ch) => despertar(ch, false));
      vecinos.forEach(function (ch, i) {
        setTimeout(function () { bocadillo(ch, frase('housegotchi.mimos'), 1500); }, 400 + i * 250);
      });
      if (!vecinos.length) aviso(casa, 'housegotchi.gatoSolo');
      else if (despiertos.length) aviso(casa, 'housegotchi.ronroneo');
    } else {
      // W: un vaso de píxeles cae de la mesa a saltos y se rompe abajo.
      if (casa.screen.querySelector('.hg-vaso')) { no(casa); return; }
      const vaso = document.createElement('span');
      vaso.className = 'hg-vaso';
      casa.screen.appendChild(vaso);
      clearTimeout(vasoTimer);
      sfx('mareo', { vol: 0.25, rate: 1.4, beep: [900, 500, 0.08] });
      vasoTimer = setTimeout(function () {
        vaso.remove();
        sfx('error', { vol: 0.3, beep: [200, 80, 0.15] });
        bocadillo(gato, tr('housegotchi.clonc'), 1100);
        // Los vecinos despiertos se asoman a ver qué ha sido.
        vecinosDe(casa).forEach(function (ch) {
          if (despertar(ch, false)) bocadillo(ch, frase('housegotchi.despertar'), 1200);
          else if (!ch.busy && enCasa(ch)) bocadillo(ch, frase('housegotchi.gatoRiña'), 1200);
        });
      }, reduce.matches ? 200 : 900);
    }
  }

  // Piezas pegadas a una pieza (de cualquier tipo).
  function prevConnCon(casa) {
    const out = [];
    prevConn.forEach(function (info) {
      if (info.izq === casa || info.der === casa) out.push(otra(info, casa));
    });
    return out;
  }

  function pulsarEscena(e, tecla) {
    const dentro = enEscena(e);
    if (tecla === 'a') {
      if (e.id === 'mina') { picar(e, dentro); return; }
      if (e.id === 'arena') { empujon(e, dentro); return; }
      if (e.id === 'puesto') { vender(e, dentro); return; }
      jingle();
      if (!verbena(e)) aviso(e, 'housegotchi.vacio');
    } else if (tecla === 'b') {
      // La ola: saltan de izquierda a derecha, cada uno un poco más agudo.
      dentro.slice().sort((p, q) => p.x - q.x).forEach(function (ch, i) {
        setTimeout(function () { jump(ch, 1 + i * 0.12); }, reduce.matches ? 0 : i * 160);
      });
      if (!dentro.length) aviso(e, 'housegotchi.vacio');
    } else {
      // W: llamar a los vecinos pegados a este escenario; si ya están todos, cerrar.
      const pegados = bichos.filter((ch) => pegadas(ch.home, e));
      const dormidos = pegados.filter((ch) => despertar(ch, true));
      const llamados = pegados.filter((ch) => irEscena(ch, e));
      if (llamados.length || dormidos.length) { sfx('llamar', { vol: 0.35, beep: [440, 880, 0.1] }); return; }
      // Los que estén ocupados se van en cuanto terminen.
      if (dentro.length) {
        dentro.forEach(function (ch) { if (!volver(ch)) ch.estancia = 0; });
        beep(660, 330, 0.12);
        return;
      }
      aviso(e, 'housegotchi.llamar');
    }
  }

  /* ---------- la arena y el puesto ---------- */
  const libres = (dentro) => dentro.filter((ch) => !ch.busy && ch.state !== 'act' && !mareado(ch) && ch.dormido <= 0);

  // A en la arena (Pizza Kaisen): uno carga y empuja al que tenga más cerca,
  // que sale volando y se vuelve a su casa. El Jefe Piña empuja si está.
  function empujon(arena, dentro) {
    if (!dentro.length) { aviso(arena, 'housegotchi.vacio'); return; }
    const listos = libres(dentro);
    if (!listos.length) { no(arena); return; }
    const quien = listos.find((ch) => ch.pj === 'pina') || azar(listos);
    // El empujado puede estar a medio gesto; solo se libra el que va andando.
    const rivales = dentro.filter((ch) => ch !== quien && !ch.busy);
    if (!rivales.length && dentro.length > 1) { no(arena); return; }
    if (!rivales.length) {
      act(quien, 1);
      bocadillo(quien, frase('housegotchi.enArena.solo'), 1500);
      return;
    }
    const victima = rivales.sort((p, q) => Math.abs(p.x - quien.x) - Math.abs(q.x - quien.x))[0];
    quien.dir = victima.x >= quien.x ? 1 : -1;
    act(quien, 1);
    sfx(SFX_PJ[quien.pj] || 'accion', { vol: 0.4, beep: [220, 660, 0.08] });
    setTimeout(function () {
      if (chars.indexOf(victima) < 0) return;
      jump(victima, 1.3);
      bocadillo(victima, frase('housegotchi.enArena.fuera'), 1500);
      estrellas(arena, 3, 1200);
      setTimeout(function () { if (!volver(victima)) victima.estancia = 0; }, reduce.matches ? 0 : 500);
    }, reduce.matches ? 0 : 380);
  }

  // A en el puesto (Figurines Please): el tendero (si está) ofrece y cada
  // cliente compra… o no, según le caiga.
  function vender(puesto, dentro) {
    if (!dentro.length) { aviso(puesto, 'housegotchi.vacio'); return; }
    const listos = libres(dentro);
    if (!listos.length) { no(puesto); return; }
    const tendero = listos.find((ch) => ch.pj === 'tendero');
    const clientes = listos.filter((ch) => ch !== tendero);
    if (tendero) {
      act(tendero, 1);
      bocadillo(tendero, frase(clientes.length ? 'housegotchi.enPuesto.ofrece' : 'housegotchi.enPuesto.solo'), 1500);
    }
    let vendidas = 0;
    clientes.forEach(function (ch, i) {
      // Con el tendero delante se vende más.
      const compra = Math.random() < (tendero ? 0.75 : 0.45);
      if (compra) vendidas++;
      setTimeout(function () {
        if (chars.indexOf(ch) < 0) return;
        if (compra) {
          act(ch, 1);
          bocadillo(ch, frase('housegotchi.enPuesto.compra'), 1500);
        } else {
          bocadillo(ch, frase('housegotchi.enPuesto.noCompra'), 1500);
        }
      }, reduce.matches ? 0 : (tendero ? 500 : 0) + i * 260);
    });
    setTimeout(function () {
      if (vendidas) {
        sfx('fiesta', { vol: 0.3, beep: [880, 1320, 0.08] });
        estrellas(puesto, Math.min(8, 2 + vendidas * 2), 1800);
      } else if (clientes.length) {
        sfx('error', { vol: 0.25, beep: [300, 150, 0.15] });
      }
    }, reduce.matches ? 0 : 600 + clientes.length * 260);
  }

  /* ---------- la mina: la DEUDA ---------- */
  // El cartel lleva un número que sube solo (intereses) y baja cuando los de
  // dentro pican. Al llegar a cero, fiesta y… llega otra factura más gorda.
  // El número se pinta con dígitos de 3×5 píxeles (herramientas/digitos_deuda.py)
  // en el hueco del cartel: x 47-81, y 43-47 del dibujo de 216×132.
  const DIGITOS = 'assets/img/housegotchi/escenas/digitos.png';
  const deuda = Object.assign({ valor: 60, base: 60 }, guardado('hg-deuda') || {});
  let deudaEl = null;
  let interesIn = 4;
  let picaSolo = rnd(3, 6);
  let pagando = false;

  function montarDeuda(mina) {
    deudaEl = document.createElement('span');
    deudaEl.className = 'hg-deuda';
    deudaEl.style.setProperty('--digitos', 'url("' + DIGITOS + '")');
    mina.screen.appendChild(deudaEl);
    pintarDeuda();
  }

  function pintarDeuda() {
    if (!deudaEl) return;
    const txt = String(Math.min(99999999, Math.max(0, Math.ceil(deuda.valor))));
    const x0 = 47 + Math.floor((35 - (txt.length * 4 - 1)) / 2);
    if (deudaEl.dataset.txt === txt) return;
    deudaEl.dataset.txt = txt;
    deudaEl.textContent = '';
    for (let i = 0; i < txt.length; i++) {
      const d = document.createElement('i');
      d.style.left = ((x0 + i * 4) / 216 * 100).toFixed(3) + '%';
      d.style.backgroundPositionX = (+txt[i] / 9 * 100).toFixed(2) + '%';
      deudaEl.appendChild(d);
    }
  }

  function pagar(ch, n) {
    if (pagando || !deudaEl || ch.casa.id !== 'mina') return;
    deuda.valor = Math.max(0, deuda.valor - n);
    bocadillo(ch, '+' + n, 900, 'hg-paga');
    pintarDeuda();
    guardado('hg-deuda', deuda);
    if (deuda.valor <= 0) deudaPagada(ch.casa);
  }

  function deudaPagada(mina) {
    pagando = true;
    jingle();
    pegatina('housegotchi.deudaPagada', PAD + centro(mina) * u, PAD + mina.r * u + u * 0.12);
    enEscena(mina).forEach(function (ch, i) {
      setTimeout(function () { jump(ch, 1 + i * 0.12); }, reduce.matches ? 0 : i * 160);
    });
    setTimeout(function () {
      deuda.base = Math.round(deuda.base * 1.8);
      deuda.valor = deuda.base;
      pagando = false;
      pintarDeuda();
      guardado('hg-deuda', deuda);
      const alguien = azar(enEscena(mina));
      if (alguien) bocadillo(alguien, frase('housegotchi.deudaNueva'), 1800);
      sfx('error', { vol: 0.25, beep: [300, 150, 0.2] });
    }, 2600);
  }

  // A en la mina: los que estén libres dan un picotazo cada uno.
  function picar(mina, dentro) {
    if (!dentro.length) { aviso(mina, 'housegotchi.vacio'); return; }
    const luz = prevConnCon(mina).some((o) => esPj(o, 'luna')) ? 2 : 1;
    let alguno = false;
    dentro.forEach(function (ch, i) {
      if (ch.busy || ch.state === 'act' || mareado(ch)) return;
      alguno = true;
      act(ch, 1);
      setTimeout(function () {
        sfx('accion', { vol: 0.3, rate: 0.8 + i * 0.1, beep: [180, 90, 0.06] });
        pagar(ch, (PAGA[ch.pj] || 2) * luz);
      }, reduce.matches ? 0 : 300 + i * 90);
    });
    if (!alguno) no(mina);
  }

  // Mientras se ve la mina: la deuda sube un poco y los de dentro pican solos.
  function minaTick(dt) {
    if (!deudaEl || pagando) return;
    interesIn -= dt;
    if (interesIn <= 0) {
      interesIn = 4;
      deuda.valor += 1;
      pintarDeuda();
      guardado('hg-deuda', deuda);
    }
    picaSolo -= dt;
    if (picaSolo <= 0) {
      picaSolo = rnd(3, 6);
      const ch = azar(bichos.filter((o) => o.casa.id === 'mina' && !o.busy && o.state === 'idle' && o.dormido <= 0));
      if (ch && !reduce.matches) {
        act(ch, 1);
        setTimeout(function () { pagar(ch, ch.pj === 'minera' ? 2 : 1); }, 300);
      }
    }
  }

  // Día/noche (el W de la luna, o el botón de tema de la barra lateral):
  // al apagar la luz los bichitos en casa se van a dormir; al encender, arriba.
  new MutationObserver(function () {
    const noche = document.documentElement.getAttribute('data-theme') === 'dark';
    bichos.forEach(function (ch, i) {
      setTimeout(function () {
        if (noche) {
          if (ch.busy || !enCasa(ch)) return;
          bocadillo(ch, frase('housegotchi.buenasNoches'), 1400);
          setTimeout(function () { dormir(ch, rnd(5, 8)); }, 1200);
        } else if (!despertar(ch, false)) {
          bocadillo(ch, frase('housegotchi.buenosDias'), 1400);
          jump(ch);
        } else {
          bocadillo(ch, frase('housegotchi.buenosDias'), 1400);
        }
      }, i * 180);
    });
    if (noche) sfx('buho', { vol: 0.3 });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  /* ---------- arrastrar ---------- */
  let drag = null;

  function mostrarHueco(casa, c, r) {
    ghost.style.left = PAD + c * u + 'px';
    ghost.style.top = PAD + r * u + 'px';
    ghost.style.width = casa.w * u + 'px';
    ghost.style.height = casa.h * u + 'px';
    ghost.classList.add('on');
  }

  // Los bichitos que estén en esa pantalla (el escenario puede tener varios).
  const dentroDe = (casa) => bichos.filter((ch) => ch.casa === casa && ch.dormido <= 0);

  // Mientras arrastras: con quién se pegaría en ese hueco.
  function previsualizar(casa, c, r) {
    const c0 = casa.c;
    const r0 = casa.r;
    casa.c = c;
    casa.r = r;
    const cerca = new Set();
    conexiones().forEach(function (info) {
      if (info.izq === casa || info.der === casa) cerca.add(otra(info, casa));
    });
    casa.c = c0;
    casa.r = r0;
    casas.forEach(function (o) {
      // Quita los pulsos ya acabados: su animación taparía el latido.
      if (cerca.has(o) && !o.el.classList.contains('is-cerca')) o.el.classList.remove('is-land', 'is-snap', 'is-clic', 'is-no');
      o.el.classList.toggle('is-cerca', cerca.has(o));
    });
    ghost.classList.toggle('iman', cerca.size > 0);
    // Un clic flojito cada vez que el hueco cambia de casilla.
    const k = c + ',' + r;
    if (drag.hueco && drag.hueco !== k) beep(cerca.size ? 900 : 600, cerca.size ? 900 : 600, 0.02, 0.012);
    drag.hueco = k;
  }

  // Al mover la casita, los de dentro se resbalan hacia el otro lado; si la
  // sacudes de lado a lado, botan y acaban mareados.
  function menear(d, ddx) {
    if (!ddx || reduce.matches) return;
    const W = d.casa.screen.clientWidth || 1;
    dentroDe(d.casa).forEach(function (ch) {
      const m = margen(ch);
      ch.x = Math.min(Math.max(ch.x - (ddx / W) * 0.45, m), 1 - m);
    });
    const sentido = Math.sign(ddx);
    const ahora = performance.now();
    if (sentido !== d.sentido) {
      if (d.sentido && Math.abs(d.recorrido) > W * 0.25) {
        d.giros = (d.giros || []).filter((t) => ahora - t < 900).concat(ahora);
        dentroDe(d.casa).forEach((ch) => jump(ch, 1.2 + Math.random() * 0.3));
        if (d.giros.length === 3) {
          d.sacudida = true;
          dentroDe(d.casa).forEach((ch) => bocadillo(ch, frase('housegotchi.sacudida'), 1100));
        }
      }
      d.sentido = sentido;
      d.recorrido = 0;
    }
    d.recorrido = (d.recorrido || 0) + ddx;
  }

  function empezar() {
    drag.active = true;
    drag.casa.el.classList.remove('is-armed');
    drag.casa.el.classList.add('is-drag');
    sfx('coger', { vol: 0.35, beep: [330, 420, 0.05] });
    // Al levantar su casita, el bichito se asusta un poco.
    dentroDe(drag.casa).forEach(function (ch, i) {
      setTimeout(function () { jump(ch, 1.25); bocadillo(ch, '!', 700); }, i * 90);
    });
  }

  function soltar() {
    const casa = drag.casa;
    clearTimeout(drag.hold);
    casa.el.classList.remove('is-armed');
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    if (drag.active) {
      const pos = hueco(casa, drag.left, drag.top);
      casa.c = pos[0];
      casa.r = pos[1];
      casa.el.classList.remove('is-drag');
      ghost.classList.remove('on', 'iman');
      casas.forEach((o) => o.el.classList.remove('is-cerca'));
      place(casa);
      pulso(casa, 'is-land');
      sfx('soltar', { vol: 0.35, beep: [220, 150, 0.06] });
      // Cuando la casita toca la mesa, los de dentro botan.
      const sacudida = drag.sacudida;
      dentroDe(casa).forEach(function (ch) {
        setTimeout(function () {
          jump(ch, 0.9);
          if (sacudida) marear(ch, 3);
        }, reduce.matches ? 0 : 300);
      });
      revisarImanes();
    }
    drag = null;
  }

  function onDown(e) {
    if (drag || e.button !== 0 || e.target.closest('.hg-key')) return;
    const casa = casas.find((c) => c.el === e.currentTarget);
    drag = {
      casa: casa,
      id: e.pointerId,
      touch: e.pointerType !== 'mouse',
      x0: e.clientX,
      y0: e.clientY,
      left0: PAD + casa.c * u,
      top0: PAD + casa.r * u,
      left: 0,
      top: 0,
      armed: e.pointerType === 'mouse',
      active: false,
      scroll: false,
      t0: performance.now(),
      hold: 0
    };
    if (drag.touch) {
      // En el móvil hay que mantener pulsado un momento: así la página sigue
      // haciendo scroll normal si solo pasas el dedo.
      drag.hold = setTimeout(function () {
        if (!drag) return;
        drag.armed = true;
        casa.el.classList.add('is-armed');
        if (navigator.vibrate) navigator.vibrate(12);
      }, 260);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }

  function onMove(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x0;
    const dy = e.clientY - drag.y0;
    if (!drag.active) {
      if (!drag.armed) {
        // El dedo se ha movido antes de tiempo: es scroll, no arrastre.
        if (Math.hypot(dx, dy) > 8) { drag.scroll = true; soltar(); }
        return;
      }
      if (Math.hypot(dx, dy) < 5) return;
      empezar();
    }
    e.preventDefault();
    const L = LAYOUTS[mode];
    const maxL = PAD + (L.cols - drag.casa.w) * u;
    const maxT = PAD + (filas() - drag.casa.h) * u;
    drag.left = Math.min(Math.max(drag.left0 + dx, PAD - u * 0.4), maxL + u * 0.4);
    drag.top = Math.min(Math.max(drag.top0 + dy, PAD - u * 0.4), maxT + u * 0.4);
    menear(drag, drag.left - (drag.prevLeft == null ? drag.left0 : drag.prevLeft));
    drag.prevLeft = drag.left;
    drag.casa.el.style.left = drag.left + 'px';
    drag.casa.el.style.top = drag.top + 'px';
    const pos = hueco(drag.casa, drag.left, drag.top);
    mostrarHueco(drag.casa, pos[0], pos[1]);
    previsualizar(drag.casa, pos[0], pos[1]);
  }

  function onUp(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const casa = drag.casa;
    // Toque corto en la pantalla, sin arrastrar: le das un toquecito al bichito.
    const toque = !drag.active && !drag.scroll && performance.now() - drag.t0 < 450 &&
      Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 8 && enPantalla(casa, e);
    soltar();
    if (toque) tocar(casa, e.clientX);
  }

  /* ---------- tocar la pantalla ---------- */
  // La pantalla no recibe eventos (pointer-events: none): se mira por posición.
  function enPantalla(casa, e) {
    const r = casa.screen.getBoundingClientRect();
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  }
  // Fracción horizontal de la pantalla bajo el dedo.
  function fraccion(casa, clientX) {
    const r = casa.screen.getBoundingClientRect();
    return (clientX - r.left) / (r.width || 1);
  }

  function tocar(casa, clientX) {
    const fx = fraccion(casa, clientX);
    // El que esté más cerca del dedo (en el escenario puede haber varios).
    let ch = null;
    bichos.forEach(function (o) {
      if (o.casa === casa && (!ch || Math.abs(o.x - fx) < Math.abs(ch.x - fx))) ch = o;
    });
    if (!ch) { beep(180, 140, 0.04, 0.03); return; }
    if (ch.dormido > 0) { despertar(ch, true); return; }
    const ahora = performance.now();
    ch.toques = (ch.toques || []).filter((t) => ahora - t < 2500);
    ch.toques.push(ahora);
    if (ch.harto > ahora) { no(casa); return; }
    // Se gira hacia ti y da un brinco.
    if (ch.state !== 'walk') ch.dir = fx < ch.x ? -1 : 1;
    jump(ch, 1.3);
    if (ch.toques.length >= 5) {
      // Demasiados toques: se enfada y te da la espalda un rato.
      ch.toques = [];
      ch.harto = ahora + 3500;
      no(casa);
      bocadillo(ch, frase('housegotchi.harto'), 1600);
      setTimeout(function () { if (ch.state !== 'walk') ch.dir = fx < ch.x ? 1 : -1; }, 380);
    } else if (ch.toques.length === 1 || Math.random() < 0.5) {
      bocadillo(ch, frase('housegotchi.toque'), 900);
    }
  }

  // Si no está haciendo nada, mira hacia el ratón.
  function mirar(casa, e) {
    if (drag || e.pointerType !== 'mouse' || !enPantalla(casa, e)) return;
    const fx = fraccion(casa, e.clientX);
    bichos.forEach(function (ch) {
      if (ch.casa !== casa || ch.state !== 'idle' || ch.dormido > 0) return;
      if (ch.harto > performance.now()) return;
      if (Math.abs(fx - ch.x) > 0.04) ch.dir = fx < ch.x ? -1 : 1;
    });
  }

  // Con el arrastre armado, el dedo no mueve la página.
  board.addEventListener('touchmove', function (e) {
    if (drag && (drag.armed || drag.active)) e.preventDefault();
  }, { passive: false });

  function cablear(casa) {
    casa.el.addEventListener('pointerdown', onDown);
    casa.el.addEventListener('pointermove', function (e) { mirar(casa, e); });
    casa.el.addEventListener('contextmenu', function (e) {
      if (drag && drag.touch) e.preventDefault();
    });

    // Teclado: flechas mueven la pieza una casilla; A, B y W, como los botones.
    casa.el.addEventListener('keydown', function (e) {
      if (e.target !== casa.el) return;
      const mov = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      const tecla = { a: 'a', b: 'b', w: 'w' }[e.key.toLowerCase()];
      if (mov) {
        e.preventDefault();
        if (libre(casa, casa.c + mov[0], casa.r + mov[1])) {
          casa.c += mov[0];
          casa.r += mov[1];
          place(casa);
          sfx('soltar', { vol: 0.3, beep: [220, 150, 0.05] });
          revisarImanes();
        } else {
          beep(140, 110, 0.06);
        }
      } else if (tecla) {
        const btn = casa.el.querySelector('.hg-key-' + tecla);
        if (btn) btn.click();
      }
    });

    casa.el.querySelectorAll('[data-hg]').forEach(function (btn) {
      btn.addEventListener('click', function () { pulsar(casa, btn.dataset.hg); });
    });
  }
  todas.forEach(cablear);

  /* ---------- parejas vistas ---------- */
  const vistos = new Set(guardado('hg-combos') || []);
  function apuntarCombo(key) {
    if (vistos.has(key)) return;
    vistos.add(key);
    guardado('hg-combos', Array.from(vistos));
  }

  /* ---------- sacar y guardar piezas (la caja de cacharros) ---------- */
  const vacia = board.querySelector('[data-hg-vacia]');
  const pintarVacia = () => { if (vacia) vacia.hidden = casas.length > 0; };

  // Un bichito vuelve a su casa de golpe, quieto y despierto.
  function aCasa(ch) {
    ch.home.screen.appendChild(ch.el);
    ch.casa = ch.home;
    ch.busy = false;
    ch.dormido = 0;
    ch.saltos = [];
    ch.x = 0.5;
    ch.jumpT = -1;
    ch.cola = false;
    ch.mareo = 0;
    ch.el.classList.remove('is-mareado');
    ch.ganas = rnd(4, 8);
    idle(ch);
    render(ch, 0);
  }

  // Mete en la mesa una pieza escondida, con su bichito.
  function alta(casa) {
    casa.el.hidden = false;
    casa.el.classList.remove('hg-guarda');
    casas.push(casa);
    if (casa.tipo === 'casa') {
      const ch = nuevoBicho(casa);
      chars.push(ch);
      if (!ch.def.fijo) bichos.push(ch);
    }
    setLabel(casa);
    if (casa.id === 'mina' && !deudaEl) montarDeuda(casa);
    return casa;
  }

  // Quita una pieza de la mesa. Su bichito se va con ella (aunque estuviera de
  // visita) y los que visitaban un escenario vuelven a casa.
  function baja(casa) {
    const i = casas.indexOf(casa);
    if (i < 0) return;
    chars.slice().forEach(function (ch) {
      if (ch.home === casa) {
        if (ch.boc) ch.boc.remove();
        ch.home.screen.appendChild(ch.el);
        chars.splice(chars.indexOf(ch), 1);
        if (bichos.indexOf(ch) >= 0) bichos.splice(bichos.indexOf(ch), 1);
        casa.dueño = null;
      } else if (ch.casa === casa) {
        aCasa(ch);
      }
    });
    casa.screen.querySelectorAll('.hg-bocadillo, .hg-estrella, .hg-fugaz, .hg-zz, .hg-nota').forEach((el) => el.remove());
    casas.splice(i, 1);
    casa.el.hidden = true;
  }

  // Saca a la mesa las piezas de un blíster: cada una en su sitio de serie si
  // está libre; si no, en el hueco más cercano. Caen una detrás de otra.
  function sacar(slug) {
    const nuevas = todas.filter((c) => c.el.dataset.blister === slug && c.el.hidden).map(alta);
    if (!nuevas.length) return;
    nuevas.forEach(function (casa) { casa.c = -99; casa.r = 0; });
    layout();
    const pos = posiciones();
    nuevas.forEach(function (casa, i) {
      const p = pos[casa.id];
      const sitio = libre(casa, p[0], p[1]) ? p : hueco(casa, PAD + p[0] * u, PAD + p[1] * u);
      casa.c = sitio[0];
      casa.r = sitio[1];
      layout();
      chars.forEach(function (ch) { if (ch.casa === casa) render(ch, 0); });
      casa.el.style.setProperty('--i', i);
      casa.el.classList.add('hg-cae');
      sfx('caer', { vol: 0.3, rate: 0.9 + i * 0.08, delay: 0.3 + i * 0.11 });
      setTimeout(function () { casa.el.classList.remove('hg-cae'); }, 1200);
    });
    pintarVacia();
    if (nuevas[0]) nuevas[0].el.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'nearest' });
    setTimeout(revisarImanes, reduce.matches ? 0 : 900);
  }

  // Devuelve a su blíster las piezas que hay en la mesa (suben y se van).
  function guardar(slug, luego) {
    const fuera = casas.filter((c) => c.el.dataset.blister === slug);
    if (drag && fuera.indexOf(drag.casa) >= 0) return false;
    fuera.forEach(function (casa, i) {
      casa.el.style.setProperty('--i', i);
      casa.el.classList.add('hg-guarda');
    });
    sfx('recolocar', { vol: 0.3, beep: [660, 330, 0.08] });
    setTimeout(function () {
      fuera.forEach(baja);
      prevConn = conexiones();
      comboEl.classList.remove('on');
      layout();
      pintarVacia();
      if (luego) luego();
    }, reduce.matches || !fuera.length ? 0 : 420 + fuera.length * 90);
    return true;
  }

  window.hgMesa = { sacar: sacar, guardar: guardar };

  /* ---------- pastillas ---------- */
  const soundBtn = document.querySelector('[data-hg-sound]');
  if (soundBtn) {
    soundBtn.addEventListener('click', function () {
      soundOn = !soundOn;
      soundBtn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
      if (soundOn) cargarSonidos();
      beep(440, 880, 0.08);
    });
  }
  const resetBtn = document.querySelector('[data-hg-reset]');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      layoutDefault();
      chars.forEach(aCasa);
      layout();
      casas.forEach(place);
      prevConn = conexiones();
      comboEl.classList.remove('on');
      board.querySelectorAll('.hg-bocadillo, .hg-estrella, .hg-fugaz').forEach((el) => el.remove());
      sfx('recolocar', { vol: 0.35, beep: [660, 330, 0.1] });
    });
  }

  /* ---------- arranque ---------- */
  board.classList.add('hg-on');
  if (bar) bar.classList.add('hg-on');
  layout();
  casas.forEach(setLabel);
  chars.forEach((ch) => render(ch, 0));
  const minaIni = casas.find((c) => c.id === 'mina');
  if (minaIni) montarDeuda(minaIni);
  pintarVacia();
  new ResizeObserver(layout).observe(board);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { board.classList.add('hg-ready'); });
  });
})();

/* =====================================================================
   La caja de cacharros (solo en housegotchi.html): una caja de cartón con
   un blíster por juego recogido. Uno cerrado se saca en grande: «Abrir el
   paquete» rompe el plástico y sus piezas caen a la mesa. Pulsar uno abierto
   devuelve sus piezas al blíster. Los que faltan son huecos que llevan a la
   página del juego, donde se recogen. «Guardarlo todo» vacía la mesa.
   ===================================================================== */
(function () {
  'use strict';

  const HGB = window.HGB;
  const page = document.querySelector('.hg-page');
  const pack = document.querySelector('[data-hg-pack]');
  const cajaEl = document.querySelector('[data-hg-caja]');
  if (!HGB || !page || !pack || !cajaEl) return;
  const dentro = cajaEl.querySelector('[data-hg-caja-dentro]');
  const cuenta = cajaEl.querySelector('[data-hg-caja-cuenta]');
  const hueco = pack.querySelector('[data-hg-pack-slot]');
  const openBtn = pack.querySelector('[data-hg-open]');
  const dejarBtn = pack.querySelector('[data-hg-dejar]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const sfx = (nombre, o) => { if (window.hgSfx) window.hgSfx(nombre, o); };
  let enGrande = null;
  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, reduce.matches ? 0 : ms));

  // Blísters que ya has visto alguna vez (los demás llevan «¡nuevo!»).
  function vistos() {
    try { return JSON.parse(localStorage.getItem('hg-vistos-blister')) || []; } catch (e) { return []; }
  }
  function ver(slug) {
    const v = vistos();
    if (v.indexOf(slug) >= 0) return;
    v.push(slug);
    try { localStorage.setItem('hg-vistos-blister', JSON.stringify(v)); } catch (e) { /* nada */ }
  }

  function pintar() {
    const caja = HGB.caja();
    const fuera = HGB.fuera();
    const v = vistos();
    dentro.innerHTML = HGB.BLISTERS.map(function (b) {
      if (caja.indexOf(b.slug) < 0) {
        return '<a class="hg-caja-hueco" href="project.html?slug=' + b.slug + '&kind=games"><b>?</b><span>' +
          HGB.txt('housegotchi.caja.hueco', { juego: b.juego }) + '</span></a>';
      }
      const esta = fuera.indexOf(b.slug) >= 0;
      const nuevo = !esta && v.indexOf(b.slug) < 0;
      const estado = esta ? 'enMesa' : nuevo ? 'nuevo' : 'sacar';
      return '<button type="button" class="hg-caja-slot' + (esta ? ' is-fuera' : nuevo ? ' is-nuevo' : '') +
        '" data-hg-slot="' + b.slug + '" aria-label="' +
        HGB.txt(esta ? 'housegotchi.caja.guardarAria' : 'housegotchi.caja.sacarAria', { juego: b.juego }) + '">' +
        '<span class="hg-caja-mini">' + HGB.markup(b.slug, { mini: true }) + '</span>' +
        '<span class="hg-caja-estado">' + HGB.txt('housegotchi.caja.' + estado) + '</span></button>';
    }).join('');
    cuenta.textContent = caja.length + '/' + HGB.BLISTERS.length;
    medirCaja();
  }

  // Cada miniatura mide 600px a escala --zm: que quepa justo en su columna.
  function medirCaja() {
    const cs = getComputedStyle(dentro);
    const cols = +cs.getPropertyValue('--cols') || HGB.BLISTERS.length;
    const libre = dentro.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) -
      parseFloat(cs.columnGap || 0) * (cols - 1);
    if (libre > 0) dentro.style.setProperty('--zm', Math.min(150, libre / cols) / 600);
  }
  if (window.ResizeObserver) new ResizeObserver(medirCaja).observe(dentro);

  // Enseña un blíster cerrado en grande, encima de la mesa.
  function enseñar(slug) {
    timers.forEach(clearTimeout);
    timers = [];
    enGrande = slug;
    ver(slug);
    hueco.innerHTML = HGB.markup(slug);
    pack.hidden = false;
    pack.classList.remove('is-tearing', 'is-open', 'is-gone');
    page.classList.add('hg-boxed');
    pintar();
    sfx('recolocar', { vol: 0.3, beep: [330, 660, 0.06] });
    pack.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'nearest' });
  }

  function esconder() {
    enGrande = null;
    pack.hidden = true;
    page.classList.remove('hg-boxed');
  }

  function abrir() {
    const slug = enGrande;
    if (!slug || pack.classList.contains('is-tearing')) return;
    pack.classList.add('is-tearing');
    later(function () { pack.classList.add('is-open'); sfx('abrir', { vol: 0.4 }); }, 360);
    later(function () {
      pack.classList.add('is-gone');
      page.classList.remove('hg-boxed');
      HGB.ponerFuera(HGB.fuera().concat(slug));
      if (window.hgMesa) window.hgMesa.sacar(slug);
      pintar();
    }, 1000);
    // Al acabar, el blíster grande queda libre para sacar otro de la caja.
    later(function () { pack.hidden = true; pack.classList.remove('is-tearing', 'is-open', 'is-gone'); enGrande = null; }, 1500);
  }

  function guardar(slug) {
    if (!window.hgMesa) return;
    if (window.hgMesa.guardar(slug, pintar) === false) return;
    HGB.ponerFuera(HGB.fuera().filter((s) => s !== slug));
  }

  dentro.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-hg-slot]');
    if (!btn || pack.classList.contains('is-tearing')) return;
    const slug = btn.dataset.hgSlot;
    if (HGB.fuera().indexOf(slug) >= 0) guardar(slug);
    else if (enGrande === slug) esconder();
    else enseñar(slug);
  });
  hueco.addEventListener('click', function (e) { if (e.target.closest('.hg-pack-card')) abrir(); });
  openBtn.addEventListener('click', abrir);
  dejarBtn.addEventListener('click', function () {
    if (pack.classList.contains('is-tearing')) return;
    esconder();
    sfx('recolocar', { vol: 0.3 });
  });

  const repack = document.querySelector('[data-hg-repack]');
  if (repack) {
    repack.addEventListener('click', function () {
      HGB.fuera().forEach(guardar);
      cajaEl.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
    });
  }

  // Cambiar de idioma repinta los textos de la caja.
  new MutationObserver(function () {
    pintar();
    if (enGrande && !pack.classList.contains('is-tearing')) hueco.innerHTML = HGB.markup(enGrande);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  cajaEl.hidden = false;
  pintar();
  // La primera vez (nada en la mesa) sale en grande el primer blíster cerrado.
  if (!HGB.fuera().length) {
    const primero = HGB.caja().find((s) => HGB.fuera().indexOf(s) < 0);
    if (primero) enseñar(primero);
  }
})();
