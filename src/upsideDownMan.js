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
	}

	action() {
		this.engaged = !this.engaged;

		if (this.engaged) {this.horizontalMaxSpeed = 10;}
		else {this.horizontalMaxSpeed = 5;}
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

		this.grapleForce = 0.2;
	}

	action(level) {
		if (this.engaged) {
			this.cancelAction();
		} else {
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
				this.velocity.x += this.grapleForce / m;
				this.velocity.y += this.grapleForce * m;
			}
		}

		super.move(level);
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
