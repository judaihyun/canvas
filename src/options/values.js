
const dataPoints = [{
	xPoint: [],
	yPoint: [],
}];

// usage :  extend(target, obj1, obj2)
/* 실제 반영 할 options ( layout-padding.., scales) */
const computedSize = {
	set(values) {
		this.options = values;
	},
};

const globalDefaults = {
	defaultColor: 'rgba(0,0,0,0.1)',
	defaultFontColor: '#666',
	defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
	defaultFontSize: 12,
	defaultFontStyle: 'normal',
	defaultLineHeight: 1.2,
	titleFontStyle: 'bold',
	titleSpacing: 2,
	titleMarginBottom: 6,
	titleFontColor: '#fff',
	titleAlign: 'left',
	gridLineColor: 'rgba(0,0,0,1)',
	gridLineWidth: 0.5,
	curveLineColor: 'green',
	dataPointColor: 'blue',
};


/* JChart 생성시 config가 비어있을 경우 이 defaultConfig 값을 사용 */
const defaultConfig = {
	options: {
		responsive: true,
		ratio: {
			x: 21,
			y: 9,
		},
		layout: {
			padding: {
				top: 40.5,
				right: 40,
				bottom: 60.5,
				left: 65.5,
			},
		},
		scales: {
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
				},
				gridLines: {
					color: globalDefaults.gridlineColor,
					lineWidth: globalDefaults.gridLineWidth,
				},
			}],
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
				},
				gridLines: {
					color: globalDefaults.gridlineColor,
					lineWidth: globalDefaults.gridLineWidth,
				},
			}],
		},
	},
/*  incomplete
    elements:{},
    events: [
        'mousemove',
        'mouseout',
        'click',
        'touchstart',
        'touchmove'
    ],
    hover: { 
        onHover: null,
        mode: 'nearest',
        intersect: true,
        animationDuration: 400
    },
    
    onClick: null,
    maintainAspectRatio: true,
    responsiveAnimationDuration: 0
    */
};

Object.freeze(defaultConfig);


export { 
	computedSize, dataPoints, globalDefaults, defaultConfig,
};