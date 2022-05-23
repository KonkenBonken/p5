function Ray(fromX, fromY, angle) {
	let length = 0;
	let x = fromX;
	let y = fromY;

	while (
		x < width && x > 0 && y < height && y > 0
	) {
		x = ++length * Math.cos(angle) + fromX;
		y = ++length * Math.sin(angle) + fromY;
	}
	line(fromX, fromY, x, y);
}

class Player {
	constructor() {}
	draw() {
		this.x = mouseX;
		this.y = mouseY;
		push()
		translate(this.x, this.y)
		fill(255, 0, 0)
		circle(0, 0, 50)
		pop()
		Array(360).fill().forEach((_, i) => Ray(this.x, this.y, i))
	}
}

let player;

function setup() {
	createCanvas(800, 800);
	player = new Player();
	stroke(255)
}

function draw() {
	background(0);
	player.draw();
}