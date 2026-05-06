# Edvieye Reference Clone

This project recreates the provided Edvieye Lovable preview as a responsive React + Vite + Tailwind CSS landing page, now with a simple Node.js + Express mock backend for contact form submissions.

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

2. Run frontend and backend together in development:

```bash
npm run dev
```

This starts:

- Vite frontend on `http://localhost:5173`
- Express mock API on `http://localhost:3001`

3. Build the frontend:

```bash
npm run build
```

4. Preview the built frontend only:

```bash
npm run preview
```

5. Run the Express server directly:

```bash
npm run start
```

## API Endpoints

- `GET /api/health` - health/status check
- `GET /api/leads` - view saved demo requests
- `POST /api/contact` - submit the contact/demo form

Example request:

```json
{
  "name": "Aman Sharma",
  "email": "aman@example.com",
  "organization": "Future Public School"
}
```

## Notes

- Contact form submissions are stored in `server/data/leads.json`.
- Vite proxies `/api/*` requests to the Express server in development.
- After a production build, the Express server can also serve the built frontend from `dist/`.
"# edvieye-website" 
