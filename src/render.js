var RenderEngine = function () {
  let ctx;

  function init() {
    ctx = document.getElementById('canvas').getContext('2d');
  }

  function render(character, level) {

    ctx.fillRect(character.position.x, character.position.y, GRID_SIZE, 2 * GRID_SIZE);
  }

  return {
    init: init,
    render: render
  }
}();
