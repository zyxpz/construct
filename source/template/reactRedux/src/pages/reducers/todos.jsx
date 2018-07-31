import * as types from '../constants/TodoList';

const initState = {
	count: 0
};

const todos = (state = initState, action = {}) => {
	switch (action.type) {
		case types.TODO_LIST_ADD:
			return {
				...state,
				count: state.count + 1
			};

		case types.TODO_LIST_TOGGLE:
			console.log(1);
			return {
				...state,
				count: state.count - 1
			};

		default:
			return state;
	}
};

export default todos;