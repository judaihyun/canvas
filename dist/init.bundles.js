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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/init.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvasGuideForDevelop.js":
/*!**************************************!*\
  !*** ./src/canvasGuideForDevelop.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Guide = Guide || {};\n\nGuide = function Guide(ctx, canvas) {\n  var me = this;\n  var drawingSurfaceImageData, posEl, drawWidthEl;\n  ctx, canvas;\n  var mousePos = {};\n  var dragging = false;\n\n  function saveDrawingSurface() {\n    drawingSurfaceImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);\n  }\n\n  function restoreDrawingSurface() {\n    ctx.putImageData(drawingSurfaceImageData, 0, 0);\n  }\n\n  function windowToCanvas(x, y) {\n    var bbox = canvas.getBoundingClientRect();\n    return {\n      x: Math.floor(x - bbox.left),\n      y: y - bbox.top * (canvas.height / bbox.height)\n    };\n  }\n\n  function setDrawWidthEl(drawWidth) {\n    me.drawWidthEl = drawWidth;\n  }\n\n  function setPosEl(pos) {\n    me.posEl = pos;\n  }\n\n  function drawVerticalLine(x) {\n    ctx.beginPath();\n    ctx.moveTo(x + 0.5, 0);\n    ctx.lineTo(x + 0.5, ctx.canvas.height);\n    ctx.stroke();\n  }\n\n  function drawHorizontalLine(y) {\n    ctx.beginPath();\n    ctx.moveTo(0, y + 0.5);\n    ctx.lineTo(ctx.canvas.width, y + 0.5);\n    ctx.stroke();\n  }\n\n  canvas.addEventListener('mousedown', function (e) {\n    var inLoc = windowToCanvas(e.clientX, e.clientY);\n    saveDrawingSurface();\n\n    if (e.ctrlKey) {\n      mousePos.x = inLoc.x;\n      mousePos.y = inLoc.y;\n      dragging = true;\n    }\n\n    ctx.strokeStyle = 'red';\n    drawVerticalLine(inLoc.x);\n    drawHorizontalLine(inLoc.y);\n    ctx.restore();\n    me.posEl.innerText = '[' + e.clientX + '] , [' + e.clientY + ']';\n  }, false);\n  canvas.addEventListener('mousemove', function (e) {\n    if (dragging) {\n      restoreDrawingSurface();\n      loc = windowToCanvas(e.clientX, e.clientY);\n      ctx.save();\n      ctx.strokeStyle = 'green';\n      ctx.lineWidth = 2;\n      ctx.beginPath();\n      ctx.moveTo(loc.x, loc.y);\n      ctx.lineTo(mousePos.x, mousePos.y);\n      ctx.stroke();\n      ctx.restore();\n      me.posEl.innerText = loc.x + ',' + loc.y;\n      var string = 'lineLength : ';\n      me.drawWidthEl.innerText = string + 'x(' + (loc.x - mousePos.x) + '), y(' + (loc.y - mousePos.y) + ')';\n    }\n  }, false);\n  canvas.addEventListener('mouseup', function (e) {\n    restoreDrawingSurface();\n    dragging = false;\n  }, false);\n  return {\n    setDrawWidthEl: setDrawWidthEl,\n    setPosEl: setPosEl\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Guide);\n\n//# sourceURL=webpack:///./src/canvasGuideForDevelop.js?");

/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _canvasGuideForDevelop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvasGuideForDevelop */ \"./src/canvasGuideForDevelop.js\");\n\nvar config = {\n  type: 'origin',\n  data: {\n    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],\n    datasets: [{\n      label: 'firstLable',\n      data: [-50, 1.5, -30]\n    }\n    /*,{\r\n    label: 'secondLable',\r\n    data:[-20]\r\n    }*/\n    ]\n  },\n  options: {\n    ratio: {},\n    layout: {\n      padding: {\n        top: 40.5,\n        right: 40,\n        bottom: 60.5,\n        left: 65.5\n      }\n    },\n    scales: {\n      xAxes: [{\n        display: true,\n        scaleLabel: {\n          display: true,\n          labelString: 'Month'\n        }\n      }],\n      yAxes: [{\n        display: true,\n        scaleLabel: {\n          display: true,\n          labelString: 'Value'\n        }\n      }]\n    }\n  }\n};\ndocument.addEventListener('DOMContentLoaded', function () {\n  Samples.utils.srand(Date.now());\n\n  var randomScalingFactor = function randomScalingFactor() {\n    return Math.round(Samples.utils.rand(-100, 100));\n  };\n\n  var posDiv = document.getElementById('pos');\n  var canvas = document.getElementById('myChart');\n  var drawWidth = document.getElementById('drawingWidth');\n  var ctx = canvas.getContext('2d');\n  var guide = new _canvasGuideForDevelop__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, canvas);\n  guide.setDrawWidthEl(drawWidth);\n  guide.setPosEl(posDiv);\n  var myChart = new JChart(ctx, config);\n  myChart.setLog(false);\n  var value = myChart.getCurrentOpt();\n  updateEl();\n  window.addEventListener('resize', function () {\n    value = myChart.getCurrentOpt();\n    updateEl();\n  }, false);\n\n  function updateEl() {\n    document.getElementById('chartWidth').innerHTML = 'chartWidth : ' + value.layout.chartWidth;\n    document.getElementById('chartHeight').innerHTML = 'chartHeight : ' + value.layout.chartHeight;\n    document.getElementById('topPadding').innerHTML = 'topPadding : ' + value.layout.padding.top;\n    document.getElementById('bottomPadding').innerHTML = 'bottomPadding : ' + value.layout.padding.bottom;\n    document.getElementById('leftPadding').innerHTML = 'leftPadding : ' + value.layout.padding.left;\n    document.getElementById('rightPadding').innerHTML = 'rightPadding : ' + value.layout.padding.right;\n    document.getElementById('responsive').innerHTML = 'responsive : ' + value.responsive;\n  }\n\n  ;\n  document.getElementById('chartUpdate').addEventListener('click', function () {\n    var dummy = [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()];\n    console.warn('dummy : ' + dummy);\n    config.data.datasets[0].data = dummy;\n    console.log(config);\n    myChart.update();\n  }, false);\n  document.getElementById('changeRatio').addEventListener('click', function () {\n    var ratioX = document.getElementById('ratioX').value || 21;\n    var ratioY = document.getElementById('ratioY').value || 9;\n    config.options.ratio.x = ratioX;\n    config.options.ratio.y = ratioY;\n    myChart.changeRatio();\n    document.getElementsByClassName('currentRatio')[0].innerHTML = ratioX + ' : ' + ratioY;\n  }, false);\n  document.getElementById('showBtn').addEventListener('click', function () {\n    var selected = document.getElementById('areaShow').selectedIndex;\n\n    switch (selected) {\n      case 0:\n        myChart.areaShow().canvasArea();\n        break;\n\n      case 1:\n        myChart.areaShow().chartArea();\n        break;\n\n      case 2:\n        myChart.areaShow().bottomLabel();\n        break;\n\n      case 3:\n        myChart.areaShow().yTickLabel();\n        break;\n    }\n  }, false);\n}, false);\n\n//# sourceURL=webpack:///./src/init.js?");

/***/ })

/******/ });