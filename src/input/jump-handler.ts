import * as THREE from 'three';

export class JumpHandler {
  private readonly gravity = 0.005;
  private readonly jumpForce = 0.13;
  private readonly groundLevel = 1;

  private isJumping = false;
  private velocity = 0;

  constructor(private obj: THREE.Object3D) {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!this.isJumping) {
          this.initiateJump();
        }
      }
    });
  }

  public updateJumpAnimation(): void {
    if (this.isJumping) {
      // Apply gravity
      this.velocity -= this.gravity;
      this.obj.position.y += this.velocity;
      // Check for landing
      if (this.obj.position.y <= this.groundLevel) {
        this.obj.position.y = this.groundLevel;
        this.isJumping = false;
        this.velocity = 0;
      }
    }
  }

  private initiateJump(): void {
    this.isJumping = true;
    this.velocity = this.jumpForce;
  }
}
