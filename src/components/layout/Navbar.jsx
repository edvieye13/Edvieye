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
        isScrolled ? 'py-3' : 'py-4'
      }`}
    >
      <nav
        className={`container relative flex items-center justify-between overflow-hidden rounded-[1.75rem] border border-cyan-100/10 px-4 py-3 shadow-[0_18px_55px_-28px_rgba(23,119,238,0.9)] backdrop-blur-2xl transition-all duration-300 sm:px-6 ${
          isScrolled
            ? 'bg-[linear-gradient(135deg,rgba(2,10,30,0.94),rgba(5,26,71,0.86),rgba(7,66,119,0.48))]'
            : 'bg-[linear-gradient(135deg,rgba(2,10,30,0.82),rgba(5,26,71,0.74),rgba(7,66,119,0.34))]'
        }`}
        aria-label="Primary"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(106,240,255,0.18),transparent_34%),radial-gradient(circle_at_right,rgba(43,126,255,0.22),transparent_32%)]" />
        <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent" />

        <a href="#" className="group relative z-10 flex items-center" aria-label="Edvieye home">
          <LogoMark
            showTagline
            className="transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </a>

        <ul className="relative z-10 hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-cyan-50/76 transition-colors hover:text-neon-cyan"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="relative z-10 hidden items-center rounded-full border border-cyan-100/30 bg-[linear-gradient(135deg,rgba(88,239,255,0.96),rgba(36,140,255,0.94))] px-5 py-2 text-sm font-medium text-slate-950 transition hover:scale-[1.02] hover:opacity-95 sm:inline-flex"
        >
          Book Demo
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
