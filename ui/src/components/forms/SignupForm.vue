<template>
  <Form class="form">
    <h1 class="title">30-Day Sign Up</h1>
    <div class="input-container">
      <v-text-field label="Firstname" v-model="firstname" />
      <v-text-field label="Lastname"  v-model="lastname" />
      <v-text-field label="Email"  v-model="email" />
      <v-text-field type="password" label="Password"  v-model="password" />
      <v-text-field type="password" label="Confirm Password"  v-model="confirmPassword" />
    </div>
    <v-btn depressed color="grey" @click="submit">
      <v-icon>person</v-icon>
      Sign up
    </v-btn>
  </Form>
</template>
<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      submitUrl: 'http://localhost:8072/users/signup',
    };
  },
  methods: {
    async submit() {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        confirmPassword: this.password,
      };
      await this.$store.dispatch('signup', data);
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
