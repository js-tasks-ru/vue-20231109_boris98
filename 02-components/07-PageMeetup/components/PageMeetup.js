import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription.js';
import MeetupCover from '../../03-MeetupCover/components/MeetupCover.js';
import MeetupInfo from '../../04-MeetupInfo/components/MeetupInfo.js';
import MeetupAgendaItem from '../../05-MeetupAgenda/components/MeetupAgendaItem.js';
import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgendaItem,
    MeetupAgenda,
    MeetupView,
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      meetup: null,
      isError: false,
    };
  },
  methods: {
    async fetchMeetup(id) {
      try {
		this.meetup = null;
        const response = await fetchMeetupById(id);
        this.meetup = response;
        this.isError = false;
      } catch (Error) {
        this.isError = true;
      }
    },
  },
  watch: {
    meetupId() {
      this.fetchMeetup(this.meetupId);
    },
  },
  mounted() {
    this.fetchMeetup(this.meetupId);
  },
  template: `
    <div class="page-meetup">

	<MeetupView v-if="meetup && !isError" :meetup="meetup" />

      <UiContainer>
        <UiAlert  v-if="!isError && !meetup">Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer>
        <UiAlert v-if="isError">Test Error</UiAlert>
      </UiContainer>
    </div>`,
});
