import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
import Login from "@/components/Auth/Login.vue";
import Dashboard from "@/components/BIMS/Layout/Dashboard.vue";
import Master from "@/components/BIMS/Layout/Master.vue";
import Products from "@/components/BIMS/Products/Products.vue";
import Category from "@/components/BIMS/Products/Category.vue";
import Unit from "@/components/BIMS/Products/Unit.vue";
import Pos from "@/components/BIMS/Sales/Pos.vue";
import Users from "@/components/BIMS/Settings/Users/Users.vue";
import Roles from "@/components/BIMS/Settings/Roles/Roles.vue";
import Customer from "@/components/BIMS/Sales/Customer.vue";
import Supplier from "@/components/BIMS/Suppliers/Supplier.vue";
import Register from "@/components/Auth/Register.vue";
import Changepassword from "@/components/BIMS/Settings/Changepassword.vue";
import HelpCenter from "@/components/BIMS/Support/HelpCenter.vue";
import ContactSupport from "@/components/BIMS/Support/ContactSupport.vue";
import OTP from "@/components/Auth/OTP.vue";
import CompanyProfile from "@/components/BIMS/Settings/Users/CompanyProfile.vue";
import UserManagementHelp from "@/components/BIMS/Support/UserManagementHelp.vue";
import ProductManagementHelp from "@/components/BIMS/Support/ProductManagementHelp.vue";
import ProductDetails from "@/components/BIMS/Products/ProductDetails.vue";
import Purchases from "@/components/BIMS/Products/Purchases.vue";
import ChartOfAccount from "@/components/BIMS/Accounts/ChartOfAccount.vue";
import Journals from "@/components/BIMS/Accounts/Journals.vue";
import Ledger from "@/components/BIMS/Accounts/Ledger.vue";
import SalesHistory from "@/components/BIMS/Sales/SalesHistory.vue";
import Profile from "@/components/Auth/Profile.vue";
import SaleDetails from "@/components/BIMS/Sales/SaleDetails.vue";
import Stock from "@/components/BIMS/Products/Stock.vue";
import PurchaseOrders from "@/components/BIMS/Products/PurchaseOrders.vue";


const routes = [
  { path: "/register", name: "register", component: Register },
  {
    path: "/otp-verify",
    name: "otp-verify",
    component: OTP,
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({ name: "company-profile" });
      }
      next();
    },
  },
  {
    path: "/",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({ name: "dashboard" });
      }
      next();
    },
  },
  {
    path: "/master",
    component: Master,
    children: [
      { path: "/dashboard", name: "dashboard", component: Dashboard },
      { path: "/user-profile", name: "user-profile", component: Profile },
      { path: "/products", name: "products", component: Products },
      { path: "/product-categories", name: "product-categories", component: Category },
      { path: "/product-units", name: "product-units", component: Unit },
      { path: "/pos", name: "pos", component: Pos },
      { path: "/sales-history", name: "sales-history", component: SalesHistory },
      { path: '/sale-details/:id' , name: "sale-details", component: SaleDetails },
      { path: "/users", name: "users", component: Users },
      { path: "/roles", name: "roles", component: Roles },
      { path: "/customers", name: "customers", component: Customer },
      { path: "/suppliers", name: "suppliers", component: Supplier },
      { path: "/change-password", name: "change-password", component: Changepassword },
      { path: "/help-center", name: "help-center", component: HelpCenter },
      { path: "/contact-support", name: "contact-support", component: ContactSupport },
      { path: "/help/user-accounts", name: "user-help", component: UserManagementHelp },
      { path: "/help/managing-products", name: "products-help", component: ProductManagementHelp },
      { path: "/company-profile", name: "company-profile", component: CompanyProfile },
      { path: "/product-details/:id", name: "product-details", component: ProductDetails },
      { path: "/purchases", name: "purchases", component: Purchases },
      { path: "/purchase-orders", name: "purchase-orders", component: PurchaseOrders },
      { path: "/stock-overview", name: "stock-overview", component: Stock },
      { path: "/chart-of-accounts", name: "chart-of-accounts", component: ChartOfAccount },
      { path: "/journals", name: "journals", component: Journals },
      { path: "/ledger", name: "ledger", component: Ledger },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/// **Global Navigation Guard**
router.beforeEach((to, from, next) => {
  const publicPages = ["login", "register", "otp-verify"];
  const authRequired = !publicPages.includes(to.name);
  const isAuthenticated = store.getters["auth/authenticated"];
  const user = store.getters["auth/user"];

  if (isAuthenticated) {
    // Redirect if loginCount is 1 (first login) OR company profile is incomplete
    if (user?.loginCount === 1 || user?.company?.isComplete === false) {
      if (to.name !== "company-profile") {
        return next({ name: "company-profile" });
      }
    }
  } else if (authRequired) {
    // Redirect unauthenticated users to login
    return next({ name: "login" });
  }

  next(); // Allow navigation if no conditions are met
});


export default router;
