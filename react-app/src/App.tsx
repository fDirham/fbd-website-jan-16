import { useEffect } from 'react';
import Bio from './components/Bio';
import Projects from './components/Projects';
import './App.css';

function App() {
  useEffect(() => {
    // On desktop, scroll to center the circular layout
    const scrollToCenter = () => {
      const isDesktop = window.innerWidth > 770;

      if (isDesktop) {
        const appElement = document.querySelector('.app');
        if (appElement) {
          const appRect = appElement.getBoundingClientRect();
          const appTop = appRect.top + window.scrollY;
          const appHeight = appRect.height;
          const windowHeight = window.innerHeight;

          // Scroll to center the app vertically in the viewport
          const scrollTarget = appTop + (appHeight / 2) - (windowHeight / 2);

          window.scrollTo({
            top: Math.max(0, scrollTarget),
            behavior: 'smooth'
          });
        }
      }
    };

    // Scroll after a short delay to ensure layout is calculated
    const timeoutId = setTimeout(scrollToCenter, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="app">
      <Bio />
      <Projects />
    </div>
  );
}

export default App;
