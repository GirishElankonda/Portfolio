import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const teams = [
  {
    id: 'mercedes',
    name: 'Silver Arrows',
    themeClass: 'theme-mercedes',
    primary: '#00E5FF',
    secondary: '#C0C0C0',
    description: 'Precision, efficiency, and clinical performance.',
    driver: 'George Russell',
  },
  {
    id: 'ferrari',
    name: 'Scuderia',
    themeClass: 'theme-ferrari',
    primary: '#FF2800',
    secondary: '#FFDF00',
    description: 'Passion, heritage, and pure speed.',
    driver: 'Lewis Hamilton',
  },
  {
    id: 'redbull',
    name: 'Charging Bull',
    themeClass: 'theme-redbull',
    primary: '#CC1E4A',
    secondary: '#FFC72C',
    description: 'Aggressive aerodynamics and relentless innovation.',
    driver: 'Max Verstappen',
  }
];

const Intro = ({ onComplete }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleSelect = (team) => {
    if (selectedTeam) return;
    setSelectedTeam(team);

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete(team);
      }, 800);
    }, 1600);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#050810] flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          {/* Animated scan line */}
          <motion.div
            className="absolute inset-x-0 h-[2px] pointer-events-none z-10"
            style={{ background: selectedTeam ? selectedTeam.primary : '#00E5FF', opacity: 0.25 }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Background grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundSize: '40px 40px',
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
            `
          }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 relative z-10"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ color: selectedTeam ? selectedTeam.primary : '#00E5FF' }}>
              {selectedTeam ? `CONNECTING TO ${selectedTeam.name.toUpperCase()}...` : 'TELEMETRY INTERFACE // INITIALIZING'}
            </p>
            <h1 className="font-['Orbitron',sans-serif] text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
              Select Your <br />
              <span style={{ color: selectedTeam ? selectedTeam.primary : 'rgba(255,255,255,0.25)' }}>Constructor</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl relative z-10">
            {teams.map((team, i) => {
              const isSelected = selectedTeam?.id === team.id;
              const isDimmed = selectedTeam && !isSelected;

              return (
                <motion.button
                  key={team.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{
                    opacity: isDimmed ? 0.2 : 1,
                    y: 0,
                    scale: isSelected ? 1.03 : 1,
                  }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  onClick={() => handleSelect(team)}
                  disabled={!!selectedTeam}
                  className="relative text-left overflow-hidden border cursor-pointer transition-all duration-300"
                  style={{
                    borderColor: isSelected ? team.primary : 'rgba(255,255,255,0.08)',
                    background: isSelected ? `${team.primary}18` : 'rgba(15,20,40,0.6)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {/* Hover glow (non-selected) */}
                  {!selectedTeam && (
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${team.primary}12 0%, transparent 60%)` }}
                    />
                  )}

                  {/* Selected glow pulse */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 30% 50%, ${team.primary}25 0%, transparent 70%)` }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  <div className="p-7 relative z-10">
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-7">
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.2em]">
                        UNIT {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: isSelected ? team.primary : '#334155',
                            boxShadow: isSelected ? `0 0 10px ${team.primary}` : 'none',
                            transition: 'all 0.4s'
                          }}
                        />
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: isSelected ? team.secondary : '#334155',
                            boxShadow: isSelected ? `0 0 8px ${team.secondary}` : 'none',
                            transition: 'all 0.4s'
                          }}
                        />
                      </div>
                    </div>

                    {/* Team Name */}
                    <h2
                      className="font-['Orbitron',sans-serif] text-xl font-bold uppercase tracking-wider mb-1 transition-colors duration-300"
                      style={{ color: isSelected ? team.primary : 'white' }}
                    >
                      {team.name}
                    </h2>
                    <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-5">
                      DRIVER // {team.driver}
                    </p>

                    <p className="text-slate-400 text-sm leading-relaxed mb-7">
                      {team.description}
                    </p>

                    {/* Color swatch bar */}
                    <div className="flex items-center gap-1.5 mb-6">
                      <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: team.primary }} />
                      <div className="h-1 w-8 rounded-full" style={{ backgroundColor: team.secondary }} />
                    </div>

                    {/* CTA */}
                    <div
                      className="text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300"
                      style={{ color: isSelected ? team.primary : '#475569' }}
                    >
                      {isSelected ? 'CALIBRATING...' : 'CLICK TO ENGAGE →'}
                    </div>
                  </div>

                  {/* LOADING OVERLAY */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4"
                      style={{ background: 'rgba(5,8,16,0.85)', backdropFilter: 'blur(4px)' }}
                    >
                      <motion.div
                        className="w-10 h-10 rounded-full border-[3px]"
                        style={{ borderColor: `${team.primary}30`, borderTopColor: team.primary }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      />
                      <span
                        className="font-mono text-[11px] uppercase tracking-widest"
                        style={{ color: team.primary }}
                      >
                        System Engaged
                      </span>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 font-mono text-[10px] text-slate-600 uppercase tracking-widest"
          >
            GIRISH.DEV // PORTFOLIO TELEMETRY v2.7
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
