class Character {

  constructor () {
    this.horizontalMaxSpeed = 5;
    this.verticalMaxSpeed = 6;
    this.gravity = 9.8;

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
  accelerate(dir, level) {
      switch (dir) {
        case "LEFT":
        if (this.velocity.x > -this.horizontalMaxSpeed) {
            this.velocity.x--;
        }
        break;
        case "RIGHT":
        if (this.velocity.x < this.horizontalMaxSpeed) {
            this.velocity.x++;
        }
        break;
        case "UP":
        if (isObstructed(level, this.position.x, this.position.y + this.height + 0.1) || isObstructed(level, this.position.x + this.width, this.position.y + this.height + 0.1)) {
            this.velocity.y = -this.verticalMaxSpeed;
        } else {
            this.velocity.y = this.velocity.y + (this.gravity - this.velocity.y) * 0.02;
        }
        break;
        case "DOWN":
        if (this.velocity.y < this.horizontalMaxSpeed) {
            this.velocity.y++;
        }
        case "HORIZONTAL":
        this.velocity.x = 0.5 * this.velocity.x;
        break;
        case "VERTICAL":
        this.velocity.y = this.velocity.y + (this.gravity - this.velocity.y) * 0.05;
        break;
    }

}

  //move adds velocity to the character in the given direction
  move(level) {
      //this.position.x += this.velocity.x;

      let x = this.position.x + this.velocity.x;
      let y = this.position.y + this.velocity.y;

      if (!isObstructed(level, x + (this.width / 2), y) && !isObstructed(level, x + (this.width / 2), y + this.height)) {
          this.position.y = y;
      } else {
          this.position.y = Math.round(y/GRID_SIZE) * GRID_SIZE;
          this.velocity.y = 0;
      }

      if (!isObstructed(level, x, y + (this.height / 2)) && !isObstructed(level, x + this.width, y + (this.height / 2))) {
          this.position.x = x;
      } else {
          this.position.x = Math.round(x/GRID_SIZE) * GRID_SIZE;
          this.velocity.x = 0;
      }
  }

  //draw the character
  draw(ctx) {
    //draw the character
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
