<template>
<v-navigation-drawer app :model-value="drawer" @update:model-value="$emit('update:drawer', $event)" width="160" class="d-flex align-center">
    <div class="d-flex justify-center">
        <v-avatar size="130" class="mt-5">
            <v-img alt="NIDC Logo" src="@/assets/tag.png" transition="scale-transition" />
        </v-avatar>
    </div>
    <v-divider class="my-3"></v-divider>
    <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" link class="menu-item" :class="{ 'highlight': isOuterActive(item.title) }" @click.stop="openDrawer(item.title)">
            <v-list-item-icon>
                <v-icon color="" >{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-center">
                <v-list-item-title class="item-title">
                    {{ item.title }}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</v-navigation-drawer>

<!-- Secondary Drawer -->
<v-navigation-drawer v-model="currentDrawer" temporary>
    <v-list density="compact" nav class="mt-5">
        <!-- Dynamic content based on currentDrawer -->
        <template v-if="currentDrawer === 'Home'">
            <v-list-item prepend-icon="mdi-view-dashboard" :class="{ 'highlight': isActive('/dashboard') }" @click="navigateTo('/dashboard')" title="Dashboard" class="second-item-title" value="dashboard"></v-list-item>
        </template>

        <template v-if="currentDrawer === 'Members Management'">
            <v-list-item prepend-icon="mdi-account-plus" :class="{ 'highlight': isActive('/add-member') }" @click="navigateTo('/add-member')" title="Add Member" class="second-item-title" value="add-member"></v-list-item>
            <v-list-item prepend-icon="mdi-account-search" :class="{ 'highlight': isActive('/view-members') }" @click="navigateTo('/view-members')" title="View Members" class="second-item-title" value="view-members"></v-list-item>
        </template>

        <template v-if="currentDrawer === 'Leaders Management'">
            <v-list-item prepend-icon="mdi-account-tie" :class="{ 'highlight': isActive('/add-leader') }" @click="navigateTo('/add-leader')" title="Add Leader" class="second-item-title" value="add-leader"></v-list-item>
            <v-list-item prepend-icon="mdi-account-check" :class="{ 'highlight': isActive('/view-leaders') }" @click="navigateTo('/view-leaders')" title="View Leaders" class="second-item-title" value="view-leaders"></v-list-item>
        </template>

        <template v-if="currentDrawer === 'Finance'">
            <v-list-item prepend-icon="mdi-hand-heart" :class="{ 'highlight': isActive('/view-finances') }" @click="navigateTo('/view-finances')" class="second-item-title" title="Offerings" value="view-finances"></v-list-item>
            <v-list-item prepend-icon="mdi-cash" :class="{ 'highlight': isActive('/add-transaction') }" @click="navigateTo('/add-transaction')" class="second-item-title" title="Income Management" value="add-transaction"></v-list-item>
            <v-list-item prepend-icon="mdi-currency-usd-off" :class="{ 'highlight': isActive('/add-transaction') }" @click="navigateTo('/add-transaction')" class="second-item-title" title="Expense Tracking" value="add-transaction"></v-list-item>
        </template>
        <template v-if="currentDrawer === 'Church Programs'">
            <v-list-item prepend-icon="mdi-calendar-multiple" :class="{ 'highlight': isActive('/view-finances') }" @click="navigateTo('/view-finances')" class="second-item-title" title="Weekly Services" value="view-finances"></v-list-item>
            <v-list-item prepend-icon="mdi-calendar-star" :class="{ 'highlight': isActive('/add-transaction') }" @click="navigateTo('/add-transaction')" class="second-item-title" title="Special Events" value="add-transaction"></v-list-item>
        </template>
        <template v-if="currentDrawer === 'Reports'">
            <v-list-item prepend-icon="mdi-calendar-check" :class="{ 'highlight': isActive('/view-finances') }" @click="navigateTo('/view-finances')" class="second-item-title" title="Service Reports" value="view-finances"></v-list-item>
            <v-list-item prepend-icon="mdi-file-chart" :class="{ 'highlight': isActive('/add-transaction') }" @click="navigateTo('/add-transaction')" class="second-item-title" title="Financial Reports" value="add-transaction"></v-list-item>
        </template>

        <template v-if="currentDrawer === 'System Configurations'">
            <v-list-group v-model="usersGroup" append-icon="mdi-menu-right">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" link prepend-icon="mdi-account-group" class="second-item-title">User Management</v-list-item>
                </template>
                <v-list-item v-for="(user, i) in Users" :key="i" :title="user[0]" :prepend-icon="user[1]" :to="user[2]" :value="user[0]" :class="{ 'highlight': isActive(user[2]) }"></v-list-item>
            </v-list-group>
            <v-list-group v-model="usersGroup" append-icon="mdi-menu-right">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" link prepend-icon="mdi-cog" class="second-item-title">Church Settings</v-list-item>
                </template>
                <v-list-item v-for="(church, i) in churches" :key="i" :title="church[0]" :prepend-icon="church[1]" :to="church[2]" :value="church[0]" :class="{ 'highlight': isActive(church[2]) }"></v-list-item>
            </v-list-group>
        </template>
    </v-list>
</v-navigation-drawer>
</template>

<script>
import sidebar from '@/mixins/sidebar';

export default {
    props: {
        drawer: {
            type: Boolean,
            required: true,
        },
    },
    mixins: [sidebar],
    data() {
        return {
            currentDrawer: null,
            usersGroup: false,
            Users: [
                ['Users', 'mdi-account-group-outline', '/users-list'],
                ['Roles', 'mdi-account-group-outline', '/roles-list'],
            ],
            churches: [
                ['Clusters', 'mdi-account-group-outline', '/clusters-list'],
                ['Zones', 'mdi-account-group-outline', '/zones-list'],
            ],
            menuItems: [{
                    title: 'Home',
                    icon: 'mdi-home',
                    routes: ['/dashboard']
                },
                {
                    title: 'Members Management',
                    icon: 'mdi-account-group',
                    routes: ['/add-member', '/view-members']
                },
                {
                    title: 'Leaders Management',
                    icon: 'mdi-account-group-outline',
                    routes: ['/add-leader', '/view-leaders']
                },
                {
                    title: 'Finance',
                    icon: 'mdi-cash',
                    routes: ['/view-finances', '/add-transaction']
                },
                {
                    title: 'Church Programs',
                    icon: 'mdi-calendar',
                    routes: ['/church-programs']
                },
                {
                    title: 'Reports',
                    icon: 'mdi-file-document',
                    routes: ['/reports']
                },
                // {
                //     title: 'Bulk SMS',
                //     icon: 'mdi-message-text',
                //     routes: ['/bulk-sms']
                // },
                {
                    title: 'System Configurations',
                    icon: 'mdi-wrench',
                    routes: ['/settings', '/permissions', '/users-list', '/clusters-list', '/roles-list']
                },
            ],
        };
    },
    methods: {
        openDrawer(title) {
            this.currentDrawer = this.currentDrawer === title ? null : title;
            this.usersGroup = false;
        },
        navigateTo(route) {
            this.$router.push(route);
        },
        isActive(route) {
            return this.$route.path === route;
        },
        isOuterActive(title) {
            const item = this.menuItems.find((item) => item.title === title);
            return item ? item.routes.some((route) => this.isActive(route)) : false;
        },
    },
};
</script>

<style scoped>
.v-navigation-drawer {
    width: 160px;
    padding: 8px;
}

.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    margin-bottom: 10px;
    border-radius: 8px;
    transition: background-color 0.3s;
    text-align: center;
}

.menu-item:hover,
.highlight {
    background-color: #e9d3cd;
    color: #a82228;
}

.v-list-item-icon {
    font-size: 32px;
    color: #505050;
    margin-bottom: 8px;
}

.item-title {
    font-size: 14px;
    font-weight: 500;
    color: #303030;
    text-align: center;
    line-height: 1.3;
    white-space: normal;
    word-wrap: break-word;
}

.second-item-title {
    font-size: 14px;
    font-weight: 500;
    color: #303030;
    line-height: 1.3;
    white-space: normal;
    word-wrap: break-word;
}

/* Responsive adjustments */
@media (max-width: 600px) {
    .v-navigation-drawer {
        width: 130px;
    }

    .item-title {
        font-size: 12px;
    }

    .v-list-item-icon {
        font-size: 24px;
    }
}

.list-item-spacing {
    margin-bottom: 8px;
    /* Add spacing between list items */
}
</style>
