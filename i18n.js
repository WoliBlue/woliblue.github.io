/* Textos de interfaz y contenido de "Sobre mí" en ES/EN. */

const UI = {
  es: {
    nav: { inicio: 'Inicio', juegos: 'Juegos', proyectos: 'Proyectos', sobremi: 'Sobre mí', housegotchi: 'Housegotchi' },
    hgPortada: { ante: 'Los juguetes que forman mi portfolio', pulsa: '▶ Pulsa para jugar', jugar: '▶ Jugar a Housegotchi', orbita: 'HOUSEGOTCHI ✦ PULSA PARA JUGAR ✦ HOUSEGOTCHI ✦ ' },
    theme: { toDark: 'Oscuro', toLight: 'Claro' },
    lang: { target: 'English' },
    hero: {
      eyebrow: 'Portfolio 2026',
      role: 'PROGRAMADOR DE UNITY & GAME DESIGNER',
      lede: 'Programador de Unity y Game Designer en Málaga, con formación de Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM).',
      cv: 'Descargar CV',
      reprint: 'Reimprimir el póster',
      bleat: '¡Beeeee!',
      nowLabel: 'Ahora mismo',
      now: 'Desarrollando Tourist Trap',
      scroll: 'Desliza',
      contact: 'Copiar email'
    },
    section: { juegos: 'Juegos', otros: 'Otros proyectos', sobremi: 'Sobre mí' },
    about: {
      contacto: 'Contacto',
      idiomas: 'Idiomas',
      skills: 'Skills técnicos',
      social: 'Habilidades sociales',
      experiencia: 'Experiencia',
      estudios: 'Estudios',
      lede: 'Programador de Unity y Game Designer.\nDiseño y programo sistemas de gameplay, diálogos, minijuegos y niveles, tanto en equipo como en proyectos individuales.',
      lede2: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma. También programo en Java, Python, Kotlin y C#.',
      idiomasList: [
        { lang: 'Español', level: 'Nativo' },
        { lang: 'Inglés', level: 'C2 (Cambridge)' }
      ],
      socialList: ['Trabajo en equipo', 'Comunicación', 'Resolución de problemas', 'Adaptabilidad', 'Creatividad', 'Atención al público', 'Paciencia'],
      experience: [
        { when: 'Jun 2025 — Sept 2025', title: 'Traductor en Marbellatrad', desc: 'Colaboración en la preparación de traducciones juradas (inglés/español) y soporte técnico especializado.' },
        { when: 'Mar 2025 — Jun 2025', title: 'Prácticas en EY GDS', desc: 'Gestión proactiva de incidencias y automatización de tareas mediante BluePrism, Kibana y TrustPortal.' },
        { when: 'Jun 2024 — Sept 2024', title: 'Servicio al cliente, Kinépolis', desc: 'Ventas de cara al público, mantenimiento, acomodación, cocina y limpieza del cine.' }
      ],
      education: [
        { when: 'Oct 2025 — Dic 2026', title: 'Escuela Superior de Videojuegos y Arte Digital, Málaga', desc: 'Máster en Diseño y Desarrollo de Videojuegos, en curso.' },
        { when: 'Sept 2023 — Jun 2025', title: 'Centro Medac Nova, Málaga', desc: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM).' }
      ]
    },
    footer: { location: 'Málaga, España' },
    detail: {
      back: '← Volver al portfolio',
      backGames: '← Volver a Juegos',
      backOther: '← Volver a Proyectos',
      role: 'Qué hice',
      howToPlay: 'Cómo se juega',
      credits: 'Créditos',
      gallery: 'Galería',
      cast: 'Los personajes',
      menu: 'La carta del chiringuito',
      repo: 'Ver código en GitHub',
      linkPending: 'Enlace pendiente',
      notFoundTitle: 'Proyecto no encontrado',
      notFoundBack: '← Volver al portfolio'
    },
    contactBand: { label: '¿Hablamos?', hint: 'Pulsa para copiar el correo' },
    housegotchi: {
      title: 'Housegotchi', sub: 'Cada bichito vive en su casita y la consola grande es un escenario. Arrástralas y júntalas por los lados: los vecinos se saludan y, si están pegados a un escenario, se van de visita.',
      chef: 'CURRO', rogelio: 'ROGELIO', robot: 'ROBOT', minera: 'MINERA', luna: 'LUNA', gato: 'GATO', chiringuito: 'CHIRINGUITO', mina: 'MINA', arena: 'ARENA', puesto: 'PUESTO', roni: 'RONI', pina: 'JEFE PIÑA', tendero: 'TENDERO', pastor: 'PASTOR', tagNight: 'buenas noches',
      help: 'Tres botones: A, B y W. Pega una casita a un escenario y su bichito se irá de visita.', sound: 'Sonido', reset: 'Recolocar', repack: 'Guardarlo todo',
      packSmall: '{n} piezas · pilas no incluidas (ni falta que hacen)', packSmall1: '1 pieza · pilas no incluidas (ni falta que hacen)', packOpen: 'Abrir el paquete',
      packDejar: 'Dejar en la caja',
      cajaTitulo: 'Tu caja de cacharros', cajaRotulo: 'Cacharros', cajaFragil: 'Housegotchi · frágil',
      mesaVacia: 'La mesa está vacía: saca un blíster de la caja',
      caja: {
        nuevo: '¡nuevo!', enMesa: 'en la mesa', sacar: 'sacar',
        sacarAria: 'Sacar el blíster de {juego}', guardarAria: 'Guardar las piezas de {juego} en su blíster',
        hueco: 'Recógelo en {juego}'
      },
      juego: {
        titulo: 'Housegotchi de este juego',
        texto: 'Las piezas de {juego} también son de juguete. Recoge el blíster y ábrelo en tu caja de cacharros.',
        recoger: 'Recoger el blíster', yaEsta: 'Ya está en tu caja', recogido: '¡A la caja!', ir: 'Ir a Housegotchi'
      },
      bl: {
        'tourist-trap': { lista: 'Curro, Rogelio y el chiringuito' },
        'offline-working-sheep': { lista: 'El robot y la Luna' },
        'dig-me-out': { lista: 'La mina y la minera' },
        'chatdefenderxp': { lista: 'El gato largo' },
        'pizza-kaisen': { lista: 'La arena, Roni y el Jefe Piña' },
        'figurines-please': { lista: 'El puesto, el tendero y el pastor' }
      },
      keyA: 'A: acción', keyB: 'B: saltar', keyLight: 'W: apagar o encender la luz', keyW: 'W: ir de visita, volver o saludar', keyEmpujon: 'A: ¡empujón!', keyVender: 'A: vender', keyPicar: 'A: picar', keyFiesta: 'A: fiesta', keyTodos: 'B: la ola', keyLlamar: 'W: llamar a los vecinos',
      casa: 'Casita de {pj}. Flechas para moverla.', escenaLabel: 'Escenario: {pj}. Flechas para moverlo.',
      solo: 'Júntalo con alguien', vacio: 'Aquí no hay nadie', llamar: 'Pega una casita a este escenario',
      escena: { chef: 'Curro abre la cocina', rogelio: '¡Una caña, por favor!', robot: 'El robot friega los platos', minera: 'La minera pide algo fresquito', luna: '¡Verbena bajo la luna!', gato: 'El gato huele los espetos', roni: 'Roni pide una pizza… sin piña', pina: 'El Jefe Piña exige piña en la paella', tendero: 'El tendero vende figuritas en la playa', pastor: 'El pastor busca a sus ovejas en la arena' },
      combo: { 'chef+rogelio': '¡Menú del día para Rogelio!', 'chef+robot': 'El robot prueba la tortilla', 'robot+rogelio': 'Rogelio le cuenta batallitas al robot', 'chef+minera': 'Curro le prepara el táper a la minera', 'minera+rogelio': 'Rogelio dice que él también picó piedra', 'minera+robot': 'El robot hace de taladro', 'chiringuito+mina': '¡Del tajo al chiringuito!', luna: 'Shhh… la luna duerme', 'chef+luna': 'Curro sueña con paellas', 'luna+rogelio': 'Rogelio ronca como un tractor', 'luna+robot': 'El robot entra en reposo', 'luna+minera': 'La minera sueña que no debe nada', 'gato+luna': 'El gato le maúlla a la luna', 'chef+gato': 'Curro le guarda una sardina al gato', 'gato+rogelio': 'Rogelio acaricia al gato', 'gato+robot': 'El gato y el robot se miran raro', 'gato+minera': 'La minera adopta al gato', gato: '¡Miau!', otro: '¡Vecinos!', 'pina+roni': '¡Duelo: piña sí o piña no!', 'pastor+tendero': 'El tendero quiere volver a venderlo', 'arena+puesto': '¡Figuritas de luchadores!', 'arena+chiringuito': '¡Pizza en la playa!', 'chef+pina': 'Curro esconde la piña', 'chef+roni': 'Curro le hace una pizza a Roni', 'rogelio+tendero': 'Rogelio regatea con el tendero', 'pastor+rogelio': 'Rogelio se acuerda de la mili en Belén', 'pastor+robot': 'El robot no entiende el Belén', 'minera+pina': 'La minera le ofrece pagar en piñas', 'robot+roni': 'Roni le enseña a multiplicarse al robot', 'luna+pastor': 'El pastor cuenta ovejas', 'gato+pastor': 'El gato persigue a las ovejas', 'gato+pina': 'El gato juega con la corona del Jefe', 'pina+tendero': 'El tendero le vende un trono al Jefe Piña', 'pastor+roni': 'Roni protege al pastor', 'luna+roni': 'Roni entrena bajo la luna' },
      keyEstrella: 'A: estrella fugaz', keyNana: 'B: nana para los vecinos', keyEstirar: 'A: estirarse', keyRonronear: 'B: ronronear', keyVaso: 'W: tirar el vaso',
      dice: { chef: '¡Marchando!|¡Oído cocina!|¡Espetos!|¡Paella!|¡Sale tortilla!', rogelio: '¡Qué calor!|¡Ay, mi espalda!|¡En mis tiempos…!|¡Una siestecita!|¡Esto es vida!', robot: 'BIP BOP|01101|CARGANDO…|¿HUMANOS?|¡ERROR 404!', minera: '¡A picar!|¡Hay que pagar!|¡Oro, oro!|¡Clinc!|¿Y la luz?', roni: '¡Hiya!|¡Sin piña!|¡Multiplícate!|¡Clan Pepperoni!|¡A la arena!', pina: '¡Piña sí!|¡Arrodillaos!|¡Soy el jefe!|¡Grrr!|¡Tropical!', tendero: '¡Figuritas!|¡A euro!|¡Barato, barato!|¡Que se acaba la semana!|¡Oferta!', pastor: '¡Beee!|¿Y mis ovejas?|¡La estrella!|¡Que llego tarde!|Soy de barro' },
      llega: { chef: '¡A la cocina!|¡Abrimos!', rogelio: '¡Buenas!|¡Hola, hola!', robot: 'BIP. HOLA|LLEGADA OK', minera: '¡Una fresquita!|¡Me la he ganado!', roni: '¡Al ataque!|¡Llegué!', pina: '¡Abrid paso!|¡Ha llegado el jefe!', tendero: '¡Se monta puesto!|¡Buenas!', pastor: '¡Beee!|¿Hay ovejas?' },
      charla: { chef: '¿Qué te pongo?|¡Una tapita!|¡Marchando!', rogelio: '¡Una caña!|¡Qué rico!|¡Gracias!', robot: 'BIP. GRACIAS|¿TORTILLA?|DELICIOSO', minera: '¿Y tu deuda?|¡Brindo por eso!|¡Uf, qué día!', roni: '¿Piña? ¡Jamás!|¡En guardia!|¡Buen combate!', pina: '¡Piña para todos!|¡Silencio!|¡Me gusta!', tendero: '¿Se lo envuelvo?|¡Le hago precio!|¡Barato!', pastor: '¡Beee!|¿Ha visto a mi oveja?|¡Qué frío!' },
      saludo: '¡Hola!|¡Ey!|¡Buenas!|¡Qué pasa!',
      deseo: '¡Vacaciones!|¡Más siesta!|¡Un buen curro!|¡Playa!|¡Un 10!',
      mareo: '¡Qué mareo!|@_@', despertar: '¡Eh!|¡Ya voy!|¿Qué hora es?',
      toque: '¡Eh!|¿Sí?|¡Hola!|Jeje|¿Qué?', harto: '¡Ya vale!|¡Para!|Grrr', sacudida: '¡Aaah!|¡Socorro!|¡Quieto!',
      buenasNoches: '¡Buenas noches!|¡A dormir!', buenosDias: '¡Buenos días!|¡Arriba!',
      nana: 'La luna les canta una nana', lunaSola: 'Pega una casita a la luna', deseoDeuda: '¡Que baje la deuda!',
      sueña: { chef: 'Paella gigante…|Tres estrellas…', rogelio: 'La mili…|Siesta eterna…', robot: 'OVEJAS ELÉCTRICAS…|01100…', minera: 'Deuda: 0…|Oro, oro…', roni: 'Pizza infinita…|Cinturón negro…', pina: 'Piña en todo…|Trono tropical…', tendero: 'Todo vendido…|Caja llena…', pastor: 'Una oveja… dos ovejas…|La estrella…' },
      gatoLuna: '¡Miaaau a la luna!', mimos: '¡Qué mono!|¡Gatito!|¡Mimos!|Ooooh', gatoSolo: 'Pega una casita al gato', ronroneo: 'El ronroneo los despierta',
      clonc: '¡CLONC!', gatoRiña: '¡Gato!|¡Ese vaso!|¡Ay, el gato!',
      deudaPagada: '¡DEUDA PAGADA!', deudaNueva: 'Llega otra factura…|¡Más intereses!|¿Otra vez?',
      enMina: {
        pegar: { chef: 'Curro baja a la mina con el táper', rogelio: 'Rogelio baja a picar «como antes»', robot: 'El robot se pone el casco', minera: '¡La minera vuelve al tajo!', luna: 'La luna alumbra la mina: ¡picar paga doble!', gato: 'El gato vigila los túneles' },
        llega: { chef: '¡Bocadillos!|¿Hay que picar?', rogelio: '¡Ay, mi espalda!|¡En mis tiempos…!', robot: 'MODO TALADRO|BIP. EXCAVANDO', minera: '¡Al tajo!|¡Hoy pagamos!' },
        charla: { chef: '¿Un bocata?|¡Hay que comer!', rogelio: '¡Esto antes era todo campo!|¡Qué humedad!', robot: 'ROCA DETECTADA|¿ORO?', minera: '¡Menuda veta!|¡A medias!' }
      },
      enArena: {
        pegar: { chef: 'Curro reparte porciones en la arena', rogelio: 'Rogelio se pone en primera fila', robot: 'El robot hace de árbitro', minera: 'La minera salta a la arena', luna: 'Combate a la luz de la luna', gato: 'El gato se come el pepperoni', roni: '¡Roni salta a la arena!', pina: 'El Jefe Piña reta a todos', tendero: 'El tendero vende recuerdos del combate', pastor: 'El pastor se mete en la arena sin querer' },
        llega: { chef: '¡Porciones!|¿Quién tiene hambre?', rogelio: '¡Que empiece!|¡Dale fuerte!', robot: 'MODO ÁRBITRO|BIP. ¡LUCHA!', minera: '¡A por todas!|¡Que vuele!', roni: '¡En guardia!|¡El siguiente!', pina: '¡Arrodillaos!|¡Mi arena!', tendero: '¡Recuerdos!|¡A euro!', pastor: '¡Beee!|¡Qué miedo!' },
        charla: { chef: '¿Una porción?|¡Con borde relleno!', rogelio: '¡En mis tiempos se empujaba mejor!|¡Dale!', robot: 'GOLPE CRÍTICO|¿PIÑA? ERROR', minera: '¡Buen golpe!|¡Otra!', roni: '¡Buen combate!|¡Sin piña!', pina: '¡Piña sí!|¡Te aplasto!', tendero: '¡Una figurita del campeón!|¡Oferta!', pastor: '¡Beee!|¡Ay, ay!' },
        fuera: '¡Fuera de la arena!|¡Aaay!|¡Me las pagarás!|¡Hasta otra!|¡Uf!',
        solo: '¿Nadie se atreve?|¡Que venga alguien!|¡Estoy solo!'
      },
      enPuesto: {
        pegar: { chef: 'Curro busca una figurita de cocinero', rogelio: 'Rogelio regatea con el tendero', robot: 'El robot escanea las figuritas', minera: 'La minera quiere pagar en pepitas', luna: 'La luna hace de estrella del Belén', gato: 'El gato tira una figurita', roni: 'Roni busca una figurita de ninja', pina: 'El Jefe Piña quiere una piña de barro', tendero: '¡El tendero abre el puesto!', pastor: 'El pastor vuelve a su estantería' },
        llega: { chef: '¿Tienen cocineros?|¡Qué bonito!', rogelio: '¿Cuánto cuesta?|¡Qué caro!', robot: 'ESCANEANDO…|¿PRECIO?', minera: '¿Aceptan pepitas?|¡Me lo llevo!', roni: '¿Hay ninjas?|¡Hiya!', pina: '¿Hay piñas?|¡Lo quiero todo!', tendero: '¡Abrimos!|¡Figuritas!', pastor: '¡Beee!|¡A mi sitio!' },
        charla: { chef: '¡Mira este!|¡Qué detalle!', rogelio: '¡Antes era más barato!|¡Ay, el Belén!', robot: 'OBJETO: OVEJA|¿COMESTIBLE?', minera: '¿Y esa estrella?|¡Precioso!', roni: '¿Y una de mí?|¡Mola!', pina: '¡Falta una piña!|¡Lo compro!', tendero: '¿Se lo envuelvo?|¡Le hago precio!', pastor: '¡Beee!|¡No me toques!' },
        ofrece: '¡Mire qué ovejita!|¡Un rey mago, oiga!|¡Le hago precio!|¡Última semana!',
        compra: '¡Me lo llevo!|¡Una oveja!|¿Me lo envuelve?|¡Un rey mago!|¡Para el Belén!',
        noCompra: 'Solo miraba…|Muy caro|Mmm… no|Otro día',
        solo: '¿Nadie compra?|¡Figuritas!|¡Que se acaba la semana!'
      }
    },
    contactForm: { cta: 'O contáctame por aquí', kicker: 'Contacto', title: 'Escríbeme', intro: 'Cuéntame qué necesitas y te respondo al correo que me dejes.', back: '← Volver al portfolio', name: 'Nombre', email: 'Correo', reason: 'Motivo', pick: 'Elige uno…', job: 'Oferta de trabajo', collab: 'Colaboración / proyecto', jam: 'Game jam', other: 'Otro', message: 'Mensaje', send: 'Enviar mensaje', note: 'Solo usaré tus datos para responderte.', badEmail: 'Escribe un correo válido, por ejemplo nombre@dominio.com' },
    toast: { copied: 'CORREO COPIADO AL PORTAPAPELES', failed: 'No se pudo copiar — ', sent: '¡MENSAJE ENVIADO! TE RESPONDO PRONTO' },
    placeholder: { pending: 'Imagen pendiente — sustituye' },
    featured: { label: 'Proyecto destacado', view: 'Ver ficha completa', trailer: '▶ Gameplay Alpha 06/11', role: 'Mi papel' },
    page404: {
      code: '404',
      title: 'Esta página se ha perdido de camino a la Global Jam.',
      body: 'El enlace que has seguido no existe o se ha movido. Vuelve al portfolio y sigue desde ahí.',
      cta: '← Volver al portfolio'
    }
  },

  en: {
    nav: { inicio: 'Home', juegos: 'Games', proyectos: 'Projects', sobremi: 'About', housegotchi: 'Housegotchi' },
    hgPortada: { ante: 'The toys that make up my portfolio', pulsa: '▶ Press to play', jugar: '▶ Play Housegotchi', orbita: 'HOUSEGOTCHI ✦ PRESS TO PLAY ✦ HOUSEGOTCHI ✦ ' },
    theme: { toDark: 'Dark', toLight: 'Light' },
    lang: { target: 'Español' },
    hero: {
      eyebrow: 'Portfolio 2026',
      role: 'UNITY PROGRAMMER & GAME DESIGNER',
      lede: 'Unity Programmer and Game Designer based in Málaga, Spain, with a Higher Technician degree in Multiplatform Application Development (DAM).',
      cv: 'Download CV',
      reprint: 'Reprint the poster',
      bleat: 'Baaaaa!',
      nowLabel: 'Right now',
      now: 'Developing Tourist Trap',
      scroll: 'Scroll',
      contact: 'Copy email'
    },
    section: { juegos: 'Games', otros: 'Other projects', sobremi: 'About' },
    about: {
      contacto: 'Contact',
      idiomas: 'Languages',
      skills: 'Technical skills',
      social: 'Soft skills',
      experiencia: 'Experience',
      estudios: 'Education',
      lede: 'Unity Programmer and Game Designer.\nI design and program gameplay systems, dialogue, minigames and levels, both in teams and on solo projects.',
      lede2: 'Higher Technician in Multiplatform Application Development. I also code in Java, Python, Kotlin and C#.',
      idiomasList: [
        { lang: 'Spanish', level: 'Native' },
        { lang: 'English', level: 'C2 (Cambridge)' }
      ],
      socialList: ['Teamwork', 'Communication', 'Problem solving', 'Adaptability', 'Creativity', 'Customer service', 'Patience'],
      experience: [
        { when: 'Jun 2025 — Sept 2025', title: 'Translator at Marbellatrad', desc: 'Helped prepare sworn translations (English/Spanish) and provided specialized technical support.' },
        { when: 'Mar 2025 — Jun 2025', title: 'Internship at EY GDS', desc: 'Proactive incident management and task automation using BluePrism, Kibana and TrustPortal.' },
        { when: 'Jun 2024 — Sept 2024', title: 'Customer service, Kinépolis', desc: 'Front-of-house sales, maintenance, ushering, kitchen and cinema cleaning.' }
      ],
      education: [
        { when: 'Oct 2025 — Dec 2026', title: 'Escuela Superior de Videojuegos y Arte Digital, Málaga', desc: 'Master’s in Game Design and Development, in progress.' },
        { when: 'Sept 2023 — Jun 2025', title: 'Centro Medac Nova, Málaga', desc: 'Higher Technician in Multiplatform Application Development (DAM).' }
      ]
    },
    footer: { location: 'Málaga, Spain' },
    detail: {
      back: '← Back to portfolio',
      backGames: '← Back to Games',
      backOther: '← Back to Projects',
      role: 'What I did',
      howToPlay: 'How to play',
      credits: 'Credits',
      gallery: 'Gallery',
      cast: 'The characters',
      menu: 'The beach bar menu',
      repo: 'View code on GitHub',
      linkPending: 'Link pending',
      notFoundTitle: 'Project not found',
      notFoundBack: '← Back to portfolio'
    },
    contactBand: { label: 'Let’s talk', hint: 'Click to copy the email' },
    housegotchi: {
      title: 'Housegotchi', sub: 'Each critter lives in its own little house and the big console is a stage. Drag them and join them side by side: neighbours wave and, if they touch a stage, they pop over.',
      chef: 'CURRO', rogelio: 'ROGELIO', robot: 'ROBOT', minera: 'MINER', luna: 'MOON', gato: 'CAT', chiringuito: 'BEACH BAR', mina: 'MINE', arena: 'ARENA', puesto: 'STALL', roni: 'RONI', pina: 'PINEAPPLE BOSS', tendero: 'STALLHOLDER', pastor: 'SHEPHERD', tagNight: 'good night',
      help: 'Three buttons: A, B and W. Stick a house to a stage and its critter will pop over.', sound: 'Sound', reset: 'Reset', repack: 'Pack it all away',
      packSmall: '{n} pieces · batteries not included (or needed)', packSmall1: '1 piece · batteries not included (or needed)', packOpen: 'Open the package',
      packDejar: 'Leave it in the box',
      cajaTitulo: 'Your box of bits', cajaRotulo: 'Bits & bobs', cajaFragil: 'Housegotchi · fragile',
      mesaVacia: 'The table is empty: take a blister out of the box',
      caja: {
        nuevo: 'new!', enMesa: 'on the table', sacar: 'take out',
        sacarAria: 'Take out the {juego} blister', guardarAria: 'Put the {juego} pieces back in their blister',
        hueco: 'Pick it up in {juego}'
      },
      juego: {
        titulo: 'This game’s Housegotchi',
        texto: 'The pieces of {juego} come as toys too. Pick up the blister and open it in your box of bits.',
        recoger: 'Pick up the blister', yaEsta: 'Already in your box', recogido: 'Into the box!', ir: 'Go to Housegotchi'
      },
      bl: {
        'tourist-trap': { lista: 'Curro, Rogelio and the beach bar' },
        'offline-working-sheep': { lista: 'The robot and the Moon' },
        'dig-me-out': { lista: 'The mine and the miner' },
        'chatdefenderxp': { lista: 'The long cat' },
        'pizza-kaisen': { lista: 'The arena, Roni and the Pineapple Boss' },
        'figurines-please': { lista: 'The stall, the stallholder and the shepherd' }
      },
      keyA: 'A: action', keyB: 'B: jump', keyLight: 'W: turn the light off or on', keyW: 'W: visit, come back or wave', keyEmpujon: 'A: shove!', keyVender: 'A: sell', keyPicar: 'A: dig', keyFiesta: 'A: party', keyTodos: 'B: the wave', keyLlamar: 'W: call the neighbours',
      casa: '{pj}’s house. Arrow keys move it.', escenaLabel: 'Stage: {pj}. Arrow keys move it.',
      solo: 'Put it next to someone', vacio: 'Nobody’s here', llamar: 'Stick a house to this stage',
      escena: { chef: 'Curro opens the kitchen', rogelio: 'A beer, please!', robot: 'The robot does the dishes', minera: 'The miner wants a cold one', luna: 'Moonlit beach party!', gato: 'The cat smells grilled sardines', roni: 'Roni orders a pizza… no pineapple', pina: 'The Pineapple Boss demands pineapple on the paella', tendero: 'The stallholder sells figurines on the beach', pastor: 'The shepherd looks for his sheep in the sand' },
      combo: { 'chef+rogelio': 'Set menu for Rogelio!', 'chef+robot': 'The robot tries the omelette', 'robot+rogelio': 'Rogelio tells the robot his old stories', 'chef+minera': 'Curro packs the miner a lunch', 'minera+rogelio': 'Rogelio says he used to dig too', 'minera+robot': 'The robot becomes a drill', 'chiringuito+mina': 'From the pit to the beach bar!', luna: 'Shhh… the moon is asleep', 'chef+luna': 'Curro dreams of paella', 'luna+rogelio': 'Rogelio snores like a tractor', 'luna+robot': 'The robot goes into sleep mode', 'luna+minera': 'The miner dreams she’s debt-free', 'gato+luna': 'The cat meows at the moon', 'chef+gato': 'Curro saves a sardine for the cat', 'gato+rogelio': 'Rogelio pets the cat', 'gato+robot': 'The cat and the robot stare each other down', 'gato+minera': 'The miner adopts the cat', gato: 'Meow!', otro: 'Neighbours!', 'pina+roni': 'Duel: pineapple or no pineapple!', 'pastor+tendero': 'The stallholder wants to sell him again', 'arena+puesto': 'Fighter figurines!', 'arena+chiringuito': 'Pizza on the beach!', 'chef+pina': 'Curro hides the pineapple', 'chef+roni': 'Curro makes Roni a pizza', 'rogelio+tendero': 'Rogelio haggles with the stallholder', 'pastor+rogelio': 'Rogelio tells the shepherd old stories', 'pastor+robot': 'The robot doesn’t get the nativity scene', 'minera+pina': 'The miner offers to pay in pineapples', 'robot+roni': 'Roni teaches the robot to multiply', 'luna+pastor': 'The shepherd counts sheep', 'gato+pastor': 'The cat chases the sheep', 'gato+pina': 'The cat plays with the Boss’s crown', 'pina+tendero': 'The stallholder sells the Boss a throne', 'pastor+roni': 'Roni guards the shepherd', 'luna+roni': 'Roni trains under the moon' },
      keyEstrella: 'A: shooting star', keyNana: 'B: lullaby for the neighbours', keyEstirar: 'A: stretch', keyRonronear: 'B: purr', keyVaso: 'W: knock the glass off',
      dice: { chef: 'Coming up!|Yes, chef!|Grilled fish!|Paella!|Omelette!', rogelio: 'So hot!|Oh, my back!|Back in my day…|Nap time!|This is the life!', robot: 'BEEP BOOP|01101|LOADING…|HUMANS?|ERROR 404!', minera: 'Dig dig!|Gotta pay!|Gold, gold!|Clink!|Who turned off the light?', roni: 'Hiya!|No pineapple!|Multiply!|Pepperoni Clan!|To the arena!', pina: 'Pineapple yes!|Kneel!|I’m the boss!|Grrr!|Tropical!', tendero: 'Figurines!|One euro!|Cheap, cheap!|The week is ending!|Special offer!', pastor: 'Baaa!|Where are my sheep?|The star!|I’m late!|I’m made of clay' },
      llega: { chef: 'To the kitchen!|We’re open!', rogelio: 'Hello there!|Hi, hi!', robot: 'BEEP. HELLO|ARRIVAL OK', minera: 'A cold one!|I earned it!', roni: 'Attack!|I’m here!', pina: 'Make way!|The boss is here!', tendero: 'Stall’s open!|Hello!', pastor: 'Baaa!|Any sheep?' },
      charla: { chef: 'What’ll it be?|Some tapas!|Coming up!', rogelio: 'A beer!|Yummy!|Thanks!', robot: 'BEEP. THANKS|OMELETTE?|DELICIOUS', minera: 'How’s your debt?|Cheers to that!|Phew, what a day!', roni: 'Pineapple? Never!|En garde!|Good fight!', pina: 'Pineapple for everyone!|Silence!|I like it!', tendero: 'Shall I wrap it?|Special price!|Cheap!', pastor: 'Baaa!|Seen my sheep?|So cold!' },
      saludo: 'Hi!|Hey!|Howdy!|What’s up!',
      deseo: 'Holidays!|More naps!|A great job!|Beach!|Top marks!',
      mareo: 'So dizzy!|@_@', despertar: 'Huh!|Coming!|What time is it?',
      toque: 'Hey!|Yes?|Hi!|Hehe|What?', harto: 'Enough!|Stop it!|Grrr', sacudida: 'Aaah!|Help!|Hold still!',
      buenasNoches: 'Good night!|Bedtime!', buenosDias: 'Good morning!|Rise and shine!',
      nana: 'The moon sings them a lullaby', lunaSola: 'Put a house next to the moon', deseoDeuda: 'Less debt, please!',
      sueña: { chef: 'Giant paella…|Three stars…', rogelio: 'Back in the army…|An endless nap…', robot: 'ELECTRIC SHEEP…|01100…', minera: 'Debt: 0…|Gold, gold…', roni: 'Endless pizza…|Black belt…', pina: 'Pineapple on everything…|Tropical throne…', tendero: 'Sold out…|Full till…', pastor: 'One sheep… two sheep…|The star…' },
      gatoLuna: 'Meeeow at the moon!', mimos: 'So cute!|Kitty!|Cuddles!|Awww', gatoSolo: 'Stick a house next to the cat', ronroneo: 'The purring wakes them up',
      clonc: 'CRASH!', gatoRiña: 'Cat!|That glass!|Oh, that cat!',
      deudaPagada: 'DEBT PAID!', deudaNueva: 'Another bill arrives…|More interest!|Again?',
      enMina: {
        pegar: { chef: 'Curro goes down with a packed lunch', rogelio: 'Rogelio digs “like the old days”', robot: 'The robot puts on a helmet', minera: 'The miner is back at work!', luna: 'The moon lights the mine: digging pays double!', gato: 'The cat guards the tunnels' },
        llega: { chef: 'Sandwiches!|Do we dig?', rogelio: 'Oh, my back!|Back in my day…', robot: 'DRILL MODE|BEEP. DIGGING', minera: 'Back to work!|Payday!' },
        charla: { chef: 'A sandwich?|Gotta eat!', rogelio: 'All fields, this was!|So damp!', robot: 'ROCK DETECTED|GOLD?', minera: 'What a seam!|Halves!' }
      },
      enArena: {
        pegar: { chef: 'Curro hands out slices in the arena', rogelio: 'Rogelio takes a front-row seat', robot: 'The robot referees', minera: 'The miner jumps into the arena', luna: 'A fight by moonlight', gato: 'The cat eats the pepperoni', roni: 'Roni jumps into the arena!', pina: 'The Pineapple Boss challenges everyone', tendero: 'The stallholder sells fight souvenirs', pastor: 'The shepherd wanders into the arena' },
        llega: { chef: 'Slices!|Who’s hungry?', rogelio: 'Let it begin!|Hit him hard!', robot: 'REFEREE MODE|BEEP. FIGHT!', minera: 'Go for it!|Send him flying!', roni: 'En garde!|Next!', pina: 'Kneel!|My arena!', tendero: 'Souvenirs!|One euro!', pastor: 'Baaa!|How scary!' },
        charla: { chef: 'A slice?|Stuffed crust!', rogelio: 'Back in my day we shoved harder!|Go!', robot: 'CRITICAL HIT|PINEAPPLE? ERROR', minera: 'Nice hit!|Again!', roni: 'Good fight!|No pineapple!', pina: 'Pineapple yes!|I’ll crush you!', tendero: 'A champion figurine!|Special offer!', pastor: 'Baaa!|Ouch, ouch!' },
        fuera: 'Out of the arena!|Aaah!|You’ll pay for this!|See ya!|Oof!',
        solo: 'Nobody dares?|Someone come!|I’m all alone!'
      },
      enPuesto: {
        pegar: { chef: 'Curro looks for a chef figurine', rogelio: 'Rogelio haggles with the stallholder', robot: 'The robot scans the figurines', minera: 'The miner wants to pay in nuggets', luna: 'The moon plays the nativity star', gato: 'The cat knocks a figurine over', roni: 'Roni looks for a ninja figurine', pina: 'The Pineapple Boss wants a clay pineapple', tendero: 'The stallholder opens the stall!', pastor: 'The shepherd goes back to his shelf' },
        llega: { chef: 'Any chefs?|How pretty!', rogelio: 'How much?|Too expensive!', robot: 'SCANNING…|PRICE?', minera: 'Do you take nuggets?|I’ll take it!', roni: 'Any ninjas?|Hiya!', pina: 'Any pineapples?|I want it all!', tendero: 'We’re open!|Figurines!', pastor: 'Baaa!|Back to my spot!' },
        charla: { chef: 'Look at this one!|So detailed!', rogelio: 'It used to be cheaper!|Ah, the nativity!', robot: 'OBJECT: SHEEP|EDIBLE?', minera: 'And that star?|Lovely!', roni: 'Is there one of me?|Cool!', pina: 'There’s no pineapple!|I’ll buy it!', tendero: 'Shall I wrap it?|Special price!', pastor: 'Baaa!|Don’t touch me!' },
        ofrece: 'Look at this little sheep!|A wise king, sir!|Special price!|Last week!',
        compra: 'I’ll take it!|A sheep!|Can you wrap it?|A wise king!|For the nativity!',
        noCompra: 'Just looking…|Too pricey|Hmm… no|Another day',
        solo: 'Nobody buying?|Figurines!|The week is ending!'
      }
    },
    contactForm: { cta: 'Or contact me here', kicker: 'Contact', title: 'Write to me', intro: 'Tell me what you need and I’ll reply to the email you leave.', back: '← Back to the portfolio', name: 'Name', email: 'Email', reason: 'Reason', pick: 'Choose one…', job: 'Job offer', collab: 'Collaboration / project', jam: 'Game jam', other: 'Other', message: 'Message', send: 'Send message', note: 'I’ll only use your details to reply.', badEmail: 'Enter a valid email, e.g. name@domain.com' },
    toast: { copied: 'EMAIL COPIED TO CLIPBOARD', failed: 'Could not copy — ', sent: 'MESSAGE SENT! I’LL GET BACK TO YOU SOON' },
    placeholder: { pending: 'Image pending — replace' },
    featured: { label: 'Featured project', view: 'View full project', trailer: '▶ Gameplay Alpha 06/11', role: 'My role' },
    page404: {
      code: '404',
      title: 'This page got lost on its way to the Global Jam.',
      body: "The link you followed doesn't exist or has moved. Head back to the portfolio and start from there.",
      cta: '← Back to portfolio'
    }
  }
};
