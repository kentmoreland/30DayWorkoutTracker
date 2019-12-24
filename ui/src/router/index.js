import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/Signin.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      auth: true,
    },
    component: () => import('../views/Dashboard.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Store.getters.getUser;
  if (!isAuthenticated && to.meta.auth) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
