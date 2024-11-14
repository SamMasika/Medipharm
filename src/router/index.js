import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import Login from '@/components/Auth/Login.vue'
import Dashboard from '@/components/CMS/Layout/Dashboard.vue'
import Master from '@/components/CMS/Layout/Master.vue'
import Landing from '@/components/Website/Layout/Landing.vue'
import KnowUs from '@/components/Website/Pages/About/KnowUs.vue'
import Calendar from '@/components/Website/Pages/Calendar/Calendar.vue'
import Sermons from '@/components/Website/Pages/Sermon/Sermons.vue'
import Belief from '@/components/Website/Pages/About/Beliefs.vue'
import Contact from '@/components/Website/Pages/Contact/Contact.vue'
import Users from '@/components/CMS/Configurations/Users/Users.vue'
import Roles from '@/components/CMS/Configurations/Roles/Roles.vue'
import Clusters from '@/components/CMS/Clusters/Clusters.vue'
import RoleDetails from '@/components/CMS/Configurations/Roles/RoleDetails.vue'
import Event from '@/components/CMS/ChurchManagement/EventsCalendar/Event.vue'
import Zone from '@/components/CMS/Configurations/Zones/Zone.vue'
import Deacon from '@/components/CMS/Configurations/Deacon/Deacon.vue'
import Ministry from '@/components/CMS/ChurchManagement/Ministry/Ministry.vue'

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
        path: '/users',
        name: 'users',
        component: Users
      },
      {
        path: '/roles',
        name: 'roles',
        component: Roles
      },
      {
        path: '/roles-details',
        name: 'roles-details',
        component: RoleDetails
      },
      {
        path: '/clusters',
        name: 'clusters',
        component: Clusters
      },
      {
        path: '/zones',
        name: 'zones',
        component: Zone
      },
      {
        path: '/deacon',
        name: 'deacon',
        component: Deacon
      },
      {
        path: '/ministries',
        name: 'ministries',
        component: Ministry
      },
      {
        path: '/calendar',
        name: 'calendar',
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
