class GridCell {

    constructor (background, imgSrc, isSolid, isKillBlock) {
    this.background = background;

    this.img = document.createElement("img");
    this.img.src = imgSrc;

    this.isSolid = isSolid;
    this.isKillBlock = isKillBlock;
  }

  //draw the grid cell
  draw(ctx, x, y) {
      //draw an image if it's available
      if (this.img.src) {
        ctx.drawImage(this.img, x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      } else {
          ctx.fillStyle = this.background;
          ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }
  }
}

function isObstructed(level, x, y) {
    let tile = getTile(level, x, y);
    if (tile === undefined) return true;
    if (tile === null) return false;
    return tile.isSolid;
}

function getTile(level,x , y) {
    let gridX = Math.floor(x / GRID_SIZE);
    let gridY = Math.floor(y / GRID_SIZE);

    if (gridX >= 0 && gridX < level.grid.length && gridY >= 0 && gridY < level.grid[gridX].length) {
        return level.grid[gridX][gridY];
    } else {
        return undefined;
    }
}

function isHurt(level, x, y) {
  let gridX = Math.floor(x / GRID_SIZE);
    let gridY = Math.floor(y / GRID_SIZE);

    if (gridX >= 0 && gridX < level.grid.length && gridY >= 0 && gridY < level.grid[gridX].length) {
        return level.grid[gridX][gridY] ? level.grid[gridX][gridY].isKillBlock : false;
    } else {
        return undefined;
    }
}

class MaskCell extends GridCell {
    constructor(background, isSolid, isKillBlock, mask) {
        super(background, null, isSolid, isKillBlock);
        this.img = document.createElement("img");

        this.setMask(mask);
    }

    setMask(mask) {
        this.mask = mask;
        switch (mask) {
            case "UDM":
                this.img.src = "textures/upsideDownManHigh.png";
                break;
            case "SM":
                this.img.src = "textures/speedBoiHigh.png";
                break;
            default:
                this.img.src = null;
        }
    }

    //draw the grid cell
    draw(ctx, x, y) {
        //draw an image if it's available
        if (this.mask !== null) {
          ctx.drawImage(this.img, x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
    }
}
