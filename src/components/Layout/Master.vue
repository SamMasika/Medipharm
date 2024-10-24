<template>
<v-app :theme="darkTheme ? 'light' : 'dark'" id="app">

    <!-- Increase the width of the drawer -->
    <v-navigation-drawer app v-model="drawer" :width="drawer ? 310 : 64" permanent clipped class="custom-drawer" theme="light">
        <Sidebar />
    </v-navigation-drawer>
    <v-app-bar app scroll-behavior="elevate" class="app-color">
        <v-app-bar-nav-icon @click="drawer = !drawer" :style="{ color: '#A82228' }" ></v-app-bar-nav-icon>
        <h3 class="my-3">TAG-BRT CMS</h3>
        <v-spacer></v-spacer>
        <!-- <v-btn icon @click="toggleTheme" variant="solo-filled">
            <v-icon>{{ darkTheme ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
        </v-btn> -->
        <v-menu open-on-hover>
  <template v-slot:activator="{ props }">
    <v-chip
      v-bind="props"
      class="mx-5"
      :style="{ color: '#A82228' }" 
    >
      <v-icon class="white--text">mdi-account</v-icon> <!-- Force white text -->
      {{ user ? user.name : 'Guest' }}
      <v-icon class="white--text">
        mdi-menu-down
      </v-icon>
    </v-chip>
  </template>
  
  <v-list>
    <v-list-item>
      <v-icon  class="mx-5">
        mdi-account
      </v-icon>Profile
    </v-list-item>
    
    <router-link to="/change-password" style="text-decoration: none; color: inherit;">
      <v-list-item>
        <v-icon  class="mx-5">
          mdi-lock-minus
        </v-icon>Change Password
      </v-list-item>
    </router-link>
    
    <v-list-item @click.prevent="logout">
      <v-icon  class="mx-5">
        mdi-arrow-right-bold-box-outline
      </v-icon> Logout
    </v-list-item>
  </v-list>
</v-menu>


        <v-dialog v-model="showProfileDialog" max-width="600px" align-end>
            <v-card :loading="loading" color="rgba(255, 255, 255, 0.9)">

                <v-card-title style="text-align: center;">Profile</v-card-title>
                <v-card-text align="center">
                    <div class="">
                        <v-icon size="100">mdi-account-circle</v-icon>
                    </div>
                    <div class="my-4 text-subtitle-1">

                    </div>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
            </v-card>
        </v-dialog>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

    <v-footer app>
        <v-container>
            <v-row class="text-center">
                <v-col>{{ new Date().getFullYear() }} @ <strong>BRT-Morogoro</strong></v-col>
            </v-row>
        </v-container>
    </v-footer>
</v-app>
</template>

<script>
import Sidebar from '@/components/Layout/Sidebar.vue'
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    name: 'App',
    components: {
        Sidebar,
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            username: 'auth/registeredName',
        })
    },
    data: () => ({
        showProfileDialog: false,
        drawer: true,
        loaded: false,
        loading: false,
        isLoading: false,
        darkTheme: true, // true for dark theme, false for light theme
        selectedItem: null,
    }),
    methods: {
        ...mapActions({
            logoutAction: 'auth/logout'
        }),
        toggleTheme() {
            this.darkTheme = !this.darkTheme;
        },

        logout() {
            this.logoutAction()
                .then(() => {
                    // After successful logout, redirect to login
                    this.$router.replace({
                        name: 'login'
                    });
                })
                .catch(error => {
                    console.error('Logout error:', error);
                    // Handle error if necessary
                });
        }

    },

};
</script>

<style>
#app {
    background: rgb(215, 218, 218);
}

.custom-drawer {
    transition: width 0.5s ease;
    /* Smooth transition for drawer width */
}
</style>
