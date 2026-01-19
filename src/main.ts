import * as THREE from 'three';
import { createRenderer } from './renderer';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let cube: THREE.Mesh;

const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

// Scene setup
scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Camera setup
const width = window.innerWidth;
const height = window.innerHeight;
camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 3;

// Create cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({
  color: 0x00ff88,
  emissive: 0x004422,
  shininess: 100,
});
cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Animation loop
const animate = (): void => {
  requestAnimationFrame(animate);

  // Rotate cube
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;

  renderer.render(scene, camera);
};

animate();

// Handle window resize
const onWindowResize = (): void => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
};

window.addEventListener('resize', onWindowResize);
