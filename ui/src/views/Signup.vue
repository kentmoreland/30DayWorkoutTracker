<template>
  <section class="signup-page">
    <SignupForm />
  </section>

</template>
<script>
import SignupForm from '@/components/forms/SignupForm.vue';

export default {
  components: {
    SignupForm,
  },
};
</script>
<style lang="scss">
  .signup-page {
    background-color: gainsboro;
    display: flex;
    height: 100vh;
  }
</style>
