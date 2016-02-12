var Board = require("./snake");
var SnakeView = require("./snake_view");
var $l = require("./jquery_lite");

$l(function () {
  var $canvas = $l("#canvas");

  new SnakeView(new Board(), $canvas);
});
