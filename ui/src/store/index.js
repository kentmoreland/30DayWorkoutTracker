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
      const stringUser = JSON.stringify(user);
      localStorage.setItem('user', stringUser);
      state.user = user;
    },

    removeUser(state) {
      localStorage.removeItem('user');
      state.user = null;
    },
  },
  getters: {
    getUser: (state) => {
      if (state.user) { return state.user; }
      const stringUser = localStorage.getItem('user');
      const user = JSON.parse(stringUser);
      return user;
    },
  },
  actions: {
    signin: (state, payload) => fb.auth
      .signInWithEmailAndPassword(payload.email, payload.password).catch(e => e),

    fetchCurrentUser: ({ commit }, user) => (user ? commit('setUser', user)
      : commit('setUser', null)),

    signOut: ({ commit }) => {
      fb.auth.signOut();
      commit('removeUser');
    },

    createUser: async ({ commit }, payload) => {
      const userResponse = await fb.auth
        .createUserWithEmailAndPassword(payload.email, payload.password);
      await fb.auth.currentUser.updateProfile({
        displayName: payload.firstname,
      });
      await fb.dbase.collection('users').doc(userResponse.user.uid).set({
        firstname: payload.firstname,
        lastname: payload.lastname,
      });
      commit('setUser', userResponse.user);
    },
  },
  modules: {
  },
});

fb.auth.onAuthStateChanged(user => store.dispatch('fetchCurrentUser', user));

export default store;
