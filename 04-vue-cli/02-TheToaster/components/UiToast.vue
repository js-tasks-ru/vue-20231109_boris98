<template>
  <div class="toast" :class="typeClass">
    <UiIcon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
    <button v-if="closable" type="button" class="toast__close" @click="$emit('close')">×</button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

const TOAST_TYPE_ICONS = {
  success: {
    icon: 'check-circle',
  },
  error: {
    icon: 'alert-circle',
  },
};
export default {
  name: 'UiToast',

  components: { UiIcon },

  emits: ['close'],

  props: {
    type: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    closable: {
      type: Boolean,
    },
  },
  computed: {
    typeClass() {
      return `toast_${this.type}`;
    },
    icon() {
      return TOAST_TYPE_ICONS[this.type]?.icon;
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast__icon {
  margin-right: 12px;
}

.toast__close {
  margin-left: auto;
  padding: 0 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--grey-8);
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
