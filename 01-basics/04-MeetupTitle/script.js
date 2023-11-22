import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
	return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			return response.json().then((error) => {
				throw error;
			});
		}
	});
}

// Требуется создать Vue приложение
const app = createApp({
	data() {
		return {
			meetupId: null,
			meetup: {},
		};
	},

	watch: {
		async meetupId(newId) {
			this.meetup = await this.fetchMeetup(newId);
		},
	  },
	methods: {
		async fetchMeetup(id) {
		  try {
			const response = await fetchMeetupById(id);
			return response;

		  } catch (error) {
			console.error(error);
		  }
		},
	  },
});
const vm = app.mount('#app');