<template>
  <section>
    <h1>Dashboard</h1>
    <p class="link" @click="signOut">Sign Out</p>
    <div>
      <h1>Pushups</h1>
      {{ pushups }}
    </div>
    <div>
      <h1>Situps</h1>
      {{ situps }}
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      pushups: [],
      situps: [],
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut');
      this.$router.push('/signin');
    },
    async getPushups() {
      const parameters = { id: this.user.uid, exerciseType: 'pushups' };
      const result = await this.$store.dispatch('getWorkout', parameters);
      return result;
    },
    async getSitups() {
      const parameters = { id: this.user.uid, exerciseType: 'situps' };
      const result = await this.$store.dispatch('getWorkout', parameters);
      return result;
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  async mounted() {
    this.pushups = await this.getPushups();
    this.situps = await this.getSitups();
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
