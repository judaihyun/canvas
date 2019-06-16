
describe('yTickLable TEST', function(){
    let config = 
    {
        data:{
            datasets: [{
                label: 'firstLable',
                data: [
                        //4, -7, 4, 4, 6, 1
                        -80,-42,17
                ]
            }]
        }
    };
    function generatorNumber()
    {
        var count = -10;
        return function(){
            return count++;
        }
    }

    var array = [];

    let dataPoint, maxData, minData, minCount, maxCount;

    beforeEach(function(){
        dataPoint = config.data.datasets[0].data;
        maxData = Math.max.apply(null, dataPoint);
        minData = Math.min.apply(null, dataPoint);

        maxCount = Helper.integerRound(maxData);
        minCount = Helper.integerRound(minData);
    });

    describe('integerRound() TEST', function(){

        beforeEach(function(){
            var num = generatorNumber();
            for(var i = 0; i < 100; i++){
                var value = num();
                //console.log('before('+value+') ' + Helper.integerRound(value));
                array.push(Helper.integerRound(value));
            }
        });
        it('integerRound()', function(){
            array.forEach(function(i){
                expect(i).not.toBeNaN();
                expect(i).toBeGreaterThan(-1);
                var toBe;
                if(i < 10){
                    toBe = i;
                }else if(i <= 10){
                    toBe = 10;
                }else if(i <= 20){
                    toBe = 20;
                }else if(i <= 30){
                    toBe = 30;
                }else if(i <= 40){
                    toBe = 40;
                }else if(i <= 50){
                    toBe = 50;
                }else if(i <= 60){
                    toBe = 60;
                }else if(i <= 70){
                    toBe = 70;
                }else if(i <= 80){
                    toBe = 80;
                }else if(i <= 90){
                    toBe = 90;
                }
                expect(Helper.integerRound(i)).toEqual(toBe);
            })
        });

    });

    describe('yTick TEST', function(){
        var maxArr = [];
        var minArr = [];
        var yTickStepArr = [];
        beforeEach(function(){
            for(var i = -11; i < 24; i++){
                maxArr.push(i);
                minArr.push(i);
            }
        });
        
        it('yTickStepFunc(max) => 0.2', function(){
            maxArr.forEach(function(i){
                var max = Helper.integerRound(i);
                expect(yTickStepFunc(max)).toEqual(0.2);
            })
        });

        it('yTickStepFun()',function(){
            for(var max = 0; max < maxArr.length; ++max)
            {
                for(var min = 0; min < minArr.length; ++min)
                {
                    var dumMax = Helper.integerRound(maxArr[max]);
                    var dumMin = Helper.integerRound(minArr[min]);
                    console.log(`oriMax(${maxArr[max]}) : oriMin(${minArr[min]})`);
                    console.log('max('+dumMax+') + min('+dumMin+') : step(' + yTickStepFunc(dumMax, dumMin) + ')');
                    //console.log('oriMax:' + maxArr[max] + ',  ' + yTickStepFunc(dumMax));
                //(x = max+min), x > 100 == 20, x <= 100 == 10, x <= 20 == 2, x <= 10 == not defined
                }
            }
        });

        it('yTickNumbers -> ', function(){
            /*
            for(var max = 0; max < maxArr.length; ++max)
            {
                for(var min = 0; min < minArr.length; ++min)
                {
                    var step = yTickStepFunc(maxArr[max], minArr[min]);
                    var yTickNumbers = yTickNumberFunc(maxArr[max], minArr[min], step);
                    var toBe;
                    console.log(`step(${step})max(${maxArr[max]}) + min(${minArr[min]}) -> yTickNumber : ${yTickNumbers}`);
                }
            }
            */
         /*   var yTickStep = i; 
            console.log('yTickStep : ' + i);
            var toBe;
            */
        });

        function yTickNumberFunc(max, min, step)
        {
            let num = Math.ceil(max / step) + Math.ceil(min / step) + 1;
            return num;
        }


    });


});