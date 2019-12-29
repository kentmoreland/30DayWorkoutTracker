<template>
  <Form class="form">
    <h1>Add Workout Form</h1>
    <div class="input-container">
      <v-text-field label="Exercise Type" v-model="exerciseType" />
      <v-text-field type="number" label="Duration-days" v-model="duration" />
      <v-text-field type="date" label="Start-Date" v-model="date" />
    </div>
    <v-btn depressed color="grey" @click="submit">
      <v-icon>person</v-icon>
      Create
    </v-btn>
    <WorkoutList />
  </Form>
</template>
<script>
import WorkoutList from '@/components/WorkoutList.vue';

export default {
  components: {
    WorkoutList,
  },
  data() {
    return {
      inputs: ['exerciseType', 'duration', 'date'],
      exerciseType: '',
      duration: '',
      date: '',
      displayName: '',
    };
  },
  methods: {
    async submit() {
      /* eslint-disable no-param-reassign */
      /* eslint-disable no-underscore-dangle */
      const formData = this.inputs.reduce((data, input) => {
        data[input] = this[input];
        return data;
      }, {});
      const userId = this.$store.getters.getUser._id;
      formData.userId = userId;
      await this.$store.dispatch('addWorkout', formData);
      await this.$store.dispatch('fetchWorkouts', userId);
      // TODO: Check for error before clearing form
      this.inputs.forEach((input) => { this[input] = ''; });
    },
  },
};
</script>
<style lang="scss">
  .form {
      background-color: white;
      margin: 2em auto;
      padding: 1em;
      width: 30em;
      .title {
        text-align: center;
      }
    }
    .input-container {
      margin-bottom: 1em;
    }
</style>
