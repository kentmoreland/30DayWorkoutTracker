<template>
  <section>
    <h1 class="page-title">Dashboard</h1>
    <figure>
      <v-icon>person</v-icon>
      Hello, {{ user.firstname }}
      <p class="link" @click="signOut">Sign Out</p>
    </figure>
    <section class="workoutlist-wrapper">
      <WorkoutList />
    </section>
  </section>
</template>
<script>
import WorkoutList from '@/components/WorkoutList.vue';

export default {
  components: {
    WorkoutList,
  },
  methods: {
    async signOut() {
      this.$store.dispatch('signout');
      this.$router.push('/signin');
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
};
</script>
<style lang="scss">
  .link {
    color: blue;
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }

  .page-title {
    text-align: center;
  }

  .workoutlist-wrapper {
    width: 15em;
  }
</style>
