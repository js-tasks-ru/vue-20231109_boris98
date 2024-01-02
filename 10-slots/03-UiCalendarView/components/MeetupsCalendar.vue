<template>
  <UiCalendarView v-slot="{ isoDate }">
    <UiCalendarEvent v-for="meetup in meetupsByDates[isoDate]" :key="meetup.id" tag="a" :href="`/meetups/${meetup.id}`">
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  computed: {
    meetupsByDates() {
      const meetups = {};

      this.meetups.forEach((meetup) => {
        const date = new Date(meetup.date);
        const dateKey = this.getIsoDateKey(date.getFullYear(), date.getMonth(), date.getDate());

        if (!meetups[dateKey]) meetups[dateKey] = [];
        meetups[dateKey].push(meetup);
      });

      return meetups;
    },
  },

  methods: {
    getIsoDateKey(year, month, day) {
      return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    },
  },
};
</script>

<style scoped></style>
