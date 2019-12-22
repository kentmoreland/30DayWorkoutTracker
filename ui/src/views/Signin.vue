<template>
  <section class="signin-page">
    <SigninForm />
  </section>
</template>
<script>
import SigninForm from '@/components/forms/SigninForm.vue';

export default {
  components: {
    SigninForm,
  },
};
</script>
<style lang="scss">
  .signin-page {
    background-color: gainsboro;
    display: flex;
    height: 100vh;
  }
</style>
