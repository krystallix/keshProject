import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/login.vue';
import Register from '@/views/register.vue';
import AppHome from '@/AppHome.vue';
import AppDashboard from '@/AppDashboard.vue';
import Dashboard from '@/views/dashboard/dashboard.vue';
import Member from '@/views/dashboard/member.vue';
import GenerateDocument from '@/views/dashboard/generate-document.vue';
import { useStore } from '@/store/store';  // Import the useStore function

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: AppHome
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      const store = useStore();
      if (!store.user) {
        next(); // Proceed to the route
      } else {
        next('/dashboard'); // Redirect authenticated users to dashboard
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
        next('/dashboard'); // Redirect authenticated users to dashboard
      }
    },
  },
  {
    path: '/dashboard',
    component: AppDashboard,
    beforeEnter: (to, from, next) => {
      const store = useStore();
      if (store.user) {
        next(); // User is authenticated, allow access to the route
      } else {
        next('/login'); // Redirect to the login page if the user is not authenticated
      }
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: 'member',
        name: 'member',
        component: Member
      },
      {
        path: 'generate-document',
        name: 'generate-document',
        component: GenerateDocument
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
