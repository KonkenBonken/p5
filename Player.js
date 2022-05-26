class Player {
	constructor() {
		this.setPos();
	}

	setPos() {
		this.pos = createVector(random(100, 700), random(100, 700));
		this.vel = velocity(4);
	}

	wander() {
		if (isOutside(this.pos, 10))
			this.vel.setHeading(center.angleBetween(this.pos));
		else
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