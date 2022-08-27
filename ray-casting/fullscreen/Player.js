class Player {
	constructor() {
		this.setPos();
	}

	setPos() {
		this.pos = createVector(random(100, width - 100), random(100, height - 100));
		this.vel = velocity(playerSpeed);
	}

	wander() {
		if (isOutside(this.pos, 10))
			this.vel.setHeading(center.angleBetween(this.pos));
		else
			this.vel.rotate(random(-wanderAngle, wanderAngle));

		this.pos.add(this.vel);
	}

	draw() {
		if (mouseEnabled)
			this.pos = createVector(mouseX, mouseY)
		else
			this.wander();
		Array(Math.round(360 / rayAngle)).fill().forEach((_, i) => Ray(this.pos.x, this.pos.y, i * rayAngle))
	}
}