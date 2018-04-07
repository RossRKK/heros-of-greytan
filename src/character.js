class Character {

  constructor () {
    this.maxSpeed = 10;

    //Either -1, 0 or 1
    this.acceleration = {
        x: 0,
        y: 0
    }

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
        if (this.acceleration.x > -1) {
            this.acceleration.x--;
        }
        break;
        case "RIGHT":
        if (this.acceleration.x < 1) {
            this.acceleration.x++;
        }
        break;
        case "UP":
        if (this.acceleration.y > -1) {
            this.acceleration.y--;
        }
        break;
        case "DOWN":
        if (this.acceleration.y < 1) {
            this.acceleration.y++;
        }
        case "HORIZONTAL":
        if (-0.5 < this.velocity.x < 0.5) {
            this.velocity.x = 0;
            this.acceleration.x = 0;
        }
        else if (this.velocity.x > 0) {
            this.acceleration.x = -1;
        }
        else if (this.velocity.x < 0) {
            this.acceleration.x = 1;
        }
        break;
    }

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    if (this.velocity.x > this.maxSpeed) {
        this.velocity.x = this.maxSpeed;
    }
    else if (this.velocity.x < -this.maxSpeed) {
        this.velocity.x = -this.maxSpeed;
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
