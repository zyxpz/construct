import React from 'react';
import '../css/global.less';

const TestDomThree = (props) => {
	const {
		text = 'react测试',
	} = props;

	return (
		<div className="g-color g-border">
			{text}
		</div>
	);
};

export default TestDomThree;
