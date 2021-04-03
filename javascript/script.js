let canvas = document.getElementById("myCanvas");
canvas.style.border = "2px solid blue";
let ctx = canvas.getContext("2d");

let startBtn = document.querySelector("#start");
let splashScreen = document.querySelector("#splashscreen");
let restartBtn = document.querySelector("#restart");
let gameover = document.querySelector("#gameover");
let scoreText = document.querySelector("#score");

let splashImg = new Image();
splashImg.src = "./assets/splash.png";

let cloud1 = new Image();
cloud1.src = "./assets/cloud1.png";

let cloud2 = new Image();
cloud2.src = "./assets/cloud2.png";

let playscreen = new Image();
playscreen.src = "./assets/playscreen.png";

let gameOverScreen = new Image();
gameOverScreen.src = "./assets/gameover.png";

let audio = new Audio("./assets/wings-sound.wav");
audio.loop = "true";

canvas.width = "600";
canvas.height = "800";

let intervalId = 0;
let isGameOver = false;
let score = 0;

function draw() {
  // adding background image
  ctx.drawImage(playscreen, 0, 0);
  ctx.drawImage(playscreen, 0, 0);
}

function start() {
  splashScreen.style.display = "none";
  playscreen.style.display = "block";
  restartBtn.style.display = "none";
  restartBtn.style.display = "none";
  gameover.style.display = "none";
}

function splashUI() {
  splashScreen.style.display = "block";
  restartBtn.style.display = "none";
  startBtn.style.display = "block";
  gameover.style.display = "none";

  ctx.drawImage(splashImg, 0, 0);
}

let clouds = [
  { x: 50, y: 200 },
  { x: 300, y: 400 },
];

function AnimateAll() {}

// Animted clouds function for resuse
function animateClouds() {
  splashUI();
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

    if (
      clouds[i].y + cloud1.height > splashImg.y + splashImg.height ||
      clouds[i].y + cloud2.height > splashImg.y + splashImg.height
    ) {
      clouds[i] = {
        x: 50,
        y: Math.floor(Math.random() * 10),
      };
    }
    clouds[i].y -= speedInterval;
  }

  //animate Mother Dragon
  function animateMother() {}

  //   animation conditions
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
  } else {
    intervalId = requestAnimationFrame(animateClouds);
  }
}

function gameOverUI() {
  splashScreen.style.display = "none";
  restartBtn.style.display = "block";
  startBtn.style.display = "none";
  score.style.display = "none";
  gameover.style.display = "block";

  ctx.drawImage(gameOverScreen, 0, 0);
}

//start button
startBtn.addEventListener("click", () => {});

//restart button
startBtn.addEventListener("click", () => {});

window.addEventListener("load", () => {
  //     audio.play()
  //   start();
  //   draw();
  //   gameOverUI();
  //   splashUI();
  //   audio.play();
  animateClouds();
});
