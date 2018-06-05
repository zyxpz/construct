module.exports = function (opts) {
	let portIndex = opts.indexOf('--port');
	let port = '8001';
	if (portIndex > -1) {
		port = opts[portIndex + 1];
	} else {
		portIndex = opts.indexOf('-p');
		if (portIndex > -1) {
			port = opts[portIndex + 1];
		}
	}
  
	let source;
	let sourceIndex = opts.indexOf('-s');
	if (sourceIndex > -1) {
		source = opts[sourceIndex + 1];
	}
  
	return {
		port,
		source
	};
};