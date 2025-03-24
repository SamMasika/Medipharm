<template >
<div class="my-5" >
    <div align="center" class="my-5">
        <v-img alt="Banal Logo" src="@/assets/banal.png" transition="scale-transition" max-width="130" />
    </div>
    <v-list nav active-class="my-selected-item">
        <v-list-item v-for="([title, icon, path], i) in dashboard" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to Dashboard'"></v-list-item>
        <v-list-group value="Products" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-cube" title="Products Management" v-tooltip="'Manage Products'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Products" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
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
        <v-list-group value="Reports" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-chart-line" title="Reports" v-tooltip="'View Reports'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Reports" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
        <v-list-group value="SuppliersVendors" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-truck" title="Suppliers & Vendors" v-tooltip="'Manage Suppliers and Vendors'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in SuppliersVendors" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
        <v-list-group value="UserManagement" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-account-group" title="User Management" v-tooltip="'Manage Users'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in UserManagement" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
        </v-list-group>
        <v-list-group value="Configurations" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-wrench" title="Settings" v-tooltip="'Change Settings'"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, path], i) in Configurations" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title" v-tooltip="'Go to ' + title"></v-list-item>
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
            drawer: true,
            rail: false,
            dashboard: [
                ['Dashboard', 'mdi-monitor', '/dashboard']
            ],
            Products: [
                ['Products', 'mdi-cube', '/products'],
                ['Categories', 'mdi-tag', '/product-categories'],
                ['Units', 'mdi-weight', '/product-units'],
            ],
            Inventory: [
                ['Stock Overview', 'mdi-cube', '/stock-overview'],
                ['Manage Stock', 'mdi-cube-outline', '/manage-stock'],
                ['Stock Movements', 'mdi-arrow-up-down', '/stock-movements'],
                ['Purchase Orders', 'mdi-cart', '/purchase-orders'],
                ['Stock Alerts', 'mdi-bell-ring', '/stock-alerts'],
            ],
            SalesTransactions: [
                ['POS (Point of Sale)', 'mdi-cash-register', '/pos'],
                ['Sales History', 'mdi-cart', '/sales-history'],
                ['Generate Invoices', 'mdi-file-document', '/generate-invoices'],
                ['Record Transactions', 'mdi-credit-card', '/record-transactions'],
                ['Returns', 'mdi-arrow-collapse', '/returns'],
                ['Customers', 'mdi-account', '/customers'],
            ],
            Reports: [
                ['Sales Report', 'mdi-chart-line', '/sales-report'],
                ['Inventory Report', 'mdi-archive', '/inventory-report'],
                ['Stock Valuation', 'mdi-cash', '/stock-valuation'],
            ],
            SuppliersVendors: [
                ['Suppliers', 'mdi-truck', '/suppliers'],
                ['Vendor Relations', 'mdi-handshake', '/vendor-relations'],
            ],
            UserManagement: [

                ['Users', 'mdi-account-group', '/users'],
                ['Roles', 'mdi-lock', '/roles'],
                ['Activity Logs', 'mdi-file-alert', '/activity-logs'],
            ],
            Configurations: [
                ['Company Profile', 'mdi-domain', '/company-profile'],
                ['Change Password', 'mdi-lock', '/change-password']
            ],
            Support: [
                ['Help Center', 'mdi-help-circle', '/help-center'],
                ['Contact Support', 'mdi-phone', '/contact-support']
            ],
        };
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

.default-color {
    color: #3674B5;
}
</style>
