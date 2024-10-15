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
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.render(deltaTime);
        requestAnimationFrame(animate);
        console.log(timestamp, deltaTime)

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



        // Snake(Player's model)
        this.snake = new Snake(this, 0, 0, 0, 1);

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
    };

    // Draw objects on canvas
    render(deltaTime){
        this.drawGrid();
        this.snake.draw();
        this.snake.update();
    };
};

