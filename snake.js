

class Snake {
    constructor(game, x, y, speedX, speedY){
        this.game = game;

        // Initial position
        this.x = x;
        this.y = y;

        // Horizontal/Vertical speed
        this.speedX = speedX;
        this.speedY = speedY;
    }

    // Draw player
    draw(){
        this.game.context.fillStyle = 'blue';
        this.game.context.fillRect(this.x, this.y, 20, 20);
    }

    // Update player's state
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
};