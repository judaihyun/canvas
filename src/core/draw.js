
import {computedSize} from '../options/values';
import {dataPoints, globalDefaults} from '../options/values';
import {debugConsole} from '../helper/index';
import {Helper} from '../helper/index';

export let Draw = {
    drawOptions() {
        let ctx = this.getContext();
        let width = ctx.canvas.width,
            height = ctx.canvas.height;

        let leftPadding = computedSize.options.layout.padding.left,
            rightPadding = computedSize.options.layout.padding.right,
            topPadding = computedSize.options.layout.padding.top,
            bottomPadding = computedSize.options.layout.padding.bottom,
            chartWidth = computedSize.options.layout.chartWidth,
            chartHeight = computedSize.options.layout.chartHeight;


        return {
            width, height, leftPadding,
            rightPadding, topPadding, bottomPadding,
            chartWidth, chartHeight
        }
    },
    yGridWithLabel(label) /* it depends on labels */ {
        let ctx = this.getContext();
        let options = this.drawOptions();

        let labelLength = label.length || 1;
        let stepx = options.chartWidth / (labelLength - 1);
        let height = options.chartHeight + options.topPadding;
        let width = options.chartWidth + options.leftPadding;


        dataPoints[0].xPoint.splice(0);
        ctx.save();
        ctx.strokeStyle = computedSize.options.scales.yAxes[0].gridLines.color;
        ctx.lineWidth = computedSize.options.scales.yAxes[0].gridLines.lineWidth;

        for (let x = options.leftPadding, yAxes = 0;
            x <= width; x += stepx, yAxes++) {
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
        var ctx = this.getContext();
        ctx.fillText(string, x, y);
    },
    xGridWithLabel(max, min) {
        let ctx = this.getContext();
        let options = this.drawOptions();

        let nice, niceMax, niceMin, tickStep, yTickNumber;
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


        let stepy = Math.ceil((options.chartHeight) / yTickNumber);
        let yTick = niceMax;
        let height = options.chartHeight + options.topPadding;
        let width = options.chartWidth + options.leftPadding;
        dataPoints.tickNumber = yTickNumber;
        dataPoints.niceMax = niceMax;
        dataPoints.niceMin = niceMin;
        dataPoints.tickStep = tickStep;
        dataPoints.stepy = stepy;
        debugConsole('-----------');
        debugConsole('tickStep: ' + tickStep);
        debugConsole('niceMax : ' + niceMax);
        debugConsole('niceMin : ' + niceMin);
        debugConsole('yTickNumber : ' + yTickNumber);
        debugConsole('stepy : ' + stepy);
        debugConsole('tickStep : ' + tickStep);
        debugConsole('-----------');

        ctx.save();
        ctx.strokeStyle = computedSize.options.scales.xAxes[0].gridLines.color;
        let lineWidth = computedSize.options.scales.xAxes[0].gridLines.lineWidth;


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
        let ctx = this.getContext();
        let yTick = tick.toFixed(1);
        ctx.fillText(yTick, x, y);
    },
    drawGrid(data) {
        let ctx = this.getContext();

        let fontSize = globalDefaults.defaultFontSize,
            fontStyle = fontSize + 'px ' + 'Arial';
        ctx.font = fontStyle,
            ctx.textAlign = 'center',
            ctx.textBaseline = 'middle';

        let label = data.labels;

        this.yGridWithLabel(label);

        let dataValue = data.datasets[0].data;
        let maxValue = Math.max.apply(null, dataValue);
        let minValue = Math.min.apply(null, dataValue);

        this.xGridWithLabel(maxValue, minValue);


    },
    axisTitles(scales, axesType) {
        var labelString,
            width,
            height,
            fontSize = globalDefaults.defaultFontSize,
            fontStyle = fontSize + 'px ' + 'Arial';

        var ctx = this.getContext();

        ctx.save();
        ctx.fillStyle = globalDefaults.defaultFontColor;
        ctx.lineWidth = 1;
        ctx.font = fontStyle;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (axesType === 'xAxes') // bottom legend lable
        {
            labelString = scales[0].scaleLabel.labelString;
            width = ctx.canvas.width / 2;
            ctx.fillText(labelString, width, computedSize.options.layout.bottomLable.height + fontSize + 1);
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
        let ctx = this.getContext();
        let options = this.drawOptions();
        let niceMax = dataPoints.niceMax;
        let tickStep = dataPoints.tickStep;
        let height = dataPoints.tickHeight - options.topPadding;
        let stepy = dataPoints.stepy;

        debugConsole('Draw.point()');
        debugConsole('height : ' + height);
        debugConsole('stepy : ' + stepy);

        data.forEach(function (i, index) { // data
            var data = i;
            let y;
            if (data === 0) {
                y = (niceMax / tickStep) * stepy;
            } else if (data < 0) {
                data *= -1;
                y = ((stepy / tickStep) * data) + ((niceMax / tickStep) * stepy);
            } else if (data > 0) {
                y = ((stepy / tickStep) * niceMax) - (stepy / tickStep) * data;
            }
            let x = xPoint[index];
            dataPoints[0].yPoint.push(y + options.topPadding);

            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = globalDefaults.dataPointColor;
            ctx.arc(x, y + options.topPadding, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    },
    lineCurve() {
        let ctx = this.getContext();
        ctx.save();
        ctx.beginPath();

        let length = dataPoints[0].xPoint.length;
        let xPoint = dataPoints[0].xPoint;
        let yPoint = dataPoints[0].yPoint;
        debugConsole(dataPoints[0].yPoint);
        ctx.moveTo(xPoint[0], yPoint[0]);
        ctx.strokeStyle = globalDefaults.curveLineColor;
        ctx.lineWidth = 2;
        for (let i = 0; i < length; i++) {
            debugConsole('x : ' + xPoint[i]);
            debugConsole('y : ' + yPoint[i]);
            ctx.lineTo(xPoint[i], yPoint[i]);
            ctx.stroke();
        }

        dataPoints[0].yPoint.splice(0);
        ctx.restore();
    },
    baseCanvas() {
        Draw.setContext(this.ctx);
        let opts = this.config.options;
        let data = this.config.data;

        Draw.drawGrid(data);
        for (var i = 0; i < data.datasets.length; i++) {
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
    }

}

