class Sensors {
  constructor(pipes) {
    this.sensorsCount = 9;
    this.raySpread = 25;
    this.rayLength = 400;
    this.rays = [];

    this.#generateRays();
  }
  #generateRays() {
    for (
      let i = -((this.sensorsCount - 1) / 2);
      i <= (this.sensorsCount - 1) / 2;
      i++
    ) {
      this.rays.push(new Ray(i * this.raySpread, this.rayLength));
    }
  }

  detectCollision(index) {
    this.rays.forEach((ray) => {
      ray.detectCollision(index);
    });
  }
  draw() {
    this.rays.forEach((ray) => {
      ray.draw();
    });
  }
}

class Ray {
  constructor(angle, defaultLength) {
    this.angle = angle * -(Math.PI / 180);
    this.defaultLength = defaultLength;

    this.length = this.defaultLength;
    this.x = 0;
    this.y = 0;
    this.color = "red";
  }

  detectCollision(index) {
    let closestPipe = pipes[index];

    let pipeLeft = pipes[0].x + pipes[0].spacing * index;
    let pipeRight = pipeLeft + closestPipe.width;
    let pipeTop = closestPipe.y;
    let pipeBottom = closestPipe.y + 200;

    let startX = bird.x;
    let startY = bird.y;
    this.x = bird.x + Math.cos(this.angle) * this.length;
    this.y = bird.y + Math.sin(this.angle) * this.length;

    let line = { startX, startY, endX: this.x, endY: this.y };
    let intersectionPointsTop = lineIntersectsRectangle(
      line,
      pipeLeft,
      0,
      pipeRight,
      pipeTop
    );
    let intersectionPointsBottom = lineIntersectsRectangle(
      line,
      pipeLeft,
      pipeBottom,
      pipeRight,
      canvas.height
    );

    if (intersectionPointsTop) {
      this.x = intersectionPointsTop[0].x;
      this.y = intersectionPointsTop[0].y;
    }
    if (intersectionPointsBottom) {
      this.x = intersectionPointsBottom[0].x;
      this.y = intersectionPointsBottom[0].y;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.moveTo(bird.x, bird.y);
    ctx.lineTo(this.x, this.y);
    ctx.fillRect(this.x - 3, this.y - 3, 6, 6);
    ctx.stroke();
  }
}
