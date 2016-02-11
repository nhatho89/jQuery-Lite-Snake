var $l = function (selector) {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }  else {
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





//
