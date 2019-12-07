/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/draw.js":
/*!**************************!*\
  !*** ./src/core/draw.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _options_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options/values */ "./src/options/values.js");
/* harmony import */ var _errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errorControl/errorPrint */ "./src/errorControl/errorPrint.js");
/* harmony import */ var _helper_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/index */ "./src/helper/index.js");



var Draw = {
  drawOptions: function drawOptions() {
    var ctx = this.getContext();
    var _ctx$canvas = ctx.canvas,
        width = _ctx$canvas.width,
        height = _ctx$canvas.height;
    var _computedSize$options = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout,
        chartWidth = _computedSize$options.chartWidth,
        chartHeight = _computedSize$options.chartHeight,
        leftPadding = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.left,
        rightPadding = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.right,
        topPadding = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.top,
        bottomPadding = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.bottom;
    var returnObj = {
      width: width,
      height: height,
      leftPadding: leftPadding,
      rightPadding: rightPadding,
      topPadding: topPadding,
      bottomPadding: bottomPadding,
      chartWidth: chartWidth,
      chartHeight: chartHeight
    };
    return returnObj;
  },
  yGridWithLabel: function yGridWithLabel(label)
  /* it depends on labels */
  {
    var ctx = this.getContext();
    var options = this.drawOptions();
    var labelLength = label.length || 1,
        stepx = options.chartWidth / (labelLength - 1),
        height = options.chartHeight + options.topPadding,
        width = options.chartWidth + options.leftPadding;
    _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"][0].xPoint.splice(0);
    ctx.save();
    ctx.strokeStyle = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.scales.yAxes[0].gridLines.color;
    ctx.lineWidth = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.scales.yAxes[0].gridLines.lineWidth;

    for (var x = options.leftPadding, yAxes = 0; x <= width; x += stepx, yAxes += 1) {
      ctx.beginPath();
      ctx.moveTo(x, options.topPadding);
      ctx.lineTo(x, height);
      _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"][0].xPoint.push(x);
      this.bottomLabel(label[yAxes], x, options.chartHeight + options.bottomPadding);
      ctx.stroke();
    }

    ctx.restore();
  },
  bottomLabel: function bottomLabel(string, x, y) {
    if (!string) return;
    var ctx = this.getContext();
    ctx.fillText(string, x, y);
  },
  xGridWithLabel: function xGridWithLabel(max, min) {
    var ctx = this.getContext();
    var options = this.drawOptions();
    var nice, niceMax, niceMin, tickStep, yTickNumber;

    if (max !== min) {
      nice = _helper_index__WEBPACK_IMPORTED_MODULE_2__["Helper"].niceScale(min, max);
      niceMax = nice.niceMaximum;
      niceMin = nice.niceMinimum;
      tickStep = nice.tickSpacing;
      yTickNumber = (niceMax - niceMin) / tickStep + 1;
    } else {
      tickStep = 0.2;
      niceMax = max + tickStep * 5;
      niceMin = max - tickStep * 5;
      yTickNumber = 11;
    }

    var stepy = Math.ceil(options.chartHeight / yTickNumber);
    var yTick = niceMax;
    var height = options.chartHeight + options.topPadding;
    var width = options.chartWidth + options.leftPadding;
    _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].tickNumber = yTickNumber;
    _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].niceMax = niceMax;
    _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].niceMin = niceMin;
    _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].tickStep = tickStep;
    _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].stepy = stepy;
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])('-----------');
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("tickStep: ".concat(tickStep));
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("niceMax : ".concat(niceMax));
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("niceMin : ".concat(niceMin));
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("yTickNumber : ".concat(yTickNumber));
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("stepy : ".concat(stepy));
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("tickStep : ".concat(tickStep));
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])('-----------');
    ctx.save();
    ctx.strokeStyle = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.scales.xAxes[0].gridLines.color;
    var lineWidth = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.scales.xAxes[0].gridLines.lineWidth;

    for (var y = options.topPadding; y < height; y += stepy) {
      ctx.beginPath();
      ctx.lineWidth = lineWidth;

      if (yTick === 0) {
        ctx.lineWidth = lineWidth * 2;
      }

      this.yTickLabel(yTick, options.leftPadding - 20, y);
      ctx.moveTo(options.leftPadding - 10, y);
      ctx.lineTo(width, y);
      yTick -= tickStep;
      ctx.stroke();
      _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].tickHeight = y;
    }

    ctx.restore();
  },
  yTickLabel: function yTickLabel(tick, x, y) {
    var ctx = this.getContext();
    var yTick = tick.toFixed(1);
    ctx.fillText(yTick, x, y);
  },
  drawGrid: function drawGrid(data) {
    var ctx = this.getContext();
    var fontSize = _options_values__WEBPACK_IMPORTED_MODULE_0__["globalDefaults"].defaultFontSize;
    var fontStyle = "".concat(fontSize, " px Arial");
    ctx.font = fontStyle;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    var label = data.labels;
    this.yGridWithLabel(label);
    var dataValue = data.datasets[0].data;
    var maxValue = Math.max.apply(null, dataValue);
    var minValue = Math.min.apply(null, dataValue);
    this.xGridWithLabel(maxValue, minValue);
  },
  axisTitles: function axisTitles(scales, axesType) {
    var labelString, width, height;
    var fontSize = _options_values__WEBPACK_IMPORTED_MODULE_0__["globalDefaults"].defaultFontSize,
        fontStyle = "".concat(fontSize, " px Arial");
    var ctx = this.getContext();
    ctx.save();
    ctx.fillStyle = _options_values__WEBPACK_IMPORTED_MODULE_0__["globalDefaults"].defaultFontColor;
    ctx.lineWidth = 1;
    ctx.font = fontStyle;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (axesType === 'xAxes') {
      // bottom legend lable
      labelString = scales[0].scaleLabel.labelString;
      width = ctx.canvas.width / 2;
      ctx.fillText(labelString, width, _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.bottomLable.height + fontSize + 1);
    } else if (axesType === 'yAxes') {
      // left legend lable
      labelString = scales[0].scaleLabel.labelString;
      width = ctx.canvas.width;
      height = ctx.canvas.height / 2;
      ctx.translate(25, height);
      ctx.rotate(Math.PI * 1.5);
      ctx.fillText(labelString, 0, 0);
    }

    ctx.restore();
  },
  linePoint: function linePoint(data, xPoint) {
    var ctx = this.getContext();
    var options = this.drawOptions();
    var niceMax = _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].niceMax,
        tickStep = _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].tickStep,
        stepy = _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].stepy;
    var height = _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"].tickHeight - options.topPadding;
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])('Draw.point()');
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("height ".concat(height));
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("stepy : ".concat(stepy));
    data.forEach(function (i, index) {
      // data
      var datas = i;
      var y;

      if (datas === 0) {
        y = niceMax / tickStep * stepy;
      } else if (datas < 0) {
        datas *= -1;
        y = stepy / tickStep * datas + niceMax / tickStep * stepy;
      } else if (datas > 0) {
        y = stepy / tickStep * niceMax - stepy / tickStep * datas;
      }

      var x = xPoint[index];
      _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"][0].yPoint.push(y + options.topPadding);
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = _options_values__WEBPACK_IMPORTED_MODULE_0__["globalDefaults"].datasPointColor;
      ctx.arc(x, y + options.topPadding, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  },
  lineCurve: function lineCurve() {
    var ctx = this.getContext();
    ctx.save();
    ctx.beginPath();
    var length = _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"][0].xPoint.length;
    var _dataPoints$ = _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"][0],
        xPoint = _dataPoints$.xPoint,
        yPoint = _dataPoints$.yPoint;
    Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])(_options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"][0].yPoint);
    ctx.moveTo(xPoint[0], yPoint[0]);
    ctx.strokeStyle = _options_values__WEBPACK_IMPORTED_MODULE_0__["globalDefaults"].curveLineColor;
    ctx.lineWidth = 2;

    for (var i = 0; i < length; i += 1) {
      ctx.lineTo(xPoint[i], yPoint[i]);
      ctx.stroke();
    }

    _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"][0].yPoint.splice(0);
    ctx.restore();
  },
  baseCanvas: function baseCanvas() {
    Draw.setContext(this.ctx);
    var opts = this.config.options;
    var data = this.config.data;
    Draw.drawGrid(data);

    for (var i = 0; i < data.datasets.length; i++) {
      Draw.linePoint(data.datasets[i].data, _options_values__WEBPACK_IMPORTED_MODULE_0__["dataPoints"][0].xPoint);
    }
    /*
          data.datasets.forEach(function(i, index){
              this.linePoint(i.data, dataPoints[0].xPoint);
          });
          */


    Draw.lineCurve();

    for (var axes in opts.scales) {
      if (opts.scales[axes][0].display) {
        Draw.axisTitles(opts.scales[axes], axes);
      }
    }
  },
  getContext: function getContext() {
    return this.ctx;
  },
  setContext: function setContext(_ctx) {
    this.ctx = _ctx;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Draw);

/***/ }),

/***/ "./src/core/engine.js":
/*!****************************!*\
  !*** ./src/core/engine.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _options_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options/values */ "./src/options/values.js");
/* harmony import */ var _helper_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/index */ "./src/helper/index.js");
/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draw */ "./src/core/draw.js");
/* harmony import */ var _errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../errorControl/errorPrint */ "./src/errorControl/errorPrint.js");





var JChart = function JChart(ctx, config) {
  if (!(this instanceof JChart)) {
    return new JChart(ctx, config);
  }

  this.initialize(ctx, config);

  this.update = function () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    _draw__WEBPACK_IMPORTED_MODULE_2__["default"].baseCanvas.call(this);
  };

  this.changeRatio = function () {
    _helper_index__WEBPACK_IMPORTED_MODULE_1__["Helper"].computeSize(this.ctx);
    this.baseDrawing();
  };

  this.getCurrentOpt = function () {
    return _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options;
  };

  this.setLog = function (value) {
    if (_helper_index__WEBPACK_IMPORTED_MODULE_1__["Helper"].isExist(value)) {
      DEBUG_MODE = value;
    }
  };

  this.areaShow = function () {
    return _helper_index__WEBPACK_IMPORTED_MODULE_1__["Helper"].drawingRect(ctx);
  };

  return this;
};

JChart.prototype.initialize = function (ctx, config) {
  this.ctx = _helper_index__WEBPACK_IMPORTED_MODULE_1__["Helper"].contextValidator(ctx, config);
  if (this.ctx < 0) return -1;
  this.config = _helper_index__WEBPACK_IMPORTED_MODULE_1__["Helper"].mergeConfig(config);
  _draw__WEBPACK_IMPORTED_MODULE_2__["default"].setContext(ctx);
  this.bindEvent();
  this.baseDrawing();
};

JChart.prototype.bindEvent = function () {
  var responsive = this.config.options.responsive || false;

  if (responsive) {
    this.bindResizeEvent();
  }
};

JChart.prototype.baseDrawing = function () {
  _helper_index__WEBPACK_IMPORTED_MODULE_1__["Helper"].ratioCalculator(this.ctx);
  _helper_index__WEBPACK_IMPORTED_MODULE_1__["Helper"].computeSize(this.ctx);
  _draw__WEBPACK_IMPORTED_MODULE_2__["default"].baseCanvas.call(this);
};

JChart.prototype.bindResizeEvent = function () {
  var _this = this;

  console.warn('responsive mode : on');
  window.addEventListener('resize', function () {
    _this.resizingCanvas();
  });
};

JChart.prototype.resizingCanvas = function () {
  _helper_index__WEBPACK_IMPORTED_MODULE_1__["Helper"].ratioCalculator(this.ctx);
  Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_3__["default"])("resize width=".concat(this.ctx.canvas.width, " height=").concat(this.ctx.canvas.height));
  _helper_index__WEBPACK_IMPORTED_MODULE_1__["Helper"].computeSize(this.ctx);
  _draw__WEBPACK_IMPORTED_MODULE_2__["default"].baseCanvas.call(this);
};

/* harmony default export */ __webpack_exports__["default"] = (JChart);

/***/ }),

/***/ "./src/errorControl/errorPrint.js":
/*!****************************************!*\
  !*** ./src/errorControl/errorPrint.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return debugConsole; });
function debugConsole(str) {
  if (typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE) {
    console.log(str);
  }
}

/***/ }),

/***/ "./src/helper/index.js":
/*!*****************************!*\
  !*** ./src/helper/index.js ***!
  \*****************************/
/*! exports provided: Helper, DEBUG_MODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Helper", function() { return Helper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEBUG_MODE", function() { return DEBUG_MODE; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/helper/utils.js");
/* harmony import */ var _scale_calculate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scale.calculate */ "./src/helper/scale.calculate.js");
/* harmony import */ var _size_calculate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./size.calculate */ "./src/helper/size.calculate.js");
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./merge */ "./src/helper/merge.js");




var DEBUG_MODE = false;
var Helper = {};
Helper.niceScale = _scale_calculate__WEBPACK_IMPORTED_MODULE_1__["default"];
Helper.ratioCalculator = _size_calculate__WEBPACK_IMPORTED_MODULE_2__["ratioCalculator"];
Helper.contextValidator = _utils__WEBPACK_IMPORTED_MODULE_0__["contextValidator"];
Helper.isExist = _utils__WEBPACK_IMPORTED_MODULE_0__["isExist"];
Helper.drawingRect = _utils__WEBPACK_IMPORTED_MODULE_0__["drawingRect"];
Helper.mergeConfig = _merge__WEBPACK_IMPORTED_MODULE_3__["mergeConfig"];
Helper.computeSize = _size_calculate__WEBPACK_IMPORTED_MODULE_2__["computeSize"];


/***/ }),

/***/ "./src/helper/merge.js":
/*!*****************************!*\
  !*** ./src/helper/merge.js ***!
  \*****************************/
/*! exports provided: mergeConfig, appendConfig, objIterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeConfig", function() { return mergeConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendConfig", function() { return appendConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objIterator", function() { return objIterator; });
/* harmony import */ var _options_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options/values */ "./src/options/values.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function mergeConfig(_config) {
  /*
  const data = config.data = config.data || {};
  data.labels = data.labels || [];
  data.datasets = data.datasets || [];
  */
  var config = _config;
  config.options = config.options || _options_values__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].options;
  config.options = appendConfig({}, _options_values__WEBPACK_IMPORTED_MODULE_0__["defaultConfig"].options, config.options);
  _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].set(config.options);
  console.log(_options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"]);
  return config;
}
/**
* https://stackoverflow.com/a/20591261/9373458
* merge two objects.
* usage :  extend(target, obj1, obj2)
* @param target
* @param default
* @param source 
*/


function appendConfig(target) {
  for (var i = 1; i < arguments.length; ++i) {
    var from = arguments[i];
    if (_typeof(from) !== 'object') continue;

    for (var j in from) {
      if (Object.prototype.hasOwnProperty.call(from, j)) {
        target[j] = _typeof(from[j]) === 'object' ? appendConfig({}, target[j], from[j]) : from[j];
      }
    }
  }

  return target;
}
/**
 *  
 */


function objIterator(target) {
  for (var prop in target) {
    if (Object.prototype.hasOwnProperty.call(target, prop)) {
      if (_typeof(target[prop]) === 'object' && !Array.isArray(target[prop])) {
        console.log('[object] ' + prop);
        objIterator(target[prop]);
      } else if (Array.isArray(target[prop])) {
        console.log('[array] ' + prop);
        var temp = target[prop];

        for (var i = 0; i < temp.length; ++i) {
          if (_typeof(temp[i]) === 'object' && !Array.isArray(temp[i])) {
            objIterator(temp[i]);
          } else {
            console.log('[' + i + '] ' + temp[i]);
          }
        }
      } else if (typeof target[prop] === 'string') {
        console.log('[string] ' + prop + ' ' + target[prop]);
      } else if (typeof target[prop] === 'boolean') {
        console.log('[boolean] ' + prop + ' ' + target[prop]);
      }
    }
  }
}



/***/ }),

/***/ "./src/helper/scale.calculate.js":
/*!***************************************!*\
  !*** ./src/helper/scale.calculate.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return niceScale; });
/* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/log10 */
Math.log10 = Math.log10 || function (x) {
  return Math.log(x) * Math.LOG10E;
};

function niceNum(localRange, round) {
  /* exponent of localRange */
  var exponent = Math.floor(Math.log10(localRange));
  /* fractional part of localRange */

  var fraction = localRange / Math.pow(10, exponent);
  /* nice, rounded fraction */

  var niceFraction;

  if (round) {
    if (fraction < 1.5) {
      niceFraction = 1;
    } else if (fraction < 3) {
      niceFraction = 2;
    } else if (fraction < 7) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  } else if (!round) {
    if (fraction <= 1) {
      niceFraction = 1;
    } else if (fraction <= 2) {
      niceFraction = 2;
    } else if (fraction <= 5) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  }

  return niceFraction * Math.pow(10, exponent);
}

function niceScale(min, max) {
  /*
  	to get a 'nice number' algorithm. detail below 
  	https://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
  */
  var minPoint = min;
  var maxPoint = max;
  var maxTicks = 11;
  var niceMin;
  var niceMax;
  var range;
  var tickSpacing;

  function scaleCalculator() {
    range = niceNum(maxPoint - minPoint, false);
    tickSpacing = niceNum(range / (maxTicks - 1), true);
    niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
    niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
  }

  scaleCalculator();
  return {
    tickSpacing: tickSpacing,
    niceMinimum: niceMin,
    niceMaximum: niceMax
  };
}
/*
//   https://github.com/chartjs/Chart.js/blob/master/src/helpers/helpers.math.js
export const log10 = Math.log10 || function(x) {
	var exponent = Math.log(x) * Math.LOG10E; // Math.LOG10E = 1 / Math.LN10.
	// Check for whole powers of 10,
	// which due to floating point rounding error should be corrected.
	var powerOf10 = Math.round(exponent);
	var isPowerOf10 = x === Math.pow(10, powerOf10);

	return isPowerOf10 ? powerOf10 : exponent;
};
*/

/***/ }),

/***/ "./src/helper/size.calculate.js":
/*!**************************************!*\
  !*** ./src/helper/size.calculate.js ***!
  \**************************************/
/*! exports provided: ratioCalculator, computeSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ratioCalculator", function() { return ratioCalculator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeSize", function() { return computeSize; });
/* harmony import */ var _options_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options/values */ "./src/options/values.js");
/* harmony import */ var _errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errorControl/errorPrint */ "./src/errorControl/errorPrint.js");



function computeSize(ctx) {
  if (_options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding) {
    _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.chartWidth = ctx.canvas.width - (_options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.left + _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.right);
    _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.chartHeight = ctx.canvas.height - (_options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.top + _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.bottom);
    _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.bottomLable = {
      width: _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.chartWidth + _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.left,
      // + computedSize.options.layout.padding.right,
      height: _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.padding.bottom + _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.layout.chartHeight
    };
  } else {
    console.error('computedSize.layout.padding is not defined');
  }
}
/* FIXME : 초기 구동 시  changeRatio () 호출 시마다 계속적으로 계산함.. (소수점단위??) */


function ratioCalculator(ctx) {
  var obj = {};
  var parentNode = ctx.canvas.parentNode;
  var parentWidth = parentNode.clientWidth;
  var parentHeight = parentNode.clientHeight;
  var diagonal = 0;
  console.log("parent width=".concat(parentWidth, " height=").concat(parentHeight));
  var _computedSize$options = _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].options.ratio,
      x = _computedSize$options.x,
      y = _computedSize$options.y;
  Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("RATIO = ".concat(x, ":").concat(y));
  var w = parentWidth;
  var h = parentHeight;
  diagonal = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
  Object(_errorControl_errorPrint__WEBPACK_IMPORTED_MODULE_1__["default"])("diagonal=".concat(diagonal));
  obj.width = Math.floor(diagonal * x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
  obj.height = Math.floor(diagonal * y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
  console.log("ratio width=".concat(obj.width, ",height=").concat(obj.height));
  ctx.canvas.width = obj.width;
  ctx.canvas.height = obj.height;
  return obj;
}



/***/ }),

/***/ "./src/helper/utils.js":
/*!*****************************!*\
  !*** ./src/helper/utils.js ***!
  \*****************************/
/*! exports provided: isExist, contextValidator, drawingRect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isExist", function() { return isExist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextValidator", function() { return contextValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawingRect", function() { return drawingRect; });
/* harmony import */ var _options_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../options/values */ "./src/options/values.js");
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./merge */ "./src/helper/merge.js");



function isExist(value) {
  if (!value) return false;
  return true;
}

function contextValidator(ctx, config) {
  if (!this.isExist(ctx)) {
    console.error('ctx undefined');
    return -1;
  }

  if (!this.isExist(config)) {
    console.error('config undefined');
    return -1;
  } // TODO validate config{}


  Object(_merge__WEBPACK_IMPORTED_MODULE_1__["objIterator"])(config);
  return ctx;
}

function drawingRect(ctx)
/* for debug */
{
  return {
    canvasArea: function canvasArea() {
      ctx.save();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
    },
    chartArea: function chartArea() {
      ctx.save();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 3;
      ctx.strokeRect(_options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].layout.padding.left, _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].layout.padding.top, _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].layout.chartWidth, _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].layout.chartHeight);
      ctx.restore();
    },
    yTickLabel: function yTickLabel() {
      ctx.save();
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 30, 30, _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].layout.chartHeight);
      ctx.restore();
    },
    bottomLabel: function bottomLabel() {
      ctx.save();
      ctx.strokeStyle = 'blue';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].layout.padding.top + _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].layout.chartHeight, _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].layout.bottomLable.width, _options_values__WEBPACK_IMPORTED_MODULE_0__["computedSize"].layout.bottomLable.height);
      ctx.restore();
    }
  };
}



/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/engine */ "./src/core/engine.js");


if (typeof window !== 'undefined') {
  window.JChart = _core_engine__WEBPACK_IMPORTED_MODULE_0__["default"];
}

/***/ }),

/***/ "./src/options/values.js":
/*!*******************************!*\
  !*** ./src/options/values.js ***!
  \*******************************/
/*! exports provided: computedSize, dataPoints, globalDefaults, defaultConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computedSize", function() { return computedSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataPoints", function() { return dataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globalDefaults", function() { return globalDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultConfig", function() { return defaultConfig; });
var dataPoints = [{
  xPoint: [],
  yPoint: []
}]; // usage :  extend(target, obj1, obj2)

/* 실제 반영 할 options ( layout-padding.., scales) */

var computedSize = {
  set: function set(values) {
    this.options = values;
  }
};
var globalDefaults = {
  defaultColor: 'rgba(0,0,0,0.1)',
  defaultFontColor: '#666',
  defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  defaultFontSize: 12,
  defaultFontStyle: 'normal',
  defaultLineHeight: 1.2,
  titleFontStyle: 'bold',
  titleSpacing: 2,
  titleMarginBottom: 6,
  titleFontColor: '#fff',
  titleAlign: 'left',
  gridLineColor: 'rgba(0,0,0,1)',
  gridLineWidth: 0.5,
  curveLineColor: 'green',
  dataPointColor: 'blue'
};
/* JChart 생성시 config가 비어있을 경우 이 defaultConfig 값을 사용 */

var defaultConfig = {
  options: {
    responsive: true,
    ratio: {
      x: 21,
      y: 9
    },
    layout: {
      padding: {
        top: 40.5,
        right: 40,
        bottom: 60.5,
        left: 65.5
      }
    },
    scales: {
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true
        },
        gridLines: {
          color: globalDefaults.gridlineColor,
          lineWidth: globalDefaults.gridLineWidth
        }
      }],
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true
        },
        gridLines: {
          color: globalDefaults.gridlineColor,
          lineWidth: globalDefaults.gridLineWidth
        }
      }]
    }
  }
  /*  incomplete
      elements:{},
      events: [
          'mousemove',
          'mouseout',
          'click',
          'touchstart',
          'touchmove'
      ],
      hover: { 
          onHover: null,
          mode: 'nearest',
          intersect: true,
          animationDuration: 400
      },
      
      onClick: null,
      maintainAspectRatio: true,
      responsiveAnimationDuration: 0
      */

};
Object.freeze(defaultConfig);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvZHJhdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vycm9yQ29udHJvbC9lcnJvclByaW50LmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlci9tZXJnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVyL3NjYWxlLmNhbGN1bGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVyL3NpemUuY2FsY3VsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGlvbnMvdmFsdWVzLmpzIl0sIm5hbWVzIjpbIkRyYXciLCJkcmF3T3B0aW9ucyIsImN0eCIsImdldENvbnRleHQiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsImNvbXB1dGVkU2l6ZSIsIm9wdGlvbnMiLCJsYXlvdXQiLCJjaGFydFdpZHRoIiwiY2hhcnRIZWlnaHQiLCJsZWZ0UGFkZGluZyIsInBhZGRpbmciLCJsZWZ0IiwicmlnaHRQYWRkaW5nIiwicmlnaHQiLCJ0b3BQYWRkaW5nIiwidG9wIiwiYm90dG9tUGFkZGluZyIsImJvdHRvbSIsInJldHVybk9iaiIsInlHcmlkV2l0aExhYmVsIiwibGFiZWwiLCJsYWJlbExlbmd0aCIsImxlbmd0aCIsInN0ZXB4IiwiZGF0YVBvaW50cyIsInhQb2ludCIsInNwbGljZSIsInNhdmUiLCJzdHJva2VTdHlsZSIsInNjYWxlcyIsInlBeGVzIiwiZ3JpZExpbmVzIiwiY29sb3IiLCJsaW5lV2lkdGgiLCJ4IiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibGluZVRvIiwicHVzaCIsImJvdHRvbUxhYmVsIiwic3Ryb2tlIiwicmVzdG9yZSIsInN0cmluZyIsInkiLCJmaWxsVGV4dCIsInhHcmlkV2l0aExhYmVsIiwibWF4IiwibWluIiwibmljZSIsIm5pY2VNYXgiLCJuaWNlTWluIiwidGlja1N0ZXAiLCJ5VGlja051bWJlciIsIkhlbHBlciIsIm5pY2VTY2FsZSIsIm5pY2VNYXhpbXVtIiwibmljZU1pbmltdW0iLCJ0aWNrU3BhY2luZyIsInN0ZXB5IiwiTWF0aCIsImNlaWwiLCJ5VGljayIsInRpY2tOdW1iZXIiLCJkZWJ1Z0NvbnNvbGUiLCJ4QXhlcyIsInlUaWNrTGFiZWwiLCJ0aWNrSGVpZ2h0IiwidGljayIsInRvRml4ZWQiLCJkcmF3R3JpZCIsImRhdGEiLCJmb250U2l6ZSIsImdsb2JhbERlZmF1bHRzIiwiZGVmYXVsdEZvbnRTaXplIiwiZm9udFN0eWxlIiwiZm9udCIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsImxhYmVscyIsImRhdGFWYWx1ZSIsImRhdGFzZXRzIiwibWF4VmFsdWUiLCJhcHBseSIsIm1pblZhbHVlIiwiYXhpc1RpdGxlcyIsImF4ZXNUeXBlIiwibGFiZWxTdHJpbmciLCJmaWxsU3R5bGUiLCJkZWZhdWx0Rm9udENvbG9yIiwic2NhbGVMYWJlbCIsImJvdHRvbUxhYmxlIiwidHJhbnNsYXRlIiwicm90YXRlIiwiUEkiLCJsaW5lUG9pbnQiLCJmb3JFYWNoIiwiaSIsImluZGV4IiwiZGF0YXMiLCJ5UG9pbnQiLCJkYXRhc1BvaW50Q29sb3IiLCJhcmMiLCJmaWxsIiwibGluZUN1cnZlIiwiY3VydmVMaW5lQ29sb3IiLCJiYXNlQ2FudmFzIiwic2V0Q29udGV4dCIsIm9wdHMiLCJjb25maWciLCJheGVzIiwiZGlzcGxheSIsIl9jdHgiLCJKQ2hhcnQiLCJpbml0aWFsaXplIiwidXBkYXRlIiwiY2xlYXJSZWN0IiwiY2FsbCIsImNoYW5nZVJhdGlvIiwiY29tcHV0ZVNpemUiLCJiYXNlRHJhd2luZyIsImdldEN1cnJlbnRPcHQiLCJzZXRMb2ciLCJ2YWx1ZSIsImlzRXhpc3QiLCJERUJVR19NT0RFIiwiYXJlYVNob3ciLCJkcmF3aW5nUmVjdCIsInByb3RvdHlwZSIsImNvbnRleHRWYWxpZGF0b3IiLCJtZXJnZUNvbmZpZyIsImJpbmRFdmVudCIsInJlc3BvbnNpdmUiLCJiaW5kUmVzaXplRXZlbnQiLCJyYXRpb0NhbGN1bGF0b3IiLCJjb25zb2xlIiwid2FybiIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemluZ0NhbnZhcyIsInN0ciIsImxvZyIsIl9jb25maWciLCJkZWZhdWx0Q29uZmlnIiwiYXBwZW5kQ29uZmlnIiwic2V0IiwidGFyZ2V0IiwiYXJndW1lbnRzIiwiZnJvbSIsImoiLCJPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsIm9iakl0ZXJhdG9yIiwicHJvcCIsIkFycmF5IiwiaXNBcnJheSIsInRlbXAiLCJsb2cxMCIsIkxPRzEwRSIsIm5pY2VOdW0iLCJsb2NhbFJhbmdlIiwicm91bmQiLCJleHBvbmVudCIsImZsb29yIiwiZnJhY3Rpb24iLCJuaWNlRnJhY3Rpb24iLCJtaW5Qb2ludCIsIm1heFBvaW50IiwibWF4VGlja3MiLCJyYW5nZSIsInNjYWxlQ2FsY3VsYXRvciIsImVycm9yIiwib2JqIiwicGFyZW50Tm9kZSIsInBhcmVudFdpZHRoIiwiY2xpZW50V2lkdGgiLCJwYXJlbnRIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJkaWFnb25hbCIsInJhdGlvIiwidyIsImgiLCJzcXJ0IiwiY2FudmFzQXJlYSIsInN0cm9rZVJlY3QiLCJjaGFydEFyZWEiLCJ2YWx1ZXMiLCJkZWZhdWx0Q29sb3IiLCJkZWZhdWx0Rm9udEZhbWlseSIsImRlZmF1bHRGb250U3R5bGUiLCJkZWZhdWx0TGluZUhlaWdodCIsInRpdGxlRm9udFN0eWxlIiwidGl0bGVTcGFjaW5nIiwidGl0bGVNYXJnaW5Cb3R0b20iLCJ0aXRsZUZvbnRDb2xvciIsInRpdGxlQWxpZ24iLCJncmlkTGluZUNvbG9yIiwiZ3JpZExpbmVXaWR0aCIsImRhdGFQb2ludENvbG9yIiwiZ3JpZGxpbmVDb2xvciIsImZyZWV6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ZGxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4uanNcIik7XG4iLCJcclxuaW1wb3J0IHsgZGF0YVBvaW50cywgZ2xvYmFsRGVmYXVsdHMsIGNvbXB1dGVkU2l6ZSB9IGZyb20gJy4uL29wdGlvbnMvdmFsdWVzJztcclxuaW1wb3J0IGRlYnVnQ29uc29sZSBmcm9tICcuLi9lcnJvckNvbnRyb2wvZXJyb3JQcmludCc7XHJcbmltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4uL2hlbHBlci9pbmRleCc7XHJcblxyXG5jb25zdCBEcmF3ID0ge1xyXG5cdGRyYXdPcHRpb25zKCkge1xyXG5cdFx0Y29uc3QgY3R4ID0gdGhpcy5nZXRDb250ZXh0KCk7XHJcblx0XHRjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGN0eC5jYW52YXM7XHJcblxyXG5cdFx0Y29uc3QgeyBjaGFydFdpZHRoLCBjaGFydEhlaWdodCB9ID0gY29tcHV0ZWRTaXplLm9wdGlvbnMubGF5b3V0LFxyXG5cdFx0XHRsZWZ0UGFkZGluZyA9IGNvbXB1dGVkU2l6ZS5vcHRpb25zLmxheW91dC5wYWRkaW5nLmxlZnQsXHJcblx0XHRcdHJpZ2h0UGFkZGluZyA9IGNvbXB1dGVkU2l6ZS5vcHRpb25zLmxheW91dC5wYWRkaW5nLnJpZ2h0LFxyXG5cdFx0XHR0b3BQYWRkaW5nID0gY29tcHV0ZWRTaXplLm9wdGlvbnMubGF5b3V0LnBhZGRpbmcudG9wLFxyXG5cdFx0XHRib3R0b21QYWRkaW5nID0gY29tcHV0ZWRTaXplLm9wdGlvbnMubGF5b3V0LnBhZGRpbmcuYm90dG9tO1xyXG5cclxuXHRcdGNvbnN0IHJldHVybk9iaiA9IHtcclxuXHRcdFx0d2lkdGgsXHJcblx0XHRcdGhlaWdodCxcclxuXHRcdFx0bGVmdFBhZGRpbmcsXHJcblx0XHRcdHJpZ2h0UGFkZGluZyxcclxuXHRcdFx0dG9wUGFkZGluZyxcclxuXHRcdFx0Ym90dG9tUGFkZGluZyxcclxuXHRcdFx0Y2hhcnRXaWR0aCxcclxuXHRcdFx0Y2hhcnRIZWlnaHQsXHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiByZXR1cm5PYmo7XHJcblx0fSxcclxuXHR5R3JpZFdpdGhMYWJlbChsYWJlbCkgLyogaXQgZGVwZW5kcyBvbiBsYWJlbHMgKi8ge1xyXG5cdFx0Y29uc3QgY3R4ID0gdGhpcy5nZXRDb250ZXh0KCk7XHJcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5kcmF3T3B0aW9ucygpO1xyXG5cclxuXHRcdGNvbnN0IGxhYmVsTGVuZ3RoID0gbGFiZWwubGVuZ3RoIHx8IDEsXHJcblx0XHRcdHN0ZXB4ID0gb3B0aW9ucy5jaGFydFdpZHRoIC8gKGxhYmVsTGVuZ3RoIC0gMSksXHJcblx0XHRcdGhlaWdodCA9IG9wdGlvbnMuY2hhcnRIZWlnaHQgKyBvcHRpb25zLnRvcFBhZGRpbmcsXHJcblx0XHRcdHdpZHRoID0gb3B0aW9ucy5jaGFydFdpZHRoICsgb3B0aW9ucy5sZWZ0UGFkZGluZztcclxuXHJcblxyXG5cdFx0ZGF0YVBvaW50c1swXS54UG9pbnQuc3BsaWNlKDApO1xyXG5cdFx0Y3R4LnNhdmUoKTtcclxuXHRcdGN0eC5zdHJva2VTdHlsZSA9IGNvbXB1dGVkU2l6ZS5vcHRpb25zLnNjYWxlcy55QXhlc1swXS5ncmlkTGluZXMuY29sb3I7XHJcblx0XHRjdHgubGluZVdpZHRoID0gY29tcHV0ZWRTaXplLm9wdGlvbnMuc2NhbGVzLnlBeGVzWzBdLmdyaWRMaW5lcy5saW5lV2lkdGg7XHJcblxyXG5cdFx0Zm9yIChsZXQgeCA9IG9wdGlvbnMubGVmdFBhZGRpbmcsIHlBeGVzID0gMDtcclxuXHRcdFx0eCA8PSB3aWR0aDsgeCArPSBzdGVweCwgeUF4ZXMgKz0gMSkge1xyXG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XHJcblx0XHRcdGN0eC5tb3ZlVG8oeCwgb3B0aW9ucy50b3BQYWRkaW5nKTtcclxuXHRcdFx0Y3R4LmxpbmVUbyh4LCBoZWlnaHQpO1xyXG5cclxuXHRcdFx0ZGF0YVBvaW50c1swXS54UG9pbnQucHVzaCh4KTtcclxuXHRcdFx0dGhpcy5ib3R0b21MYWJlbChsYWJlbFt5QXhlc10sIHgsIG9wdGlvbnMuY2hhcnRIZWlnaHQgKyBvcHRpb25zLmJvdHRvbVBhZGRpbmcpO1xyXG5cdFx0XHRjdHguc3Ryb2tlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y3R4LnJlc3RvcmUoKTtcclxuXHR9LFxyXG5cdGJvdHRvbUxhYmVsKHN0cmluZywgeCwgeSkge1xyXG5cdFx0aWYgKCFzdHJpbmcpIHJldHVybjtcclxuXHRcdGNvbnN0IGN0eCA9IHRoaXMuZ2V0Q29udGV4dCgpO1xyXG5cdFx0Y3R4LmZpbGxUZXh0KHN0cmluZywgeCwgeSk7XHJcblx0fSxcclxuXHR4R3JpZFdpdGhMYWJlbChtYXgsIG1pbikge1xyXG5cdFx0Y29uc3QgY3R4ID0gdGhpcy5nZXRDb250ZXh0KCk7XHJcblx0XHRjb25zdCBvcHRpb25zID0gdGhpcy5kcmF3T3B0aW9ucygpO1xyXG5cclxuXHRcdGxldCBuaWNlLFxyXG5cdFx0XHRuaWNlTWF4LFxyXG5cdFx0XHRuaWNlTWluLFxyXG5cdFx0XHR0aWNrU3RlcCxcclxuXHRcdFx0eVRpY2tOdW1iZXI7XHJcblxyXG5cdFx0aWYgKG1heCAhPT0gbWluKSB7XHJcblx0XHRcdG5pY2UgPSBIZWxwZXIubmljZVNjYWxlKG1pbiwgbWF4KTtcclxuXHRcdFx0bmljZU1heCA9IG5pY2UubmljZU1heGltdW07XHJcblx0XHRcdG5pY2VNaW4gPSBuaWNlLm5pY2VNaW5pbXVtO1xyXG5cdFx0XHR0aWNrU3RlcCA9IG5pY2UudGlja1NwYWNpbmc7XHJcblx0XHRcdHlUaWNrTnVtYmVyID0gKG5pY2VNYXggLSBuaWNlTWluKSAvIHRpY2tTdGVwICsgMTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRpY2tTdGVwID0gMC4yO1xyXG5cdFx0XHRuaWNlTWF4ID0gbWF4ICsgKHRpY2tTdGVwICogNSk7XHJcblx0XHRcdG5pY2VNaW4gPSBtYXggLSAodGlja1N0ZXAgKiA1KTtcclxuXHRcdFx0eVRpY2tOdW1iZXIgPSAxMTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Y29uc3Qgc3RlcHkgPSBNYXRoLmNlaWwoKG9wdGlvbnMuY2hhcnRIZWlnaHQpIC8geVRpY2tOdW1iZXIpO1xyXG5cdFx0bGV0IHlUaWNrID0gbmljZU1heDtcclxuXHRcdGNvbnN0IGhlaWdodCA9IG9wdGlvbnMuY2hhcnRIZWlnaHQgKyBvcHRpb25zLnRvcFBhZGRpbmc7XHJcblx0XHRjb25zdCB3aWR0aCA9IG9wdGlvbnMuY2hhcnRXaWR0aCArIG9wdGlvbnMubGVmdFBhZGRpbmc7XHJcblx0XHRkYXRhUG9pbnRzLnRpY2tOdW1iZXIgPSB5VGlja051bWJlcjtcclxuXHRcdGRhdGFQb2ludHMubmljZU1heCA9IG5pY2VNYXg7XHJcblx0XHRkYXRhUG9pbnRzLm5pY2VNaW4gPSBuaWNlTWluO1xyXG5cdFx0ZGF0YVBvaW50cy50aWNrU3RlcCA9IHRpY2tTdGVwO1xyXG5cdFx0ZGF0YVBvaW50cy5zdGVweSA9IHN0ZXB5O1xyXG5cdFx0ZGVidWdDb25zb2xlKCctLS0tLS0tLS0tLScpO1xyXG5cdFx0ZGVidWdDb25zb2xlKGB0aWNrU3RlcDogJHt0aWNrU3RlcH1gKTtcclxuXHRcdGRlYnVnQ29uc29sZShgbmljZU1heCA6ICR7bmljZU1heH1gKTtcclxuXHRcdGRlYnVnQ29uc29sZShgbmljZU1pbiA6ICR7bmljZU1pbn1gKTtcclxuXHRcdGRlYnVnQ29uc29sZShgeVRpY2tOdW1iZXIgOiAke3lUaWNrTnVtYmVyfWApO1xyXG5cdFx0ZGVidWdDb25zb2xlKGBzdGVweSA6ICR7c3RlcHl9YCk7XHJcblx0XHRkZWJ1Z0NvbnNvbGUoYHRpY2tTdGVwIDogJHt0aWNrU3RlcH1gKTtcclxuXHRcdGRlYnVnQ29uc29sZSgnLS0tLS0tLS0tLS0nKTtcclxuXHJcblx0XHRjdHguc2F2ZSgpO1xyXG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gY29tcHV0ZWRTaXplLm9wdGlvbnMuc2NhbGVzLnhBeGVzWzBdLmdyaWRMaW5lcy5jb2xvcjtcclxuXHJcblx0XHRjb25zdCB7IGxpbmVXaWR0aCB9ID0gY29tcHV0ZWRTaXplLm9wdGlvbnMuc2NhbGVzLnhBeGVzWzBdLmdyaWRMaW5lcztcclxuXHJcblxyXG5cdFx0Zm9yIChsZXQgeSA9IG9wdGlvbnMudG9wUGFkZGluZztcclxuXHRcdFx0eSA8IGhlaWdodDtcclxuXHRcdFx0eSArPSBzdGVweSkge1xyXG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XHJcblx0XHRcdGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcblx0XHRcdGlmICh5VGljayA9PT0gMCkge1xyXG5cdFx0XHRcdGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGggKiAyO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMueVRpY2tMYWJlbCh5VGljaywgb3B0aW9ucy5sZWZ0UGFkZGluZyAtIDIwLCB5KTtcclxuXHRcdFx0Y3R4Lm1vdmVUbyhvcHRpb25zLmxlZnRQYWRkaW5nIC0gMTAsIHkpO1xyXG5cdFx0XHRjdHgubGluZVRvKHdpZHRoLCB5KTtcclxuXHRcdFx0eVRpY2sgLT0gdGlja1N0ZXA7XHJcblx0XHRcdGN0eC5zdHJva2UoKTtcclxuXHRcdFx0ZGF0YVBvaW50cy50aWNrSGVpZ2h0ID0geTtcclxuXHRcdH1cclxuXHRcdGN0eC5yZXN0b3JlKCk7XHJcblx0fSxcclxuXHR5VGlja0xhYmVsKHRpY2ssIHgsIHkpIHtcclxuXHRcdGNvbnN0IGN0eCA9IHRoaXMuZ2V0Q29udGV4dCgpO1xyXG5cdFx0Y29uc3QgeVRpY2sgPSB0aWNrLnRvRml4ZWQoMSk7XHJcblx0XHRjdHguZmlsbFRleHQoeVRpY2ssIHgsIHkpO1xyXG5cdH0sXHJcblx0ZHJhd0dyaWQoZGF0YSkge1xyXG5cdFx0Y29uc3QgY3R4ID0gdGhpcy5nZXRDb250ZXh0KCk7XHJcblxyXG5cdFx0Y29uc3QgZm9udFNpemUgPSBnbG9iYWxEZWZhdWx0cy5kZWZhdWx0Rm9udFNpemU7XHJcblx0XHRjb25zdCBmb250U3R5bGUgPSBgJHtmb250U2l6ZX0gcHggQXJpYWxgO1xyXG5cclxuXHRcdGN0eC5mb250ID0gZm9udFN0eWxlO1xyXG5cdFx0Y3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG5cdFx0Y3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xyXG5cclxuXHRcdGNvbnN0IGxhYmVsID0gZGF0YS5sYWJlbHM7XHJcblxyXG5cdFx0dGhpcy55R3JpZFdpdGhMYWJlbChsYWJlbCk7XHJcblxyXG5cdFx0Y29uc3QgZGF0YVZhbHVlID0gZGF0YS5kYXRhc2V0c1swXS5kYXRhO1xyXG5cdFx0Y29uc3QgbWF4VmFsdWUgPSBNYXRoLm1heC5hcHBseShudWxsLCBkYXRhVmFsdWUpO1xyXG5cdFx0Y29uc3QgbWluVmFsdWUgPSBNYXRoLm1pbi5hcHBseShudWxsLCBkYXRhVmFsdWUpO1xyXG5cclxuXHRcdHRoaXMueEdyaWRXaXRoTGFiZWwobWF4VmFsdWUsIG1pblZhbHVlKTtcclxuXHR9LFxyXG5cdGF4aXNUaXRsZXMoc2NhbGVzLCBheGVzVHlwZSkge1xyXG5cdFx0bGV0IGxhYmVsU3RyaW5nLFxyXG5cdFx0XHR3aWR0aCxcclxuXHRcdFx0aGVpZ2h0O1xyXG5cclxuXHRcdGNvbnN0IGZvbnRTaXplID0gZ2xvYmFsRGVmYXVsdHMuZGVmYXVsdEZvbnRTaXplLFxyXG5cdFx0XHRmb250U3R5bGUgPSBgJHtmb250U2l6ZX0gcHggQXJpYWxgO1xyXG5cclxuXHRcdGNvbnN0IGN0eCA9IHRoaXMuZ2V0Q29udGV4dCgpO1xyXG5cclxuXHRcdGN0eC5zYXZlKCk7XHJcblx0XHRjdHguZmlsbFN0eWxlID0gZ2xvYmFsRGVmYXVsdHMuZGVmYXVsdEZvbnRDb2xvcjtcclxuXHRcdGN0eC5saW5lV2lkdGggPSAxO1xyXG5cdFx0Y3R4LmZvbnQgPSBmb250U3R5bGU7XHJcblx0XHRjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcblx0XHRjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XHJcblxyXG5cdFx0aWYgKGF4ZXNUeXBlID09PSAneEF4ZXMnKSB7IC8vIGJvdHRvbSBsZWdlbmQgbGFibGVcclxuXHRcdFx0bGFiZWxTdHJpbmcgPSBzY2FsZXNbMF0uc2NhbGVMYWJlbC5sYWJlbFN0cmluZztcclxuXHRcdFx0d2lkdGggPSBjdHguY2FudmFzLndpZHRoIC8gMjtcclxuXHRcdFx0Y3R4LmZpbGxUZXh0KGxhYmVsU3RyaW5nLCBcclxuXHRcdFx0XHR3aWR0aCwgXHJcblx0XHRcdFx0Y29tcHV0ZWRTaXplLm9wdGlvbnMubGF5b3V0LmJvdHRvbUxhYmxlLmhlaWdodCArIGZvbnRTaXplICsgMSk7XHJcblx0XHR9IGVsc2UgaWYgKGF4ZXNUeXBlID09PSAneUF4ZXMnKSB7IC8vIGxlZnQgbGVnZW5kIGxhYmxlXHJcblx0XHRcdGxhYmVsU3RyaW5nID0gc2NhbGVzWzBdLnNjYWxlTGFiZWwubGFiZWxTdHJpbmc7XHJcblx0XHRcdHdpZHRoID0gY3R4LmNhbnZhcy53aWR0aDtcclxuXHRcdFx0aGVpZ2h0ID0gY3R4LmNhbnZhcy5oZWlnaHQgLyAyO1xyXG5cdFx0XHRjdHgudHJhbnNsYXRlKDI1LCBoZWlnaHQpO1xyXG5cdFx0XHRjdHgucm90YXRlKE1hdGguUEkgKiAxLjUpO1xyXG5cdFx0XHRjdHguZmlsbFRleHQobGFiZWxTdHJpbmcsIDAsIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGN0eC5yZXN0b3JlKCk7XHJcblx0fSxcclxuXHRsaW5lUG9pbnQoZGF0YSwgeFBvaW50KSB7XHJcblx0XHRjb25zdCBjdHggPSB0aGlzLmdldENvbnRleHQoKTtcclxuXHRcdGNvbnN0IG9wdGlvbnMgPSB0aGlzLmRyYXdPcHRpb25zKCk7XHJcblx0XHRjb25zdCB7IG5pY2VNYXgsIHRpY2tTdGVwLCBzdGVweSB9ID0gZGF0YVBvaW50cztcclxuXHRcdGNvbnN0IGhlaWdodCA9IGRhdGFQb2ludHMudGlja0hlaWdodCAtIG9wdGlvbnMudG9wUGFkZGluZztcclxuXHJcblx0XHRkZWJ1Z0NvbnNvbGUoJ0RyYXcucG9pbnQoKScpO1xyXG5cdFx0ZGVidWdDb25zb2xlKGBoZWlnaHQgJHtoZWlnaHR9YCk7XHJcblx0XHRkZWJ1Z0NvbnNvbGUoYHN0ZXB5IDogJHtzdGVweX1gKTtcclxuXHJcblx0XHRkYXRhLmZvckVhY2goKGksIGluZGV4KSA9PiB7IC8vIGRhdGFcclxuXHRcdFx0bGV0IGRhdGFzID0gaTtcclxuXHRcdFx0bGV0IHk7XHJcblx0XHRcdGlmIChkYXRhcyA9PT0gMCkge1xyXG5cdFx0XHRcdHkgPSAobmljZU1heCAvIHRpY2tTdGVwKSAqIHN0ZXB5O1xyXG5cdFx0XHR9IGVsc2UgaWYgKGRhdGFzIDwgMCkge1xyXG5cdFx0XHRcdGRhdGFzICo9IC0xO1xyXG5cdFx0XHRcdHkgPSAoKHN0ZXB5IC8gdGlja1N0ZXApICogZGF0YXMpICsgKChuaWNlTWF4IC8gdGlja1N0ZXApICogc3RlcHkpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGRhdGFzID4gMCkge1xyXG5cdFx0XHRcdHkgPSAoKHN0ZXB5IC8gdGlja1N0ZXApICogbmljZU1heCkgLSAoc3RlcHkgLyB0aWNrU3RlcCkgKiBkYXRhcztcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCB4ID0geFBvaW50W2luZGV4XTtcclxuXHRcdFx0ZGF0YVBvaW50c1swXS55UG9pbnQucHVzaCh5ICsgb3B0aW9ucy50b3BQYWRkaW5nKTtcclxuXHJcblx0XHRcdGN0eC5zYXZlKCk7XHJcblx0XHRcdGN0eC5iZWdpblBhdGgoKTtcclxuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IGdsb2JhbERlZmF1bHRzLmRhdGFzUG9pbnRDb2xvcjtcclxuXHRcdFx0Y3R4LmFyYyh4LCB5ICsgb3B0aW9ucy50b3BQYWRkaW5nLCAzLCAwLCBNYXRoLlBJICogMik7XHJcblx0XHRcdGN0eC5maWxsKCk7XHJcblx0XHRcdGN0eC5yZXN0b3JlKCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGxpbmVDdXJ2ZSgpIHtcclxuXHRcdGNvbnN0IGN0eCA9IHRoaXMuZ2V0Q29udGV4dCgpO1xyXG5cdFx0Y3R4LnNhdmUoKTtcclxuXHRcdGN0eC5iZWdpblBhdGgoKTtcclxuXHJcblx0XHRjb25zdCB7IGxlbmd0aCB9ID0gZGF0YVBvaW50c1swXS54UG9pbnQ7XHJcblx0XHRjb25zdCB7IHhQb2ludCwgeVBvaW50IH0gPSBkYXRhUG9pbnRzWzBdO1xyXG5cclxuXHRcdGRlYnVnQ29uc29sZShkYXRhUG9pbnRzWzBdLnlQb2ludCk7XHJcblx0XHRjdHgubW92ZVRvKHhQb2ludFswXSwgeVBvaW50WzBdKTtcclxuXHRcdGN0eC5zdHJva2VTdHlsZSA9IGdsb2JhbERlZmF1bHRzLmN1cnZlTGluZUNvbG9yO1xyXG5cdFx0Y3R4LmxpbmVXaWR0aCA9IDI7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdGN0eC5saW5lVG8oeFBvaW50W2ldLCB5UG9pbnRbaV0pO1xyXG5cdFx0XHRjdHguc3Ryb2tlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0YVBvaW50c1swXS55UG9pbnQuc3BsaWNlKDApO1xyXG5cdFx0Y3R4LnJlc3RvcmUoKTtcclxuXHR9LFxyXG5cdGJhc2VDYW52YXMoKSB7XHJcblx0XHREcmF3LnNldENvbnRleHQodGhpcy5jdHgpO1xyXG5cdFx0Y29uc3Qgb3B0cyA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcblx0XHRjb25zdCB7IGRhdGEgfSA9IHRoaXMuY29uZmlnO1xyXG5cclxuXHRcdERyYXcuZHJhd0dyaWQoZGF0YSk7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0RHJhdy5saW5lUG9pbnQoZGF0YS5kYXRhc2V0c1tpXS5kYXRhLCBkYXRhUG9pbnRzWzBdLnhQb2ludCk7XHJcblx0XHR9XHJcblxyXG5cdFx0LypcclxuICAgICAgICBkYXRhLmRhdGFzZXRzLmZvckVhY2goZnVuY3Rpb24oaSwgaW5kZXgpe1xyXG4gICAgICAgICAgICB0aGlzLmxpbmVQb2ludChpLmRhdGEsIGRhdGFQb2ludHNbMF0ueFBvaW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAqL1xyXG5cclxuXHRcdERyYXcubGluZUN1cnZlKCk7XHJcblxyXG5cdFx0Zm9yIChsZXQgYXhlcyBpbiBvcHRzLnNjYWxlcykge1xyXG5cdFx0XHRpZiAob3B0cy5zY2FsZXNbYXhlc11bMF0uZGlzcGxheSkge1xyXG5cdFx0XHRcdERyYXcuYXhpc1RpdGxlcyhvcHRzLnNjYWxlc1theGVzXSwgYXhlcyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGdldENvbnRleHQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jdHg7XHJcblx0fSxcclxuXHRzZXRDb250ZXh0KF9jdHgpIHtcclxuXHRcdHRoaXMuY3R4ID0gX2N0eDtcclxuXHR9LFxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyYXc7IiwiaW1wb3J0IHsgY29tcHV0ZWRTaXplIH0gZnJvbSAnLi4vb3B0aW9ucy92YWx1ZXMnO1xyXG5pbXBvcnQgeyBIZWxwZXIsIERFQlVHX01PREUgfSBmcm9tICcuLi9oZWxwZXIvaW5kZXgnO1xyXG5pbXBvcnQgRHJhdyBmcm9tICcuL2RyYXcnO1xyXG5pbXBvcnQgZGVidWdDb25zb2xlIGZyb20gJy4uL2Vycm9yQ29udHJvbC9lcnJvclByaW50JztcclxuXHJcblxyXG5jb25zdCBKQ2hhcnQgPSBmdW5jdGlvbiAoY3R4LCBjb25maWcpIHtcclxuXHRpZiAoISh0aGlzIGluc3RhbmNlb2YgSkNoYXJ0KSkge1xyXG5cdFx0cmV0dXJuIG5ldyBKQ2hhcnQoY3R4LCBjb25maWcpO1xyXG5cdH1cclxuXHJcblxyXG5cdHRoaXMuaW5pdGlhbGl6ZShjdHgsIGNvbmZpZyk7XHJcblxyXG5cdHRoaXMudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5jdHguY2FudmFzLmhlaWdodCk7XHJcblx0XHREcmF3LmJhc2VDYW52YXMuY2FsbCh0aGlzKTtcclxuXHR9O1xyXG5cdHRoaXMuY2hhbmdlUmF0aW8gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRIZWxwZXIuY29tcHV0ZVNpemUodGhpcy5jdHgpO1xyXG5cdFx0dGhpcy5iYXNlRHJhd2luZygpO1xyXG5cdH07XHJcblx0dGhpcy5nZXRDdXJyZW50T3B0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGNvbXB1dGVkU2l6ZS5vcHRpb25zO1xyXG5cdH07XHJcblx0dGhpcy5zZXRMb2cgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdGlmIChIZWxwZXIuaXNFeGlzdCh2YWx1ZSkpIHtcclxuXHRcdFx0REVCVUdfTU9ERSA9IHZhbHVlO1xyXG5cdFx0fVxyXG5cdH07XHJcblx0dGhpcy5hcmVhU2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBIZWxwZXIuZHJhd2luZ1JlY3QoY3R4KTtcclxuXHR9O1xyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuSkNoYXJ0LnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKGN0eCwgY29uZmlnKSB7XHJcblx0dGhpcy5jdHggPSBIZWxwZXIuY29udGV4dFZhbGlkYXRvcihjdHgsIGNvbmZpZyk7XHJcblx0aWYgKHRoaXMuY3R4IDwgMCkgcmV0dXJuIC0xO1xyXG5cclxuXHR0aGlzLmNvbmZpZyA9IEhlbHBlci5tZXJnZUNvbmZpZyhjb25maWcpO1xyXG5cclxuXHREcmF3LnNldENvbnRleHQoY3R4KTtcclxuXHJcblx0dGhpcy5iaW5kRXZlbnQoKTtcclxuXHJcblx0dGhpcy5iYXNlRHJhd2luZygpO1xyXG59O1xyXG5cclxuSkNoYXJ0LnByb3RvdHlwZS5iaW5kRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgcmVzcG9uc2l2ZSA9IHRoaXMuY29uZmlnLm9wdGlvbnMucmVzcG9uc2l2ZSB8fCBmYWxzZTtcclxuXHRpZiAocmVzcG9uc2l2ZSkge1xyXG5cdFx0dGhpcy5iaW5kUmVzaXplRXZlbnQoKTtcclxuXHR9XHJcbn07XHJcblxyXG5KQ2hhcnQucHJvdG90eXBlLmJhc2VEcmF3aW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdEhlbHBlci5yYXRpb0NhbGN1bGF0b3IodGhpcy5jdHgpO1xyXG5cclxuXHRIZWxwZXIuY29tcHV0ZVNpemUodGhpcy5jdHgpO1xyXG5cdERyYXcuYmFzZUNhbnZhcy5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuSkNoYXJ0LnByb3RvdHlwZS5iaW5kUmVzaXplRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc29sZS53YXJuKCdyZXNwb25zaXZlIG1vZGUgOiBvbicpO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG5cdFx0dGhpcy5yZXNpemluZ0NhbnZhcygpO1xyXG5cdH0pO1xyXG59O1xyXG5cclxuSkNoYXJ0LnByb3RvdHlwZS5yZXNpemluZ0NhbnZhcyA9IGZ1bmN0aW9uICgpIHtcclxuXHRIZWxwZXIucmF0aW9DYWxjdWxhdG9yKHRoaXMuY3R4KTtcclxuXHJcblx0ZGVidWdDb25zb2xlKGByZXNpemUgd2lkdGg9JHt0aGlzLmN0eC5jYW52YXMud2lkdGh9IGhlaWdodD0ke3RoaXMuY3R4LmNhbnZhcy5oZWlnaHR9YCk7XHJcblxyXG5cdEhlbHBlci5jb21wdXRlU2l6ZSh0aGlzLmN0eCk7XHJcblx0RHJhdy5iYXNlQ2FudmFzLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSkNoYXJ0OyIsIlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJ1Z0NvbnNvbGUoc3RyKSB7XHJcblx0aWYodHlwZW9mIERFQlVHX01PREUgIT09ICd1bmRlZmluZWQnICYmIERFQlVHX01PREUpIHtcclxuXHRcdGNvbnNvbGUubG9nKHN0cik7XHJcblx0fVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBpc0V4aXN0LCBjb250ZXh0VmFsaWRhdG9yLCBkcmF3aW5nUmVjdCB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgbmljZVNjYWxlIGZyb20gJy4vc2NhbGUuY2FsY3VsYXRlJztcclxuaW1wb3J0IHsgcmF0aW9DYWxjdWxhdG9yLCBjb21wdXRlU2l6ZSB9IGZyb20gJy4vc2l6ZS5jYWxjdWxhdGUnO1xyXG5pbXBvcnQgeyBtZXJnZUNvbmZpZyB9IGZyb20gJy4vbWVyZ2UnO1xyXG5cclxuXHJcbmNvbnN0IERFQlVHX01PREUgPSBmYWxzZTtcclxuXHJcbmNvbnN0IEhlbHBlciA9IHt9O1xyXG5IZWxwZXIubmljZVNjYWxlID0gbmljZVNjYWxlO1xyXG5IZWxwZXIucmF0aW9DYWxjdWxhdG9yID0gcmF0aW9DYWxjdWxhdG9yO1xyXG5IZWxwZXIuY29udGV4dFZhbGlkYXRvciA9IGNvbnRleHRWYWxpZGF0b3I7XHJcbkhlbHBlci5pc0V4aXN0ID0gaXNFeGlzdDtcclxuSGVscGVyLmRyYXdpbmdSZWN0ID0gZHJhd2luZ1JlY3Q7XHJcbkhlbHBlci5tZXJnZUNvbmZpZyA9IG1lcmdlQ29uZmlnO1xyXG5IZWxwZXIuY29tcHV0ZVNpemUgPSBjb21wdXRlU2l6ZTtcclxuXHJcblxyXG5leHBvcnQgeyBIZWxwZXIsIERFQlVHX01PREUgfTsiLCJcclxuaW1wb3J0IHsgY29tcHV0ZWRTaXplLCBkZWZhdWx0Q29uZmlnIH0gZnJvbSAnLi4vb3B0aW9ucy92YWx1ZXMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIG1lcmdlQ29uZmlnKF9jb25maWcpIHtcclxuXHQvKlxyXG5cdGNvbnN0IGRhdGEgPSBjb25maWcuZGF0YSA9IGNvbmZpZy5kYXRhIHx8IHt9O1xyXG5cdGRhdGEubGFiZWxzID0gZGF0YS5sYWJlbHMgfHwgW107XHJcblx0ZGF0YS5kYXRhc2V0cyA9IGRhdGEuZGF0YXNldHMgfHwgW107XHJcblx0Ki9cclxuXHRjb25zdCBjb25maWcgPSBfY29uZmlnO1xyXG5cdGNvbmZpZy5vcHRpb25zID0gY29uZmlnLm9wdGlvbnMgfHwgZGVmYXVsdENvbmZpZy5vcHRpb25zO1xyXG5cclxuXHRjb25maWcub3B0aW9ucyA9IGFwcGVuZENvbmZpZyh7fSwgZGVmYXVsdENvbmZpZy5vcHRpb25zLCBjb25maWcub3B0aW9ucyk7XHJcblx0Y29tcHV0ZWRTaXplLnNldChjb25maWcub3B0aW9ucyk7XHJcblx0Y29uc29sZS5sb2coY29tcHV0ZWRTaXplKTtcclxuXHRyZXR1cm4gY29uZmlnO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIwNTkxMjYxLzkzNzM0NThcclxuKiBtZXJnZSB0d28gb2JqZWN0cy5cclxuKiB1c2FnZSA6ICBleHRlbmQodGFyZ2V0LCBvYmoxLCBvYmoyKVxyXG4qIEBwYXJhbSB0YXJnZXRcclxuKiBAcGFyYW0gZGVmYXVsdFxyXG4qIEBwYXJhbSBzb3VyY2UgXHJcbiovXHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDb25maWcodGFyZ2V0KSB7XHJcblx0Zm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcclxuXHRcdGNvbnN0IGZyb20gPSBhcmd1bWVudHNbaV07XHJcblx0XHRpZiAodHlwZW9mIGZyb20gIT09ICdvYmplY3QnKSBjb250aW51ZTtcclxuXHRcdGZvcihsZXQgaiBpbiBmcm9tKSB7XHJcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZnJvbSwgaikpIHtcclxuXHRcdFx0XHR0YXJnZXRbal0gPSB0eXBlb2YgZnJvbVtqXSA9PT0gJ29iamVjdCdcclxuXHRcdFx0XHRcdD8gYXBwZW5kQ29uZmlnKHt9LCB0YXJnZXRbal0sIGZyb21bal0pXHJcblx0XHRcdFx0XHQ6IGZyb21bal07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiAgXHJcbiAqL1xyXG5cclxuXHJcbmZ1bmN0aW9uIG9iakl0ZXJhdG9yKHRhcmdldCkge1xyXG5cdGZvciAodmFyIHByb3AgaW4gdGFyZ2V0KSB7XHJcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwgcHJvcCkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiB0YXJnZXRbcHJvcF0gPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHRhcmdldFtwcm9wXSkpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnW29iamVjdF0gJyArIHByb3ApO1xyXG5cdFx0XHRcdG9iakl0ZXJhdG9yKHRhcmdldFtwcm9wXSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXRbcHJvcF0pKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ1thcnJheV0gJyArIHByb3ApO1xyXG5cdFx0XHRcdHZhciB0ZW1wID0gdGFyZ2V0W3Byb3BdO1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcC5sZW5ndGg7ICsraSkge1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0ZW1wW2ldID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh0ZW1wW2ldKSkge1xyXG5cdFx0XHRcdFx0XHRvYmpJdGVyYXRvcih0ZW1wW2ldKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdbJyArIGkgKyAnXSAnICsgdGVtcFtpXSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcF0gPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ1tzdHJpbmddICcgKyBwcm9wICsgJyAnICsgdGFyZ2V0W3Byb3BdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdID09PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnW2Jvb2xlYW5dICcgKyBwcm9wICsgJyAnICsgdGFyZ2V0W3Byb3BdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IG1lcmdlQ29uZmlnLCBhcHBlbmRDb25maWcsIG9iakl0ZXJhdG9yIH07IiwiXHJcbi8qIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2tvL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL01hdGgvbG9nMTAgKi9cclxuTWF0aC5sb2cxMCA9IE1hdGgubG9nMTAgfHwgZnVuY3Rpb24gKHgpIHtcclxuXHRyZXR1cm4gTWF0aC5sb2coeCkgKiBNYXRoLkxPRzEwRTtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBuaWNlTnVtKGxvY2FsUmFuZ2UsIHJvdW5kKSB7XHJcblx0LyogZXhwb25lbnQgb2YgbG9jYWxSYW5nZSAqL1xyXG5cdGNvbnN0IGV4cG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLmxvZzEwKGxvY2FsUmFuZ2UpKTtcclxuXHQvKiBmcmFjdGlvbmFsIHBhcnQgb2YgbG9jYWxSYW5nZSAqL1xyXG5cdGNvbnN0IGZyYWN0aW9uID0gbG9jYWxSYW5nZSAvICgxMCAqKiBleHBvbmVudCk7XHJcblx0LyogbmljZSwgcm91bmRlZCBmcmFjdGlvbiAqL1xyXG5cdGxldCBuaWNlRnJhY3Rpb247IFxyXG5cclxuXHRpZiAocm91bmQpIHtcclxuXHRcdGlmIChmcmFjdGlvbiA8IDEuNSkge1xyXG5cdFx0XHRuaWNlRnJhY3Rpb24gPSAxO1xyXG5cdFx0fWVsc2UgaWYgKGZyYWN0aW9uIDwgMykge1xyXG5cdFx0XHRuaWNlRnJhY3Rpb24gPSAyO1xyXG5cdFx0fWVsc2UgaWYgKGZyYWN0aW9uIDwgNykge1xyXG5cdFx0XHRuaWNlRnJhY3Rpb24gPSA1O1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdG5pY2VGcmFjdGlvbiA9IDEwO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZighcm91bmQpIHtcclxuXHRcdGlmIChmcmFjdGlvbiA8PSAxKSB7XHJcblx0XHRcdG5pY2VGcmFjdGlvbiA9IDE7XHJcblx0XHR9ZWxzZSBpZiAoZnJhY3Rpb24gPD0gMikge1xyXG5cdFx0XHRuaWNlRnJhY3Rpb24gPSAyO1xyXG5cdFx0fWVsc2UgaWYgKGZyYWN0aW9uIDw9IDUpIHtcclxuXHRcdFx0bmljZUZyYWN0aW9uID0gNTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRuaWNlRnJhY3Rpb24gPSAxMDtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG5pY2VGcmFjdGlvbiAqICgxMCAqKiBleHBvbmVudCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5pY2VTY2FsZShtaW4sIG1heCkge1xyXG5cdC8qXHJcblx0XHR0byBnZXQgYSAnbmljZSBudW1iZXInIGFsZ29yaXRobS4gZGV0YWlsIGJlbG93IFxyXG5cdFx0aHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODUwNjg4MS9uaWNlLWxhYmVsLWFsZ29yaXRobS1mb3ItY2hhcnRzLXdpdGgtbWluaW11bS10aWNrc1xyXG5cdCovXHJcblx0Y29uc3QgbWluUG9pbnQgPSBtaW47XHJcblx0Y29uc3QgbWF4UG9pbnQgPSBtYXg7XHJcblx0Y29uc3QgbWF4VGlja3MgPSAxMTtcclxuXHRsZXQgbmljZU1pbjtcclxuXHRsZXQgbmljZU1heDtcclxuXHRsZXQgcmFuZ2U7XHJcblx0bGV0IHRpY2tTcGFjaW5nO1xyXG5cclxuXHRmdW5jdGlvbiBzY2FsZUNhbGN1bGF0b3IoKSB7XHJcblx0XHRyYW5nZSA9IG5pY2VOdW0obWF4UG9pbnQgLSBtaW5Qb2ludCwgZmFsc2UpO1xyXG5cdFx0dGlja1NwYWNpbmcgPSBuaWNlTnVtKHJhbmdlIC8gKG1heFRpY2tzIC0gMSksIHRydWUpO1xyXG5cdFx0bmljZU1pbiA9IE1hdGguZmxvb3IobWluUG9pbnQgLyB0aWNrU3BhY2luZykgKiB0aWNrU3BhY2luZztcclxuXHRcdG5pY2VNYXggPSBNYXRoLmNlaWwobWF4UG9pbnQgLyB0aWNrU3BhY2luZykgKiB0aWNrU3BhY2luZztcclxuXHR9XHJcblxyXG5cdHNjYWxlQ2FsY3VsYXRvcigpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0dGlja1NwYWNpbmcsXHJcblx0XHRuaWNlTWluaW11bTogbmljZU1pbixcclxuXHRcdG5pY2VNYXhpbXVtOiBuaWNlTWF4LFxyXG5cdH07XHJcbn1cclxuXHJcblxyXG4vKlxyXG4vLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL0NoYXJ0LmpzL2Jsb2IvbWFzdGVyL3NyYy9oZWxwZXJzL2hlbHBlcnMubWF0aC5qc1xyXG5leHBvcnQgY29uc3QgbG9nMTAgPSBNYXRoLmxvZzEwIHx8IGZ1bmN0aW9uKHgpIHtcclxuXHR2YXIgZXhwb25lbnQgPSBNYXRoLmxvZyh4KSAqIE1hdGguTE9HMTBFOyAvLyBNYXRoLkxPRzEwRSA9IDEgLyBNYXRoLkxOMTAuXHJcblx0Ly8gQ2hlY2sgZm9yIHdob2xlIHBvd2VycyBvZiAxMCxcclxuXHQvLyB3aGljaCBkdWUgdG8gZmxvYXRpbmcgcG9pbnQgcm91bmRpbmcgZXJyb3Igc2hvdWxkIGJlIGNvcnJlY3RlZC5cclxuXHR2YXIgcG93ZXJPZjEwID0gTWF0aC5yb3VuZChleHBvbmVudCk7XHJcblx0dmFyIGlzUG93ZXJPZjEwID0geCA9PT0gTWF0aC5wb3coMTAsIHBvd2VyT2YxMCk7XHJcblxyXG5cdHJldHVybiBpc1Bvd2VyT2YxMCA/IHBvd2VyT2YxMCA6IGV4cG9uZW50O1xyXG59O1xyXG4qLyIsImltcG9ydCB7IGNvbXB1dGVkU2l6ZSB9IGZyb20gJy4uL29wdGlvbnMvdmFsdWVzJztcclxuaW1wb3J0IGRlYnVnQ29uc29sZSBmcm9tICcuLi9lcnJvckNvbnRyb2wvZXJyb3JQcmludCc7XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlU2l6ZShjdHgpIHtcclxuXHRpZiAoY29tcHV0ZWRTaXplLm9wdGlvbnMubGF5b3V0LnBhZGRpbmcpIHtcclxuXHRcdGNvbXB1dGVkU2l6ZS5vcHRpb25zLmxheW91dC5jaGFydFdpZHRoID0gY3R4LmNhbnZhcy53aWR0aCBcclxuXHRcdFx0LSAoY29tcHV0ZWRTaXplLm9wdGlvbnMubGF5b3V0LnBhZGRpbmcubGVmdCBcclxuXHRcdFx0KyBjb21wdXRlZFNpemUub3B0aW9ucy5sYXlvdXQucGFkZGluZy5yaWdodCk7XHJcblx0XHRjb21wdXRlZFNpemUub3B0aW9ucy5sYXlvdXQuY2hhcnRIZWlnaHQgPSBjdHguY2FudmFzLmhlaWdodCBcclxuXHRcdFx0LSAoY29tcHV0ZWRTaXplLm9wdGlvbnMubGF5b3V0LnBhZGRpbmcudG9wIFxyXG5cdFx0XHQrIGNvbXB1dGVkU2l6ZS5vcHRpb25zLmxheW91dC5wYWRkaW5nLmJvdHRvbSk7XHJcblx0XHRjb21wdXRlZFNpemUub3B0aW9ucy5sYXlvdXQuYm90dG9tTGFibGUgPSB7XHJcblx0XHRcdHdpZHRoOiBjb21wdXRlZFNpemUub3B0aW9ucy5sYXlvdXQuY2hhcnRXaWR0aCBcclxuXHRcdFx0KyBjb21wdXRlZFNpemUub3B0aW9ucy5sYXlvdXQucGFkZGluZy5sZWZ0LCAvLyArIGNvbXB1dGVkU2l6ZS5vcHRpb25zLmxheW91dC5wYWRkaW5nLnJpZ2h0LFxyXG5cdFx0XHRoZWlnaHQ6IGNvbXB1dGVkU2l6ZS5vcHRpb25zLmxheW91dC5wYWRkaW5nLmJvdHRvbSBcclxuXHRcdFx0KyBjb21wdXRlZFNpemUub3B0aW9ucy5sYXlvdXQuY2hhcnRIZWlnaHQsXHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zb2xlLmVycm9yKCdjb21wdXRlZFNpemUubGF5b3V0LnBhZGRpbmcgaXMgbm90IGRlZmluZWQnKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qIEZJWE1FIDog7LSI6riwIOq1rOuPmSDsi5wgIGNoYW5nZVJhdGlvICgpIO2YuOy2nCDsi5zrp4jri6Qg6rOE7IaN7KCB7Jy866GcIOqzhOyCsO2VqC4uICjshozsiJjsoJDri6jsnIQ/PykgKi8gXHJcbmZ1bmN0aW9uIHJhdGlvQ2FsY3VsYXRvcihjdHgpIHtcclxuXHRjb25zdCBvYmogPSB7fTtcclxuXHRjb25zdCB7IHBhcmVudE5vZGUgfSA9IGN0eC5jYW52YXM7XHJcblx0Y29uc3QgcGFyZW50V2lkdGggPSBwYXJlbnROb2RlLmNsaWVudFdpZHRoO1xyXG5cdGNvbnN0IHBhcmVudEhlaWdodCA9IHBhcmVudE5vZGUuY2xpZW50SGVpZ2h0O1xyXG5cdGxldCBkaWFnb25hbCA9IDA7XHJcblxyXG5cdGNvbnNvbGUubG9nKGBwYXJlbnQgd2lkdGg9JHtwYXJlbnRXaWR0aH0gaGVpZ2h0PSR7cGFyZW50SGVpZ2h0fWApO1xyXG5cclxuXHRjb25zdCB7IHgsIHkgfSA9IGNvbXB1dGVkU2l6ZS5vcHRpb25zLnJhdGlvO1xyXG5cclxuXHRkZWJ1Z0NvbnNvbGUoYFJBVElPID0gJHt4fToke3l9YCk7XHJcblxyXG5cdGNvbnN0IHcgPSBwYXJlbnRXaWR0aDtcclxuXHRjb25zdCBoID0gcGFyZW50SGVpZ2h0O1xyXG5cclxuXHRkaWFnb25hbCA9IE1hdGguc3FydCgodyAqKiAyKSArIChoICoqIDIpKTtcclxuXHJcblx0ZGVidWdDb25zb2xlKGBkaWFnb25hbD0ke2RpYWdvbmFsfWApO1xyXG5cclxuXHRvYmoud2lkdGggPSBNYXRoLmZsb29yKChkaWFnb25hbCAqIHgpIC8gTWF0aC5zcXJ0KCh4ICoqIDIpICsgKHkgKiogMikpKTtcclxuXHRvYmouaGVpZ2h0ID0gTWF0aC5mbG9vcigoZGlhZ29uYWwgKiB5KSAvIE1hdGguc3FydCgoeCAqKiAyKSArICh5ICoqIDIpKSk7XHJcblx0Y29uc29sZS5sb2coYHJhdGlvIHdpZHRoPSR7b2JqLndpZHRofSxoZWlnaHQ9JHtvYmouaGVpZ2h0fWApO1xyXG5cdGN0eC5jYW52YXMud2lkdGggPSBvYmoud2lkdGg7XHJcblx0Y3R4LmNhbnZhcy5oZWlnaHQgPSBvYmouaGVpZ2h0O1xyXG5cdHJldHVybiBvYmo7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJhdGlvQ2FsY3VsYXRvciwgY29tcHV0ZVNpemUgfTsiLCJpbXBvcnQgeyBjb21wdXRlZFNpemUgfSBmcm9tICcuLi9vcHRpb25zL3ZhbHVlcyc7XHJcbmltcG9ydCB7IG9iakl0ZXJhdG9yIH0gZnJvbSAnLi9tZXJnZSc7XHJcblxyXG5cclxuZnVuY3Rpb24gaXNFeGlzdCh2YWx1ZSkge1xyXG5cdGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29udGV4dFZhbGlkYXRvcihjdHgsIGNvbmZpZykge1xyXG5cdGlmICghdGhpcy5pc0V4aXN0KGN0eCkpIHtcclxuXHRcdGNvbnNvbGUuZXJyb3IoJ2N0eCB1bmRlZmluZWQnKTtcclxuXHRcdHJldHVybiAtMTtcclxuXHR9XHJcblx0aWYgKCF0aGlzLmlzRXhpc3QoY29uZmlnKSkge1xyXG5cdFx0Y29uc29sZS5lcnJvcignY29uZmlnIHVuZGVmaW5lZCcpO1xyXG5cdFx0cmV0dXJuIC0xO1xyXG5cdH1cclxuXHJcblx0Ly8gVE9ETyB2YWxpZGF0ZSBjb25maWd7fVxyXG5cdG9iakl0ZXJhdG9yKGNvbmZpZyk7XHJcblxyXG5cdHJldHVybiBjdHg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdpbmdSZWN0KGN0eCkgLyogZm9yIGRlYnVnICovIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0Y2FudmFzQXJlYTogKCkgPT4ge1xyXG5cdFx0XHRjdHguc2F2ZSgpO1xyXG5cdFx0XHRjdHguc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xyXG5cdFx0XHRjdHgubGluZVdpZHRoID0gNTtcclxuXHRcdFx0Y3R4LnN0cm9rZVJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRjdHgucmVzdG9yZSgpO1xyXG5cdFx0fSxcclxuXHRcdGNoYXJ0QXJlYTogKCkgPT4ge1xyXG5cdFx0XHRjdHguc2F2ZSgpO1xyXG5cdFx0XHRjdHguc3Ryb2tlU3R5bGUgPSAncmVkJztcclxuXHRcdFx0Y3R4LmxpbmVXaWR0aCA9IDM7XHJcblx0XHRcdGN0eC5zdHJva2VSZWN0KGNvbXB1dGVkU2l6ZS5sYXlvdXQucGFkZGluZy5sZWZ0LFxyXG5cdFx0XHRcdGNvbXB1dGVkU2l6ZS5sYXlvdXQucGFkZGluZy50b3AsXHJcblx0XHRcdFx0Y29tcHV0ZWRTaXplLmxheW91dC5jaGFydFdpZHRoLFxyXG5cdFx0XHRcdGNvbXB1dGVkU2l6ZS5sYXlvdXQuY2hhcnRIZWlnaHQpO1xyXG5cdFx0XHRjdHgucmVzdG9yZSgpO1xyXG5cdFx0fSxcclxuXHRcdHlUaWNrTGFiZWw6ICgpID0+IHtcclxuXHRcdFx0Y3R4LnNhdmUoKTtcclxuXHRcdFx0Y3R4LnN0cm9rZVN0eWxlID0gJ2dyZWVuJztcclxuXHRcdFx0Y3R4LmxpbmVXaWR0aCA9IDM7XHJcblx0XHRcdGN0eC5zdHJva2VSZWN0KDMwLCAzMCwgMzAsIGNvbXB1dGVkU2l6ZS5sYXlvdXQuY2hhcnRIZWlnaHQpO1xyXG5cdFx0XHRjdHgucmVzdG9yZSgpO1xyXG5cdFx0fSxcclxuXHRcdGJvdHRvbUxhYmVsOiAoKSA9PiB7XHJcblx0XHRcdGN0eC5zYXZlKCk7XHJcblx0XHRcdGN0eC5zdHJva2VTdHlsZSA9ICdibHVlJztcclxuXHRcdFx0Y3R4LmxpbmVXaWR0aCA9IDM7XHJcblx0XHRcdGN0eC5zdHJva2VSZWN0KDAsXHJcblx0XHRcdFx0Y29tcHV0ZWRTaXplLmxheW91dC5wYWRkaW5nLnRvcCArIGNvbXB1dGVkU2l6ZS5sYXlvdXQuY2hhcnRIZWlnaHQsXHJcblx0XHRcdFx0Y29tcHV0ZWRTaXplLmxheW91dC5ib3R0b21MYWJsZS53aWR0aCxcclxuXHRcdFx0XHRjb21wdXRlZFNpemUubGF5b3V0LmJvdHRvbUxhYmxlLmhlaWdodCk7XHJcblx0XHRcdGN0eC5yZXN0b3JlKCk7XHJcblx0XHR9LFxyXG5cdH07XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBpc0V4aXN0LCBjb250ZXh0VmFsaWRhdG9yLCBkcmF3aW5nUmVjdCB9O1xyXG4iLCJpbXBvcnQgSkNoYXJ0IGZyb20gJy4vY29yZS9lbmdpbmUnO1xyXG5cclxuXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG5cdHdpbmRvdy5KQ2hhcnQgPSBKQ2hhcnQ7XHJcbn0iLCJcclxuY29uc3QgZGF0YVBvaW50cyA9IFt7XHJcblx0eFBvaW50OiBbXSxcclxuXHR5UG9pbnQ6IFtdLFxyXG59XTtcclxuXHJcbi8vIHVzYWdlIDogIGV4dGVuZCh0YXJnZXQsIG9iajEsIG9iajIpXHJcbi8qIOyLpOygnCDrsJjsmIEg7ZWgIG9wdGlvbnMgKCBsYXlvdXQtcGFkZGluZy4uLCBzY2FsZXMpICovXHJcbmNvbnN0IGNvbXB1dGVkU2l6ZSA9IHtcclxuXHRzZXQodmFsdWVzKSB7XHJcblx0XHR0aGlzLm9wdGlvbnMgPSB2YWx1ZXM7XHJcblx0fSxcclxufTtcclxuXHJcbmNvbnN0IGdsb2JhbERlZmF1bHRzID0ge1xyXG5cdGRlZmF1bHRDb2xvcjogJ3JnYmEoMCwwLDAsMC4xKScsXHJcblx0ZGVmYXVsdEZvbnRDb2xvcjogJyM2NjYnLFxyXG5cdGRlZmF1bHRGb250RmFtaWx5OiBcIidIZWx2ZXRpY2EgTmV1ZScsICdIZWx2ZXRpY2EnLCAnQXJpYWwnLCBzYW5zLXNlcmlmXCIsXHJcblx0ZGVmYXVsdEZvbnRTaXplOiAxMixcclxuXHRkZWZhdWx0Rm9udFN0eWxlOiAnbm9ybWFsJyxcclxuXHRkZWZhdWx0TGluZUhlaWdodDogMS4yLFxyXG5cdHRpdGxlRm9udFN0eWxlOiAnYm9sZCcsXHJcblx0dGl0bGVTcGFjaW5nOiAyLFxyXG5cdHRpdGxlTWFyZ2luQm90dG9tOiA2LFxyXG5cdHRpdGxlRm9udENvbG9yOiAnI2ZmZicsXHJcblx0dGl0bGVBbGlnbjogJ2xlZnQnLFxyXG5cdGdyaWRMaW5lQ29sb3I6ICdyZ2JhKDAsMCwwLDEpJyxcclxuXHRncmlkTGluZVdpZHRoOiAwLjUsXHJcblx0Y3VydmVMaW5lQ29sb3I6ICdncmVlbicsXHJcblx0ZGF0YVBvaW50Q29sb3I6ICdibHVlJyxcclxufTtcclxuXHJcblxyXG4vKiBKQ2hhcnQg7IOd7ISx7IucIGNvbmZpZ+qwgCDruYTslrTsnojsnYQg6rK97JqwIOydtCBkZWZhdWx0Q29uZmlnIOqwkuydhCDsgqzsmqkgKi9cclxuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcclxuXHRvcHRpb25zOiB7XHJcblx0XHRyZXNwb25zaXZlOiB0cnVlLFxyXG5cdFx0cmF0aW86IHtcclxuXHRcdFx0eDogMjEsXHJcblx0XHRcdHk6IDksXHJcblx0XHR9LFxyXG5cdFx0bGF5b3V0OiB7XHJcblx0XHRcdHBhZGRpbmc6IHtcclxuXHRcdFx0XHR0b3A6IDQwLjUsXHJcblx0XHRcdFx0cmlnaHQ6IDQwLFxyXG5cdFx0XHRcdGJvdHRvbTogNjAuNSxcclxuXHRcdFx0XHRsZWZ0OiA2NS41LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdHNjYWxlczoge1xyXG5cdFx0XHR5QXhlczogW3tcclxuXHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdHNjYWxlTGFiZWw6IHtcclxuXHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRncmlkTGluZXM6IHtcclxuXHRcdFx0XHRcdGNvbG9yOiBnbG9iYWxEZWZhdWx0cy5ncmlkbGluZUNvbG9yLFxyXG5cdFx0XHRcdFx0bGluZVdpZHRoOiBnbG9iYWxEZWZhdWx0cy5ncmlkTGluZVdpZHRoLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH1dLFxyXG5cdFx0XHR4QXhlczogW3tcclxuXHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdHNjYWxlTGFiZWw6IHtcclxuXHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRncmlkTGluZXM6IHtcclxuXHRcdFx0XHRcdGNvbG9yOiBnbG9iYWxEZWZhdWx0cy5ncmlkbGluZUNvbG9yLFxyXG5cdFx0XHRcdFx0bGluZVdpZHRoOiBnbG9iYWxEZWZhdWx0cy5ncmlkTGluZVdpZHRoLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH1dLFxyXG5cdFx0fSxcclxuXHR9LFxyXG4vKiAgaW5jb21wbGV0ZVxyXG4gICAgZWxlbWVudHM6e30sXHJcbiAgICBldmVudHM6IFtcclxuICAgICAgICAnbW91c2Vtb3ZlJyxcclxuICAgICAgICAnbW91c2VvdXQnLFxyXG4gICAgICAgICdjbGljaycsXHJcbiAgICAgICAgJ3RvdWNoc3RhcnQnLFxyXG4gICAgICAgICd0b3VjaG1vdmUnXHJcbiAgICBdLFxyXG4gICAgaG92ZXI6IHsgXHJcbiAgICAgICAgb25Ib3ZlcjogbnVsbCxcclxuICAgICAgICBtb2RlOiAnbmVhcmVzdCcsXHJcbiAgICAgICAgaW50ZXJzZWN0OiB0cnVlLFxyXG4gICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiA0MDBcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uQ2xpY2s6IG51bGwsXHJcbiAgICBtYWludGFpbkFzcGVjdFJhdGlvOiB0cnVlLFxyXG4gICAgcmVzcG9uc2l2ZUFuaW1hdGlvbkR1cmF0aW9uOiAwXHJcbiAgICAqL1xyXG59O1xyXG5cclxuT2JqZWN0LmZyZWV6ZShkZWZhdWx0Q29uZmlnKTtcclxuXHJcblxyXG5leHBvcnQgeyBjb21wdXRlZFNpemUsIGRhdGFQb2ludHMsIGdsb2JhbERlZmF1bHRzLCBkZWZhdWx0Q29uZmlnIH07Il0sInNvdXJjZVJvb3QiOiIifQ==