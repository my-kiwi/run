import * as THREE from 'three';
import { createRenderer } from './renderer';
import { loadGround } from './models/ground';
import { loadTexture } from './utils/texture-loader';
import { loadRunner } from './models/runner';

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

const runnerAnimationPromise = loadRunner().then(({ runnerScene, runnerAnimationMixer }) => {
  scene.add(runnerScene);
  runnerScene.position.set(0, 1, 3);
  return [runnerScene, runnerAnimationMixer] as const;
});

// Camera setup
const width = window.innerWidth;
const height = window.innerHeight;
camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.y = 3;
camera.lookAt(0, 3, 6);

// // Lighting
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(5, 5, 5);
// scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// load assets in parallel
const [runnerScene, runnerAnimation] = await runnerAnimationPromise;

// Animation loop
const clock = new THREE.Clock();

const animate = (): void => {
  runnerAnimation.update(clock.getDelta() * 3);
  // camera.rotateY(0.5 / 60);

  runnerScene.position.z += 0.05;
  camera.position.z += 0.05;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
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
