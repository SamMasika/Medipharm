<template>
<v-app-bar app  color="white" scroll-behavior="elevate" >
    <v-app-bar-nav-icon @click="toggleDrawer" color="blue-grey lighten-1" class="d-md-none"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-icon size="50">mdi-church</v-icon>
    <v-spacer></v-spacer>

    <!-- Navigation Links Centered, Visible on Medium and Larger Devices Only -->
    <div class="nav-links d-none d-md-flex">
        <a v-for="(item, index) in filteredMenuItems" :key="index" :href="item.route" :class="{ 'nav-link': true, selected: isSelected(item.route) }" @click.prevent="selectLink(item.route)">
            {{ item.label }}
        </a>

        <!-- Ministries with Submenu -->
        <v-menu class="nav-link d-flex align-center" transition="scale-transition" open-on-hover bottom right>
            <template #activator="{ props }">
                <v-btn v-bind="props" text class="nav-link" :class="{ selected: isSelected('/ministries') }" @click.prevent="selectLink('/ministries')">
                    Ministries
                    <v-icon class="ml-2">mdi-chevron-down</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="(subitem, subindex) in ministries" :key="subindex" @click="selectLink(subitem.route)" class="nav-link">
                    <v-list-item-title>
                        <v-icon class="mr-3">{{ subitem.icon }}</v-icon>
                        {{ subitem.label }}
                    </v-list-item-title>
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>
        </v-menu>

        <a href="/contact" class="nav-link" :class="{ selected: isSelected('/contact') }" @click.prevent="selectLink('/contact')">
            Contact Us
        </a>
    </div>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
</v-app-bar>

<v-navigation-drawer v-model="drawer" app temporary @click-outside="closeDrawer" class="d-md-none">
    <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" @click="selectLink(item.route)" class="nav-link">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>

        <v-subheader>Ministries</v-subheader>
        <v-list-group v-model="ministriesOpen" @click="ministriesOpen = false">
            <template #activator>
                <v-list-item :class="{ selected: isSelected('/ministries') }" @click.prevent="selectLink('/ministries')" class="nav-link">
                    <v-list-item-title>Ministries</v-list-item-title>
                </v-list-item>
            </template>
            <v-list-item v-for="(subitem, subindex) in ministries" :key="subindex" @click="selectLink(subitem.route)" class="nav-link">
                <v-list-item-title>
                    <v-icon class="mr-2">{{ subitem.icon }}</v-icon>
                    {{ subitem.label }}
                </v-list-item-title>
            </v-list-item>
            <v-list-item-divider></v-list-item-divider>
            <v-list-item @click="selectLink('/additional-resources')" class="nav-link">
                <v-list-item-title>
                    <v-icon class="mr-2">mdi-folder</v-icon>
                    Additional Resources
                </v-list-item-title>
            </v-list-item>
        </v-list-group>
    </v-list>
</v-navigation-drawer>
</template>

  
  
<script>
import {
    useDisplay
} from 'vuetify';

export default {
    setup() {
        const {
            mdAndUp
        } = useDisplay();
        return {
            mdAndUp
        };
    },
    data() {
        return {
            drawer: false,
            ministriesOpen: false,
            selectedRoute: '/', // Set "Home" as default selected
            menuItems: [{
                    label: 'Home',
                    route: '/'
                },
                {
                    label: 'About Us',
                    route: '/about'
                },
                {
                    label: 'Sermons',
                    route: '/sermons'
                },
                {
                    label: 'Kids',
                    route: '/kids'
                },
                {
                    label: 'Fellowship',
                    route: '/lifecenters'
                },
                {
                    label: 'Contact Us',
                    route: '/contact'
                },
            ],
            ministries: [{
                    label: 'Youth Ministry',
                    route: '/ministries/youth',
                    icon: 'mdi-human-male-female',
                },
                {
                    label: 'Women’s Ministry',
                    route: '/ministries/women',
                    icon: 'mdi-human-female-female',
                },
                {
                    label: 'Men’s Ministry',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male',
                },
                {
                    label: "Student's Ministry",
                    route: '/ministries/students',
                    icon: 'mdi-school-outline',
                },
            ],
        };
    },
    computed: {
        filteredMenuItems() {
            return this.menuItems.filter((item) => item.label !== 'Ministries');
        },
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
            this.drawer = false;
            this.ministriesOpen = false;
        },
        toggleDrawer() {
            this.drawer = !this.drawer;
            this.ministriesOpen = false;
        },
        closeDrawer() {
            this.drawer = false;
            this.ministriesOpen = false;
        },
        selectLink(route) {
            this.selectedRoute = route;
            this.$router.push(route); // Push to the correct route
        },
        isSelected(route) {
            return this.selectedRoute === route;
        },
    },
    watch: {
        mdAndUp(value) {
            if (value) {
                this.drawer = false;
            }
            this.ministriesOpen = false;
        },
    },
};
</script>
  
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.v-app-bar {
    height: 80px;
    /* Adjust this value as needed */
    line-height: 80px;
    /* Aligns text/icons vertically */
    background-color: white;
}

.nav-links {
    display: flex;
    align-items: center;
}

.nav-link {
    font-size: 16px;
    /* Adjust the font size as needed */
    font-family: 'Roboto', sans-serif;
    /* Use Roboto font */
    font-weight: 500;
    /* Semi-bold font weight */
    padding: 15px 20px;
    /* Adjust padding to fit the increased height */
    text-transform: capitalize;
    color: #333;
    text-decoration: none;
    border-radius: 4px;
    transition: color 0.3s;
    display: flex;
    align-items: center;
}

.nav-link:hover {
    color: #00ACC1;
    /* Hover color */
}

.nav-link.selected {
    color: #00ACC1;
    /* Selected color */
}

.v-icon {
    font-size: 24px;
    /* Increase the size of icons */
}

.v-navigation-drawer {
    background-color: #fafafa;
}

.v-navigation-drawer .nav-link .v-icon {
    font-size: 24px;
    /* Increase icon size in the drawer */
}

.v-menu .nav-link:hover {
    color: #00ACC1;
    /* Hover color for menu items */
}

.v-navigation-drawer .nav-link:hover {
    color: #00ACC1;
    /* Hover color for drawer items */
}

.v-navigation-drawer .nav-link.selected {
    color: #00ACC1;
    /* Selected color for drawer items */
}
</style>
