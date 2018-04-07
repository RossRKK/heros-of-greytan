var RenderEngine = function () {
    const CANVAS_WIDTH = 1280;
    const CANVAS_HEIGHT = 720;

    let ctx;

    function init() {
        ctx = document.getElementById('canvas').getContext('2d');
    }

    //render the level
    function render(character, level) {
        //clear the screen
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.fillStyle = "#CCCCCC";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.save();

        //translate the canvas so that the character always appears in the middle
        ctx.translate(- character.position.x + (CANVAS_WIDTH / 2), -character.position.y + (CANVAS_HEIGHT / 2));

        //draw the level
        drawLevel(level, character.hp);

        //draw the character
        character.draw(ctx);

        drawHUD(character);
        ctx.restore();
    }

    function drawHUD(character) {
      if (character.hp < 500 || character.hpBuffer < 150) {
        if (character.hp > 250) {
          ctx.fillStyle = "#ADFF2F";
        } else if (character.hp > 100) {
          ctx.fillStyle = "#FF4500";
        } else {
          ctx.fillStyle = "#000000";
        }
        ctx.fillRect(character.position.x, character.position.y - 10, GRID_SIZE * (character.hp / 500), 5);
    }
    }

    function drawLevel(level) {
        //draw a background
        ctx.fillStyle = level.background;
        ctx.fillRect(0, 0, level.grid.length * GRID_SIZE, level.grid[0].length * GRID_SIZE);

        //draw the grid
        drawGrid(level);

        ctx.save();

        //draw the level details
        for (let i = 0; i < level.grid.length; i++) {
            for (let j = 0; j < level.grid[i].length; j++) {
                if (level.grid[i][j] !== null) {
                  level.grid[i][j].draw(ctx, i, j);
                }
            }
        }

        ctx.restore();
    }

    //draw a grid over the level
    function drawGrid(level) {
        ctx.beginPath();
        for (let i = 0; i <= level.grid.length; i ++) {
            ctx.moveTo(i * GRID_SIZE, 0);
            ctx.lineTo(i * GRID_SIZE, level.grid[0].length * GRID_SIZE);
        }

        for (let i = 0; i <= level.grid[0].length; i ++) {
            ctx.moveTo(0, i * GRID_SIZE);
            ctx.lineTo(level.grid.length * GRID_SIZE, i * GRID_SIZE);
        }
        ctx.stroke();
    }

    function drawDeath(character) {
      alert("You died");
      Game.init();
    }

    return {
        init: init,
        render: render,
        drawDeath: drawDeath
    }
}();
