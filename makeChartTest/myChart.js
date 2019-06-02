
let config = 
{
    type:'line',
    data:{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            data:[1,2,-3,4],
            backgroundColor: [
            ],
            borderColor: [
            ],
            borderWidth: 1
        }]
    },
    options:{
        responsive:true,
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
        defaultLineHeight: 1.2
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
        onClick: null,
        maintainAspectRatio: true,
        responsive: true,
        responsiveAnimationDuration: 0
    };

    let Helper = 
    {
        baseCanvasImage : null,
        property : {},
        isExist(value)
        {
            if(typeof value === 'undefined' && !value) return false;
            return true;
        },
        initConfig(config)
        {
            if(!Helper.isExist(config.options))
            {
                config.options = defaultsOptions;
            }
            
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
            ctx.canvas.width = window.innerWidth,
            ctx.canvas.height = (ctx.canvas.width / 21)*9;  // aspect ratio 21:9
            //console.log('window.innerHeight : ' + window.innerHeight + ', window.innerWidth : ' + window.innerWidth);
            //console.log('canvas.width : ' + ctx.canvas.width + ', canvas.height : ' + ctx.canvas.height);
            initCanvas(ctx, config);
        }
    };
    
    let Draw = {
        drawGrid(ctx)
        {
            ctx.save();
            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 0.5;

            var width = ctx.canvas.width,
                height = ctx.canvas.height;
          
            for(let i = 40.5; i < width - 40; i += 10)
            {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, height);
                ctx.stroke();
            }
        
            for(let i = 10.5; i < height; i += 10)
            {
                ctx.beginPath();
                ctx.moveTo(40.5, i);
                ctx.lineTo(width - 40, i);
                ctx.stroke();
            }

            ctx.restore();
        },
        axesLable(ctx)
        {
            var width = ctx.canvas.width;
            var height = ctx.canvas.height / 2;
            var fontStyle = globalDefaults.defaultFontSize + 'px ' + 'Arial';

            ctx.save();
            ctx.fillStyle = 'red';
            ctx.ineWidth = 1;
            ctx.font = fontStyle;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.translate(20, height);
            ctx.rotate(Math.PI * 1.5);
            ctx.fillText('test', 30, 0 );
            ctx.restore();
        }
        
    }

    /*
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
    */

    function initCanvas(ctx, config)
    {
        if(config.options.scales)
        {
            var scales = config.options.scales;
        }
        Draw.drawGrid(ctx);

        for(var prop in scales)
        {
            console.log(prop);
            Draw.axesLable(ctx, scales);
        }

        
    };

   
    let JChart = function(item, config)
    {
        this.resizeEvent = new Event('resizeEvt');
        this.ctx = Helper.contextValidator(item, config);
        this.canvas = item.canvas;
        this.config = Helper.initConfig(config);
        this.initialize();
        return {
            update : function()
            {   
            }
        }
    };

    JChart.prototype.initialize = function()
    {
        var me = this;
        initCanvas(me.ctx, me.config);

        Helper.saveDrawingSurface(me.ctx);
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
        this.canvas.width = size.detail.inWidth;
        this.canvas.height = (this.canvas.width / 21) * 9;
        initCanvas(this.ctx, this.config);
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

},false);
