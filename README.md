# Portfolio

Personal site of Phạm Hoàng Hải Nguyên, final-year Information Assurance
student at FPT University HCMC, focused on offensive security.

Live: <https://web-portfolio-mfree-ioah67s-projects.vercel.app/>

## Stack

- Vite 6, React 18, TypeScript
- One plain CSS file, system fonts, no third-party requests
- Deployed on Vercel

All page content lives in [`src/content/data.ts`](src/content/data.ts) and
mirrors the CV. Everything else is layout.

## Layout

```text
src/
├── App.tsx              section order
├── content/data.ts      all text, links and lists
├── components/          Header, Footer, Section, Entry
├── sections/            Intro, About, Labs, Competitions, Projects, Certs, Contact
└── styles.css
```

## Development

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/
```
