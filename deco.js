/* ============ Personajes del fondo (diseño original) ============
   Dos familias, con los colores en variables CSS para que cambien con el tema:
   - Baldosas (página principal y 404): mismo sistema que los iconos de Offline
     Working Sheep. Baldosa redondeada de un color, criatura geométrica, ojos
     "huecos" del color de la baldosa y un único acento.
   - Ilustraciones sueltas (fichas de proyecto): el topo y el espeto.
   Uso: <span class="mascot" data-deco="tileSheep"></span>  → paintDeco() lo rellena. */

let decoId = 0;

// Baldosa w×h con la criatura recortada dentro
function decoTile(w, h, tile, inner) {
  const id = 'dclip' + (++decoId);
  return `<svg viewBox="0 0 ${w} ${h}" style="--tile: var(--tile-${tile})">
    <defs><clipPath id="${id}"><rect width="${w}" height="${h}" rx="${Math.min(w, h) * 0.26}"/></clipPath></defs>
    <g clip-path="url(#${id})"><rect class="t-bg" width="${w}" height="${h}"/>${inner}</g>
  </svg>`;
}

const SHEEP_PARTS = `
  <g class="c-body">
    <circle cx="40" cy="30" r="8"/><circle cx="50" cy="25" r="9"/><circle cx="60" cy="30" r="8"/>
    <ellipse cx="22" cy="48" rx="12" ry="5.5" transform="rotate(-18 22 48)"/>
    <ellipse cx="78" cy="48" rx="12" ry="5.5" transform="rotate(18 78 48)"/>
    <rect x="30" y="31" width="40" height="40" rx="14"/>
    <circle cx="37" cy="70" r="9"/><circle cx="50" cy="74" r="10"/><circle cx="63" cy="70" r="9"/>
  </g>
  <g class="t-hole deco-blink"><circle cx="42" cy="49" r="4.2"/><circle cx="58" cy="49" r="4.2"/></g>
  <path class="c-accent c-round" d="M45.5 58 L54.5 58 L50 64 Z"/>`;

const TILES = {
  // GitHub (enlace en el footer)
  tileGithub: () => decoTile(100, 100, 'github', `
    <path class="c-body" fill-rule="evenodd" clip-rule="evenodd" d="M50 18C32.33 18 18 32.33 18 50c0 14.14 9.17 26.14 21.89 30.38 1.6.3 2.19-.7 2.19-1.54 0-.76-.03-3.27-.04-6-8.89 1.93-10.77-3.77-10.77-3.77-1.45-3.7-3.55-4.68-3.55-4.68-2.9-.2.22-1.95.22-1.95 3.21.23 4.9 3.29 4.9 3.29 2.85 4.88 7.48 3.47 9.3 2.65.29-2.06 1.12-3.47 2.03-4.27-7.1-.81-14.56-3.55-14.56-15.8 0-3.49 1.25-6.34 3.29-8.58-.33-.81-1.43-4.06.31-8.47 0 0 2.68-.86 8.79 3.28 2.55-.71 5.28-1.07 8-1.07 2.72 0 5.45.36 8 1.07 6.1-4.14 8.78-3.28 8.78-3.28 1.75 4.41.65 7.66.32 8.47 2.05 2.24 3.28 5.09 3.28 8.58 0 12.29-7.48 14.98-14.6 15.77 1.15.99 2.17 2.94 2.17 5.93 0 4.28-.04 7.74-.04 8.8 0 .85.58 1.86 2.21 1.54C72.85 76.13 82 64.13 82 50c0-17.67-14.33-32-32-32z"/>`),

  // itch.io (enlace en el footer): tiendita con toldo festoneado
  tileItch: () => decoTile(100, 100, 'itch', `
    <g class="c-body">
      <path d="M26 20 L74 20 L80 31 L20 31 Z"/>
      <circle cx="26" cy="31" r="6"/><circle cx="38" cy="31" r="6"/><circle cx="50" cy="31" r="6"/><circle cx="62" cy="31" r="6"/><circle cx="74" cy="31" r="6"/>
      <path d="M25 36 L75 36 L75 72 Q75 80 67 80 L33 80 Q25 80 25 72 Z"/>
    </g>
    <g class="t-hole"><circle cx="40" cy="52" r="5"/><circle cx="60" cy="52" r="5"/><rect x="44" y="63" width="12" height="4" rx="2"/></g>`),

  // LinkedIn (enlace en el footer)
  tileLinkedin: () => decoTile(100, 100, 'linkedin', `
    <g transform="translate(0, 1) scale(4.15)">
      <path class="c-body" d="M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77zM18.5 18.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75"/>
    </g>`),

  // Oveja (Offline Working Sheep)
  tileSheep: () => decoTile(100, 100, 'olive', SHEEP_PARTS),

  // La oveja perdida de la 404
  tileSheepLost: () => decoTile(100, 100, 'olive', SHEEP_PARTS +
    `<text class="c-body deco-bob" x="72" y="30" font-family="Archivo Black, sans-serif" font-size="20">?</text>`),

  // Topo minero asomando por el borde de abajo (Dig Me Out)
  tileMole: () => decoTile(100, 100, 'deep', `
    <g class="deco-peek">
      <path class="c-ink" d="M24 106 L24 60 Q24 36 50 36 Q76 36 76 60 L76 106 Z"/>
      <path class="c-body" d="M29 44 Q29 25 50 25 Q71 25 71 44 Z"/>
      <rect class="c-body" x="25" y="41" width="50" height="6" rx="3"/>
      <circle class="c-accent" cx="50" cy="34" r="4.5"/>
      <g class="t-hole deco-blink"><circle cx="41" cy="57" r="3.6"/><circle cx="59" cy="57" r="3.6"/></g>
      <ellipse class="c-soft" cx="50" cy="69" rx="9" ry="6.5"/>
      <circle class="c-ink" cx="50" cy="66.5" r="2.6"/>
    </g>
    <g class="c-body">
      <rect x="17" y="89" width="23" height="16" rx="8"/><circle cx="21" cy="90" r="3.6"/><circle cx="28.5" cy="88" r="3.6"/><circle cx="36" cy="90" r="3.6"/>
      <rect x="60" y="89" width="23" height="16" rx="8"/><circle cx="64" cy="90" r="3.6"/><circle cx="71.5" cy="88" r="3.6"/><circle cx="79" cy="90" r="3.6"/>
    </g>`),

  // Sardina en bloques de color, con la cola cortada por la baldosa (Málaga)
  tileFish: () => {
    const id = 'dfish' + (++decoId);
    return decoTile(140, 84, 'olive', `
      <g class="deco-sway">
        <defs><clipPath id="${id}"><path d="M16 42 Q62 4 114 42 Q62 80 16 42 Z"/></clipPath></defs>
        <path class="c-soft" d="M104 42 L152 14 L152 70 Z"/>
        <path class="c-body" d="M16 42 Q62 4 114 42 Q62 80 16 42 Z"/>
        <path class="c-soft" clip-path="url(#${id})" d="M0 0 L140 0 L140 34 L0 46 Z"/>
        <circle class="t-hole" cx="33" cy="38" r="4"/>
        <path class="t-line" d="M49 23 Q41 42 49 61"/>
      </g>`);
  },

  // Porción de pizza (Pizza Kaisen)
  tilePizza: () => decoTile(100, 100, 'ink', `
    <path class="c-body c-round-lg" d="M24 30 Q50 19 76 30 L50 84 Z"/>
    <path class="c-crust" d="M17 27 Q50 11 83 27 L79 36 Q50 22 21 36 Z"/>
    <g class="c-accent"><circle cx="38" cy="43" r="4.5"/><circle cx="62" cy="43" r="4"/><circle cx="51" cy="68" r="3.5"/></g>
    <g class="t-hole deco-blink"><circle cx="44" cy="53" r="3.4"/><circle cx="56" cy="53" r="3.4"/></g>
    <path class="t-line t-line-sm" d="M46 59.5 Q50 63 54 59.5"/>`),

  // --- Iconos de cada ficha de proyecto ---

  // Figurines Please: Rey Mago de figurita de Belén
  tileKing: () => decoTile(100, 100, 'olive', `
    <path class="c-accent" d="M14 104 Q18 82 50 82 Q82 82 86 104 Z"/>
    <rect class="c-body" x="30" y="34" width="40" height="36" rx="12"/>
    <path class="c-accent c-round" d="M31 38 L31 20 L41 29 L50 15 L59 29 L69 20 L69 38 Z"/>
    <circle class="t-hole" cx="50" cy="30" r="2.6"/>
    <g class="c-soft"><rect x="27" y="61" width="46" height="11" rx="5.5"/><circle cx="36" cy="72" r="8"/><circle cx="50" cy="77" r="9"/><circle cx="64" cy="72" r="8"/></g>
    <g class="t-hole deco-blink"><circle cx="42" cy="49" r="3.8"/><circle cx="58" cy="49" r="3.8"/></g>
    <circle class="c-accent" cx="50" cy="57" r="3"/>`),

  // EVAD TALE: la puerta cerrada de la sala de profesores
  tileDoor: () => decoTile(100, 100, 'ink', `
    <rect class="c-soft" x="0" y="90" width="100" height="10"/>
    <path class="c-body" d="M29 90 L29 36 Q29 17 50 17 Q71 17 71 36 L71 90 Z"/>
    <rect class="c-soft" x="40" y="29" width="20" height="7" rx="3"/>
    <circle class="t-hole" cx="50" cy="55" r="5.5"/><path class="t-hole" d="M46.5 57 L53.5 57 L56 71 L44 71 Z"/>
    <circle class="c-accent" cx="63" cy="62" r="3.5"/>`),

  // Offline Working Sheep: la oveja-robot, con antena
  tileSheepBot: () => decoTile(100, 100, 'olive', `
    <path class="c-line-body" d="M50 18 L50 9"/><circle class="c-accent" cx="50" cy="8" r="4.5"/>` + SHEEP_PARTS),

  // ChatDefender XP: gatito del blog
  tileCat: () => decoTile(100, 100, 'deep', `
    <path class="c-body c-round-lg" d="M28 44 L32 18 L50 34 Z"/><path class="c-body c-round-lg" d="M72 44 L68 18 L50 34 Z"/>
    <path class="c-soft" d="M34 34 L35.5 24 L43 31 Z"/><path class="c-soft" d="M66 34 L64.5 24 L57 31 Z"/>
    <path class="c-body" d="M30 104 Q30 78 50 78 Q70 78 70 104 Z"/>
    <rect class="c-body" x="22" y="30" width="56" height="46" rx="20"/>
    <g class="t-hole deco-blink"><circle cx="39" cy="51" r="4.2"/><circle cx="61" cy="51" r="4.2"/></g>
    <path class="c-accent c-round" d="M46.5 59 L53.5 59 L50 63 Z"/>
    <g class="c-line-soft"><path d="M36 62 L14 58"/><path d="M36 67 L15 69"/><path d="M64 62 L86 58"/><path d="M64 67 L85 69"/></g>`),

  // RestaurantOS: campana de restaurante con carita
  tileCloche: () => decoTile(100, 100, 'olive', `
    <g class="c-line-soft"><path d="M35 25 Q30 19 35 12"/><path d="M65 25 Q70 19 65 12"/></g>
    <rect class="c-accent" x="46.5" y="27" width="7" height="8" rx="2"/><circle class="c-accent" cx="50" cy="27" r="5"/>
    <path class="c-body" d="M19 71 Q19 34 50 34 Q81 34 81 71 Z"/>
    <rect class="c-soft" x="12" y="70" width="76" height="9" rx="4.5"/>
    <g class="t-hole deco-blink"><circle cx="41" cy="54" r="3.8"/><circle cx="59" cy="54" r="3.8"/></g>
    <path class="t-line t-line-sm" d="M46 61 Q50 64.5 54 61"/>`),

  // Memorias de un Maestro: libro abierto con marcapáginas
  tileBook: () => decoTile(100, 100, 'deep', `
    <path class="c-body" d="M13 32 Q31 24 50 32 L50 80 Q31 72 13 80 Z"/>
    <path class="c-body" d="M50 32 Q69 24 87 32 L87 80 Q69 72 50 80 Z"/>
    <path class="t-line" d="M50 32 L50 80"/>
    <g class="c-line-soft"><path d="M20 42 Q31 37 43 42"/><path d="M20 51 Q31 46 43 51"/><path d="M20 60 Q31 55 43 60"/><path d="M57 42 Q68 37 80 42"/><path d="M57 51 Q68 46 76 49"/></g>
    <path class="c-accent" d="M64 29 L64 94 L68.5 89 L73 94 L73 29 Z"/>`),

  // Playdate Music Player: la consola con bobinas de casete y su manivela
  tilePlaydate: () => decoTile(100, 100, 'ink', `
    <rect class="c-soft" x="72" y="45" width="9" height="4"/><rect class="c-crust" x="80" y="38" width="6" height="20" rx="3"/>
    <rect class="c-body" x="17" y="20" width="58" height="62" rx="9"/>
    <rect class="t-hole" x="23" y="26" width="46" height="31" rx="3"/>
    <g class="c-body"><circle cx="37" cy="41" r="6"/><circle cx="55" cy="41" r="6"/><rect x="37" y="46" width="18" height="2.4"/></g>
    <g class="t-hole"><circle cx="37" cy="41" r="2"/><circle cx="55" cy="41" r="2"/></g>
    <g class="c-soft"><rect x="26" y="66" width="13" height="4.5" rx="1.5"/><rect x="30.25" y="61.75" width="4.5" height="13" rx="1.5"/></g>
    <g class="c-accent"><circle cx="58" cy="70" r="3.6"/><circle cx="66" cy="64" r="3.6"/></g>`)
};

const DECO = {
  // Avatar de "Sobre mí": gato robot azul (el azul de la cabra de Offline Working Sheep)
  avatar: `<svg viewBox="0 0 200 200">
    <path class="r-blue" d="M38 214 Q42 150 100 150 Q158 150 162 214 Z"/>
    <rect class="r-dark" x="76" y="164" width="48" height="28" rx="9"/>
    <circle class="r-pink" cx="90" cy="178" r="5"/><circle class="r-light" cx="110" cy="178" r="5"/>
    <path class="r-stroke" d="M100 56 L100 28"/><circle class="r-pink" cx="100" cy="24" r="8"/>
    <path class="r-blue r-join" d="M54 88 L62 36 L98 68 Z"/><path class="r-blue r-join" d="M146 88 L138 36 L102 68 Z"/>
    <path class="r-dark" d="M64 74 L68 50 L86 66 Z"/><path class="r-dark" d="M136 74 L132 50 L114 66 Z"/>
    <rect class="r-blue" x="42" y="56" width="116" height="98" rx="42"/>
    <rect class="r-dark" x="58" y="78" width="84" height="44" rx="22"/>
    <g class="r-light deco-blink"><rect x="76" y="89" width="16" height="22" rx="8"/><rect x="108" y="89" width="16" height="22" rx="8"/></g>
    <circle class="r-pink" cx="62" cy="132" r="7"/><circle class="r-pink" cx="138" cy="132" r="7"/>
    <path class="r-mouth" d="M88 132 Q94 139 100 132 Q106 139 112 132"/>
    <g class="r-whisker"><path d="M44 124 L24 119"/><path d="M44 134 L24 136"/><path d="M156 124 L176 119"/><path d="M156 134 L176 136"/></g>
  </svg>`,

  // Topo minero asomando del agujero (Dig Me Out)
  mole: `<svg viewBox="0 0 200 170">
    <g class="deco-peek">
      <path class="d-m" d="M52 150 L52 84 Q52 30 100 30 Q148 30 148 84 L148 150 Z"/>
      <path class="d-b" d="M56 64 Q58 20 100 20 Q142 20 144 64 Z"/>
      <rect class="d-b" x="48" y="58" width="104" height="10" rx="5"/>
      <circle class="d-p" cx="100" cy="40" r="10"/><circle class="d-e" cx="100" cy="40" r="4.5"/>
      <g class="deco-blink"><path class="d-line-e" d="M76 90 q8 -8 16 0"/><path class="d-line-e" d="M108 90 q8 -8 16 0"/></g>
      <ellipse class="d-p" cx="100" cy="108" rx="17" ry="12"/>
      <ellipse class="d-k" cx="100" cy="102" rx="6" ry="4"/>
    </g>
    <path class="d-g" d="M0 170 L0 152 Q8 126 50 122 Q100 116 150 122 Q192 126 200 152 L200 170 Z"/>
    <g class="d-dirt"><circle cx="30" cy="150" r="3.5"/><circle cx="58" cy="140" r="3"/><circle cx="150" cy="142" r="3.5"/><circle cx="176" cy="154" r="3"/><circle cx="104" cy="156" r="3"/></g>
    <g class="d-p">
      <ellipse cx="62" cy="126" rx="16" ry="9"/><circle cx="50" cy="127" r="6"/><circle cx="60" cy="122" r="6"/><circle cx="71" cy="124" r="6"/>
      <ellipse cx="138" cy="126" rx="16" ry="9"/><circle cx="150" cy="127" r="6"/><circle cx="140" cy="122" r="6"/><circle cx="129" cy="124" r="6"/>
    </g>
  </svg>`,

  // Espeto de sardinas (Málaga)
  sardine: `<svg viewBox="0 0 240 120">
    <rect class="d-a" x="0" y="57" width="240" height="7" rx="3.5"/>
    <g class="deco-sway">
      <path class="d-m" d="M46 60 L10 32 Q20 60 10 88 Z"/>
      <path class="d-m" d="M108 30 L124 10 L140 30 Z"/>
      <path class="d-b" d="M40 60 Q80 18 150 26 Q186 32 204 60 Q186 88 150 94 Q80 102 40 60 Z"/>
      <path class="d-m" d="M42 58 Q80 20 150 28 Q185 34 200 56 Q140 46 42 58 Z"/>
      <g class="d-e"><circle cx="92" cy="40" r="3.5"/><circle cx="114" cy="36" r="3.5"/><circle cx="136" cy="36" r="3.5"/></g>
      <path class="d-line-m" d="M160 42 Q152 62 160 82"/>
      <g class="deco-blink"><circle class="d-e" cx="177" cy="56" r="11"/><circle class="d-k" cx="181" cy="57" r="5"/></g>
      <path class="d-line-k" d="M200 68 q-6 4 -12 1"/>
      <g class="d-a"><rect x="86" y="70" width="22" height="5" rx="2.5" transform="rotate(-30 97 72)"/><rect x="116" y="72" width="22" height="5" rx="2.5" transform="rotate(-30 127 74)"/></g>
    </g>
  </svg>`
};

// Icono de la esquina de cada ficha e ilustración suelta de la columna lateral
const PROJECT_TILE = {
  'tourist-trap': 'tileFish',
  'pizza-kaisen': 'tilePizza',
  'figurines-please': 'tileKing',
  'evad-tale': 'tileDoor',
  'offline-working-sheep': 'tileSheepBot',
  'chatdefenderxp': 'tileCat',
  'dig-me-out': 'tileMole',
  'restaurantos': 'tileCloche',
  'memorias-de-un-maestro': 'tileBook',
  'playdate-music-player': 'tilePlaydate'
};
const PROJECT_ILLUSTRATION = {
  'tourist-trap': 'sardine',
  'dig-me-out': 'mole'
};

function decoSvg(name) {
  if (TILES[name]) return TILES[name]();
  return DECO[name] || '';
}

function decoMarkup(name, cls) {
  return `<span class="mascot ${cls || ''}" data-deco="${name}" aria-hidden="true">${decoSvg(name)}</span>`;
}

function paintDeco(scope) {
  (scope || document).querySelectorAll('[data-deco]:empty').forEach(function (el) {
    el.innerHTML = decoSvg(el.getAttribute('data-deco'));
    if (!el.hasAttribute('aria-label') && el.tagName !== 'A') {
      el.setAttribute('aria-hidden', 'true');
    }
  });
}

paintDeco();
