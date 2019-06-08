
let config = 
{
    type:'line',
    data:{
        datasets: [{
            backgroundColor: [
            ],
            borderColor: [
            ],
            borderWidth: 1
        }]
    },
    options:{
        responsive: true,
        layout: {
            padding: {
                top: 40.5,
				right: 0,
				bottom: 40.5,
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
    // UMD,  if exports, moudle object exists, then CommonJS
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
            for(var items in config)
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
                    width : computedOptions.layout.chartWidth,
                    height : computedOptions.layout.padding.top +
                            computedOptions.layout.chartHeight
                }
            
            }
            //console.log(ctx.canvas.height);
            //console.log(computedOptions.layout.chartHeight);
            //console.log(computedOptions.layout.bottomLable.height);
        },
        drawingRect(ctx) // for debug only
        {
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(computedOptions.layout.padding.left,
                            computedOptions.layout.padding.top,
                            computedOptions.layout.chartWidth,
                            computedOptions.layout.chartHeight);
                            console.log('drawingRect height : ' + computedOptions.layout.chartHeight);
            ctx.restore();
        }
    };
    
    let Draw = {
        drawGrid()
        {
            var ctx = this.getContext();
            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 0.5;

            var fontSize = globalDefaults.defaultFontSize,
            fontStyle = fontSize + 'px ' + 'Arial';
            ctx.font = fontStyle,
            ctx.textAlign = 'center',
            ctx.textBaseline = 'middle';
            

            var width = ctx.canvas.width,
                height = ctx.canvas.height;
            
            
            var leftPadding = computedOptions.layout.padding.left,
                topPadding = computedOptions.layout.padding.top,
                bottomPadding = computedOptions.layout.padding.bottom,
                chartWidth = computedOptions.layout.chartWidth,
                chartHeight = computedOptions.layout.chartHeight,
                stepx = Math.ceil((chartHeight) / 11);  // 올림
            var dummy = 0;
            var stepy = chartWidth / 2;

            console.log('stepx : ' + stepx);
            console.log('stepy : ' + stepy);
            console.log(chartHeight);

            ctx.save();
            // y
            for(let i = leftPadding; i < chartWidth; i += stepy)
            {
                ctx.beginPath();
                ctx.moveTo(i, topPadding);
                ctx.lineTo(i, chartHeight);
                ctx.stroke();
            }

            var text = 1.0;
        
            // x
            var count = 0;
            for(let i = topPadding; i < chartHeight + topPadding; i += stepx)
            {
                ctx.beginPath();
                ctx.lineWidth = 0.5;
                console.log('i : ' + i);
                if(count === 5)
                {
                    ctx.lineWidth = 1;
                }
                text = text.toFixed(1);
                ctx.fillText(text, leftPadding - 20, i);
                ctx.moveTo(leftPadding - 10, i);
                ctx.lineTo(width - 40, i);
                text -= 0.2;
                count++;
                ctx.stroke();
            }
            console.log('row count : '+count);

            ctx.restore();

            Helper.drawingRect(ctx);

        },
        axesLable(scales, axesType)
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

            if(axesType==='xAxes')
            {
                labelString = scales[0].scaleLabel.labelString;
                width = ctx.canvas.width / 2;
                ctx.fillText(labelString, width, computedOptions.layout.bottomLable.height + fontSize + 1);
            }else if(axesType==='yAxes'){
                labelString = scales[0].scaleLabel.labelString;
                width = ctx.canvas.width;
                height = ctx.canvas.height / 2;
                ctx.translate(25, height);
                ctx.rotate(Math.PI * 1.5);
                ctx.fillText(labelString, 0, 0 );
            }

            ctx.restore();
        },
        baseCanvas(config)
        {
            var opts = config.options;

            Draw.drawGrid();

            for(var axes in opts.scales)
            {   
                if(opts.scales[axes][0].display)
                {
                    Draw.axesLable(opts.scales[axes], axes);
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
        this.resizeEvent = new Event('resizeEvt');
        this.ctx = Helper.contextValidator(ctx, config);
        this.canvas = ctx.canvas;
        this.config = Helper.initConfig(ctx, config);
        this.initialize();
        return {
            update : function()
            {   
            },
            values : function(){
                return computedOptions;
            }
        }
    };

    JChart.prototype.initialize = function()
    {
        var me = this;
        Draw.setContext(me.ctx);
        
        Helper.computeSize(me.ctx);
        Draw.baseCanvas(me.config);

        me.bindEvent();
        return me;
    }; 

    JChart.prototype.bindEvent = function()
    {
        var me = this;
        if(config.options.responsive)
        {
            Helper.resizeForResponsive(me.ctx);
            this.bindResizeEvent();
        }
    }

    JChart.prototype.resizeCanvas = function(size)
    {
        //console.log(`width : ${size.detail.inWidth}, height : ${size.detail.inHeight}`);
        var me = this;
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
    var value = myChart.values();
  
    document.getElementById('chartWidth').innerHTML = 'chartWidth : ' + value.layout.chartWidth;
    document.getElementById('chartHeight').innerHTML = 'chartHeight : ' + value.layout.chartHeight;
    document.getElementById('topPadding').innerHTML = 'topPadding : ' + value.layout.padding.top;
    document.getElementById('bottomPadding').innerHTML = 'bottomPadding : ' + value.layout.padding.bottom;
    document.getElementById('leftPadding').innerHTML = 'leftPadding : ' + value.layout.padding.left;
    document.getElementById('rightPadding').innerHTML = 'rightPadding : ' + value.layout.padding.right;


},false);
