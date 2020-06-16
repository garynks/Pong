// Canvas Dimensions
let canvasWidth = 680
let canvasHeight = 340

// Paddle Dimensions
let paddleWidth = 12
let paddleHeight = 50

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

// Paddle positions
let L_paddleY = canvasHeight / 2 - paddleHeight / 2;
let R_paddleY = canvasHeight / 2 - paddleHeight / 2 // same for both left paddle and right paddle 

lPaddle = new Paddle(50, L_paddleY, paddleWidth, paddleHeight);
rPaddle = new Paddle(canvasWidth - 50, R_paddleY, paddleWidth, paddleHeight);

// Ball properties
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;

class Ball {
  constructor(x, y, diameter, speed = 5) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.speed = speed;
  }

  collides(paddle) {
    if (ball.x + ball.r > paddle) {
      return false
    }

    return true
  }
}

let ball = new Ball(ballX, ballY, 12);

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0);
  // left paddle 
  rect(50, L_paddleY, paddleWidth, paddleHeight);
  // right paddle
  rect(canvasWidth - 50, R_paddleY, paddleWidth, paddleHeight)

  // render ball
  circle(ball.x, ball.y, 12)

  //ball.x += ball.speed;
  ball.y += ball.dy;
  ball.x += ball.dx;
  if (ball.y + ball.r >= canvasHeight || ball.y - ball.r <= 0) {
    ball.dy *= -1 * random(2);
  }

  if (keyIsDown(87)) {
    if (L_paddleY >= 0) {
      L_paddleY -= 5;
    }
  } else if (keyIsDown(83)) {
    if (L_paddleY <= canvasHeight - paddleHeight) {
      L_paddleY += 5;
    }
  }

  if (keyIsDown(UP_ARROW)) {
    if (R_paddleY >= 0) {
      R_paddleY -= 5;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    if (R_paddleY <= canvasHeight - paddleHeight) {
      R_paddleY += 5;
    }
  }
}