import { createRouter, createWebHashHistory } from "vue-router";



import Appointment from "@/components/Medipharm/pages/Appointment.vue";
import Layout from "@/components/Medipharm/Layout/Home.vue";
import Landing from "@/components/Medipharm/Layout/Landing.vue";
import Pricing from "@/components/Medipharm/pages/Pricing.vue";
// import Shop from "@/components/Medipharm/pages/Shop.vue";
import ProductTypes from "@/components/Medipharm/pages/ProductTypes.vue";
import Contactus from "@/components/Medipharm/pages/Contactus.vue";
import BookingForm from "@/components/Medipharm/pages/BookingForm.vue";




const routes = [
  { path: "/", name: "landing", component: Landing },
  { path: "/home", name: "home", component: Layout },
  { path: "/book-appointment", name: "book-appointment", component: Appointment },
  { path: "/pricing", name: "pricing", component: Pricing },
  // { path: "/shop", name: "shop", component: Shop },
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
    props: true, // makes params available as props
    
  }
  
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});




export default router;
