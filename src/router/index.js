import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import Login from '@/components/Auth/Login.vue'
import Dashboard from '@/components/BIMS/Layout/Dashboard.vue'
import Master from '@/components/BIMS/Layout/Master.vue'
import Products from '@/components/BIMS/Products/Products.vue'
import Category from '@/components/BIMS/Products/Category.vue'
import Unit from '@/components/BIMS/Products/Unit.vue'
import Pos from '@/components/BIMS/Sales/Pos.vue'
import Users from '@/components/BIMS/Settings/Users/Users.vue'
import Roles from '@/components/BIMS/Settings/Roles/Roles.vue'
import Customer from '@/components/BIMS/Sales/Customer.vue'
import Supplier from '@/components/BIMS/Suppliers/Supplier.vue'



const routes = [
  {
    path: '/',
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
        path: '/products',
        name: 'products',
        component: Products
      },
      {
        path: '/product-categories',
        name: 'product-categories',
        component: Category
      },
      {
        path: '/product-units',
        name: 'product-units',
        component: Unit
      },
      {
        path: '/pos',
        name: 'pos',
        component: Pos
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
        path: '/customers',
        name: 'customers',
        component: Customer
      },
      {
        path: '/suppliers',
        name: 'suppliers',
        component: Supplier
      },

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router



