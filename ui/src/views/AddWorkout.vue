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
};
</script>
<style lang="scss">
  .add-workout-page {
    background-color: gainsboro;
    display: flex;
    height: 100vh;
  }
</style>
