import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { fetchAdminLeads, loginAdmin } from '../lib/api';

const tokenKey = 'edvieye-admin-token';

function formatDate(value) {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const data = await loginAdmin(password);
      localStorage.setItem(tokenKey, data.token);
      onLogin(data.token);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 py-12 text-foreground">
      <section className="glass-card w-full max-w-md p-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-neon-cyan/15 text-neon-cyan">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Edvieye Admin</p>
            <h1 className="text-2xl font-semibold">Demo Requests</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error ? (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm text-muted-foreground">
              Admin password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-border bg-input/70 px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neon-cyan px-5 py-3 text-sm font-semibold text-background transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <ShieldCheck className="h-4 w-4" />
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </a>
      </section>
    </main>
  );
}

function AdminDashboard() {
  const [token, setToken] = useState(() => localStorage.getItem(tokenKey));
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const latestLead = leads[0];
  const todayCount = useMemo(() => {
    const today = new Date().toDateString();
    return leads.filter((lead) => new Date(lead.createdAt).toDateString() === today).length;
  }, [leads]);

  const loadLeads = async (activeToken = token) => {
    if (!activeToken) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await fetchAdminLeads(activeToken);
      setLeads(data.leads || []);
    } catch (loadError) {
      setError(loadError.message);
      if (loadError.message.toLowerCase().includes('login')) {
        localStorage.removeItem(tokenKey);
        setToken('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads(token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem(tokenKey);
    setToken('');
    setLeads([]);
  };

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-neon-cyan">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Book Demo Responses</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Website
            </a>
            <button
              type="button"
              onClick={() => loadLeads()}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition hover:border-neon-cyan disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm transition hover:bg-secondary/80"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        {error ? (
          <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="glass rounded-lg p-5">
            <p className="text-sm text-muted-foreground">Total responses</p>
            <p className="mt-3 text-3xl font-semibold">{leads.length}</p>
          </div>
          <div className="glass rounded-lg p-5">
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="mt-3 text-3xl font-semibold">{todayCount}</p>
          </div>
          <div className="glass rounded-lg p-5">
            <p className="text-sm text-muted-foreground">Latest request</p>
            <p className="mt-3 text-base font-medium">{latestLead ? formatDate(latestLead.createdAt) : 'None yet'}</p>
          </div>
        </section>

        <section className="glass overflow-hidden rounded-lg">
          <div className="border-b border-border/70 px-5 py-4">
            <h2 className="text-lg font-semibold">Responses</h2>
          </div>

          {leads.length === 0 ? (
            <div className="px-5 py-12 text-center text-muted-foreground">
              {isLoading ? 'Loading demo requests...' : 'No demo requests yet.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="bg-secondary/70 text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Phone</th>
                    <th className="px-5 py-3 font-medium">School</th>
                    <th className="px-5 py-3 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="transition hover:bg-secondary/35">
                      <td className="px-5 py-4 font-medium">{lead.name}</td>
                      <td className="px-5 py-4">
                        <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-2 text-neon-cyan hover:underline">
                          <Mail className="h-4 w-4" />
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        {lead.phone ? (
                          <a
                            href={`tel:${String(lead.phone).replace(/\s/g, '')}`}
                            className="inline-flex items-center gap-2 text-neon-cyan hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {lead.phone}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {lead.organization}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                          <CalendarClock className="h-4 w-4" />
                          {formatDate(lead.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
