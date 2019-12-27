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
    signin: async ({ commit }, payload) => {
      const userResponse = await fb.auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch(e => e);
      console.log(userResponse.user);
      commit('setUser', userResponse.user);
    },

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

    getWorkout: async ({ state }, payload) => {
      const { id, exerciseType } = payload;
      const workoutRef = await fb.dbase
        .collection(`userWorkouts/${id}/${exerciseType}/`).get();
      const workoutDocs = workoutRef.docs;
      console.log(state);
      return workoutDocs.map(doc => doc.data());
    },
  },
  modules: {
  },
});

fb.auth.onAuthStateChanged(user => store.dispatch('fetchCurrentUser', user));

export default store;
