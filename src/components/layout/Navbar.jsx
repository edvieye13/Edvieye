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
        isScrolled ? 'py-1.5' : 'py-2'
      }`}
    >
      <nav
        className={`container relative flex min-h-[82px] items-center justify-between overflow-hidden rounded-[1.35rem] border px-4 py-2 shadow-[0_20px_55px_-30px_rgba(15,59,170,0.38)] backdrop-blur-2xl transition-all duration-300 sm:min-h-[88px] sm:px-5 ${
          isScrolled
            ? 'border-sky-200/80 bg-[linear-gradient(135deg,rgba(252,254,255,0.98),rgba(237,246,255,0.96),rgba(219,240,255,0.92))]'
            : 'border-sky-100/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(241,249,255,0.94),rgba(224,244,255,0.9))]'
        }`}
        aria-label="Primary"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,234,255,0.2),transparent_32%),radial-gradient(circle_at_right,rgba(43,126,255,0.16),transparent_34%)]" />
        <div className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/90 to-transparent" />

        <a
          href="#"
          className="group relative z-10 flex shrink-0 items-center rounded-[0.85rem] border border-sky-200/90 bg-[linear-gradient(135deg,rgba(248,252,255,0.98),rgba(225,241,255,0.98))] px-2 py-1 shadow-[0_14px_30px_-22px_rgba(8,31,98,0.45)]"
          aria-label="Edvieye home"
        >
          <img
            src={logoReference}
            alt="Edvieye"
            className="h-[58px] w-auto transition-transform duration-300 group-hover:scale-[1.01] sm:h-[64px] xl:h-[68px]"
          />
        </a>

        <ul className="relative z-10 hidden items-center gap-5 lg:flex xl:gap-7">
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
          className="relative z-10 hidden h-10 items-center rounded-full border border-blue-900/10 bg-[linear-gradient(135deg,#0c2f92,#1c8eff)] px-4.5 text-sm font-medium text-white transition hover:scale-[1.02] hover:opacity-95 md:inline-flex"
        >
          Book Demo
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
