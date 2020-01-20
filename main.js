const HEIGHT = 600; // canvas height
const WIDTH = 800; // canvas width
let direction = 1;

class Background {
	constructor() {
		this.backgroundImage = loadImage("background2.png");
	}

	draw() {
		image(this.backgroundImage, 0, 0);
	}
}

class Game {
	constructor() {
		this.obstacles = [];
	}

	init() {
		console.log("background");
		this.background = new Background();
		this.player = new Player();
		this.player2 = new Player();
		this.obstacle = new Obstacle();
	}

	setup() {
		createCanvas(WIDTH, HEIGHT);
		this.player.setupPlayer1();
		this.player2.setupPlayer2();
		this.obstacle.setup();

		//
	}

	draw() {
		this.background.draw();

		this.player.draw();
		this.player2.draw();

		this.obstacle.draw();
		// if (frameCount % 20 === 0) {
		// 	this.obstacles.push(new Obstacle());
		// }

		// this.obstacles.forEach(function(obstacle) {
		// 	obstacle.draw();
		// });
	}
}

class Player {
	constructor(playerNr, playerScore) {
		this.playerNr = playerNr;
		this.playerScore = playerScore;
		this.player1Image = loadImage("player1.png");
	}

	setupPlayer1() {
		this.playerPosX = 400;
		this.playerPosY = 550;
	}

	setupPlayer2() {
		this.playerPosX = 240;
		this.playerPosY = 550;
	}

	draw() {
		image(this.player1Image, this.playerPosX, this.playerPosY);
	}

	move(x, y) {
		if (this.playerPosX >= 50) {
			if (this.playerPosX <= WIDTH - 50) {
				this.playerPosX += x;
			}
		}

		// if (this.playerPosY >= 0 && this.playerPosY < HEIGHT-40)
		// {
		//     this.playerPosY += y;
		// }
		console.log("width" + WIDTH + " " + this.playerPosX);

		//     && this.playerPosY <= HEIGHT) {
		// this.playerPosX += 0;
		// this.playerPosY += 0;
		// } else

		// this.playerPosX += x;
		// this.playerPosY += y;
	}
}

class Obstacle {
	constructor() {
		//
		this.obstacleImage = loadImage("obstacle1.png");
		this.positionX = 0;
		this.positionY = 0;
		this.ObstacleLength = 200;
		this.ObstacleWidth = 50;
	}

	setup() {
		//
		this.obstaclePosX = 0;
		this.obstaclePosY = 300; // random(0, 600);
	}
	draw() {
		// inverse direction at end / beginning of canvas
		if (this.positionX === WIDTH - this.ObstacleLength) {
			direction = direction * -1;
		}

		if (this.positionX < 0) {
			direction = direction * -1;
		}
		this.positionX += direction;

		//

		image(this.obstacleImage, this.obstaclePosX + this.positionX, this.obstaclePosY);
	}
}

/// start the Game

const game = new Game();
const player = new Player(1, 0);
const player2 = new Player(2, 0);

const obstacle = new Obstacle();

function preload() {
	game.init();
}

function setup() {
	game.setup();
}

function draw() {
	game.draw();
}

/// Keyboard inputs

function keyPressed() {
	/// Keys player 1
	if (keyCode === 37) {
		console.log("left");
		game.player.move(-50, 0);
	}

	if (keyCode === 39) {
		console.log("right");
		game.player.move(50, 0);
	}

	if (keyCode === 38) {
		console.log("up");
		game.player.move(0, -50);
	}

	if (keyCode === 40) {
		console.log("down");
		game.player.move(0, 50);
	}

	/// Keys player 2
	if (keyCode === 65) {
		console.log("left player2");
		game.player2.move(-50, 0);
	}

	if (keyCode === 68) {
		console.log("right player2");
		game.player2.move(50, 0);
	}

	if (keyCode === 87) {
		console.log("up player2");
		game.player2.move(0, -50);
	}

	if (keyCode === 83) {
		console.log("down player2");
		game.player2.move(0, 50);
	}
}
