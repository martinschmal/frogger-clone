/// ----- Game constants
const HEIGHT = 650; // canvas height
const WIDTH = 800; // canvas width
const PLAYERWIDTH = 50;
const PLAYERHEIGHT = 50;

const OBSTACLEHEIGHT = 50;
let direction = -1;
const STEP = 50; // STEP should be euqal to PLAYERWIDTH/HEIGHT

/// ----- Styling constants
const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");
const lives1 = document.querySelector("#lives1");
const lives2 = document.querySelector("#lives2");

class Background {
	constructor() {
		this.backgroundImage = loadImage("bg2.png");
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
		this.player = new Player(lives1);
		this.player2 = new Player(lives2);
	}

	setup() {
		createCanvas(WIDTH, HEIGHT);
		this.player.setupPlayer1();
		this.player2.setupPlayer2();
	}
	checkCollision(player, obst) {
		if (
			player.playerPosX + player.width / 2 > obst.x &&
			player.playerPosX + player.width / 2 < obst.x + obst.width + player.width / 2
		) {
			if (
				player.playerPosY + player.height / 2 > obst.y &&
				player.playerPosY + player.height / 2 < obst.y + obst.height + player.height / 2
			) {
				player.dying();
			}
		}
	}

	checkTravel(player, nOobst) {
		if (
			player.playerPosX + player.width / 2 > nOobst.x &&
			player.playerPosX + player.width / 2 < nOobst.x + nOobst.width + player.width / 2
		) {
			if (
				player.playerPosY + player.height / 2 > nOobst.y &&
				player.playerPosY + player.height / 2 < nOobst.y + nOobst.height + player.height / 2
			) {
				//player.travel();
				player.playerPosX = nOobst.x + nOobst.width / 3;
				player.playerPosY = nOobst.y;
				player.draw(); // Player 1 is drawn on top of noObstacle

			}
		 }
	}

	draw() {
		this.background.draw();
		this.player.draw();
		this.player2.draw();

		/// Create new Obstacles
		if (frameCount % 50 === 0) {
			this.obstacles.push(new Obstacle());
		}

		if (frameCount % 240 === 0) {
			this.x = -100;
			this.y = 400;
			this.noObstacles.push(new NoObstacle(1, this.x, this.y));

			this.x = 800;
			this.y = 450;
			this.noObstacles.push(new NoObstacle(-1, this.x, this.y));

			this.x = -100;
			this.y = 500;
			this.noObstacles.push(new NoObstacle(1, this.x, this.y));

			this.x = 800;
			this.y = 550;
			this.noObstacles.push(new NoObstacle(-1, this.x, this.y));
		}
		/// delete if more than 10 obstacles
		if (this.obstacles.length > 20) {
			this.obstacles.shift();
		}

		/// delte if more than 10 obstacles
		if (this.noObstacles.length > 50) {
			this.noObstacles.shift();
		}

		/// Obstacle collision - Players reset to start
		this.obstacles.forEach((obstacle) => {
			obstacle.draw();
			this.checkCollision(this.player, obstacle);
			this.checkCollision(this.player2, obstacle);
		});

		/// No-Obstacle collision - Players travelling with Object
		this.noObstacles.forEach((noObstacle) => {
			noObstacle.draw();
			this.checkTravel(this.player, noObstacle);
			this.checkTravel(this.player2, noObstacle);
		});

		/// Player 1 reaches top top screen
		if (game.player.playerPosY <= 0) {
			score1.innerHTML += 10;
			game.player.setupPlayer1();
		}

		/// Player 2 reaches top top screen
		if (game.player2.playerPosY <= 0) {
			score2.innerHTML += 10;
			game.player2.setupPlayer2();
		}

		/// Player 1 is killd by travelling out of screen
		if (game.player.playerPosX > WIDTH + 50 || game.player.playerPosX < -50) {
			lives1.innerHTML--;
			game.player.setupPlayer1();
		}

		/// Player 2 is killd by travelling out of screen
		if (game.player2.playerPosX > WIDTH + 50 || game.player2.playerPosX < -50) {
			lives2.innerHTML--;
			game.player2.setupPlayer2();
		}
	}
}

class Player {
	constructor(livesHTML) {
		this.player1Image = loadImage("player-forward.png");
		this.playerDead = loadImage("dead1.png");
		this.state = true;
		this.width = PLAYERWIDTH;
		this.height = PLAYERHEIGHT;
		this.playerLives = 0;
		this.livesHTML = livesHTML;
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
		if (!this.state) {
			image(this.playerDead, this.playerPosX, this.playerPosY, 50, 50);
			if (frameCount % 120 === 0) {
				this.state = true;
				this.livesHTML.innerHTML--;
				//setupPlayer1();
			}
		} else {
			image(this.player1Image, this.playerPosX, this.playerPosY, this.width, this.height);
		}
	}

	move(x, y) {
		if (this.state) {
			this.playerPosX += x;
			this.playerPosY += y;
		}
	}
	dying() {
		this.state = false;
	}
}

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
		this.y = Math.floor(Math.random() * 4) * 50 + 50; // obstacles not in first and last row
		this.i = Math.floor(Math.random() * 4); // randomize the 4 images
		this.counter = 0;
	}

	draw() {
		let i = 1;
		this.x += 3; // speed of obstacales
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
		this.x += this.direction; // speed of obstacales
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

	if (game.player.state === true) {
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
	}
	if (game.player.state === true) {
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
}
