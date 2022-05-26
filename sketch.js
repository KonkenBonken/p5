const
	rayAngle = 1,
	playerSpeed = 4,
	wallSpeed = 2,
	wanderAngle = 5,

	{ cos, sin, max, abs } = Math,

	isOutside = ({ x, y }, margin = 0) => x > width - margin || x < margin || y > height - margin || y < margin,
	velocity = (size) => p5.Vector.fromAngle(random(365), size),
	ccw = (a, b, c) => (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x),
	intersect = ({ p1, p2 }, q1, q2) /*(wall,player.pos,ray.pos)*/ => ccw(p1, q1, q2) != ccw(p2, q1, q2) && ccw(p1, p2, q1) != ccw(p1, p2, q2);

let player, walls, center, mouseEnabled = false;

function setup() {
	createCanvas(windowWidth, windowHeight);
	center = createVector(width / 2, height / 2);
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

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}