// Enemies our player must avoid
var Enemy = function(x , y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x
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
    this.x = this.x+(Math.random()  * 10 *dt*35);
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
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
allEnemies[Math.floor(Math.random()*allEnemies.length)]
setInterval(function () {
allEnemies.push(new Enemy(0,62));
allEnemies.push(new Enemy(0,145));
allEnemies.push(new Enemy(0,227));
},1000);




allEnemies.forEach(function() {

});

console.log(allEnemies)

let player = new Player(200,300);
console.log(player)

player.handleInput = function (y){
    player.update(y);
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

player.update = function(y) {
    if (y === 'left'){
        this.x -= 100;
    } if (y === 'right'){
        this.x += 100;
    } if (y === 'up'){
        this.y -= 85;
    } if (y === 'down'){
        this.y += 85;
    } else {
        this.x += 0;
        this.y += 0;
    }
}
player.render = function() {
    ctx.drawImage(Resources.get(this.boy),this.x,this.y);
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
