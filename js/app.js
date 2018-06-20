// Enemies our player must avoid
var Enemy = function(x , y, width, height) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = Math.floor(Math.random()* (300-100)) + 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.hits = function (player) {
        if(this.x <= player.x + player.width/2 && player.x <= this.x + this.width/2 && this.y === player.y){
            return true;
        }
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computer\
    if (this.x < 600){
        this.x += Math.round(this.speed *dt);

        arrayY= [45,130,215];
        if (this.y === 0){
            this.y = arrayY[Math.floor(Math.random()*arrayY.length)];
        }
        for (enemy of allEnemies) {
            if(enemy.hits(player)){
                console.log('HIT');
                player.x = 200;
                player.y = 300;
            }
        }
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(char, x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 175;
    this.char = char;

    // this.images = function () {
    //     this.boy = 'images/char-boy.png';
    //     this.cat = 'images/char-cat-girl.png';
    //     this.hornGirl = 'images/char-horn-girl.png';
    //     this.pinkGirl = 'images/char-pink-girl.png';
    //     this.princessGirl = 'images/char-princess-girl.png';
    // }

    this.update = function (y){
        player.handleInput(y);
        if(this.x === 500){
            this.x = 400;
        } if(this.x < 0) {
            this.x = 0;
        } if (this.y === 470) {
            this.y = 385;
        } else if (this.y < 0) {
            this.x = 200;
            this.y = 300;
            console.log('win');
        }
    }

    this.handleInput = function(dir) {
        if (dir === 'left'){
            this.x -= 100;
        } if (dir === 'right'){
            this.x += 100;
        } if (dir === 'up'){
            this.y -= 85;
        } if (dir === 'down'){
            this.y += 85;
        }
    }

    this.render = function() {
        ctx.drawImage(Resources.get(char), this.x, this.y, this.width, this.height);
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies;
let player;
let player2;
let player3;
let player4;
let player5;


function init() {
    allEnemies = [];
    player = new Player('images/char-boy.png', 200,300)
    player2 = new Player('images/char-cat-girl.png', 0, 300);
    player3 = new Player('images/char-horn-girl.png', 100, 300);
    player4 = new Player('images/char-pink-girl.png', 300, 300);
    player5 = new Player('images/char-princess-girl.png', 400, 300);
    console.log(allEnemies);
    setInterval (function () {
        allEnemies.push(new Enemy(0, 0, 100, 175))
    },750);
}

init();



    // let characters = [];
    // characters.push(player1, player2, player3, player4, player5);
    // for(character of characters) {
    //     character.addEventListener('click', function(char) {
    //         return char;
    //     })
    // }
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
