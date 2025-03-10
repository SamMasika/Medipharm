<template>
<v-container fluid class="">
    <v-row align="center" justify="end" class="mb-2">
        <v-col cols="12" md="6" lg="4" class="text-right">
            <v-btn-toggle v-model="selectedDateRange" dense group mandatory @change="fetchData" class="custom-btn-toggle">
                <v-btn value="today" class="custom-btn">
                    Daily
                </v-btn>
                <v-btn value="last7days" class="custom-btn">
                    Weekly
                </v-btn>
                <v-btn value="thisMonth" class="custom-btn">
                    Monthly
                </v-btn>
                <v-btn value="thisYear" class="custom-btn">
                    Annually
                </v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>
    <v-row align="center" justify="center" dense>
        <v-col cols="12" sm="6" md="3" v-for="(card, index) in dashboardCards" :key="index">
            <v-card class="dashboard-card" @click="navigateTo(card.route)" :data-icon-color="card.iconColor">
                <v-card-title class="card-title">
                    <v-icon :color="card.iconColor" size="28">{{ card.icon }}</v-icon>
                    <span class="ml-1">{{ card.title }}</span>
                </v-card-title>
                <v-card-text class="card-text">
                    {{ card.value }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            dashboardCards: [{
                    title: 'Total Sales',
                    icon: 'mdi-cart',
                    iconColor: 'primary',
                    value: '2,350,000 TZS',
                    route: 'sales-history'
                },
                {
                    title: 'Inventory Value',
                    icon: 'mdi-cube-outline',
                    iconColor: 'success',
                    value: '1,200,000 TZS',
                    route: 'inventory-management'
                },
                {
                    title: 'Expenses',
                    icon: 'mdi-cash-multiple',
                    iconColor: 'error',
                    value: '500,000 TZS',
                    route: 'expenses'
                },
                {
                    title: 'Profit',
                    icon: 'mdi-currency-turkish-lira',
                    iconColor: 'success',
                    value: '1,850,000 TZS',
                    route: 'profit'
                },
                {
                    title: 'Total Products',
                    icon: 'mdi-cube',
                    iconColor: 'info',
                    value: '120',
                    route: 'products'
                },
                {
                    title: 'Orders Today',
                    icon: 'mdi-package-variant-closed',
                    iconColor: 'warning',
                    value: '50',
                    route: 'orders'
                },
                {
                    title: 'Customers',
                    icon: 'mdi-account-group',
                    iconColor: 'purple',
                    value: '350',
                    route: 'customers'
                },
                {
                    title: 'Suppliers & Vendors',
                    icon: 'mdi-truck',
                    iconColor: 'charcoal-blue',
                    value: '15',
                    route: 'suppliers'
                }
            ]
        };
    },
    methods: {
        navigateTo(route) {
            this.$router.push(`/${route}`); // Adjust the route based on your routing setup
        }
    }
}
</script>

<style scoped>
.dashboard-card {
    transition: box-shadow 0.3s ease;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    border-left: 8px solid transparent;
    /* Default border color */
}

/* Add dynamic left border color */
.dashboard-card[data-icon-color="primary"] {
    border-left-color: #1976D2;
    /* Sales (primary) */
}

.dashboard-card[data-icon-color="success"] {
    border-left-color: #4CAF50;
    /* Inventory & Profit (success) */
}

.dashboard-card[data-icon-color="error"] {
    border-left-color: #F44336;
    /* Expenses (error) */
}

.dashboard-card[data-icon-color="info"] {
    border-left-color: #2196F3;
    /* Total Products (info) */
}

.dashboard-card[data-icon-color="warning"] {
    border-left-color: #FF9800;
    /* Orders Today (warning) */
}

.dashboard-card[data-icon-color="purple"] {
    border-left-color: #9C27B0;
    /* Customers (purple) */
}

.dashboard-card[data-icon-color="charcoal-blue"] {
    border-left-color: #344CB7;
    /* Suppliers (Charcoal Blue) */
}

.dashboard-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-title {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
}

.card-text {
    color: #555;
    margin-top: 4px;
    font-size: 16px;
    font-weight: bold;
}
.custom-btn-toggle {
    background: linear-gradient(135deg, #1565c0, #42a5f5);
    border-radius: 10px;
    /* padding: 8px; */
    display: inline-flex;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
}

.custom-btn {
    font-weight: 500;
    text-transform: none;
    transition: all 0.3s ease-in-out;
    color: white;
    background-color: #3674B5 !important;
}

.custom-btn:hover {
    background: rgba(255, 255, 255, 0.2) !important;
}

.custom-btn.v-btn--active {
    background: rgba(255, 255, 255, 0.3) !important;
    box-shadow: 0px 3px 10px rgba(255, 255, 255, 0.3);
}
</style>
