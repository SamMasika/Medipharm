<template>
<!-- App.vue -->

<v-app :theme="darkTheme ? 'light' : 'dark'" id="app">
    <div class="overlay"></div>
    <v-navigation-drawer app v-model="drawer">
        <Sidebar />
    </v-navigation-drawer>
    <v-app-bar app scroll-behavior="elevate" dark>
        <v-app-bar-nav-icon @click="drawer=!drawer" color="blue-grey lighten-1" class="mx-5"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <!-- <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" color="blue-grey darken-3" rounded="xl" label="Search" single-line flat hide-details variant="solo-filled"></v-text-field> -->
        <v-spacer></v-spacer>

        <v-btn icon @click="toggleTheme" variant="solo-filled">
            <v-icon class="custom-icon">{{ darkTheme ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
        </v-btn>
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-chip v-bind="props" class="mx-5 chip-color">
                    <v-icon>mdi-account</v-icon>
                    {{user.name}}
                    <v-icon>
                        mdi-menu-down
                    </v-icon>
                </v-chip>
            </template>
            <v-list>
                <v-list-item>
                    <v-icon color="blue-grey darken-3" class="mx-5">
                        mdi-account
                    </v-icon>Profile
                </v-list-item>
                <router-link to="/change-password" style="text-decoration: none; color: inherit;">
                    <v-list-item>
                        <v-icon color="blue-grey darken-3" class="mx-5">
                            mdi-lock-minus
                        </v-icon>Change Password
                    </v-list-item>
                </router-link>
                <v-list-item @click.prevent="logout">
                    <v-icon color="blue-grey darken-3" class="mx-5">
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
        <v-container fluid class="ma-2">
            <router-view></router-view>
        </v-container>
    </v-main>

    <v-footer app>
        <v-container>
            <v-row class="text-center">
                <v-col>
                    {{ new Date().getFullYear() }} @Banal TechnologiesTz
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
                    this.$router.replace({
                        name: 'login'
                    })
                })
        }
    },

};
</script>

<style>
.custom-color {
    color: #37474F;
    /* Change this to any color you desire */
}

.greenAccent {
    color: #37474F;
}

body {
    font-family: 'Roboto Slab', sans-serif;
}

.btn {
    text-transform: none !important;
    /* font-family: "Roboto", sans-serif; */

}

.button-color {
    background-color: #3674B5 !important;
    color: white !important;
}

.custom-icon {
    color: #3674B5 !important;
}

.chip-color {
    background-color: #3674B5 !important;
    color: white !important;
}

/* #app {
    background: white;
    background-image: url("@/assets/hard3.jpg");
} */

/* .background-container {
        position: relative;
        overflow: hidden;
        height: 100vh;
        
    }
    
    .background-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        background-size: cover;
        background-position: center;
        z-index: -1;
        animation: moveBackground 30s linear infinite;
    } */

@keyframes moveBackground {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}

.footer {
    margin-top: auto;
}

.default-color {
    color: #37474F;
    /* Set your desired default text color */
}

.btn {
    text-transform: none !important;
    font-family: "Roboto", sans-serif;
    font-size: 60px;
}

.toaster-alert {
    width: 800px;
    height: 200px;
    font-size: 24px;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
}

.my-list-item-active {
    background-color: lightblue !important;
}

.pagination-no-elevation .v-pagination__item,
.pagination-no-elevation .v-pagination__icon {
    box-shadow: none;
}

/* Remove elevation from pagination arrows */
.pagination-no-elevation .v-pagination__navigation {
    box-shadow: none;
}

.custom-dialog {
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.text-right .v-pagination {
    justify-content: flex-end;
}

.custom-select {
    max-width: 70px;
    /* Adjust the width as needed */
    font-size: 12px;
    /* Adjust the font size as needed */
}

.btn-text {
    text-transform: none !important;
}
</style>
