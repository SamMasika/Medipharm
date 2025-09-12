import { createRouter, createWebHashHistory } from "vue-router";



import Appointment from "@/components/Stailika/pages/Appointment.vue";
import Layout from "@/components/Stailika/Layout/Home.vue";
import Landing from "@/components/Stailika/Layout/Landing.vue";
import Pricing from "@/components/Stailika/pages/Pricing.vue";
import Shop from "@/components/Stailika/pages/Shop.vue";
import ProductTypes from "@/components/Stailika/pages/ProductTypes.vue";
import Contactus from "@/components/Stailika/pages/Contactus.vue";
import BookingForm from "@/components/Stailika/pages/BookingForm.vue";




const routes = [
  { path: "/", name: "landing", component: Landing },
  { path: "/home", name: "home", component: Layout },
  { path: "/book-appointment", name: "book-appointment", component: Appointment },
  { path: "/pricing", name: "pricing", component: Pricing },
  { path: "/shop", name: "shop", component: Shop },
  { path: "/contact", name: "contact", component: Contactus },
  {
    path: '/pricing/product/:name',
    name: 'product-types',
    component: ProductTypes
  },
  {
    path: "/book-appointment/booking/:appointmentType/:date/:time",
    name: "BookingForm",
    component: BookingForm,
    props: true, // ✅ makes params available as props
    
  }
  
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});




export default router;
