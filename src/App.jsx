import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeContext from './ThemeContext';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState({ primary: '#00E5FF', secondary: '#C0C0C0', teamId: 'mercedes', driver: 'George Russell' });

  const handleIntroComplete = (selectedTeam) => {
    setTheme({
      primary: selectedTeam.primary,
      secondary: selectedTeam.secondary,
      teamId: selectedTeam.id,
      driver: selectedTeam.driver,
    });
    setShowIntro(false);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <AnimatePresence>
        {showIntro && <Intro onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-slate-950 min-h-screen text-slate-300"
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </ThemeContext.Provider>
  );
}

export default App;
