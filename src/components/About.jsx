import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Database } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import profileImg from '../assets/profile.jpg'; // photo loaded

const About = () => {
  const { primary, secondary } = useTheme();

  const specs = [
    { label: 'Chassis', value: 'B.Tech CSE Student' },
    { label: 'Base Location', value: 'Tirupati, India' },
    { label: 'Top Tech', value: 'Java / Node.js / React' },
    { label: 'Experience', value: 'Salesforce Dev Intern' },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-[1px]" style={{ backgroundColor: primary }}></div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-widest text-white">
            Driver <span style={{ color: primary }}>Profile</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div
              className="absolute -inset-1 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 rounded-lg"
              style={{ background: `linear-gradient(135deg, ${primary}, transparent)` }}
            ></div>

            <div className="relative aspect-[4/5] bg-slate-900 border border-white/10 overflow-hidden flex flex-col justify-between p-6">
              {/* Telemetry overlay */}
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-slate-500 text-right z-20">
                <p>LAT: 13.6288° N</p>
                <p>LNG: 79.4192° E</p>
                <p className="mt-1" style={{ color: secondary }}>STATUS: ACTIVE</p>
              </div>

              <div className="absolute inset-0 z-0">
                <img
                  src={profileImg}
                  alt="Elankonda Girish"
                  className="w-full h-full object-cover transition-all duration-700 opacity-60 group-hover:opacity-90"
                  style={{ mixBlendMode: 'luminosity' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>

              <div className="relative z-20 mt-auto border-l-2 pl-4 py-2" style={{ borderColor: primary }}>
                <h3 className="font-display font-bold text-xl uppercase tracking-wider text-white">Elankonda Girish</h3>
                <p className="font-mono text-xs mt-1" style={{ color: primary }}>ID: #DEV-2027</p>
              </div>
            </div>

            {/* Crosshairs */}
            <Crosshair size={16} className="absolute -top-3 -left-3 text-slate-500" />
            <Crosshair size={16} className="absolute -bottom-3 -right-3 text-slate-500" />
          </motion.div>

          {/* Text and Specs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h3 className="text-3xl font-light text-slate-300 mb-6 leading-relaxed">
              Computer Science student at <strong className="font-bold text-white">Mohan Babu University</strong>. I build scalable, aerodynamic interfaces that don't just look fast—they are fast.
            </h3>

            <p className="text-slate-400 mb-10 leading-relaxed max-w-2xl">
              Like a finely tuned Formula 1 car, a great application requires perfect synergy between its chassis (front-end) and engine (back-end). As an aspiring Full-Stack and Salesforce Developer, I obsess over performance bottlenecks, elegant code architecture, and continuous learning to reach the podium.
            </p>

            {/* Spec Sheet */}
            <div className="bg-slate-900/50 border border-white/5 p-6 rounded-sm">
              <h4 className="font-display text-sm uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Database size={14} /> Technical Specifications
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-3">
                    <span className="font-mono text-[10px] text-slate-500 uppercase">{spec.label}</span>
                    <span className="font-display text-white tracking-wide">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
