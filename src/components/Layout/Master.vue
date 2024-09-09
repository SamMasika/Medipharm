<template>
<!-- App.vue -->

<v-app :theme="darkTheme ? 'light' : 'dark'" id="app">
    <div class="overlay"></div>
    <v-app-bar app elevation="1">
        <v-app-bar-nav-icon @click="drawer=!drawer" color="blue-grey lighten-1"></v-app-bar-nav-icon>
        <h2 class=" mx-3">Bethel Revival Temple Portal</h2>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" rounded="xl" label="Search"  single-line flat hide-details variant="solo-filled"></v-text-field>
        <v-spacer></v-spacer>

        <v-btn icon @click="toggleTheme">
            <v-icon>{{ darkTheme ? 'mdi-lightbulb' : 'mdi-lightbulb-on' }}</v-icon>
        </v-btn>
        <v-menu offset-y rounded-xl>
            <template v-slot:activator="{ on, attrs }">
                <v-chip medium v-bind="attrs" v-on="on" elevation="0" color="blue-grey-darken-3" >
                    <v-icon>mdi-account</v-icon>
                    Administrator
                    <v-icon>
                        mdi-menu-down
                    </v-icon>
                </v-chip>
            </template>
            <v-list rounded color="rgba(255, 255, 255, 1)">
                <v-list-item @click="showProfileDialog = true">
                    <v-icon color="blue-grey-darken-3">
                        mdi-account
                    </v-icon>Profile
                    <v-list-text>
                    </v-list-text>
                </v-list-item>
                <router-link to="/change-password" style="text-decoration: none; color: inherit;">
                    <v-list-item>
                        <v-icon color="blue-grey-darken-3">
                            mdi-lock-minus
                        </v-icon>Change Password
                        <v-list-text>
                        </v-list-text>
                    </v-list-item>
                </router-link>
                <v-list-item @click.prevent="logout">
                    <v-icon color="blue-grey-darken-3">
                        mdi-arrow-right-bold-box-outline
                    </v-icon> Logout
                    <v-list-text>
                    </v-list-text>
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

    <v-navigation-drawer app v-model="drawer" :style="{ width: '260px' }">
        <Sidebar />
    </v-navigation-drawer>
    <v-main>
        <router-view></router-view>
    </v-main>
    <v-footer app>
        <v-container>
            <v-row class="text-center">
                <v-col>
                    {{ new Date().getFullYear() }} @ <strong>BRT-Morogoro</strong>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</v-app>
</template>

<script>
import Sidebar from '@/components/Layout/Sidebar.vue'
export default {
    name: 'App',
    components: {
        Sidebar,
    },
    // computed: {
    //     ...mapGetters({
    //         authenticated: 'auth/authenticated',
    //         user: 'auth/user',
    //         username: 'auth/userName',
    //     })
    // },
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
        toggleTheme() {
            this.darkTheme = !this.darkTheme;
        },
    },

};
</script>

<style>
body {
    font-family: 'Roboto Slab', sans-serif;
}

#app {
    background: rgb(215, 218, 218);
    /* background-image: url("@/assets/hard3.jpg"); */
}

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
</style>
