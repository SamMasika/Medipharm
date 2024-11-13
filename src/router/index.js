import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import Login from '@/components/Auth/Login.vue'
import Dashboard from '@/components/Layout/Dashboard.vue'
import Master from '@/components/Layout/Master.vue'
import Landing from '@/components/Layout/Landing.vue'
import KnowUs from '@/components/pages/aboutus/KnowUs.vue'
import Calendar from '@/components/pages/calendar/Calendar.vue'
import Sermons from '@/components/pages/sermons/Sermons.vue'
import Belief from '@/components/pages/aboutus/Beliefs.vue'
import Contact from '@/components/pages/contactus/Contact.vue'
import Users from '@/components/CMS/Users/Users.vue'
import Roles from '@/components/CMS/Roles/Roles.vue'
import Clusters from '@/components/CMS/Clusters/Clusters.vue'
import RoleDetails from '@/components/CMS/Roles/RoleDetails.vue'
import Event from '@/components/CMS/Events/Event.vue'
import Zone from '@/components/CMS/zones/Zone.vue'

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
    path: '/belief',
    name: 'belief',
    component: Belief
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/sermons',
    name: 'sermons',
    component: Sermons
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({ name: 'dashboard' });
      }
      next();
    }
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
        beforeEnter: (to, from, next) => {
          if (!store.getters['auth/authenticated']) {
            return next({ name: 'login' });
          }
          next();
        }
      },
      {
        path: '/users-list',
        name: 'users-list',
        component: Users
      },
      {
        path: '/roles-list',
        name: 'roles-list',
        component: Roles
      },
      {
        path: '/roles-details',
        name: 'roles-details',
        component: RoleDetails
      },
      {
        path: '/clusters-list',
        name: 'clusters-list',
        component: Clusters
      },
      {
        path: '/zones-list',
        name: 'zones-list',
        component: Zone
      },
      {
        path: '/events-list',
        name: 'events-list',
        component: Event
      },
     
     
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
