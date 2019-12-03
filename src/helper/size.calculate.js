import {computedSize} from '../options/values';
import {debugConsole} from './index';

function computeSize(ctx) {
    if (computedSize.options.layout.padding) {
        computedSize.options.layout.chartWidth = ctx.canvas.width -
            (computedSize.options.layout.padding.left +
                computedSize.options.layout.padding.right);
        computedSize.options.layout.chartHeight = ctx.canvas.height -
            (computedSize.options.layout.padding.top +
                computedSize.options.layout.padding.bottom);
        computedSize.options.layout.bottomLable = {
            width: computedSize.options.layout.chartWidth + computedSize.options.layout.padding.left,// + computedSize.options.layout.padding.right,
            height: computedSize.options.layout.padding.bottom +
                computedSize.options.layout.chartHeight
        };
    } else {
        console.error('computedSize.layout.padding is not defined')
    }
}

function ratioCalculator(ctx)  /* FIXME : 초기 구동 시 여러번 
    changeRatio () 호출 시마다 계속적으로 계산함.. (소수점단위??) */ {
    let obj = {};
    let diagonal = 0;
    let parentNode = ctx.canvas.parentNode;
    let parentWidth = parentNode.clientWidth;
    let parentHeight = parentNode.clientHeight;

    console.log(`parent width=${parentWidth} height=${parentHeight}`);

    let x = computedSize.options.ratio.x;
    let y = computedSize.options.ratio.y;

    debugConsole(`RATIO = ${x}:${y}`);

    let w = parentWidth;
    let h = parentHeight;

    diagonal = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));

    debugConsole(`diagonal=${diagonal}`);

    obj.width = Math.floor(diagonal * x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    obj.height = Math.floor(diagonal * y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    console.log(`ratio width=${obj.width},height=${obj.height}`);
    ctx.canvas.width = obj.width;
    ctx.canvas.height = obj.height;
    return obj;
}

export { ratioCalculator, computeSize };