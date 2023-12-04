<template>
	<div class="toasts">
		<TransitionGroup name="toast-list">
			<UiToast v-for="toast in toasts" :key="toast.id" :message="toast.message" :type="toast.type" :closable="true"
				@close="handleClose(toast.id)" />
		</TransitionGroup>
	</div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
	name: 'UiToastsList',

	components: { UiToast },

	props: {
		toasts: {
			type: Array,
			required: true,
		},
	},

	emits: ['remove-toast'],
	methods: {
		handleClose(id) {
			this.$emit('remove-toast', id);
		},
	},
};
</script>

<style scoped>
.toasts {
	position: fixed;
	bottom: 8px;
	right: 8px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	white-space: pre-wrap;
	z-index: 999;
}

@media all and (min-width: 992px) {
	.toasts {
		bottom: 72px;
		right: 112px;
	}
}

.toast-list-enter-active,
.toast-list-leave-active {
	transition: all 0.2s ease;
}

.toast-list-enter-from,
.toast-list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
