import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Zap, ChevronDown } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const Hero = () => {
  const { primary, secondary } = useTheme();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Dynamic Motion Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `-10%`,
              width: `${Math.random() * 40 + 10}%`,
              backgroundColor: primary,
            }}
            animate={{
              x: ['0vw', '120vw'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-radial-gradient z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 bg-slate-900/50 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm"
          style={{ border: `1px solid ${primary}50` }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: primary }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: primary }}></span>
          </span>
          <span className="font-display text-xs uppercase tracking-widest" style={{ color: primary }}>Driver // Elankonda Girish</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-display uppercase tracking-tight text-white mb-6"
        >
          High-Performance <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">
            Engineering
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl font-light mb-12"
        >
          Computer Science Student & Developer. I build lightning-fast, aerodynamically designed digital experiences. Precision in every pixel, power in every line of code.
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 text-slate-950 font-display font-bold uppercase tracking-widest overflow-hidden rounded-sm flex items-center gap-3 transition-transform hover:scale-105"
            style={{ backgroundColor: primary }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap size={18} /> Launch Engine
            </span>
          </a>

          <a
            href="#about"
            className="group px-8 py-4 bg-transparent text-white font-display uppercase tracking-widest border border-white/20 rounded-sm flex items-center gap-3 transition-colors"
            style={{}}
            onMouseEnter={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.querySelector('svg').style.color = primary; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.querySelector('svg').style.color = ''; }}
          >
            <Gauge size={18} className="text-slate-400 transition-colors" />
            <span>View Specs</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="font-display text-[10px] text-slate-500 uppercase tracking-widest mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} style={{ color: primary }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
