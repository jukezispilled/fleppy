export class Pipe {
  constructor(ctx, x, y, gap) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 60;
    this.gap = gap;
    this.topHeight = y;
    this.speed = 3;
    this.scored = false;
  }
  
  update() {
    this.x -= this.speed;
  }
  
  draw() {
    // Top pipe
    this.ctx.fillStyle = '#75b374';
    this.ctx.fillRect(this.x, 0, this.width, this.topHeight);
    
    // Pipe cap (top)
    this.ctx.fillStyle = '#588157';
    this.ctx.fillRect(this.x - 5, this.topHeight - 20, this.width + 10, 20);
    
    // Bottom pipe
    this.ctx.fillStyle = '#75b374';
    this.ctx.fillRect(this.x, this.y + this.gap, this.width, 640 - (this.y + this.gap));
    
    // Pipe cap (bottom)
    this.ctx.fillStyle = '#588157';
    this.ctx.fillRect(this.x - 5, this.y + this.gap, this.width + 10, 20);
  }
  
  isPassed(player) {
    return player.x > this.x + this.width;
  }
}
