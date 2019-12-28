<template>
  <section>
    <h1>Dashboard</h1>
    <p class="link" @click="signOut">Sign Out</p>
  </section>
</template>
<script>
export default {
  methods: {
    async signOut() {
      this.$store.dispatch('signout');
      this.$router.push('/signin');
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
</style>
