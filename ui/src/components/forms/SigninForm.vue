<template>
  <Form class=form>
    <h1 class="title">30-Day Sign In</h1>
    <div class="input-container">
      <v-text-field label="Email" v-model="email" />
      <v-text-field label="Password" type="password" v-model="password" />
    </div>
    <v-btn depressed color="grey" @click="submit">
      <v-icon>person</v-icon>
      Sign in
    </v-btn>
  </Form>
</template>
<script>

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async submit() {
      const data = {
        email: this.email,
        password: this.password,
      };
      await this.$store.dispatch('signin', data);
      if (this.$store.getters.getUser) {
        this.$router.push('/dashboard');
      }
    },
  },
};
</script>
<style lang="scss">
  .form {
    background-color: white;
    margin: auto;
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
