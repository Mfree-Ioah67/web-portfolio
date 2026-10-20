export type Vec3 = [number, number, number];

export interface Solid {
  vertices: Vec3[];
  edges: [number, number][];
}

const PHI = (1 + Math.sqrt(5)) / 2;
const PM = [1, -1];

// Builds a wireframe solid from its vertices: edges are the vertex pairs at
// the shortest distance, which holds for all the Platonic solids below.
// Vertices are scaled so the furthest one sits on the unit sphere.
function solid(vertices: Vec3[]): Solid {
  const scale = 1 / Math.max(...vertices.map(([x, y, z]) => Math.hypot(x, y, z)));
  const v = vertices.map(([x, y, z]) => [x * scale, y * scale, z * scale] as Vec3);

  let min = Infinity;
  const dist: [number, number, number][] = [];
  for (let i = 0; i < v.length; i++) {
    for (let j = i + 1; j < v.length; j++) {
      const d = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]);
      dist.push([i, j, d]);
      min = Math.min(min, d);
    }
  }
  const edges = dist.filter(([, , d]) => d - min < 1e-6).map(([i, j]) => [i, j] as [number, number]);
  return { vertices: v, edges };
}

const cubeVertices: Vec3[] = PM.flatMap((x) => PM.flatMap((y) => PM.map((z) => [x, y, z] as Vec3)));

const goldenRectangles = (a: number, b: number): Vec3[] =>
  PM.flatMap((s) => PM.flatMap((u) => [[0, s * a, u * b], [s * a, u * b, 0], [u * b, 0, s * a]] as Vec3[]));

export const SOLIDS = {
  tetra: solid([
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ]),
  octa: solid([
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ]),
  cube: solid(cubeVertices),
  icosa: solid(goldenRectangles(1, PHI)),
  dodeca: solid([...cubeVertices, ...goldenRectangles(1 / PHI, PHI)]),
};

/** Rotates about the X axis by ax, then about the Y axis by ay. */
export function rotate([x, y, z]: Vec3, ax: number, ay: number): Vec3 {
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);
  const y1 = y * cx - z * sx;
  const z1 = y * sx + z * cx;
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  return [x * cy + z1 * sy, y1, -x * sy + z1 * cy];
}
