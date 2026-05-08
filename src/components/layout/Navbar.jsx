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
      <nav className="container flex items-center justify-between" aria-label="Primary">
        <a
          href="#"
          className="group flex shrink-0 items-center rounded-[1rem] border border-sky-100/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(237,246,255,0.94))] px-2 py-1 shadow-[0_14px_30px_-22px_rgba(8,31,98,0.45)]"
          aria-label="Edvieye home"
        >
          <img
            src={logoReference}
            alt="Edvieye"
            className="h-[38px] w-auto max-w-[122px] object-contain transition-transform duration-300 group-hover:scale-[1.01] sm:h-[42px] sm:max-w-[136px]"
          />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
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
          className={`hidden h-10 items-center rounded-full px-5 text-sm font-medium text-slate-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(34,211,238,0.28)] md:inline-flex ${
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
