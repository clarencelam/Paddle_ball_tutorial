import { detectCollision } from "./collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("ball_img");
    // refactor of code in index.js "let imgBall = document.getElementById("ball_img");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.size = 40;

    this.reset();
  }

  reset() {
    this.position = { x: 10, y: 10 };
    this.speed = { x: 3, y: 5 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
    //draws ball image to game. posx posy sizeh sizew
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    //checks if ball hits wall on left or right:
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //checks if ball hits wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    // Checks if ball hit bottom of screen
    if (this.position.y + this.size >= this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
