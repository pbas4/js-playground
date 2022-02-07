/* Store the element in el */
let round = document.querySelector('.round');

/* Get the height and width of the element */
const height = round.clientHeight;
const width = round.clientWidth;

/*
 * Add a listener for mousemove event
 * Which will trigger function 'handleMove'
 * On mousemove
 */
round.addEventListener('mousemove', handleMove);

/* Define function a */
function handleMove(e) {
	/*
	 * Get position of mouse cursor
	 * With respect to the element
	 * On mouseover
	 */
	/* Store the x position */
	const xVal = e.layerX;
	/* Store the y position */
	const yVal = e.layerY;

	/*
	 * Calculate rotation valuee along the Y-axis
	 * Here the multiplier 20 is to
	 * Control the rotation
	 * You can change the value and see the results
	 */
	const yRotation = 15 * ((xVal - width / 2) / width);

	/* Calculate the rotation along the X-axis */
	const xRotation = 15 * ((yVal - height / 2) / height);

	/* Generate string for CSS transform property */
	const string =
		'perspective(800px) rotateX(' +
		xRotation +
		'deg) rotateY(' +
		yRotation +
		'deg)';

	/* Apply the calculated transformation */
	round.style.transform = string;
}

/* Add listener for mouseout event, remove the rotation */
round.addEventListener('mouseout', function () {
	round.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
});

/* Add listener for mousedown event, to simulate click */
round.addEventListener('mousedown', function () {
	round.style.transform =
		'perspective(800px) scale(0.98) rotateX(0) rotateY(0)';
});

/* Add listener for mouseup, simulate release of mouse click */
round.addEventListener('mouseup', function () {
	round.style.transform = 'perspective(800px) scale(1) rotateX(0) rotateY(0)';
});
