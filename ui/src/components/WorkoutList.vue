<template>
  <section class="workout-list">
    <h2 class="list-title">Workouts</h2>
    <div class="list-container">
      <div class="list-item" v-for="workout in workouts" :key="workout._id">
        <p class="subheading">{{ workout.exerciseType }}</p>
        <figure class="list-meta-container">
          <span><span class="label">Start-Date:</span> {{ workout.date }}</span>
        </figure>
        <figure class="list-meta-container">
          <span><span class="label">Goal:</span> {{ workout.duration }} days</span>
        </figure>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  computed: {
    workouts() {
      return this.$store.getters.getWorkouts;
    },
  },
};
</script>
<style lang="scss">
  .workout-list {
    border: 2px solid gray;
    border-radius: 5px;
    margin-top: 2em;
    padding: .5em;

    .list-title {
      text-align: center;
    }

    .list-meta-container {
      padding: .5em;
    }

    .subheading {
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 0;
    }

    .list-item {
      margin-bottom: .5em;
    }

    .label {
      color: grey;
      font-style: italic;
      font-weight: bold;
    }
  }
</style>
