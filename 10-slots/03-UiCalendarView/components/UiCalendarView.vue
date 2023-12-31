<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="selectPreviousMonth"
        ></button>
        <div class="calendar-view__date">{{ localeDateString }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="selectNextMonth"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="cellDay in cellsDates"
        :key="cellDay.date"
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !cellDay.isActive }"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ cellDay.day }}</div>
        <div class="calendar-view__cell-content">
          <slot :year="cellDay.year" :month="cellDay.month" :day="cellDay.day" :isoDate="cellDay.date"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FIRST_DAY_WEEK = 1;

export default {
  name: 'UiCalendarView',
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    currentMonth() {
      const currentYear = this.date.getFullYear();
      const currentMonth = this.date.getMonth();
      const dates = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const lastDay = new Date(currentYear, currentMonth + 1, 0).getDay();

      return {
        year: currentYear,
        month: currentMonth,
        dates: dates,
        firstWeekDay: firstDay === 0 ? 7 : firstDay,
        lastWeekDay: lastDay === 0 ? 7 : lastDay,
      };
    },

    previousMonth() {
      if (this.currentMonth.month === 0) {
        return {
          year: this.currentMonth.year - 1,
          month: 11,
          dates: new Date(this.currentMonth.year, this.currentMonth.month, 0).getDate(),
        };
      } else {
        return {
          year: this.currentMonth.year,
          month: this.currentMonth.month - 1,
          dates: new Date(this.currentMonth.year, this.currentMonth.month, 0).getDate(),
        };
      }
    },
    nextMonth() {
      if (this.currentMonth.month === 11) {
        return { year: this.currentMonth.year + 1, month: 0 };
      } else {
        return { year: this.currentMonth.year, month: this.currentMonth.month + 1 };
      }
    },
    cellsDates() {
      const calendarDays = [];
      let i =
        this.currentMonth.firstWeekDay !== FIRST_DAY_WEEK
          ? this.previousMonth.dates - this.currentMonth.firstWeekDay + FIRST_DAY_WEEK + 1
          : this.previousMonth.dates + FIRST_DAY_WEEK;

      while (i <= this.previousMonth.dates) {
        const date = this.formatAsIsoDate(this.previousMonth.year, this.previousMonth.month, i);

        calendarDays.push({
          date: date,
          day: i,
		  month: this.previousMonth.month,
		  year: this.previousMonth.year,
          isActive: false,
        });
        i++;
      }

      for (let i = 1; i <= this.currentMonth.dates; i++) {
        const date = this.formatAsIsoDate(this.currentMonth.year, this.currentMonth.month, i);

        calendarDays.push({
          date: date,
          day: i,
		  month: this.currentMonth.month,
		  year: this.currentMonth.year,
          isActive: true,
        });
      }

      for (let i = 1; i <= 7 - this.currentMonth.lastWeekDay; i++) {
        const date = this.formatAsIsoDate(this.nextMonth.year, this.nextMonth.month, i);

        calendarDays.push({
          date: date,
          day: i,
		  month: this.nextMonth.month,
		  year: this.nextMonth.year,
          isActive: false,
        });
      }
      return calendarDays;
    },
    localeDateString() {
      return this.date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
  },
  methods: {
    selectNextMonth() {
      this.date = new Date(this.nextMonth.year, this.nextMonth.month, 1);
    },

    selectPreviousMonth() {
      this.date = new Date(this.previousMonth.year, this.previousMonth.month, 1);
    },

    formatAsLocalDate(timestamp) {
      return new Date(timestamp).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },

    formatAsIsoDate(year, month, day) {
      return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
