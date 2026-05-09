import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { submitContactLead } from '../lib/api';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  organization: '',
};

function InputField({ id, label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-input/60 px-4 py-3 text-sm transition-colors focus:border-neon-cyan focus:outline-none"
      />
    </div>
  );
}

function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.organization) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitContactLead(form);
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32" aria-labelledby="contact-heading">
      <div className="container">
        <motion.div
          className="glass-card relative mx-auto max-w-5xl overflow-hidden p-10 md:p-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-neon-cyan/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-neon-blue/20 blur-3xl" />

          <div className="relative grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 text-xs uppercase tracking-[0.3em] text-neon-cyan">
                Get Started
              </div>
              <h2 id="contact-heading" className="mb-4 font-display text-4xl font-bold md:text-5xl">
                Ready to <span className="text-gradient">transform</span> your school?
              </h2>
              <p className="text-muted-foreground">
                Book a personalized demo and see Edvieye in action with your data. Setup takes
                less than a day.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="py-10 text-center"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  aria-live="polite"
                >
                  <BadgeCheck className="mx-auto mb-4 h-12 w-12 text-neon-cyan" />
                  <h3 className="mb-2 text-2xl font-semibold">You&apos;re on the list</h3>
                  <p className="text-muted-foreground">
                    We&apos;ll be in touch at <span className="text-foreground">{form.email}</span>
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="space-y-4"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  aria-busy={isSubmitting}
                >
                  {error ? (
                    <div
                      role="alert"
                      className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-red-100"
                    >
                      {error}
                    </div>
                  ) : null}

                  <InputField
                    id="name"
                    label="Your name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                  <InputField
                    id="email"
                    label="Work email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Work email"
                  />
                  <InputField
                    id="phone"
                    label="Mobile number"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Mobile number"
                  />
                  <InputField
                    id="organization"
                    label="Organization / School name"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="Organization / School name"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02] neon-glow"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book a Demo'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
