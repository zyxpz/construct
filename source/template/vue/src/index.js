import Vue from 'vue';
import App from './app';

const app = document.querySelector('.root');

new Vue({
	render: h => h(App),
}).$mount(app);
