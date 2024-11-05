<template>
<v-app :theme="darkTheme ? 'light' : 'dark'" id="app">
    <!-- Configure the drawer to overlay content on small/medium screens -->
    <!-- <v-navigation-drawer app v-model="drawer" :temporary="isSmallOrMedium" :width="drawer ? 310 : 64" clipped class="custom-drawer" theme="light"> -->
        <Sidebar v-model:drawer="drawer" />
    <!-- </v-navigation-drawer> -->
    <v-app-bar app scroll-behavior="elevate" class="app-color">
        <v-app-bar-nav-icon @click="toggleDrawer" :style="{ color: '#A82228' }"></v-app-bar-nav-icon>
        <h3 class="my-3">BCMS</h3>
        <v-spacer></v-spacer>
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-chip v-bind="props" class="mx-5" :style="{ color: '#A82228' }">
                    <v-icon class="white--text">mdi-account</v-icon>
                    {{ user ? user.name : 'Guest' }}
                    <v-icon class="white--text">mdi-menu-down</v-icon>
                </v-chip>
            </template>
            <v-list>
                <v-list-item>
                    <v-icon class="mx-5">mdi-account</v-icon>Profile
                </v-list-item>
                <router-link to="/change-password" style="text-decoration: none; color: inherit;">
                    <v-list-item>
                        <v-icon class="mx-5">mdi-lock-minus</v-icon>Change Password
                    </v-list-item>
                </router-link>
                <v-list-item @click.prevent="logout">
                    <v-icon class="mx-5">mdi-arrow-right-bold-box-outline</v-icon>Logout
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

    <v-footer app>
        <v-container>
            <v-row class="text-center">
                <v-col> <strong> © {{ new Date().getFullYear() }} TAG Bethel Revival Temple-Morogoro. All rights reserved.</strong> </v-col>
            </v-row>
        </v-container>
    </v-footer>
</v-app>
</template>

<script>
import Sidebar from '@/components/Layout/Sidebar.vue';
import {
    mapGetters,
    mapActions
} from 'vuex';
import {
    useDisplay
} from 'vuetify';
import {
    ref,
    watch
} from 'vue';

import sidebar from '@/mixins/sidebar';
export default {
    mixins: [sidebar],
    name: 'App',
    components: {
        Sidebar,
    },
    data() {
        return {
            drawer: true,
        };
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        }),
    },
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
    },
    setup() {
        const display = useDisplay();
        const isSmallOrMedium = ref(display.mdAndDown.value);

        // Watch for changes in screen size and update `isSmallOrMedium` accordingly
        watch(display.mdAndDown, (newVal) => {
            isSmallOrMedium.value = newVal;
        });

        return {
            isSmallOrMedium
        };
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
