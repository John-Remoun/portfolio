import { useState, useEffect } from 'react';
import Loader          from './components/Loader';
import Cursor          from './components/Cursor';
import MouseGlow       from './components/MouseGlow';
import ScrollProgress  from './components/ScrollProgress';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import About           from './components/About';
import Certifications  from './components/Certifications';
import Skills          from './components/Skills';
import Projects        from './components/Projects';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import './App.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [ready,   setReady]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    }, 3700);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Cursor />
      <MouseGlow />
      <ScrollProgress />
      <ParticlesBackground />
      {loading && <Loader />}
      <div className={`app ${ready ? 'ready' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <div style={{ height: 1, background: 'var(--border)' }} />
          <About />
          <div style={{ height: 1, background: 'var(--border)' }} />
          <Certifications />
          <div style={{ height: 1, background: 'var(--border)' }} />
          <Skills />
          <div style={{ height: 1, background: 'var(--border)' }} />
          <Projects />
          <div style={{ height: 1, background: 'var(--border)' }} />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}