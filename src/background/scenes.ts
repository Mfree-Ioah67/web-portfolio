import { rotate, SOLIDS, type Solid } from "./geometry";

export interface Colors {
  /** "r, g, b" of the regular line colour. */
  line: string;
  /** "r, g, b" of the accent. */
  accent: string;
}

export interface Frame {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Seconds since the scene started. */
  t: number;
  /** Frame step, 1 = one 60 fps frame. 0 when drawing a still. */
  dt: number;
  /** Smoothed pointer position, -1..1 on each axis. */
  mx: number;
  my: number;
  /** Raw pointer position in pixels, when a mouse is over the page. */
  pointer: { x: number; y: number } | null;
  colors: Colors;
}

export interface Scene {
  resize?(w: number, h: number): void;
  draw(frame: Frame): void;
}

const rgba = (rgb: string, a: number) => `rgba(${rgb}, ${a.toFixed(3)})`;

/* Plexus: drifting points, linked when close, and linked to the cursor. */
function plexus(): Scene {
  type Node = { x: number; y: number; vx: number; vy: number; hot: boolean };
  let nodes: Node[] = [];
  let W = 0;
  let H = 0;
  const LINK = 150;
  const REACH = 190;

  return {
    resize(w, h) {
      if (W && H) {
        for (const n of nodes) {
          n.x *= w / W;
          n.y *= h / H;
        }
      }
      W = w;
      H = h;
      const target = Math.min(110, Math.round((w * h) / 12000));
      while (nodes.length < target) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          hot: Math.random() < 0.15,
        });
      }
      nodes = nodes.slice(0, target);
    },
    draw({ ctx, w, h, dt, pointer, colors }) {
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d >= LINK) continue;
          const hot = a.hot && b.hot;
          ctx.strokeStyle = rgba(hot ? colors.accent : colors.line, (1 - d / LINK) * (hot ? 0.7 : 0.38));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (pointer) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d >= REACH) continue;
          ctx.strokeStyle = rgba(colors.accent, (1 - d / REACH) * 0.6);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = rgba(n.hot ? colors.accent : colors.line, n.hot ? 0.95 : 0.7);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hot ? 2 : 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}

/* Polyhedra: a few Platonic solids floating at the edges of the page. */
const POLY_LAYOUT: { solid: Solid; x: number; y: number; r: number; spin: number; hot?: boolean }[] = [
  { solid: SOLIDS.icosa, x: 0.13, y: 0.3, r: 0.14, spin: 0.22, hot: true },
  { solid: SOLIDS.dodeca, x: 0.87, y: 0.24, r: 0.12, spin: -0.17 },
  { solid: SOLIDS.octa, x: 0.85, y: 0.74, r: 0.12, spin: 0.19 },
  { solid: SOLIDS.cube, x: 0.11, y: 0.8, r: 0.08, spin: -0.26 },
  { solid: SOLIDS.tetra, x: 0.5, y: 0.93, r: 0.07, spin: 0.3 },
  { solid: SOLIDS.icosa, x: 0.6, y: 0.08, r: 0.05, spin: -0.35 },
];

function polyhedra(): Scene {
  return {
    draw({ ctx, w, h, t, mx, my, colors }) {
      const base = Math.min(w, h) * (w < 700 ? 1.25 : 1);
      ctx.lineWidth = 1;

      POLY_LAYOUT.forEach((shape, k) => {
        const R = shape.r * base;
        const cx = shape.x * w + mx * 14 * (k % 2 ? 1 : -1);
        const cy = shape.y * h + Math.sin(t * 0.6 + k) * 10 + my * 10;
        const ax = t * shape.spin * 0.8 + my * 0.3;
        const ay = t * shape.spin + mx * 0.5;

        const pts = shape.solid.vertices.map((v) => {
          const [x, y, z] = rotate(v, ax, ay);
          const p = 3.2 / (3.2 + z);
          return [cx + x * R * p, cy + y * R * p, z] as const;
        });

        for (const [i, j] of shape.solid.edges) {
          const depth = ((pts[i][2] + pts[j][2]) / 2 + 1) / 2; // 0 front, 1 back
          ctx.strokeStyle = rgba(shape.hot ? colors.accent : colors.line, 0.62 - 0.42 * depth);
          ctx.beginPath();
          ctx.moveTo(pts[i][0], pts[i][1]);
          ctx.lineTo(pts[j][0], pts[j][1]);
          ctx.stroke();
        }

        if (shape.hot) {
          ctx.fillStyle = rgba(colors.accent, 0.9);
          for (const [x, y] of pts) {
            ctx.beginPath();
            ctx.arc(x, y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
    },
  };
}

/* Cubes: a field of small wireframe cubes; a wave of accent rolls across. */
function cubes(): Scene {
  const cube = SOLIDS.cube;
  return {
    draw({ ctx, w, h, t, mx, my, colors }) {
      const gap = w < 700 ? 90 : 120;
      const size = gap * 0.17;
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      ctx.lineWidth = 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const wave = Math.sin(t * 1.1 - (i * 0.55 + j * 0.4));
          const angle = t * 0.5 + (i + j) * 0.25;
          const s = size * (1 + 0.3 * wave);
          const cx = ox + i * gap;
          const cy = oy + j * gap;
          const hot = wave > 0.9;

          const pts = cube.vertices.map((v) => {
            const [x, y, z] = rotate(v, angle + my * 0.4, angle * 0.8 + mx * 0.6);
            const p = 4 / (4 + z);
            return [cx + x * s * p, cy + y * s * p] as const;
          });

          ctx.strokeStyle = hot ? rgba(colors.accent, 0.85) : rgba(colors.line, 0.16 + 0.22 * ((wave + 1) / 2));
          ctx.beginPath();
          for (const [a, b] of cube.edges) {
            ctx.moveTo(pts[a][0], pts[a][1]);
            ctx.lineTo(pts[b][0], pts[b][1]);
          }
          ctx.stroke();
        }
      }
    },
  };
}

/* Terrain: a wireframe landscape scrolling toward the viewer, flat along
   the middle so the text column stays calm. */
function terrain(): Scene {
  const COLS = 40;
  const ROWS = 30;
  const SPACING = 1.1;

  const height = (x: number, z: number) => {
    const ramp = Math.min(1, Math.max(0, (Math.abs(x) - 2.2) / 7));
    const n = Math.sin(x * 0.42 + z * 0.31) + 0.8 * Math.sin(x * 0.21 - z * 0.53 + 1.7) + 0.6 * Math.sin((x + z) * 0.16 + 0.4);
    return (n + 2.4) * ramp * ramp * 1.25;
  };

  return {
    draw({ ctx, w, h, t, mx, my, colors }) {
      const travel = t * 1.4;
      const step = Math.floor(travel);
      const frac = travel - step;
      const horizon = h * (0.4 + my * 0.03);
      const focal = h * 0.95;
      const camY = 2.4;
      const camX = mx * 2;

      // Project the grid: rows[k][c] = [x, y]; row 0 is nearest.
      const rows: [number, number][][] = [];
      const alpha: number[] = [];
      for (let k = 0; k < ROWS; k++) {
        const z = k + 0.6 - frac;
        const worldZ = k + step;
        const row: [number, number][] = [];
        for (let c = 0; c < COLS; c++) {
          const x = (c - (COLS - 1) / 2) * SPACING;
          const y = height(x, worldZ);
          row.push([w / 2 + ((x - camX) * focal) / (z * 1.6), horizon + ((camY - y) * focal) / (z * 1.6)]);
        }
        rows.push(row);
        alpha.push(0.6 * Math.pow(1 - z / ROWS, 1.4));
      }

      ctx.lineWidth = 1;
      for (let k = ROWS - 1; k >= 0; k--) {
        const hot = (k + step) % 8 === 0;
        ctx.strokeStyle = rgba(hot ? colors.accent : colors.line, hot ? Math.min(1, alpha[k] * 1.6) : alpha[k]);
        ctx.beginPath();
        rows[k].forEach(([x, y], c) => (c ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();

        if (k > 0) {
          ctx.strokeStyle = rgba(colors.line, (alpha[k] + alpha[k - 1]) / 2);
          ctx.beginPath();
          for (let c = 0; c < COLS; c++) {
            ctx.moveTo(rows[k][c][0], rows[k][c][1]);
            ctx.lineTo(rows[k - 1][c][0], rows[k - 1][c][1]);
          }
          ctx.stroke();
        }
      }
    },
  };
}

export const SCENES = [
  { id: "polyhedra", label: "Polyhedra", make: polyhedra },
  { id: "cubes", label: "Cubes", make: cubes },
  { id: "terrain", label: "Terrain", make: terrain },
  { id: "plexus", label: "Plexus", make: plexus },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];
export const SCENE_IDS = SCENES.map((s) => s.id);
