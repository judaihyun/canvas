
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
        responsive: false
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
        defaultLineHeight: 1.2
    };

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
        onClick: null,
        maintainAspectRatio: true,
        responsive: true,
        responsiveAnimationDuration: 0
    };

    let helper = 
    {
        baseCanvasImage : null,
        isExist: function(value)
        {
            if(typeof value === 'undefined' && !value) return false;
            return true;
        },
        contextValidator: function(item, config)
        {
            if(!this.isExist(item)) return;
            if(!this.isExist(config)) return;

            // TODO  config validate
            for(var items in config)
              //  console.log(items, config[item]);
            return item;
        },
        saveDrawingSurface: function(ctx)
        {
            this.baseCanvasImage = ctx.getImageData(0,0, ctx.canvas.width, ctx.canvas.height);
        },
        resizingCanvas: function()
        {
            
        }

    };

    function initConfig(config)
    {
        if(!helper.isExist(config.options))
        {
            config.options = defaultsOptions;
        }
        return config;
    };

    function bindEvent()
    {
        window.addEventListener('resize',function(e){
            var inWidth = e.target.innerWidth;
            var inHeight = e.target.innerHeight;
            console.log(`width : ${inWidth}, height : ${inHeight}`);
        },false);
    }

    function initCanvas(ctx, config)
    {
        ctx.save();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.5;
        console.log(window.innerHeight);
        console.log(ctx.canvas.width);
        console.log(ctx.canvas.height);
        for(let i = 0.5; i < ctx.canvas.width; i += 10)
        {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, ctx.canvas.height);
            ctx.stroke();
        }

        for(let i = 0.5; i < ctx.canvas.height; i += 10)
        {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(ctx.canvas.width, i);
            ctx.stroke();
        }

        ctx.restore();
    };

    let JChart = function(item, config)
    {
        this.construct(item, config);
	    return this;
    };

    JChart.prototype.construct = function(item, config)
    {
        this.ctx = helper.contextValidator(item, config);
        this.canvas = item.canvas;
        this.config = initConfig(config);
        this.initialize();
        //update();
    };

    JChart.prototype.initialize = function()
    {
        initCanvas(this.ctx, this.config);
        helper.saveDrawingSurface(this.ctx);
        bindEvent();
    };


    window.JChart = JChart;

});

document.addEventListener('DOMContentLoaded', function()
{

    let canvas = document.getElementById('myChart');
    let ctx = canvas.getContext('2d');

    let myChart = new JChart(ctx, config);
    //let chart = new Chart(ctx, config);

},false);
