// console.log("hi")

;
(function() {
    var game = function(canvasId) {
        var canvas = document.getElementById(canvasId);
        var screen = canvas.getContext('2d');
        var gameSize = {
            x: canvas.width,
            y: canvas.height
        };
        // console.log("hi")

        this.bodies = [new Player(this, gameSize)];

        var self = this;
        var tick = function() {
            self.update(); //------------------> 2) Update the game
            self.draw(screen, gameSize); //----> 3) draw the game
            requestAnimationFrame(tick); //----> 4) call browser to refresh game.
        };

        tick(); //-----------------------------> 1) Call Tick once.
    };

    game.prototype = {
        update: function() {
            // console.log("hi")
            for (var i = 0; i < this.bodies.length; i++) {
                this.bodies[i].update();
                // console.log('hi')
            }
        },

        draw: function(screen, gameSize) {
            for (var i = 0; i < this.bodies.length; i++) {
                drawRect(screen, this.bodies[i]);
            }
        }
    };
    var Player = function(game, gameSize) {
        this.game = game;
        this.size = { x: 15, y: 15 };
        this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.x};
        this.keyboarder = new Keyboarder();
    };

    Player.prototype = {
        update: function() {
            if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {//--- moves
                this.center.x -= 2;
            } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
                this.center.x += 2;
            }
        }
    };

    var drawRect = function(screen, body) {
        screen.fillRect(body.center.x - body.size.x / 2,
            body.center.y - body.size.y / 2,
            body.size.x, body.size.y);
    };

    var Keyboarder = function() {
        var keyState = {};

        window.onKeyDown = function(e) {
            keyState[e.keyCode] = true;
        };


        window.onKeyUp = function(e) {
            keyState[e.keyCode] = false;
        };

        this.isDown = function(keyCode) {
            return keyState[keyCode] === true;
        };

        this.KEYS = {
            LEFT: 37,
            RIGHT: 39,
            SPACE: 32
        };

    };

    window.onload = function() {
        new game("screen")
    };
})();
