
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

        // Get player name
        this.player1name = document.querySelector('#player1Name');
        this.player2name = document.querySelector('#player2Name');
        this.player3name = document.querySelector('#player3Name');
        this.player4name = document.querySelector('#player4Name');

        // Messages
        this.message1 = document.querySelector('#message1');
        this.message2 = document.querySelector('#message2');
    }

    update(){
        this.scoreBoard1.innerText = `${this.player1name.value || 'Player 1'}` + ': ' + this.game.player1.score;
        this.scoreBoard2.innerText = `${this.player2name.value || 'Player 2'}` + ': ' + this.game.player2.score;
        this.scoreBoard3.innerText = `${this.player3name.value || 'Player 3'}` + ': ' + this.game.player3.score;
        this.scoreBoard4.innerText = `${this.player4name.value || 'Player 4'}` + ': ' + this.game.player4.score;
    }

    triggerGameOver(winner){
        this.game.gameOver = true;
        this.gameOverUI();

        // Set message text
        this.message1.innerText = winner ? `${"Winner: " +  winner}` : 'No winner';
        this.message2.innerText = 'Press start to try again';
        
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

        // Play restart sound
        this.game.sound.play(this.game.sound.restart);
    }
}

export default UI;