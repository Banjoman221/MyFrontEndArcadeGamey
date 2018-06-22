// Enemies player must avoid
let Enemy = function(x , y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = Math.floor(Math.random()* (300-100)) + 100;
    this.sprite = 'images/enemy-bug.png';
    this.hits = function (character) {
        if(this.x <= character.x + character.width/2 && character.x <= this.x + this.width/2 && this.y === character.y){
            return true;
        }
    }
};
// Updates the enemies location
Enemy.prototype.update = function(dt) {
    if (this.x < 600){
        this.x += Math.round(this.speed *dt);
        // Randomizes the enemy between three rows
        arrayY= [45,130,215];
        if (this.y === 0){
            this.y = arrayY[Math.floor(Math.random()*arrayY.length)];
        }
        // Deticts if an enemy is hit by the player
        for (enemy of allEnemies) {
            if(enemy.hits(player)){
                console.log('HIT');
                player.x = 200;
                player.y = 300;
                allStars.length = 0;
                stars.update();
                stars1.update();
                stars2.update();
            }
        }
    }
};
// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

// Player class for all characters
let Player = function(char, x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 175;
    this.char = char;
    this.selector = 'images/Selector.png'
    this.hits = function (character) {
        if(player && this.x <= character.x + character.width/2 && character.x <= this.x + this.width/2 && this.y === character.y){
            return true;
        }
    }

    // Calls the update function and makes sure character doesn't move offscreen
    this.update = function (y){
        this.handleInput(y);
        if(this.x === 500){
            this.x = 400;
        }else if(this.x < 0) {
            this.x = 0;
        }else if (this.y === 470) {
            this.y = 385;
        } else if (this.y < 0 && allStars.length < 3) {
            this.y = 45;
        } else if (this.y < 0 && allStars.length === 3) {
            this.x = 200;
            this.y = 300;
            allStars.length = 0;
            stars.update();
            stars1.update();
            stars2.update();
            console.log('win');
        }

        if (this.hits(stars)) {
            stars.x = 0;
            stars.y = -25;
            allStars.push(stars);
            console.log(allStars)
        } else if (this.hits(stars1)) {
            stars1.x = 100;
            stars1.y = -25;
            allStars.push(stars1);
            console.log(allStars)
        } else if (this.hits(stars2)) {
            stars2.x = 200;
            stars2.y = -25;
            allStars.push(stars2);
            console.log(allStars)
        }
    }

    // Changes direction of the character
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
    // Draws the image on the screen
    this.render = function() {
        ctx.drawImage(Resources.get(char), this.x, this.y, this.width, this.height);
    }
};

let Selector = function(x, y) {
    this.x = x;
    this.y = y;
    this.select = 'images/Selector.png'

    this.update = function(dir) {
        if (dir === 'left'){
            this.x -= 100;
            if (this.x < 0) {
                this.x = 0;
            }
        } if (dir === 'right'){
            this.x += 100;
            if (this.x === 500) {
                this.x = 400;
            }
        } if (dir === 'up' || dir === 'down'){
            this.y = 385;
        }
    }

    this.selectCharacter = function (dir) {
        if (selector.x === player1.x && dir === 'up') {
            init();
            player = player1;
            player.y =300;
        }else if (selector.x === player2.x && dir === 'up') {
            player = player2;
            init();
            player.y =300;
        }else if (selector.x === player3.x && dir === 'up') {
            player = player3;
            init();
            player.y =300;
        }else if (selector.x === player4.x && dir === 'up') {
            player = player4;
            init();
            player.y =300;
        }else if (selector.x === player5.x && dir === 'up') {
            player = player5;
            init();
            player.y =300;
        }
    }

    this.selectAgain = function(dir) {
        if (selector.x === 0 && player1.x === 0) {
            player = player1;
            if (dir === 'up') {
                player.update();
                player.y =300;
            }
        }else if (selector.x === 100 && player2.x === 100) {
            player = player2;
            if (dir === 'up') {
                player.update();
                player.y =300;
            }
        }else if (selector.x === 200 && player3.x === 200) {
            player = player3;
            if (dir === 'up') {
                player.update();
                player.y =300;
            }
        }else if (selector.x === 300 && player4.x === 300) {
            player = player4;
            if (dir === 'up') {
                player.update();
                player.y =300;
            }
        }else if (selector.x === 400 && player5.x === 400) {
            player = player5;
            if (dir === 'up') {
                player.update();
                player.y =300;
            }
        }
    }
    this.render = function() {
        ctx.drawImage(Resources.get(this.select), this.x, this.y);
    }
}

// Stars class
let Stars = function() {
    this.x;
    this.y;
    this.width = 100;
    this.height = 175;
    this.star = 'images/Star.png';

    this.update = function() {
        arrayX = [100,200,300,400];
        this.x = arrayX[Math.floor(Math.random()*arrayX.length)];

        arrayY = [45,130,215];
        this.y = arrayY[Math.floor(Math.random()*arrayY.length)];
    }

    this.render = function() {
        ctx.drawImage(Resources.get(this.star), this.x, this.y, this.width, this.height);
    }
}

// Instantiate my objects.
let allEnemies;
let allStars;
let player;
let player2;
let player3;
let player4;
let player5;
let stars;
let stars1;
let stars2;
let selector;


function startMenu() {
    player1 = new Player('images/char-cat-girl.png', 0, 385);
    player2 = new Player('images/char-horn-girl.png', 100, 385);
    player3 = new Player('images/char-boy.png', 200, 385)
    player4 = new Player('images/char-pink-girl.png', 300, 385);
    player5 = new Player('images/char-princess-girl.png', 400, 385);
    selector = new Selector(200,385);
    selector.update();
    selector.selectCharacter();
}

startMenu()

// Keylistener for player.handleInput
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (!player) {
        selector.update(allowedKeys[e.keyCode])
        selector.selectCharacter(allowedKeys[e.keyCode])
    }else if (player.y === selector.y && player.x === selector.x) {
        selector.update(allowedKeys[e.keyCode])
        selector.selectAgain(allowedKeys[e.keyCode])
    }else{
        player.handleInput(allowedKeys[e.keyCode])
    }
});

function init() {
    allEnemies = [];
    setInterval (function () {
        allEnemies.push(new Enemy(0, 0, 100, 175))
    },750);
    allStars = [];
    stars = new Stars();
    stars1 = new Stars();
    stars2 = new Stars();
    stars.update();
    stars1.update();
    stars2.update();
}
