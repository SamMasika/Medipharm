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
                <a v-bind="props" :class="{ 'nav-link': true,  }">
                    About Us
                    <v-icon class="ml-2">mdi-menu-down</v-icon>
                </a>
            </template>
            <v-list>
                <v-list-item v-for="(subitem, subindex) in aboutUsItems" :key="subindex" :class="{ 'nav-link': true, selected: isSelected(subitem.route) }" @click="selectLink(subitem.route)" class="nav-link">
                    <v-list-item-title>
                        {{ subitem.label }}
                    </v-list-item-title>
                    <!-- <v-divider></v-divider> -->
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- Ministries Dropdown Menu -->
        <v-menu class="nav-link d-flex align-center" transition="scale-transition" open-on-hover bottom right>
            <template #activator="{ props }">
                <a v-bind="props" :class="{ 'nav-link': true, selected: isSelected('/churches') }" @click.prevent="selectLink('/churches')">
                    Churches
                    <v-icon class="ml-2">mdi-menu-down</v-icon>
                </a>
            </template>
            <v-list>
                <v-list-item v-for="(subitem, subindex) in churches" :key="subindex" @click="selectLink(subitem.route)" class="nav-link">
                    <v-list-item-title>
                        <!-- <v-icon class="mr-3">{{ subitem.icon }}</v-icon> -->
                        {{ subitem.label }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- Sermons Link -->
        <a href="/sermons" class="nav-link" :class="{ selected: isSelected('/sermons') }" @click.prevent="selectLink('/sermons')">
            Sermons
        </a>

        <!-- Ministries Dropdown Menu -->
        <v-menu class="nav-link d-flex align-center" transition="scale-transition" open-on-hover bottom right>
            <template #activator="{ props }">
                <a v-bind="props" :class="{ 'nav-link': true, selected: isSelected('/fellowships') }" @click.prevent="selectLink('/fellowships')">
                    Fellowships
                    <v-icon class="ml-2">mdi-menu-down</v-icon>
                </a>
            </template>
            <v-list>
                <v-list-item v-for="(subitem, subindex) in fellowships" :key="subindex" @click="selectLink(subitem.route)" class="nav-link">
                    <v-list-item-title>
                        <!-- <v-icon class="mr-3">{{ subitem.icon }}</v-icon> -->
                        {{ subitem.label }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- Ministries Dropdown Menu -->
        <v-menu class="nav-link d-flex align-center" transition="scale-transition" open-on-hover bottom right>
            <template #activator="{ props }">
                <a v-bind="props" :class="{ 'nav-link': true, selected: isSelected('/clusters') }" @click.prevent="selectLink('/clusters')">
                    Clusters
                    <v-icon class="ml-2">mdi-menu-down</v-icon>
                </a>
            </template>
            <v-list>
                <v-list-item v-for="(subitem, subindex) in clusters" :key="subindex" @click="selectLink(subitem.route)" class="nav-link">
                    <v-list-item-title>
                        <!-- <v-icon class="mr-3">{{ subitem.icon }}</v-icon> -->
                        {{ subitem.label }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
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
                        <!-- <v-icon class="mr-3">{{ subitem.icon }}</v-icon> -->
                        {{ subitem.label }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- Ministries Dropdown Menu -->
        <v-menu class="nav-link d-flex align-center" transition="scale-transition" open-on-hover bottom right>
            <template #activator="{ props }">
                <a v-bind="props" :class="{ 'nav-link': true, selected: isSelected('/departments') }" @click.prevent="selectLink('/departments')">
                    Departments
                    <v-icon class="ml-2">mdi-menu-down</v-icon>
                </a>
            </template>
            <v-list>
                <v-list-item v-for="(subitem, subindex) in departments" :key="subindex" @click="selectLink(subitem.route)" class="nav-link">
                    <v-list-item-title>
                        <!-- <v-icon class="mr-3">{{ subitem.icon }}</v-icon> -->
                        {{ subitem.label }}
                    </v-list-item-title>
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
            fellowships: [{
                    label: 'DO NOT PASS ME BY',
                    route: '/ministries/youth',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'PASTORS’ CHILDREN FELLOWSHIP (PCF)',
                    route: '/ministries/women',
                    icon: 'mdi-human-female-female'
                },

            ],
            churches: [{
                    label: 'DO NOT PASS ME BY',
                    route: '/ministries/youth',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'PASTORS’ CHILDREN FELLOWSHIP (PCF)',
                    route: '/ministries/women',
                    icon: 'mdi-human-female-female'
                },

            ],
            clusters: [{
                    label: 'Cluster A',
                    route: '/ministries/youth',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Cluster B',
                    route: '/ministries/women',
                    icon: 'mdi-human-female-female'
                },
                {
                    label: 'Cluster C',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: 'Cluster D',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: 'Cluster E',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: "Cluster H",
                    route: '/ministries/students',
                    icon: 'mdi-school-outline'
                },
                {
                    label: "Cluster J",
                    route: '/ministries/students',
                    icon: 'mdi-school-outline'
                }
            ],
            ministries: [{
                    label: 'CHURCH SAFETY AND SECURITY',
                    route: '/ministries/youth',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'CALEB',
                    route: '/ministries/women',
                    icon: 'mdi-human-female-female'
                },
                {
                    label: 'FAMILY AND MARRIAGE',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: 'RADIO MINISTRY',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: 'DEAF MINISTRY',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: "COURTSHIP TO MARRIAGE",
                    route: '/ministries/students',
                    icon: 'mdi-school-outline'
                }
            ],
            departments: [{
                    label: 'DEPARTMENT OF MEN (CHRIST MEN FELLOWSHIP (CMF)) ',
                    route: '/ministries/youth',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: 'DEPARTMENT OF WOMEN (WANAWAKE WATUMISHI WA KRISTO (WWK))',
                    route: '/ministries/women',
                    icon: 'mdi-human-female-female'
                },
                {
                    label: 'DEPARTMENT OF CHRIST AMBASSADORS (CA’s)',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'DEPARTMENT OF CHILDREN (CHILDREN STUDENT MINISTRY (CSM))',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'DEPARTMENT OF MUSIC AND PRAISE ',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'DEPARTMENT OF DISCIPLESHIP AND LITERATURE',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'DEPARTMENT OF PROJECT AND PHYSICAL DEVELOPMENTS',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'DEPARTMENT OF MONITORING, EVALUATION AND LEARNING',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'DEPARTMENT OF EVANGELISM',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'DEPARTMENT OF PRAYER AND DELIVERANCE',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'DEPARTMENT OF MISSION',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: "DEPARTMENT OF CASFETA CAMPUS",
                    route: '/ministries/students',
                    icon: 'mdi-school-outline'
                }
            ]
        };
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        closeDrawer() {
            this.drawer = false;
        },
        selectLink(route) {
            // Redirect all routes except '/' and '/about-us' to home page
            const routesToRedirect = ['/', '/about'];
            
            if (!routesToRedirect.includes(route)) {
                route = '/'; // Redirect to home page
            }
            
            this.selectedRoute = route;
            this.$router.push(route);
        },
        isSelected(route) {
            return this.selectedRoute === route;
        }
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
    color: #0097A7;
}

.nav-link.selected {
    color: #0097A7;
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
    color: #0097A7;
}

.v-navigation-drawer .nav-link:hover {
    color: #0097A7;
}

.v-navigation-drawer .nav-link.selected {
    color: #0097A7;
}

.myselected-link {
    background-color: #0097A7;
    /* Set your desired background color */
    color: #ffffff;
    /* Set your desired text color */
}
</style>
