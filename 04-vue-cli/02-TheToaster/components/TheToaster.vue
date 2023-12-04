<template>
  <UiToastsList :toasts="toasts" @remove-toast="removeToastById" />
</template>

<script>
import UiToastsList from './UiToastsList.vue';

const DEFAULT_CLOSE_TIMER = 5000;

let toastId = 0;

export default {
  name: 'TheToaster',

  components: { UiToastsList },
  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    error(message) {
      this.addToast(message, 'error');
    },
    success(message) {
      this.addToast(message, 'success');
    },
    setRemoveTimer(ms) {
      setTimeout(() => {
        this.toasts.shift();
      }, ms);
    },
    removeToastById(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
    addToast(message, type) {
      this.toasts.push({ type, message, id: ++toastId });
      this.setRemoveTimer(DEFAULT_CLOSE_TIMER);
    },
  },
};
</script>
