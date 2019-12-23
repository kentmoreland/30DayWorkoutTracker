import Vue from 'vue';
import Vuex from 'vuex';
import fb from '@/data/firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    signin: (state, payload) => fb.auth
      .signInWithEmailAndPassword(payload.email, payload.password).catch(e => e),

    fetchCurrentUser: ({ commit }, user) => {
      if (user) {
        commit('setUser', user);
      } else {
        commit('setUser', null);
      }
    },
  },
  modules: {
  },
});

fb.auth.onAuthStateChanged(user => store.dispatch('fetchCurrentUser', user));

export default store;
