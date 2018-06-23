// Enemies player must avoid
let Enemy = function(x , y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = Math.floor(Math.random()* (400-100)) + 100;
    this.sprite = 'images/enemy-bug.png';
    this.hits = function (character) {
        if(this.x <= character.x + character.width/2 && character.x <= this.x + this.width/2 && this.y === character.y){
            return true;
        }
    }
};

// Updates the enemies location
Enemy.prototype.update = function(dt) {
    if (this.x < 600) {
        this.x += Math.round(this.speed *dt);
        // Randomizes the enemy between three rows
        arrayY= [45,130,215];
        if (this.y === 0){
            this.y = arrayY[Math.floor(Math.random()*arrayY.length)];
        }
        // Deticts if an enemy is hit by the player
        for (enemy of allEnemies) {
            if(enemy.hits(player)) {
                console.log('HIT');
                // if player is hit take player back to a certain spot
                player.x = 200;
                player.y = 300;
                // Clear allStars array and reshuffle the stars
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
    this.selector = 'images/Selector.png';
    this.hits = function (character) {
        if(player && this.x <= character.x + character.width/2 && character.x <= this.x + this.width/2 && this.y === character.y) {
            return true;
        }
    }

    // Calls the update function and makes sure character doesn't move offscreen
    this.update = function (y) {
        this.handleInput(y);
        if(this.x === 500) {
            this.x = 400;
        }else if(this.x < 0) {
            this.x = 0;
        }else if (this.y === 470) {
            this.y = 385;
        }
        // If you don't have three stars you cannot win
        else if (this.y < 0 && allStars.length < 3) {
            this.y = 45;
        }
        // If all three stars are collected and you're at the water
        // The stars are reshuffled and you are taken back to where you started
        else if (this.y < 0 && allStars.length === 3) {
            this.x = selector.x;
            this.y = selector.y;
            allStars.length = 0;
            stars.update();
            stars1.update();
            stars2.update();
            console.log('win');
        }

        // If a star is hit by player send the star to the top of offscreen
        // and put it in an array
        if (this.hits(stars)) {
            stars.x = 0;
            stars.y = -25;
            allStars.push(stars);
            console.log(allStars);
        }else if (this.hits(stars1)) {
            stars1.x = 100;
            stars1.y = -25;
            allStars.push(stars1);
            console.log(allStars);
        }else if (this.hits(stars2)) {
            stars2.x = 200;
            stars2.y = -25;
            allStars.push(stars2);
            console.log(allStars);
        }
    }

    // Changes direction of the character
    this.handleInput = function(dir) {
        if (dir === 'left') {
            this.x -= 100;
        }else if (dir === 'right') {
            this.x += 100;
        }else if (dir === 'up') {
            this.y -= 85;
        }else if (dir === 'down') {
            this.y += 85;
        }
    }
    // Draws the image on the screen
    this.render = function() {
        ctx.drawImage(Resources.get(char), this.x, this.y, this.width, this.height);
    }
};

//Class for selecting a character
let Selector = function(x, y) {
    this.x = x;
    this.y = y;
    this.select = 'images/Selector.png';

    // Updates the selectors postion and doesn't let it go offscreen
    this.update = function(dir) {
        if (dir === 'left') {
            this.x -= 100;
            if (this.x < 0) {
                this.x = 0;
            }
        }else if (dir === 'right') {
            this.x += 100;
            if (this.x === 500) {
                this.x = 400;
            }
        }else if (dir === 'up' || dir === 'down') {
            this.y = 385;
        }
    }

    // Renders the selector
    this.render = function() {
        ctx.drawImage(Resources.get(this.select), this.x, this.y);
    }

    // If a character and selector are on the same coordinates the up key will select the character
    // and initiate the game
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

    // If the game is already being played you can change characters by
    // putting the character on the selector
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
                player.y = 300;
            }
        }else if (selector.x === 200 && player3.x === 200) {
            player = player3;
            if (dir === 'up') {
                player.update();
                player.y = 300;
            }
        }else if (selector.x === 300 && player4.x === 300) {
            player = player4;
            if (dir === 'up') {
                player.update();
                player.y = 300;
            }
        }else if (selector.x === 400 && player5.x === 400) {
            player = player5;
            if (dir === 'up') {
                player.update();
                player.y = 300;
            }
        }else {
            player.y = 300;
        }
    }
}

// Stars class
let Stars = function() {
    this.x;
    this.y;
    this.width = 100;
    this.height = 175;
    this.star = 'images/Star.png';

    // Updates the Stars position
    this.update = function() {
        arrayX = [100,200,300,400];
        this.x = arrayX[Math.floor(Math.random()*arrayX.length)];

        arrayY = [45,130,215];
        this.y = arrayY[Math.floor(Math.random()*arrayY.length)];
    }
    // Renders Stars
    this.render = function() {
        ctx.drawImage(Resources.get(this.star), this.x, this.y, this.width, this.height);
    }
}

//  Global variables
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

// Draws all the characters and the selector
function startMenu() {
    player1 = new Player('images/char-cat-girl.png', 0, 385);
    player2 = new Player('images/char-horn-girl.png', 100, 385);
    player3 = new Player('images/char-boy.png', 200, 385);
    player4 = new Player('images/char-pink-girl.png', 300, 385);
    player5 = new Player('images/char-princess-girl.png', 400, 385);
    selector = new Selector(200,385);
    // Enables the movement of the selector
    selector.update();
    selector.selectCharacter();
}

startMenu();

// Initiates the game
function init() {
    allEnemies = [];
    setInterval (function () {
        allEnemies.push(new Enemy(0, 0, 100, 175));
    },750);
    allStars = [];
    stars = new Stars();
    stars1 = new Stars();
    stars2 = new Stars();
    stars.update();
    stars1.update();
    stars2.update();
}

// Keylistener for player.handleInput and selector
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // If the player is not defined enable the selector to select a character
    if (!player) {
        selector.update(allowedKeys[e.keyCode]);
        selector.selectCharacter(allowedKeys[e.keyCode]);
        // After the game is started and the player is on the selector,
        // you are able to change characters
    }else if (player.y === selector.y && player.x === selector.x) {
        selector.update(allowedKeys[e.keyCode]);
        selector.selectAgain(allowedKeys[e.keyCode]);
        // Enables the players movement
    }else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
