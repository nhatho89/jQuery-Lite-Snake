var SnakeView = function (board, $canvas) {
  this.board = board;
  this.$canvas = $canvas;
};


SnakeView.prototype.setupCanvas = function () {
  for (var i = 0; i < this.board.DIM_Y; i++) {
    this.addRow();
  }
};

SnakeView.prototype.addRow = function () {
  var rowIdx = this.$canvas.find(".row").length;
  var $row = $("<ul>").addClass("row").addClass("group");
  for(var colIdx = 0; colIdx < 20; colIdx++) {
    var $square = $("<li>").addClass("square").data("pos", [rowIdx, colIdx]);
    $row.append($square);
  }
  this.$canvas.append($row);
};

module.exports = SnakeView;
