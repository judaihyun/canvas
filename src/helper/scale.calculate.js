
/* https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/log10 */
Math.log10 = Math.log10 || function (x) {
	return Math.log(x) * Math.LOG10E;
};


function niceNum(localRange, round) {
	/* exponent of localRange */
	const exponent = Math.floor(Math.log10(localRange));
	/* fractional part of localRange */
	const fraction = localRange / (10 ** exponent);
	/* nice, rounded fraction */
	let niceFraction; 

	if (round) {
		if (fraction < 1.5) {
			niceFraction = 1;
		}else if (fraction < 3) {
			niceFraction = 2;
		}else if (fraction < 7) {
			niceFraction = 5;
		}else{
			niceFraction = 10;
		}
	} else if(!round) {
		if (fraction <= 1) {
			niceFraction = 1;
		}else if (fraction <= 2) {
			niceFraction = 2;
		}else if (fraction <= 5) {
			niceFraction = 5;
		}else{
			niceFraction = 10;
		}
	}
	return niceFraction * (10 ** exponent);
}

export default function niceScale(min, max) {
	/*
		to get a 'nice number' algorithm. detail below 
		https://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
	*/
	const minPoint = min;
	const maxPoint = max;
	const maxTicks = 11;
	let niceMin;
	let niceMax;
	let range;
	let tickSpacing;

	function scaleCalculator() {
		range = niceNum(maxPoint - minPoint, false);
		tickSpacing = niceNum(range / (maxTicks - 1), true);
		niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
		niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
	}

	scaleCalculator();

	return {
		tickSpacing,
		niceMinimum: niceMin,
		niceMaximum: niceMax,
	};
}


/*
//   https://github.com/chartjs/Chart.js/blob/master/src/helpers/helpers.math.js
export const log10 = Math.log10 || function(x) {
	var exponent = Math.log(x) * Math.LOG10E; // Math.LOG10E = 1 / Math.LN10.
	// Check for whole powers of 10,
	// which due to floating point rounding error should be corrected.
	var powerOf10 = Math.round(exponent);
	var isPowerOf10 = x === Math.pow(10, powerOf10);

	return isPowerOf10 ? powerOf10 : exponent;
};
*/