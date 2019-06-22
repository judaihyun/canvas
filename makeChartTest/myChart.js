
let config = 
{
    type:'line',
    data:{
        labels: [
            'January'
            ,'February'
            ,'March'
        ],
        datasets: [{
            label: 'firstLable',
            data: [
//                4, -7, 4, 4, 6, 1
//                13,-53,39,98,-72,36
                -100, 140 
            ]
        },{
            label: 'secondLable',
            data: [
                2,3
            ]
        }]
    },
    options:{
        responsive: true,
        layout: {
            padding: {
                top: 40.5,
				right: 40,
				bottom: 30.5,
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

(function(global, factory)
{
    // UMD,  if module object exists, then CommonJS
    // if define object exists, then AMD
    // others global.useModuleName = factory()
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) : 
    (factory.JChart = factory(global));

})(window, function(window){
    'use strict';

    const globalDefaults = 
    {
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
    };

    let SIZE = {
        inWidth : null,
        inHeight : null,
    }

    const defaultsOptions = 
    {
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
        layout: {
			padding: {
				top: 0.5,
				right: 0,
				bottom: 0.5,
				left: 0.5
			}
		},
        onClick: null,
        maintainAspectRatio: true,
        responsive: true,
        responsiveAnimationDuration: 0
    };

    let computedOptions = {
        layout : {
            bottomLable : { }
        }
    };

    let Helper = 
    {
        isExist(value)
        {
            if(typeof value === 'undefined' && !value) return false;
            return true;
        },
        initConfig(ctx, config)
        {
            if(!Helper.isExist(config.options))
            {
                config.options = defaultsOptions;
            }
            //TODO make computedOptions
            computedOptions = Object.assign(computedOptions, config.options );
            
            return config;
        },
        contextValidator(item, config)
        {
            if(!this.isExist(item)) return;
            if(!this.isExist(config)) return;

            // TODO  config validate
            for(let items in config)
              //  console.log(items, config[item]);
            return item;
        },
        saveDrawingSurface(ctx)
        {
            this.baseCanvasImage = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);
        },
        resizeForResponsive(ctx)
        {
            console.warn('resizeForResponsive on');
            ctx.canvas.width = window.innerWidth,
            ctx.canvas.height = (ctx.canvas.width / 21)*9;  // aspect ratio 21:9
            //console.log('window.innerHeight : ' + window.innerHeight + ', window.innerWidth : ' + window.innerWidth);
            //console.log('canvas.width : ' + ctx.canvas.width + ', canvas.height : ' + ctx.canvas.height);

            //Helper.computeSize(ctx);
            //Draw.baseCanvas(config);
        },
        computeSize(ctx)
        {
            if(computedOptions.layout.padding)
            {
                computedOptions.layout.chartWidth = ctx.canvas.width -
                                                (computedOptions.layout.padding.left +  
                                                computedOptions.layout.padding.right);
                computedOptions.layout.chartHeight = ctx.canvas.height -
                                                (computedOptions.layout.padding.top +
                                                computedOptions.layout.padding.bottom);
                computedOptions.layout.bottomLable = {
                    width : computedOptions.layout.chartWidth + computedOptions.layout.padding.left,// + computedOptions.layout.padding.right,
                    height : computedOptions.layout.padding.top +
                            computedOptions.layout.chartHeight
                };
                /*
                computedOptions.layout.xRangeAxis = {
                    width : computedOptions.layout.chartWidth,
                    height : computedOptions.
                }
                */
            
            }
            //console.log(ctx.canvas.height);
            //console.log(computedOptions.layout.chartHeight);
            //console.log(computedOptions.layout.bottomLable.height);
        },
        niceScale(min, max)
        {
            /*
                to get a 'nice number' algorithm. detail below 
            https://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
            */

            var minPoint = min;
            var maxPoint = max;
            var maxTicks = 11;
            var tickSpacing;
            var range;
            var niceMin;
            var niceMax;

            calculate();
            return {
                tickSpacing: tickSpacing,
                niceMinimum: niceMin,
                niceMaximum: niceMax
            };

            function calculate() {
                range = niceNum(maxPoint - minPoint, false);
                tickSpacing = niceNum(range / (maxTicks - 1), true);
                niceMin =
                    Math.floor(minPoint / tickSpacing) * tickSpacing;
                niceMax =
                    Math.ceil(maxPoint / tickSpacing) * tickSpacing;
            }

            function niceNum(localRange, round) {
                var exponent; /** exponent of localRange */
                var fraction; /** fractional part of localRange */
                var niceFraction; /** nice, rounded fraction */

                exponent = Math.floor(Math.log10(localRange));
                fraction = localRange / Math.pow(10, exponent);

                if (round) {
                    if (fraction < 1.5)
                        niceFraction = 1;
                    else if (fraction < 3)
                        niceFraction = 2;
                    else if (fraction < 7)
                        niceFraction = 5;
                    else
                        niceFraction = 10;
                } else {
                    if (fraction <= 1)
                        niceFraction = 1;
                    else if (fraction <= 2)
                        niceFraction = 2;
                    else if (fraction <= 5)
                        niceFraction = 5;
                    else
                        niceFraction = 10;
                }
                return niceFraction * Math.pow(10, exponent);
            }

        },
        yTickNumFunc(_max, _min, step){
            var max = _max;
            var min = _min;
            if(max < -1) max *= -1;
            if(min < -1) min *= -1;
            
            return (max + min) / step + 1;
        },
        drawingRect(ctx) // for debug only
        {
          
            (function canvasArea(){
                ctx.save();
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 5;
                ctx.strokeRect(0,
                            0,
                            ctx.canvas.width,
                            ctx.canvas.height);
                ctx.restore();
            })();
            
            (function chartArea(){

                ctx.save();
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(computedOptions.layout.padding.left,
                            computedOptions.layout.padding.top,
                            computedOptions.layout.chartWidth,
                            computedOptions.layout.chartHeight);
                            console.log('drawingRect height : ' + computedOptions.layout.chartHeight);
                ctx.restore();
            })();

            
            /*
            (function yTickLabel(){
                ctx.save();
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(30,
                            30,
                            30,
                            computedOptions.layout.chartHeight);
                ctx.restore();
            })();
            
            (function bottomLable(){
                ctx.save();
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 1;
                ctx.strokeRect(0,
                            computedOptions.layout.padding.top + computedOptions.layout.chartHeight,
                            computedOptions.layout.bottomLable.width,
                            computedOptions.layout.bottomLable.height);
                ctx.restore();
            })();
            */
        }
    };
    
    let Draw = {
        drawOptions()
        {
            let ctx = this.getContext();
            let width = ctx.canvas.width,
                height = ctx.canvas.height;
            
            let leftPadding = computedOptions.layout.padding.left,
                rightPadding = computedOptions.layout.padding.right,
                topPadding = computedOptions.layout.padding.top,
                bottomPadding = computedOptions.layout.padding.bottom,
                chartWidth = computedOptions.layout.chartWidth,
                chartHeight = computedOptions.layout.chartHeight;
                return{
                    width, height, leftPadding,
                    rightPadding, topPadding, bottomPadding,
                    chartWidth, chartHeight
                }
        },
        yGridWithLabel(label)
        {
            let ctx = this.getContext();
            let options = this.drawOptions();

            let labelLength = label.length || 1;
            let stepy = options.chartWidth / (labelLength - 1);
            
            ctx.save();
            for(let y = options.leftPadding, yAxes = 0; 
                y <= options.chartWidth + options.leftPadding; y += stepy, yAxes++)
            {
                ctx.beginPath();
                ctx.moveTo(y, options.topPadding);
                ctx.lineTo(y, options.chartHeight + 0.5);
                Draw.yAxisLabel(label[yAxes], y, options.chartHeight + options.bottomPadding - 20);
                ctx.stroke();
            }
            ctx.restore();
        },
        yAxisLabel(string, x, y)
        {
            if(typeof string === 'undefined' && !string) return;
            var ctx = this.getContext();
            ctx.fillText(string, x, y);
        },
        xGridWithLable(dataPoint, max, min)
        {
            let ctx = this.getContext();
            let options = this.drawOptions();

            let nice, niceMax, niceMin, xTickStep, xTickNumber;
            if(max !== min)
            {
                nice = Helper.niceScale(min, max);
                niceMax = nice.niceMaximum;
                niceMin = nice.niceMinimum;
                xTickStep = nice.tickSpacing;
                xTickNumber = Helper.yTickNumFunc(niceMax, niceMin, xTickStep);
            }else{
                xTickStep = 0.2;
                niceMax = max + (xTickStep * 5);
                niceMin = max - (xTickStep * 5);
                xTickNumber = 11;
            }

            console.log('tickStep: ' + xTickStep);
            console.log('niceMax : ' + niceMax);
            console.log('niceMin : ' + niceMin);
            console.log('xTickNumber : ' + xTickNumber);

            let stepx = Math.ceil((options.chartHeight) / xTickNumber);  
            let xTick = niceMax;

            ctx.save();
            for(let x = options.topPadding;
                x < options.chartHeight + options.topPadding;
                x += stepx)
            {
                ctx.beginPath();
                ctx.lineWidth = 0.5;
                if(xTick === 0)
                {
                    ctx.lineWidth = 1;
                }

                Draw.xTickLabel(xTick, options.leftPadding - 20, x);

                ctx.moveTo(options.leftPadding - 10, x);
                ctx.lineTo(options.leftPadding + options.chartWidth, x);
                xTick -= xTickStep;
                ctx.stroke();
            }
            ctx.restore();
        },
        xTickLabel(tick, x, y)
        {
            let ctx = this.getContext();
            let xTick = tick.toFixed(1);
            ctx.fillText(xTick, x, y);
        },
        drawGrid(data)
        {
            console.log(data);
            let ctx = this.getContext();

            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 0.5;

            let fontSize = globalDefaults.defaultFontSize,
            fontStyle = fontSize + 'px ' + 'Arial';
            ctx.font = fontStyle,
            ctx.textAlign = 'center',
            ctx.textBaseline = 'middle';

            let label = data.labels;
            
            Draw.yGridWithLabel(label);
            

            let dataPoint = data.datasets[0].data;
            let maxValue = Math.max.apply(null, dataPoint);
            let minValue = Math.min.apply(null, dataPoint);

            Draw.xGridWithLable(dataPoint, maxValue, minValue);

            console.log(maxValue);
            console.log(minValue);

            Helper.drawingRect(ctx); // for debug only

        },
        axisTitles(scales, axesType)
        {
            var labelString,
                fontStyle,
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

            if(axesType==='xAxes') // bottom legend lable
            {
                labelString = scales[0].scaleLabel.labelString;
                width = ctx.canvas.width / 2;
                ctx.fillText(labelString, width, computedOptions.layout.bottomLable.height + fontSize + 1);
            }else if(axesType==='yAxes'){ // left legend lable
                labelString = scales[0].scaleLabel.labelString;
                width = ctx.canvas.width;
                height = ctx.canvas.height / 2;
                ctx.translate(25, height);
                ctx.rotate(Math.PI * 1.5);
                ctx.fillText(labelString, 0, 0 );
            }

            ctx.restore();
        },
        dataPoint(data)
        {
            let ctx = this.getContext();
            let datas = data.datasets[0];
            console.log(datas.data); 

            ctx.save();
            ctx.beginPath();
            //ctx.moveTo();
            //ctx.arc();
        },
        clearRect()
        {
            let ctx = this.getContext();
            ctx.save();
            ctx.clearRect(30,30,30,computedOptions.layout.chartHeight);
        },
        baseCanvas(config)
        {
            let opts = config.options;
            let data = config.data; 

            Draw.drawGrid(data);

            Draw.dataPoint(data);

            for(let axes in opts.scales)
            {   
                if(opts.scales[axes][0].display)
                {
                    Draw.axisTitles(opts.scales[axes], axes);
                }
            }
        },
        getContext(){
            return this.ctx;
        },
        setContext(_ctx){
            this.ctx = _ctx;
        }
    }

   
    let JChart = function(ctx, config)
    {
        if(!(this instanceof JChart))
        {
            return new JChart();
        };

        let me = this;
        me.resizeEvent = new Event('resizeEvt');
        me.ctx = Helper.contextValidator(ctx, config);
        me.canvas = ctx.canvas;
        me.config = Helper.initConfig(ctx, config);
        me.initialize();
        return {
            update : function(array)
            {   
                console.log(me.config);
                Helper.computeSize(me.ctx);
                Draw.baseCanvas(me.config);
                /*
                me.config.data.datasets.forEach(function(dataset) {
                    dataset.data = dataset.data.map(function() {
                        return randomScalingFactor();
                    });
                });
                */

            },
            values : function(){
                return computedOptions;
            }
        }
    };

    JChart.prototype.initialize = function()
    {
        let me = this;
        Draw.setContext(me.ctx);
        me.bindEvent();
        return me;
    }; 

    JChart.prototype.bindEvent = function()
    {
        let me = this;
        if(config.options.responsive)
        {
            Helper.resizeForResponsive(me.ctx);
            this.bindResizeEvent();
        }
        Helper.computeSize(me.ctx);
        Draw.baseCanvas(me.config);
    }

    JChart.prototype.resizeCanvas = function(size)
    {
        //console.log(`width : ${size.detail.inWidth}, height : ${size.detail.inHeight}`);
        let me = this;
        me.canvas.width = size.detail.inWidth;
        me.canvas.height = (me.canvas.width / 21) * 9;  // aspect ratio 21:9
        Helper.computeSize(me.ctx);
        Draw.baseCanvas(this.config);
    }

    JChart.prototype.bindResizeEvent = function()
    {
        document.addEventListener('resizeEvt', this.resizeCanvas.bind(this));
        window.addEventListener('resize',function(e){
            SIZE.inWidth = e.target.innerWidth;
            SIZE.inHeight = e.target.innerHeight;
            document.dispatchEvent(new CustomEvent('resizeEvt', {detail:SIZE}));
        },false);
    }
  

    window.JChart = JChart;

    var Samples = {};
    Samples.utils = {
        srand: function(seed) {
            this._seed = seed;
        },
    
        rand: function(min, max) {
            var seed = this._seed;
            min = min === undefined ? 0 : min;
            max = max === undefined ? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            var result = min + (this._seed / 233280) * (max - min);
            return result;
        }
    }
    
    Samples.utils.srand(Date.now());
    var randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };
});


document.addEventListener('DOMContentLoaded', function()
{

    let canvas = document.getElementById('myChart');
    let ctx = canvas.getContext('2d');
    
    let myChart = new JChart(ctx, config);
    //let chart = new Chart(ctx, config);
    let value = myChart.values();
  
    document.getElementById('chartWidth').innerHTML = 'chartWidth : ' + value.layout.chartWidth;
    document.getElementById('chartHeight').innerHTML = 'chartHeight : ' + value.layout.chartHeight;
    document.getElementById('topPadding').innerHTML = 'topPadding : ' + value.layout.padding.top;
    document.getElementById('bottomPadding').innerHTML = 'bottomPadding : ' + value.layout.padding.bottom;
    document.getElementById('leftPadding').innerHTML = 'leftPadding : ' + value.layout.padding.left;
    document.getElementById('rightPadding').innerHTML = 'rightPadding : ' + value.layout.padding.right;

    document.getElementById('chartUpdate').addEventListener('click', function(){
        var dummy = [38,-20];
        config.data.datasets[0].data = dummy;
        myChart.update(dummy);
    },false);


},false);
