import Food from "./food.mjs";
import {ComputerAI, Keyboard1, Keyboard2 } from "./snake.mjs";
import UI from './UI.mjs';
import Background from "./Background.mjs";

window.addEventListener('load', () => {

    const canvas = document.querySelector('#canvas1');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(canvas, context);

    let lastTime = 0;

    // Animate(rerender) object
    function animate(timestamp){
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        game.render(deltaTime);
        requestAnimationFrame(animate);

    };   
    requestAnimationFrame(animate);

});

// State of the game & state of all game objects
class Game {
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width;
        this.height;
        
        // Size(Width & Height) of the grid
        this.cellSize = 60;

        // Quantity of columns on the screen
        this.colums;

        // Quantity of rows on the screen
        this.rows;

        this.topMargin = 2;

        // Timing Animation
        // Delta time accumulation
        this.eventTimer = 0;

        // How frequently in milliseconds animation updates
        this.eventInterval = 200;
        
        // If true => update  animation
        this.eventUpdate = false;

        // Is game over
        this.gameOver = true;

        // Snake(Player's model)
        this.player1;
        this.player2;
        this.player3;
        this.player4;

        this.food;

        this.backGround;

        // Quantity of players
        this.gameObjects;

        // Game UI
        this.gameUI = new UI(this);

        // Scores to win
        this.winningScore = 2;

        window.addEventListener('resize', (event) => {
            this.resize(event.currentTarget.innerWidth, event.currentTarget.innerHeight);
        });
        this.resize(this.canvas.width, this.canvas.height);
    };

    // Render game grid
    drawGrid(){
        for(let y = 0; y <= this.rows; y++){
            for(let x = 0; x <= this.colums; x++){
                this.context.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    // Set canvas size
    resize(width, height){
        this.canvas.width = width - width % this.cellSize;
        this.canvas.height = height - height % this.cellSize; 
        this.context.fillStyle = 'white'
        this.context.font = '30px Impact';
        this.context.textBaseline = 'top';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.colums = this.width / this.cellSize;
        this.rows = this.height / this.cellSize;
        this.backGround = new Background(this);
        
    };

    // Start & Restart the gtame
    start(){
        this.gameOver = false;

        // Snake(Player's model)
        this.player1 = new Keyboard1(this, 0, this.topMargin, 0, 0, 'magenta', 'P1');
        this.player2 = new ComputerAI(this, 0, this.rows - 1, 0, 0, 'black', 'Player2');
        this.player3 = new ComputerAI(this, this.colums - 1, this.topMargin, 0, 0, 'White', 'Player 3');
        this.player4 = new ComputerAI(this, this.colums - 1, this.rows - 1, 0, 0, 'navy', 'P4');

        // Food initialization
        this.food = new Food(this);

        // Quantity of players
        this.gameObjects = [this.player1, this.player2, this.player3, this.player4, this.food];

        this.drawGrid();
    }

    // Display game status text
    drawStatusText(){
        this.context.fillText('P1: ' + this.player1.score, this.cellSize, this.cellSize);
        this.context.fillText('P2: ' + this.player2.score, this.cellSize, this.cellSize * 2);
        this.context.fillText('P3: ' + this.player3.score, this.cellSize, this.cellSize * 3);
        this.context.fillText('P4: ' + this.player4.score, this.cellSize, this.cellSize * 4);
    }

    // Collision Detection
    checkCollision(Object1, Object2){
        return Object1.x === Object2.x && Object1.y === Object2.y;
    }

    // Handle Animation Timing
    handlePeriodicEvents(deltaTime){
        if(this.eventTimer < this.eventInterval){
            this.eventTimer += deltaTime;
            this.eventUpdate = false;
        } else {
            this.eventTimer = 0;
            this.eventUpdate = true;
        };
    }


    // Draw objects on canvas
    render(deltaTime){
        this.handlePeriodicEvents(deltaTime);
        

        // Update player's movement animation every eventTimer value milliseconds
        if(this.eventUpdate && !this.gameOver){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.backGround.draw();
            this.drawGrid();
            

            //Render & update player's state
            this.gameObjects.forEach(gameObj => {
                gameObj.draw();
                gameObj.update();
            });
            // Update player's score
            this.gameUI.update();

        };

    };
};

