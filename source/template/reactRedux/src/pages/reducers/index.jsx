import { combineReducers } from 'redux';
import todoList from './todos';

const rootReducer = combineReducers({
	todoList,
});

export default rootReducer;