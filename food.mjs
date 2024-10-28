

class Food {
    constructor(game){
        this.game = game;
        this.x;
        this.y;
        this.reset();
        this.image = document.querySelector('#food');
        this.spriteWidth = 200;
        this.spriteHeight = 400;
        this.reset();

        // Current frame of X axis
        this.frameX;

        // Current frame of Y axis
        this.frameY;

        // Max number of frames
        this.maxFrames = 8;
    };

    // Spawn if collisioned with snake
    reset(){
        this.x = Math.floor(Math.random() * this.game.colums);
        this.y = Math.floor(Math.random() * (this.game.rows - 2) + 2);

        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 3);
    };

    draw(){
        this.game.context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x * this.game.cellSize, (this.y - 1) * this.game.cellSize, this.game.cellSize, this.game.cellSize * 2);
    }

    update(){
        if(this.frameX < this.maxFrames) this.frameX++
    }
};

export default Food;