<template>
  <section>
    <h1>Dashboard</h1>
    <p class="link" @click="signOut">Sign Out</p>
  </section>
</template>
<script>
export default {
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
      this.$router.push('/signin');
    },
  },
  mounted() {
    this.$store.dispatch('getWorkouts');
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
</style>
