<template>
<v-app>
    <!-- First Navigation Drawer with Avatar and Main Menu -->
    <v-navigation-drawer permanent rail>
        <v-list density="compact" nav class="my-5 mt-5">
            <v-list-item v-for="([title, icon], i) in dashboard" :key="i" @click="selectItem(title)" :class="['nav-item', 'list-item-spacing', { 'selected-item': selectedItem === title, 'hover-item': hoverItem === title }]" @mouseover="hoverItem = title" @mouseleave="hoverItem = null">
                <template v-slot:prepend>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ props }">
                            <v-icon size="25" v-bind="props">{{ icon }}</v-icon>
                        </template>
                        <span>{{ title }}</span>
                    </v-tooltip>
                </template>
                <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item>
        </v-list>

        <v-list density="compact" nav class="my-5 mt-5">
            <v-list-item v-for="([title, icon], i) in Contents" :key="i" @click="selectItem(title)" :class="['nav-item', 'list-item-spacing', { 'selected-item': selectedItem === title, 'hover-item': hoverItem === title }]" @mouseover="hoverItem = title" @mouseleave="hoverItem = null">
                <template v-slot:prepend>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ props }">
                            <v-icon size="25" v-bind="props">{{ icon }}</v-icon>
                        </template>
                        <span>{{ title }}</span>
                    </v-tooltip>
                </template>
                <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        <v-list density="compact" nav class="my-5 mt-5">
            <v-list-item v-for="([title, icon], i) in Leaders" :key="i" @click="selectItem(title)" :class="['nav-item', 'list-item-spacing', { 'selected-item': selectedItem === title, 'hover-item': hoverItem === title }]" @mouseover="hoverItem = title" @mouseleave="hoverItem = null">
                <template v-slot:prepend>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ props }">
                            <v-icon size="25" v-bind="props">{{ icon }}</v-icon>
                        </template>
                        <span>{{ title }}</span>
                    </v-tooltip>
                </template>
                <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item>
        </v-list>

        <v-list density="compact" nav class="my-5 mt-5">
            <v-list-item v-for="([title, icon], i) in Finance" :key="i" @click="selectItem(title)" :class="['nav-item', 'list-item-spacing', { 'selected-item': selectedItem === title, 'hover-item': hoverItem === title }]" @mouseover="hoverItem = title" @mouseleave="hoverItem = null">
                <template v-slot:prepend>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ props }">
                            <v-icon size="25" v-bind="props">{{ icon }}</v-icon>
                        </template>
                        <span>{{ title }}</span>
                    </v-tooltip>
                </template>
                <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item>
        </v-list>

        <v-list density="compact" nav class="my-5 mt-5">
            <v-list-item v-for="([title, icon], i) in Settings" :key="i" @click="selectItem(title)" :class="['nav-item', 'list-item-spacing', { 'selected-item': selectedItem === title, 'hover-item': hoverItem === title }]" @mouseover="hoverItem = title" @mouseleave="hoverItem = null">
                <template v-slot:prepend>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ props }">
                            <v-icon size="25" v-bind="props">{{ icon }}</v-icon>
                        </template>
                        <span>{{ title }}</span>
                    </v-tooltip>
                </template>
                <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <!-- Second Navigation Drawer with Scrollable Content and Prepended Icons -->
    <v-navigation-drawer permanent class="drawer-custom">
        <div class="d-flex justify-center">
            <v-avatar size="150" class="mt-5">
                <v-img alt="NIDC Logo" src="@/assets/tag.png" transition="scale-transition" />
            </v-avatar>
        </div>
        <v-divider class="mt-4"></v-divider>

        <v-sheet class="pa-4">
            <v-list class="mt-3">
                <v-list-item rounded="lg" v-for="(item, i) in dynamicQuickLinks" :key="i" @click="navigate(item.path)" :class="['quick-link', 'list-item-spacing', { 'selected-item': selectedQuickLink === item.path, 'hover-item': hoverItem === item.text }]" @mouseover="hoverItem = item.text" @mouseleave="hoverItem = null">
                    <v-icon class="mr-3">{{ item.icon || 'mdi-link' }}</v-icon>
                    {{ item.text }}
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-navigation-drawer>
</v-app>
</template>

<script>
export default {
    data() {
        return {
            selectedItem: this.getSelectedItem(), // Get initial selected item based on the current route
            hoverItem: null, // Track hovered item
            selectedQuickLink: this.$route.path, // Set the selected quick link to the current route path
            dashboard: [
                ['Home', 'mdi-home']
            ],
            Contents: [
                ['Membership Management', 'mdi-file-chart-outline']
            ],
            Leaders: [
                ['Leaders Management', 'mdi-lead-pencil']
            ],
            Finance: [
                ['Finance Management', 'mdi-cash']
            ],
            Settings: [
                ['System Configurations', 'mdi-wrench']
            ],
            quickLinks: {
                Home: [{
                        text: 'Dashboard',
                        path: '/dashboard',
                        icon: 'mdi-view-dashboard'
                    },
                   
                   
                ],
                'Membership Management': [{
                        text: 'View Members',
                        path: '/members',
                        icon: 'mdi-account-group'
                    },
                    {
                        text: 'Membership Reports',
                        path: '/membership-reports',
                        icon: 'mdi-file-document'
                    },
                ],
                'Leaders Management': [{
                        text: 'View Leaders',
                        path: '/members',
                        icon: 'mdi-account-group'
                    },
                    {
                        text: 'Leadership Reports',
                        path: '/membership-reports',
                        icon: 'mdi-file-document'
                    },
                ],
                'Finance Management': [{
                        text: 'Income Management',
                        path: '/income-management',
                        icon: 'mdi-cash'
                    },
                    {
                        text: 'Expense Tracking',
                        path: '/expense-tracking',
                        icon: 'mdi-currency-usd-off'
                    },
                    // {
                    //     text: 'Budgeting',
                    //     path: '/budgeting',
                    //     icon: 'mdi-calculator'
                    // },
                    {
                        text: 'Financial Reports',
                        path: '/financial-reports',
                        icon: 'mdi-file-chart'
                    },
                    {
                        text: 'Offerings',
                        path: '/donations',
                        icon: 'mdi-hand-heart'
                    },
                    // {
                    //     text: 'Bank Reconciliation',
                    //     path: '/bank-reconciliation',
                    //     icon: 'mdi-bank'
                    // },
                    // {
                    //     text: 'Audit Logs',
                    //     path: '/audit-logs',
                    //     icon: 'mdi-file-document-outline'
                    // }
                ],
                'System Configurations': [{
                        text: 'Users',
                        path: '/users-list',
                        icon: 'mdi-account-multiple'
                    },
                    {
                        text: 'Roles & Permissions',
                        path: '/roles-list',
                        icon: 'mdi-shield-lock'
                    },
                    {
                        text: 'Clusters',
                        path: '/clusters-list',
                        icon: 'mdi-account-group-outline'
                    },
                    {
                        text: 'Calendar',
                        path: '/events',
                        icon: 'mdi-calendar'
                    },
                    {
                        text: 'Churches',
                        path: '/events',
                        icon: 'mdi-calendar'
                    },
                   
                ]
            },
        };
    },
    created() {
        this.selectedItem = this.getSelectedItem(); // Set selectedItem after component creation
    },
    computed: {
        dynamicQuickLinks() {
            return this.quickLinks[this.selectedItem] || [];
        },
    },
    methods: {
        selectItem(item) {
            this.selectedItem = item; // Update selected item
            this.selectedQuickLink = this.$route.path; // Keep the selected quick link updated
        },
        navigate(path) {
            this.selectedQuickLink = path; // Update selected quick link
            this.$router.push(path); // Navigate using Vue Router
        },
        getSelectedItem() {
            if (!this.quickLinks) {
                return 'Dashboard'; // Default item if quickLinks is not defined
            }
            // Iterate through the quickLinks to find the corresponding menu item for the current route
            for (const [item, links] of Object.entries(this.quickLinks)) {
                for (const link of links) {
                    if (link.path === this.$route.path) {
                        return item; // Return the main menu item
                    }
                }
            }
            return 'Dashboard'; // Default item if no match is found
        },

    },
    watch: {
        '$route'(to) {
            // Update selected item and quick link when route changes
            this.selectedItem = this.getSelectedItem();
            this.selectedQuickLink = to.path;
        },
    },
};
</script>

<style scoped>
.selected-item {
    background-color: #E9D3CD;
    color: #A82228;
}

.hover-item {
    background-color: #E9D3CD;
    color: #A82228;
}

.drawer-custom {
    background-color: #ffffff !important;
}

.nav-item {
    cursor: pointer;
}

.list-item-spacing {
    margin-bottom: 8px;
    /* Add spacing between list items */
}
</style>
