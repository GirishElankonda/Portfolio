import React from 'react';
import { Activity } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const Footer = () => {
  const { primary } = useTheme();

  return (
    <footer className="bg-slate-950 py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-2 text-slate-500 font-display uppercase tracking-widest text-xs">
          <Activity size={14} style={{ color: primary }} />
          <span>Girish.Dev // Telemetry Logged</span>
        </div>

        <div className="flex items-center gap-6 text-slate-500 font-display uppercase tracking-widest text-xs">
          <a href="#" className="transition-colors" onMouseEnter={e => e.currentTarget.style.color = primary} onMouseLeave={e => e.currentTarget.style.color = ''}>GitHub</a>
          <a href="#" className="transition-colors" onMouseEnter={e => e.currentTarget.style.color = primary} onMouseLeave={e => e.currentTarget.style.color = ''}>LinkedIn</a>
        </div>

        <div className="text-slate-600 font-mono text-[10px] uppercase mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} All systems nominal.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
