import * as THREE from "three";

export function createBackgroundParticles() {
  const count = 2000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  // Alternate red / blue team colors
  const colA = new THREE.Color(0xff2020);
  const colB = new THREE.Color(0x00c8ff);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    const c = Math.random() > 0.5 ? colA : colB;
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
  });

  return new THREE.Points(geo, mat);
}
