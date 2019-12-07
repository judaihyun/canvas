
import { computedSize, defaultConfig } from '../options/values';


function mergeConfig(_config) {
	/*
	const data = config.data = config.data || {};
	data.labels = data.labels || [];
	data.datasets = data.datasets || [];
	*/
	const config = _config;
	config.options = config.options || defaultConfig.options;

	config.options = appendConfig({}, defaultConfig.options, config.options);
	computedSize.set(config.options);
	console.log(computedSize);
	return config;
}


/**
* https://stackoverflow.com/a/20591261/9373458
* merge two objects.
* usage :  extend(target, obj1, obj2)
* @param target
* @param default
* @param source 
*/

function appendConfig(target) {
	for (let i = 1; i < arguments.length; ++i) {
		const from = arguments[i];
		if (typeof from !== 'object') continue;
		for(let j in from) {
			if (Object.prototype.hasOwnProperty.call(from, j)) {
				target[j] = typeof from[j] === 'object'
					? appendConfig({}, target[j], from[j])
					: from[j];
			}
		}
	}
	return target;
}


/**
 *  
 */


function objIterator(target) {
	for (var prop in target) {
		if (Object.prototype.hasOwnProperty.call(target, prop)) {
			if (typeof target[prop] === 'object' && !Array.isArray(target[prop])) {
				console.log('[object] ' + prop);
				objIterator(target[prop]);
			} else if (Array.isArray(target[prop])) {
				console.log('[array] ' + prop);
				var temp = target[prop];
				for (var i = 0; i < temp.length; ++i) {
					if (typeof temp[i] === 'object' && !Array.isArray(temp[i])) {
						objIterator(temp[i]);
					} else {
						console.log('[' + i + '] ' + temp[i]);
					}
				}
			}
			else if (typeof target[prop] === 'string') {
				console.log('[string] ' + prop + ' ' + target[prop]);
			}
			else if (typeof target[prop] === 'boolean') {
				console.log('[boolean] ' + prop + ' ' + target[prop]);
			}
		}
	}
}


export { mergeConfig, appendConfig, objIterator };