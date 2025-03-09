export class PixelMan {
  constructor(ctx, x, y, gravity) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.gravity = gravity;
    this.velocity = 0;
    this.frameCount = 0;
    this.animationSpeed = 5;
    this.runningFrame = 0;
  }
  
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    
    // Animation
    this.frameCount++;
    if (this.frameCount % this.animationSpeed === 0) {
      this.runningFrame = (this.runningFrame + 1) % 2;
    }
  }
  
  draw() {
    this.ctx.save();
    
    // Rotate based on velocity
    const rotation = this.velocity * 0.05;
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.rotate(rotation);
    this.ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    
    // Draw pixel man
    this.drawPixelMan();
    
    this.ctx.restore();
  }
  
  drawPixelMan() {
    // Body (black)
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Face (skin color)
    this.ctx.fillStyle = '#ffccaa';
    this.ctx.fillRect(this.x + 5, this.y + 5, 20, 15);
    
    // Eyes
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(this.x + 8, this.y + 8, 4, 4);
    this.ctx.fillRect(this.x + 18, this.y + 8, 4, 4);
    
    // Pupils
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(this.x + 9, this.y + 9, 2, 2);
    this.ctx.fillRect(this.x + 19, this.y + 9, 2, 2);
    
    // Mouth
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(this.x + 12, this.y + 15, 6, 2);
    
    // Legs animation
    if (this.runningFrame === 0) {
      // Left leg
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(this.x + 5, this.y + 30, 5, 5);
      // Right leg
      this.ctx.fillRect(this.x + 20, this.y + 30, 5, 5);
    } else {
      // Left leg
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(this.x + 8, this.y + 30, 5, 5);
      // Right leg
      this.ctx.fillRect(this.x + 17, this.y + 30, 5, 5);
    }
  }
  
  jump(force) {
    this.velocity = force;
  }
  
  checkCollision(pipe) {
    // Check collision with top pipe
    const collidesWithTopPipe = 
      this.x + this.width > pipe.x &&
      this.x < pipe.x + pipe.width &&
      this.y < pipe.topHeight;
    
    // Check collision with bottom pipe
    const collidesWithBottomPipe = 
      this.x + this.width > pipe.x &&
      this.x < pipe.x + pipe.width &&
      this.y + this.height > pipe.y + pipe.gap;
    
    return collidesWithTopPipe || collidesWithBottomPipe;
  }
}
