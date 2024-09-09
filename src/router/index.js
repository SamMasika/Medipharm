import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/Auth/Login.vue'
import Dashboard from '@/components/Layout/Dashboard.vue'
import Master from '@/components/Layout/Master.vue'
import Twitter from '@/components/SocialMedia/Twitter.vue'
import Facebook from '@/components/SocialMedia/Facebook.vue'
import JamiiForum from '@/components/SocialMedia/JamiiForum.vue'
import Instagram from '@/components/SocialMedia/Instagram.vue'
import Ticktock from '@/components/SocialMedia/Ticktock.vue'
import Linkedin from '@/components/SocialMedia/Linkedin.vue'
import Snapchat from '@/components/SocialMedia/Snapchat.vue'
import Landing from '@/components/Layout/Landing.vue'

const routes = [
  
  {
    path: '/',
    name: 'landing',
    component: Landing
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
      {
        path: '/twitter',
        name: 'twitter',
        component: Twitter,
      },
      {
        path: '/facebook',
        name: 'facebook',
        component: Facebook,
      },
      {
        path: '/jamiiforum',
        name: 'jamiiforum',
        component: JamiiForum,
      },
      {
        path: '/instagram',
        name: 'instagram',
        component: Instagram,
      },
      {
        path: '/ticktock',
        name: 'ticktock',
        component: Ticktock,
      },
      {
        path: '/snapchat',
        name: 'snapchat',
        component: Snapchat,
      },
      {
        path: '/linkedin',
        name: 'linkedin',
        component: Linkedin,
      },
      
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
