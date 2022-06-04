const { sin, cos, max } = Math;

class Slave {
	constructor(masterX, masterY, hue) {
		this.masterX = masterX;
		this.masterY = masterY;
		this.hue = hue;
	}

	draw() {
		var
			x = this.masterX.d.x,
			y = this.masterY.d.y;

		stroke(this.hue, 100, 50);
		this.hue = (this.hue + .02) % 360;
		fill(0);
		circle(x, y, 5);
	}
}

class Master {
	constructor(x, y, speed, hue) {
		this.p = createVector(x, y);
		this.d = createVector();
		this.speed = speed;
		this.hue = hue;
	}

	draw() {
		stroke(this.hue, 100, 50);
		this.hue = (this.hue + .02) % 360;
		fill(0);
		var a = (frameCount / 150 * this.speed) % TWO_PI;
		this.d.x = r * cos(a) + this.p.x;
		this.d.y = r * sin(a) + this.p.y;
		circle(this.d.x, this.d.y, 5);
	}
}

const
	size = window.innerHeight,

	d = size * .08,
	gap = size * .02,
	r = d / 2,
	tot = d + gap,
	pathGap = 5;

const masters = { x: [], y: [] },
	slaves = [];

let pathLength = 55;

function setup() {
	createCanvas(size, size);
	frameRate(60);
	fill(0);
	background(0);
	colorMode(HSL);

	for (var i = 1; i < 10; i++) {
		var x = tot / 2 + i * tot;
		masters.x.push(new Master(x, tot / 2, i, map(i, 1, 9, 0, 192)));
	}
	for (var i = 1; i < 10; i++) {
		var y = tot / 2 + i * tot;
		masters.y.push(new Master(tot / 2, y, i, map(i, 1, 9, 0, 192)));
	}

	for (var masterX of masters.x)
		for (var masterY of masters.y)
			slaves.push(new Slave(masterX, masterY, map(max(masterX.speed, masterY.speed), 1, 9, 0, 192)));
}

function draw() {

	if (frameRate() < 60 && pathLength > 10) pathLength--
	else pathLength++;

	for (var line in masters)
		for (var master of masters[line])
			master.draw();

	for (var slave of slaves)
		slave.draw();
}