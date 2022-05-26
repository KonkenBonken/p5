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
		if (isOutside(this.p1, 10))
			this.vel1.setHeading(-this.p1.angleBetween(center));
		else
			this.vel1.rotate(random(-5, 5));
		this.p1.add(this.vel1);
		if (isOutside(this.p2, 10))
			this.vel2.setHeading(-this.p2.angleBetween(center));
		else
			this.vel2.rotate(random(-5, 5));
		this.p2.add(this.vel2);

		line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
	}
}