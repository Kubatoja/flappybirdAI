class Pipe {
  constructor(id) {
    this.x = canvas.width;
    this.y = Math.floor(Math.random() * canvas.height);
    this.width = 100;
    this.height = 300;
    this.speed = 1;
    this.passed = false;
    this.id = id;
    this.spacing = 500;

    this.#pipeImgLoad();
  }

  #pipeImgLoad() {
    this.pipeUpImg = new Image();
    this.pipeUpImg.src = "./img/pipeUp.png";
    this.pipeDownImg = new Image();
    this.pipeDownImg.src = "./img/pipeDown.png";
    this.pipeDownImg.onload = () => {
      this.imgLoaded = true;
    };
  }
  update() {
    this.x -= this.speed;
  }

  draw() {
    ctx.drawImage(
      this.pipeUpImg,
      this.x + this.spacing * this.id,
      this.y + 200,
      this.width,
      this.height
    );
    ctx.drawImage(
      this.pipeDownImg,
      this.x + this.spacing * this.id,
      this.y + 200 + this.height,
      this.width,
      canvas.height + 20
    );
    ctx.drawImage(
      this.pipeDownImg,
      this.x + this.spacing * this.id,
      this.y,
      this.width,
      -this.height
    );
    ctx.drawImage(
      this.pipeUpImg,
      this.x + this.spacing * this.id,
      -100,
      this.width,
      this.y
    );
  }
  colliding(bird) {
    if (
      bird.x - bird.width / 2 < this.x + this.width + this.spacing * this.id &&
      bird.x + bird.width / 2 > this.x + this.spacing * this.id &&
      (bird.y - bird.height / 2 < this.y ||
        bird.y + bird.height / 2 > this.y + 200)
    ) {
      return true;
    }
    return false;
  }
  isPassed(bird) {
    if (bird.x > this.x + 500 * this.id + this.width && !this.passed) {
      this.passed = true;
      return true;
    }
    return false;
  }
}
