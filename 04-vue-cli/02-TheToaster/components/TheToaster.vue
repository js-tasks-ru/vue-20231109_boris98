<template>
  <UiToastsList :toasts="toasts" @remove-toast="removeToast" />
</template>

<script>
const DEFAULT_CLOSE_TIMER = 5000;

import UiToastsList from './UiToastsList.vue';

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
    setTimer(id, ms) {
      const timerId = setTimeout(() => {
        this.removeToast(id);
      }, ms);
      return timerId;
    },
    removeToast(id) {
      this.removeTimer(id);
      const index = this.toasts.findIndex((toast) => toast.id === id);
      if (index !== -1) {
        this.toasts.splice(index, 1);
      }
    },
    removeTimer(id) {
      const index = this.toasts.findIndex((toast) => toast.id === id);
      if (index !== -1) {
        const timerId = this.toasts[index].timerId;
        clearTimeout(timerId);
      }
    },
    addToast(message, type) {
      const newToast = { type, message, id: toastId };
      newToast.timerId = this.setTimer(newToast.id, DEFAULT_CLOSE_TIMER);
      this.toasts.push(newToast);
      toastId++;
    },
  },
};
</script>
