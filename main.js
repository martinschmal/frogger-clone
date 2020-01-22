/// ----- Game constants
const HEIGHT = 600; // canvas height
const WIDTH = 800; // canvas width
const PLAYERWIDTH = 50;
const PLAYERHEIGHT = 50;
const OBSTACLEHEIGHT = 50;
const STEP = 50; // STEP should be euqal to PLAYERWIDTH/HEIGHT

/// ----- Styling constants
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
		this.noObstacles = [];
	}

	init() {
		this.background = new Background();
		this.obstacle = new Obstacle();
		this.noObstacle = new NoObstacle();
		this.player = new Player();
		this.player2 = new Player();
	}

	setup() {
		createCanvas(WIDTH, HEIGHT);
		this.player.setupPlayer1();
		this.player2.setupPlayer2();
	}

	draw() {
		this.background.draw();
		this.player.draw();
		this.player2.draw();

		/// Every 100 frames a new Object
		if (frameCount % 80 === 0) {
			this.obstacles.push(new Obstacle());
		}

		if (frameCount % 40 === 0) {
			this.noObstacles.push(new NoObstacle());
		}

		/// delte if more than 10 obstacles
		if (this.obstacles.length > 10) {
			this.obstacles.shift();
		}

		/// delte if more than 10 obstacles
		if (this.noObstacles.length > 10) {
			this.noObstacles.shift();
		}

		/// ---------------------------Obstacle collision - Player 1 reset to start
		this.obstacles.forEach(function(obstacle) {
			obstacle.draw();
			if (
				game.player.playerPosX + game.player.width > obstacle.x &&
				game.player.playerPosX + game.player.width < obstacle.x + obstacle.width + game.player.width
			) {
				if (
					game.player.playerPosY + game.player.height > obstacle.y &&
					game.player.playerPosY + game.player.height < obstacle.y + obstacle.height + game.player.height
				) {
					// on collission kill player1
					game.player.setupPlayer1();
					lives1.innerHTML--;
				}
			}

			/// ---------------------------Obstacle collision - Player 2 reset to start
			if (
				game.player2.playerPosX + game.player2.width > obstacle.x &&
				game.player2.playerPosX + game.player2.width < obstacle.x + obstacle.width + game.player2.width
			) {
				if (
					game.player2.playerPosY + game.player2.height > obstacle.y &&
					game.player2.playerPosY + game.player2.height < obstacle.y + obstacle.height + game.player2.height
				) {
					// on collission kill player2
					game.player2.setupPlayer2();
					lives2.innerHTML--;
				}
			}
		});

		/// ---------------------------No Obstacle collision - Player 1 travels with object
		this.noObstacles.forEach(function(noObstacle) {
			noObstacle.draw();
			if (
				game.player.playerPosX + game.player.width > noObstacle.x &&
				game.player.playerPosX + game.player.width < noObstacle.x + noObstacle.width + game.player.width
			) {
				if (
					game.player.playerPosY + game.player.height > noObstacle.y &&
					game.player.playerPosY + game.player.height < noObstacle.y + noObstacle.height + game.player.height
				) {
					game.player.playerPosX = noObstacle.x + game.noObstacle.width / 3;
					game.player.playerPosY = noObstacle.y;
					game.player.draw(); // Player 1 is drawn on top of noObstacle
				}
			}

			/// ---------------------------No Obstacle collision - Player 2 travels with object
			if (
				game.player2.playerPosX + game.player2.width > noObstacle.x &&
				game.player2.playerPosX + game.player2.width < noObstacle.x + noObstacle.width + game.player2.width
			) {
				if (
					game.player2.playerPosY + game.player2.height > noObstacle.y &&
					game.player2.playerPosY + game.player2.height <
						noObstacle.y + noObstacle.height + game.player2.height
				) {
					game.player2.playerPosX = noObstacle.x + game.noObstacle.width / 3;
					game.player2.playerPosY = noObstacle.y;
					game.player2.draw(); // Player 2 is drawn on top of noObstacle
				}
			}
			//// --------------------------Other conditions for both Players

			/// Player 1 reaches top top screen
			if (game.player.playerPosY <= 0) {
				score1.innerHTML++;
				console.log("goal1");
				game.player.setupPlayer1();
			}

			/// Player 2 reaches top top screen
			if (game.player2.playerPosY <= 0) {
				score2.innerHTML++;
				console.log("goal2");
				game.player2.setupPlayer2();
			}

			/// Player 1 is killd by travelling out of screen
			if (game.player.playerPosX > WIDTH) {
				lives1.innerHTML--;
				game.player.setupPlayer1();
				console.log("kill 1");
			}

			/// Player 2 is killd by travelling out of screen
			if (game.player2.playerPosX > WIDTH) {
				lives2.innerHTML--;
				game.player2.setupPlayer2();
				console.log("kill 2");
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
		image(this.player1Image, this.playerPosX, this.playerPosY, this.width, this.height);
	}

	move(x, y) {
		this.playerPosX += x;
		this.playerPosY += y;
	}
}

class Obstacle {
	///----- Players are killed by this
	constructor() {
		this.obstacleImage = loadImage("taxi.png");
		this.width = 100;
		this.height = 50;
		this.x = 0;
		this.y = Math.floor(Math.random() * 5) * 50 + 50; // obstacles not in first and last row
		this.counter = 0;
	}

	draw() {
		this.x += 3; // speed of obstacales
		image(this.obstacleImage, this.x, this.y, this.width, this.height);
		console.log(game.obstacle.x);
	}
}

class NoObstacle {
	///----- Players are not killed by this and can traval on this
	constructor() {
		this.obstacleImage = loadImage("wood.png");
		this.width = 100;
		this.height = 50;
		this.x = 0;
		this.y = Math.floor(Math.random() * 5) * 50 + 300; // obstacles not in first and last row
		this.counter = 0;
	}

	draw() {
		this.x += 2; // speed of obstacales
		image(this.obstacleImage, this.x, this.y, this.width, this.height);
	}
}

/// start the Game
console.clear();
const game = new Game();
const player = new Player(1, 0, 3);
const player2 = new Player(2, 0, 3);
const obstacle = new Obstacle();
const noObstacle = new NoObstacle();

function preload() {
	game.init();
}

function setup() {
	game.setup();
}

function draw() {
	game.draw();
}

/// Keyboard inputs and boundary check
function keyPressed() {
	/// --- Keys Player 1

	if (keyCode === 37 && game.player.playerPosX > 0) {
		game.player.player1Image = loadImage("player-right.png");
		game.player.move(-STEP, 0);
	}

	if (keyCode === 39 && game.player.playerPosX < WIDTH - STEP) {
		game.player.player1Image = loadImage("player-left.png");
		game.player.move(STEP, 0);
	}

	if (keyCode === 38 && game.player.playerPosY > 0) {
		game.player.player1Image = loadImage("player-forward.png");
		game.player.move(0, -STEP);
	}

	if (keyCode === 40 && game.player.playerPosY < HEIGHT - STEP) {
		game.player.player1Image = loadImage("player-backward.png");
		game.player.move(0, STEP);
	}

	/// ---- Keys Player 2
	if (keyCode === 65 && game.player2.playerPosX > 0) {
		game.player2.player1Image = loadImage("player-right.png");
		game.player2.move(-STEP, 0);
	}

	if (keyCode === 68 && game.player2.playerPosX < WIDTH - STEP) {
		game.player2.player1Image = loadImage("player-left.png");
		game.player2.move(STEP, 0);
	}

	if (keyCode === 87 && game.player2.playerPosY > 0) {
		game.player2.player1Image = loadImage("player-forward.png");
		game.player2.move(0, -STEP);
	}

	if (keyCode === 83 && game.player2.playerPosY < HEIGHT - STEP) {
		game.player2.player1Image = loadImage("player-backward.png");
		game.player2.move(0, STEP);
	}
}
