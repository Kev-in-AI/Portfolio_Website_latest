# Kevin Manickam Portfolio

A React + Vite portfolio website with a dark, minimal, slightly dramatic UI.

Built to show projects, experience, skills, awards, activities, and the occasional tiny robot doing tiny robot things.

## Tech

- React
- Vite
- Three.js
- CSS
- Netlify

## Run Locally

```bash
npm run install:all
npm run dev
```

The site runs at:

```bash
http://localhost:3000
```

## Build

```bash
npm run build
```

Production files are generated in:

```bash
frontend/dist
```

## Netlify

This repo includes `netlify.toml`.

Netlify uses:

```bash
base = "frontend"
command = "npm run build"
publish = "dist"
```

## Structure

```text
frontend/
  src/
    components/
    contexts/
    hooks/
    App.jsx
    main.jsx
  public/
```

## Notes

- Most content lives in `frontend/src/components`.
- Static assets live in `frontend/public/assets`.
- If the robot misbehaves, he is probably just networking.
