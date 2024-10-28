

class Snake {
    constructor(game, x, y, speedX, speedY, color, name){
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
        this.length = 3;

        // Player's body segments
        this.segments = [];

        for (let i = 0; i < this.length; i++) {
            this.x += this.speedX;
            this.y += this.speedY;

            this.segments.unshift({
                x: this.x,
                y: this.y,
                frameX: 0,
                frameY: 0
            });
        }

        // Player's nickname
        this.name = name;

        // Corgi-Snake image
        this.randomSkinIndex = Math.floor(Math.random() * document.querySelectorAll('#corgi').length)
        this.corgiSkin = document.querySelectorAll('#corgi')[this.randomSkinIndex];

        // Sprite size
        this.spriteWidth = 200;
        this.spriteHeight = 200;

    }

    // Draw player
    draw(){
        this.segments.forEach((segment, i) => {
            // if(i === 0) this.game.context.fillStyle = 'purple'
            // else {this.game.context.fillStyle = this.color;}
            // this.game.context.fillRect(segment.x * this.game.cellSize, segment.y * this.game.cellSize, this.width, this.height);
            
            this.setSpriteFrame(i);

            // Set image
            this.game.context.drawImage(this.corgiSkin, segment.frameX * this.spriteWidth, segment.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, segment.x * this.game.cellSize, segment.y * this.game.cellSize, this.width, this.height)
            
        });
        
    }

    // Update player's state
    update(){
        if(this.moving){
            this.x += this.speedX;
            this.y += this.speedY;
            this.segments.unshift({
                x: this.x,
                y: this.y,
                frameX: 0,
                frameY: 0
            });

            if(this.segments.length > this.length){
                this.segments.pop();
            }
        }

        // Boundaries
        // X Axis Boundaries
        if(this.x < 1 && this.speedX < 0 || this.x >= this.game.colums - 1 && this.speedX > 0) {
            this.moving = false;
        };
            
        // Y Axis Boundaries
        if(this.y < this.game.topMargin + 1 && this.speedY < 0 || this.y >= this.game.rows - 1 && this.speedY > 0){
            this.moving = false;
        }

        // Check collision
        if(this.game.checkCollision(this, this.game.food)){

            // Non-edible food
            if(this.game.food.frameY === 1 || this.game.food.frameY === 2){
                this.score--;
                this.game.food.reset();
                if(this.length > 2){
                    this.length--;
                }
            } else { // Edible food
                this.score++;
                this.game.food.reset();
                this.length++;
            }

            
        }

        // Win condition
        if(this.score >= this.game.winningScore){
            this.game.gameUI.triggerGameOver(this.name);
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

    // Set right frame for the snake
    setSpriteFrame(index){
        const segment = this.segments[index];
        const prevSegment = this.segments[index - 1] || 0;
        const nextSegment = this.segments[index + 1] || 0;

        if(index === 0){ //head
            
            // Set head sprite direction
            if(segment.y < nextSegment.y){ // Up direction
                segment.frameX = 1;
                segment.frameY = 2;
            } else if (segment.y > nextSegment.y){ // Down direction
                segment.frameX = 0;
                segment.frameY = 4;
            } else if (segment.x < nextSegment.x){ // Left direction
                segment.frameX = 0;
                segment.frameY = 0;
            } else if (segment.x > nextSegment.x) { // Right
                segment.frameX = 2;
                segment.frameY = 1;
            }


        } else if (index === this.segments.length - 1){ // tail
            // Set tail sprite direction
            if(prevSegment.y < segment.y){ // Up
                segment.frameX = 1;
                segment.frameY = 4;
            } else if (prevSegment.y > segment.y){ // Down
                segment.frameX = 0;
                segment.frameY = 2;
            } else if (prevSegment.x < segment.x){ // Left
                segment.frameX = 2;
                segment.frameY = 0;
            } else if (prevSegment.x > segment.x){ // Right
                segment.frameX = 0;
                segment.frameY = 1;
            }
                
        } else { 
            // Set body sprite direction
            /* if(prevSegment.y < segment.y){ // Up
                segment.frameX = 1;
                segment.frameY = 3;
            } else if (prevSegment.y > segment.y){ //Down
                segment.frameX = 0;
                segment.frameY = 3;
            } else if (prevSegment.x < segment.x){ // Left
                segment.frameX = 1;
                segment.frameY = 0;
            } else if (prevSegment.x > segment.x){ // Right
                segment.frameX = 1;
                segment.frameY = 1;
            } */

            // Set body sprite direction
            if(nextSegment.x < segment.x && prevSegment.x > segment.x){ // Horizontal right
                segment.frameX = 5;
                segment.frameY = 3;
            } else if (prevSegment.x < segment.x && nextSegment.x > segment.x){ // Horizontal left
                segment.frameX = 5;
                segment.frameY = 2;
            } else if (prevSegment.y < segment.y && nextSegment.y > segment.y){ // Vertical up
                segment.frameX = 1;
                segment.frameY = 3;
            } else if (nextSegment.y < segment.y && prevSegment.y > segment.y){ // Vertical down
                segment.frameX = 0;
                segment.frameY = 3;

                // Set body rotation
            } else if (prevSegment.x < segment.x && nextSegment.y > segment.y){ // Bend turn up left
                segment.frameX = 4;
                segment.frameY = 0;
            } else if (prevSegment.x < segment.y && nextSegment.x > segment.x){ // Bend turn down left
                segment.frameX = 3;
                segment.frameY = 0;
            } else if (prevSegment.x > segment.x && nextSegment.y < segment.y){ // Bend turn down right
                segment.frameX = 3;
                segment.frameY = 1;
            } else if (prevSegment.y < segment.y && nextSegment.x < segment.x){ // Bend turn up right
                segment.frameX = 4;
                segment.frameY = 1;
            }
            
        }
    }
};


// Snakes' Behavior. Direction Manipulation with arrow keys
export class Keyboard1 extends Snake {
    constructor(game, x, y, speedX, speedY, color, name){
        super(game, x, y, speedX, speedY, color, name);

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
    constructor(game, x, y, speedX, speedY, color, name){
        super(game, x, y, speedX, speedY, color, name);

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
    constructor(game, x, y, speedX, speedY, color, name){
        super(game, x, y, speedX, speedY, color, name);

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