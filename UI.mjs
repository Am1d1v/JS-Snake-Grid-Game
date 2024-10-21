
class UI {
    constructor(game){
        this.game = game;

        // Display Score
        this.scoreBoard1 = document.querySelector('#scoreBoard1');
        this.scoreBoard2 = document.querySelector('#scoreBoard2');
        this.scoreBoard3 = document.querySelector('#scoreBoard3');
        this.scoreBoard4 = document.querySelector('#scoreBoard4');

        const debugBuggton = document.querySelector('#debugButton')
        const gameMenu = document.querySelector('#gameMenu');
        const startGame = document.querySelector('#startButton');

        // Hide menu
        debugBuggton.addEventListener('click', () => gameMenu.classList.toggle('hide'));

        startGame.addEventListener('click', () => {
            this.game.start();
            startGame.innerText = this.game.gameOver ? 'Start' : 'Restart'
        });
    }

    update(){
        this.scoreBoard1.innerText = this.game.player1.name + ': ' + this.game.player1.score;
        this.scoreBoard2.innerText = this.game.player2.name + ': ' + this.game.player2.score;
        this.scoreBoard3.innerText = this.game.player3.name + ': ' + this.game.player3.score;
        this.scoreBoard4.innerText = this.game.player4.name + ': ' + this.game.player4.score;
    }

    triggerGameOver(){
        this.game.gameOver = true;
    }
}

export default UI;