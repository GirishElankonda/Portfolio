import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, Cpu, Settings2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const projects = [
  {
    id: '01',
    title: 'Wander Near',
    engine: 'Node.js / Express / Firebase',
    topSpeed: 'Location-aware',
    description: 'A full-stack travel application for local exploration. Developed using JavaScript, Firebase (Auth + Firestore), Leaflet, and OpenStreetMap to enable users to discover nearby attractions and activities.',
    link: 'https://wander-near.netlify.app/',
    github: 'https://github.com/GirishElankonda/wander-near'
  },
  {
    id: '02',
    title: 'Library Automation Platform',
    engine: 'PHP / MySQL / JavaScript',
    topSpeed: 'Role-Based Access',
    description: 'A web-based Library Management System allowing users to securely log in, manage profiles, change passwords, and view issued books through an interactive dashboard.',
    link: 'https://lms-role-play.gt.tc/?i=1',
    github: 'https://github.com/GirishElankonda/Library-Managament-System'
  }
];

const ProjectCard = ({ project, index }) => {
  const { primary, secondary } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-slate-900 border border-white/10 transition-colors duration-500 overflow-hidden"
      onMouseEnter={e => e.currentTarget.style.borderColor = `${primary}80`}
      onMouseLeave={e => e.currentTarget.style.borderColor = ''}
    >
      {/* Number Badge */}
      <div
        className="absolute top-0 right-0 bg-white/5 border-l border-b border-white/10 px-4 py-2 font-display text-2xl font-bold text-slate-700 transition-colors duration-300"
        style={{ '--hover': primary }}
        ref={el => {
          if (el) {
            el.addEventListener('mouseenter', () => el.style.color = primary);
            el.addEventListener('mouseleave', () => el.style.color = '');
          }
        }}
      >
        {project.id}
      </div>

      <div className="p-8 h-full flex flex-col">
        <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider mb-4 pr-12">
          {project.title}
        </h3>

        <p className="text-slate-400 mb-8 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Engine Specs */}
        <div className="space-y-3 mb-8 bg-slate-950 p-4 border border-white/5 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-1 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"
            style={{ backgroundColor: secondary }}
          ></div>

          <div className="flex items-center gap-3 text-sm">
            <Cpu size={16} className="text-slate-500" />
            <span className="font-mono text-slate-300">{project.engine}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Settings2 size={16} className="text-slate-500" />
            <span className="font-mono" style={{ color: primary }}>{project.topSpeed}</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <a
            href={project.link}
            className="flex items-center gap-2 text-sm font-display uppercase tracking-wider text-white transition-colors"
            onMouseEnter={e => e.currentTarget.style.color = primary}
            onMouseLeave={e => e.currentTarget.style.color = ''}
          >
            <ExternalLink size={16} /> Live Demo
          </a>
          <a
            href={project.github}
            className="flex items-center gap-2 text-sm font-display uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            <Code2 size={16} /> Source
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { primary, secondary } = useTheme();

  return (
    <section id="projects" className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px]" style={{ backgroundColor: secondary }}></div>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-widest text-white">
              The <span style={{ color: secondary }}>Garage</span>
            </h2>
          </div>
          <span className="hidden md:block font-mono text-xs text-slate-500">CONSTRUCTORS_CHAMPIONSHIP</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
