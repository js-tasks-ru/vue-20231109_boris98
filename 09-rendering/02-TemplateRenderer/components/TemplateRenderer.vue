<script>
import { compile, h, defineComponent } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },
  computed: {
    renderFunction() {
      return compile(this.template);
    },

    componentOptions() {
      return defineComponent({
        props: ['bindings'],
        components: this.components,
        render: this.renderFunction,
      });
    },
  },

  render() {
    return h(this.componentOptions, { bindings: this.bindings });
  },
};
</script>
