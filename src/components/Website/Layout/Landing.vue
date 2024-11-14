<template>
 <!-- Loader component displays while loading -->
 <Loader :loading="loading" v-if="loading" />

<!-- Main content is displayed once loading is complete -->
<div v-else>
  <AppBar />
  <home></home>
  <!-- New section below footer -->
  <Footer />
</div>
</template>

<script>
import {
    useDisplay
} from 'vuetify';
import AppBar from '@/components/Website/Layout/AppBar.vue';
import Home from '@/components/Website/Pages/Home/Home.vue';
import Footer from '@/components/Website/Layout/Footer.vue';
import Loader from '@/components/Loader/Loader.vue';
export default {
    components: {
        AppBar,
        Home,
        Footer,Loader
    },
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
            loading: true, // Initial loading state
            ministriesOpen: false,
            // selectedRoute: '/', // Set "Home" as default selected
           
        };
    },
    computed: {
        filteredMenuItems() {
            return this.menuItems.filter(item => item.label !== "Ministries");
        }
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
        },
        isSelected(route) {
            return this.selectedRoute === route;
        }
    },
    watch: {
        mdAndUp(value) {
            if (value) {
                this.drawer = false;
            }
            this.ministriesOpen = false;
        }
    },
    mounted() {
    // Simulate loading delay for demonstration
    setTimeout(() => {
      this.loading = false; // Set loading to false once the page is ready
    }, 2000); // Adjust this delay as necessary
  },
};
</script>

<style >
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

.nav-link:hover,
.nav-link.selected {
    color: #A82228;
    /* Yellow color */
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

.v-menu .nav-link:hover,
.v-menu .nav-link.selected {
    color: #A82228;
    /* Yellow color for selected/hovered menu items */
}

.v-navigation-drawer .nav-link:hover,
.v-navigation-drawer .nav-link.selected {
    color: #A82228;
    /* Yellow color for hovered/selected drawer items */
}

.v-navigation-drawer .nav-link.selected .v-icon {
    color: #A82228;
    /* Optional: Change icon color to match */
}

.main-color {
    background-color: #A82228;
}

.vision-section {
    background-color: #f9f9f9;
    padding: 40px 20px;
}

.vision-content h2 {
    font-size: 24px;
    margin-bottom: 20px;
}

.vision-content p {
    font-size: 16px;
    color: #333;
}

.links-social .v-list {
    margin: 0;
    padding: 0;
}

.links-social .v-list-item {
    margin: 0 10px;
    /* Adjust spacing between items */
}

.links-social .v-icon {
    font-size: 24px;
    /* Adjust icon size */
}

.links-social .v-list-item:hover {
    color: #A82228;
}
</style>
