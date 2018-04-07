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

  //Assumes game loop every 0.1 secs
  //Accelerates to full speed from nothing in 1 seconds
  accelerate(dir) {
      switch (dir) {
        case "LEFT":
        if (this.acceleration.x < 1) {
            this.acceleration.x--;
        }
        break;
        case "RIGHT":
        if (this.acceleration.x > -1) {
            this.acceleration.x++;
        }
        break;
        case "UP":
        if (this.acceleration.y < 1) {
            this.acceleration.y--;
        }
        break;
        case "DOWN":
        if (this.acceleration.y > -1) {
            this.acceleration.y++;
        }
        break;
    }

}

  //move adds velocity to the character in the given direction
  move(dir) {
    switch (dir) {
      case "LEFT":
        accelerate(dir);
        this.velocity.x += this.acceleration.x;
        this.position.x += this.velocity.x;
        break;
      case "RIGHT":
        accelerate(dir);
        this.velocity.x += this.acceleration.x;
        this.position.x += this.velocity.x;
        break;
      case "UP":
        accelerate(dir);
        this.velocity.y += this.acceleration.y;
        this.position.y += this.acceleration.y;
        break;
      case "DOWN":
        accelerate(dir);
        this.velocity.y += this.acceleration.y;
        this.position.y += this.acceleration.y;
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
