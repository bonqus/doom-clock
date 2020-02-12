<template>
  <q-page class="flex flex-center column">
    <q-toolbar>
      <q-toolbar-title> Sprint {{ sprint }} </q-toolbar-title>
      <q-toggle v-model="darkmode" />
    </q-toolbar>
    <div class="row full-width">
      <q-list class="col">
        <q-item v-for="date in currentSprint" :key="date.name">
          <countdown
            :name="date.name"
            :endDate="date.date"
            :distance="date.distance"
          />
        </q-item>
      </q-list>

      <q-list class="col">
        <q-item v-for="date in upcommingSprint" :key="date.name">
          <countdown
            :name="date.name"
            :endDate="date.date"
            :distance="date.distance"
          />
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import countdown from "components/countdown.vue";
export default {
  name: "PageIndex",
  data: function() {
    return {
      darkmode: true
    };
  },
  methods: {
    nthWeekdayOfMonth: function(weekday, n, month, year) {
      month -= 1;
      let date = new Date(year, month, 1);
      let add = ((weekday - date.getDay() + 7) % 7) + (n - 1) * 7;
      date.setDate(1 + add);
      return date;
    },
    newDate: function(date, days) {
      let ret = new Date(date);
      ret.setDate(ret.getDate() + days);
      return ret;
    }
  },
  computed: {
    upcommingSprint() {
      return [
        {
          name: "Prioritet backlog klar",
          date: this.newDate(this.deploy, -15),
          distance: -15
        },
        {
          name: "Team planlægger og estimerer",
          date: this.newDate(this.deploy, -13),
          distance: -13
        },
        {
          name: "Retro og Sprint start",
          date: this.newDate(this.deploy, -9),

          distance: -13
        }
      ];
    },
    currentSprint() {
      return [
        {
          name: "Issuefreeze",
          date: this.newDate(this.deploy, -15),
          distance: -15
        },
        {
          name: "Codefreeze",
          date: this.newDate(this.deploy, -14),
          distance: -14
        },
        { name: "Test", date: this.newDate(this.deploy, -13), distance: -13 },
        {
          name: "Test status",
          date: this.newDate(this.deploy, -10),
          distance: -10
        },
        {
          name: "Fixfreeze",
          date: this.newDate(this.deploy, -9),
          distance: -9
        },
        {
          name: "Er vi klar",
          date: this.newDate(this.deploy, -1),
          distance: -1
        },
        { name: "Deploy", date: this.newDate(this.deploy, 0), distance: 0 },
        { name: "Dag 1", date: this.newDate(this.deploy, 1), distance: 1 },
        { name: "Dag 2", date: this.newDate(this.deploy, 4), distance: 4 }
      ];
    },
    sprint() {
      return this.deploy.getFullYear() + "#" + this.deploy.getMonth();
    },
    deploy() {
      let sprint = new Date();
      return this.nthWeekdayOfMonth(
        4,
        2,
        sprint.getMonth() + 1,
        sprint.getFullYear()
      );
    },
    // Obselete
    datesSort() {
      return [...this.currentSprint].sort((a, b) => a.date - b.date);
    }
  },
  created: function() {
    this.$q.dark.set(this.darkmode);
  },
  watch: {
    darkmode: {
      handler() {
        this.$q.dark.set(this.darkmode);
      }
    }
  },
  components: {
    countdown
  }
};
</script>
