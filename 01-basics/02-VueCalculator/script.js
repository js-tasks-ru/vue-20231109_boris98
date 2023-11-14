import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const app = createApp({
	data() {
		return {
			firstValue: 0,
			secondValue: 0,
			calcFunc: "",
		};
	},
	computed: {
		calcResult() {
			switch (this.calcFunc) {
				case 'sum':
					return this.firstValue + this.secondValue;
				case 'subtract':
					return this.firstValue - this.secondValue;
				case 'multiply':
					return this.firstValue * this.secondValue;
				case 'divide':
					return this.firstValue / this.secondValue;
				default:
					return null;
			}

		},
	},
});
const vm = app.mount('#app');
