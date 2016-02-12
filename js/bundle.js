/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	var SnakeView = __webpack_require__(3);
	var $l = __webpack_require__(4);
	
	$l(function () {
	  var $canvas = $l("#canvas");
	
	  new SnakeView(new Board(), $canvas);
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	var $l = function (selector) {
	  if (selector instanceof HTMLElement) {
	    return new DOMNodeCollection([selector]);
	  } else if (selector instanceof Function) {
	    if (document.readyState === "complete") {
	      selector();
	    } else {
	      document.addEventListener('DOMContentLoaded', selector);
	    }
	  } else {
	    var elementList = document.querySelectorAll(selector);
	
	    return new DOMNodeCollection(Array.prototype.slice.apply(elementList));
	  }
	};
	
	var DOMNodeCollection = function(elements) {
	  this.elements = elements;
	};
	
	
	DOMNodeCollection.prototype.html = function (newInnerHTML) {
	  if (newInnerHTML === "undefined") {
	    return this.elements[0];
	  } else {
	    for (var i = 0; i < this.elements.length; i++) {
	      this.elements[i].innerHTML = newInnerHTML;
	    }
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.html("");
	};
	
	DOMNodeCollection.prototype.append = function (el) {
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].innerHTML += el;
	  }
	  return this;
	};
	
	DOMNodeCollection.prototype.attr = function (newAttr, attrValue) {
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].setAttribute(newAttr, attrValue);
	  }
	};
	
	DOMNodeCollection.prototype.addClass = function (classToAdd) {
	  for (var i = 0; i < this.elements.length; i++) {
	    var classes = this.elements[i].className.split(" ");
	    classes.push(classToAdd);
	    this.elements[i].className = classes.join(" ");
	  }
	};
	
	
	DOMNodeCollection.prototype.removeClass = function (classToRemove) {
	  for (var i = 0; i < this.elements.length; i++) {
	    var classes = this.elements[i].className.split(" ");
	    var indexToRemove = classes.indexOf(classToRemove);
	    classes.splice(indexToRemove, indexToRemove + 1);
	    this.elements[i].className = classes.join(" ");
	  }
	};
	
	DOMNodeCollection.prototype.children = function () {
	  var allChildren = [];
	  for (var i = 0; i < this.elements.length; i++) {
	    allChildren = allChildren.concat(this.childrenHelper(this.elements[i]));
	  }
	
	  return new DOMNodeCollection(allChildren);
	};
	
	DOMNodeCollection.prototype.childrenHelper = function (element) {
	  if (element.children.length === 0) {
	    return [];
	  }
	  var allChildren = [];
	  for (var i = 0; i < element.children.length; i++) {
	    allChildren = allChildren.concat(element.children[i]);
	    allChildren = allChildren.concat(this.childrenHelper(element.children[i]));
	  }
	
	  return allChildren;
	};
	
	
	DOMNodeCollection.prototype.parent = function () {
	  var parents = [];
	  for (var i = 0; i < this.elements.length; i++) {
	    parents.push(this.elements[i].parentNode);
	  }
	  return new DOMNodeCollection(parents);
	};
	
	DOMNodeCollection.prototype.find = function (selector) {
	  var selectedNodes = [];
	
	  for (var i = 0; i < this.elements.length; i++) {
	    var queryResult = this.elements[i].querySelectorAll(selector);
	    queryResult = Array.prototype.slice.apply(queryResult);
	    selectedNodes = selectedNodes.concat(queryResult);
	  }
	
	  return new DOMNodeCollection(selectedNodes);
	};
	
	DOMNodeCollection.prototype.remove = function () {
	  for (var i = 0; i < this.elements.length; i++) {
	    var parent = this.elements[i].parentNode;
	
	    parent.removeChild(this.elements[i]);
	  }
	};
	
	DOMNodeCollection.prototype.on = function (eventType, callback) {
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].addEventListener(eventType, callback);
	  }
	
	};
	
	DOMNodeCollection.prototype.off = function (eventType, callback) {
	  for (var i = 0; i < this.elements.length; i++) {
	    this.elements[i].removeEventListener(eventType, callback);
	  }
	
	};
	
	$l.extend = function () {
	  var mergedObject = arguments[0];
	
	  for (var i = 1; i < arguments.length; i++) {
	    var obj = arguments[i];
	    var objKeys = Object.keys(obj);
	
	    for (var j = 0; j < objKeys.length; j++) {
	      mergedObject[objKeys[j]] = obj[objKeys[j]];
	    }
	  }
	  return mergedObject;
	};
	
	//
	// $l.AJAX_DEFAULTS = {
	//   success: function () { console.log("Request successful."); },
	//   error: function() { console.log("Request failed."); },
	//   url: ,
	//   method: ,
	//   data: ,
	//   contentType:
	// }
	
	$l.ajax = function (options) {
	  var ajaxOptions = {};
	
	  var defaults = {
	    method: "GET",
	    url: "http://www.google.com",
	    data: {
	      format: 'json'
	    },
	    dataType: 'jsonp',
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    success: function (data) { console.log(data); },
	    error: function() { console.log("Request failed."); }
	
	  };
	
	  $l.extend(ajaxOptions, defaults, options);
	
	  var xmlhttp = new XMLHttpRequest();
	
	  xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
	           if(xmlhttp.status === 200){
	             ajaxOptions["success"](xmlhttp.responseText);
	           }
	           else {
	            ajaxOptions["error"]();
	           }
	        }
	    };
	
	    xmlhttp.open(ajaxOptions["method"], ajaxOptions["url"], true);
	    xmlhttp.send();
	
	};
	
	//


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map