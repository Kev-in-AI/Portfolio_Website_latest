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

To test Gugu locally with `/api/chat`:

```bash
npm run dev:gugu
```

Then open:

```bash
http://localhost:3000
```

This starts Vite and a tiny local Gugu API server. Production still uses the Netlify Function.

Keep your local key in `.env`:

```bash
NVIDIA_API_KEY=your_key_here
```

`MISTRAL_API_KEY` also works as an alias when using the NVIDIA-hosted Mistral model.

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

For Gugu chat, add this in Netlify environment variables:

```bash
NVIDIA_API_KEY=your_key_here
```

The chat endpoint is served by the Netlify Function at:

```text
frontend/netlify/functions/chat.cjs
```

The public app calls it through:

```text
/api/chat
```

Optional overrides:

```bash
NVIDIA_MODEL=mistralai/mistral-medium-3.5-128b
NVIDIA_REASONING_EFFORT=high
NVIDIA_MAX_TOKENS=220
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
