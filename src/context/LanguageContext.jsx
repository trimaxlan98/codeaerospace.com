import React, { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

const translations = {
  // Header / Nav
  nav: {
    home: { en: 'Home', es: 'Inicio' },
    leadership: { en: 'Leadership', es: 'Liderazgo' },
    services: { en: 'Services', es: 'Servicios' },
    impact: { en: 'Impact', es: 'Impacto' },
    wrc2027: { en: 'WRC-2027', es: 'WRC-2027' },
    microapps: { en: 'MicroApps', es: 'MicroApps' },
    research: { en: 'Research', es: 'Investigación' },
    contact: { en: 'Contact', es: 'Contacto' },
  },

  // Hero
  hero: {
    badge: { en: 'Advanced Space Systems for NGSO', es: 'Sistemas Espaciales Avanzados para NGSO' },
    subtitle: { en: 'Research-Driven Engineering for the', es: 'Ingeniería basada en Investigación para la' },
    subtitleHighlight: { en: 'NewSpace Economy', es: 'Economía NewSpace' },
    cta1: { en: 'Explore Solutions', es: 'Explorar Soluciones' },
    cta2: { en: 'Contact Us', es: 'Contáctanos' },
    explore: { en: 'EXPLORE ECOSYSTEM', es: 'EXPLORAR ECOSISTEMA' },
    scroll: { en: 'EXPLORE ECOSYSTEM', es: 'EXPLORAR ECOSISTEMA' },
  },

  // Leadership
  leadership: {
    title1: { en: 'Technical', es: 'Liderazgo' },
    title2: { en: 'Leadership', es: 'Técnico' },
    subtitle: { en: 'Guiding the future of aerospace engineering with precision and vision.', es: 'Guiando el futuro de la ingeniería aeroespacial con precisión y visión.' },
    viewCv: { en: '[ View Full CV ]', es: '[ Ver CV Completo ]' },
    clickCv: { en: 'Click to view CV', es: 'Clic para ver CV' },
    execute: { en: '[ > EXECUTE_VIEW ]', es: '[ > EJECUTAR_VISTA ]' },
  },

  // Home
  home: {
    mission: {
      title: { en: "Advancing Orbital Autonomy", es: "Avanzando en la Autonomía Orbital" },
      badge: { en: "Current Mission: JPL 2027", es: "Misión Actual: JPL 2027" },
      desc: { 
        en: "Our cutting-edge engineering aligns with the NASA JPL 2027 Roadmap. We develop Automatic Positioning and Tracking (APT) systems that define the future of deep space communications.", 
        es: "Nuestra ingeniería de vanguardia se alinea con el Roadmap de la NASA JPL 2027. Desarrollamos sistemas de Posicionamiento y Rastreo Automático (APT) que definen el futuro de las comunicaciones en el espacio profundo." 
      },
      explore: { en: "Explore Research", es: "Explorar Investigación" },
      aptControl: { en: "APT Control", es: "Control APT" },
      aptDesc: { en: "Closed-loop dynamics for high-precision antenna positioning.", es: "Dinámica de lazo cerrado para posicionamiento de antena de alta precisión." },
      jplAlignment: { en: "JPL Alignment", es: "Alineación con JPL" },
      jplDesc: { en: "Strategic integration with 2027 deep space communication goals.", es: "Integración estratégica con los objetivos de comunicación de espacio profundo 2027." }
    }
  },

  // CV Modal
  cv: {
    education: { en: 'Education', es: 'Educación' },
    experience: { en: 'Experience', es: 'Experiencia' },
    skills: { en: 'Key Skills', es: 'Habilidades Clave' },
    contact: { en: 'Contact', es: 'Contacto' },
    close: { en: 'Close', es: 'Cerrar' },
    download: { en: 'Download CV', es: 'Descargar CV' },
    downloadLink: { en: 'Open PDF', es: 'Abrir PDF' },
  },

  // Investor Panel
  investor: {
    badge: { en: 'Investor Relations', es: 'Relación con Inversionistas' },
    title1: { en: 'Technological', es: 'Desarrollo de' },
    title2: { en: 'Funding Engine', es: 'Fondeo Tecnológico' },
    fund: { en: 'Research Fund', es: 'Fondo de Investigación' },
    apps: { en: 'Active MicroApps', es: 'MicroApps Activas' },
    goal: { en: 'Mission 2027 Goal', es: 'Meta Misión 2027' },
    startup_guarantee: {
      en: 'BACKING & CONTINUITY: As a diversified startup, our MicroApps\' stability is shielded by the technical infrastructure of our aerospace division. Your service doesn\'t depend on an individual, but on a mission-critical engineering organization.',
      es: 'RESPALDO Y CONTINUIDAD: Al ser una startup diversificada, la estabilidad de nuestras MicroApps está blindada por la infraestructura técnica de nuestra división aeroespacial. Tu servicio no depende de un individuo, sino de una organización de ingeniería de misión crítica.'
    },
    validationTitle: { en: 'Startup Validation', es: 'Validación Startup' },
    sectors: {
      health: { en: 'Health', es: 'Salud' },
      logistics: { en: 'Logistics', es: 'Logística' },
      education: { en: 'Education', es: 'Educación' }
    }
  },

  // Roadmap
  roadmap: {
    title: { en: 'Mission Roadmap', es: 'Mapa de Ruta de la Misión' },
    y2024: {
      title: { en: 'Foundation', es: 'Fundación de Co.De Aerospace' },
      desc: { en: 'Establishment of Co.De Aerospace and core research principles.', es: 'Establecimiento del laboratorio y principios fundamentales de investigación.' }
    },
    y2025: {
      title: { en: 'MicroApps & WITCOM', es: 'División MicroApps & WITCOM 2025' },
      desc: { en: 'Launch of commercial digital solutions and publication at WITCOM 2025.', es: 'Lanzamiento de soluciones digitales y presentación en el congreso WITCOM 2025.' }
    },
    y2026: {
      title: { en: 'APT Beta Phase', es: 'Fase Beta del Sistema APT' },
      desc: { en: 'Advanced development of Automatic Positioning and Tracking systems (Master Thesis).', es: 'Desarrollo avanzado de sistemas de posicionamiento automático (Tesis de Maestría).' }
    },
    y2027: {
      title: { en: 'NASA JPL & WRC-27', es: 'NASA JPL & WRC-27' },
      desc: { en: 'Strategic stay at JPL and technical support for ITU WRC-27.', es: 'Estancia estratégica en JPL y soporte técnico para la UIT WRC-27.' }
    }
  },

  // Services
  services: {
    title1: { en: 'Technical', es: 'Servicios' },
    title2: { en: 'Services', es: 'Técnicos' },
    subtitle: { en: 'High-level engineering and digital solutions designed to solve complex business challenges with precision.', es: 'Soluciones digitales y de ingeniería de alto nivel diseñadas para resolver desafíos empresariales complejos con precisión.' },
    learnMore: { en: 'Learn More', es: 'Saber Más' },
    microappsLink: { en: 'Looking for a fast web solution for your business? Explore our MicroApps.', es: '¿Buscas una solución web rápida para tu negocio? Explora nuestras MicroApps.' },
    microappsBtn: { en: 'View Digital Solutions', es: 'Ver Soluciones Digitales' },
    ui: {
      serial: { en: 'MOD-HW', es: 'MOD-HW' },
      command: { en: '> EXECUTE_LEARN', es: '> EJECUTAR_SABER' },
    },
    web: {
      title: { en: 'Enterprise Web Platforms', es: 'Plataformas Web Empresariales' },
      desc: { en: 'Custom dashboards, internal tools, and scalable web architectures using React, Node.js, and Flask.', es: 'Dashboards a medida, herramientas internas y arquitecturas web escalables con React, Node.js y Flask.' },
      details: { 
        es: "Desarrollo de ecosistemas digitales robustos. Incluye: Arquitecturas escalables con React/Node.js, integración de APIs RESTful, bases de datos optimizadas (PostgreSQL/Redis) y despliegue en contenedores Docker.", 
        en: "Development of robust digital ecosystems. Includes: Scalable architectures with React/Node.js, RESTful API integration, optimized databases (PostgreSQL/Redis), and Docker container deployment." 
      }
    },
    ai_automation: {
      title: { en: 'AI & Agentic Automation', es: 'IA y Automatización Agéntica' },
      desc: { en: 'Orchestration of AI agents to automate complex workflows and data analysis using LangChain.', es: 'Orquestación de agentes de IA para automatizar flujos de trabajo complejos y análisis de datos con LangChain.' },
      details: { 
        es: "Implementación de flujos autónomos. Especialidad en: Orquestación de agentes con LangChain, automatización de reportes técnicos, fine-tuning de LLMs y procesamiento de lenguaje natural (NLP) para análisis de datos masivos.", 
        en: "Implementation of autonomous workflows. Specialty: Agent orchestration with LangChain, technical report automation, LLM fine-tuning, and NLP for massive data analysis." 
      }
    },
    mobile: {
      title: { en: 'Full-Stack Mobile Apps', es: 'Apps Móviles Full-Stack' },
      desc: { en: 'Cross-platform mobile solutions (iOS/Android) integrated with cloud infrastructure.', es: 'Soluciones móviles multiplataforma (iOS/Android) integradas con infraestructura en la nube.' },
      details: { 
        es: "Aplicaciones móviles nativas y multiplataforma. Enfoque en: Experiencia de usuario (UX) de alto nivel, sincronización en tiempo real, integración con hardware y arquitecturas seguras para iOS y Android.", 
        en: "Native and cross-platform mobile apps. Focus on: High-level UX, real-time synchronization, hardware integration, and secure architectures for iOS and Android." 
      }
    },
    vr_training: {
      title: { en: 'Industrial VR Training', es: 'Capacitación en Realidad Virtual' },
      desc: { en: 'Immersive VR simulations for industrial safety, training, and operational efficiency.', es: 'Simulaciones inmersivas en RV para seguridad industrial, capacitación y eficiencia operativa.' },
      details: { 
        es: "Entornos inmersivos para industria. Desarrollo en Unity/C# de simuladores de seguridad (STPS), capacitación operativa en VR y gemelos digitales para visualización de procesos complejos.", 
        en: "Immersive environments for industry. Unity/C# development of safety simulators (STPS), operational VR training, and digital twins for complex process visualization." 
      }
    },
    iot_automation: {
      title: { en: 'Industrial IoT & Control', es: 'IoT Industrial y Control' },
      desc: { en: 'Embedded systems and IoT solutions for process monitoring and hardware automation.', es: 'Sistemas embebidos y soluciones IoT para monitoreo de procesos y automatización de hardware.' },
      details: { 
        es: "Digitalización de procesos físicos. Expertos en: Sistemas embebidos (STM32/ESP32), protocolos de comunicación industrial, instrumentación avanzada y control de sistemas dinámicos en tiempo real.", 
        en: "Digitalization of physical processes. Experts in: Embedded systems (STM32/ESP32), industrial communication protocols, advanced instrumentation, and real-time dynamic systems control." 
      }
    },
    project_eng: {
      title: { en: 'Custom Project Engineering', es: 'Ingeniería de Proyectos a Medida' },
      desc: { en: 'Technical consulting, structural analysis (FEA), and mechanical design for industrial challenges.', es: 'Consultoría técnica, análisis estructural (FEA) y diseño mecánico para desafíos industriales.' },
      details: { 
        es: "Consultoría de ingeniería integral. Servicios de: Análisis por elementos finitos (FEA) térmico-estructural, diseño mecánico avanzado en SolidWorks y gestión de proyectos tecnológicos de alta complejidad.", 
        en: "Comprehensive engineering consultancy. Services: Thermal-structural FEA analysis, advanced mechanical design in SolidWorks, and management of high-complexity technological projects." 
      }
    },
  },

  // WRC-2027
  wrc: {
    title1: { en: 'Strategic Support for', es: 'Apoyo Estratégico para' },
    title2: { en: 'ITU WRC-2027', es: 'UIT WRC-2027' },
    subtitle: { en: 'As the global inflection point for orbital frequency bands approaches, we empower nations and organizations to achieve', es: 'A medida que se acerca el punto de inflexión global para las bandas de frecuencia orbital, empoderamos a naciones y organizaciones para lograr' },
    sovereignty: { en: 'Technological Sovereignty', es: 'Soberanía Tecnológica' },
    while: { en: 'while ensuring', es: 'mientras aseguramos la' },
    coexistence: { en: 'Spectrum Coexistence', es: 'Coexistencia Espectral' },
    interference: {
      title: { en: 'Interference Mitigation', es: 'Mitigación de Interferencia' },
      desc: { en: 'Advanced modeling for NGSO constellations, ensuring compliance with ITU equivalent power flux-density (epfd) limits to protect GSO networks.', es: 'Modelado avanzado para constelaciones NGSO, asegurando cumplimiento con los límites de densidad de flujo de potencia equivalente (epfd) de la UIT para proteger redes GSO.' },
    },
    spectrum: {
      title: { en: 'Spectrum Consultancy', es: 'Consultoría Espectral' },
      desc: { en: 'Strategic technical consultancy for radio-frequency allocation, navigating the complex regulatory landscape of international compliance.', es: 'Consultoría técnica estratégica para asignación de radiofrecuencias, navegando el complejo panorama regulatorio de cumplimiento internacional.' },
    },
    payload: {
      title: { en: 'Next-Gen Payload R&D', es: 'I+D de Carga Útil de Nueva Generación' },
      desc: { en: 'Research and development of adaptive payloads designed for orbital assets, maximizing spectral efficiency in crowded LEO environments.', es: 'Investigación y desarrollo de cargas útiles adaptativas diseñadas para activos orbitales, maximizando la eficiencia espectral en ambientes LEO congestionados.' },
    },
    ituBadge: { en: 'Official ITU WRC-27 Resource', es: 'Recurso Oficial UIT WRC-27' },
    ituTitle: { en: 'Global Regulatory Portal: WRC-27', es: 'Portal Regulatorio Global: WRC-27' },
    ituDesc: { en: 'Access official resources for the World Radiocommunication Conference 2027 to stay informed on the future of global orbital frequency bands.', es: 'Accede a los recursos oficiales de la Conferencia Mundial de Radiocomunicaciones 2027 para mantenerte informado sobre el futuro de las bandas de frecuencia orbital globales.' },
    ituBtn: { en: 'Access ITU Portal', es: 'Acceder al Portal UIT' },
  },

  // Triple Helix
  helix: {
    badge: { en: 'Operational Model', es: 'Modelo Operativo' },
    title1: { en: 'Innovation Ecosystem: The', es: 'Ecosistema de Innovación: La' },
    title2: { en: 'Triple Helix', es: 'Triple Hélice' },
    subtitle: { en: 'Co.De Aerospace operates at the intersection of critical sectors, leveraging a synergistic model to accelerate space technology readiness.', es: 'Co.De Aerospace opera en la intersección de sectores críticos, aprovechando un modelo sinérgico para acelerar la madurez tecnológica espacial.' },
    gov: {
      title: { en: 'Government & Regulatory', es: 'Gobierno y Regulación' },
      role: { en: 'Policy & Compliance', es: 'Política y Cumplimiento' },
      desc: { en: 'Providing technical support for national frequency planning and comprehensive spectrum management reports to ensure sovereignty and international alignment.', es: 'Brindando soporte técnico para la planificación de frecuencias nacionales y reportes integrales de gestión espectral para asegurar soberanía y alineación internacional.' },
    },
    industry: {
      title: { en: 'Industry I+D', es: 'Industria I+D' },
      role: { en: 'Applied Engineering', es: 'Ingeniería Aplicada' },
      desc: { en: 'Development of functional prototypes, control algorithms, and ground station architectures driving the new Non-Geostationary (NGSO) economy.', es: 'Desarrollo de prototipos funcionales, algoritmos de control y arquitecturas de estaciones terrenas impulsando la nueva economía no geoestacionaria (NGSO).' },
    },
    academic: {
      title: { en: 'Academic Frontier', es: 'Frontera Académica' },
      role: { en: 'Research & Talent', es: 'Investigación y Talento' },
      desc: { en: 'Fostering high-level talent pipelines and supporting advanced satellite communication research to push the boundaries of what is possible in LEO.', es: 'Fomentando canales de talento de alto nivel y apoyando investigación avanzada en comunicaciones satelitales para ampliar los límites de lo posible en LEO.' },
    },
  },

  // Contact
  contact: {
    title1: { en: 'Partner With', es: 'Colabora Con' },
    subtitle: { en: "Ready to collaborate on your next mission? Share your requirements and let's engineer the future together.", es: '¿Listo para colaborar en tu próxima misión? Comparte tus requerimientos y diseñemos el futuro juntos.' },
    orgName: { en: 'Organization Name *', es: 'Nombre de la Organización *' },
    orgPlaceholder: { en: 'Your Organization', es: 'Tu Organización' },
    email: { en: 'Contact Email *', es: 'Correo de Contacto *' },
    serviceInterest: { en: 'Service Interest *', es: 'Servicio de Interés *' },
    selectService: { en: 'Select a service', es: 'Selecciona un servicio' },
    message: { en: 'Message *', es: 'Mensaje *' },
    messagePlaceholder: { en: 'Tell us about your project requirements...', es: 'Cuéntanos sobre los requerimientos de tu proyecto...' },
    submit: { en: 'Submit Inquiry', es: 'Enviar Consulta' },
    submitting: { en: 'Opening Email Client...', es: 'Abriendo Cliente de Correo...' },
    emailNote: { en: 'This will open your default email client with the inquiry details pre-filled.', es: 'Esto abrirá tu cliente de correo predeterminado con los detalles de la consulta pre-llenados.' },
    thankYou: { en: 'Thank You!', es: '¡Gracias!' },
    thankYouMsg: { en: 'Your email client has been opened. Please send the email to complete your inquiry. We\'ll get back to you as soon as possible.', es: 'Tu cliente de correo ha sido abierto. Por favor envía el email para completar tu consulta. Te responderemos lo antes posible.' },
    errors: {
      orgRequired: { en: 'Organization name is required', es: 'El nombre de la organización es requerido' },
      emailRequired: { en: 'Email is required', es: 'El correo es requerido' },
      emailInvalid: { en: 'Please enter a valid email address', es: 'Por favor ingresa un correo válido' },
      serviceRequired: { en: 'Please select a service interest', es: 'Por favor selecciona un servicio de interés' },
      messageRequired: { en: 'Message is required', es: 'El mensaje es requerido' },
      messageMin: { en: 'Message must be at least 10 characters', es: 'El mensaje debe tener al menos 10 caracteres' },
      validation: { en: 'Validation Error', es: 'Error de Validación' },
      validationDesc: { en: 'Please correct the errors in the form', es: 'Por favor corrige los errores en el formulario' },
    },
    emailOpened: { en: 'Email Client Opened', es: 'Cliente de Correo Abierto' },
    emailOpenedDesc: { en: 'Your default email client has been opened with the inquiry details. Please send the email to complete your submission.', es: 'Tu cliente de correo predeterminado ha sido abierto con los detalles de la consulta. Por favor envía el email para completar tu envío.' },
  },

  // Footer
  footer: {
    tagline: { 
      en: 'High-impact engineering and scalable digital solutions. Mexican startup driving technological sovereignty from Earth to orbit.', 
      es: 'Ingeniería de alto impacto y soluciones digitales escalables. Startup mexicana impulsando la soberanía tecnológica desde la Tierra hasta la órbita.' 
    },
    email: { en: 'Direct Channel: contacto@codeaerospace.com', es: 'Canal Directo: contacto@codeaerospace.com' },
    services: { en: 'Services', es: 'Servicios' },
    web: { en: 'Web Platforms', es: 'Plataformas Web' },
    ai: { en: 'AI Automation', es: 'Automatización IA' },
    mobile: { en: 'Mobile Apps', es: 'Apps Móviles' },
    engineering: { en: 'Project Engineering', es: 'Ingeniería de Proyectos' },
    company: { en: 'Company', es: 'Empresa' },
    methodology: { en: 'Methodology', es: 'Metodología' },
    resources: { en: 'Resources', es: 'Recursos' },
    rights: { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
    privacy: { en: 'Privacy Policy', es: 'Política de Privacidad' },
    terms: { en: 'Terms of Service', es: 'Términos de Servicio' },
    close: { en: 'Close', es: 'Cerrar' },
  },

  // Visit Counter
  visits: {
    label: { en: 'This site has been visited', es: 'Este sitio ha sido visitado' },
    times: { en: 'times', es: 'veces' },
    time: { en: 'time', es: 'vez' },
  },

  // Loading
  loading: {
    init: { en: 'Initializing', es: 'Inicializando' },
  },

  // MicroApps
  microapps: {
    badge: { en: 'Technology Funding Unit', es: 'Unidad de Fondeo Tecnológico' },
    fundingTitle: { en: 'Web Development & Project Funding', es: 'Desarrollo Web y Fondeo de Proyectos' },
    title1: { en: 'Your Business', es: 'Tu Negocio' },
    title2: { en: 'Online in 5 Steps', es: 'En Línea en 5 Pasos' },
    subtitle: {
      en: 'High-performance digital solutions. The development of these applications directly funds our NGSO satellite communications research and supports technical sovereignty.',
      es: 'Soluciones digitales de alto rendimiento. El desarrollo de estas aplicaciones financia directamente nuestra investigación en comunicaciones satelitales NGSO y el apoyo a la soberanía tecnológica.',
    },
    fundingNote: {
      en: 'By hiring a service, you drive the development of Mexican aerospace technology.',
      es: 'Al contratar un servicio, impulsas el desarrollo de tecnología aeroespacial mexicana.',
    },
    step1: {
      title: { en: 'Diagnosis', es: 'Diagnóstico' },
      desc: {
        en: 'We analyze your business, products, and daily needs to design the ideal solution.',
        es: 'Analizamos tu negocio, productos y necesidades diarias para diseñar la solución ideal.',
      },
    },
    step2: {
      title: { en: 'Design', es: 'Diseño' },
      desc: {
        en: 'We create the look and structure of your custom web app with your brand identity.',
        es: 'Creamos el aspecto y estructura de tu app web personalizada con la identidad de tu marca.',
      },
    },
    step3: {
      title: { en: 'Development', es: 'Desarrollo' },
      desc: {
        en: 'We build your app in 5 to 7 business days, ready to use from any device.',
        es: 'Construimos tu app en 5 a 7 días hábiles, lista para usar desde cualquier dispositivo.',
      },
    },
    step4: {
      title: { en: 'Launch', es: 'Lanzamiento' },
      desc: {
        en: 'Your app goes live with its own domain, SSL security, and personalized training.',
        es: 'Tu app sale en línea con dominio propio, seguridad SSL y capacitación personalizada.',
      },
    },
    step5: {
      title: { en: 'Support', es: 'Soporte' },
      desc: {
        en: 'On-demand system updates, security patches, and technical support for $600 MXN.',
        es: 'Actualizaciones de sistema bajo demanda, parches de seguridad y soporte por $600 MXN.',
      },
    },
    packages: { en: 'Packages', es: 'Paquetes' },
    maintenance: { en: 'Update Cost', es: 'Costo por Actualización' },
    maintenanceDesc: {
      en: 'System optimization, security patches, and content updates.',
      es: 'Optimización de sistema, parches de seguridad y cambios de contenido.',
    },
    updatePrice: { en: '$600', es: '$600' },
    updateSuffix: { en: 'per request', es: 'por actualización solicitada' },
    popular: { en: 'Most Popular', es: 'Más Popular' },
    cta: { en: 'Get Started', es: 'Comenzar' },
    basic: {
      name: { en: 'Starter', es: 'Básico' },
      price: { en: 'From $1,800', es: 'Desde $1,800' },
      f1: { en: 'Product/service catalog', es: 'Catálogo de productos/servicios' },
      f2: { en: 'Business info page', es: 'Página informativa del negocio' },
      f3: { en: 'WhatsApp contact button', es: 'Botón de contacto por WhatsApp' },
      f4: { en: 'Mobile responsive design', es: 'Diseño adaptable a celular' },
      f5: { en: 'Google Maps integration', es: 'Integración con Google Maps' },
    },
    pro: {
      name: { en: 'Professional', es: 'Profesional' },
      price: { en: 'From $2,500', es: 'Desde $2,500' },
      f1: { en: 'Everything in Starter', es: 'Todo lo del Básico' },
      f2: { en: 'Inventory management', es: 'Control de inventario' },
      f3: { en: 'Sales & expense tracking', es: 'Registro de ventas y gastos' },
      f4: { en: 'Basic reports & analytics', es: 'Reportes y estadísticas básicas' },
      f5: { en: 'Customer database', es: 'Base de datos de clientes' },
    },
    premium: {
      name: { en: 'Premium', es: 'Premium' },
      price: { en: 'From $3,500', es: 'Desde $3,500' },
      f1: { en: 'Everything in Professional', es: 'Todo lo del Profesional' },
      f2: { en: 'IoT device integration', es: 'Integración con dispositivos IoT' },
      f3: { en: 'Attendance & shift control', es: 'Control de asistencia y turnos' },
      f4: { en: 'Multi-branch support', es: 'Soporte multi-sucursal' },
      f5: { en: 'Advanced dashboards', es: 'Dashboards avanzados' },
    },
    enterprise: {
      name: { en: 'Custom/Enterprise', es: 'Sistemas a Medida' },
      price: { en: 'Quote', es: 'Cotización' },
      f1: { en: 'Complex API integration', es: 'Integración de APIs complejas' },
      f2: { en: 'Custom dashboards', es: 'Dashboards personalizados' },
      f3: { en: 'Dedicated support', es: 'Soporte dedicado' },
      f4: { en: 'Scalable architecture', es: 'Arquitectura escalable' },
      f5: { en: 'Whitelabel solutions', es: 'Soluciones marca blanca' },
    },
    demoLabel: { en: 'See Live Demo', es: 'Ver Demo en Vivo' },
    demoDesc: { en: 'Check out a real example of what we build for small businesses', es: 'Mira un ejemplo real de lo que construimos para micronegocios' },
    continuity: {
      title: { en: 'Continuity Guarantee', es: 'Garantía de Continuidad' },
      desc: { 
        en: 'Your application will never stop working; support is available on demand for only $600 MXN.',
        es: 'Tu aplicación nunca dejará de funcionar; el soporte está disponible bajo demanda por solo $600 MXN.'
      }
    },
    faq: {
      title: { en: 'Frequently Asked Questions', es: 'Preguntas Frecuentes' },
      q1: { es: "¿Cómo funciona el mantenimiento?", en: "How does maintenance work?" },
      a1: { 
        en: "We have evolved to a 'Pay for Value' model. We've eliminated forced monthly fees; now you only invest $600 MXN when you decide to update your system or content. This ensures your budget is used efficiently without long-term commitments.", 
        es: "Hemos evolucionado a un modelo de 'Pago por Valor'. Eliminamos las mensualidades forzosas; ahora solo inviertes $600 MXN cuando decidas actualizar tu sistema o contenido. Esto garantiza que tu presupuesto se use de forma eficiente sin compromisos a largo plazo." 
      },
      q2: { es: "¿Qué incluyen las actualizaciones de $600?", en: "What do the $600 updates include?" },
      a2: { es: "Cubre optimización de rendimiento, parches de seguridad, actualización de menús/precios y soporte técnico preventivo para asegurar la continuidad de tu app.", en: "It covers performance optimization, security patches, menu/price updates, and preventive technical support to ensure your app's continuity." },
      q3: { es: "¿Cuánto tiempo toma la entrega?", en: "How long is the delivery time?" },
      a3: { es: "Nuestras MicroApps están diseñadas para un despliegue rápido, generalmente entre 3 y 5 días hábiles después de recibir tu información.", en: "Our MicroApps are designed for rapid deployment, usually between 3 and 5 business days after receiving your information." },
      cta: { en: "Still have questions?", es: "¿Aún tengo dudas?" }
    },
    email: {
      subject: { 
        es: "[Co.De Aerospace] Cotización: Paquete {name} MicroApp", 
        en: "[Co.De Aerospace] Quote: {name} MicroApp Package" 
      },
      body: {
        es: "Hola equipo de Co.De Aerospace,\n\nMe interesa contratar el Paquete {name} para mi negocio. Entiendo que el costo por actualización es de $600 MXN y me gustaría iniciar el proceso.\n\nSaludos.",
        en: "Hello Co.De Aerospace team,\n\nI am interested in the {name} Package for my business. I understand that the cost per update is $600 MXN and I would like to start the process.\n\nBest regards."
      }
    }
  },

  // Impact & Training
  impact: {
    title: { es: "Trayectoria e Impacto", en: "Trajectory & Impact" },
    subtitle: { 
      es: "Nuestra presencia activa en foros internacionales y académicos respalda nuestra capacidad técnica y compromiso con la excelencia.", 
      en: "Our active presence in international and academic forums backs our technical capability and commitment to excellence." 
    },
    gallery_title: { es: "Galería de Misión", en: "Mission Gallery" },
    gallery_desc: { es: "Visualizando nuestro compromiso con la innovación y la formación.", en: "Visualizing our commitment to innovation and training." },
    workshops_title: { es: "Formación Especializada", en: "Specialized Training" },
    consulting_title: { es: "Consultoría Estratégica", en: "Strategic Consulting" },
    consulting_desc: { es: "Asesoría técnica de alto nivel para desafíos de misión crítica en los sectores industrial y aeroespacial.", en: "High-level technical advisory for mission-critical challenges in industrial and aerospace sectors." },
    consulting_cta: { es: "Solicitar Asesoría", en: "Request Advisory" },
    metrics: {
      hours: { es: "500+ Horas de Capacitación", en: "500+ Training Hours" },
      engineers: { es: "150+ Ingenieros Formados", en: "150+ Engineers Trained" },
      conferences: { es: "10+ Conferencias Internacionales", en: "10+ International Conferences" },
    },
    events: {
      witcom: { es: "WITCOM 2025: Ponencia Internacional", en: "WITCOM 2025: International Speaker" },
      nasa: { es: "NASA Space Apps: Mentoría y Desarrollo", en: "NASA Space Apps: Mentorship & Development" },
      ipn: { es: "Ponencias IPN: Formando Futuros Ingenieros", en: "IPN Lectures: Training Future Engineers" },
    },
    workshops: {
      ai: {
        title: { es: "IA Agéntica con LangChain", en: "Agentic AI with LangChain" },
        desc: { es: "Especialización en orquestación de agentes con LangChain y automatización de flujos técnicos.", en: "Specialization in agent orchestration with LangChain and technical workflow automation." },
      },
      control: {
        title: { es: "Control de Sistemas APT", en: "APT Systems Control" },
        desc: { es: "Diseño de algoritmos para rastreo satelital y control de precisión en tiempo real.", en: "Algorithm design for satellite tracking and real-time precision control." },
      },
      mechanical: {
        title: { es: "Ingeniería con SolidWorks & FEA", en: "Engineering with SolidWorks & FEA" },
        desc: { es: "Modelado avanzado en SolidWorks y análisis por elementos finitos (FEA) estructural.", en: "Advanced SolidWorks modeling and structural Finite Element Analysis (FEA)." },
      },
      enroll: { es: "Inscribirse", en: "Enroll Now" },
    },
    email: {
      consulting_subject: { es: "[Consultoría] Solicitud de Asesoría Técnica", en: "[Consulting] Technical Advisory Request" },
      consulting_body: { 
        es: "Hola equipo de Co.De Aerospace,\n\nMe gustaría solicitar una consultoría estratégica para el siguiente proyecto:\n\n[Describe tu proyecto aquí]\n\nSaludos.",
        en: "Hello Co.De Aerospace team,\n\nI would like to request a strategic consultancy for the following project:\n\n[Describe your project here]\n\nBest regards."
      },
      workshop_subject: { es: "[Capacitación] Interés en Taller: {name}", en: "[Training] Interest in Workshop: {name}" },
    }
  },

  // Vet Demo
  vetDemo: {
    header: {
      name: { en: 'VetCare Clinic', es: 'Clinica VetCare' },
      nav: {
        home: { en: 'Home', es: 'Inicio' },
        services: { en: 'Services', es: 'Servicios' },
        grooming: { en: 'Pet Grooming', es: 'Estetica Canina' },
        team: { en: 'Our Team', es: 'Nuestro Equipo' },
        testimonials: { en: 'Testimonials', es: 'Testimonios' },
        contact: { en: 'Contact', es: 'Contacto' },
      },
      powered: { en: 'Powered by Co.De MicroApps', es: 'Desarrollado por Co.De MicroApps' },
    },
    hero: {
      badge: { en: 'Veterinary Excellence', es: 'Excelencia Veterinaria' },
      title1: { en: 'Your Pet Deserves', es: 'Tu Mascota Merece' },
      title2: { en: 'The Best Care', es: 'El Mejor Cuidado' },
      subtitle: {
        en: 'Professional veterinary services with love and dedication. Over 10 years caring for your furry family members.',
        es: 'Servicios veterinarios profesionales con amor y dedicacion. Mas de 10 anos cuidando a los miembros peludos de tu familia.',
      },
      cta1: { en: 'Book Appointment', es: 'Agendar Cita' },
      cta2: { en: 'Our Services', es: 'Nuestros Servicios' },
      ctaWhatsApp: { en: 'Chat on WhatsApp', es: 'Chatea por WhatsApp' },
      emergency: { en: '24/7 Emergency', es: 'Emergencias 24/7' },
      emergencyPhone: { en: 'Call: (555) 123-4567', es: 'Llamar: (555) 123-4567' },
      stats: {
        s1: { en: '+5,000', es: '+5,000' },
        s1Label: { en: 'Happy Pets', es: 'Mascotas Felices' },
        s2: { en: '10+', es: '10+' },
        s2Label: { en: 'Years Experience', es: 'Anos de Experiencia' },
        s3: { en: '24/7', es: '24/7' },
        s3Label: { en: 'Emergency Care', es: 'Atencion de Emergencias' },
      },
    },
    whatsapp: {
      number: { en: '5215587341692', es: '5215587341692' },
      floatingLabel: { en: 'Need help? Chat with us', es: 'Necesitas ayuda? Escríbenos' },
      defaultMsg: { en: 'Hello! I would like information about your veterinary services.', es: 'Hola! Me gustaria informacion sobre sus servicios veterinarios.' },
      appointmentMsg: { en: 'Hello! I want to book a grooming appointment.', es: 'Hola! Quiero agendar una cita de estetica canina.' },
    },
    services: {
      badge: { en: 'What We Offer', es: 'Lo Que Ofrecemos' },
      title: { en: 'Our Services', es: 'Nuestros Servicios' },
      subtitle: {
        en: 'Complete veterinary care for dogs, cats, and small animals.',
        es: 'Cuidado veterinario completo para perros, gatos y animales pequenos.',
      },
      consult: {
        title: { en: 'General Consultation', es: 'Consulta General' },
        desc: { en: 'Complete health check-ups, diagnosis, and preventive care for your pet.', es: 'Chequeos de salud completos, diagnostico y cuidado preventivo para tu mascota.' },
      },
      vaccines: {
        title: { en: 'Vaccines & Prevention', es: 'Vacunas y Prevencion' },
        desc: { en: 'Complete vaccination programs and deworming for all ages.', es: 'Programas completos de vacunacion y desparasitacion para todas las edades.' },
      },
      surgery: {
        title: { en: 'Surgery', es: 'Cirugia' },
        desc: { en: 'Sterilization, soft tissue surgery, and orthopedic procedures.', es: 'Esterilizacion, cirugia de tejidos blandos y procedimientos ortopedicos.' },
      },
      dental: {
        title: { en: 'Dental Care', es: 'Cuidado Dental' },
        desc: { en: 'Professional dental cleaning, extractions, and oral health assessments.', es: 'Limpieza dental profesional, extracciones y evaluacion de salud oral.' },
      },
      grooming: {
        title: { en: 'Pet Grooming', es: 'Estetica Canina' },
        desc: { en: 'Professional bathing, haircuts, nail trimming, and spa treatments.', es: 'Bano profesional, corte de pelo, corte de unas y tratamientos de spa.' },
      },
      lab: {
        title: { en: 'Laboratory & Imaging', es: 'Laboratorio e Imagen' },
        desc: { en: 'Blood tests, X-rays, ultrasound, and rapid diagnostic testing.', es: 'Analisis de sangre, rayos X, ultrasonido y pruebas de diagnostico rapido.' },
      },
    },
    grooming: {
      badge: { en: 'Book Now', es: 'Reserva Ahora' },
      title: { en: 'Pet Grooming Studio', es: 'Estudio de Estetica Canina' },
      subtitle: {
        en: 'Give your pet the pampering they deserve. Book an appointment for our professional grooming services.',
        es: 'Dale a tu mascota el consentimiento que merece. Agenda una cita para nuestros servicios profesionales de estetica.',
      },
      form: {
        title: { en: 'Schedule Appointment', es: 'Agendar Cita' },
        step1: { en: 'Your Info', es: 'Tu Info' },
        step2: { en: 'Your Pet', es: 'Tu Mascota' },
        step3: { en: 'Service', es: 'Servicio' },
        step4: { en: 'Date & Time', es: 'Dia y Hora' },
        next: { en: 'Continue', es: 'Continuar' },
        back: { en: 'Back', es: 'Atras' },
        ownerName: { en: 'Owner Name', es: 'Nombre del Dueno' },
        ownerNamePh: { en: 'Your full name', es: 'Tu nombre completo' },
        email: { en: 'Email', es: 'Correo Electronico' },
        emailPh: { en: 'your@email.com', es: 'tu@correo.com' },
        phone: { en: 'Phone Number', es: 'Numero de Telefono' },
        phonePh: { en: '(555) 000-0000', es: '(555) 000-0000' },
        petName: { en: 'Pet Name', es: 'Nombre de la Mascota' },
        petNamePh: { en: "Your pet's name", es: 'Nombre de tu mascota' },
        petType: { en: 'Pet Type', es: 'Tipo de Mascota' },
        petTypeDog: { en: 'Dog', es: 'Perro' },
        petTypeCat: { en: 'Cat', es: 'Gato' },
        petTypeOther: { en: 'Other', es: 'Otro' },
        breed: { en: 'Breed', es: 'Raza' },
        breedPh: { en: 'e.g. Golden Retriever', es: 'ej. Golden Retriever' },
        size: { en: 'Size', es: 'Tamano' },
        sizeSmall: { en: 'Small (0-10kg)', es: 'Pequeno (0-10kg)' },
        sizeMedium: { en: 'Medium (10-25kg)', es: 'Mediano (10-25kg)' },
        sizeLarge: { en: 'Large (25kg+)', es: 'Grande (25kg+)' },
        service: { en: 'Grooming Service', es: 'Servicio de Estetica' },
        serviceBath: { en: 'Bath & Brush', es: 'Bano y Cepillado' },
        serviceBathPrice: { en: '$250 MXN', es: '$250 MXN' },
        serviceFull: { en: 'Full Grooming', es: 'Estetica Completa' },
        serviceFullPrice: { en: '$400 MXN', es: '$400 MXN' },
        serviceNails: { en: 'Nail Trim', es: 'Corte de Unas' },
        serviceNailsPrice: { en: '$100 MXN', es: '$100 MXN' },
        serviceSpa: { en: 'Spa Package', es: 'Paquete Spa' },
        serviceSpaPrice: { en: '$600 MXN', es: '$600 MXN' },
        date: { en: 'Preferred Date', es: 'Fecha Preferida' },
        time: { en: 'Preferred Time', es: 'Hora Preferida' },
        selectTime: { en: 'Select a time', es: 'Selecciona una hora' },
        notes: { en: 'Special Notes', es: 'Notas Especiales' },
        notesPh: { en: 'Allergies, special requests, etc.', es: 'Alergias, solicitudes especiales, etc.' },
        submit: { en: 'Confirm via WhatsApp', es: 'Confirmar por WhatsApp' },
        submitting: { en: 'Booking...', es: 'Agendando...' },
        success: { en: 'Appointment Booked!', es: 'Cita Agendada!' },
        successMsg: {
          en: 'Your appointment details have been sent via WhatsApp. We will confirm shortly!',
          es: 'Los detalles de tu cita han sido enviados por WhatsApp. Confirmaremos pronto!',
        },
        successNewAppt: { en: 'Book Another', es: 'Agendar Otra' },
        required: { en: 'This field is required', es: 'Este campo es requerido' },
        summary: { en: 'Appointment Summary', es: 'Resumen de la Cita' },
      },
      pricing: {
        title: { en: 'Grooming Prices', es: 'Precios de Estetica' },
        bath: { en: 'Bath & Brush', es: 'Bano y Cepillado' },
        bathPrice: { en: 'From $250 MXN', es: 'Desde $250 MXN' },
        full: { en: 'Full Grooming', es: 'Estetica Completa' },
        fullPrice: { en: 'From $400 MXN', es: 'Desde $400 MXN' },
        nails: { en: 'Nail Trim', es: 'Corte de Unas' },
        nailsPrice: { en: '$100 MXN', es: '$100 MXN' },
        spa: { en: 'Spa Package', es: 'Paquete Spa' },
        spaPrice: { en: 'From $600 MXN', es: 'Desde $600 MXN' },
      },
    },
    team: {
      badge: { en: 'Meet Our Team', es: 'Conoce a Nuestro Equipo' },
      title: { en: 'Expert Veterinarians', es: 'Veterinarios Expertos' },
      subtitle: {
        en: 'Our team of certified professionals is dedicated to providing the highest quality care.',
        es: 'Nuestro equipo de profesionales certificados esta dedicado a brindar la mas alta calidad de atencion.',
      },
      doc1: {
        name: { en: 'Dr. Maria Garcia', es: 'Dra. Maria Garcia' },
        role: { en: 'General Director & Surgeon', es: 'Directora General y Cirujana' },
        desc: { en: '15 years of experience in small animal medicine and surgery.', es: '15 anos de experiencia en medicina y cirugia de pequenas especies.' },
      },
      doc2: {
        name: { en: 'Dr. Carlos Lopez', es: 'Dr. Carlos Lopez' },
        role: { en: 'Internal Medicine Specialist', es: 'Especialista en Medicina Interna' },
        desc: { en: 'Specialist in diagnostic imaging and internal medicine.', es: 'Especialista en imagenologia diagnostica y medicina interna.' },
      },
      doc3: {
        name: { en: 'Dr. Ana Martinez', es: 'Dra. Ana Martinez' },
        role: { en: 'Veterinary Dentist', es: 'Dentista Veterinaria' },
        desc: { en: 'Certified in veterinary dental care and oral surgery.', es: 'Certificada en cuidado dental veterinario y cirugia oral.' },
      },
    },
    testimonials: {
      badge: { en: 'Happy Clients', es: 'Clientes Felices' },
      title: { en: 'What Pet Owners Say', es: 'Lo Que Dicen los Duenos' },
      t1: {
        text: { en: "Dr. Garcia saved my dog's life after an emergency. I will be forever grateful. The best clinic in the city!", es: 'La Dra. Garcia salvo la vida de mi perro despues de una emergencia. Estare eternamente agradecido. La mejor clinica de la ciudad!' },
        name: { en: 'Roberto S.', es: 'Roberto S.' },
        pet: { en: 'Owner of Max (Labrador)', es: 'Dueno de Max (Labrador)' },
      },
      t2: {
        text: { en: 'The grooming service is amazing. My cat Luna always comes back looking beautiful and happy.', es: 'El servicio de estetica es increible. Mi gata Luna siempre regresa viendose hermosa y feliz.' },
        name: { en: 'Patricia M.', es: 'Patricia M.' },
        pet: { en: 'Owner of Luna (Persian Cat)', es: 'Duena de Luna (Gato Persa)' },
      },
      t3: {
        text: { en: 'Very professional and caring staff. They always explain everything clearly and the prices are fair.', es: 'Personal muy profesional y carinoso. Siempre explican todo claramente y los precios son justos.' },
        name: { en: 'Miguel A.', es: 'Miguel A.' },
        pet: { en: 'Owner of Rocky (Schnauzer)', es: 'Dueno de Rocky (Schnauzer)' },
      },
    },
    contact: {
      badge: { en: 'Get in Touch', es: 'Contactanos' },
      title: { en: 'Visit Us', es: 'Visitanos' },
      address: { en: 'Av. Reforma 123, Col. Centro, Mexico City', es: 'Av. Reforma 123, Col. Centro, Ciudad de Mexico' },
      phone: { en: 'Phone: (555) 123-4567', es: 'Telefono: (555) 123-4567' },
      email: { en: 'Email: info@vetcare-clinic.com', es: 'Correo: info@vetcare-clinic.com' },
      hours: { en: 'Hours', es: 'Horario' },
      weekdays: { en: 'Mon - Fri: 8:00 AM - 8:00 PM', es: 'Lun - Vie: 8:00 AM - 8:00 PM' },
      saturday: { en: 'Saturday: 9:00 AM - 3:00 PM', es: 'Sabado: 9:00 AM - 3:00 PM' },
      sunday: { en: 'Sunday: Emergencies Only', es: 'Domingo: Solo Emergencias' },
      emergency: { en: '24/7 Emergency Line', es: 'Linea de Emergencias 24/7' },
      emergencyPhone: { en: '(555) 123-4568', es: '(555) 123-4568' },
      whatsapp: { en: 'WhatsApp', es: 'WhatsApp' },
      whatsappDesc: { en: 'Chat with us instantly', es: 'Chatea con nosotros al instante' },
    },
    footer: {
      rights: { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
      powered: { en: 'Website built by', es: 'Sitio web desarrollado por' },
      backToMain: { en: 'View MicroApps Plans', es: 'Ver Planes MicroApps' },
    },
    demoBadge: {
      label: { en: 'DEMO', es: 'DEMO' },
      tooltip: { en: 'This is a demonstration website built with Co.De MicroApps', es: 'Este es un sitio web de demostracion construido con Co.De MicroApps' },
    },
  },

  // Pharmacy Demo
  pharmDemo: {
    header: {
      name: { en: 'FarmaVida', es: 'FarmaVida' },
      nav: {
        home: { en: 'Home', es: 'Inicio' },
        services: { en: 'Services', es: 'Servicios' },
        products: { en: 'Order Now', es: 'Pedir Ahora' },
        team: { en: 'Our Team', es: 'Nuestro Equipo' },
        testimonials: { en: 'Testimonials', es: 'Testimonios' },
        contact: { en: 'Contact', es: 'Contacto' },
      },
      powered: { en: 'Powered by Co.De MicroApps', es: 'Desarrollado por Co.De MicroApps' },
    },
    hero: {
      badge: { en: 'Your Health First', es: 'Tu Salud Primero' },
      title1: { en: 'Your Trusted', es: 'Tu Farmacia' },
      title2: { en: 'Neighborhood Pharmacy', es: 'de Confianza' },
      subtitle: {
        en: 'Quality medications, personalized attention, and home delivery. Over 15 years caring for your family\'s health.',
        es: 'Medicamentos de calidad, atencion personalizada y envio a domicilio. Mas de 15 anos cuidando la salud de tu familia.',
      },
      cta1: { en: 'Order Now', es: 'Pedir Ahora' },
      cta2: { en: 'Our Services', es: 'Nuestros Servicios' },
      ctaWhatsApp: { en: 'Chat on WhatsApp', es: 'Chatea por WhatsApp' },
      delivery: { en: 'Free Home Delivery', es: 'Envio a Domicilio Gratis' },
      deliveryPhone: { en: 'Orders over $500 MXN', es: 'En pedidos mayores a $500 MXN' },
      stats: {
        s1: { en: '+10,000', es: '+10,000' },
        s1Label: { en: 'Happy Customers', es: 'Clientes Satisfechos' },
        s2: { en: '15+', es: '15+' },
        s2Label: { en: 'Years of Service', es: 'Anos de Servicio' },
        s3: { en: '24/7', es: '24/7' },
        s3Label: { en: 'Delivery Available', es: 'Envio Disponible' },
      },
    },
    whatsapp: {
      number: { en: '5215587341692', es: '5215587341692' },
      floatingLabel: { en: 'Need medicine? Order now!', es: 'Necesitas medicamento? Pidelo ahora!' },
      defaultMsg: { en: 'Hello! I would like to place an order at your pharmacy.', es: 'Hola! Me gustaria hacer un pedido en su farmacia.' },
    },
    services: {
      badge: { en: 'What We Offer', es: 'Lo Que Ofrecemos' },
      title: { en: 'Our Services', es: 'Nuestros Servicios' },
      subtitle: {
        en: 'Complete pharmaceutical care for you and your family.',
        es: 'Cuidado farmaceutico completo para ti y tu familia.',
      },
      prescriptions: {
        title: { en: 'Prescription Drugs', es: 'Medicamentos con Receta' },
        desc: { en: 'Full range of prescription medications with professional pharmacist guidance and dosage advice.', es: 'Amplia gama de medicamentos con receta con orientacion profesional del farmaceutico y consejos de dosificacion.' },
      },
      otc: {
        title: { en: 'Over-the-Counter', es: 'Medicamentos de Libre Venta' },
        desc: { en: 'Pain relievers, cold remedies, vitamins, and everyday health essentials without a prescription.', es: 'Analgesicos, remedios para el resfriado, vitaminas y esenciales de salud diaria sin receta.' },
      },
      health: {
        title: { en: 'Health Screenings', es: 'Chequeos de Salud' },
        desc: { en: 'Blood pressure monitoring, glucose testing, and basic health assessments at your convenience.', es: 'Monitoreo de presion arterial, pruebas de glucosa y evaluaciones basicas de salud para tu comodidad.' },
      },
      baby: {
        title: { en: 'Baby & Maternity', es: 'Bebe y Maternidad' },
        desc: { en: 'Baby formula, diapers, maternity vitamins, and all essentials for new parents.', es: 'Formula para bebe, panales, vitaminas prenatales y todo lo esencial para nuevos padres.' },
      },
      delivery: {
        title: { en: 'Home Delivery', es: 'Envio a Domicilio' },
        desc: { en: 'Fast and reliable delivery to your doorstep. Free on orders over $500 MXN.', es: 'Envio rapido y confiable a tu puerta. Gratis en pedidos mayores a $500 MXN.' },
      },
      lab: {
        title: { en: 'Lab & Diagnostics', es: 'Laboratorio y Diagnostico' },
        desc: { en: 'Rapid COVID tests, pregnancy tests, and other diagnostic tools available in-store.', es: 'Pruebas rapidas de COVID, pruebas de embarazo y otras herramientas de diagnostico disponibles en tienda.' },
      },
    },
    products: {
      badge: { en: 'Order Online', es: 'Pide en Linea' },
      title: { en: 'Your Order in 5 Easy Steps', es: 'Tu Pedido en 5 Simples Pasos' },
      subtitle: {
        en: 'Order your medications and health products quickly. We deliver to your door or prepare them for pickup.',
        es: 'Pide tus medicamentos y productos de salud rapidamente. Los enviamos a tu puerta o los preparamos para recoger.',
      },
      categories: {
        title: { en: 'Product Categories', es: 'Categorias de Productos' },
        medicines: { en: 'Medicines', es: 'Medicamentos' },
        medicinesPrice: { en: 'Prescription & OTC', es: 'Con y sin receta' },
        vitamins: { en: 'Vitamins & Supplements', es: 'Vitaminas y Suplementos' },
        vitaminsPrice: { en: 'From $80 MXN', es: 'Desde $80 MXN' },
        personal: { en: 'Personal Care', es: 'Cuidado Personal' },
        personalPrice: { en: 'From $50 MXN', es: 'Desde $50 MXN' },
        medical: { en: 'Medical Supplies', es: 'Material Medico' },
        medicalPrice: { en: 'From $30 MXN', es: 'Desde $30 MXN' },
      },
      form: {
        title: { en: 'Place Your Order', es: 'Haz Tu Pedido' },
        step1: { en: 'Your Info', es: 'Tu Info' },
        step2: { en: 'Order Type', es: 'Tipo' },
        step3: { en: 'Products', es: 'Productos' },
        step4: { en: 'Delivery', es: 'Entrega' },
        step5: { en: 'Confirm', es: 'Confirmar' },
        next: { en: 'Continue', es: 'Continuar' },
        back: { en: 'Back', es: 'Atras' },
        customerName: { en: 'Full Name', es: 'Nombre Completo' },
        customerNamePh: { en: 'Your full name', es: 'Tu nombre completo' },
        email: { en: 'Email', es: 'Correo Electronico' },
        emailPh: { en: 'your@email.com', es: 'tu@correo.com' },
        phone: { en: 'Phone Number', es: 'Numero de Telefono' },
        phonePh: { en: '(555) 000-0000', es: '(555) 000-0000' },
        orderType: { en: 'Order Type', es: 'Tipo de Pedido' },
        orderPrescription: { en: 'Prescription', es: 'Con Receta' },
        orderOtc: { en: 'Over-the-Counter', es: 'Sin Receta' },
        orderBoth: { en: 'Both', es: 'Ambos' },
        prescriptionDesc: { en: 'Prescription Details', es: 'Detalles de la Receta' },
        prescriptionDescPh: { en: 'Describe the medications on your prescription...', es: 'Describe los medicamentos de tu receta...' },
        productCategory: { en: 'Product Category', es: 'Categoria de Producto' },
        productOtc: { en: 'Medicines', es: 'Medicamentos' },
        productOtcPrice: { en: 'Prescription & OTC drugs', es: 'Con y sin receta' },
        productPrescription: { en: 'Vitamins & Supplements', es: 'Vitaminas y Suplementos' },
        productPrescriptionPrice: { en: 'Health & wellness', es: 'Salud y bienestar' },
        productVitamins: { en: 'Personal Care', es: 'Cuidado Personal' },
        productVitaminsPrice: { en: 'Hygiene & beauty', es: 'Higiene y belleza' },
        productPersonal: { en: 'Medical Supplies', es: 'Material Medico' },
        productPersonalPrice: { en: 'First aid & supplies', es: 'Primeros auxilios y material' },
        productDetails: { en: 'Product Details', es: 'Detalles del Producto' },
        productDetailsPh: { en: 'List specific products you need...', es: 'Lista los productos especificos que necesitas...' },
        deliveryMethod: { en: 'Delivery Method', es: 'Metodo de Entrega' },
        deliveryPickup: { en: 'Store Pickup', es: 'Recoger en Tienda' },
        deliveryHome: { en: 'Home Delivery', es: 'Envio a Domicilio' },
        address: { en: 'Delivery Address', es: 'Direccion de Entrega' },
        addressPh: { en: 'Street, number, neighborhood, zip code...', es: 'Calle, numero, colonia, codigo postal...' },
        date: { en: 'Preferred Date', es: 'Fecha Preferida' },
        time: { en: 'Preferred Time', es: 'Hora Preferida' },
        selectTime: { en: 'Select a time', es: 'Selecciona una hora' },
        summary: { en: 'Order Summary', es: 'Resumen del Pedido' },
        submit: { en: 'Confirm via WhatsApp', es: 'Confirmar por WhatsApp' },
        success: { en: 'Order Placed!', es: 'Pedido Realizado!' },
        successMsg: {
          en: 'Your order details have been sent via WhatsApp. We will confirm shortly!',
          es: 'Los detalles de tu pedido han sido enviados por WhatsApp. Confirmaremos pronto!',
        },
        successNewOrder: { en: 'Place Another Order', es: 'Hacer Otro Pedido' },
        required: { en: 'This field is required', es: 'Este campo es requerido' },
      },
    },
    team: {
      badge: { en: 'Meet Our Team', es: 'Conoce a Nuestro Equipo' },
      title: { en: 'Expert Pharmacists', es: 'Farmaceuticos Expertos' },
      subtitle: {
        en: 'Our team of licensed pharmacists is dedicated to providing personalized pharmaceutical care.',
        es: 'Nuestro equipo de farmaceuticos licenciados esta dedicado a brindar atencion farmaceutica personalizada.',
      },
      pharm1: {
        name: { en: 'Lic. Rosa Lopez', es: 'Lic. Rosa Lopez' },
        role: { en: 'Head Pharmacist', es: 'Farmaceutica en Jefe' },
        desc: { en: '18 years of experience in pharmaceutical care and medication management.', es: '18 anos de experiencia en atencion farmaceutica y manejo de medicamentos.' },
      },
      pharm2: {
        name: { en: 'Lic. Sofia Morales', es: 'Lic. Sofia Morales' },
        role: { en: 'Clinical Pharmacist', es: 'Farmaceutica Clinica' },
        desc: { en: 'Specialist in drug interactions and personalized medication therapy.', es: 'Especialista en interacciones medicamentosas y terapia personalizada.' },
      },
      pharm3: {
        name: { en: 'Lic. Jorge Perez', es: 'Lic. Jorge Perez' },
        role: { en: 'Pharmaceutical Consultant', es: 'Consultor Farmaceutico' },
        desc: { en: 'Expert in nutrition supplements and dermocosmetics for skin care.', es: 'Experto en suplementos nutricionales y dermocosmeticos para el cuidado de la piel.' },
      },
    },
    testimonials: {
      badge: { en: 'Happy Customers', es: 'Clientes Satisfechos' },
      title: { en: 'What Our Customers Say', es: 'Lo Que Dicen Nuestros Clientes' },
      t1: {
        text: { en: 'FarmaVida always has what I need and the pharmacists are incredibly helpful. Best pharmacy in the neighborhood!', es: 'FarmaVida siempre tiene lo que necesito y los farmaceuticos son increiblemente serviciales. La mejor farmacia del barrio!' },
        name: { en: 'Laura G.', es: 'Laura G.' },
        detail: { en: 'Regular customer for 5 years', es: 'Cliente regular por 5 anos' },
      },
      t2: {
        text: { en: 'The home delivery service is a lifesaver. I ordered my mom\'s medications and they arrived in less than an hour.', es: 'El servicio de envio a domicilio es una salvacion. Pedi los medicamentos de mi mama y llegaron en menos de una hora.' },
        name: { en: 'Carlos R.', es: 'Carlos R.' },
        detail: { en: 'Home delivery customer', es: 'Cliente de envio a domicilio' },
      },
      t3: {
        text: { en: 'Great prices and the health screenings are very convenient. They take the time to explain everything about my medications.', es: 'Excelentes precios y los chequeos de salud son muy convenientes. Se toman el tiempo de explicar todo sobre mis medicamentos.' },
        name: { en: 'Maria H.', es: 'Maria H.' },
        detail: { en: 'Monthly health screening', es: 'Chequeo de salud mensual' },
      },
    },
    contact: {
      badge: { en: 'Visit Us', es: 'Visitanos' },
      title: { en: 'Find Us', es: 'Encuentranos' },
      address: { en: 'Av. Insurgentes Sur 456, Col. Roma, Mexico City', es: 'Av. Insurgentes Sur 456, Col. Roma, Ciudad de Mexico' },
      phone: { en: 'Phone: (555) 987-6543', es: 'Telefono: (555) 987-6543' },
      email: { en: 'Email: info@farmavida.com', es: 'Correo: info@farmavida.com' },
      hours: { en: 'Hours', es: 'Horario' },
      weekdays: { en: 'Mon - Fri: 7:00 AM - 10:00 PM', es: 'Lun - Vie: 7:00 AM - 10:00 PM' },
      saturday: { en: 'Saturday: 8:00 AM - 9:00 PM', es: 'Sabado: 8:00 AM - 9:00 PM' },
      sunday: { en: 'Sunday: 9:00 AM - 4:00 PM', es: 'Domingo: 9:00 AM - 4:00 PM' },
      whatsapp: { en: 'WhatsApp', es: 'WhatsApp' },
      whatsappDesc: { en: 'Order directly via chat', es: 'Pide directamente por chat' },
      deliveryBanner: { en: 'Free Home Delivery', es: 'Envio a Domicilio Gratis' },
      deliveryBannerDesc: { en: 'On orders over $500 MXN within 5km radius', es: 'En pedidos mayores a $500 MXN en un radio de 5km' },
      deliveryBannerTag: { en: 'Active', es: 'Activo' },
    },
    footer: {
      rights: { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
      powered: { en: 'Website built by', es: 'Sitio web desarrollado por' },
      backToMain: { en: 'View MicroApps Plans', es: 'Ver Planes MicroApps' },
    },
    demoBadge: {
      label: { en: 'DEMO', es: 'DEMO' },
      tooltip: { en: 'This is a demonstration website built with Co.De MicroApps', es: 'Este es un sitio web de demostracion construido con Co.De MicroApps' },
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('codeaerospace_lang') || 'es';
  });

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'es' : 'en';
      localStorage.setItem('codeaerospace_lang', next);
      return next;
    });
  }, []);

  const t = useCallback((path) => {
    const keys = path.split('.');
    let obj = translations;
    for (const key of keys) {
      obj = obj?.[key];
      if (!obj) return path;
    }
    return obj[lang] || obj.en || path;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
