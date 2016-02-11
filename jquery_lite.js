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
