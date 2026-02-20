import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {
  openDatabase,
  upsertLeadershipProfile,
  upsertMediaAsset,
  attachProfileImage,
  DB_PATH,
} from './db.js';
import { connectRedis, delCache } from './redis.js';

const leadershipProfiles = [
  {
    slug: 'yuritzi-elena-ordaz-huerta',
    sortOrder: 1,
    iconKey: 'satellite',
    initials: 'YO',
    name: 'Ing. Yuritzi Elena Ordaz Huerta',
    title: {
      en: 'Mechatronics Engineer and AI Researcher',
      es: 'Ingeniera Mecatronica e Investigadora en IA',
    },
    role: {
      en: 'Aerospace research, robotics systems, and technical education',
      es: 'Investigacion aeroespacial, sistemas roboticos y docencia tecnica',
    },
    description: {
      en: [
        'Lead researcher in robotics and satellite communication control systems',
        'Local Lead for NASA Space Apps Challenge Veracruz 2024',
        'Instructor in materials strength for aerospace student teams',
      ],
      es: [
        'Investigadora en arquitectura robotica y control de comunicaciones satelitales',
        'Local Lead del NASA Space Apps Challenge Veracruz 2024',
        'Instructora de Resistencia de Materiales para equipos aeroespaciales',
      ],
    },
    bio: {
      en: 'Mechatronics engineer with aerospace research and teaching experience. Focused on robotics architecture, structural analysis, and AI/cloud workflows for engineering teams.',
      es: 'Ingeniera mecatronica con experiencia en investigacion aeroespacial y docencia. Enfocada en arquitectura robotica, analisis estructural y flujos de IA con nube para equipos de ingenieria.',
    },
    education: {
      en: [
        'M.Sc. in Advanced Technology, UPIITA-IPN (2026 - ongoing)',
        'B.Eng. in Mechatronics Engineering, Universidad Veracruzana (2014 - 2019)',
        'SolidWorks Mechanical Parts Modeling Certification (2018)',
        'GD&T ASME-2018 Certification (2018)',
      ],
      es: [
        'Maestria en Tecnologia Avanzada, UPIITA-IPN (2026 - actual)',
        'Ingenieria en Mecatronica, Universidad Veracruzana (2014 - 2019)',
        'Certificacion en Modelado de Piezas Mecanicas con SolidWorks (2018)',
        'Certificacion en Dimensionamiento Geometrico y Tolerancias GD&T ASME-2018 (2018)',
      ],
    },
    experience: {
      en: [
        'Co-author in WITCOM 2025 research on intelligent satellite communication control architecture',
        'Principal researcher for IAC project on hybrid robotic swarms for lunar and martian lava tunnels',
        'Materials Strength Instructor, UPIITA Rocketry Student Chapter (2025)',
        'IPN collaborator in AI and cloud-computing R&D projects (2025)',
        'Math teacher for secondary and high school levels (2019 - 2023)',
        'Engineering intern at CFE Laguna Verde (2018)',
      ],
      es: [
        'Coautora en WITCOM 2025 sobre arquitectura de control inteligente para comunicaciones satelitales',
        'Investigadora principal para proyecto IAC sobre enjambres de robots hibridos en tuneles lunares y marcianos',
        'Instructora de Resistencia de Materiales en el capitulo estudiantil de cohetes UPIITA (2025)',
        'Colaboradora del IPN en proyectos de IA y computacion en la nube (2025)',
        'Profesora de matematicas en secundaria y preparatoria (2019 - 2023)',
        'Practicante de ingenieria en CFE Laguna Verde (2018)',
      ],
    },
    skills: [
      'Robotics Architecture',
      'Structural Analysis',
      'TensorFlow',
      'PyTorch',
      'Google Cloud',
      'Python',
      'Django',
      'Docker',
      'SolidWorks',
      'GD&T',
      'Git',
      'Technical Teaching',
    ],
    email: 'yuri.ordazhuerta1996@gmail.com',
    cvPdf: '/cv/yuritzi-ordaz-cv.pdf',
    imagePath: null,
  },
  {
    slug: 'jair-molina-arce',
    sortOrder: 2,
    iconKey: 'code',
    initials: 'JM',
    name: 'Ing. Jair Molina Arce',
    title: {
      en: 'Principal Software Architect and Researcher',
      es: 'Arquitecto Principal de Software e Investigador',
    },
    role: {
      en: 'Control systems, data analysis, and embedded software',
      es: 'Sistemas de control, analisis de datos y software embebido',
    },
    description: {
      en: [
        'Principal architect at Co.De Aerospace',
        'IAC 2024 speaker and co-author',
        'Focused on dynamic systems control and thermo-structural analysis',
      ],
      es: [
        'Arquitecto principal en Co.De Aerospace',
        'Ponente y coautor en IAC 2024',
        'Enfoque en control dinamico y analisis termo-estructural',
      ],
    },
    bio: {
      en: 'Mechanical engineer with experience in control systems, embedded systems, and technical communication. Currently pursuing a master degree focused on advanced technologies and dynamic system control.',
      es: 'Ingeniero mecanico con experiencia en sistemas de control, sistemas embebidos y divulgacion tecnologica. Actualmente cursa una maestria enfocada en tecnologias avanzadas y control de sistemas dinamicos.',
    },
    education: {
      en: [
        'M.Sc. in Advanced Technologies, IPN (ongoing)',
        'B.Eng. in Mechanical Engineering, IPN',
        'Specialization in dynamic systems control and instrumentation',
      ],
      es: [
        'Maestria en Tecnologias Avanzadas, IPN (en curso)',
        'Ingenieria en Mecanica, IPN',
        'Especializacion en control de sistemas dinamicos e instrumentacion',
      ],
    },
    experience: {
      en: [
        'Principal Architect at Co.De Aerospace',
        'Speaker and co-author at the 75th International Astronautical Congress (IAC 2024)',
        'Head of Staff at ICASST 2023',
        "Published in 'Hacia el Espacio' magazine on test benches",
        'Technology communicator in talks and national TV',
      ],
      es: [
        'Arquitecto Principal en Co.De Aerospace',
        'Ponente y coautor en el 75th International Astronautical Congress (IAC 2024)',
        'Head of Staff en ICASST 2023',
        "Publicacion en revista 'Hacia el Espacio' sobre bancos de pruebas",
        'Divulgador tecnologico en ponencias y television nacional',
      ],
    },
    skills: [
      'Python',
      'C/C++',
      'MATLAB/Simulink',
      'ANSYS',
      'SolidWorks',
      'React',
      'Docker',
      'Embedded Systems',
      'FEA',
      'Control Systems',
    ],
    email: 'jair@codeaerospace.com',
    cvPdf: '/cv_ipn.pdf',
    imagePath: '/team/jair-molina.jpeg',
  },
  {
    slug: 'alan-rosas-palacios',
    sortOrder: 3,
    iconKey: 'microscope',
    initials: 'AR',
    name: 'M. en C. Alan Rosas Palacios',
    title: {
      en: 'Software Engineer and AI Specialist',
      es: 'Ingeniero de Software y Especialista en IA',
    },
    role: {
      en: 'Intelligent systems architecture and AI workflow automation',
      es: 'Arquitectura de sistemas inteligentes y automatizacion con IA',
    },
    description: {
      en: [
        'Master degree focused on advanced technology and AI applications',
        'Built autonomous multi-agent systems for technical workflow automation',
        'Aerospace research collaborator with publications in satellite communications',
      ],
      es: [
        'Maestria enfocada en tecnologia avanzada y aplicaciones de IA',
        'Diseno de sistemas multi-agente autonomos para automatizar flujos tecnicos',
        'Colaborador en investigacion aeroespacial con publicaciones en comunicaciones satelitales',
      ],
    },
    bio: {
      en: 'Innovative software engineer and AI specialist focused on intelligent architectures, autonomous agents, and cloud-ready systems. Experienced in aerospace communication projects, full-stack mobile apps, and VR training platforms.',
      es: 'Ingeniero de software y especialista en IA enfocado en arquitecturas inteligentes, agentes autonomos y sistemas listos para nube. Con experiencia en comunicaciones aeroespaciales, apps moviles full-stack y plataformas de capacitacion en realidad virtual.',
    },
    education: {
      en: [
        'M.Sc. in Advanced Technology, IPN (2024 - 2025)',
        'B.Eng. in Telematics Engineering, IPN (2018 - 2024)',
      ],
      es: [
        'Maestria en Tecnologia Avanzada, IPN (2024 - 2025)',
        'Ingenieria en Telematica, IPN (2018 - 2024)',
      ],
    },
    experience: {
      en: [
        'Freelance network and systems consultant for SMEs (2025)',
        'Research collaborator at Mexican Space Agency AEM (2024)',
        'Software engineer at Mexico Profundo, React Native + Node.js (2022 - 2025)',
        'Published and presented work in IOP, IAA, and WITCOM on satellite links and cyberdefense',
      ],
      es: [
        'Consultor freelance de redes y sistemas para PyMEs (2025)',
        'Colaborador de investigacion en Agencia Espacial Mexicana AEM (2024)',
        'Ingeniero de software en Mexico Profundo con React Native + Node.js (2022 - 2025)',
        'Publicaciones y ponencias en IOP, IAA y WITCOM sobre enlaces satelitales y ciberdefensa',
      ],
    },
    skills: [
      'Python',
      'C/C++',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'React Native',
      'LangChain',
      'OpenAI API',
      'TensorFlow',
      'PyTorch',
      'Docker',
      'AWS/Azure/GCP',
    ],
    email: 'alanrosasp@gmail.com',
    cvPdf: '/cv/alan-rosas-cv.pdf',
    imagePath: null,
  },
];

function detectMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.png') return 'image/png';
  if (extension === '.webp') return 'image/webp';
  return 'image/jpeg';
}

function seedLeadership(db) {
  const transaction = db.transaction((profiles) => {
    profiles.forEach((profile) => upsertLeadershipProfile(db, profile));
  });
  transaction(leadershipProfiles);
}

function seedImages(db) {
  const imageMap = [
    {
      slug: 'jair-molina-arce',
      assetKey: 'leadership/jair-molina-arce/avatar',
      filePath: path.join(process.cwd(), 'public', 'team', 'jair-molina.jpeg'),
    },
  ];

  imageMap.forEach((item) => {
    if (!fs.existsSync(item.filePath)) return;
    const buffer = fs.readFileSync(item.filePath);
    const assetId = upsertMediaAsset(db, {
      assetKey: item.assetKey,
      filename: path.basename(item.filePath),
      mimeType: detectMimeType(item.filePath),
      data: buffer,
    });
    if (assetId) attachProfileImage(db, item.slug, assetId);
  });
}

async function main() {
  const db = openDatabase();
  try {
    seedLeadership(db);
    seedImages(db);
    
    // Invalidate Redis cache
    try {
      await connectRedis();
      await delCache('cache:*');
      console.log('Redis cache cleared after seed');
    } catch (e) {
      console.warn('Could not clear Redis cache:', e.message);
    }

    console.log(`SQLite initialized at ${DB_PATH}`);
    console.log(`Seeded leadership profiles: ${leadershipProfiles.length}`);
  } finally {
    db.close();
    process.exit(0);
  }
}

main();
