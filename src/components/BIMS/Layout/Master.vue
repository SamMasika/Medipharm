<template>
<v-app :theme="darkTheme ? 'dark' : 'light'" id="app">
    <div class="overlay"></div>

    <!-- Conditionally show the drawer -->
   <v-navigation-drawer app v-model="drawer" v-if="user?.company?.isComplete !== false">
        <Sidebar />
    </v-navigation-drawer>

    <v-app-bar app scroll-behavior="elevate" dark>
        <!-- Conditionally hide nav icon if company is not complete -->
        <v-app-bar-nav-icon v-if="user?.company?.isComplete !== false" @click="drawer = !drawer" color="blue-grey lighten-1" class="mx-5"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>

        <v-btn icon @click="toggleTheme" variant="solo-filled">
            <v-icon class="custom-icon">{{ darkTheme ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
        </v-btn>

        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-chip v-bind="props" class="mx-5 chip-color">
                    <v-icon>mdi-account</v-icon>
                    <span v-if="user">{{ user.name }}</span>
                    <span v-else>Guest</span>
                    <v-icon>mdi-menu-down</v-icon>
                </v-chip>
            </template>
            <v-list>
                <v-list-item>
                    <v-icon color="blue-grey darken-3" class="mx-5">mdi-account</v-icon>Profile
                </v-list-item>
                <router-link to="/change-password" style="text-decoration: none; color: inherit;">
                    <v-list-item>
                        <v-icon color="blue-grey darken-3" class="mx-5">mdi-lock-minus</v-icon>Change Password
                    </v-list-item>
                </router-link>
                <v-list-item @click="logout">
                    <v-list-item-title>
                        <v-icon color="blue-grey darken-3" class="mx-5">
                            mdi-arrow-right-bold-box-outline
                        </v-icon> Logout
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    <v-main>
        <v-container fluid class="ma-2">
            <router-view></router-view>
        </v-container>
    </v-main>

    <v-footer app>
        <v-container>
            <v-row justify="center" align="center" class="text-center">
                <v-col cols="auto">
                    <span class="headline font-weight-bold">Banal TechnologiesTz</span>
                </v-col>
                <v-col cols="auto">
                    <span class="body-1">© {{ new Date().getFullYear() }} All Rights Reserved</span>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</v-app>
</template>

<script>
import Sidebar from './Sidebar.vue';
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
        })
    },
    data: () => ({
        drawer: true,
        darkTheme: false, // Default to light theme
    }),
    methods: {
        ...mapActions({
            logoutAction: 'auth/logout',
        }),

        logout() {
            this.logoutAction()
                .then(() => {
                    this.$router.replace({
                        name: 'login'
                    });
                })
                .catch((error) => {
                    console.error('Logout error:', error);
                });
        },
        toggleTheme() {
            this.darkTheme = !this.darkTheme;
        },
        setThemeBasedOnTime() {
            const hour = new Date().getHours();
            this.darkTheme = hour >= 18 || hour < 6; // Dark theme from 6 PM to 6 AM
        }
    },
    created() {
        this.setThemeBasedOnTime();
        setInterval(this.setThemeBasedOnTime, 60000); // Check every minute
    }
};
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.custom-icon {
    color: #3674B5 !important;
}

.chip-color {
    background-color: #3674B5 !important;
    color: white !important;
}

.button-color {
    background-color: #3674B5 !important;
    color: white !important;
}
</style>
