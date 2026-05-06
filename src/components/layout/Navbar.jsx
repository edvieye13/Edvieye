import { useEffect, useState } from 'react';
import LogoMark from '../ui/LogoMark';
import { navigation } from '../../data/site';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`container flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'glass-card px-6 py-3' : 'px-2'
        }`}
        aria-label="Primary"
      >
        <a href="#" className="group flex items-center gap-2" aria-label="Edvieye home">
          <LogoMark />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden items-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-5 py-2 text-sm font-medium text-background transition hover:opacity-90 sm:inline-flex neon-glow"
        >
          Book Demo
        </a>
      </nav>
    </header>
  );
}

export default Navbar;

