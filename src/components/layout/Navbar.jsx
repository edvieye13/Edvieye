import { useEffect, useState } from 'react';
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
        <a href="#" className="flex shrink-0 items-center gap-3" aria-label="Edvieye home">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,#22d3ee,#3b82f6)] text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.35)]">
            E
          </span>
          <span className="text-lg font-medium tracking-[-0.02em] text-white/92">Edvieye</span>
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
