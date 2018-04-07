class Character {

  constructor () {
    this.maxSpeed = 10;

    this.acceleration = 2;

    this.velocity = {
      x = 0,
      y = 0
    }

    this.position = {
      x = 0,
      y = 0
    }

    this.hp = 10;
  }

  //move add velocity to the character in the given direction
  function move(dir) {
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
}
