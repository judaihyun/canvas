

document.addEventListener('DOMContentLoaded', function(){

    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        eraseAllButton = document.getElementById('eraseAllButton'),
        strokeStyleSelect = document.getElementById('strokeStyleSelect'),
        guidewireCheckbox = document.getElementById('guidewireCheckbox'),
        drawingSurfaceImageData,
        mousedown = {},
        rubberbandRect = {},
        dragging = false,
        guidewires = guidewireCheckbox.checked;

        function drawGrid(color, stepx, stepy)
        {
            context.save();
            context.strokeStyle = color;
            context.lineWidth = 0.5;
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);

            for(var i = stepx + 0.5; i < context.canvas.width; i += stepx)
            {
                context.beginPath();
                context.moveTo(i, 0);
                context.lineTo(i, context.canvas.height);
                context.stroke();
            }

            for(var i = stepy + 0.5; i < context.canvas.height; i += stepy)
            {
                context.beginPath();
                context.moveTo(0, i);
                context.lineTo(context.canvas.width, i);
                context.stroke();
            }

            context.restore();
        }

        function windowToCanvas(x, y)
        {
            var bbox = canvas.getBoundingClientRect();
            return { x: x - bbox.left * (canvas.width / bbox.width),
                     y: y - bbox.top * (canvas.height / bbox.height) };
        }

        function saveDrawingSurface()
        {
            drawingSurfaceImageData = context.getImageData(0,0, canvas.width, canvas.height);
        }

        function restoreDrawingSurface()
        {
            context.putImageData(drawingSurfaceImageData, 0, 0);
        }

        function updateRubberbandRectangle(loc)
        {
           rubberbandRect.width = Math.abs(loc.x - mousedown.x); 
           rubberbandRect.height = Math.abs(loc.y - mousedown.y); 

           if(loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
           else                    rubberbandRect.left = loc.x;

           if(loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
           else                    rubberbandRect.top = loc.y;
;
        }

        function drawRubberbandShape(loc)
        {
            context.beginPath();
            context.moveTo(mousedown.x, mousedown.y);
            context.lineTo(loc.x, loc.y);
            context.stroke();
        }

        function updateRubberband(loc)
        {
            updateRubberbandRectangle(loc);
            drawRubberbandShape(loc);
        }

        function drawVerticalLine(x)
        {
            context.beginPath();
            context.moveTo(x+0.5, 0);
            context.lineTo(x+0.5, context.canvas.height);
            context.stroke();
        }

        function drawHorizontalLine(y)
        {
            context.beginPath();
            context.moveTo(0, y + 0.5);
            context.lineTo(context.canvas.width, y + 0.5);
            context.stroke();
        }

        function drawGuidRect()
        {
            context.save();
            context.beginPath();
            context.strokeStyle = 'red';
            context.rect(mousedown.x, mousedown.y, rubberbandRect.width, rubberbandRect.height);
            context.stroke()
            context.restore();
        }

        function drawGuidewires(x, y)
        {
            context.save();
            context.strokeStyle = 'rgba(0,0,230,0.4)';
            context.lineWidth = 0.5;
            drawVerticalLine(x);
            drawHorizontalLine(y);
            context.restore();
        }

        canvas.addEventListener('mousedown', function(e){
            var loc = windowToCanvas(e.clientX, e.clientY);
           
            e.preventDefault();
            saveDrawingSurface();
            mousedown.x = loc.x;
            mousedown.y = loc.y;
            dragging = true;
        },false);

        canvas.addEventListener('mousemove', function(e){
            var loc;
            if(dragging)
            {
                e.preventDefault();
                loc = windowToCanvas(e.clientX, e.clientY);
                restoreDrawingSurface();
                updateRubberband(loc);

                if(guidewires){
                    drawGuidewires(loc.x, loc.y);
                    drawGuidRect();
                }
            }

        },false);

        canvas.addEventListener('mouseup', function(e){
            loc = windowToCanvas(e.clientX, e.clientY);
            restoreDrawingSurface();
            updateRubberband(loc);
            dragging = false;
        },false);

        guidewireCheckbox.addEventListener('change',function(e){
            guidewires = guidewireCheckbox.checked;
        },false);

        strokeStyleSelect.onchange = function(e){
            context.strokeStyle = strokeStyleSelect.value;
        }

        eraseAllButton.onclick = function(e){
            context.clearRect(0,0,canvas.width, canvas.height);
            drawGrid('lightgray', 10, 10);
            saveDrawingSurface();
        }



        context.strokeStyle = strokeStyleSelect.value;
        drawGrid('lightgray', 10, 10);


},false);