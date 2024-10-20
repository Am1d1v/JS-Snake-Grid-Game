

class Background{
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = this.game.cellSize * 8;
        this.height = this.game.cellSize * (this.game.topMargin + 1);

        // How many times to repeat background
        this.repeats = this.game.width / this.width;

        // Forest Background image
        this.image = document.querySelector('#forest_image');
    }

    draw(){
        for (let i = 0; i < this.repeats; i++) {
            this.game.context.drawImage(this.image, this.x + i * this.width, this.y, this.width, this.height);
        }
        
    }
}
export default Background;