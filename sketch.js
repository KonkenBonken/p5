const { sin, cos } = Math;

class Slave {
	constructor(masterX, masterY) {
		this.masterX = masterX;
		this.masterY = masterY;
		this.p = createVector(masterX.x, masterY.y);
		this.path = [];
	}

	draw() {
		var
			x = this.masterX.d.x + this.p.x,
			y = this.masterY.d.y + this.p.y;

		stroke(100);
		strokeWeight(2);
		for (var i = 1; i < this.path.length; i++)
			line(...this.path[i], ...this.path[i - 1]);

		stroke(255);
		strokeWeight(5);
		if (doPath) {
			this.path.push([x, y]);
			if (this.path.length >= 30)
				this.path.shift();
		}
		point(x, y);
	}
}

class Master {
	constructor(x, y, speed) {
		this.p = createVector(x, y);
		this.d = createVector();
		this.speed = speed;
	}

	draw() {
		stroke(100);
		strokeWeight(2);
		circle(this.p.x, this.p.y, d);

		stroke(255);
		strokeWeight(5);
		var a = (frameCount / 150 * this.speed) % 360;
		this.d.x = r * cos(a) + this.p.x;
		this.d.y = r * sin(a) + this.p.y;
		point(this.d.x, this.d.y);
	}
}

const
	size = window.innerHeight,

	d = size * .08,
	gap = size * .02,
	r = d / 2,
	tot = d + gap;

const masters = { x: [], y: [] },
	slaves = [];


function setup() {
	createCanvas(size, size);
	frameRate(100);
	fill(0);

	for (var i = 1; i < 10; i++) {
		var x = tot / 2 + i * tot;
		masters.x.push(new Master(x, tot / 2, i));
	}
	for (var i = 1; i < 10; i++) {
		var y = tot / 2 + i * tot;
		masters.y.push(new Master(tot / 2, y, i));
	}

	for (var masterX of masters.x)
		for (var masterY of masters.y)
			slaves.push(new Slave(masterX, masterY));
}

let doPath = true;

function draw() {
	background(0);
	doPath = !(frameCount % 5);

	for (var line in masters)
		for (var master of masters[line])
			master.draw();

	for (var slave of slaves)
		slave.draw();
}