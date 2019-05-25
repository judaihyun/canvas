
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

    const chart = new Chart(ctx, {
        type:'line',
        data:{
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
    
    });
}

document.addEventListener('DOMContentLoaded',function(){

var data = [30,86,120,43,1,2,4];

canChart();


function reqListener () {
    let incomming = JSON.parse(this.responseText);
    console.log(this.responseText);
    console.log(incomming);
  }
  
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "http://localhost:8080/cpuInfo");
  oReq.send();

},false);