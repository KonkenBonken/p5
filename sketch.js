for (const flagName in flags)
	if (!Array.isArray(flags[flagName][0]))
		for (const i in flags[flagName])
			flags[flagName][i] = [flags[flagName][i], 1]

function Color(decimal) {
	const
		r = (decimal & 0xff0000) >> 16,
		g = (decimal & 0x00ff00) >> 8,
		b = (decimal & 0x0000ff);

	fill(r, g, b);
	return [r, g, b]
}

function* Frames() {
	while (true)
		for (const flagIndex in Object.keys(flags)) {
			const colors = Object.values(flags)[flagIndex];
			const totalHeight = colors.reduce((a, b) => a + b[1], 0);
			let usedHeight = 0;
			for (const color of colors) {
				Color(color[0]);
				const colorHeight = color[1] / totalHeight * height;
				rect(0, usedHeight, width, colorHeight)
				usedHeight += colorHeight;
			}
			yield;
		}
}

const frames = Frames();

function setup() {
	createCanvas(1200, 800);
	frameRate(1);
	noStroke(0)
	console.log(flags)
}

function draw() {
	background(0);
	frames.next();
}