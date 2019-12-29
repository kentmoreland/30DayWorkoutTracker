<template>
  <section class="add-workout-page">
    <AddWorkoutForm />
  </section>
</template>
<script>
import AddWorkoutForm from '@/components/forms/AddWorkout.vue';

export default {
  components: {
    AddWorkoutForm,
  },
  mounted() {
    /* eslint-disable no-underscore-dangle */
    const userId = this.$store.getters.getUser._id;
    this.$store.dispatch('fetchWorkouts', userId);
  },
};
</script>
<style lang="scss">
  .add-workout-page {
    background-color: gainsboro;
    display: flex;
    min-height: 100vh;
  }
</style>
