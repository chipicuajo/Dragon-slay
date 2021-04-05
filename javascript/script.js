let canvas = document.getElementById("myCanvas");
canvas.style.border = "2px solid blue";
let ctx = canvas.getContext("2d");

let startBtn = document.querySelector("#start");
let splashScreen = document.querySelector("#splashscreen");
let restartBtn = document.querySelector("#restart");
let gameover = document.querySelector("#gameover");
let gameoverInnerText = document.querySelector("#gameover h3");
gameoverInnerText.style.display = "none";
let scoreText = document.querySelector("#score");
let instr_Text = document.querySelector("#instructions");

let cloud1 = new Image();
cloud1.src = "./assets/cloud1.png";

let cloud2 = new Image();
cloud2.src = "./assets/cloud2.png";

let playscreen = new Image();
playscreen.src = "./assets/playscreen.png";

let splashTypo = new Image();
splashTypo.src = "./assets/typo-splash.png";

let gameOverScreen = new Image();
gameOverScreen.src = "./assets/gameover.png";

let enemy1 = new Image(150, 150);
enemy1.src = "./assets/enemy1.png";

let enemy2 = new Image(150, 150);
enemy2.src = "./assets/enemy2.png";

let mother1 = new Image();
mother1.src = "./assets/mother1.png";

let motherFrame = new Image();
motherFrame.src = "./assets/motherframe.png";

let babyFrame = new Image();
babyFrame.src = "./assets/babyframe.png";

let wingsAudio = new Audio("./assets/wings-sound.wav");
wingsAudio.loop = "true";

let gameoverAudio = new Audio("./assets/gameover-sound.wav");

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
// Enemies cordinates
let enemies = [
  { x: 100, y: -5 },
  { x: 400, y: 15 },
];
//Variables for drawMother()
let motherHeight = 180,
  motherWidth = 180,
  motherX = 100,
  motherY = 600,
  incrX = 2,
  incrY = 2;
let isArrowUp = false,
  isArrowRight = false,
  isArrowLeft = false,
  isArrowDown = false;

//----EVENT LISTENERS for MOTHER Dragon movements---
document.addEventListener("keydown", (event) => {
  if (event.code == "ArrowRight") {
    isArrowRight = true;
    isArrowLeft = false;
    isArrowUp = false;
    isArrowDown = false;
  } else if (event.code == "ArrowLeft") {
    console.log("pressing left");
    isArrowLeft = true;
    isArrowRight = false;
    isArrowUp = false;
    isArrowDown = false;
  } else if (event.code == "ArrowUp") {
    isArrowUp = true;
    isArrowRight = false;
    isArrowLeft = false;
    isArrowDown = false;
  } else if (event.code == "ArrowDown") {
    isArrowDown = true;
    isArrowUp = false;
    isArrowRight = false;
    isArrowLeft = false;
  }
});

//main screen
function drawMainUi() {
  splashScreen.style.display = "none";
  gameover.style.display = "none";

  ctx.drawImage(playscreen, 0, 0);
  // move();
  // mainAudio.play();
}
//splash screen
function drawSplashUI() {
  startBtn.style.display = "block";
  restartBtn.style.display = "none";
  gameover.style.display = "none";

  ctx.drawImage(playscreen, 0, 0);
  ctx.drawImage(splashTypo, 0, 100);
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
  // ctx.clearRect(545, 245, adjustWidth, adjustHeight);

  drawBabyUpdate(cycleLoop[currentLoopIndex], 0, 545, 260);
  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  // window.requestAnimationFrame(moveBaby);
}
//drawMother
function moveMother() {
  ctx.drawImage(mother1, motherX, motherY, motherWidth, motherHeight);

  if (isArrowRight && motherWidth + motherX < canvas.width + 50) {
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

    if (clouds[i].y + cloud2.height < 0 || clouds[i].y + cloud1.height < 0) {
      clouds[i] = {
        x: Math.floor(Math.random() * 100),
        y: 200,
      };
    }
    clouds[i].y -= speedInterval;
  }
}

function cloudAnimationSplash() {
  drawSplashUI();
  moveCloud();
  window.requestAnimationFrame(cloudAnimationSplash);
}
//----MAINGAME putting it all together-----
function mainGameOnStart() {
  drawMainUi();
  moveCloud();
  moveBaby();
  moveMother();
  // moveEnemies();
  let printNextAt = 200;

  // making the enemies moves
  for (let i = 0; i < enemies.length; i++) {
    ctx.drawImage(
      enemy1,
      enemies[i].x + printNextAt,
      enemies[i].y,
      enemy1.width,
      enemy1.height
    );
    ctx.drawImage(
      enemy2,
      enemies[i].x,
      enemies[i].y + printNextAt,
      enemy2.width,
      enemy2.height
    );
    enemies[i].y = enemies[i].y + 2;

    // if (enemies[i].x == 20) {
    //     score++
    // }

    //collision
    if (enemies[i].y + enemy1.height >= motherY - motherHeight) {
      isGameOver = true;
      // gameOverScreen();
    }

    // infinite loop for the enemies
    if (enemies[i].y + enemy1.height > canvas.height + 200) {
      enemies[i] = {
        x: Math.floor(Math.random() * 400),
        y: -100,
      };
    }
  }
  //define GameOver
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    gameOverUI();
  } else {
    intervalId = requestAnimationFrame(mainGameOnStart);
  }
}

function collision() {}

//finished gameover UI-MVP done
function gameOverUI() {
  // gameoverInnerText.style.display = "none";
  restartBtn.style.display = "block";
  splashScreen.style.display = "none";
  startBtn.style.display = "none";

  ctx.drawImage(gameOverScreen, 0, 0);
  ctx.beginPath();
  ctx.font = "18px Verdana ";
  ctx.textAlign = "center";
  ctx.fillStyle = "#27273A";
  ctx.fillText(`${gameoverInnerText.innerText}`, 300, 580);
  ctx.closePath();
  gameoverAudio.play();
  intervalId = requestAnimationFrame(gameOverUI);
}

window.addEventListener("load", () => {
  cloudAnimationSplash();

  // gameOverUI();
  //start button
  startBtn.addEventListener("click", () => {
    mainGameOnStart();
  });

  //restart button
  restartBtn.addEventListener("click", () => {
    mainGameOnStart();
  });
});
