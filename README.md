# Futuristic Minimal Portfolio Website

A modern, minimal portfolio website built with React and Node.js, featuring a futuristic design with transparent light and dark themes.

## Features

- 🎨 **Futuristic Minimal Design** - Clean, modern UI with soft rounded edges
- 🌓 **Dark/Light Theme Toggle** - Seamless theme switching with smooth transitions
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **Fast Performance** - Built with Vite for optimal build times
- 🎯 **Smooth Animations** - Intersection Observer for scroll-triggered animations
- 🎨 **Custom Styling** - Minimal rounded fonts and transparent glass-morphism effects

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Backend**: Node.js, Express
- **Styling**: CSS3 with CSS Variables
- **Fonts**: Inter & Space Grotesk (Google Fonts)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Start development servers (frontend + backend):
```bash
npm run dev
```

Or run them separately:

```bash
# Frontend (runs on http://localhost:3000)
npm run dev:frontend

# Backend (runs on http://localhost:5000)
npm run dev:backend
```

### Building for Production

```bash
npm run build
```

The built files will be in `frontend/dist/`

## Project Structure

```
My_website/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts (Theme)
│   │   ├── hooks/        # Custom hooks
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── package.json
│   └── vite.config.js
├── backend/           # Node.js/Express server
│   ├── server.js      # Express server
│   └── package.json
└── package.json       # Root package.json
```

## Customization

### Colors & Theme

Edit CSS variables in `frontend/src/index.css` to customize colors:

```css
:root {
  --bg-primary-light: rgba(255, 255, 255, 0.95);
  --bg-primary-dark: rgba(15, 15, 15, 0.95);
  /* ... */
}
```

### Content

Update the content in each component:
- `Hero.jsx` - Hero section text
- `About.jsx` - About section content
- `Projects.jsx` - Project cards
- `Awards.jsx` - Awards list
- `Contact.jsx` - Contact form and info

## License

MIT
