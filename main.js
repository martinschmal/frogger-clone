const HEIGHT = 600; // canvas height
const WIDTH = 800; // canvas width
const PLAYERWIDTH = 50;
const PLAYERHEIGHT = 50;
const OBSTACLEHEIGHT = 50;
const STEP = 50; // STEP should be euqal to PLAYERWIDTH/HEIGHT

const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");

const lives1 = document.querySelector("#lives1");
const lives2 = document.querySelector("#lives2");

class Background {
	constructor() {
		this.backgroundImage = loadImage("street.png");
	}

	draw() {
		image(this.backgroundImage, 0, 0);
	}
}

class Game {
	constructor() {
		this.obstacles = [];
		this.obstacles2 = [];
	}

	init() {
		this.background = new Background();
		this.obstacle = new Obstacle();
		this.player = new Player();
		this.player2 = new Player();
	}

	setup() {
		createCanvas(WIDTH, HEIGHT);
		this.obstacle.setup();
		this.player.setupPlayer1();
		this.player2.setupPlayer2();
	}

	draw() {
		this.background.draw();
		this.player.draw();
		this.player2.draw();

		/// Every 100 frames a new Object
		if (frameCount % 280 === 0) {
			this.obstacles.push(new Obstacle());
		}

		if (frameCount % 180 === 0) {
			this.obstacles.push(new Obstacle2());
		}

		/// delte if more than 10 obstacles
		if (this.obstacles.length > 100) {
			this.obstacles.shift();
		}

		this.obstacles.forEach(function(obstacle) {
			obstacle.draw();

			/// collission Player 1
			if (
				game.player.playerPosX + game.player.width > obstacle.x &&
				game.player.playerPosX + game.player.width < obstacle.x + obstacle.width + game.player.width
			) {
				if (
					game.player.playerPosY + game.player.height > obstacle.y &&
					game.player.playerPosY + game.player.height < obstacle.y + obstacle.height + game.player.height
				) {
					// count collission and set player on middle of obstacle
					game.player.collissionCount++;
					game.player.playerPosX = obstacle.x + game.obstacle.width/20;
					game.player.playerPosY = obstacle.y;
					game.player.draw(); // Player is drawn on top of obstacle

					score1.innerHTML++;
				}
			}

			/// collission Player 2
			if (
				game.player2.playerPosX + game.player2.width > obstacle.x &&
				game.player2.playerPosX + game.player2.width < obstacle.x + obstacle.width + game.player.width
			) {
				if (
					game.player2.playerPosY + game.player2.height > obstacle.y &&
					game.player2.playerPosY + game.player2.height < obstacle.y + obstacle.height + game.player.height
				) {
					// count collission and set player on middle of obstacle
					game.player2.collissionCount++;
					game.player2.playerPosX = obstacle.x + game.player.width;
					game.player2.playerPosY = obstacle.y;
					game.player2.draw(); // Player is drawn on top of obstacle

					score2.innerHTML++;
				}
			}

			/// goal Player 1
			if (game.player.playerPosY <= 0) {
				game.player.setupPlayer1();
			}

			/// goal Player 2
			if (game.player2.playerPosY <= 0) {
				game.player2.setupPlayer2();
			}

			/// kill Player 1
			if (game.player.playerPosX > WIDTH) {
				game.player.setupPlayer1();

				lives1.innerHTML--;
			}

			/// kill Player 2
			if (game.player2.playerPosX > WIDTH) {
				game.player2.setupPlayer2();

				lives2.innerHTML--;
			}
		});
	}
}

class Player {
	constructor(playerNr, playerScore, playerLives) {
		this.playerNr = playerNr;
		this.playerScore = playerScore;
		this.player1Image = loadImage("player-forward.png");
		this.width = PLAYERWIDTH;
		this.height = PLAYERHEIGHT;
		this.collissionCount = 0;
		this.playerLives = 0;
	}

	setupPlayer1() {
		// initial position of player 1
		this.playerPosX = WIDTH / 2 + STEP;
		this.playerPosY = HEIGHT - STEP;
	}

	setupPlayer2() {
		// initial position of player 1
		this.playerPosX = WIDTH / 2 - STEP;
		this.playerPosY = HEIGHT - STEP;
	}

	killPlayer() {
		// initial position of player 1
		this.playerLives--;
	}

	draw() {
		// /// collission Player 1
		// if (
		// 	this.playerPosX + this.width > game.obstacle.x &&
		// 	this.playerPosX + this.width < game.obstacle.x + game.obstacle.width + this.width
		// ) {
		// 	if (
		// 		this.playerPosY + this.height > game.obstacle.y &&
		// 		this.playerPosY + this.height < game.obstacle.y + game.obstacle.height + this.height
		// 	) {
		// 		this.player.collissionCount++;
		// 		this.playerPosX = game.obstacle.x + this.width;
		// 		this.playerPosY = game.obstacle.y;
		// 		this.draw();
		// 	}
		// }

		image(this.player1Image, this.playerPosX, this.playerPosY, this.width, this.height);
	}

	move(x, y) {
		this.playerPosX += x;
		this.playerPosY += y;
	}
}

class Obstacle {
	constructor() {
		this.obstacleImage = loadImage("wood.png");

		this.width = 300;
		this.height = 50;

		this.x = 0;
		this.y = Math.floor(Math.random() * 5) * 50 + 50; // obstacles not in first and last row

		this.counter = 0;
	}

	setup() {
		//
	}

	draw() {
		this.x += 1; // speed of obstacales
		image(this.obstacleImage, this.x, this.y, this.width, this.height);

		console.log(game.obstacle.x);
	}
}

class Obstacle2 {
	// second class for different Obstacels
	constructor() {
		this.obstacleImage = loadImage("taxi.png");

		this.width = 100;
		this.height = 50;

		this.x = 0;
		this.y = Math.floor(Math.random() * 5) * 50 + 300; // obstacles not in first and last row

		this.counter = 0;
	}

	setup() {
		//
	}

	draw() {
		this.x += 1; // speed of obstacales
		image(this.obstacleImage, this.x, this.y, this.width, this.height);
	}
}

/// start the Game
const game = new Game();
const player = new Player(1, 0, 3);
const player2 = new Player(2, 0, 3);
const obstacle = new Obstacle();
console.clear();

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

	if (keyCode === 37 && game.player.playerPosX > 0) {
		//console.log(game.player.playerPosX + "left");
		game.player.player1Image = loadImage("player-right.png");
		game.player.move(-STEP, 0);
	}

	if (keyCode === 39 && game.player.playerPosX < WIDTH - STEP) {
		//console.log("right");
		game.player.player1Image = loadImage("player-left.png");
		game.player.move(STEP, 0);
	}

	if (keyCode === 38 && game.player.playerPosY > 0) {
		//console.log("up");
		game.player.player1Image = loadImage("player-forward.png");
		game.player.move(0, -STEP);
	}

	if (keyCode === 40 && game.player.playerPosY < HEIGHT - STEP) {
		//console.log("down");
		game.player.player1Image = loadImage("player-backward.png");
		game.player.move(0, STEP);
	}

	/// Keys player 2
	if (keyCode === 65 && game.player2.playerPosX > 0) {
		game.player2.player1Image = loadImage("player-right.png");
		//console.log("left player2");
		game.player2.move(-STEP, 0);
	}

	if (keyCode === 68 && game.player2.playerPosX < WIDTH - STEP) {
		game.player2.player1Image = loadImage("player-left.png");
		//console.log("right player2");
		game.player2.move(STEP, 0);
	}

	if (keyCode === 87 && game.player2.playerPosY > 0) {
		game.player2.player1Image = loadImage("player-forward.png");
		//console.log("up player2");
		game.player2.move(0, -STEP);
	}

	if (keyCode === 83 && game.player2.playerPosY < HEIGHT - STEP) {
		game.player2.player1Image = loadImage("player-backward.png");
		//console.log("down player2");
		game.player2.move(0, STEP);
	}
}

// inverse direction at end / beginning of canvas
// if (this.x === 300 - this.width) {
// 	direction = direction * -1;
// }
// if (this.y < 0) {
// 	direction = direction * -1;
// }
// this.x += direction * 4;
