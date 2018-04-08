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
