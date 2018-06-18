// Enemies our player must avoid
var Enemy = function(x , y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 175;
    this.speed = Math.floor(Math.random()* (300-100)) + 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computer
    this.x += Math.round(this.speed *dt);

    arrayY= [45,130,215];
    if (this.y === 0){
        this.y = arrayY[Math.floor(Math.random()*arrayY.length)];
    }

    this.collides = function (other) {
        let d = (this.x, this.y, this.width, this.height, other.x, other.y, other.width, other.height);
        if (d.x < d.x + d.width && d.x + d.width > d.x && d.y < d.y + d.height && d.y + d.height > d.y){
            return true;
        } else {
            return false;
        }
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x = 200, y = 300, width = 100, height = 175) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.boy = 'images/char-boy.png';
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies;
let player;

function init() {
    allEnemies = [];
    player = new Player();
    allEnemies.push(new Enemy());
    setInterval (function () {
        for (var i = 0; i < allEnemies.length; i++) {
            for (let j = 0; j < allEnemies.length; j++) {
                if (i != j && allEnemies[i].collides(player)){
                console.log('hello')
                }
            }
        }
    },750);
}

init();

//if (collision(Player, Enemy)){
//    console.log('hello')
//}
//function collision(a, b) {
//    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y ;
//}

//init()

player.update = function (y){
    player.handleInput(y);
    if(this.x === 500){
        this.x = 400;
    } if(this.x === -100) {
        this.x = 0;
    } if (this.y === 470) {
        this.y = 385;
    } else if (this.y === -40) {
        this.x = 200;
        this.y = 300;
    }
}

player.handleInput = function(y) {
    if (y === 'left'){
        this.x -= 100;
    } if (y === 'right'){
        this.x += 100;
    } if (y === 'up'){
        this.y -= 85;
    } if (y === 'down'){
        this.y += 85;
    }
}
player.render = function() {
    ctx.drawImage(Resources.get(this.boy), this.x, this.y);
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
