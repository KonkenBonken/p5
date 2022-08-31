class Point {
	constructor(fun, distance) {
		this.pos = createVector(width / 2, height / 2 - distance);
		this.fun = fun;
		this.distance = distance;
	}

	get speed() {
		return this.fun(this.distance)
	}

	draw() {
		var a = (frameCount * speedSlider.value() / 150 * this.speed) % TWO_PI;
		this.pos.y = -this.distance * cos(a);
		this.pos.x = this.distance * sin(a);
		circle(this.pos.x, this.pos.y, 5);
	}
}

const
	size = window.innerHeight,
	pointCount = size - 500,
	resolution = 5,
	wrapper = f => (x, v) => f(x / 40, varSlider.value()),

	{ sin, cos, tan, abs, log } = Math,
	settings = [
		(r, v) => sin(2 * v * r),
		(r, v) => abs(tan(v * r)),
		(r, v) => (10 * v) / r,
		(r, v) => r % (1 / v),
		(r, v) => cos(v * r) + 1.1,
		(r, v) => r ** r / (v * 1e11),
	];

let speedSlider, varSlider, points;

function setup() {
	createCanvas(size, size);
	frameRate(30);
	fill(255);
	noStroke();
	background(0);
	translate(width / 2, height / 2);

	points = [...Array(pointCount * resolution).keys()].map(i =>
		new Point(
			wrapper(settings[0]),
			i / resolution
		)
	);

	const div = createElement('div');
	[
		createSpan('Speed ='),
		speedSlider = createSlider(.01, 4, 1, 1e-6),
		createSpan('v ='),
		varSlider = createSlider(.01, 10, 1, 1e-6),
		createSpan('Function ='),

		...settings.map(fn =>
			createButton(
				fn.toString()
				.replace('(r, v) =>', 'θ =')
				.replace(/[)(]/g, ' ')
				.replace(/\s\*\s1e/g, 'E')
				.replace(/\s\*\s/g, '')
				.replace(/%/g, 'mod')
			)
			.mouseClicked(() =>
				points.forEach((point, i) => point.fun = wrapper(fn))
			)
		),
		createButton('Restart')
		.mouseClicked(() => frameCount = 0)
	].forEach(el => el.parent(div));


}

function draw() {
	background(0);
	translate(width / 2, height / 2);
	for (const point of points)
		point.draw();
}