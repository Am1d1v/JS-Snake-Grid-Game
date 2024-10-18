

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
        this.moving = true;

        // Player's score
        this.score = 0;

        // Player's length
        this.length = 2;

        // Player's body segments
        this.segments = [];
    }

    // Draw player
    draw(){
        this.segments.forEach((segment, i) => {
            if(i === 0) this.game.context.fillStyle = 'purple'
            else {this.game.context.fillStyle = this.color;}
                
            this.game.context.fillRect(segment.x * this.game.cellSize, segment.y * this.game.cellSize, this.width, this.height);
            
            
        });
        
    }

    // Update player's state
    update(){
        if(this.moving){
            this.x += this.speedX;
            this.y += this.speedY;
            this.segments.unshift({
                x: this.x,
                y: this.y
            });

            if(this.segments.length > this.length){
                this.segments.pop();
            }
        }

        // Boundaries
        // X Axis Boundaries
        if(this.x < 1 && this.speedX < 0 || this.x >= this.game.colums - 1 && this.speedX > 0) {
            this.moving = false;
            this.x = 0;
        };
            
        // Y Axis Boundaries
        if(this.y < 1 && this.speedY < 0 || this.y >= this.game.rows - 1 && this.speedY > 0){
            this.moving = false;
            this.y = 0;
        }

        // Check collision
        if(this.game.checkCollision(this, this.game.food)){
            this.score++;
            this.game.food.reset();
            this.length++;
        }
    }

    // Snake Movement Manipulation
    turnUp(){
        if(this.speedY == 0){
            this.speedX = 0;
            this.speedY = -1;
            this.moving = true;
        }
        
    }

    turnRight(){
        if(this.speedX === 0){
            this.speedX = 1;
            this.speedY = 0;
            this.moving = true;
        }
    }

    turnDown(){
        if(this.speedY === 0){
            this.speedX = 0;
            this.speedY = 1;
            this.moving = true;
        }
    }

    turnLeft(){
        if(this.speedX === 0){
            this.speedX = -1;
            this.speedY = 0;
            this.moving = true;
        }
    }
};


// Snakes' Behavior. Direction Manipulation with arrow keys
export class Keyboard1 extends Snake {
    constructor(game, x, y, speedX, speedY, color){
        super(game, x, y, speedX, speedY, color);

        window.addEventListener('keydown', (e) => {

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

// Snakes' Behavior. Direction Manipulation with WASD
export class Keyboard2 extends Snake {
    constructor(game, x, y, speedX, speedY, color){
        super(game, x, y, speedX, speedY, color);

        window.addEventListener('keydown', (e) => {

            // Player's movement direction
            if(e.key === 'd' || e.key === 'D'){
                this.turnRight();
            } else if (e.key === 's' || e.key === 'S'){
                this.turnDown();
            } else if (e.key === 'a' || e.key === 'A'){
                this.turnLeft();
            } else if (e.key === 'w' || e.key === 'W'){
                this.turnUp();
            }


        });
    }
}

// Snake controlled by Computer
export class ComputerAI extends Snake{
    constructor(game, x, y, speedX, speedY, color){
        super(game, x, y, speedX, speedY, color);

        // Timer to turn in random direction
        this.turnTimer = 0;

        // Number of steps to turn in random direction
        this.turnInterval = Math.floor(Math.random() * this.game.colums + 1);
    };

    // Update snake's status
    update(){
        super.update();
        if(this.turnTimer < this.turnInterval){
            this.turnTimer += 1;
        } else {
            this.turnTimer = 0;
            this.turn();
            this.turnInterval = Math.floor(Math.random() * this.game.colums + 1);
        };

    }

    // Turn in random direction
    turn(){
        if(this.speedY === 0){
            Math.random() < 0.5 ? this.turnUp() : this.turnDown();
        } else if (this.speedX === 0){
            Math.random() < 0.5 ? this.turnLeft() : this.turnRight();
        }
    };  

};