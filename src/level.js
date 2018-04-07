class GridCell {
  constructor (background, imgSrc, solid) {
    this.background = background;

    this.img = document.createElement("img");
    this.img.src = imgSrc;

    this.solid = solid;
  }

  //draw the grid cell
  draw(ctx, x, y) {
    ctx.fillStyle = this.background;
    ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);

    //draw an image if it's available
    if (this.img.src) {
      ctx.drawImage(this.img, x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }
}

function isObstructed(level, x, y) {
    let gridX = Math.floor(x / GRID_SIZE);
    let gridY = Math.floor(y / GRID_SIZE);

    return level.grid[gridX][gridY] ? level.grid[gridX][gridY].solid : false;
}
