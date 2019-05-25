


var polygonObj = polygonObj || {};


polygonObj = () =>
{
    'use strict'
    const canvas = document.getElementById('canvas'),
          ctx = canvas.getContext('2d'),
          sideSelect = document.getElementById('sidesSelect'),
          startAngleSelect =document.getElementById('startAngleSelect'),
          fillCheckbox = document.getElementById('fillCheckBox'),
          mouseDown = {}, rubberbandRect = {};
          
      var polygons = [];


    return{
        getCanvas : () => {return canvas;},
        drawGrid : function(color, stepx, stepy)
        {
            ctx.save();
            ctx.shadowColor = undefined;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            ctx.strokeStyle = color;
            ctx.fillStyle = '#ffffff';
            ctx.lineWidth = 0.5;
            ctx.fillRect(0, 0, ctx.canvas.width,
                                ctx.canvas.height);

            for(var i = stepx + 0.5;
                    i < ctx.canvas.width; i += stepx)
            {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, ctx.canvas.height);
                ctx.stroke();
            }

            for(var i = stepy + 0.5;
                    i < ctx.canvas.width; i+=stepy)
            {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(ctx.canvas.width, i);
                ctx.stroke();
            }
            ctx.restore();
        },
        drawRubberbandShape : function(loc, sides, startAngle)
        {
            var isFill = false;
            var polygon = new Polygon(loc.x, loc.y,
                                      200,
                                      sides,
                                      (Math.PI / 180) * 0.785,
                                      ctx.strokeStyle,
                                      ctx.fillStyle,
                                      isFill);
            ctx.beginPath();
            polygon.createPath(ctx);
            polygon.stroke(ctx);

            polygons.push(polygon);
            //if(fillCheckbox.checked)
             //   ctx.fill();
        }
       
    }


}

document.addEventListener('DOMContentLoaded', function(){

    util.currentXY.call(this.canvas);
    var my = polygonObj();
    my.drawGrid('grid', 10,10);
    //curve.createPolygonPath(180, 8, 0.785);

    my.getCanvas().addEventListener('mousedown', function(e)
    {
        var pos = windowToCanvas(e.clientX, e.clientY);
        my.drawRubberbandShape(pos, 8, 0.785)
    },false);

    function windowToCanvas(x, y)
    {
        var bbox = canvas.getBoundingClientRect();
        return { x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height) };
    }

},false);