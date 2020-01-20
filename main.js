function setup() {
}

function draw() {
  ellipse(50, 50, 80, 80);
}

class background{
    constructor() {}
    //
    this.backgroundImage = loadImage("canvas.png");
}

draw (backgroundImage);
{}


class Games {
    constructor(){
        console.log("Game Start");
    }

    init() {
        this.background = new Background();
        
    }
    
}

const Game = new Game();

