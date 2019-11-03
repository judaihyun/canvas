
let config = 
{
    type:'line',
    data:{
        labels: [
            'January','test','t2est','tt','234'
        ],
        datasets: [{
            label: 'firstLable',
            data: [
                -50,1.5,-30
            ]
        },{
            label: 'secondLable',
            data: [
                2,3,50
            ]
        }]
    },
    options:{
        responsive: true,
        layout: {
            padding: {
                top: 40.5,
				right: 40,
				bottom: 60.5,
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

document.addEventListener('DOMContentLoaded', function()
{

    
    Samples.utils.srand(Date.now());
    var randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };

    let posDiv = document.getElementById('pos');
    let canvas = document.getElementById('myChart');
    let drawWidth = document.getElementById('width');
    let ctx = canvas.getContext('2d');

    let guide = new Guide(ctx, canvas);
    guide.setDrawWidthEl(drawWidth);
    guide.setPosEl(posDiv);
   
    
    let myChart = new JChart(ctx, config);
    let value = myChart.getCurrentOpt();


    window.addEventListener('resize',function(){
        value = myChart.getCurrentOpt();
        updateEl();
    },false);
  
    function updateEl(){
        document.getElementById('chartWidth').innerHTML = 'chartWidth : ' + value.layout.chartWidth;
        document.getElementById('chartHeight').innerHTML = 'chartHeight : ' + value.layout.chartHeight;
        document.getElementById('topPadding').innerHTML = 'topPadding : ' + value.layout.padding.top;
        document.getElementById('bottomPadding').innerHTML = 'bottomPadding : ' + value.layout.padding.bottom;
        document.getElementById('leftPadding').innerHTML = 'leftPadding : ' + value.layout.padding.left;
        document.getElementById('rightPadding').innerHTML = 'rightPadding : ' + value.layout.padding.right;
    };

    document.getElementById('chartUpdate').addEventListener('click', function(){
        var dummy = [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(), randomScalingFactor()];
        //config.options.scales.xAxes[0].scaleLabel.labelString = 'test';
        console.warn('dummy : ' + dummy);
        config.data.datasets[0].data = dummy;
        myChart.update();
    },false);


},false);
