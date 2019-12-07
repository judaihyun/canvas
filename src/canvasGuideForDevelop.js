
const Guide = function (ctx, canvas) {
	const me = this;
	let drawingSurfaceImageData,
		posEl,
		drawWidthEl,
		dragging = false;

	const mousePos = {};


	function saveDrawingSurface() {
		drawingSurfaceImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	}
	function restoreDrawingSurface() {
		ctx.putImageData(drawingSurfaceImageData, 0, 0);
	}


	function windowToCanvas(x, y) {
		const bbox = canvas.getBoundingClientRect();
		return {
			x: Math.floor(x - bbox.left),
			y: y - bbox.top * (canvas.height / bbox.height),
		};
	}


	function setDrawWidthEl(drawWidth) {
		me.drawWidthEl = drawWidth;
	}
	function setPosEl(pos) {
		me.posEl = pos;
	}
	function drawVerticalLine(x) {
		ctx.beginPath();
		ctx.moveTo(x + 0.5, 0);
		ctx.lineTo(x + 0.5, ctx.canvas.height);
		ctx.stroke();
	}

	function drawHorizontalLine(y) {
		ctx.beginPath();
		ctx.moveTo(0, y + 0.5);
		ctx.lineTo(ctx.canvas.width, y + 0.5);
		ctx.stroke();
	}


	canvas.addEventListener('mousedown', (e) => {
		const inLoc = windowToCanvas(e.clientX, e.clientY);
		saveDrawingSurface();
		if (e.ctrlKey) {
			mousePos.x = inLoc.x;
			mousePos.y = inLoc.y;
			dragging = true;
		}
		ctx.strokeStyle = 'red';
		drawVerticalLine(inLoc.x);
		drawHorizontalLine(inLoc.y);
		ctx.restore();
		me.posEl.innerText = `[${e.clientX}] , [${e.clientY}]`;
	}, false);

	canvas.addEventListener('mousemove', (e) => {
		if (dragging) {
			restoreDrawingSurface();
			const loc = windowToCanvas(e.clientX, e.clientY);
			ctx.save();
			ctx.strokeStyle = 'green';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(loc.x, loc.y);
			ctx.lineTo(mousePos.x, mousePos.y);
			ctx.stroke();
			ctx.restore();
			me.posEl.innerText = `${loc.x},${loc.y}`;
			me.drawWidthEl.innerText = `lineLength : x(${(loc.x - mousePos.x)}), y(${(loc.y - mousePos.y)})`;
		}
	}, false);

	canvas.addEventListener('mouseup', (e) => {
		restoreDrawingSurface();
		dragging = false;
	}, false);

	return{ setDrawWidthEl, setPosEl };
};

if (typeof window !== 'undefined') {
	window.Guide = Guide;
}