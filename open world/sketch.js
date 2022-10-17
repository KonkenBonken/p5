// @ts-nocheck

const { abs, round } = Math;

const
	size = window.innerHeight,
	noiseReducer = 100,
	stepSize = 5,
	camSize = size / 6,

	pixel = {
		share: 100,
		get size() { return round(size / this.share) }
	};

let pPos, wPos;

function setup() {
	createCanvas(size, size);
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

	while (!isSafe())
		noiseSeed();

	for (let x = -width / 2; x < width / 2; x += pixel.size)
		for (let y = -height / 2; y < height / 2; y += pixel.size) {
			fill(...ColorAt(x, y))
			square(x, y, pixel.size);
		}

	fill(0, 360, 220);
	circle(pPos.x, pPos.y, pixel.size);

	if (frameRate() < 20) pixel.share--;
	if (frameRate() > 30) pixel.share++;
}

function Move() {
	if (keyIsDown(87))       // w
		isSafe(0, -1) && yPos(-1).add(0, -stepSize);
	else if (keyIsDown(83))  // s
		isSafe(0, 1) && yPos().add(0, stepSize);
	if (keyIsDown(65))       // a
		isSafe(-1) && xPos(-1).add(-stepSize);
	else if (keyIsDown(68))   // d
		isSafe(1) && xPos().add(stepSize);
}

const
	yInCam = m => pPos.y * m < camSize,
	xInCam = m => pPos.x * m < camSize,

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
			(x + wPos.x) / noiseReducer + 1e6,
			(y + wPos.y) / noiseReducer + 1e6
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
	return HueAt(pPos.x + stepSize * dx, pPos.y + stepSize * dy) !== C.water;
}