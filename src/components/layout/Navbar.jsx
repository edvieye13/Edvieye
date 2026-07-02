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
        isScrolled ? 'py-2.5' : 'py-4'
      }`}
    >
      <nav
        className={`container relative flex min-h-[76px] items-center justify-between overflow-hidden rounded-[1.35rem] border px-4 py-2 shadow-[0_20px_55px_-30px_rgba(15,59,170,0.34)] backdrop-blur-2xl transition-all duration-300 sm:px-5 ${
          isScrolled
            ? 'border-sky-200/85 bg-[linear-gradient(135deg,rgba(252,254,255,0.98),rgba(238,246,255,0.97),rgba(223,241,255,0.94))]'
            : 'border-sky-100/85 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(243,249,255,0.96),rgba(228,244,255,0.94))]'
        }`}
        aria-label="Primary"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,234,255,0.18),transparent_30%),radial-gradient(circle_at_right,rgba(43,126,255,0.14),transparent_34%)]" />
        <div
          className={`pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-white/95 to-transparent transition-all duration-300 ${
            isScrolled ? 'opacity-90' : 'opacity-75'
          }`}
          aria-hidden="true"
        />

        <a
          href="#"
          className="group relative z-10 flex shrink-0 items-center px-1 py-1"
          aria-label="Edvieye home"
        >
          <img
            src="/edvieye-logo-transparent.png"
            alt="Edvieye"
            className="h-[38px] w-auto max-w-[122px] object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.35)] transition-transform duration-300 group-hover:scale-[1.01] sm:h-[42px] sm:max-w-[136px]"
          />
        </a>

        <ul className="relative z-10 hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex items-center py-2 text-sm font-medium text-slate-700 transition-colors hover:text-blue-700"
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
