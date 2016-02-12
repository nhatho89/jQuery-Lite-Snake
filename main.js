var Board = require("./snake");
var SnakeView = require("./snake_view");
var $l = require("./jquery_lite");
window.$l = $l;

$l(function () {
  var $canvas = $l("#canvas");
  // debugger;
  new SnakeView(new Board(), $canvas);
});
