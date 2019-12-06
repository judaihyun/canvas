import { computedSize } from '../options/values';
import { Helper, DEBUG_MODE, debugConsole } from '../helper/index';
import Draw from './draw';


const JChart = function (ctx, config) {
	if (!(this instanceof JChart)) {
		return new JChart(ctx, config);
	}


	this.initialize(ctx, config);

	this.update = function () {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		Draw.baseCanvas.call(this);
	};
	this.changeRatio = function () {
		Helper.computeSize(this.ctx);
		this.baseDrawing();
	};
	this.getCurrentOpt = function () {
		return computedSize.options;
	};
	this.setLog = function (value) {
		if (Helper.isExist(value)) {
			DEBUG_MODE = value;
		}
	};
	this.areaShow = function () {
		return Helper.drawingRect(ctx);
	};
	return this;
};

JChart.prototype.initialize = function (ctx, config) {
	this.ctx = Helper.contextValidator(ctx, config);
	if (this.ctx < 0) return -1;

	this.config = Helper.mergeConfig(config);

	Draw.setContext(ctx);

	this.bindEvent();

	this.baseDrawing();
};

JChart.prototype.bindEvent = function () {
	const responsive = this.config.options.responsive || false;
	if (responsive) {
		this.bindResizeEvent();
	}
};

JChart.prototype.baseDrawing = function () {
	Helper.ratioCalculator(this.ctx);

	Helper.computeSize(this.ctx);
	Draw.baseCanvas.call(this);
};

JChart.prototype.bindResizeEvent = function () {
	console.warn('responsive mode : on');

	window.addEventListener('resize', () => {
		this.resizingCanvas();
	});
};

JChart.prototype.resizingCanvas = function () {
	Helper.ratioCalculator(this.ctx);

	debugConsole(`resize width=${this.ctx.canvas.width} height=${this.ctx.canvas.height}`);

	Helper.computeSize(this.ctx);
	Draw.baseCanvas.call(this);
};


export default JChart;