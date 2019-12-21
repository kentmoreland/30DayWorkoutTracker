<template>
  <v-app>
    <section class="main">
      <router-view>
        <Home/>
      </router-view>
    </section>
  </v-app>
</template>

<script>
import Home from './components/Home.vue';

export default {
  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
