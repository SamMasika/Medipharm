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
import Clusters from '@/components/CMS/SystemConfigurations/Clusters/Clusters.vue'
import Members from '@/components/CMS/MemberManagement/Members/Members.vue'
import Department from '@/components/CMS/ChurchPrograms/Department/Department.vue'
import Ministry from '@/components/CMS/ChurchPrograms/Ministry/Ministry.vue'
import Zone from '@/components/CMS/SystemConfigurations/Zones/Zone.vue'
import Deacon from '@/components/CMS/SystemConfigurations/Deacon/Deacon.vue'
import Users from '@/components/CMS/SystemConfigurations/Users/Users.vue'
import Roles from '@/components/CMS/SystemConfigurations/Roles/Roles.vue'
import RoleDetails from '@/components/CMS/SystemConfigurations/Roles/RoleDetails.vue'
import EventsCalendar from '@/components/CMS/ChurchPrograms/EventsCalendar/EventsCalendar.vue'
import MembersDetails from '@/components/CMS/MemberManagement/MembersDetails.vue'

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
    path: '/calendar-chart',
    name: 'calendar-chart',
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
        path: '/departments',
        name: 'departments',
        component: Department
      },
      {
        path: '/ministries',
        name: 'ministries',
        component: Ministry
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: EventsCalendar
      },
      {
        path: '/members',
        name: 'members',
        component: Members
      },
      {
        path: '/member-details/:id',
        name: 'member-details',
        component: MembersDetails
      },
     
     
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
