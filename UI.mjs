
class UI {
    constructor(game){
        this.game = game;

        // Display Score
        this.scoreBoard1 = document.querySelector('#scoreBoard1');
        this.scoreBoard2 = document.querySelector('#scoreBoard2');
        this.scoreBoard3 = document.querySelector('#scoreBoard3');
        this.scoreBoard4 = document.querySelector('#scoreBoard4');


        this.gameMenu = document.querySelector('#gameMenu');

        this.startGame = document.querySelector('#startButton');
        this.startGame.addEventListener('click', () => this.game.start());

        // Game over screen
        this.gameOverScreen = document.querySelector('#gameOverScreen');

        // Full screen 
        this.fullScreen = document.querySelector('#fullscreenButton');
        this.fullScreen.addEventListener('click', () => {
            this.game.toggleFullscreen();
        });

        // Debug mode toggle
        this.debugButton = document.querySelector('#debugButton');
        this.debugButton.addEventListener('click', () => {
            this.game.isDebug = !this.game.isDebug;
        })
    }

    update(){
        this.scoreBoard1.innerText = this.game.player1.name + ': ' + this.game.player1.score;
        this.scoreBoard2.innerText = this.game.player2.name + ': ' + this.game.player2.score;
        this.scoreBoard3.innerText = this.game.player3.name + ': ' + this.game.player3.score;
        this.scoreBoard4.innerText = this.game.player4.name + ': ' + this.game.player4.score;
    }

    triggerGameOver(){
        this.game.gameOver = true;
        this.gameOverUI();
    }

    // UI while game is running
    gameplayUI(){
        this.gameMenu.style.display = 'none';
        this.startGame.innerText = 'Restart';
        this.gameOverScreen.style.display = 'none';
    }

    // UI if gameOver
    gameOverUI(){
        this.gameMenu.style.display = 'block';
        this.startGame.innerText = 'Start';
        this.gameOverScreen.style.display = 'block';
    }
}

export default UI;