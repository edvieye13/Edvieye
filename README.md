# Edvieye Reference Clone

This project recreates the provided Edvieye Lovable preview as a responsive React + Vite + Tailwind CSS landing page, now with a Node.js + Express backend that stores demo requests, sends demo notification emails, and exposes an admin dashboard.

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Node.js
- Express

## Folder Structure

```text
.
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
├─ server
│  ├─ index.js
│  ├─ storage.js
│  └─ data
│     └─ leads.json
├─ src
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ components
│  │  ├─ hero
│  │  │  └─ HeroBackdrop.jsx
│  │  ├─ layout
│  │  │  └─ Navbar.jsx
│  │  └─ ui
│  │     ├─ LogoMark.jsx
│  │     ├─ Reveal.jsx
│  │     └─ SectionHeading.jsx
│  ├─ data
│  │  └─ site.js
│  ├─ lib
│  │  └─ api.js
│  └─ sections
│     ├─ AboutSection.jsx
│     ├─ ContactSection.jsx
│     ├─ DemoSection.jsx
│     ├─ FeaturesSection.jsx
│     ├─ Footer.jsx
│     └─ HeroSection.jsx
└─ .gitignore
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env` file from `.env.example`:

```bash
ADMIN_PASSWORD=change-this-admin-password
KV_REST_API_URL=
KV_REST_API_TOKEN=
SMTP_SERVICE=
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
MAIL_FROM=
MAIL_TO=info@edvieye.com
MAIL_REPLY_TO=
MAIL_BCC=
PUBLIC_SITE_URL=https://edvieye.com/#contact
```

3. Run frontend and backend together in development:

```bash
npm run dev
```

This starts:

- Vite frontend on `http://localhost:5173`
- Express mock API on `http://localhost:3001`
- Admin dashboard on `http://localhost:5173/admin`

4. Build the frontend:

```bash
npm run build
```

5. Preview the built frontend only:

```bash
npm run preview
```

6. Run the Express server directly:

```bash
npm run start
```

## API Endpoints

- `GET /api/health` - health/status check
- `POST /api/admin/login` - login to the admin dashboard
- `GET /api/admin/leads` - view saved demo requests after admin login
- `POST /api/contact` - save the contact/demo form for the admin dashboard

Example request:

```json
{
  "name": "Aman Sharma",
  "email": "aman@example.com",
  "organization": "Future Public School"
}
```

## Notes

- Contact form submissions are saved in `server/data/leads.json`.
- On Vercel, connect Vercel KV or Upstash Redis and set `KV_REST_API_URL` and `KV_REST_API_TOKEN` so admin responses persist across serverless function restarts.
- Public demo form submissions are saved through `/api/contact` and notification email is sent from the backend.
- If SMTP is not configured, the backend falls back to FormSubmit for `info@edvieye.com`.
- For reliable inbox delivery, set `SMTP_SERVICE` or `SMTP_HOST` plus `SMTP_USER` and `SMTP_PASS` in your deployment environment.
- Set `ADMIN_PASSWORD` in `.env`; if it is missing, local development falls back to `admin123`.
- Vite proxies `/api/*` requests to the Express server in development.
- After a production build, the Express server can also serve the built frontend from `dist/`.
"# edvieye-website" 
"# Edvieye" 
