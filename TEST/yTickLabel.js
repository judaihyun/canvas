

let Helper = {
    isExist(value)
    {
        if(typeof value === 'undefined' && !value) return false;
        return true;
    },
    integerRound(_value)
    {
        this.isExist(_value);
        if(_value === 0) return 0;
        if(_value < 0)
        {
            _value *= -1;
        }

        if(_value < 10) return _value;
        if(_value % 10 !== 0)
        {
            _value = (Math.floor(_value / 10) + 1) * 10;
        }
        //console.log(_value);
        return _value;
    }
}


/*
let dataPoint = data.datasets[0].data;
let maxData = Math.max.apply(null, dataPoint);
let minData = Math.min.apply(null, dataPoint);

let maxCount = Helper.integerRound(maxData);
let minCount = Helper.integerRound(minData);

let yTickStep = 20;
if(maxCount + minCount <= 100)
{
    yTickStep = 10;
    if(maxCount + minCount <= 20){
        yTickStep = 2;
    }
}else{
    yTickStep = 20;
}

if(maxCount % yTickStep !== 0)
{
    maxCount += maxCount % yTickStep;
}

// (maxCount / yTickStep) << part of positive num, (minCount /yTickStep) << part of negative num, + 1 << part of zero
let yTickNumbers = (maxCount / yTickStep) + (minCount / yTickStep) + 1;

let stepx = Math.ceil((chartHeight) / yTickNumbers);  

let yTick = 1.0;

if(dataPoint.length < 2){
    yTick = maxData + 1; 
}else{
    yTick = maxCount;
}
*/