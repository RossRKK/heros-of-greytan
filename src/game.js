const GRID_SIZE = 60;

$(function () {
  RenderEngine.init();
  Game.init();
  Events.init();
});

var Game = function () {
  //the character the player is playing as
  let character;

  let name;

  grass = new GridCell("green", "textures/grass.png", true);
  water = new GridCell("green", "textures/water.png", false);
  tower = new GridCell("green", "textures/tower.png", true);
  tree = new GridCell("#68a2ff", "textures/tree.png", true);

  let level = {
    background: "#68a2ff",
    grid: [[tower, tower, tower, grass],
           [null, null, null, grass],
           [null, null, null, grass],
           [null, null, tree, grass],
           [null, null, null, grass],
           [null, null, null, grass],
           [null, null, null, water],
           [null, null, null, water]]
  }

  let adjectives = [
      "Authority",
      "Honesty",
      "Integrity",
      "Truth",
      "Lawfulness",
      "Fairness",
      "Reasonableness",
      "Legality",
      "Equality",
      "Impartiality",
      "Rectitude"
  ];

  let nouns = [
      "Club",
      "Company",
      "Group",
      "Organisation",
      "Society",
      "Association",
      "Federation",
      "Alliance",
      "Guild",
      "Mob",
      "Consortium",
      "Confederation",
      "Coalition",
      "Crew",
      "Creed"
  ];

  //generate the name of the game
  function genName() {
    return adjectives[Math.floor(Math.random()*adjectives.length)] + " " + nouns[Math.floor(Math.random()*nouns.length)];
  }

  //initialise the game
  function init() {
    name = genName();

    $("title").html(name);
    $("#title").text(name);

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
          character.accelerate("LEFT", level);
      }
      if (keyTracker.right) {
          character.accelerate("RIGHT", level);
      }
      if (!keyTracker.left && !keyTracker.right) {
          character.accelerate("HORIZONTAL", level);
      }
      if (keyTracker.up) {
          character.accelerate("UP", level);
      }
      if (keyTracker.down) {
          character.accelerate("DOWN", level);
      }
      if (!keyTracker.up && !keyTracker.down) {
        character.accelerate("VERTICAL", level);
      }
      character.move(level);

      // RenderEngine.render(character, level);

      if (isAlive() && !hasEnded()) {
          setTimeout(update, 10);
      }
  }



  return {
    init: init
  }
}();
