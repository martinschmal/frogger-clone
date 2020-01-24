class Obstacle {
	///----- Players are killed by this
	constructor() {
		this.obstacleImage = [
			{
				src: loadImage("taxi.png")
			},
			{
				src: loadImage("truck.png")
			},
			{
				src: loadImage("police.png")
			},
			{
				src: loadImage("fire.png")
			}
		];

		this.width = 100;
		this.height = 50;
		this.x = Math.floor(Math.random() * -50) - 50;
		this.y = Math.floor(Math.random() * 4) * 50 + 100; // obstacles not in first and last row
		this.i = Math.floor(Math.random() * 4); // randomize the 4 images
	}

	draw() {
		this.x += carSpeed; // speed of obstacales
		image(this.obstacleImage[this.i].src, this.x, this.y, this.width, this.height);
	}
}

class NoObstacle {
	///----- Players are not killed by this and can traval on this
	constructor(direction, x, y) {
		this.obstacleImage = loadImage("wood.png");
		this.width = Math.floor(Math.random() * 3) * 50 + 100;
		this.height = 50;
		this.x = x - Math.floor(Math.random() * 50);
		this.y = y;
		this.counter = 0;
		this.direction = direction;
	}

	draw() {
		this.x += this.direction; // direction and speed of obstacales
		image(this.obstacleImage, this.x, this.y, this.width, this.height); 
	}
}