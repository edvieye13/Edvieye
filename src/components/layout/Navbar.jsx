import { useEffect, useState } from 'react';
import logoReference from '../../assets/edvieye-logo-reference.png';
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
      <nav className="container relative flex items-center justify-between" aria-label="Primary">
        <div
          className={`pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent transition-all duration-300 ${
            isScrolled ? 'bottom-0 opacity-90' : 'bottom-1 opacity-75'
          }`}
          aria-hidden="true"
        />

        <a
          href="#"
          className="group relative z-10 flex shrink-0 items-center rounded-[1rem] border border-white/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.99),rgba(241,248,255,0.97))] px-2 py-1 shadow-[0_16px_34px_-24px_rgba(8,31,98,0.55)]"
          aria-label="Edvieye home"
        >
          <img
            src={logoReference}
            alt="Edvieye"
            className="h-[38px] w-auto max-w-[122px] object-contain brightness-[1.02] contrast-[1.04] transition-transform duration-300 group-hover:scale-[1.01] sm:h-[42px] sm:max-w-[136px]"
          />
        </a>

        <ul className="relative z-10 hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex items-center py-2 text-sm font-medium text-white/62 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={`relative z-10 hidden h-10 items-center rounded-full px-5 text-sm font-medium text-slate-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(34,211,238,0.28)] md:inline-flex ${
            isScrolled
              ? 'border border-white/10 bg-[linear-gradient(135deg,#34d3ff,#4f8cff)] shadow-[0_10px_28px_rgba(34,211,238,0.2)]'
              : 'bg-[linear-gradient(135deg,#34d3ff,#4f8cff)] shadow-[0_10px_28px_rgba(34,211,238,0.16)]'
          }`}
        >
          Book Demo
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
