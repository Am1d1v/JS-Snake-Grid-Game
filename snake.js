

class Snake {
    constructor(game, x, y, speedX, speedY, color){
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

        // Snake's color
        this.color = color;
    }

    // Draw player
    draw(){
        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(this.x * this.game.cellSize, this.y * this.game.cellSize, this.width, this.height);
    }

    // Update player's state
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    // Snake Movement Manipulation
    turnUp(){
        this.speedX = 0;
        this.speedY = -1;
    }

    turnRight(){
        this.speedX = 1;
        this.speedY = 0
    }

    turnDown(){
        this.speedX = 0;
        this.speedY = 1;
    }

    turnLeft(){
        this.speedX = -1;
        this.speedY = 0;
    }
};


// Snakes' Behavior
class Keyboard1 extends Snake {
    constructor(game, x, y, speedX, speedY, color){
        super(game, x, y, speedX, speedY, color);

        window.addEventListener('keydown', (e) => {
            console.log(e.key)

            // Player's movement direction
            if(e.key === 'ArrowRight'){
                this.turnRight();
            } else if (e.key === 'ArrowDown'){
                this.turnDown();
            } else if (e.key === 'ArrowLeft'){
                this.turnLeft();
            } else if (e.key === 'ArrowUp'){
                this.turnUp();
            }


        });
    }
}