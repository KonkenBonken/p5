// @ts-nocheck

const { abs, round, min, max } = Math;

const
	size = {
		height: window.innerHeight,
		width: window.innerWidth
	},
	camShare = 6,

	pixel = {
		share: 50, // initial number of horizontal pixels
		get size() { return round(size.width / this.share / 2) },
		get step() { return this.size / 200 * zoomLevel },
	};

let pPos, wPos,
	prevZoom = 100,
	zoomLevel = 100;

function setup() {
	createCanvas(size.width, size.height);
	noStroke();
	noiseDetail(1);
	colorMode(HSL, 360);
	frameRate(30);

	pPos = createVector(0, 0);
	wPos = createVector(0, 0);
}

function draw() {
	translate(width / 2, height / 2);
	background(0);
	Move();

	if (frameCount < 100)
		while (!isSafe())
			noiseSeed();

	for (let x = -width / 2; x < width / 2; x += pixel.size)
		for (let y = -height / 2; y < height / 2; y += pixel.size) {
			fill(...ColorAt(x, y))
			square(x, y, pixel.size);
		}

	fill(0, 360, 220);
	circle(pPos.x, pPos.y, pixel.size * zoomLevel / 100);

	if (frameRate() < 15) pixel.share--;
	if (frameRate() > 31) pixel.share++;
}

function Move() {
	if (keyIsDown(87))       // w
		isSafe(0, -1) && yPos(-1).add(0, -pixel.step);
	else if (keyIsDown(83))  // s
		isSafe(0, 1) && yPos().add(0, pixel.step);
	if (keyIsDown(65))       // a
		isSafe(-1) && xPos(-1).add(-pixel.step);
	else if (keyIsDown(68))   // d
		isSafe(1) && xPos().add(pixel.step);
}

const
	yInCam = m => pPos.y * m < height / camShare,
	xInCam = m => pPos.x * m < width / camShare,

	yPos = (m = 1) => yInCam(m) ? pPos : wPos,
	xPos = (m = 1) => xInCam(m) ? pPos : wPos;

const C = {
	water: 230,
	dirt: 20,
	grass: 120,
}

function Color(val) { // 0 < val < 100
	const [hue, bp] = [
		[C.water, 35],
		[C.dirt, 60],
		[C.grass, 100]
	]
		.find(([, max]) => val < max);

	return [hue, 360, map(val, bp - 20, bp + 20, 60, 100)];
}

function HeightAt(x = pPos.x, y = pPos.y) {
	return map(
		noise(
			x / zoomLevel + wPos.x / 100 + 1024,
			y / zoomLevel + wPos.y / 100 + 1024
		),
		0, .5, 0, 100
	)
}

function ColorAt(x, y) {
	return Color(HeightAt(x, y))
}

function HueAt(x, y) {
	return ColorAt(x, y)[0];
}

function isSafe(dx = 0, dy = 0) {
	return HueAt(pPos.x + pixel.step * dx, pPos.y + pixel.step * dy) !== C.water;
}

function mouseWheel({ delta }) {
	zoomLevel = min(max(zoomLevel - (delta * zoomLevel / 2500), 65), 400);
	if (!isSafe()) zoomLevel = prevZoom;

	pPos.mult(zoomLevel / prevZoom);
	prevZoom = zoomLevel;
}