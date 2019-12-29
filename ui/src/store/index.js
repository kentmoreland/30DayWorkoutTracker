import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const users = {
  state: {
    user: null,
    baseUrl: 'http://localhost:8072/users',
  },
  mutations: {
    setUser: (state, newUser) => {
      state.user = newUser;
      const stringUser = JSON.stringify(newUser);
      localStorage.setItem('user', stringUser);
    },

    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  getters: {
    getUser: (state) => {
      if (state.user) { return state.user; }
      if (localStorage.getItem('user') && (localStorage.getItem('user') !== 'undefined')) {
        return JSON.parse(localStorage.getItem('user'));
      }
      return null;
    },
  },
  actions: {
    async signup({ commit, state }, formData) {
      const submitUrl = `${state.baseUrl}/signup`;
      const result = await axios.post(submitUrl, formData);
      const { payload: user } = result.data;
      commit('setUser', user);
    },

    async signin({ commit, state, dispatch }, formData) {
      /* eslint-disable no-underscore-dangle */
      const submitUrl = `${state.baseUrl}/signin`;
      const result = await axios.post(submitUrl, formData);
      const { payload: user } = result.data;
      await dispatch('fetchWorkouts', user._id);
      commit('setUser', user);
    },

    async signout({ commit }) {
      commit('removeUser');
      commit('removeWorkouts');
    },
  },
};

const workouts = {
  state: {
    baseUrl: 'http://localhost:8072/workouts',
    workouts: null,
  },
  mutations: {
    setWorkouts(state, newWorkouts) {
      const stringWorkouts = JSON.stringify(newWorkouts);
      localStorage.setItem('workouts', stringWorkouts);
      state.workouts = newWorkouts;
    },

    removeWorkouts(state) {
      localStorage.removeItem('workouts');
      state.workouts = null;
    },
  },
  getters: {
    getWorkouts: (state) => {
      if (state.workouts) { return state.workouts; }
      if (localStorage.getItem('workouts') && (localStorage.getItem('workouts') !== 'undefined')) {
        return JSON.parse(localStorage.getItem('workouts'));
      }
      return null;
    },
  },
  actions: {
    async addWorkout({ state }, formData) {
      const submitUrl = `${state.baseUrl}/add`;
      await axios.post(submitUrl, formData);
    },

    async fetchWorkouts({ commit, state }, userId) {
      const submitUrl = `${state.baseUrl}/${userId}`;
      const results = await axios.get(submitUrl);
      const newWorkouts = results.data.payload;
      commit('setWorkouts', newWorkouts);
    },
  },
};

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  },
  modules: {
    users,
    workouts,
  },
});


export default store;
