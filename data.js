/* Datos de todos los proyectos, en ES/EN. Edita aquí para actualizar tarjetas + páginas de detalle.
 *
 * gallery: lista de imágenes (string) o vídeos ({ video, poster }). Vacía o ausente = sin galería.
 * featured: true = se muestra como tarjeta grande arriba del todo en Juegos (solo uno).
 * video: vídeo que sustituye a la portada en la página de detalle.
 */

const PROJECTS = {

  games: [
    {
      slug: 'tourist-trap',
      font: 'Chewy',
      featured: true,
      cover: { type: 'image', src: 'assets/img/tourist-trap/keyart.jpg' },
      logo: 'assets/img/tourist-trap/logo.png',
      video: { src: 'assets/video/tourist-trap-trailer.mp4', poster: 'assets/img/tourist-trap/title-screen.jpg' },
      gallery: [
        { video: 'assets/video/tourist-trap-trailer.mp4', poster: 'assets/img/tourist-trap/title-screen.jpg' },
        'assets/img/tourist-trap/beach-aerial.jpg',
        'assets/img/tourist-trap/chiringuito.jpg',
        'assets/img/tourist-trap/prep-phase.jpg',
        'assets/img/tourist-trap/service.jpg',
        'assets/img/tourist-trap/minigame-oven.jpg',
        'assets/img/tourist-trap/minigame-pan.jpg',
        'assets/img/tourist-trap/minigame-tomato.jpg',
        'assets/img/tourist-trap/minigame-espetos.jpg',
        { video: 'assets/video/tourist-trap-results.mp4', poster: 'assets/img/tourist-trap/results-anim-poster.jpg' },
        'assets/img/tourist-trap/results.jpg',
        'assets/img/tourist-trap/beach-characters.jpg',
        'assets/img/tourist-trap/kitchen-character.jpg',
        'assets/img/tourist-trap/chiringuito-2.jpg',
        'assets/img/tourist-trap/concept-characters-1.jpg',
        'assets/img/tourist-trap/concept-characters-2.jpg',
        'assets/img/tourist-trap/dishes.jpg'
      ],
      credits: [
        { name: 'Pepe Arenas Venegas', role: 'Game design · Unity' },
        { name: 'Sebastian Olaechea Gazzo', role: 'Unity' },
        { name: 'Amanda Cascales Valentín', role: 'Unity' },
        { name: 'Carlos Cañizares', role: '3D' },
        { name: 'David Olofsson', role: '3D · Rigging · Animación' },
        { name: 'Dani', role: '2D' },
        { name: 'Ernesto', role: '2D' }
      ],
      es: {
        title: 'Tourist Trap',
        badge: 'TFM · YaloséGames',
        alt: 'Arte principal de Tourist Trap',
        summary: 'Simulador de Cocina Tycoon: lleva tu propio chiringuito andaluz, cocina a base de minijuegos y sobrevive a los clientes hambrientos.',
        highlights: [
          'Gestión + Cocina en tiempo real',
          'Minijuegos Variados de Cocina',
          'Eventos caóticos: gaviotas, incendios, tsunamis…'
        ],
        description: [
          'Compras un «Rasca y gana» en la gasolinera y te toca… un chiringuito. Mala suerte: era un «Rasca y paga». El chiringuito está en ruinas, viene con deuda y tu tío Rogelio Chiringelio sueña con verlo algún día en las 5 estrellas.',
          'Cada día se divide en tres fases. En la preparación compras mejoras y colocas el mobiliario desde el móvil; en el servicio tomas comandas, cocinas y sirves en tiempo real antes de que se agote la paciencia de los clientes; y al cierre recibes una nota de la F a la A que sube o baja tu reputación.',
          'Cada estación de cocina es un minijuego: secuencias de flechas en la sartén, pulsar en el momento justo en el horno, machacar botones en la tabla de cortar o vigilar la espetera para que no se queme nada. Todo mientras las gaviotas lo llenan todo de «regalitos», se incendia la cocina o aparecen clientes como Karen, Poseidón o tres gaviotas dentro de una gabardina.',
          'Es el Trabajo Fin de Máster del estudio YaloséGames (en desarrollo empezó llamándose «Guiri’s Trap»). El MVP se presentó en septiembre de 2026; la hoja de ruta incluye expansión del chiringuito, cámara libre, cinemáticas, más narrativa y multijugador.'
        ],
        role: [
          'Game design y programación de gameplay en Unity',
          'Minijuegos de cocina y sistema de clientes',
          'Eventos y hazards (sí, la caca de gaviota)',
          'Diseño de nivel y escenario de pruebas',
          'Iluminación, sonido en escenas y animaciones'
        ],
        tags: ['Unity', 'Management', 'Cooking', 'TFM'],
        meta: [
          { label: 'Estudio', value: 'YaloséGames' },
          { label: 'Tipo', value: 'Trabajo Fin de Máster' },
          { label: 'Género', value: 'Management · Cocina · Arcade' },
          { label: 'Plataforma', value: 'PC' },
          { label: 'Estado', value: 'MVP · septiembre 2026' },
          { label: 'Motor', value: 'Unity' }
        ],
        controls: [
          'WASD / Stick izquierdo — moverse (8 direcciones)',
          'Shift / Botón oeste — sprint',
          'E / Botón sur — interactuar',
          'Flechas / Cruceta — minijuego de la sartén',
          'Ratón — gestión del mobiliario'
        ]
      },
      en: {
        title: 'Tourist Trap',
        badge: 'Master’s thesis · YaloséGames',
        alt: 'Tourist Trap key art',
        summary: 'Cooking Tycoon sim: run your own Andalusian beach bar, cook through minigames and survive the hungry customers.',
        highlights: [
          'Management + real-time Cooking',
          'Varied Cooking Minigames',
          'Chaotic events: seagulls, fires, tsunamis…'
        ],
        description: [
          'You buy a scratch card at the gas station and win… a beach bar. Bad luck: it was a “scratch and pay”. The chiringuito is falling apart, comes with debt, and your uncle Rogelio Chiringelio dreams of seeing it reach 5 stars one day.',
          'Every day has three phases. In preparation you buy upgrades and arrange furniture from your phone; during service you take orders, cook and serve in real time before customers run out of patience; and at closing you get an F-to-A grade that raises or lowers your reputation.',
          'Every kitchen station is a minigame: arrow sequences on the frying pan, perfect timing on the oven, button-mashing on the cutting board, or keeping an eye on the espeto grill so nothing burns. All while seagulls leave “gifts” everywhere, the kitchen catches fire, or customers like Karen, Poseidon or three seagulls in a trench coat walk in.',
          'It’s the master’s thesis project of the YaloséGames studio (it started out as “Guiri’s Trap”). The MVP was presented in September 2026; the roadmap includes bar expansion, free camera, cutscenes, more narrative and multiplayer.'
        ],
        role: [
          'Game design and gameplay programming in Unity',
          'Cooking minigames and customer system',
          'Events and hazards (yes, the seagull poop)',
          'Level design and test scene',
          'Lighting, in-scene audio and animations'
        ],
        tags: ['Unity', 'Management', 'Cooking', 'Master’s thesis'],
        meta: [
          { label: 'Studio', value: 'YaloséGames' },
          { label: 'Type', value: 'Master’s thesis' },
          { label: 'Genre', value: 'Management · Cooking · Arcade' },
          { label: 'Platform', value: 'PC' },
          { label: 'Status', value: 'MVP · September 2026' },
          { label: 'Engine', value: 'Unity' }
        ],
        controls: [
          'WASD / Left stick — move (8 directions)',
          'Shift / West button — sprint',
          'E / South button — interact',
          'Arrows / D-pad — frying pan minigame',
          'Mouse — furniture management'
        ]
      }
    },
    {
      slug: 'pizza-kaisen',
      font: 'Bangers',
      cover: { type: 'image', src: 'assets/img/pizza-kaisen.png' },
      gallery: [
        { video: 'assets/video/pizza-kaisen-comic.mp4', poster: 'assets/img/gallery/pizza-kaisen-comic-poster.jpg' },
        'assets/img/gallery/pizza-kaisen-1.jpg',
        'assets/img/gallery/pizza-kaisen-2.jpg',
        'assets/img/gallery/pizza-kaisen-3.jpg'
      ],
      external: { url: 'https://woliblue.itch.io/pizza-kaisen' },
      credits: [
        { name: 'Amir Daniel Domínguez El Qamch', role: '2D' },
        { name: 'Alfonso Sanches de la Mota', role: '2D' },
        { name: 'David Moreno Atienza', role: '3D' },
        { name: 'Marina Rios Corzo', role: '3D' },
        { name: 'Pepe Arenas Venegas', role: 'Unity' },
        { name: 'Sebastian Olaechea Gazzo', role: 'Unity' },
        { name: 'Miguel Barbero', role: 'Unity' }
      ],
      es: {
        title: 'Pizza Kaisen',
        badge: 'Ganador · Global Jam 2026',
        alt: 'Portada de Pizza Kaisen',
        summary: 'Empujones, máscaras y pizza. ¡Sé el último ingrediente en pie!',
        description: [
          'Un juego de empujones, máscaras y pizza sobre la lucha de cuál es el mejor topping. Ganador del premio a Juego Más Original en la Global Jam 2026.',
          'Eres del Clan del Pepperoni y acabas de recibir tu máscara, pero antes tienes que pasar el ritual de iniciación: sacar de una arena circular a los clanes rivales (maíz, cebolla y el Gran Jefe Piña). Mantén espacio para cargar el empujón, apunta con el ratón, usa la Q para multiplicarte y rebota entre los Pepperonis del escenario.'
        ],
        role: [
          'Movimiento del jugador',
          'IA de los enemigos',
          'Menús principal, de victoria y de pausa',
          'La habilidad definitiva de Roni: multiplicarse con la Q'
        ],
        tags: ['Unity', 'Action', 'Game Jam'],
        meta: [
          { label: 'Evento', value: 'Global Jam 2026' },
          { label: 'Premio', value: 'Juego Más Original' },
          { label: 'Motor', value: 'Unity' }
        ],
        external: { label: 'Jugar en itch.io' }
      },
      en: {
        title: 'Pizza Kaisen',
        badge: 'Winner · Global Jam 2026',
        alt: 'Pizza Kaisen cover art',
        summary: 'Shoves, masks and pizza. Be the last topping standing!',
        description: [
          'A game of shoving, masks and pizza about the fight over the best topping. Winner of the Most Original Game award at Global Jam 2026.',
          'You belong to the Pepperoni Clan and just got your mask, but first you must pass the initiation ritual: knock the rival clans (corn, onion and the Great Pineapple Boss) out of a circular arena. Hold space to charge your push, aim with the mouse, press Q to multiply and bounce off the Pepperonis on the stage.'
        ],
        role: [
          'Player movement',
          'Enemy AI',
          'Main, victory and pause menus',
          'Roni’s ultimate ability: multiplying with Q'
        ],
        tags: ['Unity', 'Action', 'Game Jam'],
        meta: [
          { label: 'Event', value: 'Global Jam 2026' },
          { label: 'Award', value: 'Most Original Game' },
          { label: 'Engine', value: 'Unity' }
        ],
        external: { label: 'Play on itch.io' }
      }
    },
    {
      slug: 'figurines-please',
      font: 'Silkscreen',
      cover: { type: 'image', src: 'assets/img/figurines-please.png' },
      gallery: [
        'assets/img/gallery/figurines-please-1.jpg',
        'assets/img/gallery/figurines-please-2.jpg',
        'assets/img/gallery/figurines-please-3.jpg',
        'assets/img/gallery/figurines-please-4.jpg',
        'assets/img/gallery/figurines-please-good-ending.jpg',
        'assets/img/gallery/figurines-please-bad-ending.jpg'
      ],
      external: { url: 'https://woliblue.itch.io/figurines-please' },
      repo: 'https://github.com/WoliBlue/NiideaJamNavidad',
      credits: [
        { name: 'Daniel Amir Domínguez el Qamch', role: '2D' },
        { name: 'Ernesto Miranda Ramos', role: '2D' },
        { name: 'Antonio Díaz Luján', role: '3D' },
        { name: 'Pedro Hernández Alcón', role: '3D' },
        { name: 'Luis Francisco Macías Sáez', role: '3D' },
        { name: 'Pepe Arenas Venegas', role: 'Unity' },
        { name: 'Sebastian Olaechea Gazzo', role: 'Unity' },
        { name: 'Jonathan Ramírez Honrado', role: 'Unity' }
      ],
      es: {
        title: 'Figurines Please',
        badge: 'Ganador Narrativa<br>Jam Navideña 2025',
        alt: 'Portada de Figurines Please',
        summary: 'Vende figuritas de Belén camelándote a los clientes.',
        description: [
          'Ganador del premio a Mejor Narrativa en la Jam Navideña 2025. Heredas el puesto de figuras del Belén de tu padre y solo hay una salida: venderlo todo esa semana o quedarte con el puesto para siempre.',
          'Cada cliente es una conversación: tus respuestas le caen mejor o peor, y solo te compran si terminas en positivo. Después toca girarte, elegir la figura que quiere y ponerla en el mantel. Si no llegas a la cuota, el periódico anuncia que el puesto tiene nuevo dueño permanente.'
        ],
        role: [
          'Sistema de diálogos con opciones que suben o bajan la afinidad del cliente',
          'Menús',
          'Game feel'
        ],
        tags: ['Unity', 'Jam Navideña 2025'],
        meta: [
          { label: 'Evento', value: 'Jam Navideña 2025' },
          { label: 'Premio', value: 'Mejor Narrativa' },
          { label: 'Motor', value: 'Unity' }
        ],
        external: { label: 'Jugar en itch.io' }
      },
      en: {
        title: 'Figurines Please',
        badge: 'Narrative Award<br>Christmas Jam 2025',
        alt: 'Figurines Please cover art',
        summary: 'Sell nativity figurines by charming your customers.',
        description: [
          'Winner of the Best Narrative award at the 2025 Christmas Jam. You inherit your father’s nativity-figurine stall and there’s only one way out: sell everything this week or be stuck with the stall forever.',
          'Every customer is a conversation: your answers make them like you more or less, and they only buy if you end up in the positive. Then you turn around, pick the figurine they want and place it on the cloth. Miss your quota and the newspaper announces the stall has a new permanent owner.'
        ],
        role: [
          'Dialogue system with choices that raise or lower customer affinity',
          'Menus',
          'Game feel'
        ],
        tags: ['Unity', 'Christmas Jam 2025'],
        meta: [
          { label: 'Event', value: 'Christmas Jam 2025' },
          { label: 'Award', value: 'Best Narrative' },
          { label: 'Engine', value: 'Unity' }
        ],
        external: { label: 'Play on itch.io' }
      }
    },
    {
      slug: 'evad-tale',
      font: 'Pixelify Sans',
      cover: { type: 'image', src: 'assets/img/evad-tale.png' },
      gallery: [
        'assets/img/gallery/evad-tale-1.jpg',
        'assets/img/gallery/evad-tale-2.jpg'
      ],
      external: { url: 'https://mariams998.itch.io/evad-tale' },
      es: {
        title: 'EVAD TALE',
        alt: 'Portada de EVAD TALE',
        summary: 'Averigua qué esconde la sala de profesores de la EVAD tras quedarte encerrado en una Jam. Inspirado en Undertale.',
        description: [
          'No te lo vas a creer... te quedas encerrado en la EVAD después de una Jam y para salir tienes que descubrir qué se esconde tras la puerta de la sala de profesores.'
        ],
        role: [
          'Parte del equipo de desarrollo',
          'Proyecto coral de Jam con más de una decena de colaboradores'
        ],
        tags: ['Unity', 'Role Playing', 'Fangame'],
        meta: [
          { label: 'Género', value: 'Role Playing' },
          { label: 'Plataforma', value: 'Windows' },
          { label: 'Motor', value: 'Unity' }
        ],
        controls: [
          'WASD / Flechas / Joystick izquierdo — movimiento',
          'Z / Enter / A (Xbox) — interactuar',
          'X / R-Shift / B — cancelar',
          'C / Y (Xbox) — inventario'
        ],
        external: { label: 'Jugar en itch.io' }
      },
      en: {
        title: 'EVAD TALE',
        alt: 'EVAD TALE cover art',
        summary: "Find out what's hidden behind the EVAD teachers' lounge door after getting locked in during a Jam. Inspired by Undertale.",
        description: [
          "You won't believe it... you get locked inside EVAD after a Jam, and to get out you have to find out what's hidden behind the teachers' lounge door."
        ],
        role: [
          'Part of the development team',
          'Large group Jam project with more than a dozen collaborators'
        ],
        tags: ['Unity', 'Role Playing', 'Fangame'],
        meta: [
          { label: 'Genre', value: 'Role Playing' },
          { label: 'Platform', value: 'Windows' },
          { label: 'Engine', value: 'Unity' }
        ],
        controls: [
          'WASD / Arrows / Left joystick — move',
          'Z / Enter / A (Xbox) — interact',
          'X / R-Shift / B — cancel',
          'C / Y (Xbox) — inventory'
        ],
        external: { label: 'Play on itch.io' }
      }
    },
    {
      slug: 'offline-working-sheep',
      font: 'Space Grotesk',
      cover: { type: 'image', src: 'assets/img/ows/menu.jpg' },
      gallery: [
        'assets/img/ows/menu.jpg',
        'assets/img/ows/alert-room.jpg',
        'assets/img/ows/cubicles.jpg',
        'assets/img/ows/office-floor.jpg',
        'assets/img/ows/meeting-room.jpg',
        'assets/img/ows/critical-path.jpg',
        'assets/img/ows/state-machine-enemy.jpg',
        'assets/img/ows/state-machine-npc.jpg',
        'assets/img/ows/map-layout.jpg',
        'assets/img/ows/puzzle-design.jpg',
        'assets/img/ows/options.jpg',
        'assets/img/ows/app-icons.jpg',
        'assets/img/ows/poster.jpg'
      ],
      es: {
        title: 'Offline Working Sheep',
        alt: 'Menú principal de Offline Working Sheep dentro de la oficina',
        summary: 'Te echas una siesta en el trabajo y, al despertar, las ovejas-robot de tu empresa se han rebelado. Eres el único en la oficina, así que te toca escapar.',
        description: [
          'Te echas una siesta en el descanso del almuerzo y, al despertar, tu ordenador está lleno de notificaciones: las Ovejabots que fabrica tu empresa se han sublevado. Eres el único que sigue trabajando en presencial (por vivir lo bastante cerca), así que te toca escapar.',
          'Con las Smart Glasses de la empresa hablas por «Sheepcord» con tu superior, que te guía desde la comodidad de su casa. Cada zona alterna sigilo, puzle y un respiro: esconderte en los cubículos, estudiar las rutas de los robots y resolver puzles de trayectoria con los GOAT para conseguir las tres keycards. Solo tienes una carga de pistola aturdidora.',
          'Los enemigos (RAN, LAMB, GOAT… los acrónimos son a propósito) funcionan con una máquina de estados: patrulla, sospecha, persecución, búsqueda y aturdido. Inspirado en The Stanley Parable, Severance y The Beginner’s Guide.'
        ],
        role: [
          'Proyecto individual',
          'Game design completo: high concept, GDD y biblia narrativa',
          'Máquinas de estado de la IA',
          'Diseño de niveles con camino crítico',
          'Desarrollo en Unity'
        ],
        tags: ['Unity', 'Sigilo', 'Puzles', 'Proyecto individual'],
        meta: [
          { label: 'Tipo', value: 'Proyecto individual' },
          { label: 'Género', value: 'Aventura en primera persona' },
          { label: 'Plataforma', value: 'PC' },
          { label: 'Referentes', value: 'The Stanley Parable · Severance' },
          { label: 'Motor', value: 'Unity' }
        ],
        controls: [
          'WASD / Stick — moverse',
          'E / Y — interactuar',
          'Ctrl / B — agacharse',
          'Click izquierdo / Gatillo derecho — pistola aturdidora',
          'Click derecho, R / Gatillo izquierdo — rotar objeto'
        ]
      },
      en: {
        title: 'Offline Working Sheep',
        alt: 'Offline Working Sheep main menu inside the office',
        summary: 'You nap through your lunch break and wake up to find your company’s robot sheep have rebelled. You’re the only one in the office, so it’s on you to escape.',
        description: [
          'You take a nap during your lunch break and wake up to a computer full of notifications: the Sheepbots your company builds have risen up. You’re the only one still working on-site (because you live close enough), so it’s on you to escape.',
          'Through the company’s Smart Glasses you talk on “Sheepcord” with your manager, who guides you from the comfort of home. Each area alternates stealth, puzzle and a breather: hide in the cubicles, study the robots’ routes and solve trajectory puzzles with the GOATs to get all three keycards. You only get one stun-gun charge.',
          'The enemies (RAN, LAMB, GOAT… the acronyms are on purpose) run on a state machine: patrol, suspicious, chase, search and stunned. Inspired by The Stanley Parable, Severance and The Beginner’s Guide.'
        ],
        role: [
          'Solo project',
          'Full game design: high concept, GDD and narrative bible',
          'AI state machines',
          'Level design with a critical path',
          'Development in Unity'
        ],
        tags: ['Unity', 'Stealth', 'Puzzles', 'Solo project'],
        meta: [
          { label: 'Type', value: 'Solo project' },
          { label: 'Genre', value: 'First-person adventure' },
          { label: 'Platform', value: 'PC' },
          { label: 'References', value: 'The Stanley Parable · Severance' },
          { label: 'Engine', value: 'Unity' }
        ],
        controls: [
          'WASD / Stick — move',
          'E / Y — interact',
          'Ctrl / B — crouch',
          'Left click / Right trigger — stun gun',
          'Right click, R / Left trigger — rotate item'
        ]
      }
    },
    {
      slug: 'chatdefenderxp',
      font: 'Courier Prime',
      cover: { type: 'image', src: 'assets/img/chatdefenderxp/menu.jpg' },
      gallery: [
        'assets/img/chatdefenderxp/menu.jpg',
        'assets/img/chatdefenderxp/wave-hud.jpg',
        'assets/img/chatdefenderxp/map.jpg',
        'assets/img/chatdefenderxp/tutorial.jpg',
        'assets/img/chatdefenderxp/tutorial-belt.jpg',
        'assets/img/chatdefenderxp/enemies-1.jpg',
        'assets/img/chatdefenderxp/enemies-2.jpg',
        'assets/img/chatdefenderxp/achievements.jpg',
        'assets/img/chatdefenderxp/pause.jpg'
      ],
      es: {
        title: 'ChatDefender XP',
        alt: 'Menú principal de ChatDefenderXP',
        summary: 'Tu blog está siendo atacado por trolls. Defiéndelo de todo lo que no sea un gato.',
        description: [
          'WordPressing regala a sus blogueros una herramienta de defensa y tú eres ella: ChatJanitor, la conserje de BlogGatitosLuna2004.wordpressing.blog. El escenario es un trozo de internet de la era dorada, con estética de Windows XP y del Buscaminas.',
          'Aguanta 7 oleadas (7 días) con solo 5 segundos de respiro entre ellas. Por dos cintas transportadoras llegan fotos al ChatRoom: los gatos lo curan, los «NoGatos» lo dañan, así que tienes que disparar a los perros sin darle a ningún gatito mientras frenas a los trolls.',
          'Hay cuatro tipos de troll: el normal que va a por ti, el suicida que se lanza contra el ChatRoom, el Slippery que se esconde y contamina las cintas, y el Troll Torre, el jefe que genera esbirros hasta que lo tumbas. Cada ronda se activa una de tres máquinas arcade con un minijuego que da munición o vida. Y Clippy te lo explica todo en el tutorial.'
        ],
        role: [
          'Proyecto individual',
          'Game design completo: high concept, GDD, oleadas y balance',
          'Desarrollo en Unity'
        ],
        tags: ['Unity', 'Twin-stick shooter', 'Proyecto individual'],
        meta: [
          { label: 'Tipo', value: 'Proyecto individual' },
          { label: 'Género', value: 'Twin-stick shooter' },
          { label: 'Plataforma', value: 'PC (teclado y ratón)' },
          { label: 'Motor', value: 'Unity' }
        ],
        controls: [
          'WASD — moverse · Ratón — apuntar',
          'Click izquierdo — disparo · Click derecho — ráfaga / bala perforante',
          '1 / 2 — cambiar de arma · R — recargar',
          'Shift — deslizarse · Q — empujón · E — jugar a la arcade'
        ]
      },
      en: {
        title: 'ChatDefenderXP',
        alt: 'ChatDefenderXP main menu',
        summary: 'Your blog is under troll attack. Defend it from everything that isn’t a cat.',
        description: [
          'WordPressing gives its bloggers a free defense tool, and you are it: ChatJanitor, the caretaker of BlogGatitosLuna2004.wordpressing.blog. The stage is a chunk of golden-age internet, styled after Windows XP and Minesweeper.',
          'Survive 7 waves (7 days) with only 5 seconds of breathing room between them. Photos travel to the ChatRoom on two conveyor belts: cats heal it, “NotCats” damage it, so you have to shoot the dogs without hitting any kittens while holding off the trolls.',
          'There are four troll types: the regular one that comes for you, the suicide one that rams the ChatRoom, the Slippery one that hides and pollutes the belts, and the Tower Troll, a boss that keeps spawning minions until you take it down. Each round one of three arcade machines activates with a minigame that rewards ammo or health. And Clippy explains it all in the tutorial.'
        ],
        role: [
          'Solo project',
          'Full game design: high concept, GDD, waves and balancing',
          'Development in Unity'
        ],
        tags: ['Unity', 'Twin-stick shooter', 'Solo project'],
        meta: [
          { label: 'Type', value: 'Solo project' },
          { label: 'Genre', value: 'Twin-stick shooter' },
          { label: 'Platform', value: 'PC (keyboard & mouse)' },
          { label: 'Engine', value: 'Unity' }
        ],
        controls: [
          'WASD — move · Mouse — aim',
          'Left click — shoot · Right click — burst / piercing shot',
          '1 / 2 — switch weapon · R — reload',
          'Shift — slide · Q — push · E — play the arcade'
        ]
      }
    },
    {
      slug: 'dig-me-out',
      font: 'Press Start 2P',
      cover: { type: 'image', src: 'assets/img/dig-me-out/hub.jpg' },
      gallery: [
        'assets/img/dig-me-out/hub.jpg',
        'assets/img/dig-me-out/menu.jpg',
        'assets/img/dig-me-out/shop.jpg',
        'assets/img/dig-me-out/boss-dialogue.jpg',
        'assets/img/dig-me-out/exit-dialogue.jpg',
        'assets/img/dig-me-out/screen-flow.jpg'
      ],
      credits: [
        { name: 'Pepe Arenas Venegas', role: 'Diseño y desarrollo' },
        { name: 'Alba Valero', role: 'Pixel art (tileset)' }
      ],
      es: {
        title: 'Dig Me Out!',
        alt: 'Hub de Dig Me Out! dentro de la mina',
        summary: 'Una minera atrapada bajo tierra. Corre, salta y haz parry para pagar tu deuda… que no para de crecer.',
        description: [
          'La protagonista solo picaba minerales fáciles cerca de la superficie, hasta que un derrumbe la deja muy bajo tierra. Xeferías, un jefazo con un corazón aún más grande, le ofrece ayuda para volver arriba… a cambio de trabajar para él y pagar el billete de vuelta.',
          'Corres de forma automática y cada vez más rápido. Saltas una vez, y en el aire haces un parry que te impulsa al golpear a un enemigo, así que el combate y el plataformeo son la misma mecánica. Recoges monedas de 1, 10, 20 y 50, power-ups que se usan solos y esquivas pinchos y plataformas que se caen. Tres golpes y se acabó la run.',
          'Con lo recaudado compras mejoras permanentes en la tienda de Bichoso o pagas la deuda de 1500 monedas. Pero cuando la pagas, el jefe descubre los intereses: 3000, 4500… Y si la run dura demasiado, aparece él con una ruleta de efectos que cambia las reglas durante un rato.'
        ],
        role: [
          'Proyecto individual',
          'Game design completo: GDD, flujo de pantallas y balance',
          'Desarrollo en Unity'
        ],
        tags: ['Unity', 'Infinite runner', 'Pixel art', 'Proyecto individual'],
        meta: [
          { label: 'Tipo', value: 'Proyecto individual' },
          { label: 'Género', value: 'Infinite runner' },
          { label: 'Plataforma', value: 'PC (teclado)' },
          { label: 'GDD', value: 'Diciembre 2025' },
          { label: 'Motor', value: 'Unity' }
        ]
      },
      en: {
        title: 'Dig Me Out!',
        alt: 'Dig Me Out! hub inside the mine',
        summary: 'A miner trapped underground. Run, jump and parry to pay off your debt… which keeps growing.',
        description: [
          'The protagonist only ever mined the easy stuff near the surface, until a cave-in leaves her deep underground. Xeferías, a big boss with an even bigger heart, offers to help her get back up… in exchange for working for him and paying for the ticket out.',
          'You run automatically and faster and faster. You jump once, and in mid-air you parry, which launches you forward when it hits an enemy — so combat and platforming are the same mechanic. You collect coins worth 1, 10, 20 and 50, auto-used power-ups, and dodge spikes and collapsing platforms. Three hits and the run is over.',
          'With your earnings you buy permanent upgrades in Bichoso’s shop or pay off the 1,500-coin debt. But once you do, the boss discovers interest: 3,000, 4,500… And if a run lasts too long, he shows up with a roulette of effects that changes the rules for a while.'
        ],
        role: [
          'Solo project',
          'Full game design: GDD, screen flow and balancing',
          'Development in Unity'
        ],
        tags: ['Unity', 'Infinite runner', 'Pixel art', 'Solo project'],
        meta: [
          { label: 'Type', value: 'Solo project' },
          { label: 'Genre', value: 'Infinite runner' },
          { label: 'Platform', value: 'PC (keyboard)' },
          { label: 'GDD', value: 'December 2025' },
          { label: 'Engine', value: 'Unity' }
        ]
      }
    }
  ],

  other: [
    {
      slug: 'restaurantos',
      font: 'Nunito',
      cover: { type: 'image', src: 'assets/img/restaurantos-cover.jpg' },
      external: { url: 'https://www.figma.com/slides/7IyBX59VYXxiaZ1q9LT5nX/RestaurantOS--Presentaci%C3%B3n-TFG-?node-id=1-266' },
      repo: 'https://github.com/imadhanaty/TFG_restaurantOS',
      credits: [
        { name: 'José Arenas', role: 'UI/UX · Android' },
        { name: 'Imad Hanaty', role: 'Business logic' },
        { name: 'Sergio Suárez', role: 'Database' },
        { name: 'Luis Herencia', role: 'Lead & programming' }
      ],
      es: {
        title: 'RestaurantOS',
        badge: 'TFG · Medac Nova',
        alt: 'Logo de RestaurantOS',
        summary: 'App Android de pedidos y reservas para restaurantes, sin comisiones ni dependencia de plataformas de terceros.',
        description: [
          'Muchos restaurantes dependen de plataformas de reparto de terceros para recibir pedidos, lo que implica comisiones altas y poca personalización. Eso reduce sus beneficios y limita su relación directa con el cliente.',
          'RestaurantOS ofrece una aplicación propia para cada restaurante: sin comisiones, fácil de usar y personalizable. El cliente navega el menú, guarda favoritos, gestiona el carrito y paga; el restaurante tiene un panel de administración con los pedidos pendientes y completados.',
          'Es una app Android nativa en Java, con Firebase para autenticación y base de datos y Stripe para los pagos.'
        ],
        role: [
          'Diseño UI/UX de toda la app',
          'Implementación en Android (Java) de login, registro y recuperar contraseña',
          'Pantallas de inicio, menú, carrito, favoritos, perfil y compra',
          'Navegación principal'
        ],
        tags: ['Android', 'Java', 'Firebase', 'UI/UX', 'TFG'],
        meta: [
          { label: 'Entrega', value: 'Junio 2025' },
          { label: 'Plataforma', value: 'Android' },
          { label: 'Tecnología', value: 'Java · Firebase · Stripe' }
        ],
        external: { label: 'Ver presentación en Figma' }
      },
      en: {
        title: 'RestaurantOS',
        badge: 'Capstone · Medac Nova',
        alt: 'RestaurantOS logo',
        summary: 'An Android ordering and booking app for restaurants, with no commissions and no dependency on third-party platforms.',
        description: [
          'Many restaurants depend on third-party delivery platforms to receive orders, which means high commissions and little room for personalization. That cuts into their margins and limits their direct relationship with customers.',
          'RestaurantOS gives each restaurant its own app: no commissions, easy to use and customizable. Customers browse the menu, save favorites, manage their cart and pay; the restaurant gets an admin panel with pending and completed orders.',
          'It’s a native Android app in Java, using Firebase for authentication and data and Stripe for payments.'
        ],
        role: [
          'UI/UX design of the whole app',
          'Android (Java) implementation of login, sign-up and password recovery',
          'Home, menu, cart, favorites, profile and checkout screens',
          'Main navigation'
        ],
        tags: ['Android', 'Java', 'Firebase', 'UI/UX', 'Capstone'],
        meta: [
          { label: 'Delivered', value: 'June 2025' },
          { label: 'Platform', value: 'Android' },
          { label: 'Tech', value: 'Java · Firebase · Stripe' }
        ],
        external: { label: 'View presentation on Figma' }
      }
    },
    {
      slug: 'memorias-de-un-maestro',
      font: 'Playfair Display',
      cover: { type: 'image', src: 'assets/img/book/card.jpg' },
      gallery: [
        'assets/img/book/cover-page.jpg',
        'assets/img/book/spread-index.jpg',
        'assets/img/book/spread-chapter-1.jpg',
        'assets/img/book/spread-escudo.jpg',
        'assets/img/book/spread-legends.jpg',
        'assets/img/book/spread-romance.jpg',
        'assets/img/book/spread-photos.jpg'
      ],
      credits: [
        { name: 'José Arenas Ropero', role: 'Autor' },
        { name: 'Pepe Arenas Venegas', role: 'Maquetación y limpieza' },
        { name: 'Alejandra García Arenas', role: 'Ilustraciones y cubierta' }
      ],
      es: {
        title: 'Memorias de un Maestro',
        badge: 'Libro',
        alt: 'Cubierta de Memorias de un Maestro. Crónicas y leyendas de Loja',
        summary: 'Maquetación y limpieza del libro de José Arenas Ropero, cronista oficial de Loja.<br>Memorias, crónicas, leyendas y poesía.',
        description: [
          '«Memorias de un Maestro. Crónicas y leyendas de Loja» es el libro de José Arenas Ropero, maestro y cronista oficial de Loja: los recuerdos de toda una vida dedicada a la enseñanza, junto a crónicas históricas, leyendas, romances y poesía de la ciudad.',
          'Mi trabajo fue llevar un material muy heterogéneo a un libro coherente: limpiar y unificar el texto, montar la estructura de capítulos y el índice, componer las secciones de poesía y colocar las fotografías históricas con sus pies.',
          'Las ilustraciones y la cubierta son de Alejandra García Arenas.'
        ],
        role: [
          'Maquetación y limpieza del texto',
          'Estructura de capítulos e índice',
          'Unificación de estilos',
          'Composición de las secciones de poesía',
          'Colocación de fotografías e ilustraciones'
        ],
        tags: ['Maquetación', 'Edición', 'Word'],
        meta: [
          { label: 'Autor', value: 'José Arenas Ropero' },
          { label: 'Edición', value: 'Fundación «Ibn-al-Jatib», Loja' },
          { label: 'Extensión', value: '205 páginas' },
          { label: 'Año', value: '2026' }
        ]
      },
      en: {
        title: 'Memorias de un Maestro',
        badge: 'Book',
        alt: 'Cover of Memorias de un Maestro. Crónicas y leyendas de Loja',
        summary: 'Layout and text cleanup for the book by José Arenas Ropero, official chronicler of Loja.<br>Memoirs, chronicles, legends and poetry.',
        description: [
          '“Memorias de un Maestro. Crónicas y leyendas de Loja” (Memoirs of a Teacher: Chronicles and Legends of Loja) is the book by José Arenas Ropero. A teacher and Loja’s official chronicler, he collects memories of a life devoted to teaching alongside historical chronicles, legends, ballads and poetry about the town.',
          'My job was to turn very mixed material into a coherent book: clean up and unify the text, build the chapter structure and index, typeset the poetry sections, and place the historical photos with their captions.',
          'The illustrations and cover are by Alejandra García Arenas.'
        ],
        role: [
          'Layout and text cleanup',
          'Chapter structure and index',
          'Style unification',
          'Typesetting of the poetry sections',
          'Placement of photos and illustrations'
        ],
        tags: ['Layout', 'Editing', 'Word'],
        meta: [
          { label: 'Author', value: 'José Arenas Ropero' },
          { label: 'Publisher', value: 'Fundación «Ibn-al-Jatib», Loja' },
          { label: 'Length', value: '205 pages' },
          { label: 'Year', value: '2026' }
        ]
      }
    },
    {
      slug: 'playdate-music-player',
      font: 'Space Mono',
      cover: { type: 'image', src: 'assets/img/playdate/card-cover.png' },
      gallery: [
        'assets/img/playdate/card-cover.png',
        'assets/img/playdate/song-list.jpg',
        'assets/img/playdate/now-playing.jpg',
        'assets/img/playdate/system-menu.jpg',
        'assets/img/playdate/vis-radial.jpg',
        'assets/img/playdate/vis-particles.jpg',
        'assets/img/playdate/vis-rain.jpg',
        'assets/img/playdate/vis-bugs.jpg',
        'assets/img/playdate/vis-wave.jpg'
      ],
      es: {
        title: 'Playdate Music Player',
        badge: 'Playdate · Lua',
        alt: 'Tarjeta de inicio del Playdate MP3 Player',
        summary: 'Reproductor de MP3 para la consola Playdate.<br>11 visualizadores en 1-bit, ambiente de lluvia y control con la manivela.',
        description: [
          'Un reproductor de música para la Playdate, la portátil de pantalla 1-bit con manivela. Metes tus MP3 en la carpeta de la app por USB (como las ROMs en un emulador) y aparecen en una lista con reproducción automática y modo aleatorio.',
          'Tiene 11 visualizadores (casete con bobinas que giran, sunburst, ecualizador, bichos, partículas, lluvia, péndulo, arena, vórtice…), modo oscuro, modo zen sin interfaz, estelas y cambio automático de tema. La manivela controla el volumen o avanza por la canción, y la cruceta se puede configurar desde el menú.',
          'Incluye un ambiente de lluvia opcional con volumen ondulante para escuchar música con fondo, y guarda todos los ajustes entre sesiones.'
        ],
        role: [
          'Proyecto personal',
          'Diseño y desarrollo en Lua con el SDK de Playdate',
          'Los 11 visualizadores',
          'Arte del lanzador'
        ],
        tags: ['Playdate', 'Lua', 'Proyecto personal'],
        meta: [
          { label: 'Plataforma', value: 'Playdate' },
          { label: 'Lenguaje', value: 'Lua (Playdate SDK)' },
          { label: 'Versión', value: '1.01' }
        ],
        controls: [
          'Cruceta — navegar la lista / canción anterior y siguiente',
          'A — reproducir o pausar · B — volver a la lista',
          'Manivela — volumen o avance por la canción',
          'Menú — aleatorio, visualizador y acción de la cruceta'
        ]
      },
      en: {
        title: 'Playdate Music Player',
        badge: 'Playdate · Lua',
        alt: 'Playdate MP3 Player launcher card',
        summary: 'MP3 player for the Playdate console.<br>11 1-bit visualizers, rain ambience and crank controls.',
        description: [
          'A music player for the Playdate, the handheld with a 1-bit screen and a crank. You drop your MP3s into the app’s folder over USB (like ROMs in an emulator) and they show up in a list with autoplay and shuffle.',
          'It has 11 visualizers (cassette with spinning reels, sunburst, EQ, bugs, particles, rain, pendulum, sand, vortex…), dark mode, a HUD-free zen mode, trails and automatic theme cycling. The crank controls volume or scrubs through the song, and the D-pad action can be set from the menu.',
          'It includes an optional rain ambience with a gently swelling volume to listen with some background, and it saves every setting between sessions.'
        ],
        role: [
          'Personal project',
          'Design and development in Lua with the Playdate SDK',
          'All 11 visualizers',
          'Launcher art'
        ],
        tags: ['Playdate', 'Lua', 'Personal project'],
        meta: [
          { label: 'Platform', value: 'Playdate' },
          { label: 'Language', value: 'Lua (Playdate SDK)' },
          { label: 'Version', value: '1.01' }
        ],
        controls: [
          'D-pad — browse the list / previous and next song',
          'A — play or pause · B — back to the list',
          'Crank — volume or scrub through the song',
          'Menu — shuffle, visualizer and D-pad action'
        ]
      }
    }
  ]
};

/* Repos de GitHub — tarjeta simple sin página de detalle */
const GITHUB_CARD = {
  url: 'https://github.com/woliblue?tab=repositories',
  es: { title: 'Repositorios en GitHub', desc: 'Prácticas y proyectos del ciclo DAM.<br>Java, Python, Android Studio, PHP y más.' },
  en: { title: 'GitHub repositories', desc: 'DAM coursework and projects.<br>Java, Python, Android Studio, PHP and more.' }
};
