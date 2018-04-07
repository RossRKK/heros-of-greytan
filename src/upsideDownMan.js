class upsideDownMan extends Character {
	constructor(oldCharacter) {
		super();
		$.extend(this, oldCharacter);
		this.mask = "UDM";
		this.img.src = "textures/BobUpsideDown.png";
	}
}

class speedMan extends Character {
	constructor(oldCharacter) {
		super();
		$.extend(this, oldCharacter);
		this.mask = "SM";
		this.img.src = "textures/BobSpeed.png";
	}
}
