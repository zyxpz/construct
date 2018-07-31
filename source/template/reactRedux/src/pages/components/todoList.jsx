import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	count: state.todoList.count
});

const TodoListApp = ({ count, dispatch }) => {
	const addAction = () => {
		dispatch({
			type: 'TODO_LIST_ADD'
		});
	};

	const toggleAction = () => {
		dispatch({
			type: 'TODO_LIST_TOGGLE'
		});
	};


	return (
		<div>
			<div className="g-center">
				{count}
			</div>
			<div className="g-flex g-ji-center">
				<span style={{ marginRight: '10px' }} onClick={addAction}>+</span>
				<span onClick={toggleAction}>-</span>
			</div>
		</div>
	);
};


export default connect(mapStateToProps)(TodoListApp);