import React, { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

const translations = {
  // Header / Nav
  nav: {
    home: { en: 'Home', es: 'Inicio' },
    leadership: { en: 'Leadership', es: 'Liderazgo' },
    services: { en: 'Services', es: 'Servicios' },
    wrc2027: { en: 'WRC-2027', es: 'WRC-2027' },
    microapps: { en: 'MicroApps', es: 'MicroApps' },
    contact: { en: 'Contact', es: 'Contacto' },
  },

  // Hero
  hero: {
    badge: { en: 'Advanced Space Systems for NGSO', es: 'Sistemas Espaciales Avanzados para NGSO' },
    subtitle: { en: 'Research-Driven Engineering for the', es: 'Ingenieria Impulsada por la Investigacion para la' },
    subtitleHighlight: { en: 'NewSpace Economy', es: 'Economia NewSpace' },
    cta1: { en: 'Explore Solutions', es: 'Explorar Soluciones' },
    cta2: { en: 'Contact Us', es: 'Contactanos' },
  },

  // Leadership
  leadership: {
    title1: { en: 'Technical', es: 'Liderazgo' },
    title2: { en: 'Leadership', es: 'Tecnico' },
    subtitle: { en: 'Guiding the future of aerospace engineering with precision and vision.', es: 'Guiando el futuro de la ingenieria aeroespacial con precision y vision.' },
    viewCv: { en: '[ View Full CV ]', es: '[ Ver CV Completo ]' },
    clickCv: { en: 'Click to view CV', es: 'Clic para ver CV' },
  },

  // CV Modal
  cv: {
    education: { en: 'Education', es: 'Educacion' },
    experience: { en: 'Experience', es: 'Experiencia' },
    skills: { en: 'Key Skills', es: 'Habilidades Clave' },
    contact: { en: 'Contact', es: 'Contacto' },
    close: { en: 'Close', es: 'Cerrar' },
  },

  // Services
  services: {
    title1: { en: 'Technical', es: 'Servicios' },
    title2: { en: 'Services', es: 'Tecnicos' },
    subtitle: { en: 'Engineering solutions designed for the rigors of the space environment.', es: 'Soluciones de ingenieria disenadas para las exigencias del entorno espacial.' },
    learnMore: { en: 'Learn More', es: 'Saber Mas' },
    gs: {
      title: { en: 'Ground Station GS-SW', es: 'Estacion Terrena GS-SW' },
      desc: { en: 'Automation of tracking using SGP4/SDP4 models and real-time Doppler compensation for precise satellite communication links.', es: 'Automatizacion de rastreo usando modelos SGP4/SDP4 y compensacion Doppler en tiempo real para enlaces de comunicacion satelital precisos.' },
    },
    ngso: {
      title: { en: 'NGSO Communications', es: 'Comunicaciones NGSO' },
      desc: { en: 'Advanced modeling for interference mitigation, spectrum coexistence, and frequency allocation optimization for non-geostationary orbits.', es: 'Modelado avanzado para mitigacion de interferencia, coexistencia espectral y optimizacion de asignacion de frecuencias para orbitas no geoestacionarias.' },
    },
    cyber: {
      title: { en: 'Space Cybersecurity', es: 'Ciberseguridad Espacial' },
      desc: { en: '"Security by Design" implementation featuring AES-256 encryption for data-links and secure telecommand (TC) authentication protocols.', es: 'Implementacion de "Seguridad por Diseno" con cifrado AES-256 para enlaces de datos y protocolos seguros de autenticacion de telecomandos (TC).' },
    },
    analytics: {
      title: { en: 'Mission-Critical Analytics', es: 'Analitica de Mision Critica' },
      desc: { en: 'Processing of complex telemetry for satellite health monitoring, payload status verification, and predictive anomaly detection.', es: 'Procesamiento de telemetria compleja para monitoreo de salud satelital, verificacion de estado de carga util y deteccion predictiva de anomalias.' },
    },
    consulting: {
      title: { en: 'Orbital Consulting', es: 'Consultoria Orbital' },
      desc: { en: 'Strategic planning for technical sovereignty, regulatory intelligence, and roadmap development for the emerging NewSpace economy.', es: 'Planificacion estrategica para soberania tecnologica, inteligencia regulatoria y desarrollo de hojas de ruta para la economia NewSpace emergente.' },
    },
  },

  // WRC-2027
  wrc: {
    title1: { en: 'Strategic Support for', es: 'Apoyo Estrategico para' },
    title2: { en: 'ITU WRC-2027', es: 'UIT WRC-2027' },
    subtitle: { en: 'As the global inflection point for orbital frequency bands approaches, we empower nations and organizations to achieve', es: 'A medida que se acerca el punto de inflexion global para las bandas de frecuencia orbital, empoderamos a naciones y organizaciones para lograr' },
    sovereignty: { en: 'Technological Sovereignty', es: 'Soberania Tecnologica' },
    while: { en: 'while ensuring', es: 'mientras aseguramos la' },
    coexistence: { en: 'Spectrum Coexistence', es: 'Coexistencia Espectral' },
    interference: {
      title: { en: 'Interference Mitigation', es: 'Mitigacion de Interferencia' },
      desc: { en: 'Advanced modeling for NGSO constellations, ensuring compliance with ITU equivalent power flux-density (epfd) limits to protect GSO networks.', es: 'Modelado avanzado para constelaciones NGSO, asegurando cumplimiento con los limites de densidad de flujo de potencia equivalente (epfd) de la UIT para proteger redes GSO.' },
    },
    spectrum: {
      title: { en: 'Spectrum Consultancy', es: 'Consultoria Espectral' },
      desc: { en: 'Strategic technical consultancy for radio-frequency allocation, navigating the complex regulatory landscape of international compliance.', es: 'Consultoria tecnica estrategica para asignacion de radiofrecuencias, navegando el complejo panorama regulatorio de cumplimiento internacional.' },
    },
    payload: {
      title: { en: 'Next-Gen Payload R&D', es: 'I+D de Carga Util de Nueva Generacion' },
      desc: { en: 'Research and development of adaptive payloads designed for orbital assets, maximizing spectral efficiency in crowded LEO environments.', es: 'Investigacion y desarrollo de cargas utiles adaptativas disenadas para activos orbitales, maximizando la eficiencia espectral en ambientes LEO congestionados.' },
    },
    ituBadge: { en: 'Official ITU WRC-27 Resource', es: 'Recurso Oficial UIT WRC-27' },
    ituTitle: { en: 'Global Regulatory Portal: WRC-27', es: 'Portal Regulatorio Global: WRC-27' },
    ituDesc: { en: 'Access official resources for the World Radiocommunication Conference 2027 to stay informed on the future of global orbital frequency bands.', es: 'Accede a los recursos oficiales de la Conferencia Mundial de Radiocomunicaciones 2027 para mantenerte informado sobre el futuro de las bandas de frecuencia orbital globales.' },
    ituBtn: { en: 'Access ITU Portal', es: 'Acceder al Portal UIT' },
  },

  // Triple Helix
  helix: {
    badge: { en: 'Operational Model', es: 'Modelo Operativo' },
    title1: { en: 'Innovation Ecosystem: The', es: 'Ecosistema de Innovacion: La' },
    title2: { en: 'Triple Helix', es: 'Triple Helice' },
    subtitle: { en: 'Co.De Aerospace operates at the intersection of critical sectors, leveraging a synergistic model to accelerate space technology readiness.', es: 'Co.De Aerospace opera en la interseccion de sectores criticos, aprovechando un modelo sinergico para acelerar la madurez tecnologica espacial.' },
    gov: {
      title: { en: 'Government & Regulatory', es: 'Gobierno y Regulacion' },
      role: { en: 'Policy & Compliance', es: 'Politica y Cumplimiento' },
      desc: { en: 'Providing technical support for national frequency planning and comprehensive spectrum management reports to ensure sovereignty and international alignment.', es: 'Brindando soporte tecnico para la planificacion de frecuencias nacionales y reportes integrales de gestion espectral para asegurar soberania y alineacion internacional.' },
    },
    industry: {
      title: { en: 'Industry I+D', es: 'Industria I+D' },
      role: { en: 'Applied Engineering', es: 'Ingenieria Aplicada' },
      desc: { en: 'Development of functional prototypes, control algorithms, and ground station architectures driving the new Non-Geostationary (NGSO) economy.', es: 'Desarrollo de prototipos funcionales, algoritmos de control y arquitecturas de estaciones terrenas impulsando la nueva economia no geoestacionaria (NGSO).' },
    },
    academic: {
      title: { en: 'Academic Frontier', es: 'Frontera Academica' },
      role: { en: 'Research & Talent', es: 'Investigacion y Talento' },
      desc: { en: 'Fostering high-level talent pipelines and supporting advanced satellite communication research to push the boundaries of what is possible in LEO.', es: 'Fomentando canales de talento de alto nivel y apoyando investigacion avanzada en comunicaciones satelitales para ampliar los limites de lo posible en LEO.' },
    },
  },

  // Contact
  contact: {
    title1: { en: 'Partner With', es: 'Colabora Con' },
    subtitle: { en: "Ready to collaborate on your next mission? Share your requirements and let's engineer the future together.", es: 'Listo para colaborar en tu proxima mision? Comparte tus requerimientos y diseñemos el futuro juntos.' },
    orgName: { en: 'Organization Name *', es: 'Nombre de la Organizacion *' },
    orgPlaceholder: { en: 'Your Organization', es: 'Tu Organizacion' },
    email: { en: 'Contact Email *', es: 'Correo de Contacto *' },
    serviceInterest: { en: 'Service Interest *', es: 'Servicio de Interes *' },
    selectService: { en: 'Select a service', es: 'Selecciona un servicio' },
    message: { en: 'Message *', es: 'Mensaje *' },
    messagePlaceholder: { en: 'Tell us about your project requirements...', es: 'Cuentanos sobre los requerimientos de tu proyecto...' },
    submit: { en: 'Submit Inquiry', es: 'Enviar Consulta' },
    submitting: { en: 'Opening Email Client...', es: 'Abriendo Cliente de Correo...' },
    emailNote: { en: 'This will open your default email client with the inquiry details pre-filled.', es: 'Esto abrira tu cliente de correo predeterminado con los detalles de la consulta pre-llenados.' },
    thankYou: { en: 'Thank You!', es: 'Gracias!' },
    thankYouMsg: { en: 'Your email client has been opened. Please send the email to complete your inquiry. We\'ll get back to you as soon as possible.', es: 'Tu cliente de correo ha sido abierto. Por favor envia el email para completar tu consulta. Te responderemos lo antes posible.' },
    errors: {
      orgRequired: { en: 'Organization name is required', es: 'El nombre de la organizacion es requerido' },
      emailRequired: { en: 'Email is required', es: 'El correo es requerido' },
      emailInvalid: { en: 'Please enter a valid email address', es: 'Por favor ingresa un correo valido' },
      serviceRequired: { en: 'Please select a service interest', es: 'Por favor selecciona un servicio de interes' },
      messageRequired: { en: 'Message is required', es: 'El mensaje es requerido' },
      messageMin: { en: 'Message must be at least 10 characters', es: 'El mensaje debe tener al menos 10 caracteres' },
      validation: { en: 'Validation Error', es: 'Error de Validacion' },
      validationDesc: { en: 'Please correct the errors in the form', es: 'Por favor corrige los errores en el formulario' },
    },
    emailOpened: { en: 'Email Client Opened', es: 'Cliente de Correo Abierto' },
    emailOpenedDesc: { en: 'Your default email client has been opened with the inquiry details. Please send the email to complete your submission.', es: 'Tu cliente de correo predeterminado ha sido abierto con los detalles de la consulta. Por favor envia el email para completar tu envio.' },
  },

  // Footer
  footer: {
    tagline: { en: 'Research-Driven Engineering for the NewSpace Economy.', es: 'Ingenieria Impulsada por la Investigacion para la Economia NewSpace.' },
    services: { en: 'Services', es: 'Servicios' },
    groundStations: { en: 'Ground Stations', es: 'Estaciones Terrenas' },
    cybersecurity: { en: 'Cybersecurity', es: 'Ciberseguridad' },
    missionAnalytics: { en: 'Mission Analytics', es: 'Analitica de Mision' },
    orbitalConsulting: { en: 'Orbital Consulting', es: 'Consultoria Orbital' },
    company: { en: 'Company', es: 'Empresa' },
    methodology: { en: 'Methodology', es: 'Metodologia' },
    resources: { en: 'Resources', es: 'Recursos' },
    rights: { en: 'All rights reserved.', es: 'Todos los derechos reservados.' },
    privacy: { en: 'Privacy Policy', es: 'Politica de Privacidad' },
    terms: { en: 'Terms of Service', es: 'Terminos de Servicio' },
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
    badge: { en: 'Digital Solutions for SMBs', es: 'Soluciones Digitales para MicroNegocios' },
    title1: { en: 'Your Business', es: 'Tu Negocio' },
    title2: { en: 'Online in 5 Steps', es: 'En Línea en 5 Pasos' },
    subtitle: {
      en: 'Fast, affordable, and custom-built web apps for stores, pharmacies, stationeries, and any small business in Mexico.',
      es: 'Apps web rápidas, accesibles y a la medida para tiendas, farmacias, papelerías y cualquier micronegocio en México.',
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
        en: 'Continuous monthly maintenance, updates, hosting, and technical support included.',
        es: 'Mantenimiento mensual continuo, actualizaciones, hosting y soporte técnico incluido.',
      },
    },
    packages: { en: 'Packages', es: 'Paquetes' },
    monthly: { en: '/mo', es: '/mes' },
    oneTime: { en: 'one-time', es: 'único pago' },
    maintenance: { en: 'Monthly Maintenance', es: 'Mantenimiento Mensual' },
    maintenanceDesc: {
      en: 'Hosting, domain, updates, backups, and technical support.',
      es: 'Hosting, dominio, actualizaciones, respaldos y soporte técnico.',
    },
    popular: { en: 'Most Popular', es: 'Más Popular' },
    cta: { en: 'Get Started', es: 'Comenzar' },
    basic: {
      name: { en: 'Starter', es: 'Básico' },
      price: { en: '$1,500', es: '$1,500' },
      f1: { en: 'Product/service catalog', es: 'Catálogo de productos/servicios' },
      f2: { en: 'Business info page', es: 'Página informativa del negocio' },
      f3: { en: 'WhatsApp contact button', es: 'Botón de contacto por WhatsApp' },
      f4: { en: 'Mobile responsive design', es: 'Diseño adaptable a celular' },
      f5: { en: 'Google Maps integration', es: 'Integración con Google Maps' },
    },
    pro: {
      name: { en: 'Professional', es: 'Profesional' },
      price: { en: '$2,000', es: '$2,000' },
      f1: { en: 'Everything in Starter', es: 'Todo lo del Básico' },
      f2: { en: 'Inventory management', es: 'Control de inventario' },
      f3: { en: 'Sales & expense tracking', es: 'Registro de ventas y gastos' },
      f4: { en: 'Basic reports & analytics', es: 'Reportes y estadísticas básicas' },
      f5: { en: 'Customer database', es: 'Base de datos de clientes' },
    },
    premium: {
      name: { en: 'Premium', es: 'Premium' },
      price: { en: '$3,000', es: '$3,000' },
      f1: { en: 'Everything in Professional', es: 'Todo lo del Profesional' },
      f2: { en: 'IoT device integration', es: 'Integración con dispositivos IoT' },
      f3: { en: 'Attendance & shift control', es: 'Control de asistencia y turnos' },
      f4: { en: 'Multi-branch support', es: 'Soporte multi-sucursal' },
      f5: { en: 'Advanced dashboards', es: 'Dashboards avanzados' },
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('codeaerospace_lang') || 'en';
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
