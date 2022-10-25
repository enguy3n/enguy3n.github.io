// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// ball class
class Ball{
    constructor(x, y, velocityX, velocityY, color, size){
        this.x = x;
        this.y = y;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.size = size;
    }

    draw(){
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }

    update(){
      // check if going off right edge
      if((this.x+this.size) >= width){
        this.velocityX = this.velocityX * -1;
      }

      // check if going off left edge
      if((this.x - this.size) <= 0){
        this.velocityX = this.velocityX * -1;
      }

      // check if going off bottom
      if((this.y + this.size) >= height){
        this.velocityY = this.velocityY * -1;
      }

      // check if going off top
      if((this.y - this.size) <= 0){
        this.velocityY = this.velocityY * -1;
      }

      // update position
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
}

// create balls
const balls = [];

while(balls.length < 25){
  const size = random(10,20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7,7),
    random(-7,7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

// animation loop
function loop(){
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for(const ball of balls){
    ball.draw();
    ball.update();
  }

  // run function recursively
  requestAnimationFrame(loop);
}

loop();

