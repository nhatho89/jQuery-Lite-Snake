var Snake = function () {
  this.direction = this.DIRECTIONS[Math.floor(Math.random() * 4)];
  this.segments = [new Coord([10,10])];
};

Snake.prototype.DIRECTIONS = ["N", "E", "S", "W"];


Snake.prototype.move = function () {
  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].plus(this.direction);
  }
};

Snake.prototype.turn = function (direction) {
  this.direction = direction;
};



var Coord = function (pos) {
  this.x = pos[0];
  this.y = pos[1];
};

Coord.prototype.plus = function (direction) {
  switch(direction) {
    case "N":
      this.y -= 1;
      break;
    case "S":
      this.y += 1;
      break;
    case "E":
      this.x += 1;
      break;
    case "W":
      this.x -= 1;
      break;
  }
};

Coord.prototype.equals = function (otherCoord) {
  return (this.x === otherCoord.x) && (this.y === otherCoord.y);
};

Coord.prototype.isOpposite = function (otherCoord) {
  switch (otherCoord.x) {
    case this.x + 1:
    return true;
    case this.x - 1:
    return true;
  }

  switch (otherCoord.y) {
    case this.y + 1:
    return true;
    case this.y - 1:
    return true;
  }

  return false;
};


var Board = function () {
  this.snake = new Snake();
};

Board.prototype.DIM_X = 20;
Board.prototype.DIM_Y = 20;

module.exports = Board;
