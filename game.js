class Game {
	constructor() {
		this.obstacles = [];
		this.noObstacles = [];
	}   

	init() {
		this.background = new Background();
		this.obstacle = new Obstacle();
		this.noObstacle = new NoObstacle();
		this.player = new Player(lives1, score1);
		this.player2 = new Player(lives2, score2);

		
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

				textSize(32);
				text("Score: " + player.scoreHTML.innerHTML, player.playerPosX, player.playerPosY);
				fill(0, 102, 153);

				player.travelling();
				player.draw(); // Player 1 is drawn on top of noObstacle
			}
		}
	}

	draw() {
		this.background.draw();
		this.player.draw();
		this.player2.draw();

		/// Create new Obstacles
		if (frameCount % carSpawnSpeed === 0) {
			
			this.obstacles.push(new Obstacle());
        }
        
		if (frameCount % 350 === 0 ) {
			this.x = -150;
			this.y = 400;
			this.noObstacles.push(new NoObstacle(1, this.x, this.y));

			this.x = 950;
			this.y = 450;
			this.noObstacles.push(new NoObstacle(-1, this.x, this.y));

			this.x = -150;
			this.y = 500;
			this.noObstacles.push(new NoObstacle(1, this.x, this.y));

			this.x = 950;
			this.y = 550;
			this.noObstacles.push(new NoObstacle(-1, this.x, this.y));
		}
		/// delete if more than 10 obstacles in array
		if (this.obstacles.length > 20) {
			this.obstacles.shift();
		}

		/// delete if more than 10 obstacles in arry
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
		/// reaches top top screen
		/// Player 1
		if (game.player.playerPosY < 0) {
			game.player.win();
			game.player.setupPlayer1();
		}

		/// Player 2
		if (game.player2.playerPosY < 0) {
			game.player2.win();
			game.player2.setupPlayer2();
		}
		/// killd by travelling out of screen
		/// Player 1
		if (game.player.playerPosX > WIDTH + 50 || game.player.playerPosX < -50) {
			game.player.dying();
			game.player.setupPlayer1();
		}

		/// Player 2
		if (game.player2.playerPosX > WIDTH + 50 || game.player2.playerPosX < -50) {
			game.player2.dying();
			game.player2.setupPlayer2();
		}
	}
}

class Player {
	constructor(livesHTML, scoreHTML) {
		this.player1Image = loadImage("player-forward.png");
		this.playerDead = loadImage("dead1.png");
		this.state = true;
		this.width = PLAYERWIDTH;
		this.height = PLAYERHEIGHT;
		this.livesHTML = livesHTML;
		this.scoreHTML = scoreHTML;
	}

	setupPlayer1() {
		// initial position of player 1
		this.playerPosX = WIDTH / 2 + 2*STEP;
		this.playerPosY = HEIGHT - STEP;
		this.width = 50 * 0.9;
		this.height = 50 * 0.9;
	}

	setupPlayer2() {
		// initial position of player 1
		this.playerPosX = WIDTH / 2 - 4*STEP;
		this.playerPosY = HEIGHT - STEP;
		this.width = 50 * 1.1;
		this.height = 50 * 1.1;
	}

	draw() {
		// draws the players alive or dead
		if (!this.state) {
			image(this.playerDead, this.playerPosX, this.playerPosY, 50, 50);

			if (frameCount % 180 === 0 && this.livesHTML.innerHTML > 0) {
				this.state = true;
				this.livesHTML.innerHTML--;

				this.playerPosX = Math.floor(Math.random()* WIDTH);
				this.playerPosY = HEIGHT - STEP;
			}
		} else {
			image(this.player1Image, this.playerPosX, this.playerPosY, this.width, this.height);
		}
		this.checkGameOver();
	}

	checkGameOver() {
		// Games is over when all players lost all lives
		if (game.player.state === false && game.player2.state === false) {
			if (game.player.livesHTML.innerHTML == 0 && game.player2.livesHTML.innerHTML == 0) {
				//audience.play();
				textSize(120);
				text("Game Over", 50, 500);
				fill(255, 255, 255);
				textSize(48);
				text("Small Frog has " + game.player.scoreHTML.innerHTML + " Points", 100, 150);
				text("Big Frog has " + game.player2.scoreHTML.innerHTML + " Points", 100, 200);
				fill(255, 255, 255);
				if (parseInt(game.player.scoreHTML.innerHTML) > parseInt(game.player2.scoreHTML.innerHTML))
					text("Small Frog wins!", 100, 300);
				else text("Big Frog wins!", 100, 300);
			}
		}
	}

	move(x, y) {
		// players can only move if they are alive
		if (this.state) {
			this.playerPosX += x;
			this.playerPosY += y;
		}
	}
	dying() {
		// killed player by cars get false status
		carHonk.play();
		this.state = false;
		}

	travelling() {
		// players which are travelling on the woord get more points
		//splash.play();
		this.state = true;
		this.scoreHTML.innerHTML++;
	}

	win() {
		// cars speed up if one player reached goal
		audience.play();
		this.state = true;
		carSpawnSpeed = carSpawnSpeed - 1;
		carSpeed = carSpeed +1;

		textSize(48);
		text("Score: " + this.scoreHTML.innerHTML, this.playerPosX, this.playerPosY);
		fill(0, 102, 193);
		
		// 500 points for players who reach goal
		let a = parseInt(this.scoreHTML.innerHTML);
		a = a + 250;
		this.scoreHTML.innerHTML = a; 
	}
}