(function (){
    self.Board = function (width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over =false;
        this.bars = [];
        this.ball = null;
        
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }
})();

(function(){
    self.Ball = function(x, y, radius, board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;

        board.ball = this;
        this.kind = "circle";
    }
})();

(function () {
    self.Bar = function (x, y, width, height, board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    }

    self.Bar.prototype = {
        down: function (){
            this.y += this.speed;
        },
        up: function (){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + ", y: " + this.y;
        }
    }
    
})();

(function (){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        clean: function(){
            this.ctx.clearRect(0, 0, board.width, board.height);
        },
        draw: function (){
            for (let i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];

                draw(this.ctx, el);                
            }
        },
        play: function(){
            board_view.clean();
            board_view.draw();
        }
    }

    function draw(ctx, element){
        // if (element !== null && element.hasOwnProperty("kind")) {
        switch(element.kind){
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radius, 0, 3.15*2)
                ctx.fill();
                ctx.closePath();
                break;
        }
        
    }
})();

var board = new Board(800, 400);
var bar_2 = new Bar(5, 150, 20, 100, board);
var bar = new Bar(775, 150, 20, 100, board);
var canvas = document.getElementById("canvas");
var board_view = new BoardView(canvas, board);
var ball = new Ball(400, 200, 10, board);

window.requestAnimationFrame(controller);

document.addEventListener("keydown", function(ev) {
    ev.preventDefault();
    if (ev.keyCode === 38){
        bar.up(); 
    } else if (ev.keyCode === 40) {
        bar.down();
    } else if (ev.keyCode === 87){
        bar_2.up(); 
    } else if (ev.keyCode === 83) {
        bar_2.down();
    }
});

window.addEventListener("load", controller);

function controller(){    
    board_view.play();
    window.requestAnimationFrame(controller);
}