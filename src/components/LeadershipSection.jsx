import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Code, Microscope } from 'lucide-react';
import CVModal from './CVModal';
import { useLanguage } from '@/context/LanguageContext';

const LeaderCard = ({ name, title, role, description, icon: Icon, image, delay, onClickName, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-[#1a2847] rounded-xl border border-[#2a3c5f] p-8 hover:border-[#00d9ff]/50 hover:shadow-[0_0_30px_rgba(0,217,255,0.1)] transition-all duration-300 group flex flex-col h-full text-center items-center"
  >
    <img
      src={image}
      alt={name}
      className="w-24 h-24 rounded-full border-4 border-[#2a3c5f] group-hover:border-[#00d9ff]/50 transition-colors mb-4"
    />
    <h3
      onClick={onClickName}
      className="text-xl font-bold text-white mb-1 group-hover:text-[#00d9ff] transition-colors cursor-pointer hover:underline decoration-[#00d9ff]/50 underline-offset-4"
      title={t('leadership.clickCv')}
    >
      {name}
    </h3>
    <p className="text-[#00d9ff] text-sm font-mono mb-4 uppercase tracking-wider opacity-80">
      {title}
    </p>

    <div className="space-y-3 mt-auto text-left w-full">
      <p className="text-sm text-[#c0c0c0] leading-relaxed text-center">{role}</p>
      <ul className="text-xs text-[#94a3b8] space-y-2 mt-4 border-t border-[#2a3c5f] pt-4">
        {description.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-[#00d9ff] mt-0.5">›</span>
            {item}
          </li>
        ))}
      </ul>
      <button
        onClick={onClickName}
        className="mt-4 text-xs text-[#00d9ff]/70 hover:text-[#00d9ff] transition-colors font-mono uppercase tracking-wider w-full text-center"
      >
        {t('leadership.viewCv')}
      </button>
    </div>
  </motion.div>
);

const cvData = {
  "Ing. Yuritzi Elena Ordaz Huerta": {
    initials: "YO",
    name: "Ing. Yuritzi Elena Ordaz Huerta",
    image: "/team/yuritzi-ordaz.png", // Placeholder path
    title: {
      en: "Lead Systems Engineer",
      es: "Ingeniera de Sistemas Líder"
    },
    bio: {
      en: "Systems engineer specializing in satellite tracking, CubeSat mission design, and space systems security. Passionate about developing high-precision orbital propagation algorithms and optimizing mission architectures for next-generation space systems.",
      es: "Ingeniera de sistemas especializada en seguimiento de satélites, diseño de misiones CubeSat y seguridad de sistemas espaciales. Apasionada por el desarrollo de algoritmos de propagación orbital de alta precisión y la optimización de arquitecturas de misión para sistemas espaciales de próxima generación."
    },
    education: [
      "B.Eng. in Telecommunications & Electronics Engineering — IPN",
      "Specialization in Space Systems & Satellite Communications",
      "Certified in CubeSat Design & Mission Operations"
    ],
    experience: {
        en: [
            "Lead Systems Engineer at Co.De Aerospace — satellite tracking and ground segment systems",
            "Research in SGP4/SDP4 orbital propagation models for NGSO constellations",
            "CubeSat mission architecture design and optimization",
            "Space systems security protocols and encryption frameworks"
        ],
        es: [
            "Ingeniera de Sistemas Líder en Co.De Aerospace — seguimiento de satélites y sistemas del segmento terrestre",
            "Investigación en modelos de propagación orbital SGP4/SDP4 para constelaciones NGSO",
            "Diseño y optimización de la arquitectura de misiones CubeSat",
            "Protocolos de seguridad y marcos de encriptación para sistemas espaciales"
        ]
    },
    skills: ["SGP4/SDP4", "CubeSat Design", "Orbital Mechanics", "MATLAB", "STK", "Space Security", "RF Engineering", "Mission Planning"],
    email: "yuritzi@codeaerospace.com"
  },
  "Ing. Jair Molina Arce": {
    initials: "JM",
    name: "Ing. Jair Molina Arce",
    image: "/team/jair-molina.jpeg",
    cvPdf: "/cv_ipn.pdf",
    title: {
      en: "Principal Software Architect & Researcher",
      es: "Arquitecto Principal de Software e Investigador"
    },
    bio: {
        en: "Mechanical Engineering graduate with expertise in control systems, data analysis, and embedded systems development. Expert in thermo-structural analysis and embedded systems design. Author and speaker at international conferences, focused on technological dissemination. Currently pursuing a Master's in Advanced Technologies, specializing in dynamic systems control.",
        es: "Egresado de Ing. Mecánica con experiencia en sistemas de control, análisis de datos y desarrollo de sistemas embebidos. Experto en análisis térmico-estructural y diseño de sistemas embebidos. Autor y ponente en congresos internacionales, enfocado en divulgación tecnológica. Actualmente cursando la Maestría en Tecnologías Avanzadas, especializándose en control de sistemas dinámicos."
    },
    education: [
      "M.Sc. in Advanced Technologies - IPN (Ongoing)",
      "B.Eng. in Mechanical Engineering — IPN",
      "Specialization in Dynamic Systems Control & Instrumentation"
    ],
    experience: {
      en: [
        "Principal Architect at Co.De Aerospace.",
        "Speaker and co-author at the 75th International Astronautical Congress (IAC 2024).",
        "Head of Staff at the ICASST 2023 congress.",
        "National publication in 'Hacia el Espacio' magazine on test benches.",
        "Technology communicator in presentations and national television (TV Azteca)."
      ],
      es: [
        "Arquitecto Principal en Co.De Aerospace.",
        "Ponente y coautor en el 75º Congreso Astronáutico Internacional (IAC 2024).",
        "Jefe de Staff en el congreso ICASST 2023.",
        "Publicación nacional en la revista 'Hacia el Espacio' sobre bancos de pruebas.",
        "Divulgador tecnológico en ponencias y televisión nacional (TV Azteca)."
      ]
    },
    skills: ["Python", "C/C++", "MATLAB/Simulink", "ANSYS", "SolidWorks", "React", "Docker", "Embedded Systems", "FEA", "Control Systems", "IAC", "ICASST"],
    email: "jair@codeaerospace.com"
  },
  "M. en C. Alan Rosas Palacios": {
    initials: "AR",
    name: "M. en C. Alan Rosas Palacios",
    image: "/team/alan-rosas.png", // Placeholder path
    title: {
      en: "Principal Researcher",
      es: "Investigador Principal"
    },
    bio: {
      en: "Principal researcher with a Master's degree focused on applied research and strategic innovation in aerospace. Specializing in academic-industrial alignment, advanced aerospace applications, and technology readiness assessment for next-generation orbital systems.",
      es: "Investigador principal con Maestría en Ciencias, enfocado en investigación aplicada e innovación estratégica en el sector aeroespacial. Especializado en la alineación académico-industrial, aplicaciones aeroespaciales avanzadas y evaluación de la madurez tecnológica para sistemas orbitales de próxima generación."
    },
    education: [
      "M.Sc. in Advanced Technology — CICATA-IPN",
      "B.Eng. in Communications & Electronics Engineering — IPN",
      "Research Fellowship in Satellite Communications & LEO Systems"
    ],
    experience: {
        en: [
            "Principal Researcher at Co.De Aerospace — R&D and academic partnerships",
            "Published research on NGSO interference mitigation and spectrum coexistence",
            "Academic-industrial alignment for aerospace technology transfer",
            "TRL assessment for advanced aerospace prototypes"
        ],
        es: [
            "Investigador Principal en Co.De Aerospace — I+D y asociaciones académicas",
            "Investigación publicada sobre mitigación de interferencias NGSO y coexistencia de espectro",
            "Alineación académico-industrial para la transferencia de tecnología aeroespacial",
            "Evaluación de TRL para prototipos aeroespaciales avanzados"
        ]
    },
    skills: ["Research Methods", "Spectrum Analysis", "MATLAB", "LaTeX", "Statistical Analysis", "ITU Standards", "RF Simulation", "Technical Writing"],
    email: "alan@codeaerospace.com"
  }
};

const LeadershipSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const { t, lang } = useLanguage();

  const leaders = [
    {
      name: "Ing. Yuritzi Elena Ordaz Huerta",
      image: "/team/yuritzi-ordaz.png",
      content: {
        en: {
          title: "Lead Systems Engineer",
          role: "Satellite tracking systems & CubeSat mission design",
          description: ["Space Systems Security", "High-precision orbital propagation algorithms", "Mission architecture optimization"],
        },
        es: {
          title: "Ingeniera de Sistemas Líder",
          role: "Sistemas de seguimiento de satélites y diseño de misiones CubeSat",
          description: ["Seguridad de sistemas espaciales", "Algoritmos de propagación orbital de alta precisión", "Optimización de la arquitectura de la misión"],
        }
      },
      icon: Satellite
    },
    {
      name: "Ing. Jair Molina Arce",
      image: "/team/jair-molina.jpeg",
      content: {
        en: {
          title: "Principal Software Architect & Researcher",
          role: "Control systems, data analysis, and embedded systems development.",
          description: ["Author and speaker at international conferences.", "Expert in thermo-structural analysis (FEA).", "Specializing in dynamic systems control."],
        },
        es: {
          title: "Arquitecto Principal de Software e Investigador",
          role: "Sistemas de control, análisis de datos y desarrollo de sistemas embebidos.",
          description: ["Autor y ponente en congresos internacionales.", "Experto en análisis termo-estructural (FEA).", "Especialización en control de sistemas dinámicos."],
        }
      },
      icon: Code
    },
    {
      name: "M. en C. Alan Rosas Palacios",
      image: "/team/alan-rosas.png",
      content: {
        en: {
          title: "Principal Researcher",
          role: "Applied Research & Strategic Innovation",
          description: ["Academic-Industrial alignment", "Advanced aerospace applications", "Next-gen technology readiness"],
        },
        es: {
          title: "Investigador Principal",
          role: "Investigación Aplicada e Innovación Estratégica",
          description: ["Alineación académico-industrial", "Aplicaciones aeroespaciales avanzadas", "Preparación de tecnología de próxima generación"],
        }
      },
      icon: Microscope
    }
  ];

  const handleOpenModal = (leaderName) => {
    const memberData = cvData[leaderName];
    if (!memberData) {
      console.error("No CV data found for:", leaderName);
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
          {leaders.map((leader, index) => {
            const content = leader.content[lang] || leader.content.en;
            return (
              <LeaderCard
                key={index}
                name={leader.name}
                image={leader.image}
                {...content}
                icon={leader.icon}
                delay={index * 0.1}
                onClickName={() => handleOpenModal(leader.name)}
                t={t}
              />
            );
          })}
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
