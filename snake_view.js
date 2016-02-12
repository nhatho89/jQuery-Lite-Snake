var $l = require('./jquery_lite');

var SnakeView = function (board, $canvas) {
  this.board = board;
  this.$canvas = $canvas;

  this.setupCanvas();
  // this.render();

  setInterval(this.step.bind(this), 1000);
};

SnakeView.prototype.step = function () {
  this.board.snake.move();
  this.render();
};


SnakeView.prototype.setupCanvas = function () {
  $l("ul").on("onkeydown", function(e) { console.log(e);});

  this.$canvas.html("<ul></ul>");
  var $ul = this.$canvas.find("ul");
  $ul.addClass("group");

  for (var i = 0; i < this.board.DIM_X; i++) {
    for (var j = 0; j < this.board.DIM_Y; j++) {
      $ul.append("<li></li>");
    }
  }

  $ul.find("li").addClass("square");
};

SnakeView.prototype.render = function () {
  $l("li").removeClass("segment");
  var allSquares = this.$canvas.find("li");

  for (var i = 0; i < this.board.snake.segments.length; i++) {
    var coord = this.board.snake.segments[i];
    var squareIndex = coord.x + this.board.DIM_Y * coord.y;
    $l(allSquares.elements[squareIndex]).addClass("segment");
  }
};

module.exports = SnakeView;
