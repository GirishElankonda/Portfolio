import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Menu, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const Navbar = () => {
  const { primary } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Telemetry', href: '#hero' },
    { name: 'Driver', href: '#about' },
    { name: 'Garage', href: '#projects' },
    { name: 'Specs', href: '#skills' },
    { name: 'Pit Stop', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${
        isScrolled ? 'bg-slate-950/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-display font-bold text-xl uppercase tracking-wider cursor-pointer" style={{ color: primary }}>
          <Activity size={24} className="animate-pulse" />
          <span>Girish<span className="text-white">.Dev</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-400 font-display text-sm uppercase tracking-widest transition-colors relative group"
              style={{ '--hover-color': primary }}
              onMouseEnter={e => e.currentTarget.style.color = primary}
              onMouseLeave={e => e.currentTarget.style.color = ''}
            >
              {link.name}
              <span
                className="absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: primary }}
              ></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300 transition-colors"
          style={{ color: mobileMenuOpen ? primary : '' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-900 border-b border-white/10"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 font-display text-sm uppercase tracking-widest transition-colors py-2"
                onMouseEnter={e => e.currentTarget.style.color = primary}
                onMouseLeave={e => e.currentTarget.style.color = ''}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
