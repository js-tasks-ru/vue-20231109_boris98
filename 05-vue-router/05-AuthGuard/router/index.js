import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
	  name: 'Index',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
	  name: 'Login',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
	  name: 'Register',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
	  name: 'CreateMeetup',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
	  name: 'EditMeetup',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});

router.beforeEach((to) => {
	if (to.meta.requireAuth && !isAuthenticated()) {
	  return { name: 'Login', query: { from: to.fullPath } };
	}
	if (to.meta.requireGuest && isAuthenticated()) {
	  return { name: 'Index' };
	}
  });

export { router };
