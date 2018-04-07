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
      x: 60,
      y: 60
    }

    this.hp = 10;

    this.height = GRID_SIZE * 2;
    this.width = GRID_SIZE;
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
  move(level) {
      this.position.x += this.velocity.x;

      let x = this.position.x + this.velocity.x;
      let y = this.position.y + this.velocity.y;

      if (!isObstructed(level, x, y) && !isObstructed(level, x + this.width, y)
        && !isObstructed(level, x, y + this.height) && !isObstructed(level, x + this.width, y + this.height)) {
          this.position.y = y;
      } else {
          this.position.y = Math.round(y/GRID_SIZE) * GRID_SIZE;
      }
  }

  //draw the character
  draw(ctx) {
    //draw the character
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
