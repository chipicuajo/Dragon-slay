let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";

let bg = new Image();
bg.src = "./assets/playscreen.png";

function draw() {
  // adding background image
  ctx.drawImage(bg, 0, 0);
}

window.addEventListener("load", () => {
  //     audio.play()
  //    // audio.pause()
  draw();
});
