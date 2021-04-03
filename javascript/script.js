let canvas = document.getElementById("myCanvas");
canvas.style.border = "2px solid black";
let ctx = canvas.getContext("2d");

let startBtn = document.querySelector("#start");
let splashScreen = document.querySelector("#splashscreen");
let restartBtn = document.querySelector("#restart");
let gameover = document.querySelector("#gameover");
let score = document.querySelector("#score");

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

function draw() {
  // adding background image
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
  startBtn.style.display = "none";
  gameover.style.display = "none";

  ctx.drawImage(splashImg, 0, 0);
  animateClouds();
}

let clouds = [
  { x: 50, y: 0 },
  { x: 200, y: -60 },
];
function animateClouds() {
  ctx.drawImage(cloud1, 50, 0, 150, 100);
  ctx.drawImage(cloud2, 200, 60, 260, 140);
}

function gameOverUI() {
  splashScreen.style.display = "none";
  restartBtn.style.display = "block";
  startBtn.style.display = "none";
  score.style.display = "none";
  gameover.style.display = "block";
  ctx.drawImage(gameOverScreen, 0, 0);
}

window.addEventListener("load", () => {
  //     audio.play()
  //   start();
  //   draw();

  //   gameOverUI();
  splashUI();
});
