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
		for (const i in Object.keys(flags)) {
			const colors = Object.values(flags)[i];
			for (var j in colors) {
				Color(colors[j]);
				rect(0, map(j, 0, colors.length, 0, height), width, map(j + 1, 0, colors.length, 0, height))
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