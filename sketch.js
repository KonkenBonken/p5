const
	size = window.innerHeight,
	tSide = size / 2,
	corners = [];

function setup() {
	const tHeight = tSide * Math.sqrt(3) / 2,
		tMargin = size / 4;

	createCanvas(size, size);
	corners.push(
		[tMargin, tMargin + tHeight],
		[size - tMargin, tMargin + tHeight],
		[width / 2, tMargin]
	);
	stroke(255);
	background(0);
	strokeWeight(2);
	point(...corners[0]);
	point(...corners[1]);
	point(...corners[2]);
}

const frames = (function* _frames() {
})();


var draw = () => frames.next();