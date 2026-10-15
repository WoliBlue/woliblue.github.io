/* ============ Portada: un poco de dither de fondo, con paleta + tramas (rama inicio-dither) ============
   La técnica de Golf Tycoon (Walaber, Reason & Rhyme) aplicada a un fondo:
   - Un campo de "sombra" que se mueve despacio (ruido suave + degradado hacia abajo a la derecha).
   - La sombra no se pinta con grises: se cuantiza en escalones y cada escalón es una trama de 4×4
     sacada de una sola textura-paleta (liso, puntos, diagonal, líneas, tablero, casi lleno).
   - La trama va anclada a la pantalla, a píxel grande: los cuadraditos.
   - El ratón es una luz: alrededor del cursor la sombra baja y la trama se aclara.
   Va detrás del nombre, el rol y los botones: lo «liso» es transparente (se ve el fondo de la web) y la
   trama es el color de acento, suave. Arriba a la izquierda, donde está el texto, casi no hay trama.
   WebGL 1 a pelo, sin librerías (CSP: script-src 'self'). */
(function () {
  const canvas = document.querySelector('.hero-dither');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false });
  if (!gl) { canvas.remove(); return; }

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const PX = 4;                 // píxeles de pantalla por cuadradito
  const CELL = 4;

  /* ---------- Textura-paleta: una columna por tema, una fila por trama ---------- */
  const THEMES = {             // [hueco, trama] en RGBA: el hueco es transparente
    dark: [[0, 0, 0, 0], [236, 110, 160, 70]],
    light: [[0, 0, 0, 0], [23, 20, 15, 45]],
  };
  const PATTERNS = [            // de menos a más sombra (1 = color de la trama)
    [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],   // 0 liso
    [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],   // 1 puntos sueltos
    [1,0,0,0, 0,0,0,0, 0,0,1,0, 0,0,0,0],   // 2 puntos
    [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1],   // 3 diagonal
    [1,1,1,1, 0,0,0,0, 1,1,1,1, 0,0,0,0],   // 4 líneas
    [1,0,1,0, 0,1,0,1, 1,0,1,0, 0,1,0,1],   // 5 tablero
    [1,1,1,1, 1,0,1,1, 1,1,1,1, 1,1,1,0],   // 6 casi lleno
  ];
  const LEVELS = PATTERNS.length;
  const cols = Object.values(THEMES);
  const TW = cols.length * CELL, TH = LEVELS * CELL;
  const data = new Uint8Array(TW * TH * 4);
  cols.forEach(([bg, ink], c) => PATTERNS.forEach((m, p) => {
    for (let y = 0; y < CELL; y++) for (let x = 0; x < CELL; x++) {
      data.set(m[y * CELL + x] ? ink : bg, ((p * CELL + y) * TW + c * CELL + x) * 4);
    }
  }));
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, TW, TH, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.NEAREST], [gl.TEXTURE_MAG_FILTER, gl.NEAREST],
                        [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);

  /* ---------- Shaders ---------- */
  const VS = 'attribute vec2 aPos; void main() { gl_Position = vec4(aPos, 0.0, 1.0); }';
  const FS = `
    precision mediump float;
    uniform sampler2D uPal; uniform vec2 uPalSize; uniform vec2 uRes;
    uniform float uTime; uniform vec2 uMouse; uniform float uCol; uniform float uPx;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
    }
    void main() {
      vec2 cell = floor(gl_FragCoord.xy / uPx);           // cuadradito de pantalla
      vec2 uv = cell * uPx / uRes;                         // 0..1, y hacia arriba
      // Sombra: nubes lentas, más densa abajo a la derecha y casi nada arriba a la izquierda (el texto)
      vec2 q = uv * vec2(uRes.x / uRes.y, 1.0) * 2.2;
      float n = noise(q + vec2(uTime * 0.05, uTime * 0.02)) * 0.6 + noise(q * 2.3 - vec2(uTime * 0.03, 0.0)) * 0.4;
      float shade = n * 0.6 + uv.x * 0.55 - uv.y * 0.3 - 0.12;
      // La luz del ratón aclara la trama a su alrededor
      vec2 d = (uv - uMouse) * vec2(uRes.x / uRes.y, 1.0);
      shade -= 0.55 * exp(-dot(d, d) * 9.0);
      float level = clamp(floor(shade * ${LEVELS}.0), 0.0, ${LEVELS - 1}.0);
      vec2 local = mod(cell, 4.0);
      vec2 texel = vec2(uCol * 4.0, level * 4.0) + local + 0.5;
      gl_FragColor = texture2D(uPal, texel / uPalSize);
    }`;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o);
    if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  const U = {};
  ['uPal', 'uPalSize', 'uRes', 'uTime', 'uMouse', 'uCol', 'uPx'].forEach(n => { U[n] = gl.getUniformLocation(prog, n); });

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  gl.uniform1i(U.uPal, 0);
  gl.uniform2f(U.uPalSize, TW, TH);
  gl.uniform1f(U.uPx, PX);

  /* ---------- Tamaño, ratón y bucle ---------- */
  let W = 0, H = 0;
  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    canvas.width = W; canvas.height = H;
    gl.viewport(0, 0, W, H);
    gl.uniform2f(U.uRes, W, H);
  }
  addEventListener('resize', resize);
  resize();

  const mouse = [-2, -2], target = [-2, -2];        // fuera de la pantalla hasta que se mueva
  addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    target[0] = (e.clientX - r.left) / r.width;
    target[1] = 1 - (e.clientY - r.top) / r.height;
    if (mouse[0] < -1) { mouse[0] = target[0]; mouse[1] = target[1]; }
  }, { passive: true });

  const theme = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 0);
  const start = performance.now();
  function draw(now) {
    mouse[0] += (target[0] - mouse[0]) * 0.1;
    mouse[1] += (target[1] - mouse[1]) * 0.1;
    gl.uniform1f(U.uTime, reduceMotion.matches ? 0 : (now - start) / 1000);
    gl.uniform2f(U.uMouse, mouse[0], mouse[1]);
    gl.uniform1f(U.uCol, theme());
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  let raf = 0, visible = true, last = 0;
  function loop(now) {
    // 20 fps bastan para un fondo: menos batería, y el salto entre fotogramas va con el estilo
    if (now - last > 50) { draw(now); last = now; }
    raf = requestAnimationFrame(loop);
  }
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(loop);
    if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(canvas);
  raf = requestAnimationFrame(loop);
})();
