import { PixelMan } from './pixelMan.js';
import { Pipe } from './pipe.js';
import { Ground } from './ground.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreElement = document.getElementById('final-score');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

// Game constants
const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 640;
const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const PIPE_SPACING = 200;
const PIPE_INTERVAL = 1500;

// Set canvas dimensions
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Game variables
let pixelMan;
let pipes = [];
let ground;
let score = 0;
let gameStarted = false;
let gameOver = false;
let lastPipeTime = 0;
let frameId;

// Initialize game objects
function init() {
  pixelMan = new PixelMan(ctx, 50, CANVAS_HEIGHT / 2 - 15, GRAVITY);
  pipes = [];
  ground = new Ground(ctx, CANVAS_HEIGHT - 20, CANVAS_WIDTH);
  score = 0;
  gameOver = false;
}

// Game loop
function gameLoop(timestamp) {
  // Clear canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // Create background
  drawBackground();
  
  // Add new pipes
  if (gameStarted && !gameOver && timestamp - lastPipeTime > PIPE_INTERVAL) {
    const pipeY = Math.random() * (CANVAS_HEIGHT - 300) + 100;
    pipes.push(new Pipe(ctx, CANVAS_WIDTH, pipeY, PIPE_SPACING));
    lastPipeTime = timestamp;
  }
  
  // Update and draw pipes
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].draw();
    
    // Check collision with pipes
    if (pixelMan.checkCollision(pipes[i])) {
      gameOver = true;
    }
    
    // Check if pipe is passed
    if (pipes[i].isPassed(pixelMan) && !pipes[i].scored) {
      score++;
      pipes[i].scored = true;
    }
    
    // Remove pipes that are off screen
    if (pipes[i].x + pipes[i].width < 0) {
      pipes.splice(i, 1);
    }
  }
  
  // Update and draw ground
  ground.update();
  ground.draw();
  
  // Check collision with ground
  if (pixelMan.y + pixelMan.height >= ground.y) {
    pixelMan.y = ground.y - pixelMan.height;
    gameOver = true;
  }
  
  // Check collision with ceiling
  if (pixelMan.y <= 0) {
    pixelMan.y = 0;
    pixelMan.velocity = 0;
  }
  
  // Update and draw pixel man
  pixelMan.update();
  pixelMan.draw();
  
  // Draw score
  drawScore();
  
  // Game over
  if (gameOver) {
    endGame();
    return;
  }
  
  // Continue game loop
  frameId = requestAnimationFrame(gameLoop);
}

// Draw background
function drawBackground() {
  // Sky
  ctx.fillStyle = '#70c5ce';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // Clouds
  ctx.fillStyle = '#fff';
  ctx.fillRect(50, 80, 60, 20);
  ctx.fillRect(150, 50, 80, 15);
  ctx.fillRect(250, 100, 70, 25);
}

// Draw score
function drawScore() {
  ctx.fillStyle = '#fff';
  ctx.font = '30px "Pixelify Sans"';
  ctx.textAlign = 'center';
  ctx.fillText(score, CANVAS_WIDTH / 2, 50);
}

// End game
function endGame() {
  finalScoreElement.textContent = score;
  gameOverScreen.style.display = 'flex';
  cancelAnimationFrame(frameId);
}

// Start game
function startGame() {
  init();
  startScreen.style.display = 'none';
  gameOverScreen.style.display = 'none';
  gameStarted = true;
  lastPipeTime = performance.now();
  frameId = requestAnimationFrame(gameLoop);
}

// Event listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (!gameStarted) {
      startGame();
    }
    if (gameStarted && !gameOver) {
      pixelMan.jump(JUMP_FORCE);
    }
  }
});

canvas.addEventListener('click', () => {
  if (gameStarted && !gameOver) {
    pixelMan.jump(JUMP_FORCE);
  }
});

// Initialize game
init();
drawBackground();
ground.draw();
pixelMan.draw();
