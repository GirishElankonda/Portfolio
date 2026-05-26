import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const skills = [
  { name: 'Java / Python / C', level: 70 },
  { name: 'HTML / CSS / JS', level: 70 },
  { name: 'Node.js / Express / PHP', level: 65 },
  { name: 'MySQL / PostgreSQL', level: 70 },
  { name: 'Salesforce (Apex, LWC)', level: 60 },
  { name: 'Git / Cloud', level: 70 },
];

const SkillBar = ({ skill, index }) => {
  const { primary } = useTheme();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="font-display font-bold uppercase tracking-wider text-slate-300">
          {skill.name}
        </span>
        <span className="font-mono text-sm" style={{ color: primary }}>
          {skill.level} / 100
        </span>
      </div>

      {/* Telemetry Bar */}
      <div className="h-2 w-full bg-slate-900 border border-white/5 overflow-hidden rounded-r-full">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full relative"
          style={{ background: `linear-gradient(to right, ${primary}60, ${primary})` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/40 blur-[2px]"></div>
        </motion.div>
      </div>

      {/* RPM tick marks */}
      <div className="flex justify-between mt-1 px-1">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-[1px] h-1 bg-slate-700"></div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const { primary } = useTheme();

  return (
    <section id="skills" className="py-24 bg-slate-950 relative border-t border-white/5 overflow-hidden">
      {/* Background radar SVG */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="199" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
          <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="1" />
          <path d="M200 0V400" stroke="white" strokeWidth="1" />
          <path d="M0 200H400" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[1px]" style={{ backgroundColor: primary }}></div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-widest text-white">
            Performance <span style={{ color: primary }}>Stats</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          <div className="flex flex-col justify-center mb-10 md:mb-0">
            <h3 className="text-3xl font-light text-slate-300 mb-6 leading-relaxed">
              Fine-tuned for <strong className="font-bold text-white">optimal performance</strong> across the stack.
            </h3>
            <p className="text-slate-400 leading-relaxed">
              My skill set is constantly evolving, driven by telemetry data and real-world testing. I focus on technologies that deliver speed, reliability, and precision.
            </p>
          </div>

          <div>
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
