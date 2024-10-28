

class AudioControl{
    constructor(){
        this.bite1 = document.querySelector('#bite1');
        this.bad_food = document.querySelector('#bad_food');
        this.start = document.querySelector('#start');
        this.restart = document.querySelector('#restart');
        this.win = document.querySelector('#win');
    }

    play(sound){
        sound.currentTime = 0;
        sound.play();
    }
}
export default AudioControl;