export class Ground {
  constructor(ctx, y, width) {
    this.ctx = ctx;
    this.y = y;
    this.width = width;
    this.height = 20;
    this.x1 = 0;
    this.x2 = width;
    this.speed = 3;
  }
  
  update() {
    this.x1 -= this.speed;
    this.x2 -= this.speed;
    
    if (this.x1 + this.width <= 0) {
      this.x1 = this.x2 + this.width;
    }
    
    if (this.x2 + this.width <= 0) {
      this.x2 = this.x1 + this.width;
    }
  }
  
  draw() {
    // Ground
    this.ctx.fillStyle = '#d2b48c';
    this.ctx.fillRect(0, this.y, this.width, this.height);
    
    // Ground pattern
    this.ctx.fillStyle = '#a67c52';
    for (let i = 0; i < this.width; i += 20) {
      this.ctx.fillRect(i + this.x1 % 20, this.y, 10, 5);
      this.ctx.fillRect(i + 10 + this.x1 % 20, this.y + 5, 10, 5);
      this.ctx.fillRect(i + this.x1 % 20, this.y + 10, 10, 5);
      this.ctx.fillRect(i + 10 + this.x1 % 20, this.y + 15, 10, 5);
    }
  }
}
