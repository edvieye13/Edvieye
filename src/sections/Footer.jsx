import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import LogoMark from '../components/ui/LogoMark';
import { contactDetails, footerProductLinks, socialLinks } from '../data/site';

const socialIconMap = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
};

function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/50" role="contentinfo">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <LogoMark
              label="Edvieye Private Limited"
              glow={false}
              className="mb-4 origin-left scale-[0.92]"
            />
            <p className="max-w-sm text-sm text-muted-foreground">
              The AI-powered ERP that empowers educational institutions to lead the future of
              learning.
            </p>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => {
                const Icon = socialIconMap[item.key];

                return (
                  <a
                    key={item.key}
                    href={item.href}
                    aria-label={item.label}
                    className="glass grid h-9 w-9 place-items-center rounded-lg transition-colors hover:border-neon-cyan/50"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerProductLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors hover:text-neon-cyan">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-neon-cyan" />
                {contactDetails.email}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-neon-cyan" />
                {contactDetails.phone}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 text-neon-cyan" />
                {contactDetails.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border/50 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Edvieye Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-neon-cyan">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-neon-cyan">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
