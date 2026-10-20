import * as THREE from "three";

export function createGlobe() {
  const group = new THREE.Group();

  // Wireframe sphere — red team color
  const geoWire = new THREE.SphereGeometry(1.4, 32, 32);
  const matWire = new THREE.MeshBasicMaterial({
    color: 0xff2020,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });
  const wire = new THREE.Mesh(geoWire, matWire);
  group.add(wire);

  // Solid inner sphere
  const geoSolid = new THREE.SphereGeometry(1.38, 64, 64);
  const matSolid = new THREE.MeshPhongMaterial({
    color: 0x0a0a0a,
    emissive: 0x110000,
    shininess: 10,
    transparent: true,
    opacity: 0.85,
  });
  const solid = new THREE.Mesh(geoSolid, matSolid);
  group.add(solid);

  // Equator ring — blue team
  const ringGeo = new THREE.TorusGeometry(1.5, 0.006, 8, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: 0.6 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // Tilt ring
  const ring2 = ring.clone();
  ring2.rotation.x = Math.PI / 3;
  group.add(ring2);

  // Particles around globe
  const count = 1200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.6 + Math.random() * 0.8;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xff2020, size: 0.012, transparent: true, opacity: 0.7 });
  const particles = new THREE.Points(pGeo, pMat);
  group.add(particles);

  // Outer glow ring
  const glowGeo = new THREE.SphereGeometry(1.55, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xff2020,
    transparent: true,
    opacity: 0.04,
    side: THREE.BackSide,
  });
  group.add(new THREE.Mesh(glowGeo, glowMat));

  return group;
}
