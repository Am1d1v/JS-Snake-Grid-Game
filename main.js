window.addEventListener('load', () => {

    const canvas = document.querySelector('#canvas1');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(canvas, context);

    // Animate(rerender) object
    function animate(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.render();
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
        // Snake
        this.snake = new Snake(this, 0, 0, 1, 1);

        
        // Size(Width & Height) of the grid
        this.cellSize = 60;

        // Quantity of columns on the screen
        this.colums;

        // Quantity of rows on the screen
        this.rows;


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
        this.render();
        this.drawGrid();
    };

    // Draw objects on canvas
    render(){
        this.drawGrid();
        this.snake.draw();
        this.snake.update();
    };
};

