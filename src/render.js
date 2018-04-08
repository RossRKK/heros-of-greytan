var RenderEngine = function () {
    const CANVAS_WIDTH = 1280;
    const CANVAS_HEIGHT = 720;

    let ctx;
    let tranX;
    let tranY;

    let backgroundImg = document.createElement("img");

    function init() {
        ctx = document.getElementById('canvas').getContext('2d');
        backgroundImg.src = "textures/void.png";
    }

    //render the level
    function render(character, level) {
        //clear the screen
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.fillStyle = "#CCCCCC";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.drawImage(backgroundImg, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.save();

        //translate the canvas so that the character always appears in the middle
        tranX = -character.position.x + (CANVAS_WIDTH / 2);
        tranY = -character.position.y + (CANVAS_HEIGHT / 2);

        ctx.translate(tranX, tranY);

        //draw the level
        drawLevel(level, character.hp);

        //draw the character
        character.draw(ctx);

        character.drawHUD(ctx, level);
        ctx.restore();

        if (Game.isEditing()) {
            drawBlockOptions();
        }
    }

    var zoomFlag;

    function drawLevel(level) {
        //draw a background
        ctx.fillStyle = level.background;
        ctx.fillRect(0, 0, level.grid.length * level.GRID_SIZE, level.grid[0].length * GRID_SIZE);

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
            ctx.moveTo(i * level.GRID_SIZE, 0);
            ctx.lineTo(i * level.GRID_SIZE, level.grid[0].length * GRID_SIZE);
        }

        for (let i = 0; i <= level.grid[0].length; i ++) {
            ctx.moveTo(0, i * level.GRID_SIZE);
            ctx.lineTo(level.grid.length * level.GRID_SIZE, i * level.GRID_SIZE);
        }
        ctx.stroke();
    }

    function drawBlockOptions() {
        const margin = 20;
        ctx.fillStyle = "#919191";
        ctx.fillRect(CANVAS_WIDTH - GRID_SIZE - (2 * margin), 0, GRID_SIZE + (2 * margin), CANVAS_HEIGHT);
        for (let i = 0; i < Game.getBlocks().length; i++) {
            try {
            ctx.drawImage(Game.getBlocks()[i].img, CANVAS_WIDTH - GRID_SIZE - margin, (margin + (i * (GRID_SIZE + margin))), GRID_SIZE, GRID_SIZE);
        } catch (Ex) {
            //shut up
        }
        }
    }

    function drawDeath(character) {
      alert("You died");
      //Game.init();
      location.reload();
    }

    return {
        init: init,
        render: render,
        getTranX: function () { return tranX },
        getTranY: function () { return tranY },
        drawDeath: drawDeath
    }
}();
RenderEngine.init();
