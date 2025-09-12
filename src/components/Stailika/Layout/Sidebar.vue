<template>
<div class="my-5">
    <div align="center" class="my-3 emoji">
        <!-- <v-img alt="Banal Logo" v-if="user?.company?.image" :src="getImageUrl(user.company.image)" transition="scale-transition" cover max-height="120" /> -->
        <v-img alt="Banal Logo" src="@/assets/stailika.png" transition="scale-transition" max-width="130" />
        
        <!-- <v-icon v-else size="130" class="default-color">mdi-account-circle</v-icon> -->
    </div>
    <v-list nav active-class="my-selected-item">
        <v-list-item v-for="([title, icon, path], i) in dashboard" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to Dashboard'"></v-list-item>
        <v-list-group value="Products" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-cube" title="Products Management" v-tooltip="'Manage Products'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Products" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
        <v-list-group value="Suppliers" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-truck" title="Suppliers" v-tooltip="'Manage Suppliers'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Suppliers" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
        <v-list-group value="Inventory" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-package" title="Inventory Management" v-tooltip="'Manage Inventory'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Inventory" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
        <v-list-group value="SalesTransactions" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-cart" title="Sales & Transactions" v-tooltip="'Manage Sales and Transactions'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in SalesTransactions" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
        <v-list-group value="Accounts" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-bank" title="Accounts" v-tooltip="'Manage Accounts'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Accounts" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
        <v-list-group value="Expenses" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-cash-minus" title="Expenses" v-tooltip="'Manage Expenses'"></v-list-item>
            </template>
            <v-list-item title="Expenses" prepend-icon="mdi-cash-minus" router to="/expenses" value="Expenses" v-tooltip="'Go to Expenses'"></v-list-item>
        </v-list-group>

        <v-list-group value="Reports" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-chart-line" title="Reports" v-tooltip="'View Reports'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Reports" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
        <!-- <v-list-group value="Staff" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-account-multiple-outline" title=" Staff" v-tooltip="'Manage Staff'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Staff" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group> -->
        <v-list-group value="Settings" prepend-icon="mdi-cog" append-icon="mdi-menu-right">
            <template #activator="{ props }">
                <v-list-item v-bind="props" title="Settings"></v-list-item>
            </template>

            <!-- User Management group inside Settings -->
            <v-list-group value="UserManagement" no-action prepend-icon="mdi-account-group" append-icon="mdi-menu-right">
                <template #activator="{ props }">
                    <v-list-item v-bind="props" title="User Management" v-tooltip="'Manage Users'"></v-list-item>
                </template>
                <v-list-item v-for="([title, icon, path], i) in UserManagement" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
            </v-list-group>
            <v-list-item title="Company Profile" prepend-icon="mdi-domain" to="/company-profile" />
            <v-list-item title="Change Password" prepend-icon="mdi-lock" to="/change-password" />
            <!-- Add more settings items below if needed -->
        </v-list-group>

        <v-list-group value="Support" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-help-circle" title="Support" v-tooltip="'Get Support'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Support" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
    </v-list>
</div>
</template>

<script>
import {
    mapGetters,
} from 'vuex'
export default {
    data() {
        return {
            openedGroups: {},
            drawer: true,
            rail: false,
            dashboard: [
                ['Dashboard', 'mdi-monitor', '/dashboard']
            ],
            Products: [
                ['Units', 'mdi-weight', '/product-units'],
                ['Categories', 'mdi-tag', '/product-categories'],
                ['Products', 'mdi-cube', '/products'],
            ],
            Inventory: [
                ['Purchases', 'mdi-cube-outline', '/purchases'],
                ['Stock Overview', 'mdi-cube', '/stock-overview'],
                // ['Stock Movements', 'mdi-arrow-up-down', '/stock-movements'],
                ['Purchase Orders', 'mdi-cart', '/purchase-orders'],
                // ['Stock Alerts', 'mdi-bell-ring', '/stock-alerts'],
            ],
            SalesTransactions: [
                ['POS (Point of Sale)', 'mdi-cash-register', '/pos'],
                ['Sales History', 'mdi-cart', '/sales-history'],
                ['Invoices', 'mdi-file-document', '/invoices'],
                ['Returns', 'mdi-arrow-collapse', '/returns'],
                ['Customers', 'mdi-account', '/customers'],
            ],
            Accounts: [
                ['Chart of Accounts', 'mdi-format-list-bulleted', '/chart-of-accounts'],
                ['Journals', 'mdi-book-open-variant', '/journals'],
                ['Ledger', 'mdi-book', '/ledger'],
                ['Trial Balance', 'mdi-scale-balance', '/trial-balance'],
                ['Financial Reports', 'mdi-finance', '/financial-reports'],
            ],
            Expenses: [
                ['Expenses', 'mdi-cash-minus', '/expenses'],
            ],
            Reports: [
                ['Sales Report', 'mdi-chart-line', '/sales-report'],
                ['Inventory Report', 'mdi-archive', '/inventory-report'],
                ['Stock Valuation', 'mdi-cash', '/stock-valuation'],
            ],
            Suppliers: [
                ['Suppliers', 'mdi-truck', '/suppliers'],
            ],
            // Staff: [
            //     ['Staff', 'mdi-account-multiple-outline', '/staff'],
            // ],
            UserManagement: [

                ['Users', 'mdi-account-group', '/users'],
                ['Roles', 'mdi-lock', '/roles'],
                ['Activity Logs', 'mdi-file-alert', '/activity-logs'],
            ],
            Support: [
                ['Help Center', 'mdi-help-circle', '/help-center'],
                ['Contact Support', 'mdi-phone', '/contact-support']
            ],
        };
    },
    methods: {
        getImageUrl(imageName) {
            return this.$getImageUrl(imageName);
        },

    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        }),
    }
};
</script>

<style>
.my-selected-item {
    background-color: #3674B5 !important;
    color: #ffffff;
}

Purchases .default-color {
    color: #3674B5;
}

.emoji {
    font-size: 70px;
}
</style>
