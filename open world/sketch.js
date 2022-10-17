const { abs } = Math;

const
	size = window.innerHeight - 40,
	pixelSize = 20,
	noiseReducer = 100,
	stepSize = 5,
	camSize = size / 6

let pPos, wPos, grassSlider;

function setup() {
	createCanvas(size, size);
	noStroke();
	noiseDetail(1);
	colorMode(HSL, 360);

	grassSlider = createSlider(0, 60, 30);

	pPos = createVector(0, 0);
	wPos = createVector(0, 0);
}

function draw() {
	translate(width / 2, height / 2);
	background(0);
	Move();

	for (let x = -width / 2; x < width / 2; x += pixelSize)
		for (let y = -height / 2; y < height / 2; y += pixelSize) {
			fill(...Color(map(
				noise(
					(x + wPos.x) / noiseReducer + 1e6,
					(y + wPos.y) / noiseReducer + 1e6
				),
				0, .5, 0, 100
			), x, y))
			square(x - 5, y - 5, pixelSize + 5, 5);
		}

	fill(255, 200, 220);
	circle(pPos.x, pPos.y, pixelSize);
}

function Move() {
	if (keyIsDown(87))       // w
		yPos(-1).add(0, -stepSize);
	else if (keyIsDown(83))  // s
		yPos().add(0, stepSize);
	if (keyIsDown(65))       // a
		xPos(-1).add(-stepSize);
	else if (keyIsDown(68))  // d
		xPos().add(stepSize);
}

const
	yInCam = m => pPos.y * m < camSize,
	xInCam = m => pPos.x * m < camSize,

	yPos = (m = 1) => yInCam(m) ? pPos : wPos,
	xPos = (m = 1) => xInCam(m) ? pPos : wPos;

function Color(val, x, y) { // 0 < val < 100
	const [hue, bp] = [
		[230, 35],
		[20, 60],
		[120, 100]
	]
		.find(([, max]) => val < max);

	return [hue, 360, map(val, bp - 20, bp + 20, 60, 100)];
}