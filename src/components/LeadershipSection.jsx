
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Code, Microscope } from 'lucide-react';
import CVModal from './CVModal';
import { useLanguage } from '@/context/LanguageContext';

const LeaderCard = ({ name, title, role, description, icon: Icon, delay, onClickName, t }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-[#1a2847] rounded-xl border border-[#2a3c5f] p-8 hover:border-[#00d9ff]/50 hover:shadow-[0_0_30px_rgba(0,217,255,0.1)] transition-all duration-300 group flex flex-col h-full"
  >
    <div className="mb-6 flex items-center justify-between">
      <div className="p-3 bg-[#0a0e27] rounded-lg border border-[#00d9ff]/20 group-hover:border-[#00d9ff]/50 transition-colors">
        <Icon className="w-6 h-6 text-[#00d9ff]" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-[#00d9ff]/50 to-transparent ml-4 opacity-30" />
    </div>

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

    <div className="space-y-3 mt-auto">
      <p className="text-sm text-[#c0c0c0] leading-relaxed">{role}</p>
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
        className="mt-4 text-xs text-[#00d9ff]/70 hover:text-[#00d9ff] transition-colors font-mono uppercase tracking-wider"
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
    title: "Lead Systems Engineer",
    bio: "Systems engineer specializing in satellite tracking, CubeSat mission design, and space systems security. Passionate about developing high-precision orbital propagation algorithms and optimizing mission architectures for next-generation space systems.",
    education: [
      "B.Eng. in Telecommunications & Electronics Engineering — IPN",
      "Specialization in Space Systems & Satellite Communications",
      "Certified in CubeSat Design & Mission Operations"
    ],
    experience: [
      "Lead Systems Engineer at Co.De Aerospace — satellite tracking and ground segment systems",
      "Research in SGP4/SDP4 orbital propagation models for NGSO constellations",
      "CubeSat mission architecture design and optimization",
      "Space systems security protocols and encryption frameworks"
    ],
    skills: ["SGP4/SDP4", "CubeSat Design", "Orbital Mechanics", "MATLAB", "STK", "Space Security", "RF Engineering", "Mission Planning"],
    email: "yuritzi@codeaerospace.com"
  },
  "Ing. Jair Molina Arce": {
    initials: "JM",
    name: "Ing. Jair Molina Arce",
    title: "Principal Software Architect",
    bio: "Software architect with expertise in mission control systems, embedded software, and cloud-native architectures. Focused on building high-availability ground segment platforms and real-time control systems for aerospace applications.",
    education: [
      "B.Eng. in Computer Systems Engineering — IPN",
      "Specialization in Embedded Systems & Real-Time Computing",
      "Certified in Cloud Architecture & DevOps (AWS)"
    ],
    experience: [
      "Principal Software Architect at Co.De Aerospace — ground station systems",
      "Mission control platforms with 99.9% uptime",
      "Real-time telemetry processing and satellite command systems",
      "Cloud-native architecture for scalable aerospace applications"
    ],
    skills: ["Python", "C/C++", "React", "AWS", "Docker", "Kubernetes", "Real-Time Systems", "Embedded SW", "CI/CD", "Node.js"],
    email: "jair@codeaerospace.com"
  },
  "M. en C. Alan Rosas Palacios": {
    initials: "AR",
    name: "M. en C. Alan Rosas Palacios",
    title: "Principal Researcher",
    bio: "Principal researcher with a Master's degree focused on applied research and strategic innovation in aerospace. Specializing in academic-industrial alignment, advanced aerospace applications, and technology readiness assessment for next-generation orbital systems.",
    education: [
      "M.Sc. in Advanced Technology — CICATA-IPN",
      "B.Eng. in Communications & Electronics Engineering — IPN",
      "Research Fellowship in Satellite Communications & LEO Systems"
    ],
    experience: [
      "Principal Researcher at Co.De Aerospace — R&D and academic partnerships",
      "Published research on NGSO interference mitigation and spectrum coexistence",
      "Academic-industrial alignment for aerospace technology transfer",
      "TRL assessment for advanced aerospace prototypes"
    ],
    skills: ["Research Methods", "Spectrum Analysis", "MATLAB", "LaTeX", "Statistical Analysis", "ITU Standards", "RF Simulation", "Technical Writing"],
    email: "alan@codeaerospace.com"
  }
};

const LeadershipSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const { t } = useLanguage();

  const leaders = [
    {
      name: "Ing. Yuritzi Elena Ordaz Huerta",
      title: "Lead Systems Engineer",
      role: "Satellite tracking systems & CubeSat mission design",
      description: ["Space Systems Security", "High-precision orbital propagation algorithms", "Mission architecture optimization"],
      icon: Satellite
    },
    {
      name: "Ing. Jair Molina Arce",
      title: "Principal Software Architect",
      role: "Mission Control Systems & Embedded Software",
      description: ["High-availability ground segment platforms", "Real-time control systems", "Scalable cloud-native architectures"],
      icon: Code
    },
    {
      name: "M. en C. Alan Rosas Palacios",
      title: "Principal Researcher",
      role: "Applied Research & Strategic Innovation",
      description: ["Academic-Industrial alignment", "Advanced aerospace applications", "Next-gen technology readiness"],
      icon: Microscope
    }
  ];

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
          {leaders.map((leader, index) => (
            <LeaderCard
              key={index}
              {...leader}
              delay={index * 0.1}
              onClickName={() => setSelectedMember(cvData[leader.name])}
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
