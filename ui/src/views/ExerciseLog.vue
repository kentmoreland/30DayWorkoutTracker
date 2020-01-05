<template>
  <section>
    <h2>
      Workout Info
    </h2>
    <h2>
      Exercise Log
    </h2>
    <div>
      <h2>{{ exercise }}</h2>
    </div>
    <div>
      <span>Day {{ dayNumber }} of {{ duration }}</span>
    </div>
    <div>
      <span>Round: {{roundNumber }}</span>
    </div>
    <Form>
        <div>
        Current Set {{ setNumber }}
        </div>
      <figure class="set-display">
        Current Set Reps:
        <span
          class="set-card"
          v-for="(set, index) in sets"
          :key="index"
        >
          Set {{ set[index + 1].setNumber }}: {{ set[index + 1].reps }} Reps
        </span>
      </figure>
      <h2 class="center-title">
        Enter Reps for this set
      </h2>
      <div class="input-wrapper">
        <v-text-field
          ref="repsInput"
          class="number-input"
          outlined
          type="Number"
          placeholder="Reps"
          v-model="setTotalReps"
        />
      </div>
      <div class="control-button-wrapper">
        <v-btn class="wide-button" depressed color="green" @click="completeSet"> Log Set </v-btn>
      </div>
      <div v-if="activeSet" class="control-button-wrapper">
        <v-btn class="wide-button" depressed color="green" @click="completeRound">
          Complete Round
        </v-btn>
      </div>
      <div v-if="activeRound" class="control-button-wrapper">
        <v-btn class="wide-button" depressed color="green" @click="completeDay"> Finish Day </v-btn>
      </div>
    </Form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      days: [],
      dayNumber: 1,
      rounds: [],
      roundNumber: 1,
      sets: [],
      setTotalReps: '',
      exercise: 'Push-Ups',
      duration: 30,
      setNumber: 1,
    };
  },
  methods: {
    addCompletedSet() {
      const newSet = {};
      const intTotal = parseInt(this.setTotalReps, 10);
      newSet[this.setNumber] = { setNumber: this.setNumber, reps: intTotal };
      this.sets.push(newSet);
      this.$refs.repsInput.focus();
    },
    /* eslint-disable no-param-reassign */
    /* eslint-disable no-unused-expressions */
    addCompletedRound() {
      const newRound = {};
      const roundTotal = this.sets.reduce((total, set, index) => {
        total += set[index + 1].reps;
        return total;
      }, 0);
      newRound[this.roundNumber] = {
        roundNumber: this.roundNumber,
        reps: roundTotal,
        sets: this.sets,
      };
      this.rounds.push(newRound);
    },
    addCompletedDay() {
      const newDay = {};
      const dayTotal = this.rounds.reduce((total, round, index) => {
        total += round[index + 1].reps;
        return total;
      }, 0);
      newDay[this.dayNumber] = {
        dayNumber: this.dayNumber,
        reps: dayTotal,
        rounds: this.rounds,
      };
      this.days.push(newDay);
    },
    completeSet() {
      this.addCompletedSet();
      this.setNumber += 1;
      this.setTotalReps = '';
    },
    completeRound() {
      this.addCompletedRound();
      this.roundNumber += 1;
      this.sets = [];
      this.setNumber = 1;
    },
    completeDay() {
      this.addCompletedDay();
      this.dayNumber += 1;
      this.rounds = [];
      this.roundNumber = 1;
    },
  },
  computed: {
    activeSet() {
      return this.sets.length;
    },
    activeRound() {
      return this.rounds.length;
    },
  },
};
</script>
<style lang="scss">
  .center-title {
    text-align: center;
  }

  .input-wrapper {
    height: 5em;
    margin-top: 1.5em;
  }

  .number-input {
    margin: 1em auto !important;
    width: 5em;
  }

  .control-button-wrapper {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .button-wrapper {
    margin-right: .5em;
  }

  .wide-button {
    display: block;
    margin: auto !important;
    width: 25em;
  }

  .set-display {
    margin-top: .5em;
    margin-bottom: 1em;
  }

  .set-card {
    border: 1px solid grey;
    border-radius: 5px;
    display: inline-block;
    margin-right: .5em;
    margin-bottom: .5em;
    padding: .5em;
  }
</style>
