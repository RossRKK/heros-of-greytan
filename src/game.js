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

  grass = new GridCell("green", "textures/grass2.png", true, false);
  water = new GridCell("green", "textures/water.png", false, true);
  tower = new GridCell("green", "textures/tower.png", true, false);
  tree = new GridCell("#68a2ff", "textures/tree.png", true, false);
  upsideDownMask = new MaskCell("#68a2ff", false, false, "UDM");
  speedMask = new MaskCell("#68a2ff", false, false, "SM");
  grappleMask = new MaskCell("68a2ff", false, false, "GG");

  let level = {
    background: "#68a2ff",
    grid: [[upsideDownMask, null, null, tower, tower, tower, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, grass, grass],
           [grappleMask, null, null, null, tree, grass, grass],
           [null, null, null, null, null, grass, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [speedMask, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, water],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, grass],
           [null, null, null, null, null, null, grass]]
  }

  function changeLevel(xClick, yClick) {
      // alert(xClick);
      // alert(yClick);
      // alert(RenderEngine.getTranX());
      if (xClick > RenderEngine.getTranX() && yClick > RenderEngine.getTranY()) {
          let bounds = document.getElementById("canvas").getBoundingClientRect();

          xClick = xClick - RenderEngine.getTranX() - bounds.left;
          yClick = yClick - RenderEngine.getTranY() - bounds.top;

          blockXPos = Math.floor(xClick / GRID_SIZE);
          blockYPos = Math.floor(yClick / GRID_SIZE);

          /*alert(xClick);
          alert(blockXPos);*/

          level.grid[blockXPos][blockYPos] = grass;
      }
  }

  function getMousePos(event) {
      changeLevel(event.clientX, event.clientY);
  }

  document.addEventListener("click", getMousePos);

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
    name =  adjectives[Math.floor(Math.random()*adjectives.length)] + " " + nouns[Math.floor(Math.random()*nouns.length)];

    $("title").html(name);
    $("#title").text(name);

    setTimeout(genName, 5000);
  }

  //initialise the game
  function init() {
    genName();

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
      if (character.hp <= 0) {
          return false;
      } else {
          return true;
      }
  }

  function hasEnded() {
      return false;
  }

  let canSwap = true;

  function switchMask(level, character) {
      tile = getTile(level, character.position.x + (GRID_SIZE / 2), character.position.y + (GRID_SIZE / 2));

      if (tile && canSwap) {
          switch (tile.mask) {
            case "UDM":
                swap(tile, character);
                return new upsideDownMan(character);
            case "SM":
                swap(tile, character);
                return new speedMan(character);
            case "GG":
                swap(tile, character);
                return new grappleGuy(character);
            default:
                return character;
          }
      } else {
          return character;
      }
  }

  function swap(tile, character) {
      tile.setMask(character.mask);
      canSwap = false;

      setTimeout(function(){canSwap = true}, 1000);
  }

  //update the state of the game
  function update() {
      let keyTracker = Events.getKeyTracker();
      character.updatePosition(keyTracker, level);
      character.move(level);
      character = switchMask(level, character);

      // RenderEngine.render(character, level);

      if (isAlive() && !hasEnded()) {
          setTimeout(update, 10);
      } else {
        RenderEngine.drawDeath(character);
      }
  }



  return {
    init: init,
    getCharacter: function () { return character },
    getLevel: function () { return level }
  }
}();
