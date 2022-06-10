const { sin, cos, tan } = Math;
const
	size = window.innerHeight;
let input, button, func;

function setFunc() {
	func = eval('x=>' + input.value());
	redraw();
}

function setup() {
	createCanvas(size, size);
	noLoop();
	createSpan('y = ');
	input = createInput(random(['x*2', 'x-400', 'sin(x)+500', '300*sin(x/50)+500']));
	button = createButton('Set');
	button.mousePressed(setFunc);
	setFunc();
}

function draw() {
	background(0);
	stroke(255);
	let last = func(0);
	for (let x = 1; x < width; x++) {
		line(x - 1, last, x, func(x));
		last = func(x);
	}
}