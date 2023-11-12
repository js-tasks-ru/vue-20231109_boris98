import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
createApp({
	data() {
		return {
			firstValue: 0,
			secondValue: 0,
			resultValue: 0,
			checkedFunc: "",
		};
	},
	methods: {
		calcResult() {
			switch (this.checkedFunc) {
				case 'sum':
					this.resultValue=this.firstValue+this.secondValue;
					break;
				case 'subtract':
					this.resultValue=this.firstValue-this.secondValue;
					break;
				case 'multiply':
					this.resultValue=this.firstValue*this.secondValue;
					break;
				case 'divide':
					this.resultValue=this.firstValue/this.secondValue;
					break;
			}
		},
	},
}).mount('#app');