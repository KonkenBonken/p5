const { cos, sin, max, abs } = Math;

function velocity(size) {
	return p5.Vector.fromAngle(random(365), size);
}

function ccw(a, b, c) {
	return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
}

// (wall, player.pos, ray.pos)
function intersect({ p1, p2 }, q1, q2) {
	return ccw(p1, q1, q2) != ccw(p2, q1, q2) &&
		ccw(p1, p2, q1) != ccw(p1, p2, q2);
}

function Ray(fromX, fromY, angle) {
	let length = 0,
		x = fromX,
		y = fromY;
	const rayEnd = createVector(width * cos(angle) + fromX, height * sin(angle) + fromY);

	while (true) {
		x = ++length * cos(angle) + fromX;
		y = length * sin(angle) + fromY;


		if (
			x > width || x < 0 || y > height || y < 0 ||
			walls.some(wall =>
				intersect(wall, player.pos, rayEnd) &&
				min(abs(wall.Fx(x) - y), abs(wall.Fy(y) - x)) < 1
			)
		) {
			stroke(255 - (length / width * 255));
			break;
		}
	}
	line(fromX, fromY, x, y);
}

class Wall {
	constructor(x1 = random(width), y1 = random(height), x2 = random(width), y2 = random(height)) {
		this.p1 = createVector(x1, y1);
		this.p2 = createVector(x2, y2);

		this.Fx = x => this.k * x + this.m;
		this.Fy = y => (y - this.m) / this.k;

		this.vel1 = velocity(2);
		this.vel2 = velocity(2);
	}

	get k() { return (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x) }
	get m() { return this.p1.y - (this.k * this.p1.x) }

	draw() {
		this.vel1.rotate(random(-5, 5));
		this.p1.add(this.vel1);
		this.vel2.rotate(random(-5, 5));
		this.p2.add(this.vel2);

		line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
	}
}

class Player {
	constructor() {
		this.setPos();
	}

	setPos() {
		this.pos = createVector(random(100, 700), random(100, 700));
		this.vel = velocity(4);
	}

	wander() {
		this.vel.rotate(random(-5, 5));
		this.pos.add(this.vel);
	}

	draw() {
		if (mouseEnabled)
			this.pos = createVector(mouseX, mouseY)
		else
			this.wander();
		Array(360).fill().forEach((_, i) => Ray(this.pos.x, this.pos.y, i))
	}
}

let player, walls, mouseEnabled = false;

function setup() {
	createCanvas(800, 800);
	angleMode(DEGREES);
	player = new Player();
	walls = Array(4).fill().map(x => new Wall);
}

function draw() {
	background(0);
	stroke(255)
	for (var wall of walls)
		wall.draw()
	player.draw();
}

function keyPressed() {
	if (keyCode === 32 /*SPACE*/ ) {
		mouseEnabled = !mouseEnabled
		if (!mouseEnabled)
			player.setPos()
	}
}