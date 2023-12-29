<template>
	<fieldset class="agenda-item-form">
		<button type="button" class="agenda-item-form__remove-button" @click="handleRemove">
			<UiIcon icon="trash" />
		</button>

		<UiFormGroup>
			<UiDropdown title="Тип" v-model="localAgendaItem.type" :options="$options.agendaItemTypeOptions" name="type" />
		</UiFormGroup>

		<div class="agenda-item-form__row">
			<div class="agenda-item-form__col">
				<UiFormGroup label="Начало">
					<UiInput type="time" v-model="localAgendaItem.startsAt" placeholder="00:00" name="startsAt" />
				</UiFormGroup>
			</div>
			<div class="agenda-item-form__col">
				<UiFormGroup label="Окончание">
					<UiInput type="time" v-model="localAgendaItem.endsAt" placeholder="00:00" name="endsAt" />
				</UiFormGroup>
			</div>
		</div>

		<UiFormGroup :label=titleLabel>
			<UiInput v-model="localAgendaItem.title" name="title" />
		</UiFormGroup>
		<UiFormGroup v-if="localAgendaItem.type === 'talk'" label="Докладчик">
			<UiInput v-model="localAgendaItem.speaker" name="speaker" />
		</UiFormGroup>
		<UiFormGroup v-if="isDescription" label="Описание">
			<UiInput v-model="localAgendaItem.description" multiline name="description" />
		</UiFormGroup>
		<UiFormGroup v-if="localAgendaItem.type === 'talk'" label="Язык">
			<UiDropdown title="Язык" v-model="localAgendaItem.language" :options="$options.talkLanguageOptions"
				name="language" />
		</UiFormGroup>
	</fieldset>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
	registration: 'key',
	opening: 'cal-sm',
	talk: 'tv',
	break: 'clock',
	coffee: 'coffee',
	closing: 'key',
	afterparty: 'cal-sm',
	other: 'cal-sm',
};

const agendaItemDefaultTitles = {
	registration: 'Регистрация',
	opening: 'Открытие',
	break: 'Перерыв',
	coffee: 'Coffee Break',
	closing: 'Закрытие',
	afterparty: 'Afterparty',
	talk: 'Доклад',
	other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
	value: type,
	text: title,
	icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
	{ value: null, text: 'Не указано' },
	{ value: 'RU', text: 'RU' },
	{ value: 'EN', text: 'EN' },
];

export default {
	name: 'MeetupAgendaItemForm',

	agendaItemTypeOptions,
	talkLanguageOptions,

	components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

	props: {
		agendaItem: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			localAgendaItem: { ...this.agendaItem },
		};
	},
	emits: ['update:agendaItem', 'remove'],
	computed: {
		titleLabel() {
			switch (this.localAgendaItem.type) {
				case 'talk':
					return 'Тема';
				case 'other':
					return 'Заголовок'
				default:
					return 'Нестандартный текст (необязательно)';
			}
		},
		isDescription() {
			return this.localAgendaItem.type === 'talk' || this.localAgendaItem.type === 'other';
		},
	},
	watch: {
		localAgendaItem: {
			deep: true,
			handler() {
				this.$emit('update:agendaItem', { ...this.localAgendaItem });
			},
		},
		'localAgendaItem.startsAt'(newValue, oldValue) {
			this.calculateNewEndsAt(newValue, oldValue);
		},
	},
	methods: {
		handleRemove() {
			this.$emit('remove');
		},
		calculateNewEndsAt(newValue, oldValue) {
			const [newHours, newMinutes] = newValue.split(':').map((num) => +num);
			const [oldHours, oldMinutes] = oldValue.split(':').map((num) => +num);
			const [endsAtHours, endsAtMinutes] = this.localAgendaItem.endsAt.split(':').map((num) => +num);

			const startsAtDate = new Date();
			startsAtDate.setHours(oldHours, oldMinutes);

			const endsAtDate = new Date();
			endsAtDate.setHours(endsAtHours, endsAtMinutes);

			const timeDifference = endsAtDate - startsAtDate;

			startsAtDate.setHours(newHours, newMinutes);
			endsAtDate.setTime(startsAtDate.getTime() + timeDifference);

			this.localAgendaItem.endsAt = endsAtDate.toTimeString().slice(0, 5);
		},
	},

};
</script>

<style scoped>
.agenda-item-form {
	border: 2px solid var(--blue-light);
	border-radius: 8px;
	position: relative;
	padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
	position: absolute;
	top: 4px;
	right: 0;
	box-shadow: none;
	border: none;
	background-color: transparent;
	outline: none;
	padding: 4px;
	cursor: pointer;
	transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
	opacity: 0.6;
}

.agenda-item-form__row {
	display: flex;
	flex-direction: column;
}

.agenda-item-form__col+.agenda-item-form__col {
	margin-top: 16px;
}

.agenda-item-form__col:first-child {
	margin-left: 0;
}

@media all and (min-width: 992px) {
	.agenda-item-form {
		padding: 28px 25% 4px 24px;
	}

	.agenda-item-form__remove-button {
		top: 20px;
		right: 20px;
	}

	.agenda-item-form__row {
		flex-direction: row;
		justify-content: space-between;
		margin: 0 -12px;
	}

	.agenda-item-form__col {
		flex: 1 1 auto;
		padding: 0 12px;
	}

	.agenda-item-form__col+.agenda-item-form__col {
		margin-top: 0;
	}

	.agenda-item-form__col:first-child {
		margin-left: 0;
	}
}
</style>
