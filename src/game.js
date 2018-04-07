const GRID_SIZE = 120;

$(function () {
  RenderEngine.init();
  Game.init();
  Events.init();
});

var Game = function () {
  //the character the player is playing as
  let character;

  let level = {
    background: "#68a2ff",
    grid: [[null, new GridCell("green", "textures/grass.png")], [null, new GridCell("green", "textures/grass.png")], [null, new GridCell("green", "textures/grass.png")]]
  }

  //generate the name of the game
  function genName() {
    return "Justness Guild";
  }

  //initialise the game
  function init() {

    character = new Character();

    update();
    renderGame();
  }

  //render the game
  function renderGame() {
      RenderEngine.render(character, level);
      window.requestAnimationFrame(renderGame);
  }

  function isAlive() {
      if (character.hp = 0) {
          return false;
      } else {
          return true;
      }
  }

  function hasEnded() {
      return false;
  }

  //update the state of the game
  function update() {
      let keyTracker = Events.getKeyTracker();
      if (keyTracker.left) {
          character.accelerate("LEFT");
      }
      if (keyTracker.right) {
          character.accelerate("RIGHT");
      }
      if (!keyTracker.left && !keyTracker.right) {
          character.accelerate("HORIZONTAL");
      }
      if (keyTracker.up) {
          character.accelerate("UP");
      }
      if (keyTracker.down) {
          character.accelerate("DOWN");
      }
      character.move();

      // RenderEngine.render(character, level);

      if (isAlive() && !hasEnded()) {
          setTimeout(update, 10);
      }
  }



  return {
    init: init
  }
}();
