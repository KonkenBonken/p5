const
	size = window.innerHeight;

function setup() {
	createCanvas(size, size);
}

const frames = (function* _frames() {
})();


var draw = () => frames.next();