class Character {

  constructor () {
    this.maxSpeed = 10;

    this.acceleration = 2;

    this.velocity = {
      x: 0,
      y: 0
    }

    this.position = {
      x: 0,
      y: -120
    }
  }

  //move add velocity to the character in the given direction
  move(dir) {
    switch (dir) {
      case "LEFT":
        this.velocity.x -= this.acceleration;
        break;
      case "RIGHT":
        this.velocity.x += this.acceleration;
        break;
      case "UP":
        this.velocity.y -= this.acceleration;
        break;
      case "DOWN":
        this.velocity.y += this.acceleration;
        break;
    }
  }

  //draw the character
  draw(ctx) {
    //draw the character
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, GRID_SIZE, 2 * GRID_SIZE);
  }
}
