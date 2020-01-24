/// ----- Game constants
const HEIGHT = 650; // canvas height
const WIDTH = 800; // canvas width
const PLAYERWIDTH = 50;
const PLAYERHEIGHT = 50;
const OBSTACLEHEIGHT = 50;
const STEP = 50; // STEP should be euqal to PLAYERWIDTH/HEIGHT

/// ----- Globals
let carSpawnSpeed = 50;
let carSpeed = 4;

//soundFormats('mp3', 'ogg');
let frogJump;
let carHonk;

/// ----- Styling constants
const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");
const lives1 = document.querySelector("#lives1");
const lives2 = document.querySelector("#lives2");

/// ----- Background
class Background {
	constructor() {
		this.backgroundImage = loadImage("bg2.png");
	}

	draw() {
		image(this.backgroundImage, 0, 0);
	}
}


/// start the Game
console.clear();
const game = new Game();
const player = new Player(0, 0);
const player2 = new Player(0, 0);
const obstacle = new Obstacle();
const noObstacle = new NoObstacle();

function preload() {
 frogJump = loadSound('jump.mp3');
 carHonk = loadSound('honk.mp3');
 audience = loadSound('audience.mp3');
 splash = loadSound('splash.mp3');
		game.init();
}

function setup() {
	game.setup();
}

function draw() {
	game.draw();
}

/// Keyboard inputs, boundary check, player alive check
function keyPressed() {
	/// --- Keys Player 1

	frogJump.play();
	if (game.player.state === true) {
		if (keyCode === 37 && game.player.playerPosX > 0) {
			game.player.player1Image = loadImage("player-right.png");
			game.player.move(-STEP, 0);
		}

		if (keyCode === 39 && game.player.playerPosX < WIDTH - STEP) {
			game.player.player1Image = loadImage("player-left.png");
			game.player.move(STEP, 0);
		}

		if (keyCode === 38 && game.player.playerPosY >= 0) {
			game.player.player1Image = loadImage("player-forward.png");
			game.player.move(0, -STEP);
		}

		if (keyCode === 40 && game.player.playerPosY < HEIGHT - STEP) {
			game.player.player1Image = loadImage("player-backward.png");
			game.player.move(0, STEP);
		}
	}
	if (game.player2.state === true) {
		/// ---- Keys Player 2
		if (keyCode === 65 && game.player2.playerPosX > 0) {
			game.player2.player1Image = loadImage("player-right.png");
			game.player2.move(-STEP, 0);
		}

		if (keyCode === 68 && game.player2.playerPosX < WIDTH - STEP) {
			game.player2.player1Image = loadImage("player-left.png");
			game.player2.move(STEP, 0);
		}

		if (keyCode === 87 && game.player2.playerPosY >= 0) {
			game.player2.player1Image = loadImage("player-forward.png");
			game.player2.move(0, -STEP);
		}

		if (keyCode === 83 && game.player2.playerPosY < HEIGHT - STEP) {
			game.player2.player1Image = loadImage("player-backward.png");
			game.player2.move(0, STEP);
		}
	}
}