<template>
  <q-card class="col" style="max-width: 400px;">
    <q-expansion-item :disabled="overdue">
      <template v-slot:header>
        <q-item-section>
          <div class="row items-center">
            <div class="text-h6 q-mr-md">{{ distance }}</div>
            <div>
              <div
                :class="
                  overdue ? 'text-h6 text-negative' : 'text-h6 text-primary'
                "
              >
                {{ name }}
              </div>
              <div class="row items-center q-gutter-x-sm text-subtitle2">
                <q-icon name="event" />
                <div>
                  <div
                    class="text-caption text-grey-5"
                    style="margin-bottom: -5px"
                  >
                    {{ endDayName }}
                  </div>
                  <div>
                    {{ endDayIso }}
                  </div>
                </div>
              </div>
              <div
                v-if="!overdue"
                class="row items-center q-gutter-x-sm text-center"
              >
                <q-icon name="timer" />
                <div>
                  <div
                    class="text-caption text-grey-5"
                    style="margin-bottom: -5px"
                  >
                    day
                  </div>
                  <div>{{ day }}</div>
                </div>
                <div>
                  <div
                    class="text-caption text-grey-5"
                    style="margin-bottom: -5px"
                  >
                    hour
                  </div>
                  <div>{{ hour }}</div>
                </div>
                <div>
                  <div
                    class="text-caption text-grey-5"
                    style="margin-bottom: -5px"
                  >
                    min
                  </div>
                  <div>{{ min }}</div>
                </div>
                <div>
                  <div
                    class="text-caption text-grey-5"
                    style="margin-bottom: -5px"
                  >
                    sec
                  </div>
                  <div>{{ sec }}</div>
                </div>
              </div>
            </div>
          </div>
        </q-item-section>
      </template>
      <q-item-section>
        {{ description }}
      </q-item-section>
    </q-expansion-item>
  </q-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default() {
        return "Default name";
      }
    },
    distance: {
      type: Number,
      default() {
        return 0;
      }
    },
    description: {
      type: String,
      default() {
        return "Hej det her er en fokrlaring";
      }
    },
    endDate: {
      // pass date object till when you want to run the timer
      type: Date,
      default() {
        return new Date();
      }
    },
    negative: {
      // optional, should countdown after 0 to negative
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      now: new Date(),
      timer: null
    };
  },
  computed: {
    overdue() {
      return this.endDate <= this.now;
    },
    day() {
      let d = Math.trunc((this.endDate - this.now) / (1000 * 60 * 60 * 24));
      return d > 9 ? d : "0" + d;
    },
    hour() {
      let h = Math.trunc(
        ((this.endDate - this.now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      return h > 9 ? h : "0" + h;
    },
    min() {
      let m = Math.trunc((this.endDate - this.now) / 1000 / 60) % 60;
      return m > 9 ? m : "0" + m;
    },
    sec() {
      let s = Math.trunc((this.endDate - this.now) / 1000) % 60;
      return s > 9 ? s : "0" + s;
    },
    endDayName() {
      return this.endDate.toLocaleDateString("en-DK", { weekday: "long" });
    },
    endDayIso() {
      return new Date(
        this.endDate.getTime() - this.endDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      // return this.endDate.toLocaleDateString("en-DK");
    }
  },
  watch: {
    endDate: {
      immediate: true,
      handler(newVal) {
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
          this.now = new Date();
          if (this.negative) return;
          if (this.now > newVal) {
            this.now = newVal;
            this.$emit("endTime");
            clearInterval(this.timer);
          }
        }, 1000);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
