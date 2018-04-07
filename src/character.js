class Character {

  constructor () {
    this.maxSpeed = 10;

    //Velocity = Length moved/game loop length
    this.velocity = {
      x: 0,
      y: 0
    }

    //Pixel coordinates
    this.position = {
      x: 0,
      y: 0
    }

    this.hp = 10;
  }

  //Game loops every 0.1 secs
  //Accelerates to full speed from nothing in 1 seconds
  accelerate(dir) {
      switch (dir) {
        case "LEFT":
        if (this.velocity.x > -this.maxSpeed) {
            this.velocity.x--;
        }
        break;
        case "RIGHT":
        if (this.velocity.x < this.maxSpeed) {
            this.velocity.x++;
        }
        break;
        case "UP":
        if (this.velocity.y > -this.maxSpeed) {
            this.velocity.y--;
        }
        break;
        case "DOWN":
        if (this.velocity.y < this.maxSpeed) {
            this.velocity.y++;
        }
        case "HORIZONTAL":
        this.velocity.x = 0.5 * this.velocity.x;
        break;
        case "VERTICAL":
        this.velocity.y = 0.5 * this.velocity.y;
    }

}

  //move adds velocity to the character in the given direction
  move(dir) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  }

  //draw the character
  draw(ctx) {
    //draw the character
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, GRID_SIZE, 2 * GRID_SIZE);
  }
}
