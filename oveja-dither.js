/* ============ Oveja en 3D con paleta + dither (ficha de Offline Working Sheep) ============
   Va en la ficha de Offline Working Sheep (app.js → renderDetail). Uso: <canvas class="oveja-dither"></canvas> + este script.
   La técnica de Walaber (Reason & Rhyme) que usa Golf Tycoon, con los colores del portfolio:
   - Una sola textura-paleta: columna = color, fila = trama (celdas de 4×4 px).
   - Luz con dos umbrales: iluminado = color liso; sombra = líneas; sombra profunda = tablero.
   - La trama va anclada a la pantalla, no al objeto, así que "vibra" cuando la luz se mueve.
   - Contorno con casco invertido.
   La luz sigue al ratón. WebGL 1 a pelo, sin librerías (CSP: script-src 'self'). */
(function () {
function setup(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false });
  if (!gl) { canvas.remove(); return; }

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const PX = 3;                // píxeles de pantalla por píxel de trama
  const CELL = 4;              // tamaño de la celda de trama

  /* ---------- Textura-paleta ----------
     Columnas: rosa, pistacho, papel, tinta, rosa oscuro.
     Filas (tramas, 1 = tono oscuro del color): liso, puntos, líneas, diagonal, tablero, casi oscuro. */
  const COLORS = [
    ['#ec6ea0', '#a8336a'],  // 0 rosa
    ['#a4be5c', '#5f7a2a'],  // 1 pistacho
    ['#f2ede2', '#b9ab90'],  // 2 papel
    ['#17140f', '#000000'],  // 3 tinta
    ['#f4a8c6', '#c94f84'],  // 4 rosa suave
  ];
  const PATTERNS = [
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],   // 0 liso
    [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],   // 1 puntos
    [1,1,1,1, 0,0,0,0, 1,1,1,1, 0,0,0,0],   // 2 líneas (sombra)
    [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],   // 3 diagonal
    [1,0,1,0, 0,1,0,1, 1,0,1,0, 0,1,0,1],   // 4 tablero (sombra profunda)
    [1,1,1,1, 1,0,1,1, 1,1,1,1, 1,1,1,0],   // 5 casi oscuro
  ];
  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const TW = COLORS.length * CELL, TH = PATTERNS.length * CELL;
  const texData = new Uint8Array(TW * TH * 4);
  COLORS.forEach(([lo, dk], c) => PATTERNS.forEach((m, p) => {
    for (let y = 0; y < CELL; y++) for (let x = 0; x < CELL; x++) {
      const rgb = hex(m[y * CELL + x] ? dk : lo);
      const i = ((p * CELL + y) * TW + c * CELL + x) * 4;
      texData.set([...rgb, 255], i);
    }
  }));
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, TW, TH, 0, gl.RGBA, gl.UNSIGNED_BYTE, texData);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  /* ---------- Shaders ---------- */
  const VS = `
    attribute vec3 aPos; attribute vec3 aNrm;
    uniform mat4 uView; uniform mat4 uGroup;
    uniform vec3 uOffset; uniform vec3 uScale; uniform float uOutline;
    varying vec3 vN;
    void main() {
      vec3 n = normalize(aNrm / uScale);                 // normal de un elipsoide
      vec3 local = aPos * uScale + uOffset;
      vec4 world = uGroup * vec4(local, 1.0);
      vec3 nw = normalize(mat3(uGroup) * n);
      world.xyz += nw * uOutline;                        // casco invertido para el contorno
      vN = nw;
      gl_Position = uView * world;
    }`;
  const FS = `
    precision mediump float;
    uniform sampler2D uPal; uniform vec2 uPalSize;
    uniform vec3 uLight; uniform float uCol; uniform float uPat;
    uniform float uT1; uniform float uT2; uniform float uPx;
    uniform vec4 uFlat;                                   // contorno: color plano si a > 0
    varying vec3 vN;
    void main() {
      if (uFlat.a > 0.5) { gl_FragColor = vec4(uFlat.rgb, 1.0); return; }
      float ndl = dot(normalize(vN), uLight);
      float pat = uPat;
      if (ndl < uT2) pat = 4.0;                           // sombra profunda: tablero
      else if (ndl < uT1) pat = 2.0;                      // sombra: líneas
      vec2 local = mod(floor(gl_FragCoord.xy / uPx), 4.0);
      vec2 texel = vec2(uCol * 4.0, pat * 4.0) + local + 0.5;
      gl_FragColor = vec4(texture2D(uPal, texel / uPalSize).rgb, 1.0);
    }`;
  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  const U = {};
  ['uView', 'uGroup', 'uOffset', 'uScale', 'uOutline', 'uPal', 'uPalSize', 'uLight', 'uCol', 'uPat', 'uT1', 'uT2', 'uPx', 'uFlat']
    .forEach(n => { U[n] = gl.getUniformLocation(prog, n); });
  const aPos = gl.getAttribLocation(prog, 'aPos'), aNrm = gl.getAttribLocation(prog, 'aNrm');

  /* ---------- Mallas ---------- */
  function mesh(pos, nrm, idx) {
    // Todas las caras hacia fuera: si el triángulo no mira como su normal, se le da la vuelta
    for (let t = 0; t < idx.length; t += 3) {
      const [i0, i1, i2] = [idx[t] * 3, idx[t + 1] * 3, idx[t + 2] * 3];
      const e1 = [0, 1, 2].map(k => pos[i1 + k] - pos[i0 + k]), e2 = [0, 1, 2].map(k => pos[i2 + k] - pos[i0 + k]);
      const cr = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
      const nn = [0, 1, 2].map(k => nrm[i0 + k] + nrm[i1 + k] + nrm[i2 + k]);
      if (cr[0] * nn[0] + cr[1] * nn[1] + cr[2] * nn[2] < 0) { const tmp = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = tmp; }
    }
    const b = k => { const buf = gl.createBuffer(); gl.bindBuffer(k === 'i' ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER, buf); return buf; };
    const p = b(); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
    const n = b(); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(nrm), gl.STATIC_DRAW);
    const i = b('i'); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
    return { p, n, i, count: idx.length };
  }
  function sphere(seg = 18, ring = 12) {
    const pos = [], idx = [];
    for (let r = 0; r <= ring; r++) {
      const v = r / ring * Math.PI;
      for (let s = 0; s <= seg; s++) {
        const u = s / seg * Math.PI * 2;
        pos.push(Math.sin(v) * Math.cos(u), Math.cos(v), Math.sin(v) * Math.sin(u));
      }
    }
    for (let r = 0; r < ring; r++) for (let s = 0; s < seg; s++) {
      const a = r * (seg + 1) + s, b2 = a + seg + 1;
      idx.push(a, b2, a + 1, b2, b2 + 1, a + 1);
    }
    return mesh(pos, pos, idx);
  }
  function cylinder(seg = 16) {
    const pos = [], nrm = [], idx = [];
    for (let s = 0; s <= seg; s++) {               // lateral
      const u = s / seg * Math.PI * 2, x = Math.cos(u), z = Math.sin(u);
      pos.push(x, -1, z, x, 1, z); nrm.push(x, 0, z, x, 0, z);
    }
    for (let s = 0; s < seg; s++) { const a = s * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    for (const y of [-1, 1]) {                     // tapas
      const c = pos.length / 3; pos.push(0, y, 0); nrm.push(0, y, 0);
      for (let s = 0; s <= seg; s++) { const u = s / seg * Math.PI * 2; pos.push(Math.cos(u), y, Math.sin(u)); nrm.push(0, y, 0); }
      for (let s = 0; s < seg; s++) idx.push(c, c + 1 + s, c + 2 + s);
    }
    return mesh(pos, nrm, idx);
  }
  const SPH = sphere(), CYL = cylinder();

  /* ---------- La oveja (misma silueta que deco.js: lana a bolitas, cara, orejas y patas) ----------
     [malla, desplazamiento, escala, columna de color, trama propia] */
  const ROSA = 0, PIST = 1, PAPEL = 2, TINTA = 3, ROSA2 = 4;
  const S = (o, s, col, pat = 0) => [SPH, o, s, col, pat];
  const C = (o, s, col, pat = 0) => [CYL, o, s, col, pat];
  const SHEEP = [
    // lana
    S([0, 0.15, 0], [1.05, 0.9, 0.85], PAPEL), S([-0.65, 0.35, 0.25], [0.55, 0.55, 0.55], PAPEL),
    S([-0.55, 0.3, -0.35], [0.55, 0.55, 0.55], PAPEL), S([0.1, 0.65, 0.3], [0.55, 0.5, 0.5], PAPEL),
    S([0.15, 0.65, -0.3], [0.55, 0.5, 0.5], PAPEL), S([-0.25, 0.75, 0], [0.5, 0.45, 0.5], PAPEL),
    S([0.55, 0.35, 0.3], [0.5, 0.5, 0.5], PAPEL), S([0.5, 0.3, -0.35], [0.5, 0.5, 0.5], PAPEL),
    S([-0.95, 0.15, 0], [0.4, 0.4, 0.45], PAPEL),
    // cabeza, mechón y orejas
    S([1.1, 0.55, 0], [0.42, 0.48, 0.4], ROSA), S([1.0, 0.98, 0], [0.26, 0.2, 0.26], PAPEL),
    S([1.0, 0.75, 0.38], [0.12, 0.08, 0.26], ROSA2), S([1.0, 0.75, -0.38], [0.12, 0.08, 0.26], ROSA2),
    S([1.42, 0.62, 0.15], [0.07, 0.09, 0.07], TINTA), S([1.42, 0.62, -0.15], [0.07, 0.09, 0.07], TINTA),
    // patas
    C([-0.5, -0.75, 0.3], [0.13, 0.32, 0.13], TINTA), C([-0.5, -0.75, -0.3], [0.13, 0.32, 0.13], TINTA),
    C([0.45, -0.75, 0.3], [0.13, 0.32, 0.13], TINTA), C([0.45, -0.75, -0.3], [0.13, 0.32, 0.13], TINTA),
    // isla de césped (con su propia trama de puntos, como el rough del juego)
    C([0, -1.2, 0], [1.6, 0.14, 1.6], PIST, 1),
  ];

  /* ---------- Matrices (columna mayor, como WebGL) ---------- */
  const mul = (a, b) => {
    const o = new Float32Array(16);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++)
      o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    return o;
  };
  const rotY = t => new Float32Array([Math.cos(t), 0, -Math.sin(t), 0, 0, 1, 0, 0, Math.sin(t), 0, Math.cos(t), 0, 0, 0, 0, 1]);
  const rotX = t => new Float32Array([1, 0, 0, 0, 0, Math.cos(t), Math.sin(t), 0, 0, -Math.sin(t), Math.cos(t), 0, 0, 0, 0, 1]);
  const trans = (x, y, z) => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
  const ortho = (w, h) => new Float32Array([2 / w, 0, 0, 0, 0, 2 / h, 0, 0, 0, 0, 0.1, 0, 0, 0, 0, 1]);

  /* ---------- Bucle ---------- */
  let W = 0, H = 0;
  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    canvas.width = W; canvas.height = H;
    gl.viewport(0, 0, W, H);
  }
  addEventListener('resize', resize);
  resize();

  const light = [0.55, 0.7, 0.45];                 // hacia la luz (mundo)
  let target = light.slice();
  addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    const v = [x * 1.2, -y * 1.2 + 0.3, 0.9];
    const l = Math.hypot(...v); target = v.map(c => c / l);
  }, { passive: true });

  function outlineColor() {
    // Contorno en tinta; en el tema oscuro, en rosa para que se vea sobre el fondo negro
    return document.documentElement.getAttribute('data-theme') === 'light' ? [0.09, 0.08, 0.06] : [0.925, 0.43, 0.63];
  }

  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CW);          // la proyección invierte el eje z: lo de fuera queda en sentido horario
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.uniform1i(U.uPal, 0);
  gl.uniform2f(U.uPalSize, TW, TH);
  gl.uniform1f(U.uT1, 0.32);
  gl.uniform1f(U.uT2, -0.15);
  gl.uniform1f(U.uPx, PX);

  function draw(t) {
    for (let i = 0; i < 3; i++) light[i] += (target[i] - light[i]) * 0.08;
    const ll = Math.hypot(...light);
    gl.uniform3f(U.uLight, light[0] / ll, light[1] / ll, light[2] / ll);

    const zoom = Math.min(W, H * 1.25) / 4.9;
    // Cámara isométrica: inclinada 25° y vista desde la diagonal
    const view = mul(ortho(W / zoom, H / zoom), mul(rotX(-0.42), rotY(-0.65)));
    const yaw = reduceMotion.matches ? 0.5 : t * 0.00035;
    const bob = reduceMotion.matches ? 0 : Math.sin(t * 0.002) * 0.06;
    const group = mul(trans(0, bob, 0), rotY(yaw));
    gl.uniformMatrix4fv(U.uView, false, view);
    gl.uniformMatrix4fv(U.uGroup, false, group);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const oc = outlineColor();
    for (const pass of [0, 1]) {                    // 0 = contorno (caras traseras), 1 = color
      gl.cullFace(pass ? gl.BACK : gl.FRONT);
      gl.uniform4f(U.uFlat, oc[0], oc[1], oc[2], pass ? 0 : 1);
      for (const [m, o, s, col, pat] of SHEEP) {
        gl.bindBuffer(gl.ARRAY_BUFFER, m.p); gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, m.n); gl.enableVertexAttribArray(aNrm); gl.vertexAttribPointer(aNrm, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.i);
        gl.uniform3fv(U.uOffset, o); gl.uniform3fv(U.uScale, s);
        gl.uniform1f(U.uOutline, pass ? 0 : 0.045);
        gl.uniform1f(U.uCol, col); gl.uniform1f(U.uPat, pat);
        gl.drawElements(gl.TRIANGLES, m.count, gl.UNSIGNED_SHORT, 0);
      }
    }
  }

  let raf = 0, visible = true;
  function loop(t) { draw(t); raf = reduceMotion.matches ? 0 : requestAnimationFrame(loop); }
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(loop);
    if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(canvas);
  addEventListener('pointermove', () => { if (reduceMotion.matches && visible) draw(0); }, { passive: true });
  raf = requestAnimationFrame(loop);
}

// La ficha se vuelve a pintar al cambiar de idioma: cada lienzo nuevo se arranca solo
const scan = () => document.querySelectorAll('.oveja-dither:not([data-on])').forEach(c => { c.dataset.on = '1'; setup(c); });
scan();
new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
})();
