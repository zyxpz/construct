module.exports = function (opts) {
	let textIndex = opts.indexOf('--text');
	let text = '默认文案';
	if (textIndex > -1) {
		text = opts[textIndex + 1];
	} else {
		textIndex = opts.indexOf('-t');
		if (textIndex > -1) {
			text = opts[textIndex + 1];
		}
	}
  
	let textt = '链式调用';
	let textTIndex = opts.indexOf('-tx');
	if (textTIndex > -1) {
		textt = opts[textTIndex + 1];
	}
  
	return {
		text,
		textt
	};
};