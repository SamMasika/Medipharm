<template>
<v-app-bar app color="white" scroll-behavior="elevate">
    <v-app-bar-nav-icon @click="toggleDrawer" color="blue-grey lighten-1" class="d-md-none"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-img src="@/assets/tag.png" class="v-img"></v-img>
    <v-spacer></v-spacer>

    <!-- Navigation Links Centered, Visible on Medium and Larger Devices Only -->
    <div class="nav-links d-none d-md-flex">
        <!-- Home Link -->
        <a href="/" class="nav-link" :class="{ selected: isSelected('/') }" @click.prevent="selectLink('/')">
            Home
        </a>

        <!-- About Us Dropdown Menu -->
        <v-menu class="nav-link d-flex align-center" transition="scale-transition" open-on-hover bottom right>
            <template #activator="{ props }">
                <a v-bind="props" :class="{ 'nav-link': true, selected: isSelected('/about') }" @click.prevent="selectLink('/about')">
                    About Us
                    <v-icon class="ml-2">mdi-menu-down</v-icon>
                </a>
            </template>
            <v-list>
                <v-list-item v-for="(subitem, subindex) in aboutUsItems" :key="subindex" :class="{ 'nav-link': true, selected: isSelected(subitem.route) }" @click="selectLink(subitem.route)" class="nav-link">
                    <v-list-item-title>
                        {{ subitem.label }}
                    </v-list-item-title>
                    <v-divider></v-divider>
                </v-list-item>
            </v-list>
        </v-menu>

        <!-- Sermons Link -->
        <a href="/sermons" class="nav-link" :class="{ selected: isSelected('/sermons') }" @click.prevent="selectLink('/sermons')">
            Sermons
        </a>

        <!-- Kids Link -->
        <a href="/kids" class="nav-link" :class="{ selected: isSelected('/kids') }" @click.prevent="selectLink('/kids')">
            Kids
        </a>

        <!-- Fellowship Link -->
        <a href="/lifecenters" class="nav-link" :class="{ selected: isSelected('/lifecenters') }" @click.prevent="selectLink('/lifecenters')">
            Fellowship
        </a>

        <!-- Ministries Dropdown Menu -->
        <v-menu class="nav-link d-flex align-center" transition="scale-transition" open-on-hover bottom right>
            <template #activator="{ props }">
                <a v-bind="props" :class="{ 'nav-link': true, selected: isSelected('/ministries') }" @click.prevent="selectLink('/ministries')">
                    Ministries
                    <v-icon class="ml-2">mdi-menu-down</v-icon>
                </a>
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

        <!-- Contact Us Link -->
        <a href="/contact" class="nav-link" :class="{ selected: isSelected('/contact') }" @click.prevent="selectLink('/contact')">
            Contact Us
        </a>
    </div>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
</v-app-bar>

<v-navigation-drawer v-model="drawer" app temporary @click-outside="closeDrawer" class="d-md-none">
    <v-list>
        <!-- Drawer Links -->
        <v-list-item @click="selectLink('/')" class="nav-link">
            <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="selectLink('/about')" class="nav-link">
            <v-list-item-title>About Us</v-list-item-title>
        </v-list-item>
        <v-list-item @click="selectLink('/sermons')" class="nav-link">
            <v-list-item-title>Sermons</v-list-item-title>
        </v-list-item>
        <v-list-item @click="selectLink('/kids')" class="nav-link">
            <v-list-item-title>Kids</v-list-item-title>
        </v-list-item>
        <v-list-item @click="selectLink('/lifecenters')" class="nav-link">
            <v-list-item-title>Fellowship</v-list-item-title>
        </v-list-item>
        <v-list-item @click="selectLink('/contact')" class="nav-link">
            <v-list-item-title>Contact Us</v-list-item-title>
        </v-list-item>

        <v-subheader>Ministries</v-subheader>
        <v-list-group v-model="ministriesOpen" @click="ministriesOpen = false">
            <template #activator>
                <v-list-item @click.prevent="selectLink('/ministries')" class="nav-link">
                    <v-list-item-title>Ministries</v-list-item-title>
                </v-list-item>
            </template>
            <v-list-item @click="selectLink('/ministries/youth')" class="nav-link">
                <v-list-item-title>
                    <v-icon class="mr-2">mdi-human-male-female</v-icon>
                    Youth Ministry
                </v-list-item-title>
            </v-list-item>
            <v-list-item @click="selectLink('/ministries/women')" class="nav-link">
                <v-list-item-title>
                    <v-icon class="mr-2">mdi-human-female-female</v-icon>
                    Women’s Ministry
                </v-list-item-title>
            </v-list-item>
            <v-list-item @click="selectLink('/ministries/men')" class="nav-link">
                <v-list-item-title>
                    <v-icon class="mr-2">mdi-human-male-male</v-icon>
                    Men’s Ministry
                </v-list-item-title>
            </v-list-item>
            <v-list-item @click="selectLink('/ministries/students')" class="nav-link">
                <v-list-item-title>
                    <v-icon class="mr-2">mdi-school-outline</v-icon>
                    Student's Ministry
                </v-list-item-title>
            </v-list-item>
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
export default {
    data() {
        return {
            drawer: false,
            ministriesOpen: false,
            selectedRoute: '/', // Set "Home" as default selected
            aboutUsItems: [{
                    label: 'Know Us',
                    route: '/about'
                },
                {
                    label: 'Plan a Visit',
                    route: '/about/plan-visit'
                },
                {
                    label: 'Our Belief',
                    route: '/about/our-belief'
                }
            ],
            ministries: [{
                    label: 'Youth Ministry',
                    route: '/ministries/youth',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Women’s Ministry',
                    route: '/ministries/women',
                    icon: 'mdi-human-female-female'
                },
                {
                    label: 'Men’s Ministry',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: "Student's Ministry",
                    route: '/ministries/students',
                    icon: 'mdi-school-outline'
                }
            ]
        };
    },
    methods: {
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
            this.$router.push(route); // Navigate to the selected route
        },
        isSelected(route) {
            return this.selectedRoute === route;
        },
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.v-app-bar {
    height: 80px;
    line-height: 80px;
    background-color: white;
}

.v-img {
    height: 50px;
    /* Adjust as needed */
}

.nav-links {
    display: flex;
    align-items: center;
}

.nav-link {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    padding: 15px 20px;
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
}

.nav-link.selected {
    color: #00ACC1;
}

.v-icon {
    font-size: 24px;
}

.v-navigation-drawer {
    background-color: #fafafa;
}

.v-navigation-drawer .nav-link .v-icon {
    font-size: 24px;
}

.v-menu .nav-link:hover {
    color: #00ACC1;
}

.v-navigation-drawer .nav-link:hover {
    color: #00ACC1;
}

.v-navigation-drawer .nav-link.selected {
    color: #00ACC1;
}
</style>
