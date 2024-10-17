

class Food {
    constructor(game){
        this.game = game;
        this.x;
        this.y;
        this.reset();
    };

    // Spawn if collisioned with snake
    reset(){
        this.x = Math.floor(Math.random() * (this.game.colums - 1));
        this.y = Math.floor(Math.random() * (this.game.rows - 1));
    };

    draw(){
        this.game.context.fillStyle = 'orange';
        this.game.context.fillRect(this.x, this.y, this.game.cellSize, this.game.cellSize);
    }
};