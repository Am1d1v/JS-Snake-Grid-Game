
class UI {
    constructor(game){
        this.game = game;

        // Display Score
        this.scoreBoard1 = document.querySelector('#scoreBoard1');
        this.scoreBoard2 = document.querySelector('#scoreBoard2');
        this.scoreBoard3 = document.querySelector('#scoreBoard3');
        this.scoreBoard4 = document.querySelector('#scoreBoard4');
    }

    update(){
        this.scoreBoard1.innerText = 'P1: ' + this.game.player1.score;
    }
}

export default UI;