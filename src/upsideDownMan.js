class upsideDownMan extends Character {
	constructor(oldCharacter) {
		super();
		this.position = oldCharacter.position;
		this.velocity = oldCharacter.velocity;
		this.hp = oldCharacter.hp;

		this.mask = "UDM";
		this.img.src = "textures/BobUpsideDown.png";

		this.engaged = false;
		this.engagedBuffer = 500;
	}

	action() {
		if (!this.engaged && this.engagedBuffer === 500) {
			this.gravity = -this.gravity;
			this.engagedBuffer -= 250;
			this.engaged = true;
			this.img.src = "textures/BobUpsideDownUpsideDown.png";
		} else if (this.engaged) {
			this.gravity = -this.gravity;
			this.velocity.x = -this.velocity.x;
			this.engaged = false;
			this.img.src = this.img.src = "textures/BobUpsideDown.png";
		}

		if (this.engaged) {
			this.flipFlag = 0;
		}
	}

	updatePosition(keyTracker, level) {
		super.updatePosition(keyTracker, level);
		if (this.engaged && this.engagedBuffer === 0) {
			this.gravity = -this.gravity;
			this.velocity.x = -this.velocity.x;
			this.engaged = false;
			this.img.src = "textures/BobUpsideDown.png";
		}

		if (this.engaged && this.engagedBuffer > 0) {
			this.engagedBuffer -= 1;
		} else if (!this.engaged && this.engagedBuffer < 500) {
			this.engagedBuffer += 1;
		}
	}

	drawHUD(ctx, level) {
		super.drawHUD(ctx, level);
		if (this.mask !== null) {
            if (this.engagedBuffer < 500) {
                ctx.fillStyle = "#FF4500";
              } else {
                  ctx.fillStyle = "#ADFF2F";
              }
            ctx.fillRect(this.position.x -10, this.position.y + level.GRID_SIZE, 5, GRID_SIZE * (this.engagedBuffer) / 500);
        }
		if (this.flipFlag < 50) {
			var zoom = document.createElement("img");
		 	zoom.src = "textures/Flip!.png";
			ctx.drawImage(zoom, this.position.x - 30, this.position.y + 130);
			this.flipFlag += 1;
		}
	}
}

class speedMan extends Character {
	constructor(oldCharacter) {
		super();
		this.position = oldCharacter.position;
		this.velocity = oldCharacter.velocity;
		this.hp = oldCharacter.hp;

		this.mask = "SM";
		this.img.src = "textures/BobSpeed.png";
		this.engaged = false;
		this.zoomFlag = 50;
	}

	action() {
		this.engaged = !this.engaged;

		if (this.engaged) {
			this.horizontalMaxSpeed = 10;
			this.img.src = "textures/BobSpeedFeet.png";
		}
		else {
			this.horizontalMaxSpeed = 5;
			this.img.src = "textures/BobSpeed.png";
		}

		if (this.engaged) {
			this.zoomFlag = 0;
		}
	}

	drawHUD(ctx, level) {
		super.drawHUD(ctx, level);
		if (this.zoomFlag < 50) {
			var zoom = document.createElement("img");
		 	zoom.src = "textures/Zoom!.png";
			ctx.drawImage(zoom, this.position.x - 30, this.position.y + 130);
			this.zoomFlag += 1;
		}
	}
}

class grappleGuy extends Character {
	constructor(oldCharacter) {
		super();
		this.position = oldCharacter.position;
		this.velocity = oldCharacter.velocity;
		this.hp = oldCharacter.hp;

		this.mask = "GG";
		this.img.src = "textures/BobGrapple.png";
		this.engaged = false;

		this.grappleForce = 1;
		this.grabFlag = 50;
	}

	action(level) {
		if (this.engaged) {
			this.cancelAction();
		} else {
			this.grabFlag = 0;
			let mouse = Events.getMouseTracker();

			if (isObstructed(level, mouse.x, mouse.y)) {
				this.engaged = true;
				this.target = $.extend({}, mouse);
			}
		}
	}

	cancelAction() {
		console.log("Cancelled");
		this.engaged = false;
		this.target = null;
	}

	move(level) {
		if (this.engaged) {
			if (Math.sqrt(Math.pow((this.position.x + this.width / 2) - this.target.x, 2) + Math.pow(this.target.y - (this.position.y + this.height / 2), 2)) < 1.25 * GRID_SIZE) {
				this.cancelAction();
			} else {
				let m = ((this.position.y + this.height / 2) - this.target.y) / ((this.position.x + this.width / 2) - this.target.x);

				let angle = Math.atan(m);

				if ((this.position.y + this.height / 2) > this.target.y) {
					if (m > 0) {
						this.velocity.x -= this.grappleForce * Math.cos(angle);
						this.velocity.y -= this.grappleForce * Math.sin(angle);
					} else {
						this.velocity.x += this.grappleForce * Math.cos(angle);
						this.velocity.y += this.grappleForce * Math.sin(angle);
					}
				} else {
					if (m > 0) {
						this.velocity.x += this.grappleForce * Math.cos(angle);
						this.velocity.y += this.grappleForce * Math.sin(angle);
					} else {
						this.velocity.x -= this.grappleForce * Math.cos(angle);
						this.velocity.y -= this.grappleForce * Math.sin(angle);
					}
				}
			}
		}

		super.move(level);
	}

	drawHUD(ctx, level) {
		super.drawHUD(ctx, level);
		if (this.grabFlag < 50) {
			var grab = document.createElement("img");
			grab.src = "textures/Grab!.png";
			ctx.drawImage(grab, this.position.x - 30, this.position.y + 130);
			this.grabFlag += 1;
		}
	}

	draw(ctx) {
		super.draw(ctx);

		if (this.engaged) {
			ctx.beginPath();

			ctx.moveTo(this.target.x, this.target.y);
			ctx.lineTo((this.position.x + this.width / 2), (this.position.y + this.height / 2));

			ctx.stroke();
		}
	}
}
