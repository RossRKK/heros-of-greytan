const GRID_SIZE = 120;

var Game = function () {
  //the character the player is playing as
  let character;

  let level;

  //generate the name of the game
  function genName() {
    return "Justness Guild";
  }

  //initialise the game
  function init() {
    character = new Character();
  }

  //update the state of the game
  function update() {


    render();
  }

  return {
    init: init
  }
}();
