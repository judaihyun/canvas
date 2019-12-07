import { computedSize } from '../options/values';
import { debugConsole } from '../errorControl/errorPrint';

function computeSize(ctx) {
	if (computedSize.options.layout.padding) {
		computedSize.options.layout.chartWidth = ctx.canvas.width -
            (computedSize.options.layout.padding.left +
                computedSize.options.layout.padding.right);
		computedSize.options.layout.chartHeight = ctx.canvas.height -
            (computedSize.options.layout.padding.top +
                computedSize.options.layout.padding.bottom);
		computedSize.options.layout.bottomLable = {
			width: computedSize.options.layout.chartWidth + 
				computedSize.options.layout.padding.left,// + computedSize.options.layout.padding.right,
			height: computedSize.options.layout.padding.bottom +
                computedSize.options.layout.chartHeight,
		};
	} else {
		console.error('computedSize.layout.padding is not defined')
	}
}

/* FIXME : 초기 구동 시  changeRatio () 호출 시마다 계속적으로 계산함.. (소수점단위??) */ 
function ratioCalculator(ctx) {
	const obj = {};
	const { parentNode } = ctx.canvas;
	const parentWidth = parentNode.clientWidth;
	const parentHeight = parentNode.clientHeight;
	let diagonal = 0;

	console.log(`parent width=${parentWidth} height=${parentHeight}`);

	const { x, y } = computedSize.options.ratio;

	debugConsole(`RATIO = ${x}:${y}`);

	const w = parentWidth;
	const h = parentHeight;

	diagonal = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));

	debugConsole(`diagonal=${diagonal}`);

	obj.width = Math.floor((diagonal * x) / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
	obj.height = Math.floor((diagonal * y) / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
	console.log(`ratio width=${obj.width},height=${obj.height}`);
	ctx.canvas.width = obj.width;
	ctx.canvas.height = obj.height;
	return obj;
}

export { ratioCalculator, computeSize };