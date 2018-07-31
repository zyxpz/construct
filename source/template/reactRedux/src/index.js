import React from 'react';
import { render } from 'react-dom';

import './css/reset.less';
import './css/globle.less';

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// reducer
import TodoList from './pages/reducers/index';

const store = createStore(TodoList);

import App from './pages/components/todoList';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);