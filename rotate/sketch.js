const { sin, tan } = Math;

class Point {
	constructor(speed, distance) {
		this.pos = createVector(width / 2, height / 2 - distance);
		this.speed = speed;
		this.distance = distance;
	}

	draw() {
		var a = (frameCount * slider.value() / 150 * this.speed) % TWO_PI;
		this.pos.x = this.distance * cos(a);
		this.pos.y = this.distance * sin(a);
		circle(this.pos.x, this.pos.y, 5);
	}
}

const
	size = window.innerHeight,
	pointCount = size,
	settings = [
		x => sin(2 * x),
		x => tan(x),
		x => 10 / x,
	];

let slider, points;

function setup() {
	createCanvas(size, size);
	frameRate(30);
	fill(255);
	noStroke();
	background(0);
	translate(width / 2, height / 2);

	points = [...Array((pointCount - 500) * 2).keys()].map(i =>
		new Point(
			settings[0](i / 80),
			i / 2
		)
	);

	const div = createElement('div');

	for (const fn of settings)
		createButton(
			fn.toString()
			.replace(/[)(]/g, ' ')
			.replace(/\s\*\s/g, '')
			.replace('x =>', 'θ =')
		)
		.mouseClicked(() =>
			points.forEach((point, i) => point.speed = fn(i / 80))
		).parent(div)

	createButton('Restart')
		.mouseClicked(() => frameCount = 0)
		.parent(div)
	slider = createSlider(0, 4, 1, 0)
		.parent(div);
}

function draw() {
	background(0);
	translate(width / 2, height / 2);
	for (const point of points)
		point.draw();
}