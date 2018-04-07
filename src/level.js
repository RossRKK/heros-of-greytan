class GridCell {
  constructor (background, imgSrc) {
    this.background = background;

    this.img = document.createElement("img");
    this.img.src = imgSrc;
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
