import Navbar from './components/layout/Navbar';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import DemoSection from './sections/DemoSection';
import FeaturesSection from './sections/FeaturesSection';
import Footer from './sections/Footer';
import HeroSection from './sections/HeroSection';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[9999] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;

