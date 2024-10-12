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
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // Snake
        this.snake = new Snake(this, 0, 0, 1, 1);

        window.addEventListener('resize', (event) => {
            this.resize(event.currentTarget.innerWidth, event.currentTarget.innerHeight);
        });
    };

    // Set canvas size
    resize(width, height){
        this.canvas.width = Math.floor(width);
        this.canvas.height = Math.floor(height);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.render();
    };

    // Draw objects on canvas
    render(){
        this.snake.draw();
        this.snake.update();
    };
};

