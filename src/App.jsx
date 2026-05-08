import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import AdminDashboard from './admin/AdminDashboard';
import logoReference from './assets/edvieye-logo-reference.png';

const features = [
  {
    icon: '🎯',
    title: 'Smart Attendance',
    description:
      'AI-powered facial recognition and RFID-based attendance system with instant parent SMS and WhatsApp alerts plus real-time dashboards.',
    tag: 'AI Powered',
  },
  {
    icon: '💰',
    title: 'Fee Automation',
    description:
      'Auto-generate fee challans, send reminders, collect via UPI or cards, and track defaulters with almost zero manual effort.',
    tag: 'Automated',
  },
  {
    icon: '📊',
    title: 'Predictive Analytics',
    description:
      'Machine learning models that forecast student performance, dropout risk, and institutional growth trends before they happen.',
    tag: 'ML Powered',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Parent Portal',
    description:
      "Real-time access to a child's attendance, grades, homework, fee status, and direct messaging with teachers and admin.",
    tag: 'Real-time',
  },
  {
    icon: '📚',
    title: 'Academic Management',
    description:
      'Auto timetable generation, grade books, exam scheduling, report cards, syllabus tracking, and curriculum planning.',
    tag: 'Complete Suite',
  },
  {
    icon: '🚌',
    title: 'Transport & GPS',
    description:
      'Live GPS tracking of school buses, route optimization, driver management, and parent notifications on pickup and drop.',
    tag: 'GPS Enabled',
  },
  {
    icon: '📖',
    title: 'Library Management',
    description:
      'Digital catalogues, barcode issue and return, fine calculation, and reading analytics for every student.',
    tag: 'Digitized',
  },
  {
    icon: '👨‍💼',
    title: 'Staff & HR Module',
    description:
      'Employee attendance, payroll processing, leave management, appraisals, and document control for all staff.',
    tag: 'HR Ready',
  },
  {
    icon: '🔐',
    title: 'Secure Role Access',
    description:
      'Enterprise-grade role-based access control for admins, teachers, students, and parents with end-to-end data protection.',
    tag: 'Enterprise Security',
  },
];

const processSteps = [
  {
    icon: '🏫',
    title: 'Onboard Your School',
    description:
      'Set up your school profile, add departments, classes, subjects, and import existing student and staff data in minutes.',
  },
  {
    icon: '⚙️',
    title: 'Configure Modules',
    description:
      'Activate only the modules you need. From attendance to transport, customize workflows to match your school exactly.',
  },
  {
    icon: '🤖',
    title: 'AI Takes Over',
    description:
      "Edvieye's AI engine starts analyzing data, sending smart alerts, predicting trends, and automating repetitive tasks.",
  },
  {
    icon: '📈',
    title: 'Watch Your School Grow',
    description:
      'Gain real-time insights, reduce workload, improve parent satisfaction, and focus fully on quality education.',
  },
];

const pricingPlans = [
  {
    tier: 'Starter',
    price: '₹2,999',
    per: 'per month · up to 300 students',
    cta: 'Get Started',
    featured: false,
    buttonClass: 'landing-button-outline',
    items: [
      'Student Information System',
      'AI Attendance Tracking',
      'Fee Management',
      'Parent App Access',
      'Basic Reports & Analytics',
      'Email Support',
    ],
  },
  {
    tier: 'Professional',
    price: '₹5,999',
    per: 'per month · up to 1,000 students',
    cta: 'Get Started',
    featured: true,
    buttonClass: 'landing-button-primary landing-button-flat',
    items: [
      'Everything in Starter',
      'AI Predictive Analytics',
      'Transport & GPS Tracking',
      'Library Management',
      'Staff & HR Module',
      'WhatsApp Integration',
      'Priority Support 24/7',
    ],
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    per: 'tailored for your institution',
    cta: 'Contact Sales',
    featured: false,
    buttonClass: 'landing-button-outline',
    items: [
      'Unlimited Students & Staff',
      'All Professional Features',
      'White-Label Branding',
      'Custom API Integration',
      'Multi-Branch Support',
      'Dedicated Account Manager',
    ],
  },
];

const testimonials = [
  {
    initial: 'R',
    name: 'Rajesh Sharma',
    role: 'Principal · Delhi Public School',
    text:
      'Edvieye has completely transformed how we manage attendance and fees. What used to take our admin team hours now happens automatically.',
  },
  {
    initial: 'P',
    name: 'Priya Nair',
    role: "Administrator · St. Mary's School, Mumbai",
    text:
      "The parent portal is outstanding. Parents can see attendance, fees, and grades in real time, and our communication complaints have nearly disappeared.",
  },
  {
    initial: 'A',
    name: 'Arvind Kumar',
    role: 'Director · Sunrise Academy, Bangalore',
    text:
      'The predictive analytics feature is a game-changer. We identified at-risk students months before exams and intervened in time.',
  },
];

const footerColumns = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Demo', 'Integrations', 'Updates'],
  },
  {
    title: 'Solutions',
    links: ['Primary Schools', 'Secondary Schools', 'CBSE / ICSE', 'Coaching Centres', 'Multi-Branch'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Blog', 'Careers', 'Privacy Policy', 'Contact'],
  },
];

function LandingPage() {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const backgroundCanvasRef = useRef(null);
  const dashboardCanvasRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) {
      return undefined;
    }

    const outer = cursorOuterRef.current;
    const inner = cursorInnerRef.current;
    if (!outer || !inner) {
      return undefined;
    }

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      outer.style.transform = `translate(${clientX - 8}px, ${clientY - 8}px)`;
      inner.style.transform = `translate(${clientX - 2.5}px, ${clientY - 2.5}px)`;
    };

    const handleDown = () => {
      outer.classList.add('is-active');
    };

    const handleUp = () => {
      outer.classList.remove('is-active');
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  useEffect(() => {
    const canvas = backgroundCanvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    let animationFrame = 0;
    let particles = [];

    const buildParticles = () => {
      const count = Math.max(36, Math.floor((window.innerWidth * window.innerHeight) / 32000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
      buildParticles();
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -1;
        }

        context.beginPath();
        context.fillStyle = 'rgba(0, 200, 255, 0.65)';
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();

        for (let compareIndex = index + 1; compareIndex < particles.length; compareIndex += 1) {
          const other = particles[compareIndex];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 120) {
            context.beginPath();
            context.strokeStyle = `rgba(26, 111, 255, ${0.12 - distance / 1400})`;
            context.lineWidth = 1;
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const canvas = dashboardCanvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');
    let animationFrame = 0;
    let phase = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = bounds.width * dpr;
      canvas.height = bounds.height * dpr;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(dpr, dpr);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      phase += 0.018;

      context.clearRect(0, 0, width, height);

      const background = context.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, 'rgba(10, 22, 40, 0.95)');
      background.addColorStop(1, 'rgba(2, 12, 27, 0.88)');
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = 'rgba(0, 200, 255, 0.08)';
      context.lineWidth = 1;
      for (let row = 0; row < height; row += 32) {
        context.beginPath();
        context.moveTo(0, row);
        context.lineTo(width, row);
        context.stroke();
      }
      for (let column = 0; column < width; column += 40) {
        context.beginPath();
        context.moveTo(column, 0);
        context.lineTo(column, height);
        context.stroke();
      }

      const bars = [0.52, 0.68, 0.74, 0.6, 0.83, 0.72, 0.88];
      const barWidth = width / (bars.length * 1.75);
      const baseY = height - 46;

      bars.forEach((bar, index) => {
        const animatedHeight = height * (bar + Math.sin(phase + index * 0.6) * 0.04) * 0.52;
        const x = 42 + index * (barWidth * 1.45);
        const y = baseY - animatedHeight;
        const gradient = context.createLinearGradient(0, y, 0, baseY);
        gradient.addColorStop(0, 'rgba(0, 200, 255, 0.95)');
        gradient.addColorStop(1, 'rgba(26, 111, 255, 0.22)');
        context.fillStyle = gradient;
        context.fillRect(x, y, barWidth, animatedHeight);
      });

      const points = Array.from({ length: 8 }, (_, index) => ({
        x: 34 + (width - 68) * (index / 7),
        y: height * (0.26 + 0.12 * Math.sin(phase + index * 0.55) + 0.08 * Math.cos(phase * 0.5 + index)),
      }));

      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = 'rgba(255, 255, 255, 0.92)';
      points.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });
      context.stroke();

      points.forEach((point) => {
        context.beginPath();
        context.fillStyle = 'rgba(240, 165, 0, 0.95)';
        context.arc(point.x, point.y, 3.5, 0, Math.PI * 2);
        context.fill();
      });

      context.fillStyle = 'rgba(232, 244, 255, 0.9)';
      context.font = '600 12px "Exo 2", sans-serif';
      context.fillText('Attendance', 30, 24);
      context.fillText('Fees', width - 68, 24);
      context.fillText('AI Risk Alerts', width - 110, height - 18);

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 6;
    const rotateX = (0.5 - y / bounds.height) * 6;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    card.style.transform = `translateY(-6px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleCardLeave = (event) => {
    const card = event.currentTarget;
    card.style.transform = '';
  };

  return (
    <div className="landing-page">
      <a href="#main-content" className="landing-skip-link">
        Skip to content
      </a>

      <div ref={cursorOuterRef} className="landing-cursor-outer" />
      <div ref={cursorInnerRef} className="landing-cursor-inner" />
      <div className="landing-scanlines" />
      <canvas ref={backgroundCanvasRef} className="landing-background-canvas" />

      <aside className="landing-side-stream" aria-hidden="true">
        <span>AI.ON</span>
        <span>ERP.RUN</span>
        <span>EDU.LV</span>
        <span>SYS.OK</span>
        <span>DATA.FLOW</span>
      </aside>

      <header className="landing-nav">
        <a href="#top" className="landing-nav-brand" aria-label="Edvieye home">
          <img className="landing-nav-logo" src={logoReference} alt="Edvieye logo" />
        </a>

        <nav aria-label="Primary">
          <ul className="landing-nav-links">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how">How It Works</a>
            </li>
            <li>
              <a href="#dashboard">Dashboard</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>

        <a href="#contact" className="landing-nav-cta">
          Get Free Demo
        </a>
      </header>

      <main id="main-content">
        <section id="top" className="landing-hero">
          <img className="landing-hero-logo" src={logoReference} alt="Edvieye" />
          <div className="landing-hero-badge">⬡ Edvieye Private Limited | Est. 2024 ⬡</div>
          <h1>
            AI-Powered <span>ERP</span>
            <br />
            for Smart Education
          </h1>
          <p className="landing-hero-tagline">AI Flow, Education Glow</p>
          <p className="landing-hero-description">
            Edvieye delivers a futuristic, all-in-one ERP platform built for modern schools and
            educational institutions. Student management, smart attendance, fee automation, and
            predictive analytics all in one intelligent system.
          </p>
          <div className="landing-hero-actions">
            <a href="#pricing" className="landing-button-primary">
              Start Free Trial
            </a>
            <a href="#dashboard" className="landing-button-outline">
              Watch Live Demo
            </a>
          </div>
        </section>

        <section className="landing-stats-bar" aria-label="Key statistics">
          <article className="landing-stat-item">
            <div className="landing-stat-number">
              <CountUp end={250} duration={2.5} suffix="+" />
            </div>
            <div className="landing-stat-label">Schools Onboarded</div>
          </article>
          <article className="landing-stat-item">
            <div className="landing-stat-number">
              <CountUp end={50000} duration={2.5} separator="," suffix="+" />
            </div>
            <div className="landing-stat-label">Students Managed</div>
          </article>
          <article className="landing-stat-item">
            <div className="landing-stat-number">
              <CountUp end={1.2} duration={2.5} decimals={1} suffix="M" />
            </div>
            <div className="landing-stat-label">AI Predictions / Day</div>
          </article>
          <article className="landing-stat-item">
            <div className="landing-stat-number">
              <CountUp end={99.9} duration={2.5} decimals={1} suffix="%" />
            </div>
            <div className="landing-stat-label">Uptime Guarantee</div>
          </article>
        </section>

        <section id="features" className="landing-section">
          <div className="landing-section-label">Core Modules</div>
          <h2 className="landing-section-title">
            Everything Your School
            <br />
            <em>Needs to Thrive</em>
          </h2>
          <p className="landing-section-description">
            A complete ecosystem of AI-driven tools designed to automate, simplify, and elevate
            every aspect of school management.
          </p>

          <div className="landing-feature-grid">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="landing-feature-card"
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
              >
                <div className="landing-feature-icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="landing-feature-tag">{feature.tag}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="how" className="landing-process-shell">
          <div className="landing-process-inner">
            <div className="landing-process-heading">
              <div className="landing-section-label landing-section-label-centered">Process</div>
              <h2 className="landing-section-title">
                How <em>Edvieye</em> Works
              </h2>
            </div>

            <div className="landing-process-grid">
              {processSteps.map((step, index) => (
                <article key={step.title} className="landing-process-step">
                  <div className="landing-step-number">{`0${index + 1}`}</div>
                  <div className="landing-step-icon" aria-hidden="true">
                    {step.icon}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="dashboard" className="landing-dashboard-wrap">
          <div className="landing-dashboard-copy">
            <div className="landing-section-label">Live Intelligence</div>
            <h2 className="landing-section-title">
              Real-Time <em>3D Analytics</em>
              <br />
              Dashboard
            </h2>
            <p>
              Monitor your school&apos;s pulse in real time: attendance rates, fee collections,
              exam performance, and AI-driven predictions visualized in a dynamic interface.
            </p>

            <div className="landing-mini-stats">
              <article className="landing-mini-stat">
                <div className="num">
                  <CountUp end={94} duration={2.1} suffix="%" />
                </div>
                <div className="lbl">Attendance Today</div>
              </article>
              <article className="landing-mini-stat">
                <div className="num">
                  <CountUp end={8.7} duration={2.1} decimals={1} suffix="L" />
                </div>
                <div className="lbl">Fees Collected</div>
              </article>
              <article className="landing-mini-stat">
                <div className="num">
                  <CountUp end={1260} duration={2.1} separator="," suffix="+" />
                </div>
                <div className="lbl">Alerts Sent</div>
              </article>
            </div>

            <a href="#contact" className="landing-button-primary">
              Explore Dashboard
            </a>
          </div>

          <div className="landing-dashboard-card">
            <div className="landing-dashboard-badge">Live System</div>
            <canvas ref={dashboardCanvasRef} className="landing-dashboard-canvas" />
          </div>
        </section>

        <section id="pricing" className="landing-pricing-wrap">
          <div className="landing-pricing-heading">
            <div className="landing-section-label landing-section-label-centered">Pricing</div>
            <h2 className="landing-section-title">
              Transparent, <em>Affordable</em> Plans
            </h2>
            <p className="landing-pricing-copy">
              Choose a plan that scales with your school. All plans include free onboarding support
              and a 30-day trial.
            </p>
          </div>

          <div className="landing-pricing-grid">
            {pricingPlans.map((plan) => (
              <article
                key={plan.tier}
                className={`landing-pricing-card${plan.featured ? ' is-featured' : ''}`}
              >
                <div className="landing-pricing-tier">{plan.tier}</div>
                <div className="landing-pricing-price">{plan.price}</div>
                <div className="landing-pricing-per">{plan.per}</div>
                <div className="landing-pricing-divider" />
                <ul className="landing-pricing-list">
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="#contact" className={plan.buttonClass}>
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonials" className="landing-section">
          <div className="landing-section-label">Testimonials</div>
          <h2 className="landing-section-title">
            Trusted by <em>School Leaders</em>
          </h2>
          <p className="landing-section-description">
            See what educators are saying about Edvieye&apos;s impact on their school operations.
          </p>

          <div className="landing-testimonial-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="landing-testimonial-card">
                <div className="landing-testimonial-stars">★★★★★</div>
                <p className="landing-testimonial-text">{testimonial.text}</p>
                <div className="landing-testimonial-author">
                  <div className="landing-testimonial-avatar">{testimonial.initial}</div>
                  <div>
                    <div className="landing-testimonial-name">{testimonial.name}</div>
                    <div className="landing-testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="landing-cta">
          <img className="landing-cta-logo" src={logoReference} alt="Edvieye" />
          <h2>
            Ready to Transform
            <br />
            Your School?
          </h2>
          <p>
            Join Edvieye, the AI-powered ERP built for schools that want to lead the future of
            education. Start your free 30-day trial with no credit card required.
          </p>
          <div className="landing-cta-actions">
            <a href="mailto:info@edvieye.com" className="landing-button-primary landing-button-wide">
              Start Free 30-Day Trial
            </a>
            <a href="mailto:info@edvieye.com" className="landing-button-outline landing-button-wide">
              Schedule a Call
            </a>
          </div>
          <p className="landing-cta-meta">info@edvieye.com | www.edvieye.com | Made in India</p>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-grid">
          <div className="landing-footer-brand">
            <img className="landing-footer-logo" src={logoReference} alt="Edvieye" />
            <p className="landing-footer-description">
              Edvieye Private Limited, an AI-powered ERP platform for schools and educational
              institutions. AI Flow, Education Glow.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="landing-footer-column">
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#top">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="landing-footer-bottom">
          <p>© 2026 Edvieye Private Limited. All rights reserved. | CIN: U72900XXXXXXXXX</p>
          <div className="landing-footer-socials" aria-label="Social links">
            <a href="#top">in</a>
            <a href="#top">tw</a>
            <a href="#top">yt</a>
            <a href="#top">ig</a>
          </div>
        </div>
      </footer>
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
