
export default function debugConsole(str) {
	if(typeof DEBUG_MODE !== 'undefined' && DEBUG_MODE) {
		console.log(str);
	}
}
