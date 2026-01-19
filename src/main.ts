import * as THREE from 'three';
import { createRenderer } from './renderer';
import { loadGround } from './models/ground';
import { loadTexture } from './utils/texture-loader';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

// Scene setup (todo move to separate file?)
scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// skydome
loadTexture('morning-cloud_0_5K.exr').then((texture) => {
  scene.environment = texture; // set as scene environment for reflections
  scene.background = texture; // Use the prefiltered HDR cubemap as the scene background (sky)
});

loadGround().then((ground) => {
  ground.position.y = 0;
  scene.add(ground);
});

// Camera setup
const width = window.innerWidth;
const height = window.innerHeight;
camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.y = 5;
camera.lookAt(0, 5, 6);

// // Lighting
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(5, 5, 5);
// scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Animation loop
const animate = (): void => {
  requestAnimationFrame(animate);
  camera.rotateY(0.1 / 60);
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
