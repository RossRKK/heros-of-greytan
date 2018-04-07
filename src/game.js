const GRID_SIZE = 120;

$(function () {
  Game.init();
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
    RenderEngine.init();

    character = new Character();

    update();
  }

  //update the state of the game
  function update() {


    RenderEngine.render(character, level);
  }

  function isALive() {
      if (character.hp === 0) {
          return false;
      } else {
          return true;
      }
  }

  function hasEnded() {

  }

  function gameLoop() {
      while (isAlive() && !hasEnded()) {
          character.move();
      }
  }



  return {
    init: init
  }
}();
