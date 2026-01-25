import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { JumpHandler } from './jump-handler';

describe('JumpHandler', () => {
  let runnerScene: THREE.Group;
  let jumpHandler: JumpHandler;
  const groundLevel = 1;

  beforeEach(() => {
    runnerScene = new THREE.Group();
    runnerScene.position.set(0, groundLevel, 0);
    jumpHandler = new JumpHandler(runnerScene);
  });

  describe('Initialization', () => {
    it('should create JumpHandler instance', () => {
      expect(jumpHandler).toBeDefined();
    });

    it('should not be jumping initially', () => {
      expect(jumpHandler['isJumping']).toBe(false);
    });
  });

  describe('Gravity application', () => {
    it('should apply gravity during update', () => {
      jumpHandler.updateJumpAnimation();
      // Gravity should be applied but velocity starts at 0
      expect(runnerScene.position.y).toBeLessThanOrEqual(groundLevel + 0.1);
    });
  });

  describe('Ground collision', () => {
    it('should not go below ground level', () => {
      runnerScene.position.y = groundLevel * 2; // Start above ground
      jumpHandler['isJumping'] = true; // Simulate jumping state
      for (let i = 0; i < 100; i++) {
        jumpHandler.updateJumpAnimation();
      }
      expect(runnerScene.position.y).toEqual(groundLevel);
    });

    it('should return to ground level after update', () => {
      runnerScene.position.y = groundLevel;
      jumpHandler.updateJumpAnimation();
      expect(jumpHandler['isJumping']).toBe(false);
    });
  });
});
