# easyQ Landing

Production-ready Vite + React + TypeScript rebuild of the EasyQ landing page.

Includes English, Uzbek, and Russian localization through the language switcher in the header.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

The static output is generated in `dist`.

## Deploy to Cloudflare Pages

Cloudflare Pages settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: 20.19 or newer

CLI deployment option:

```bash
npm run build
npx wrangler pages deploy dist --project-name easyq-landing
```

This is a static Pages deployment, not a backend Worker.
