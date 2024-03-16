import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/login.vue';
import Register from '../views/register.vue';
import Dashboard from '../views/dashboard/dashboard.vue';
import { useStore } from '@/store/store';  // Import the useStore function

const routes: RouteRecordRaw[] = [
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      const store = useStore();
      if (!store.user) {
        next(); // Proceed to the route
      } else {
        next('/'); // Redirect authenticated users to dashboard
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const store = useStore();
      if (!store.user) {
        next(); // Proceed to the route
      } else {
        next('/'); // Redirect authenticated users to dashboard
      }
    },
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const store = useStore();
      if (store.user) {
        next(); // User is authenticated, allow access to the route
      } else {
        next('/login'); // Redirect to the login page if the user is not authenticated
      }
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
