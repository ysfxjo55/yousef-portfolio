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
