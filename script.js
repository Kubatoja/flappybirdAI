const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 620;

const bird = new Bird();
const pipes = [];
var isAlive = true;
const pipesCount = 200;
for (let i = 0; i < pipesCount; i++) {
  pipes.push(new Pipe(i));
}

animate();

var playerAnimationState = 1;
setInterval(() => {
  playerAnimationState++;
  if (playerAnimationState == 3) {
    playerAnimationState = 0;
  }
}, 100);

function displayScore() {
  ctx.font = "60px minecraft";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  let txt = bird.score;
  let x = canvas.width / 2 - 25;
  let y = 90;
  // setup these to match your needs
  ctx.miterLimit = 2;
  ctx.lineJoin = "circle";

  // draw an outline, then filled
  ctx.lineWidth = 10;
  ctx.strokeText(txt, x, y);
  ctx.lineWidth = 1;
  ctx.fillText(txt, x, y);
}

function animate(time) {
  canvas.height = window.innerHeight * 0.9;

  bird.draw(playerAnimationState);
  bird.update();

  pipes.forEach((pipe) => {
    pipe.draw();
    pipe.update();
    if (pipe.isPassed(bird)) {
      bird.score++;
    }

    if (pipe.colliding(bird)) {
      // isAlive = false;
    }
  });

  if (!isAlive) {
    window.location.reload();
    bird = 0;
  }
  displayScore();
  requestAnimationFrame(animate);
}
