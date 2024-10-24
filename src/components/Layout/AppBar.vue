<template>
<v-app-bar app color="white" scroll-behavior="elevate">
    <!-- Mobile Menu Icon (Visible only on small and medium devices) -->
    <v-app-bar-nav-icon @click="toggleDrawer" color="blue-grey lighten-1" class="d-md-none"></v-app-bar-nav-icon>
    <!-- Logo -->
    <v-img src="@/assets/tag.png" class="v-img mx-3"></v-img>

    <!-- Centered Navigation Links (Visible on medium and larger devices) -->
    <v-spacer></v-spacer>
    <div class="nav-links d-none d-md-flex">
        <a href="/" class="nav-link" :class="{ selected: isSelected('/') }" @click.prevent="selectLink('/')">Home</a>

        <!-- About Us Dropdown Menu -->

        <v-menu open-on-hover bottom>
            <template #activator="{ props }">
                <a v-bind="props" class="nav-link">About Us<v-icon class="ml-2">mdi-menu-down</v-icon></a>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in aboutUsItems" :key="index" @click="selectLink(item.route)" class="nav-link">
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <!-- Churches Dropdown Menu -->
        <v-menu open-on-hover bottom>
            <template #activator="{ props }">
                <a v-bind="props" class="nav-link">Churches<v-icon class="ml-2">mdi-menu-down</v-icon></a>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in churches" :key="index" @click="selectLink(item.route)" class="nav-link">
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <a href="/sermons" class="nav-link" :class="{ selected: isSelected('/sermons') }" @click.prevent="selectLink('/sermons')">Sermons</a>

        <!-- Fellowships Dropdown Menu -->
        <!-- <v-menu open-on-hover bottom>
            <template #activator="{ props }">
                <a v-bind="props" class="nav-link">Fellowships<v-icon class="ml-2">mdi-menu-down</v-icon></a>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in fellowships" :key="index" @click="selectLink(item.route)" class="nav-link">
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu> -->

        <!-- Ministries Dropdown Menu -->
        <v-menu open-on-hover bottom>
            <template #activator="{ props }">
                <a v-bind="props" class="nav-link">Ministries<v-icon class="ml-2">mdi-menu-down</v-icon></a>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in ministries" :key="index" @click="selectLink(item.route)" class="nav-link">
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu open-on-hover bottom>
            <template #activator="{ props }">
                <a v-bind="props" class="nav-link">Departments<v-icon class="ml-2">mdi-menu-down</v-icon></a>
            </template>
            <v-list>
                <v-list-item v-for="(item, index) in departments" :key="index" @click="selectLink(item.route)" class="nav-link">
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <a href="/contact" class="nav-link" :class="{ selected: isSelected('/login') }" @click.prevent="selectLink('/login')">BCMS</a>
        <a href="/contact" class="nav-link" :class="{ selected: isSelected('/contact') }" @click.prevent="selectLink('/contact')">Contact Us</a>
    </div>
    <v-spacer></v-spacer>

</v-app-bar>
<!-- Mobile Navigation Drawer (Visible on small and medium devices) -->
<v-navigation-drawer v-model="drawer" app temporary fixed class="d-md-none">
    <v-list class="my-8">
        <v-list-item @click="selectLink('/')">Home</v-list-item>

        <v-list-group v-model="isAboutUsOpen" @click:open="toggleAboutUsOpen" append-icon="mdi-menu-right">
            <template v-slot:activator>
                <v-list-item>About Us</v-list-item>
            </template>
            <v-list-item v-for="(item, index) in aboutUsItems" :key="index" @click="selectLink(item.route)">
                {{ item.label }}
            </v-list-item>
        </v-list-group>

        <v-list-group v-model="isChurchesOpen" @click:open="toggleChurchesOpen" append-icon="mdi-menu-right">
            <template v-slot:activator>
                <v-list-item>Churches</v-list-item>
            </template>
            <v-list-item v-for="(item, index) in churches" :key="index" @click="selectLink(item.route)">
                {{ item.label }}
            </v-list-item>
        </v-list-group>

        <v-list-item @click="selectLink('/sermons')">Sermons</v-list-item>

        <v-list-group v-model="isFellowshipsOpen" @click:open="toggleFellowshipsOpen" append-icon="mdi-menu-right">
            <template v-slot:activator>
                <v-list-item>Fellowships</v-list-item>
            </template>
            <v-list-item v-for="(item, index) in fellowships" :key="index" @click="selectLink(item.route)">
                {{ item.label }}
            </v-list-item>
        </v-list-group>

        <v-list-group v-model="isMinistriesOpen" @click:open="toggleMinistriesOpen" append-icon="mdi-menu-right">
            <template v-slot:activator>
                <v-list-item>Ministries</v-list-item>
            </template>
            <v-list-item v-for="(ministry, i) in ministries" :key="i" @click="selectLink(ministry.route)">
                {{ ministry.label }}
            </v-list-item>
        </v-list-group>

        <v-list-group v-model="isDepartmentOpen" @click:open="toggleDepartmentsOpen" append-icon="mdi-menu-right">
            <template v-slot:activator>
                <v-list-item>Departments</v-list-item>
            </template>
            <v-list-item v-for="(department, i) in departments" :key="i" @click="selectLink(department.route)">
                {{ department.label }}
            </v-list-item>
        </v-list-group>

        <v-list-item @click="selectLink('/contact')">Contact Us</v-list-item>
    </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            isAboutUsOpen: false,
            isChurchesOpen: false,
            isFellowshipsOpen: false,
            isMinistriesOpen: false,
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
        
            churches :[
    {
        label: 'Main Church (Swahili Church)',
        route: '/churches/main',
        icon: 'mdi-account-group-outline'
    },
    {
        label: 'International Church',
        route: '/churches/international',
        icon: 'mdi-human-child'
    },
    {
        label: 'Victory Church',
        route: '/churches/victory',
        icon: 'mdi-human-male-female'
    },
    {
        label: 'Deaf Church',
        route: '/churches/deaf',
        icon: 'mdi-human-male-female'
    },
    {
        label: 'Children Church',
        route: '/churches/children',
        icon: 'mdi-human-male-child'
    }
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
                    label: 'Church Safety and Security',
                    route: '/ministries/youth',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Caleb',
                    route: '/ministries/women',
                    icon: 'mdi-human-female-female'
                },
                {
                    label: 'Family and Marriage',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: 'Radio Ministry',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: 'Deaf Ministry',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: 'Courtship to Marriage',
                    route: '/ministries/students',
                    icon: 'mdi-school-outline'
                }
            ],
            departments: [{
                    label: 'Men (Christ Men Fellowship (CMF))',
                    route: '/ministries/youth',
                    icon: 'mdi-human-male-male'
                },
                {
                    label: 'Women (Wanawake Watumishi Wa Kristo (WWK))',
                    route: '/ministries/women',
                    icon: 'mdi-human-female-female'
                },
                {
                    label: 'Christ Ambassadors (CA’s)',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Children (Children Student Ministry (CSM))',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Music and Praise',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Discipleship and Literature',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Project and Physical Developments',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Monitoring, Evaluation and Learning',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Evangelism',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Prayer and Deliverance',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'Mission',
                    route: '/ministries/men',
                    icon: 'mdi-human-male-female'
                },
                {
                    label: 'CASFETA Campus',
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
        selectLink(route) {
            const routesToRedirect = ['/', '/about', '/calendar','/sermons','/contact','/login','/belief'];

if (!routesToRedirect.includes(route)) {
    route = '/'; // Redirect to home page
}

            this.$router.push(route);
            this.drawer = false;
        },
      
        isSelected(route) {
            return this.$route.path === route;
        },
        toggleAboutUsOpen() {
            this.isAboutUsOpen = !this.isAboutUsOpen;
        },
        toggleChurchesOpen() {
            this.isChurchesOpen = !this.isChurchesOpen;
        },
        toggleFellowshipsOpen() {
            this.isFellowshipsOpen = !this.isFellowshipsOpen;
        },
        toggleMinistriesOpen() {
            this.isMinistriesOpen = !this.isMinistriesOpen;
        },
        toggleDepartmentsOpen() {
            this.isDepartmentOpen = !this.isDepartmentOpen;
        }
    }
};
</script>

<style scoped>
.nav-links {
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-link {
    margin: 0 10px;
    font-size: 16px;
    color: #000;
    cursor: pointer;
    text-decoration: none;
}

.nav-link.selected {
    color: #A82228;
    font-weight: bold;
}

.v-app-bar {
    padding: 0 20px;
}

.v-img {
    max-width: 120px;
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
}

@media (min-width: 768px) {
    .d-md-none {
        display: none;
    }
}

.v-app-bar {
    z-index: 10;
    /* Ensure the app-bar is on top */
}

.v-navigation-drawer {
    z-index: 9;
    /* Drawer should be below app-bar */
}
</style>
