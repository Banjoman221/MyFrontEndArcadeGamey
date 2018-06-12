// Enemies our player must avoid
var Enemy = function(x , y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
        this.x = this.x+(Math.random() * 10 *dt*35);
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.boy = 'images/char-boy.png';
        function render() {
            ctx.drawImage(Resources.get(this.boy), this.x ,this.y);
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


let allEnemies = [];
let newEnemies = setInterval(function () {
allEnemies.push(new Enemy(0,62));
allEnemies.push(new Enemy(0,145));
allEnemies.push(new Enemy(0,227));
},1000);

let player = [];
player.push(new Player(100,100));

player.handleInput = function (){
}

player.update = function(dt) {
}
player.render = function() {
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
