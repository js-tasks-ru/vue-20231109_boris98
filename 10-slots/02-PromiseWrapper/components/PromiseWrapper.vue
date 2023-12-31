<template>
  <slot name="pending" v-if="status === 'pending'" />
  <slot name="rejected" v-if="status === 'rejected'" :error="error" />
  <slot name="fulfilled" v-if="status === 'fulfilled'" :result="result" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },
  data() {
    return {
      error: null,
      result: null,
      status: null,
    };
  },
  watch: {
    promise: {
      handler() {
        this.status = 'pending';

        this.promise.then(this.handleFulfilled).catch(this.handleRejected);
      },
      immediate: true,
    },
  },
  methods: {
    handleFulfilled(res) {
      this.status = 'fulfilled';
      this.result = res;
    },
    handleRejected(err) {
      this.status = 'rejected';
      this.error = err;
    },
  },
};
</script>
