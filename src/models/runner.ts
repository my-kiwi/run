import * as THREE from 'three';
import { loadModel } from '../utils/model-loader';

// https://www.blenderkit.com/asset-gallery-detail/a50186ad-ad5b-47ba-8150-dabbad51bf28/
const assetsFileName = 'girl-walking.glb';

let runnerScene: THREE.Group | null = null;

export const loadRunner = async () => {
  const gltf = await loadModel(assetsFileName);
  runnerScene = gltf.scene;
  const animations = gltf.animations;
  const mixer = new THREE.AnimationMixer(runnerScene);
  const action = mixer.clipAction(animations[1]);
  action.enabled = true;
  action.setEffectiveTimeScale(1);
  action.setEffectiveWeight(1);
  action.play();
  console.log('Runner model loaded:', gltf);
  return { runnerScene, runnerAnimationMixer: mixer };
};
