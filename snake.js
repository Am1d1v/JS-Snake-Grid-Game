

class Snake {
    constructor(game, x, y, speedX, speedY){
        this.game = game;

        // Initial position
        this.x = x;
        this.y = y;

        // Horizontal/Vertical speed
        this.speedX = speedX;
        this.speedY = speedY;

        // Player's size
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
    }

    // Draw player
    draw(){
        this.game.context.fillStyle = 'blue';
        this.game.context.fillRect(this.x * this.game.cellSize, this.y * this.game.cellSize, this.width, this.height);
    }

    // Update player's state
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
};