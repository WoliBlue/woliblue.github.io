/* Textos de interfaz y contenido de "Sobre mí" en ES/EN. */

const UI = {
  es: {
    nav: { inicio: 'Inicio', juegos: 'Juegos', proyectos: 'Proyectos', sobremi: 'Sobre mí' },
    theme: { toDark: 'Oscuro', toLight: 'Claro' },
    lang: { target: 'English' },
    hero: {
      eyebrow: 'Portfolio 2026',
      role: 'PROGRAMADOR DE UNITY & GAME DESIGNER',
      lede: 'Programador de Unity y Game Designer en Málaga, con formación como Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM).',
      cv: 'Descargar CV',
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
      lede: 'Programador de Unity y Game Designer. He diseñado y programado sistemas de gameplay, diálogos, minijuegos y niveles, tanto en equipo como en proyectos individuales. Soy Técnico Superior en Desarrollo de Aplicaciones Multiplataforma y también programo en Java, Python, Kotlin y C#.',
      idiomasList: [
        { lang: 'Español', level: 'Nativo' },
        { lang: 'Inglés', level: 'C2 (Cambridge)' }
      ],
      socialList: ['Trabajo en equipo', 'Atención al público', 'Paciencia'],
      experience: [
        { when: 'Jun 2025 — Sept 2025', title: 'Traductor en Marbellatrad', desc: 'Colaboración en la preparación de traducciones juradas (inglés/español) y soporte técnico especializado.' },
        { when: 'Mar 2025 — Jun 2025', title: 'Prácticas en EY', desc: 'Gestión proactiva de incidencias y automatización de tareas mediante BluePrism, Kibana y TrustPortal.' },
        { when: 'Jun 2024 — Sept 2024', title: 'Servicio al cliente, Kinépolis', desc: 'Ventas de cara al público, mantenimiento, acomodación, cocina y limpieza del cine.' }
      ],
      education: [
        { when: 'Oct 2025 — Dic 2026', title: 'EVAD (Málaga)', desc: 'Máster en Diseño y Desarrollo de Videojuegos. En curso; proyecto final: Tourist Trap.' },
        { when: 'Sept 2023 — Jun 2025', title: 'Centro Medac Nova (Málaga)', desc: 'Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM).' }
      ]
    },
    footer: { location: 'Málaga, España' },
    detail: {
      back: '← Volver al portfolio',
      role: 'Qué hice',
      howToPlay: 'Cómo se juega',
      credits: 'Créditos',
      gallery: 'Galería',
      repo: 'Ver código en GitHub',
      linkPending: 'Enlace pendiente',
      notFoundTitle: 'Proyecto no encontrado',
      notFoundBack: '← Volver al portfolio'
    },
    toast: { copied: 'CORREO COPIADO AL PORTAPAPELES', failed: 'No se pudo copiar — ' },
    placeholder: { pending: 'Imagen pendiente — sustituye' },
    featured: { label: 'Proyecto destacado', view: 'Ver ficha completa', trailer: '▶ Gameplay Alpha Septiembre', role: 'Mi papel' },
    page404: {
      code: '404',
      title: 'Esta página se ha perdido de camino a la Global Jam.',
      body: 'El enlace que has seguido no existe o se ha movido. Vuelve al portfolio y sigue desde ahí.',
      cta: '← Volver al portfolio'
    }
  },

  en: {
    nav: { inicio: 'Home', juegos: 'Games', proyectos: 'Projects', sobremi: 'About' },
    theme: { toDark: 'Dark', toLight: 'Light' },
    lang: { target: 'Español' },
    hero: {
      eyebrow: 'Portfolio 2026',
      role: 'UNITY PROGRAMMER & GAME DESIGNER',
      lede: 'Unity Programmer and Game Designer based in Málaga, Spain, with a Higher Technician degree in Multiplatform Application Development (DAM).',
      cv: 'Download CV',
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
      lede: 'Unity Programmer and Game Designer. I’ve designed and programmed gameplay systems, dialogue, minigames and levels, both in teams and on solo projects. I hold a Higher Technician degree in Multiplatform Application Development and also code in Java, Python, Kotlin and C#.',
      idiomasList: [
        { lang: 'Spanish', level: 'Native' },
        { lang: 'English', level: 'C2 (Cambridge)' }
      ],
      socialList: ['Teamwork', 'Customer service', 'Patience'],
      experience: [
        { when: 'Jun 2025 — Sept 2025', title: 'Translator at Marbellatrad', desc: 'Helped prepare sworn translations (English/Spanish) and provided specialized technical support.' },
        { when: 'Mar 2025 — Jun 2025', title: 'Internship at EY', desc: 'Proactive incident management and task automation using BluePrism, Kibana and TrustPortal.' },
        { when: 'Jun 2024 — Sept 2024', title: 'Customer service, Kinépolis', desc: 'Front-of-house sales, maintenance, ushering, kitchen and cinema cleaning.' }
      ],
      education: [
        { when: 'Oct 2025 — Dec 2026', title: 'EVAD (Málaga)', desc: 'Master’s in Game Design and Development. In progress; final project: Tourist Trap.' },
        { when: 'Sept 2023 — Jun 2025', title: 'Centro Medac Nova (Málaga)', desc: 'Higher Technician in Multiplatform Application Development (DAM).' }
      ]
    },
    footer: { location: 'Málaga, Spain' },
    detail: {
      back: '← Back to portfolio',
      role: 'What I did',
      howToPlay: 'How to play',
      credits: 'Credits',
      gallery: 'Gallery',
      repo: 'View code on GitHub',
      linkPending: 'Link pending',
      notFoundTitle: 'Project not found',
      notFoundBack: '← Back to portfolio'
    },
    toast: { copied: 'EMAIL COPIED TO CLIPBOARD', failed: 'Could not copy — ' },
    placeholder: { pending: 'Image pending — replace' },
    featured: { label: 'Featured project', view: 'View full project', trailer: '▶ Alpha Gameplay · September', role: 'My role' },
    page404: {
      code: '404',
      title: 'This page got lost on its way to the Global Jam.',
      body: "The link you followed doesn't exist or has moved. Head back to the portfolio and start from there.",
      cta: '← Back to portfolio'
    }
  }
};
