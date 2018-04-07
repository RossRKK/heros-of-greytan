var Events = function () {

	let keyTracker = {
		up: false,
		down: false,
		left: false,
		right: false,
		shift: false
	}

	function keyDown(e) {
		console.log(e);
		switch (e.keyCode) {
			case 87:
				keyTracker.up = true;
				break;
			case 65:
				keyTracker.left = true;
				break;
			case 83:
				keyTracker.down = true;
				break;
			case 68:
				keyTracker.right = true;
				break;
			case 16:
				keyTracker.shift = true;
				break;
		}
	}

	function keyUp(e) {
		console.log(e);
		switch (e.keyCode) {
			case 87:
				keyTracker.up = false;
				break;
			case 65:
				keyTracker.left = false;
				break;
			case 83:
				keyTracker.down = false;
				break;
			case 68:
				keyTracker.right = false;
				break;
			case 16:
				keyTracker.shift = false;
				break;
		}
	}

	function keyPress(e) {
		console.log(e);
		switch (e.keyCode) {
			case 32:
				Game.getCharacter().action();
				break;
		}
	}

	//initialise event handlers
	function init() {
		$(document).on("keydown", keyDown);
		$(document).on("keyup", keyUp);
		$(document).on("keypress", keyPress);
	}

	return {
		init: init,
		getKeyTracker: function () { return keyTracker }
	}
}();
