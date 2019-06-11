
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
                5,1,4
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
            (function xRangeAxis(){
                ctx.save();
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(computedOptions.layout.padding.left,
                            computedOptions.layout.padding.top,
                            computedOptions.layout.chartWidth,
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
                chartHeight = computedOptions.layout.chartHeight,
                stepx = Math.ceil((chartHeight) / 11);  // 올림
            let dummy = 0;

        
            let label = data.labels;
            
            let labelLength = label.length || 1;
            let stepy = chartWidth / (labelLength - 1); 
            
            /*
                x -> x
                0 -> 1
                1 -> 2
                2 -> 3
            */

            console.log('stepx : ' + stepx);
            console.log('stepy : ' + stepy);
            console.log('chartWidth : ' + chartWidth);

            // y
            ctx.save();
            for(let i = leftPadding, xAxes = 0; i <= chartWidth + leftPadding; i += stepy, xAxes++)
            {
                ctx.beginPath();
                ctx.moveTo(i, topPadding);
                ctx.lineTo(i, chartHeight + 20.5);
                Draw.xRangeAxis(label[xAxes], i, chartHeight + bottomPadding);
                ctx.stroke();
            }
            ctx.restore();

            let yTick = 1.0;
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
                yTick = yTick.toFixed(1);
                ctx.fillText(yTick, leftPadding - 20, x);

                ctx.moveTo(leftPadding - 10, x);
                ctx.lineTo(leftPadding + chartWidth, x);
                yTick -= 0.2;
                count++;
                ctx.stroke();
            }
            ctx.restore();
            console.log('row count : '+count);


            Helper.drawingRect(ctx);

        },
        xRangeAxis(string, x, y)
        {
            if(typeof string === 'undefined' && !string) return;
            var ctx = this.getContext();
            ctx.fillText(string, x, y);
        },
        axisTitle(scales, axesType)
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
        rangeAxis()
        {
            let ctx = this.getContext();


        },
        baseCanvas(config)
        {
            let opts = config.options;
            let data = config.data; 
            Draw.drawGrid(data);
            /*
            datasets.forEach((datas) => {
                Draw.drawGrid(datas);
            })
            */

            for(let axes in opts.scales)
            {   
                if(opts.scales[axes][0].display)
                {
                    Draw.axisTitle(opts.scales[axes], axes);
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
        let me = this;
        me.resizeEvent = new Event('resizeEvt');
        me.ctx = Helper.contextValidator(ctx, config);
        me.canvas = ctx.canvas;
        me.config = Helper.initConfig(ctx, config);
        me.initialize();
        return {
            update : function()
            {   
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
        myChart.update();
    },false);


},false);
