# Portfolio

Personal site of Phạm Hoàng Hải Nguyên, final-year Information Assurance
student at FPT University HCMC, focused on offensive security.

Live: <https://web-portfolio-mfree-ioah67s-projects.vercel.app/>

## Stack

- Vite 6, React 18, TypeScript, React Router 7
- One plain CSS file, system fonts, no third-party requests
- Animated wireframe backgrounds (Canvas 2D, no 3D library): polyhedra,
  cubes, terrain, plexus; dark/light theme; both remembered locally
- Page transitions via the View Transitions API (progressive; off under
  `prefers-reduced-motion`)
- Deployed on Vercel; `vercel.json` rewrites deep links to `index.html`

All page content lives in [`src/content/data.ts`](src/content/data.ts) and
mirrors the CV. Everything else is layout.

## Layout

```text
src/
├── App.tsx              routes: / and one per entry in content.pages
├── content/data.ts      all text, links and lists
├── navigation.ts        sets the slide direction before a navigation
├── pages/Home.tsx       landing page with the table of contents
├── background/          canvas backgrounds: geometry, scenes, component
├── components/          Layout, Header, Footer, Controls, SectionPage, Entry, RiseText
├── hooks/               useReveal, useArrowNav, useChoice
├── sections/            About, Labs, Competitions, Projects, Certs, Contact
└── styles.css
```

## Development

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/
```
