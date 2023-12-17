<template>
  <UiInput :type="type" :step="step" :model-value="formatedDate" @input="handleDateInput">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },
  props: {
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'time', 'datetime-local'].includes(type),
    },

    modelValue: {
      type: Number,
      default: null,
    },

    step: {
      type: [Number, String],
      default: null,
      validator: (step) => step === 'any' || Number.isFinite(Number(step)),
    },
  },

  emits: ['update:modelValue'],

  methods: {
    handleDateInput(event) {
      const dateISO = event.target.valueAsNumber;
      this.date = new Date(dateISO);
      this.$emit('update:modelValue', dateISO);
    },
  },
  computed: {
    formatedDate() {
      if (!this.modelValue) return '';

      const date = new Date(this.modelValue);

      if (this.type === 'time') return date.toISOString().slice(11, 16);
      if (this.type === 'datetime-local') return date.toISOString().slice(0, -1);
      return date.toISOString().slice(0, 10);
    },
  },
};
</script>
