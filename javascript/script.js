let canvas = document.getElementById("myCanvas");
canvas.style.border = "2px solid blue";
let ctx = canvas.getContext("2d");
console.log(ctx);

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
motherFrame.width = "270";
motherFrame.height = "200";

let intervalId = 0;
let isGameOver = false;
let score = 0;
let request;

function draw() {
  // adding background image
  ctx.drawImage(playscreen, 0, 0);
}

function start() {
  playscreen.style.display = "block";
  splashScreen.style.display = "none";
  restartBtn.style.display = "none";
  restartBtn.style.display = "none";
  gameover.style.display = "none";
}
// Animated-clouds function for resuse with (mainUI & splashUI)
//finished UI-MVP
let clouds = [
  { x: 50, y: 250 },
  { x: 300, y: 400 },
];
let cloudAnimation = (callUI) => {
  let countInterval = 50;
  let speedInterval = Math.floor(Math.random() * 0.4);
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
        x: Math.floor(Math.random() * 10),
        y: 200,
      };
    }
    clouds[i].y -= speedInterval;
  }

  //   animation conditions
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
  } else {
    intervalId = requestAnimationFrame(callUI);
  }
};

//main screen
function mainUI() {
  splashScreen.style.display = "none";
  gameover.style.display = "none";

  ctx.drawImage(playscreen, 0, 0);
  cloudAnimation(mainUI);
  // mainAudio.play();
}
//splash screen
function splashUI() {
  startBtn.style.display = "block";
  restartBtn.style.display = "none";
  gameover.style.display = "none";

  ctx.drawImage(playscreen, 0, 0);
  ctx.drawImage(splashTypo, 0, 100);
  cloudAnimation(splashUI);
}

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
}
let x = 0,
  y = 0;
let srcX, srcY;
let sheetWidth = 749,
  sheetHeight = 495;
let cols = 2;

//motherFrame for imgae
let width = sheetWidth / cols;
let currentFrame = 0;

function updateFrame() {
  // ctx.clearRect(x, y, width, sheetHeight);
  currentFrame = ++currentFrame % cols;
  srcX = currentFrame * width;
  srcY = 0;
}

function drawMother() {
  updateFrame();

  ctx.drawImage(
    motherFrame,
    srcX,
    srcY,
    width,
    sheetHeight,
    x,
    y,
    width / 2,
    sheetHeight / 2
  );
  // requestAnimationFrame(drawMother);
}

// animate Mother Dragon
function animateMother() {
  drawMother();
  setTimeout(() => {
    request = requestAnimationFrame(animateMother);
  }, 500);

  // requestAnimationFrame(animateMother);
}

function AnimateAll() {}

//start button
startBtn.addEventListener("click", () => {});

//restart button
restartBtn.addEventListener("click", () => {});

function animateBaby() {
  ctx.drawImage(babyFrame, 0, 0, 173, 90, 0, 0, 173, 90);
}
window.addEventListener("load", () => {
  //     audio.play()
  //   start();
  //   draw();
  // gameOverUI();

  cloudAnimation(mainUI);

  animateBaby();

  // animateMother();
});
