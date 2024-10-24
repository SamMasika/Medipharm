import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import router from './router.js'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import { loadFonts } from './plugins/webfontloader'
import Swal from 'sweetalert2'

// require ('@/store/subscribe');

const app = createApp(App);
app.config.globalProperties.$swal = Swal;

loadFonts();
// axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.baseURL='http://41.59.228.237/brt-cms/public/api/'

// Initialize store and mount app
store.dispatch('auth/initializeStore').then(() => {
  app.use(store);
  app.use(router);
  app.use(vuetify);
  app.mount('#app');
});
