
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
1
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
            Helper.computeSize(ctx);
            Draw.baseCanvas(config);
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
        integerRound(_value)
        {
            this.isExist(_value);
            if(_value === 0) return 0;
            if(_value < 0)
            {
                _value *= -1;
            }
            if(_value < 10) return _value;


            if(_value % 10 !== 0)
            {
                _value = (Math.floor(_value / 10) + 1) * 10;
            }
            return _value;
        },
        yTickStepFunc(max, min)
        {
            var yTickStep = 0.2;
            var sum;
            if(!min) return yTickStep;
            else if(min === max) return yTickStep;
            else
                sum = max + min;

            if(sum == 0){
                yTickStep = 0.2;
            }else if(sum <= 1)
            {
                yTickStep = 0.1;
            }else if(sum <= 2)
            {
                yTickStep = 0.2;
            }else if(sum <= 5)
            {
                yTickStep = 0.5;
            }else if(sum <= 10)
            {
                yTickStep = 1;
            }else if(sum <= 20)
            {
                yTickStep = 2;
            }else if(sum <= 100)
            {
                yTickStep = 10;
            }else{
                yTickStep = 20;
            }
            return yTickStep;
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
            */
            

          
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
        }
    };
    
    let Draw = {
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

            let width = ctx.canvas.width,
                height = ctx.canvas.height;
            
            let leftPadding = computedOptions.layout.padding.left,
                rightPadding = computedOptions.layout.padding.right,
                topPadding = computedOptions.layout.padding.top,
                bottomPadding = computedOptions.layout.padding.bottom,
                chartWidth = computedOptions.layout.chartWidth,
                chartHeight = computedOptions.layout.chartHeight;
        
            let label = data.labels;
            
            let labelLength = label.length || 1;
            let stepy = chartWidth / (labelLength - 1); 
            
            // y
            ctx.save();
            for(let x = leftPadding, xAxes = 0; x <= chartWidth + leftPadding; x += stepy, xAxes++)
            {
                ctx.beginPath();
                ctx.moveTo(x, topPadding);
                ctx.lineTo(x, chartHeight + 20.5);
                Draw.xAxisLabel(label[xAxes], x, chartHeight + bottomPadding);
                ctx.stroke();
            }
            ctx.restore();


            let dataPoint = data.datasets[0].data;
            let maxData = Math.max.apply(null, dataPoint);
            let minData = Math.min.apply(null, dataPoint);

            maxData = Helper.integerRound(maxData);
            minData = Helper.integerRound(minData);

            let yTickStep = Helper.yTickStepFunc(maxData, minData);

            
            if(maxData < -1) maxData *= -1;
            if(minData < -1) minData *= -1;
            console.log('yTickStep : ' + yTickStep);
            console.log(maxData);
            console.log(minData);

            
            if(maxData % yTickStep !== 0)
            {
                maxData += maxData % yTickStep;
            }
            
            
            //let stepx = Math.ceil((chartHeight) / 11);  
            let yTickNumbers = Math.ceil(maxData / yTickStep) + Math.ceil(minData / yTickStep) + 1;
            console.log('yTickNumbers : '+yTickNumbers);
            let stepx = Math.ceil((chartHeight) / yTickNumbers);  
          

            let yTick = maxData;

            var count = 0;
            // x
            ctx.save();
            for(let x = topPadding; x < chartHeight + topPadding; x += stepx)
            {
                ctx.beginPath();
                ctx.lineWidth = 0.5;
                if(count === 5)
                {
                    ctx.lineWidth = 1;
                }

                Draw.yTickLabel(yTick, leftPadding - 20, x);

                ctx.moveTo(leftPadding - 10, x);
                ctx.lineTo(leftPadding + chartWidth, x);
                yTick -= yTickStep;
                count++;
                ctx.stroke();
            }
            ctx.restore();
            console.log('row count : '+count);


            Helper.drawingRect(ctx); // for debug only

        },
        yTickLabel(tick, x, y)
        {
            let ctx = this.getContext();
            let yTick = tick.toFixed(1);
            ctx.fillText(yTick, x, y);
        },
        xAxisLabel(string, x, y)
        {
            if(typeof string === 'undefined' && !string) return;
            var ctx = this.getContext();
            ctx.fillText(string, x, y);
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

            /*
            datasets.forEach((datas) => {
                Draw.drawGrid(datas);
            })
            */

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
            update : function()
            {   
                me.config.data.datasets.forEach(function(dataset) {
                    dataset.data = dataset.data.map(function() {
                        return randomScalingFactor();
                    });
                });
                Draw.clearRect();
                Draw.baseCanvas(me.config);
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
        
        Helper.computeSize(me.ctx);
        Draw.baseCanvas(me.config);

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
        var dummy = [38,20,74,-70,-68,16];
        myChart.update(dummy);
    },false);


},false);
