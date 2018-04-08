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
    }

    var zoomFlag;

    function drawHUD(character, level) {
        if (character.hp < 500 || character.hpBuffer < 150) {
            if (character.hp > 250) {
              ctx.fillStyle = "#ADFF2F";
            } else if (character.hp > 100) {
              ctx.fillStyle = "#FF4500";
            } else {
              ctx.fillStyle = "#000000";
            }
            ctx.fillRect(character.position.x, character.position.y - 10, level.GRID_SIZE * (character.hp / 500), 5);
        }
        if (character.mask !== null) {
            if (character.engagedBuffer < 500) {
                ctx.fillStyle = "#FF4500";
              } else {
                  ctx.fillStyle = "#ADFF2F";
              }
              ctx.fillRect(character.position.x -10, character.position.y + level.GRID_SIZE, 5, GRID_SIZE * (character.engagedBuffer) / 500);
            }

        if (character.engaged && character.mask === "SM") {
          zoom = document.createElement("img");
          zoom.src = "textures/Zoom!.png";
          if (zoomFlag) {
              ctx.drawImage(zoom, character.position.x - 30, character.position.y + 130);
          }
          setTimeout(function(){zoomFlag = false}, 500);
        }
        else if (!character.engaged && character.mask === "SM") {
            zoomFlag = true;
            ctx.fillStyle =  "#ADFF2F";
            ctx.fillRect(character.position.x -10, character.position.y + GRID_SIZE, 5, GRID_SIZE * (character.engagedBuffer) / 500);
        }
    }

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
