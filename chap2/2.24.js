


var bezierCurve = bezierCurve || {};


bezierCurve = () =>
{
    const canvas = document.getElementById('canvas'),
          ctx = canvas.getContext('2d'),
          endPoints = [{x:130, y:70}, {x:430, y:270}],
          controlPoints = [{x:130, y:250}, {x:450, y:70}];

    return{
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
        drawBezierCurve : function()
        {
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.moveTo(endPoints[0].x , endPoints[0].y);
            ctx.bezierCurveTo(controlPoints[0].x, controlPoints[0].y,
                                controlPoints[1].x, controlPoints[1].y,
                                endPoints[1].x, endPoints[1].y);
            ctx.stroke();
        }
    }


}

document.addEventListener('DOMContentLoaded', function(){

   util.currentXY.call(this.canvas);
    var curve = bezierCurve();
    curve.drawGrid('grid', 10,10);
    curve.drawBezierCurve();
},false);