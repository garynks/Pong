// Player
let player1_score = 0;
let player2_score = 0;

// Canvas Dimensions
const canvasWidth = 680
const canvasHeight = 340

// Paddle Dimensions
const paddleWidth = 12
const paddleHeight = 50

class Paddle {
  constructor(x, y, width, height, speed=5) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }
}

let lPaddle 
let rPaddle

// Ball properties
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;

class Ball {
  constructor(x, y, radius, speed = 5) {
    this.x = x;
    this.y = y;
    this.dx = speed;
    this.dy = speed;
    this.r = radius;
  }

  collides(paddle) {
    if (ball.x + ball.r < paddle.x || ball.x - ball.r > paddle.x + paddle.width) {
      return false
    }
    
    if (ball.y + ball.r < paddle.y || ball.y - ball. r > paddle.y + paddle.height) {
      return false
    }
    return true
  }

  reset() {
    this.x = ballX;
    this.y = ballY;
    this.dx = 5;
    this.dy = 5;
    this.r = 3;
  }
}


let paddleHitSd 
let wallHitSd
let scoreSd 

let ball;
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  paddleHitSd = loadSound('sounds/paddle_hit.wav');
  wallHitSd = loadSound('sounds/wall_hit.wav');
  scoreSd = loadSound('sounds/score.wav');
  ball = new Ball(ballX, ballY, 6);
  lPaddle = new Paddle(50, canvasHeight / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
  rPaddle = new Paddle(canvasWidth - 50, canvasHeight / 2 - paddleHeight / 2, paddleWidth, paddleHeight);
}

function draw() {
  background(0);

  // render left paddle 
  rect(lPaddle.x, lPaddle.y, lPaddle.width, lPaddle.height);

  //  render right paddle
  rect(rPaddle.x, rPaddle.y, rPaddle.width, rPaddle.height);

  // render ball
  circle(ball.x, ball.y, 12)

   // render score
   fill(255,255,255);
   textSize(32)
   text(player1_score, 40, 40);
  textSize(32)
   text(player2_score, canvasWidth - 40, 40)

  // Ball movement
  ball.x += ball.dx ;
  ball.y += ball.dy;

  // Wall collision
  if (ball.y + ball.r >= canvasHeight || ball.y - ball.r <= 0) {
    ball.dy *= -1 * random(1, 1.02);
    wallHitSd.play();
  }

  if (ball.x + ball.r >= canvasWidth) {
    player1_score += 1;
    scoreSd.play()
    ball.reset();
  }

  else if (ball.x - ball.r <= 0) {
    player2_score += 1;
    scoreSd.play();
    ball.reset();
  }

  // Paddle collision
  if (ball.collides(lPaddle) || ball.collides(rPaddle)) {
    ball.dx *= -1 * random(1, 1.0002);
    ball.dy *= -1 * random(1, 1.0002);
    paddleHitSd.play();
  }

  if (keyIsDown(87)) { // When "w" is pressed, move left paddle up
    if (lPaddle.y >= 0) {
      lPaddle.y -= lPaddle.speed;
    }
  } else if (keyIsDown(83)) { // When "S" is pressed, move left paddle down
    if (lPaddle.y <= canvasHeight - paddleHeight) {
      lPaddle.y += lPaddle.speed;
    }
  }

  if (keyIsDown(UP_ARROW)) {
    if (rPaddle.y >= 0) {
      rPaddle.y -= rPaddle.speed;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    if (rPaddle.y <= canvasHeight - paddleHeight) {
      rPaddle.y += rPaddle.speed;
    }
  }
}

function keyPressed() {
  if (keyIsDown(32)) {
    ball.reset()
   
  }
  return false;
}

