import {computedSize} from '../options/values';
import {objIterator} from './merge';


function isExist(value) {
    if (!value) return false;
    return true;
}

function contextValidator(ctx, config) {
    if (!this.isExist(ctx)) {
        console.error('ctx undefined');
        return -1;
    }
    if (!this.isExist(config)) {
        console.error('config undefined')
        return -1;
    }

    // TODO validate config{}
    objIterator(config);

    return ctx;
}

function drawingRect(ctx) // for debug
{
    return {
        canvasArea: () => {
            ctx.save();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.restore();
        },
        chartArea: () => {
            ctx.save();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.strokeRect(computedSize.layout.padding.left,
                computedSize.layout.padding.top,
                computedSize.layout.chartWidth,
                computedSize.layout.chartHeight);
            ctx.restore();
        },
        yTickLabel: () => {
            ctx.save();
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 3;
            ctx.strokeRect(30, 30, 30, computedSize.layout.chartHeight);
            ctx.restore();
        },
        bottomLabel: () => {
            ctx.save();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 3;
            ctx.strokeRect(0,
                computedSize.layout.padding.top + computedSize.layout.chartHeight,
                computedSize.layout.bottomLable.width,
                computedSize.layout.bottomLable.height);
            ctx.restore();
        }
    }
}


export { isExist, contextValidator, drawingRect };

