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

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

var config = {
  type: 'origin',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'firstLable',
      data: [-50, 1.5, -30]
    }, {
      label: 'secondLable',
      data: [-20]
    }]
  },
  options: {
    ratio: {},
    layout: {
      padding: {
        top: 40.5,
        right: 40,
        bottom: 60.5,
        left: 65.5
      }
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  }
};
document.addEventListener('DOMContentLoaded', function () {
  Samples.utils.srand(Date.now());

  var randomScalingFactor = function randomScalingFactor() {
    return Math.round(Samples.utils.rand(-100, 100));
  };

  var posDiv = document.getElementById('pos');
  var canvas = document.getElementById('myChart');
  var drawWidth = document.getElementById('drawingWidth');
  var ctx = canvas.getContext('2d');
  var guide = new Guide(ctx, canvas);
  guide.setDrawWidthEl(drawWidth);
  guide.setPosEl(posDiv);
  var myChart = new JChart(ctx, config);
  myChart.setLog(false);
  var value = myChart.getCurrentOpt();

  function updateEl() {
    document.getElementById('chartWidth').innerHTML = "chartWidth : ".concat(value.layout.chartWidth);
    document.getElementById('chartHeight').innerHTML = "chartHeight : ".concat(value.layout.chartHeight);
    document.getElementById('topPadding').innerHTML = "topPadding : ".concat(value.layout.padding.top);
    document.getElementById('bottomPadding').innerHTML = "bottomPadding : ".concat(value.layout.padding.bottom);
    document.getElementById('leftPadding').innerHTML = "leftPadding : ".concat(value.layout.padding.left);
    document.getElementById('rightPadding').innerHTML = "rightPadding : ".concat(value.layout.padding.right);
    document.getElementById('responsive').innerHTML = "responsive : ".concat(value.responsive);
  }

  updateEl();
  window.addEventListener('resize', function () {
    value = myChart.getCurrentOpt();
    updateEl();
  }, false);
  document.getElementById('chartUpdate').addEventListener('click', function () {
    var dummy = [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()];
    console.warn("dummy : ".concat(dummy));
    config.data.datasets[0].data = dummy;
    console.log(config);
    myChart.update();
  }, false);
  document.getElementById('changeRatio').addEventListener('click', function () {
    var ratioX = document.getElementById('ratioX').value || 21;
    var ratioY = document.getElementById('ratioY').value || 9;
    config.options.ratio.x = ratioX;
    config.options.ratio.y = ratioY;
    myChart.changeRatio();
    document.getElementsByClassName('currentRatio')[0].innerHTML = "".concat(ratioX, " : ").concat(ratioY);
  }, false);
  document.getElementById('showBtn').addEventListener('click', function () {
    var selected = document.getElementById('areaShow').selectedIndex;

    switch (selected) {
      case 0:
        myChart.areaShow().canvasArea();
        break;

      case 1:
        myChart.areaShow().chartArea();
        break;

      case 2:
        myChart.areaShow().bottomLabel();
        break;

      case 3:
        myChart.areaShow().yTickLabel();
        break;

      default:
        break;
    }
  }, false);
}, false);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luaXQuanMiXSwibmFtZXMiOlsiY29uZmlnIiwidHlwZSIsImRhdGEiLCJsYWJlbHMiLCJkYXRhc2V0cyIsImxhYmVsIiwib3B0aW9ucyIsInJhdGlvIiwibGF5b3V0IiwicGFkZGluZyIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsInNjYWxlcyIsInhBeGVzIiwiZGlzcGxheSIsInNjYWxlTGFiZWwiLCJsYWJlbFN0cmluZyIsInlBeGVzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiU2FtcGxlcyIsInV0aWxzIiwic3JhbmQiLCJEYXRlIiwibm93IiwicmFuZG9tU2NhbGluZ0ZhY3RvciIsIk1hdGgiLCJyb3VuZCIsInJhbmQiLCJwb3NEaXYiLCJnZXRFbGVtZW50QnlJZCIsImNhbnZhcyIsImRyYXdXaWR0aCIsImN0eCIsImdldENvbnRleHQiLCJndWlkZSIsIkd1aWRlIiwic2V0RHJhd1dpZHRoRWwiLCJzZXRQb3NFbCIsIm15Q2hhcnQiLCJKQ2hhcnQiLCJzZXRMb2ciLCJ2YWx1ZSIsImdldEN1cnJlbnRPcHQiLCJ1cGRhdGVFbCIsImlubmVySFRNTCIsImNoYXJ0V2lkdGgiLCJjaGFydEhlaWdodCIsInJlc3BvbnNpdmUiLCJ3aW5kb3ciLCJkdW1teSIsImNvbnNvbGUiLCJ3YXJuIiwibG9nIiwidXBkYXRlIiwicmF0aW9YIiwicmF0aW9ZIiwieCIsInkiLCJjaGFuZ2VSYXRpbyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJzZWxlY3RlZCIsInNlbGVjdGVkSW5kZXgiLCJhcmVhU2hvdyIsImNhbnZhc0FyZWEiLCJjaGFydEFyZWEiLCJib3R0b21MYWJlbCIsInlUaWNrTGFiZWwiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7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QUF4QixFQUFtQ1gsZ0JBQW5DLENBQW9ELE9BQXBELEVBQTZELFlBQU07QUFDbEUsUUFBTTBDLFFBQVEsR0FBRzNDLFFBQVEsQ0FBQ1ksY0FBVCxDQUF3QixVQUF4QixFQUFvQ2dDLGFBQXJEOztBQUNBLFlBQVFELFFBQVI7QUFDQSxXQUFLLENBQUw7QUFDQ3RCLGVBQU8sQ0FBQ3dCLFFBQVIsR0FBbUJDLFVBQW5CO0FBQ0E7O0FBQ0QsV0FBSyxDQUFMO0FBQ0N6QixlQUFPLENBQUN3QixRQUFSLEdBQW1CRSxTQUFuQjtBQUNBOztBQUNELFdBQUssQ0FBTDtBQUNDMUIsZUFBTyxDQUFDd0IsUUFBUixHQUFtQkcsV0FBbkI7QUFDQTs7QUFDRCxXQUFLLENBQUw7QUFDQzNCLGVBQU8sQ0FBQ3dCLFFBQVIsR0FBbUJJLFVBQW5CO0FBQ0E7O0FBQ0Q7QUFDQztBQWREO0FBZ0JBLEdBbEJELEVBa0JHLEtBbEJIO0FBbUJBLENBN0VELEVBNkVHLEtBN0VILEUiLCJmaWxlIjoiaW5pdC5idW5kbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5pdC5qc1wiKTtcbiIsIlxyXG5jb25zdCBjb25maWcgPSB7XHJcblx0dHlwZTogJ29yaWdpbicsXHJcblx0ZGF0YToge1xyXG5cdFx0bGFiZWxzOiBbXHJcblx0XHRcdCdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5J1xyXG5cdFx0XSxcclxuXHRcdGRhdGFzZXRzOiBbe1xyXG5cdFx0XHRsYWJlbDogJ2ZpcnN0TGFibGUnLFxyXG5cdFx0XHRkYXRhOiBbXHJcblx0XHRcdFx0LTUwLCAxLjUsIC0zMCxcclxuXHRcdFx0XSxcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdGxhYmVsOiAnc2Vjb25kTGFibGUnLFxyXG5cdFx0XHRkYXRhOiBbLTIwXSxcclxuXHRcdH0sIFxyXG5cdFx0XSxcclxuXHR9LFxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHJhdGlvOiB7fSxcclxuXHRcdGxheW91dDoge1xyXG5cdFx0XHRwYWRkaW5nOiB7XHJcblx0XHRcdFx0dG9wOiA0MC41LFxyXG5cdFx0XHRcdHJpZ2h0OiA0MCxcclxuXHRcdFx0XHRib3R0b206IDYwLjUsXHJcblx0XHRcdFx0bGVmdDogNjUuNSxcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRzY2FsZXM6IHtcclxuXHRcdFx0eEF4ZXM6IFt7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHRzY2FsZUxhYmVsOiB7XHJcblx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdFx0bGFiZWxTdHJpbmc6ICdNb250aCcsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fV0sXHJcblx0XHRcdHlBeGVzOiBbe1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0c2NhbGVMYWJlbDoge1xyXG5cdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHRcdGxhYmVsU3RyaW5nOiAnVmFsdWUnLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH1dLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59O1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcblx0U2FtcGxlcy51dGlscy5zcmFuZChEYXRlLm5vdygpKTtcclxuXHRjb25zdCByYW5kb21TY2FsaW5nRmFjdG9yID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIE1hdGgucm91bmQoU2FtcGxlcy51dGlscy5yYW5kKC0xMDAsIDEwMCkpO1xyXG5cdH07XHJcblxyXG5cdGNvbnN0IHBvc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3MnKTtcclxuXHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDaGFydCcpO1xyXG5cdGNvbnN0IGRyYXdXaWR0aCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcmF3aW5nV2lkdGgnKTtcclxuXHRjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcblxyXG5cdGNvbnN0IGd1aWRlID0gbmV3IEd1aWRlKGN0eCwgY2FudmFzKTtcclxuXHRndWlkZS5zZXREcmF3V2lkdGhFbChkcmF3V2lkdGgpO1xyXG5cdGd1aWRlLnNldFBvc0VsKHBvc0Rpdik7XHJcblxyXG5cdGNvbnN0IG15Q2hhcnQgPSBuZXcgSkNoYXJ0KGN0eCwgY29uZmlnKTtcclxuXHRteUNoYXJ0LnNldExvZyhmYWxzZSk7XHJcblx0bGV0IHZhbHVlID0gbXlDaGFydC5nZXRDdXJyZW50T3B0KCk7XHJcblxyXG5cclxuXHRmdW5jdGlvbiB1cGRhdGVFbCgpIHtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFydFdpZHRoJykuaW5uZXJIVE1MID0gYGNoYXJ0V2lkdGggOiAke3ZhbHVlLmxheW91dC5jaGFydFdpZHRofWA7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcnRIZWlnaHQnKS5pbm5lckhUTUwgPSBgY2hhcnRIZWlnaHQgOiAke3ZhbHVlLmxheW91dC5jaGFydEhlaWdodH1gO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcFBhZGRpbmcnKS5pbm5lckhUTUwgPSBgdG9wUGFkZGluZyA6ICR7dmFsdWUubGF5b3V0LnBhZGRpbmcudG9wfWA7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm90dG9tUGFkZGluZycpLmlubmVySFRNTCA9IGBib3R0b21QYWRkaW5nIDogJHt2YWx1ZS5sYXlvdXQucGFkZGluZy5ib3R0b219YDtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZWZ0UGFkZGluZycpLmlubmVySFRNTCA9IGBsZWZ0UGFkZGluZyA6ICR7dmFsdWUubGF5b3V0LnBhZGRpbmcubGVmdH1gO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpZ2h0UGFkZGluZycpLmlubmVySFRNTCA9IGByaWdodFBhZGRpbmcgOiAke3ZhbHVlLmxheW91dC5wYWRkaW5nLnJpZ2h0fWA7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzcG9uc2l2ZScpLmlubmVySFRNTCA9IGByZXNwb25zaXZlIDogJHt2YWx1ZS5yZXNwb25zaXZlfWA7XHJcblx0fVxyXG5cclxuXHR1cGRhdGVFbCgpO1xyXG5cclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG5cdFx0dmFsdWUgPSBteUNoYXJ0LmdldEN1cnJlbnRPcHQoKTtcclxuXHRcdHVwZGF0ZUVsKCk7XHJcblx0fSwgZmFsc2UpO1xyXG5cclxuXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYXJ0VXBkYXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRjb25zdCBkdW1teSA9IFtyYW5kb21TY2FsaW5nRmFjdG9yKCksIHJhbmRvbVNjYWxpbmdGYWN0b3IoKSwgcmFuZG9tU2NhbGluZ0ZhY3RvcigpLFxyXG5cdFx0XHRyYW5kb21TY2FsaW5nRmFjdG9yKCksIHJhbmRvbVNjYWxpbmdGYWN0b3IoKV07XHJcblx0XHRjb25zb2xlLndhcm4oYGR1bW15IDogJHtkdW1teX1gKTtcclxuXHRcdGNvbmZpZy5kYXRhLmRhdGFzZXRzWzBdLmRhdGEgPSBkdW1teTtcclxuXHRcdGNvbnNvbGUubG9nKGNvbmZpZyk7XHJcblx0XHRteUNoYXJ0LnVwZGF0ZSgpO1xyXG5cdH0sIGZhbHNlKTtcclxuXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYW5nZVJhdGlvJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRjb25zdCByYXRpb1ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmF0aW9YJykudmFsdWUgfHwgMjE7XHJcblx0XHRjb25zdCByYXRpb1kgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmF0aW9ZJykudmFsdWUgfHwgOTtcclxuXHRcdGNvbmZpZy5vcHRpb25zLnJhdGlvLnggPSByYXRpb1g7XHJcblx0XHRjb25maWcub3B0aW9ucy5yYXRpby55ID0gcmF0aW9ZO1xyXG5cclxuXHRcdG15Q2hhcnQuY2hhbmdlUmF0aW8oKTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2N1cnJlbnRSYXRpbycpWzBdLmlubmVySFRNTCA9IGAke3JhdGlvWH0gOiAke3JhdGlvWX1gO1xyXG5cdH0sIGZhbHNlKTtcclxuXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3dCdG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRcdGNvbnN0IHNlbGVjdGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FyZWFTaG93Jykuc2VsZWN0ZWRJbmRleDtcclxuXHRcdHN3aXRjaCAoc2VsZWN0ZWQpIHtcclxuXHRcdGNhc2UgMDpcclxuXHRcdFx0bXlDaGFydC5hcmVhU2hvdygpLmNhbnZhc0FyZWEoKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIDE6XHJcblx0XHRcdG15Q2hhcnQuYXJlYVNob3coKS5jaGFydEFyZWEoKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIDI6XHJcblx0XHRcdG15Q2hhcnQuYXJlYVNob3coKS5ib3R0b21MYWJlbCgpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgMzpcclxuXHRcdFx0bXlDaGFydC5hcmVhU2hvdygpLnlUaWNrTGFiZWwoKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9LCBmYWxzZSk7XHJcbn0sIGZhbHNlKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==