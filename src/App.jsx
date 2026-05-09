import AdminDashboard from './admin/AdminDashboard';
const features = [
  'Smart Attendance',
  'Fee Automation',
  'Parent App',
  'Exam & Report Cards',
  'Transport Tracking',
  'AI Analytics',
];

const plans = [
  { name: 'Starter', price: '₹2,999/mo' },
  { name: 'Professional', price: '₹5,999/mo' },
  { name: 'Enterprise', price: 'Custom' },
];

function LandingPage() {
  return (
    <div className="site">
      <header className="nav">
        <div className="brand">EDVIEYE</div>
        <nav className="links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">Edvieye Private Limited</p>
          <h1>AI-Powered ERP for Schools</h1>
          <p className="subtitle">
            Smart education management for admissions, attendance, fees, academics, and parent
            communication in one platform.
          </p>
          <div className="actions">
            <a href="#contact" className="btn primary">
              Get Free Demo
            </a>
            <a href="#pricing" className="btn ghost">
              View Pricing
            </a>
          </div>
        </section>

        <section id="features" className="section">
          <h2>Core Features</h2>
          <div className="grid">
            {features.map((feature) => (
              <article key={feature} className="card">
                <h3>{feature}</h3>
                <p>Built for modern schools that want fast and reliable daily operations.</p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="section">
          <h2>Pricing</h2>
          <div className="grid three">
            {plans.map((plan) => (
              <article key={plan.name} className="card">
                <h3>{plan.name}</h3>
                <p className="price">{plan.price}</p>
                <a href="#contact" className="btn ghost small">
                  Choose Plan
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2>Ready to Transform Your School?</h2>
          <p>Email: ravirajmeer13@gmail.com</p>
          <a href="mailto:ravirajmeer13@gmail.com" className="btn primary">
            Start Free Trial
          </a>
        </section>
      </main>
    </div>
  );
}

function App() {
  if (window.location.pathname === '/admin') {
    return <AdminDashboard />;
  }

  return <LandingPage />;
}

export default App;
