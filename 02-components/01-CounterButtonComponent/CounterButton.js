import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр и порождать событие
  props: {
    count: {
      type: Number,
	  default: 0,
    },
  },
  
  emits: ['update:count'],
  methods: {
	counterIncrement() {
		this.$emit('update:count', this.count +1);
	},
  },

  template: `<button type="button"  
  @click="counterIncrement"
  >{{ count }}</button>`,
});
