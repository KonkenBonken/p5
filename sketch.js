const ρ = 100;
const step = 5;
const steps = 360 / step;

class Sphere {
	constructor() {
		this.points = [];
		for (let θ = 0; θ < 360; θ += step)
			for (let ϕ = 0; ϕ < 360; ϕ += step) {
				let x = ρ * Math.sin(ϕ) * Math.cos(θ),
					y = ρ * Math.sin(ϕ) * Math.sin(θ),
					z = ρ * Math.cos(ϕ);

				this.points.push([x, y, z])
			}
	}

	draw() {
		this.points.forEach((coords, i) => {
			stroke(i % 360, 360, 360)
			point(...coords)
		})
	}
}

let mySphere;

function setup() {
	createCanvas(800, 800, WEBGL);
	colorMode(HSB, 360);
	mySphere = new Sphere();
	frameRate(20);
	angleMode(DEGREES);
	console.log(mySphere.points)
}

function draw() {
	if (mouseIsPressed)
		orbitControl();
	else
		camera(400 * Math.sin(frameCount / 50), 0, 400 * Math.cos(frameCount / 50))
	background(0);
	mySphere.draw();
}