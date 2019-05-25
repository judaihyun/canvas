


var util = util || {};

util.currentXY = function()
{

    var pos = document.getElementById('pos');
    var position;
    if(!pos)
    {
        console.error('<div id=\'pos\'> is not defined ');
    }
    canvas.addEventListener('mousedown',function(e){
        position  = windowToCanvas(e.clientX, e.clientY);
        console.log(position);
        pos.innerText = position.x + ',' +position.y;
    },false);

    function windowToCanvas(x, y)
    {
        var bbox = canvas.getBoundingClientRect();
        return { x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height) };
    }

    return position;
}