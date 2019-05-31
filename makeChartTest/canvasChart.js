
var canChart = canChart || {};

canChart = () =>
{
    const canvas = document.getElementById('myChart');
    let ctx;
    if(canvas.getContext)
    {
        ctx = canvas.getContext('2d');
    }else{
        console.error('unsupported getContext');
        return -1;
    }

    let config = {
        type:'line',
        data:{
            datasets: [{
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'black'
                ],
                borderWidth: 1
            }]
        },
        options:{
            title:{
                display: true,
                text: 'cpu usage'
            },
            legend:{
                display:false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    },
                    scaleLabel: {
                        display: true,
                        labelString: '%'
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'time'
                    }
                }]
            },
            hover:{
                mode:'nearest',
                intersect:true
            }
        }
    }


    const chart = new Chart(ctx, config);

    return chart;
}

function reqListener ()
{
    let incomming = JSON.parse(this.responseText);
    console.log(incomming);
    addData(canChart, incomming.cpuUsage);
};
 
function addData() {
    let xCount = 0;
    return function(chart, data){

        if(chart.data.labels.length > 5)
        {
            chart.data.datasets[0].data.shift();
            chart.data.labels.shift();
        }

        chart.data.labels.push(xCount++);

        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });

        chart.update();
    }
};



document.addEventListener('DOMContentLoaded',function(){

    let chart = canChart();
    let xAxesCount = 0;
    let oReq = new XMLHttpRequest();
    let addFunc = addData();
    let intervalId;

    
    function request()
    {
        oReq.open("GET", "http://localhost:8080/cpuInfo");
        oReq.send();
    }

    oReq.addEventListener("load", function(){
        if(this.status === 200 && this.readyState === this.DONE)
        {
            let incomming = JSON.parse(this.responseText);
            console.log(incomming.cpuUsage);
            addFunc(chart, incomming.cpuUsage);
        }else if(this.status === 500){
            console.error('505 internal error');
            return;
        }else{
            console.error('unknown error');
        }
    },false);


    let startBtn = document.getElementById('start');
    let stopBtn = document.getElementById('stop');

    stopBtn.addEventListener('click', ()=>{clearInterval(intervalId);});
    startBtn.addEventListener('click', ()=>{ intervalId = setInterval(request,2000);})

    

},false);