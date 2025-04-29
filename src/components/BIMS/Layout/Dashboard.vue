<template>
<v-container fluid>
    <!-- Date Range Selector -->
    <v-row justify="end" class="mb-4">
        <v-col cols="12" md="6" lg="6" class="text-right">
            <v-btn-toggle v-model="selectedDateRange"  elevation="0" variant="outlined" group mandatory class="custom-btn-toggle rounded-t-lg">
                <v-btn value="today" class="custom-btn">📅 Daily</v-btn>
                <v-btn value="last7days" class="custom-btn">📅 Weekly</v-btn>
                <v-btn value="thisMonth" class="custom-btn">📅 Monthly</v-btn>
                <v-btn value="thisYear" class="custom-btn">📅 Annually</v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>

    <!-- Dashboard Cards -->
    <v-row justify="center" dense>
        <v-col v-for="(item, index) in dashboardItems" :key="index" cols="12" sm="6" md="3">
            <v-card class="dashboard-card animate__animated animate__zoomIn animate__delay-{{ index * 0.2 }}s" @click="navigateTo(item.route)" :data-icon-color="item.iconColor">
                <v-card-title class="card-title">
                    <span class="emoji">{{ item.emoji }}</span>
                    <span class="ml-1">{{ item.title }}</span>
                </v-card-title>
                <v-card-text class="card-text">
                    {{ item.amount }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            selectedDateRange: "today",
            stats: {
                sales: 0,
                grossProfit: 0,
                operatingProfit: 0,
                netProfit: 0,
            },
            dashboardItems: [],
            menu: false,
            dateRange: {
                start: null,
                end: null
            },
            formattedDateRange: '',
        };
    },

    watch: {
        selectedDateRange(val) {
            if (val !== '') this.loadDashboardData();
        },
    },

    mounted() {
        this.loadDashboardData();
    },

    methods: {
        navigateTo(route) {
            this.$router.push(`/${route}`);
        },

        async loadDashboardData() {
            const range = this.selectedDateRange;
            const endpoints = {
                sales: {
                    today: "/total_price_today",
                    last7days: "/total_price_7days",
                    thisMonth: "/total_price_thisMonth",
                    thisYear: "/total_price_thisYear",
                },
                profit: {
                    today: "/profit_for_today",
                    last7days: "/profit_for_7days",
                    thisMonth: "/profit_for_month",
                    thisYear: "/profit_for_year",
                },
            };

            try {
                const [salesRes, profitRes] = await Promise.all([
                    axios.get(endpoints.sales[range]),
                    axios.get(endpoints.profit[range]),
                ]);

                this.stats.sales = salesRes.data.totalPrice.toLocaleString();
                this.stats.grossProfit = profitRes.data.profit ?.toLocaleString() ?? "0";
                this.stats.operatingProfit = profitRes.data.operatingProfit ?.toLocaleString() ?? "0";
                this.stats.netProfit = profitRes.data.netProfit ?.toLocaleString() ?? "0";

                this.updateDashboardItems();
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            }
        },

        async fetchCustomRangeData(start, end) {
            try {
                const response = await axios.get('/custom_sales_range', {
                    params: {
                        start_date: start,
                        end_date: end
                    },
                });

                this.stats.sales = response.data.totalPrice.toLocaleString();
                this.stats.grossProfit = response.data.profit ?.toLocaleString() ?? "0";
                this.stats.operatingProfit = response.data.operatingProfit ?.toLocaleString() ?? "0";
                this.stats.netProfit = response.data.netProfit ?.toLocaleString() ?? "0";

                this.updateDashboardItems();
            } catch (error) {
                console.error("Error fetching custom range data:", error);
            }
        },

        onDateRangeChange(value) {
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            if (value.start && value.end) {
                this.formattedDateRange = `${new Date(value.start).toLocaleDateString(undefined, options)} - ${new Date(value.end).toLocaleDateString(undefined, options)}`;
                this.menu = false;
                this.selectedDateRange = '';
                this.fetchCustomRangeData(value.start, value.end);
            }
        },

        updateDashboardItems() {
            this.dashboardItems = [{
                    title: "Total Sales",
                    amount: this.stats.sales,
                    emoji: "💰",
                    route: "sales-history",
                    iconColor: "primary",
                },
                {
                    title: "Gross Profit",
                    amount: this.stats.grossProfit,
                    emoji: "📈",
                    route: "profit",
                    iconColor: "success", // green
                },
                {
                    title: "Operating Profit",
                    amount: this.stats.operatingProfit,
                    emoji: "🏭",
                    route: "profit",
                    iconColor: "warning", // orange
                },
                {
                    title: "Net Profit",
                    amount: this.stats.netProfit,
                    emoji: "💹",
                    route: "profit",
                    iconColor: "info", // blue
                },
                {
                    title: "Expenses",
                    amount: this.stats.sales, // or fetch actual expenses if needed
                    emoji: "💸",
                    route: "expenses",
                    iconColor: "error",
                },
                {
                    title: "Inventory Value",
                    amount: this.stats.sales, // optional
                    emoji: "📦",
                    route: "inventory-management",
                    iconColor: "success",
                },
                {
                    title: "Total Products",
                    amount: this.stats.sales,
                    emoji: "🛒",
                    route: "products",
                    iconColor: "info",
                },
                {
                    title: "Orders",
                    amount: this.stats.sales,
                    emoji: "📦",
                    route: "orders",
                    iconColor: "purple",
                },
                {
                    title: "Customers",
                    amount: this.stats.sales,
                    emoji: "👥",
                    route: "customers",
                    iconColor: "secondary",
                },
                {
                    title: "Suppliers",
                    amount: this.stats.sales,
                    emoji: "🚚",
                    route: "supplier-list",
                    iconColor: "pink",
                },
            ];
        },
    },
};
</script>

<style scoped>
.custom-btn-toggle {
    background: linear-gradient(135deg, #1565c0, #42a5f5);
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

.dashboard-card {
    transition: box-shadow 0.3s ease;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    display: flex;
    flex-direction: column;
    border-left: 8px solid transparent;
}

.dashboard-card[data-icon-color="primary"] {
    border-left-color: #1976D2;
}

.dashboard-card[data-icon-color="success"] {
    border-left-color: #4CAF50;
}

.dashboard-card[data-icon-color="warning"] {
    border-left-color: #FB8C00;
}

.dashboard-card[data-icon-color="info"] {
    border-left-color: #2196F3;
}

.dashboard-card[data-icon-color="error"] {
    border-left-color: #F44336;
}

.dashboard-card[data-icon-color="secondary"] {
    border-left-color: #9C27B0;
}

.dashboard-card[data-icon-color="purple"] {
    border-left-color: #7E57C2;
}

.dashboard-card[data-icon-color="pink"] {
    border-left-color: #EC407A;
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

.emoji {
    font-size: 30px;
    margin-right: 8px;
}
</style>
