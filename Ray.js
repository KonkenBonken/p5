function Ray(fromX, fromY, angle) {
	let length = 0,
		x = fromX,
		y = fromY;
	const rayEnd = createVector(width * cos(angle) + fromX, height * sin(angle) + fromY);

	while (true) {
		x = ++length * cos(angle) + fromX;
		y = length * sin(angle) + fromY;

		if (
			isOutside({ x, y }) ||
			walls.some(wall =>
				intersect(wall, player.pos, rayEnd) &&
				min(abs(wall.Fx(x) - y), abs(wall.Fy(y) - x)) < 1
			)
		) {
			stroke(255 - (length / width * 255));
			break;
		}
	}
	line(fromX, fromY, x, y);
}