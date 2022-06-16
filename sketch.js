const
	size = window.innerHeight,
	tSide = size / 2,
	corners = [];
let p;

function setup() {
	const tHeight = tSide * Math.sqrt(3) / 2,
		tMargin = size / 4;

	createCanvas(size, size);
	corners.push(
		[tMargin, tMargin + tHeight],
		[size - tMargin, tMargin + tHeight],
		[width / 2, tMargin]
	);
	stroke(255);
	background(0);
	frameRate(10);
	strokeWeight(2);
	point(...corners[0]);
	point(...corners[1]);
	point(...corners[2]);
	strokeWeight(1);
	p = [random(width), random(height)];
}

const frames = (function* () {
	let i = 0,
		limit = 10;
	while (true) {
		const corner = random(corners),
			mid = corner.map((c, i) => (c + p[i]) / 2);
		point(...mid);
		p = mid;
		if (++i % limit == 0) {
			i = 0;
			limit++;
			yield;
		}
	}
})();


var draw = () => frames.next();