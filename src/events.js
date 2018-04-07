var Events = function () {

	let keyTracker = {
		up: false,
		down: false,
		left: false,
		right: false
	}

	function keyDown(e) {
		console.log(e);
		switch (e.originalEvent.key) {
			case "w":
				keyTracker.up = true;
				break;
			case "a":
				keyTracker.left = true;
				break;
			case "s":
				keyTracker.down = true;
				break;
			case "d":
				keyTracker.right = true;
				break;
		}
	}

	function keyUp(e) {
		console.log(e);
		switch (e.originalEvent.key) {
			case "w":
				keyTracker.up = false;
				break;
			case "a":
				keyTracker.left = false;
				break;
			case "s":
				keyTracker.down = false;
				break;
			case "d":
				keyTracker.right = false;
				break;
		}
	}

	//initialise event handlers
	function init() {
		$(document).on("keydown", keyDown);
		$(document).on("keyup", keyUp);
	}

	return {
		init: init,
		getKeyTracker: function () { return keyTracker }
	}
}();
