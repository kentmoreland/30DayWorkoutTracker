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
      if (localStorage.getItem('user')) { return JSON.parse(localStorage.getItem('user')); }
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

    async signin({ commit, state }, formData) {
      const submitUrl = `${state.baseUrl}/signin`;
      const result = await axios.post(submitUrl, formData);
      const { payload: user } = result.data;
      commit('setUser', user);
    },

    async signout({ commit }) {
      commit('removeUser');
    },
  },
};

const workouts = {
  state: {
    baseUrl: 'http://localhost:8072/workouts',
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    async addWorkout({ state }, formData) {
      console.log(formData);
      const submitUrl = `${state.baseUrl}/add`;
      await axios.post(submitUrl, formData);
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
