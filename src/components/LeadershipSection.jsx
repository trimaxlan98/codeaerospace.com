import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Code, Microscope } from 'lucide-react';
import CVModal from './CVModal';
import { useLanguage } from '@/context/LanguageContext';

const API_BASE_URL = (import.meta.env.VITE_CONTENT_API_URL || 'http://localhost:3001').replace(/\/$/, '');

const iconMap = {
  satellite: Satellite,
  code: Code,
  microscope: Microscope,
};

const nameToIconKey = {
  'Ing. Yuritzi Elena Ordaz Huerta': 'satellite',
  'Ing. Jair Molina Arce': 'code',
  'M. en C. Alan Rosas Palacios': 'microscope',
};

const LeaderCard = ({ name, initials, title, role, description, icon: Icon, image, delay, onClickName, t }) => {
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [image]);

  const showImage = Boolean(image) && !hasImageError;
  const safeInitials = initials || name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase();

  // Extract skills from cvData based on name for badges (if not available in displayedLeaders)
  const skills = cvData[name]?.skills?.slice(0, 4) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative bg-[#0a1122] rounded-xl border-2 border-[#1a2847] p-8 hover:border-[#00d9ff] hover:shadow-[0_0_30px_rgba(0,217,255,0.2)] transition-all duration-500 group flex flex-col h-full overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(#00d9ff 0.5px, transparent 0.5px)`,
        backgroundSize: '10px 10px'
      }} />

      {/* Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d9ff]/50 to-transparent -translate-y-full group-hover:animate-scan z-20 pointer-events-none" />

      {/* Inner Border Frame */}
      <div className="absolute inset-2 border border-[#00d9ff]/10 rounded-lg pointer-events-none group-hover:border-[#00d9ff]/30 transition-colors duration-500" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#00d9ff]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-28 h-28 bg-[#1a2847] p-1 shadow-2xl" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)' }}>
            {showImage ? (
              <img
                src={image}
                alt={name}
                onError={() => setHasImageError(true)}
                className="w-full h-full object-cover"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)' }}
              />
            ) : (
              <div 
                className="w-full h-full bg-[#0f1a2e] flex items-center justify-center"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)' }}
              >
                <Icon className="w-8 h-8 text-[#00d9ff]/70" />
              </div>
            )}
          </div>
        </div>

        <h3
          onClick={onClickName}
          className="text-xl font-bold text-white mb-1 group-hover:text-[#00d9ff] transition-colors cursor-pointer"
        >
          {name}
        </h3>
        <p className="text-[#00d9ff] text-[10px] font-mono mb-4 uppercase tracking-[0.2em] font-bold">
          {title}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {skills.map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-[#00d9ff]/10 border border-[#00d9ff]/20 rounded text-[9px] font-mono text-[#00d9ff] uppercase tracking-tighter">
              {skill}
            </span>
          ))}
        </div>

        <div className="space-y-4 mt-auto text-left w-full">
          <div className="p-3 bg-[#1a2847]/40 rounded-lg border border-[#00d9ff]/5">
            <p className="text-xs text-[#c0c0c0] leading-relaxed text-center italic">"{role}"</p>
          </div>
          
          <ul className="text-[11px] text-[#94a3b8] space-y-2 mt-4 font-mono">
            {description.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#00d9ff] shrink-0 animate-pulse">_</span>
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onClickName}
            className="mt-6 w-full py-3 bg-[#0a1122] border border-[#00d9ff]/30 text-[#00d9ff] text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded hover:bg-[#00d9ff] hover:text-[#0a1122] transition-all duration-300 shadow-inner group-hover:border-[#00d9ff]"
          >
            [ > EXECUTE_VIEW ]
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const cvData = {
  'Ing. Yuritzi Elena Ordaz Huerta': {
    initials: 'YO',
    name: 'Ing. Yuritzi Elena Ordaz Huerta',
    image: '/team/yuri_ordaz.jpeg',
    cvPdf: '/cv/yuritzi-ordaz-cv.pdf',
    title: {
      en: 'Mechatronics Engineer and AI Researcher',
      es: 'Ingeniera Mecatronica e Investigadora en IA',
    },
    bio: {
      en: 'Mechatronics engineer with aerospace research and technical teaching experience. She works on robotics architecture, structural analysis, and AI/cloud workflows for advanced engineering projects.',
      es: 'Ingeniera mecatronica con experiencia en investigacion aeroespacial y docencia tecnica. Trabaja en arquitectura robotica, analisis estructural y flujos de IA con nube para proyectos avanzados de ingenieria.',
    },
    education: [
      'M.Sc. in Advanced Technology, UPIITA-IPN (2026 - ongoing)',
      'B.Eng. in Mechatronics Engineering, Universidad Veracruzana (2014 - 2019)',
      'SolidWorks Mechanical Parts Modeling Certification (2018)',
      'GD&T ASME-2018 Certification (2018)',
    ],
    experience: {
      en: [
        'Co-author in WITCOM 2025 research on intelligent satellite communication control systems.',
        'Principal researcher for IAC project on hybrid robotic swarms for lunar and martian lava tunnels.',
        'Materials Strength Instructor at UPIITA Rocketry Student Chapter (2025).',
        'Local Lead for NASA Space Apps Challenge Veracruz 2024.',
        'Math teacher (secondary and high school) from 2019 to 2023.',
      ],
      es: [
        'Coautora en investigacion WITCOM 2025 sobre control inteligente de comunicaciones satelitales.',
        'Investigadora principal en proyecto IAC sobre enjambres de robots hibridos para tuneles lunares y marcianos.',
        'Instructora de Resistencia de Materiales en el capitulo estudiantil de cohetes UPIITA (2025).',
        'Local Lead del NASA Space Apps Challenge Veracruz 2024.',
        'Profesora de matematicas de nivel secundaria y preparatoria entre 2019 y 2023.',
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
      'Git/GitHub',
      'Technical Mentoring',
    ],
    email: 'yuri.ordazhuerta1996@gmail.com',
  },
  'Ing. Jair Molina Arce': {
    initials: 'JM',
    name: 'Ing. Jair Molina Arce',
    image: '/team/jair-molina.jpeg',
    cvPdf: '/cv_ipn.pdf',
    title: {
      en: 'Principal Software Architect and Researcher',
      es: 'Arquitecto Principal de Software e Investigador',
    },
    bio: {
      en: 'Mechanical Engineering graduate with expertise in control systems, data analysis, and embedded systems development. Expert in thermo-structural analysis and embedded systems design. Author and speaker at international conferences, focused on technological dissemination. Currently pursuing a master degree in advanced technologies focused on dynamic systems control.',
      es: 'Egresado de ingenieria mecanica con experiencia en sistemas de control, analisis de datos y desarrollo de sistemas embebidos. Experto en analisis termo-estructural y diseno de sistemas embebidos. Autor y ponente en congresos internacionales, enfocado en divulgacion tecnologica. Actualmente cursa una maestria en tecnologias avanzadas con enfoque en control de sistemas dinamicos.',
    },
    education: [
      'M.Sc. in Advanced Technologies - IPN (ongoing)',
      'B.Eng. in Mechanical Engineering - IPN',
      'Specialization in Dynamic Systems Control and Instrumentation',
    ],
    experience: {
      en: [
        'Principal Architect at Co.De Aerospace.',
        'Speaker and co-author at the 75th International Astronautical Congress (IAC 2024).',
        'Head of Staff at ICASST 2023.',
        "National publication in 'Hacia el Espacio' magazine on test benches.",
        'Technology communicator in presentations and national television.',
      ],
      es: [
        'Arquitecto Principal en Co.De Aerospace.',
        'Ponente y coautor en el 75th International Astronautical Congress (IAC 2024).',
        'Head of Staff en ICASST 2023.',
        "Publicacion nacional en la revista 'Hacia el Espacio' sobre bancos de pruebas.",
        'Divulgador tecnologico en ponencias y television nacional.',
      ],
    },
    skills: ['Python', 'C/C++', 'MATLAB/Simulink', 'ANSYS', 'SolidWorks', 'React', 'Docker', 'Embedded Systems', 'FEA', 'Control Systems', 'IAC', 'ICASST'],
    email: 'jair@codeaerospace.com',
  },
  'M. en C. Alan Rosas Palacios': {
    initials: 'AR',
    name: 'M. en C. Alan Rosas Palacios',
    image: '/team/alan_rosas.jpeg',
    cvPdf: '/cv/alan-rosas-cv.pdf',
    title: {
      en: 'Software Engineer and AI Specialist',
      es: 'Ingeniero de Software y Especialista en IA',
    },
    bio: {
      en: 'Software engineer and AI specialist with a master degree in advanced technology. Focused on intelligent architecture, workflow automation, and deployment of autonomous AI agents for complex operational challenges.',
      es: 'Ingeniero de software y especialista en IA con maestria en tecnologia avanzada. Enfocado en arquitectura inteligente, automatizacion de flujos de trabajo y despliegue de agentes autonomos para retos operativos complejos.',
    },
    education: [
      'M.Sc. in Advanced Technology, IPN (2024 - 2025)',
      'B.Eng. in Telematics Engineering, IPN (2018 - 2024)',
    ],
    experience: {
      en: [
        'Freelance network and systems consultant for SMEs (2025).',
        'Research collaborator at Mexican Space Agency (AEM) in AI-driven aerospace communications (2024).',
        'Software Engineer at Mexico Profundo building a React Native + Node.js tourism app (2022 - 2025).',
        'Published and presented research in IOP, IAA, and WITCOM on satellite links and cyberdefense.',
      ],
      es: [
        'Consultor freelance de redes y sistemas para PyMEs (2025).',
        'Colaborador de investigacion en la Agencia Espacial Mexicana (AEM) en comunicaciones aeroespaciales impulsadas por IA (2024).',
        'Ingeniero de software en Mexico Profundo desarrollando app de turismo con React Native + Node.js (2022 - 2025).',
        'Publicaciones y ponencias en IOP, IAA y WITCOM sobre enlaces satelitales y ciberdefensa.',
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
  },
};

const LeadershipSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [apiProfiles, setApiProfiles] = useState(null);
  const { t, lang } = useLanguage();

  const fallbackLeaders = useMemo(() => [
    {
      name: 'Ing. Yuritzi Elena Ordaz Huerta',
      initials: 'YO',
      image: '/team/yuri_ordaz.jpeg',
      content: {
        en: {
          title: 'Mechatronics Engineer and AI Researcher',
          role: 'Aerospace research, robotics systems, and technical education',
          description: ['Satellite communication control research', 'NASA Space Apps local leadership', 'Materials strength and structural analysis'],
        },
        es: {
          title: 'Ingeniera Mecatronica e Investigadora en IA',
          role: 'Investigacion aeroespacial, sistemas roboticos y docencia tecnica',
          description: ['Investigacion de control para comunicaciones satelitales', 'Liderazgo local en NASA Space Apps', 'Resistencia de materiales y analisis estructural'],
        },
      },
      icon: Satellite,
    },
    {
      name: 'Ing. Jair Molina Arce',
      initials: 'JM',
      image: '/team/jair-molina.jpeg',
      content: {
        en: {
          title: 'Principal Software Architect and Researcher',
          role: 'Control systems, data analysis, and embedded systems',
          description: ['IAC 2024 speaker and co-author', 'Thermo-structural analysis and embedded systems', 'Dynamic systems control specialization'],
        },
        es: {
          title: 'Arquitecto Principal de Software e Investigador',
          role: 'Sistemas de control, analisis de datos y sistemas embebidos',
          description: ['Ponente y coautor en IAC 2024', 'Analisis termo-estructural y sistemas embebidos', 'Especializacion en control de sistemas dinamicos'],
        },
      },
      icon: Code,
    },
    {
      name: 'M. en C. Alan Rosas Palacios',
      initials: 'AR',
      image: '/team/alan_rosas.jpeg',
      content: {
        en: {
          title: 'Software Engineer and AI Specialist',
          role: 'Intelligent systems architecture and AI workflow automation',
          description: ['Autonomous multi-agent systems', 'Satellite communications research and publications', 'Cloud-native and full-stack engineering'],
        },
        es: {
          title: 'Ingeniero de Software y Especialista en IA',
          role: 'Arquitectura de sistemas inteligentes y automatizacion con IA',
          description: ['Sistemas multi-agente autonomos', 'Investigacion y publicaciones en comunicaciones satelitales', 'Ingenieria full-stack y cloud'],
        },
      },
      icon: Microscope,
    },
  ], []);

  useEffect(() => {
    let ignore = false;

    const fetchLeadershipFromApi = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leadership?lang=${lang}`);
        if (!response.ok) throw new Error('Leadership API not available');
        const payload = await response.json();
        if (!Array.isArray(payload.items)) throw new Error('Invalid payload');
        if (!ignore) setApiProfiles(payload.items);
      } catch {
        if (!ignore) setApiProfiles(null);
      }
    };

    fetchLeadershipFromApi();
    return () => {
      ignore = true;
    };
  }, [lang]);

  const displayedLeaders = useMemo(() => {
    if (Array.isArray(apiProfiles) && apiProfiles.length > 0) {
      return apiProfiles.map((profile, index) => ({
        name: profile.name,
        initials: profile.initials,
        image: profile.image || null,
        title: profile.title,
        role: profile.role,
        description: Array.isArray(profile.description) ? profile.description : [],
        icon: iconMap[profile.iconKey] || iconMap[nameToIconKey[profile.name]] || Code,
        delay: index * 0.1,
      }));
    }

    return fallbackLeaders.map((leader, index) => {
      const content = leader.content[lang] || leader.content.en;
      return {
        name: leader.name,
        initials: leader.initials,
        image: leader.image,
        ...content,
        icon: leader.icon,
        delay: index * 0.1,
      };
    });
  }, [apiProfiles, fallbackLeaders, lang]);

  const handleOpenModal = (leaderName) => {
    if (Array.isArray(apiProfiles) && apiProfiles.length > 0) {
      const remoteMember = apiProfiles.find((member) => member.name === leaderName);
      if (remoteMember) {
        setSelectedMember(remoteMember);
        return;
      }
    }

    const memberData = cvData[leaderName];
    if (!memberData) {
      // eslint-disable-next-line no-console
      console.error('No CV data found for:', leaderName);
      return;
    }

    const localizedMemberData = {
      ...memberData,
      title: memberData.title[lang],
      bio: memberData.bio[lang],
      experience: memberData.experience[lang],
    };
    setSelectedMember(localizedMemberData);
  };

  return (
    <section id="leadership" className="py-24 px-6 bg-[#0a0e27] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1a2847]/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t('leadership.title1')} <span className="text-[#00d9ff]">{t('leadership.title2')}</span>
          </h2>
          <div className="w-24 h-1 bg-[#00d9ff] mx-auto mb-6" />
          <p className="text-[#c0c0c0] max-w-2xl mx-auto text-lg">
            {t('leadership.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedLeaders.map((leader, index) => (
            <LeaderCard
              key={`${leader.name}-${index}`}
              name={leader.name}
              initials={leader.initials}
              image={leader.image}
              title={leader.title}
              role={leader.role}
              description={leader.description}
              icon={leader.icon}
              delay={leader.delay}
              onClickName={() => handleOpenModal(leader.name)}
              t={t}
            />
          ))}
        </div>
      </div>

      <CVModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </section>
  );
};

export default LeadershipSection;
