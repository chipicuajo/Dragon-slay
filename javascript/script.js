let canvas = document.getElementById("myCanvas");
canvas.style.border = "2px solid blue";
let ctx = canvas.getContext("2d");

let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let gameover = document.querySelector("#gameover");
let splashScreen = document.querySelector("#splashscreen");
let scoreText = document.querySelector("#scoreText");

let cloud1 = new Image();
cloud1.src = "./assets/cloud1.png";

let cloud2 = new Image();
cloud2.src = "./assets/cloud2.png";

let cloud3 = new Image();
cloud3.src = "./assets/cloud3.png";

let playscreen = new Image();
playscreen.src = "./assets/playscreen.png";

let enemy1 = new Image(100, 100);
enemy1.src = "./assets/enemy1.png";

let enemy2 = new Image(100, 100);
enemy2.src = "./assets/enemy2.png";

let mother1 = new Image(110, 110);
mother1.src = "./assets/mother1.png";

let motherFrame = new Image();
motherFrame.src = "./assets/motherframe.png";

let babyFrame = new Image();
babyFrame.src = "./assets/babyframe.png";

let fireball = new Image();
fireball.src = "./assets/fireball.png";

let wingsAudio = new Audio("./assets/wings-sound.wav");
wingsAudio.loop = "false";

let fireballWhoosh = new Audio("./assets/fireball-whoosh.wav");
// fireballWhoosh.loop = "true";

let gameoverAudio = new Audio("./assets/gameover-sound.wav");
gameoverAudio.loop = "false";

let mainAudio = new Audio("./assets/main-music.wav");
mainAudio.loop = "true";

canvas.width = "600";
canvas.height = "800";

let intervalId = 0;
let isGameOver = false;
let score = 0;
let request;
let canvasX = 0,
  canvasY = 0;
//cloud position Array
let clouds = [
  { x: 50, y: 250 },
  { x: 300, y: 400 },
];

//Variables for drawBabyUpdate();
let adjustImg = 2.5,
  frameWidth = 173,
  frameHeight = 180,
  adjustWidth = frameWidth / adjustImg,
  adjustHeight = frameHeight / adjustImg;

//Variables for moveBaby()
const cycleLoop = [0, 1];
let currentLoopIndex = 0;
let frameCount = 0;

//Variables for drawMother()
let motherX = 100,
  motherY = canvas.height - 110,
  incrX = 2,
  incrY = 2;
let isArrowUp = false,
  isArrowRight = false,
  isArrowLeft = false,
  isArrowDown = false,
  isSpaceKey = false;
//fireballs variables
fireball.width = "20";
fireball.height = "20";
let fireballs = [],
  fire = true,
  fireballY = motherY + mother1.height,
  fireballX = motherX,
  incrBall = 10;
let initalSize = randomSize(); //for resizing enemies
let enemies = [{ x: 30, y: 30, width: initalSize[0], height: initalSize[1] }];

//----EVENT LISTENERS for MOTHER Dragon movements---
document.addEventListener("keydown", (event) => {
  if (event.code == "ArrowRight") {
    isArrowRight = true;
    wingsAudio.play();
    isArrowLeft = false;
    isArrowUp = false;
    isArrowDown = false;
  } else if (event.code == "ArrowLeft") {
    wingsAudio.play();
    isArrowLeft = true;
    isArrowRight = false;
    isArrowUp = false;
    isArrowDown = false;
  } else if (event.code == "ArrowUp") {
    wingsAudio.play();
    isArrowUp = true;
    isArrowRight = false;
    isArrowLeft = false;
    isArrowDown = false;
  } else if (event.code == "ArrowDown") {
    wingsAudio.play();
    isArrowDown = true;
    isArrowUp = false;
    isArrowRight = false;
    isArrowLeft = false;
  } else if (event.code == "Space") {
    isSpaceKey = true;
  }
});
document.addEventListener("keyup", (event) => {
  (isArrowUp = false),
    (isArrowRight = false),
    (isArrowLeft = false),
    (isArrowDown = false),
    wingsAudio.pause();
});

//main screen
function drawMainUi() {
  splashScreen.style.display = "none";
  gameover.style.display = "none";
  canvas.style.display = "block";
  scoreText.style.display = "block";
  ctx.drawImage(playscreen, 0, 0);

  // mainAudio.play();
}
//splash screen
function drawSplashUI() {
  startBtn.style.display = "block";
  splashScreen.style.display = "block";
  gameover.style.display = "none";
  scoreText.style.display = "none";
  canvas.style.display = "none";
}

//finished gameover UI-MVP done
function gameOverUI() {
  restartBtn.style.display = "block";
  gameover.style.display = "block";
  splashScreen.style.display = "none";
  canvas.style.display = "none";
  // mainAudio.pause();
  // gameoverAudio.play();
  intervalId = requestAnimationFrame(gameOverUI);
}

//draw baby
function drawBabyUpdate(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    babyFrame,
    frameX * frameWidth,
    frameY * frameHeight,
    frameWidth, //width
    frameHeight, //height
    canvasX,
    canvasY,
    adjustWidth, // scaledWidth
    adjustHeight // scaledHeight
  );
}
// move baby
function moveBaby() {
  //to keep track of number of frames
  frameCount++;

  if (frameCount < 7) {
    requestAnimationFrame(moveBaby);
    // return;
  }
  frameCount = 0;
  ctx.clearRect(545, 260, adjustWidth, adjustHeight);

  drawBabyUpdate(cycleLoop[currentLoopIndex], 0, 545, 260);
  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  // window.requestAnimationFrame(moveBaby);
}
//drawMother
function moveMother() {
  ctx.drawImage(mother1, motherX, motherY, mother1.width, mother1.height);

  if (isArrowRight && mother1.width + motherX < canvas.width + 50) {
    motherX += 5;
  }
  if (isArrowLeft && motherX + 50 > 0) motherX -= 5;

  if (isArrowUp) motherY -= 5;

  if (isArrowDown) motherY += 5;
}

// function moveEnemies() {
// }
function moveCloud() {
  //   animation conditions
  let countInterval = 50;
  let speedInterval = Math.floor(Math.random() * 0.5);
  for (let i = 0; i < clouds.length; i++) {
    countInterval += 10;
    speedInterval += 0.1;

    ctx.drawImage(
      cloud2,
      clouds[i].x,
      clouds[i].y + (cloud1.height + countInterval),
      200,
      140
    );

    ctx.drawImage(cloud1, clouds[i].x, clouds[i].y, 150, 100);
    ctx.drawImage(cloud3, clouds[i].x + 300, clouds[i].y + 100, 100, 70);

    if (clouds[i].y + cloud2.height < 0 || clouds[i].y + cloud1.height < 0) {
      clouds[i] = {
        x: Math.floor(Math.random() * 100),
        y: 200,
      };
    }
    clouds[i].y -= speedInterval;
  }
  // window.requestAnimationFrame(moveCloud);
}

//On -hold animate clouds for splash screen
function cloudAnimationSplash() {
  moveCloud();
  drawSplashUI();
}

//create firefireballs
function createFireball() {
  if (isSpaceKey && fire) {
    fireballWhoosh.play();
    fireballs.push({
      x: motherX,
      y: motherY,
    });
    isSpaceKey = false;
    fire = false;
  }
}
function drawFireball() {
  for (let i = 0; i < fireballs.length; i++) {
    ctx.drawImage(fireball, fireballs[i].x + 30, fireballs[i].y - 20, 20, 30);
    fireballs[i].y -= incrBall;
    if (fireballs[i].y < 150) {
      fireballs.splice(i, 1);
      fire = true;
    }
  }
}
function randomSize() {
  let rw = Math.floor(Math.random() * 80) + 20;
  let rh = rw * 1.4;
  return [rw, rh];
}

function moveEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    ctx.drawImage(
      enemy1,
      enemies[i].x,
      enemies[i].y,
      enemy1.width,
      enemy1.height
    );

    enemies[i].y++;
    if (enemies[i].y == enemy1.height / 2) {
      initalSize = randomSize();
      enemies.push({
        x: Math.floor(Math.random() * (canvas.width - enemy1.width)),
        y: -enemy1.height,
        width: initalSize[0],
        height: initalSize[1],
      });
    }
    if (enemies[i].y == canvas.height + 2) {
      enemies.shift();
      score--;
      console.log(score);
    }
  }
}
// Collision
function collision() {
  for (let i = 0; i < enemies.length; i++) {
    if (
      motherX < enemies[i].x + enemies[i].width &&
      motherX + mother1.width > enemies[i].x &&
      motherY < enemies[i].y + enemies[i].height &&
      motherY + enemies[i].height > enemies[i].y
    ) {
      isGameOver = true;
    }

    for (let j = 0; j < fireballs.length; j++) {
      if (
        fireballs[j].x + 10 < enemies[i].x + enemies[i].width &&
        fireballs[j].x + fireball.width > enemies[i].x &&
        fireballs[j].y + 10 < enemies[i].y + enemies[i].height &&
        fireballs[j].y + enemies[i].height > enemies[i].y
      ) {
        fireballs.splice(j, 1);
        enemies.splice(i, 1);
        fire = true;
        score++;
        console.log(score);
        if (enemies.length <= 0) {
          initalSize = randomSize();
          enemies.push({
            x: Math.floor(Math.random() * (canvas.width - enemy1.width)),
            y: -enemy1.height,
            width: initalSize[0],
            height: initalSize[1],
          });
        }
      }
    }
  }
}

//----MAINGAME putting it all together-----
function mainGameOnStart() {
  drawMainUi();
  moveCloud();
  moveBaby();
  moveMother();
  createFireball();
  drawFireball(); //firefireballs
  moveEnemies(); // making the enemies moves
  collision(); //all collisions

  //define GameOver
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    gameOverUI();
  } else {
    intervalId = requestAnimationFrame(mainGameOnStart);
  }
}

window.addEventListener("load", () => {
  drawSplashUI();
  // gameOverUI();

  restartBtn.addEventListener("click", () => {
    mainGameOnStart();
  });
  //restart button-- still to implement click within the button image on canvas
  startBtn.addEventListener("click", () => {
    mainGameOnStart();
  });

  //start button
});
scoreText.innerText = `Score : ${score}`;
