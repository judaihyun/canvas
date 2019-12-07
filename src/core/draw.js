
import { dataPoints, globalDefaults, computedSize } from '../options/values';
import debugConsole from '../errorControl/errorPrint';
import { Helper } from '../helper/index';

const Draw = {
	drawOptions() {
		const ctx = this.getContext();
		const { width, height } = ctx.canvas;

		const { chartWidth, chartHeight } = computedSize.options.layout,
			leftPadding = computedSize.options.layout.padding.left,
			rightPadding = computedSize.options.layout.padding.right,
			topPadding = computedSize.options.layout.padding.top,
			bottomPadding = computedSize.options.layout.padding.bottom;

		const returnObj = {
			width,
			height,
			leftPadding,
			rightPadding,
			topPadding,
			bottomPadding,
			chartWidth,
			chartHeight,
		};

		return returnObj;
	},
	yGridWithLabel(label) /* it depends on labels */ {
		const ctx = this.getContext();
		const options = this.drawOptions();

		const labelLength = label.length || 1,
			stepx = options.chartWidth / (labelLength - 1),
			height = options.chartHeight + options.topPadding,
			width = options.chartWidth + options.leftPadding;


		dataPoints[0].xPoint.splice(0);
		ctx.save();
		ctx.strokeStyle = computedSize.options.scales.yAxes[0].gridLines.color;
		ctx.lineWidth = computedSize.options.scales.yAxes[0].gridLines.lineWidth;

		for (let x = options.leftPadding, yAxes = 0;
			x <= width; x += stepx, yAxes += 1) {
			ctx.beginPath();
			ctx.moveTo(x, options.topPadding);
			ctx.lineTo(x, height);

			dataPoints[0].xPoint.push(x);
			this.bottomLabel(label[yAxes], x, options.chartHeight + options.bottomPadding);
			ctx.stroke();
		}

		ctx.restore();
	},
	bottomLabel(string, x, y) {
		if (!string) return;
		const ctx = this.getContext();
		ctx.fillText(string, x, y);
	},
	xGridWithLabel(max, min) {
		const ctx = this.getContext();
		const options = this.drawOptions();

		let nice,
			niceMax,
			niceMin,
			tickStep,
			yTickNumber;

		if (max !== min) {
			nice = Helper.niceScale(min, max);
			niceMax = nice.niceMaximum;
			niceMin = nice.niceMinimum;
			tickStep = nice.tickSpacing;
			yTickNumber = (niceMax - niceMin) / tickStep + 1;
		} else {
			tickStep = 0.2;
			niceMax = max + (tickStep * 5);
			niceMin = max - (tickStep * 5);
			yTickNumber = 11;
		}


		const stepy = Math.ceil((options.chartHeight) / yTickNumber);
		let yTick = niceMax;
		const height = options.chartHeight + options.topPadding;
		const width = options.chartWidth + options.leftPadding;
		dataPoints.tickNumber = yTickNumber;
		dataPoints.niceMax = niceMax;
		dataPoints.niceMin = niceMin;
		dataPoints.tickStep = tickStep;
		dataPoints.stepy = stepy;
		debugConsole('-----------');
		debugConsole(`tickStep: ${tickStep}`);
		debugConsole(`niceMax : ${niceMax}`);
		debugConsole(`niceMin : ${niceMin}`);
		debugConsole(`yTickNumber : ${yTickNumber}`);
		debugConsole(`stepy : ${stepy}`);
		debugConsole(`tickStep : ${tickStep}`);
		debugConsole('-----------');

		ctx.save();
		ctx.strokeStyle = computedSize.options.scales.xAxes[0].gridLines.color;

		const { lineWidth } = computedSize.options.scales.xAxes[0].gridLines;


		for (let y = options.topPadding;
			y < height;
			y += stepy) {
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
			dataPoints.tickHeight = y;
		}
		ctx.restore();
	},
	yTickLabel(tick, x, y) {
		const ctx = this.getContext();
		const yTick = tick.toFixed(1);
		ctx.fillText(yTick, x, y);
	},
	drawGrid(data) {
		const ctx = this.getContext();

		const fontSize = globalDefaults.defaultFontSize;
		const fontStyle = `${fontSize} px Arial`;

		ctx.font = fontStyle;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		const label = data.labels;

		this.yGridWithLabel(label);

		const dataValue = data.datasets[0].data;
		const maxValue = Math.max.apply(null, dataValue);
		const minValue = Math.min.apply(null, dataValue);

		this.xGridWithLabel(maxValue, minValue);
	},
	axisTitles(scales, axesType) {
		let labelString,
			width,
			height;

		const fontSize = globalDefaults.defaultFontSize,
			fontStyle = `${fontSize} px Arial`;

		const ctx = this.getContext();

		ctx.save();
		ctx.fillStyle = globalDefaults.defaultFontColor;
		ctx.lineWidth = 1;
		ctx.font = fontStyle;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		if (axesType === 'xAxes') { // bottom legend lable
			labelString = scales[0].scaleLabel.labelString;
			width = ctx.canvas.width / 2;
			ctx.fillText(labelString, 
				width, 
				computedSize.options.layout.bottomLable.height + fontSize + 1);
		} else if (axesType === 'yAxes') { // left legend lable
			labelString = scales[0].scaleLabel.labelString;
			width = ctx.canvas.width;
			height = ctx.canvas.height / 2;
			ctx.translate(25, height);
			ctx.rotate(Math.PI * 1.5);
			ctx.fillText(labelString, 0, 0);
		}

		ctx.restore();
	},
	linePoint(data, xPoint) {
		const ctx = this.getContext();
		const options = this.drawOptions();
		const { niceMax, tickStep, stepy } = dataPoints;
		const height = dataPoints.tickHeight - options.topPadding;

		debugConsole('Draw.point()');
		debugConsole(`height ${height}`);
		debugConsole(`stepy : ${stepy}`);

		data.forEach((i, index) => { // data
			let datas = i;
			let y;
			if (datas === 0) {
				y = (niceMax / tickStep) * stepy;
			} else if (datas < 0) {
				datas *= -1;
				y = ((stepy / tickStep) * datas) + ((niceMax / tickStep) * stepy);
			} else if (datas > 0) {
				y = ((stepy / tickStep) * niceMax) - (stepy / tickStep) * datas;
			}
			const x = xPoint[index];
			dataPoints[0].yPoint.push(y + options.topPadding);

			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = globalDefaults.datasPointColor;
			ctx.arc(x, y + options.topPadding, 3, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		});
	},
	lineCurve() {
		const ctx = this.getContext();
		ctx.save();
		ctx.beginPath();

		const { length } = dataPoints[0].xPoint;
		const { xPoint, yPoint } = dataPoints[0];

		debugConsole(dataPoints[0].yPoint);
		ctx.moveTo(xPoint[0], yPoint[0]);
		ctx.strokeStyle = globalDefaults.curveLineColor;
		ctx.lineWidth = 2;
		for (let i = 0; i < length; i += 1) {
			ctx.lineTo(xPoint[i], yPoint[i]);
			ctx.stroke();
		}

		dataPoints[0].yPoint.splice(0);
		ctx.restore();
	},
	baseCanvas() {
		Draw.setContext(this.ctx);
		const opts = this.config.options;
		const { data } = this.config;

		Draw.drawGrid(data);
		for (let i = 0; i < data.datasets.length; i++) {
			Draw.linePoint(data.datasets[i].data, dataPoints[0].xPoint);
		}

		/*
        data.datasets.forEach(function(i, index){
            this.linePoint(i.data, dataPoints[0].xPoint);
        });
        */

		Draw.lineCurve();

		for (let axes in opts.scales) {
			if (opts.scales[axes][0].display) {
				Draw.axisTitles(opts.scales[axes], axes);
			}
		}
	},
	getContext() {
		return this.ctx;
	},
	setContext(_ctx) {
		this.ctx = _ctx;
	},

};

export default Draw;