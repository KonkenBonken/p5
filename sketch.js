const ρ = 300;
const step = 5;
const steps = 360 / step;

class Sphere {
	constructor() {
		this.points = [];
		this.hues = [];
		for (let θ = 0; θ < 360; θ += step)
			for (let ϕ = 0; ϕ < 360; ϕ += step) {
				let x = ρ * Math.sin(ϕ) * Math.cos(θ),
					y = ρ * Math.sin(ϕ) * Math.sin(θ),
					z = ρ * Math.cos(ϕ);

				this.points.push([x, y, z]);
				this.hues.push(map(z, ρ, -ρ, 50, 360));
			}
	}

	draw() {
		this.points.forEach((coords, i) => {
			stroke(this.hues[i], 360, 360)
			point(...coords)
		})
	}
}

let mySphere, rotates;

function setup() {
	createCanvas(800, 800, WEBGL);
	colorMode(HSB, 360);
	frameRate(20);
	angleMode(DEGREES);
	mySphere = new Sphere();
	console.log(mySphere.points)
	rotates = [random(-1, 1), random(-1, 1), random(-1, 1)]
}

function draw() {
	if (mouseIsPressed)
		orbitControl();
	else {
		rotateX(frameCount * rotates[0])
		rotateY(frameCount * rotates[1])
		rotateZ(frameCount * rotates[2])
	}
	background(0);
	mySphere.draw();
}