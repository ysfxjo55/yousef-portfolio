# Yousef Portfolio

Personal portfolio website built with React, Vite, TypeScript, Tailwind CSS, and an Express server for production hosting.

## Tech Stack

- React 19
- Vite 7
- TypeScript
- Tailwind CSS 4
- Express

## Project Structure

- `client/` - Frontend app (Vite + React)
- `server/` - Production server entrypoint
- `shared/` - Shared constants and shared logic
- `dist/` - Production build output (generated)

## Yousef's Lab (redesign)

The homepage is a research desk: clickable objects open project panels. Presentation and content are separate.

- `client/src/content/profile.ts`: roles, dates, education, skills, publication. Verified against the CV. Edit here when the CV changes.
- `client/src/content/projects.ts`: project write-ups, project list, connection map. Verified facts only.
- `client/src/content/demoData.ts`: **fictional** demo data (sessions, permit, analytics numbers, legal text, cardiology cases). Everything here is labelled as fictional in the UI.
- `client/src/lab/`: components (`desk/` objects, `panel/` panels, `demos/`, `hooks.ts`, `usePanelRouter.ts`, `lab.css`).
- `client/public/Yousef_Ammar_Resume.pdf`: CV download. Replace the file to update it.
- Panels have URLs: `/#agents`, `/#about`, `/#research`, `/#contact`, `/#all`, `/#connections`, `/#ocr`, `/#analytics`, `/#complaint`, `/#legal`, `/#cardio`. Old anchors (`#projects`, `#experience`, `#skills`, `#certifications`) open the closest panel.
- Checks: `npm run check` (types), `npm test` (content and URL tests), `npm run build`.

## Getting Started

### 1) Clone

```bash
git clone https://github.com/yousef0852/yousef-portfolio.git
cd yousef-portfolio
```

### 2) Install dependencies

This repository currently needs npm legacy peer resolution:

```bash
npm install --legacy-peer-deps
```

### 3) Run development server

```bash
npm run dev
```

### 4) Build for production

```bash
npm run build
```

### 5) Run production server

```bash
npm run start
```

## Netlify Deployment

The repo includes `netlify.toml` with:

- Build command: `npm run build`
- Publish directory: `dist/public`
- SPA redirect fallback to `index.html`

CLI deploy:

```bash
npx netlify-cli deploy --prod --dir=dist/public
```

## Troubleshooting

If you see `vite: command not found`, reinstall dependencies:

```bash
npm install --legacy-peer-deps
```

## License

MIT
