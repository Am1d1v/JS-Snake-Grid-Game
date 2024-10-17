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

        // Timing Animation
        // Delta time accumulation
        this.eventTimer = 0;

        // How frequently in milliseconds animation updates
        this.eventInterval = 200;
        
        // If true => update  animation
        this.eventUpdate = false;

        // Snake(Player's model)
        this.player1;
        this.player2;
        this.player3;
        this.player4;

        this.food;

        // Quantity of players
        this.gamePlayers;


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
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.colums = this.width / this.cellSize;
        this.rows = this.height / this.cellSize;
        this.drawGrid();

        // Snake(Player's model)
        this.player1 = new Keyboard1(this, 0, 0, 0, 0, 'magenta');
        this.player2 = new Keyboard2(this, 0, this.rows - 1, 0, 0, 'black');
        this.player3 = new ComputerAI(this, this.colums - 1, 0, 0, 0, 'White');
        this.player4 = new ComputerAI(this, this.colums - 1, this.rows - 1, 0, 0, 'navy');

        // Quantity of players
        this.gamePlayers = [this.player1, this.player2, this.player3, this.player4];

        // Food initialization
        this.food = new Food(this);
    };

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
        if(this.eventUpdate){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawGrid();

            //Render & update player's state
            this.gamePlayers.forEach(player => {
                player.draw();
                player.update();
            })

        };

    };
};

