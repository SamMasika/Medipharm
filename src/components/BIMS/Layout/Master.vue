<template>
<v-app :theme="darkTheme ? 'dark' : 'light'" id="app">
    <div class="overlay"></div>
    <v-navigation-drawer app v-model="drawer">
        <Sidebar />
    </v-navigation-drawer>
    <v-app-bar app scroll-behavior="elevate" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer" color="blue-grey lighten-1" class="mx-5"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleTheme" variant="solo-filled">
            <v-icon class="custom-icon">{{ darkTheme ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
        </v-btn>
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-chip v-bind="props" class="mx-5 chip-color">
                    <v-icon>mdi-account</v-icon>
                    {{ user.name }}
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
                    <v-icon color="blue-grey darken-3" class="mx-5">
                        mdi-arrow-right-bold-box-outline
                    </v-icon> Logout
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
            <v-row class="text-center">
                <v-col>{{ new Date().getFullYear() }} @Banal TechnologiesTz</v-col>
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
            logoutAction: 'auth/logout'
        }),
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
