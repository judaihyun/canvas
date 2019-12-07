const Samples = {};

Samples.utils = {
	srand: function (seed) {
		this._seed = seed;
	},

	rand: function (min, max) {
		let seed = this._seed;
		min = min === undefined ? 0 : min;
		max = max === undefined ? 1 : max;
		this._seed = (seed * 9301 + 49297) % 233280;
		const result = min + (this._seed / 233280) * (max - min);
		return result;
	}
}