
var canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d');

    
   context.lineWidth = 2;
   context.lineCap = 'round';

   
   util.currentXY.call(this.canvas);

   context.beginPath();
   context.moveTo(110, 250);
   //context.quadraticCurveTo(150.8, 130, 160.6, 150.5);
   context.quadraticCurveTo(190, 250, 210.0, 160.5);
   //context.quadraticCurveTo(240, 100.5, 290, 70.5);

   context.stroke();

