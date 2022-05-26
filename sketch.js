const { cos, sin, max, abs } = Math;

function ccw(a, b, c) {
	return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
}

// (wall, player.pos, ray.pos)
function intersect({ p1, p2 }, q1, q2) {
	return ccw(p1, q1, q2) != ccw(p2, q1, q2) &&
		ccw(p1, p2, q1) != ccw(p1, p2, q2)
}

function Ray(fromX, fromY, angle) {
	let length = 0,
		x = fromX,
		y = fromY;

	while (true) {
		x = ++length * cos(angle) + fromX;
		y = length * sin(angle) + fromY;

		let rayEnd = createVector(width * cos(angle) + fromX, height * sin(angle) + fromY);

		if (
			x > width || x < 0 || y > height || y < 0 ||
			walls.some(wall =>
				intersect(wall, player.pos, rayEnd) &&
				max(abs(wall.Fx(x) - y), abs(wall.Fy(y) - x)) < 3
			)
		) {
			stroke(255 - (length / width * 255))
			break;
		}
	}
	line(fromX, fromY, x, y);
}

class Wall {
	constructor(x1 = random(width), y1 = random(height), x2 = random(width), y2 = random(height)) {
		this.p1 = createVector(x1, y1);
		this.p2 = createVector(x2, y2);

		const k = (y1 - y2) / (x1 - x2),
			m = y1 - (k * x1);
		this.Fx = x => k * x + m;
		this.Fy = y => (y - m) / k;

	}

	draw() {
		line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
	}
}

class Player {
	draw() {
		this.pos = createVector(mouseX, mouseY)
		push()
		translate(this.pos.x, this.pos.y)
		pop()
		Array(360).fill().forEach((_, i) => Ray(this.pos.x, this.pos.y, i))
	}
}

let player, walls;

function setup() {
	createCanvas(800, 800);
	player = new Player();
	walls = Array(4).fill().map(x => new Wall);
}

function draw() {
	background(0);
	player.draw();
	stroke(255)
	for (var wall of walls)
		wall.draw()
}