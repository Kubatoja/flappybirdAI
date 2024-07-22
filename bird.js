class Bird {
  constructor() {
    this.x = 100;
    this.y = 200;
    this.vy = 0;
    this.width = 70;
    this.height = 45;
    this.maxSpeed = 2.5;
    this.spacePressed = false;
    this.angle = 0;
    this.maxAngle = 25;
    this.birdImages = [];
    this.delay = 0;
    this.score = 0;
    this.sensor = new Sensors();

    this.#birdImagesLoad();
  }

  #birdImagesLoad() {
    this.birdUp = new Image();
    this.birdMid = new Image();
    this.birdDown = new Image();
    this.imgLoaded = false;
    Promise.all([
      new Promise((resolve) => {
        this.birdUp.onload = resolve;
        this.birdUp.src = "img/birdUp.png"; // Set the correct path
        this.birdImages.push(this.birdUp);
      }),
      new Promise((resolve) => {
        this.birdMid.onload = resolve;
        this.birdMid.src = "img/birdMid.png"; // Set the correct path
        this.birdImages.push(this.birdMid);
      }),
      new Promise((resolve) => {
        this.birdDown.onload = resolve;
        this.birdDown.src = "img/birdDown.png"; // Set the correct path
        this.birdImages.push(this.birdDown);
      }),
    ]).then(() => {
      this.imgLoaded = true;
    });
  }

  update() {
    this.#jump();
    if (this.y <= 10) {
      this.y = 10;
      this.vy = 1;
    }
    if (this.y + this.height >= canvas.height + 8) {
      this.y = canvas.height - this.height + 8;
      // this will loose the game
    }
    if (this.vy < this.maxSpeed) {
      this.vy += 0.1;
    }
    this.y += this.vy;
  }
  draw(playerAnimationState) {
    this.#fall();
    this.sensor.draw(this.x, this.y);
    this.sensor.detectCollision(this.score);

    if (this.imgLoaded) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);

      ctx.drawImage(
        this.birdImages[playerAnimationState],
        0 - this.width / 2,
        0 - this.height / 2,
        this.width,
        this.height
      );
      ctx.restore();
    }
  }

  #jump() {
    document.onkeydown = (e) => {
      if (e.key == " " && !this.spacePressed) {
        this.vy = -4;
        this.spacePressed = true;
        this.delay = 0;
      }
    };
    document.onkeyup = (e) => {
      if (e.key == " ") {
        this.spacePressed = false;
        this.angle = 0;
      }
    };
  }

  #fall() {
    if (this.angle >= 90) {
      this.delay = 0;
      this.maxSpeed = 4;
    } else {
      this.maxSpeed = 2.5;
    }

    if (this.vy < 1.5) {
      this.angle = -25;
    } else if (this.vy >= 1.5) {
      if (this.angle < 90) {
        this.delay++;
        if (this.delay >= 50) {
          this.angle += 5;
        }
      }
    }
  }
}
