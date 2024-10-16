

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

        // Is player moving
        this.moving = false;
    }

    // Draw player
    draw(){
        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(this.x * this.game.cellSize, this.y * this.game.cellSize, this.width, this.height);
    }

    // Update player's state
    update(){
        if(this.moving){
            this.x += this.speedX;
            this.y += this.speedY;
        }

        // Boundaries
        // X Axis Boundaries
        if(this.x < 1 && this.speedX < 0 || this.x >= this.game.colums - 1 && this.speedX > 0) this.moving = false;
            
        // Y Axis Boundaries
        if(this.y < 1 && this.speedY < 0 || this.y >= this.game.rows - 1 && this.speedY > 0) this.moving = false;
        console.log(this.game.rows, this.y)
    }

    // Snake Movement Manipulation
    turnUp(){
        this.speedX = 0;
        this.speedY = -1;
        this.moving = true;
    }

    turnRight(){
        this.speedX = 1;
        this.speedY = 0;
        this.moving = true;
    }

    turnDown(){
        this.speedX = 0;
        this.speedY = 1;
        this.moving = true;
    }

    turnLeft(){
        this.speedX = -1;
        this.speedY = 0;
        this.moving = true;
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