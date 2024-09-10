import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/Auth/Login.vue'
import Dashboard from '@/components/Layout/Dashboard.vue'
import Master from '@/components/Layout/Master.vue'
import Landing from '@/components/Layout/Landing.vue'
import KnowUs from '@/components/pages/aboutus/KnowUs.vue'

const routes = [
  
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/about',
    name: 'about',
    component: KnowUs
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/master',
    name: 'master',
    component: Master,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        // beforeEnter: (to, from, next) => {
        //   if (!store.getters['auth/authenticated']) {
        //     return next({ name: 'login' });
        //   }
        //   next();
        // }
      },
     
      
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
