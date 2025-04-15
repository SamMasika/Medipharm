<template>
  <v-container fluid class="dashboard-container">
    <!-- Date Range Selector -->
    <v-row align="center" justify="end" class="mb-4">
      <v-col cols="12" md="6" lg="4" class="text-right">
        <v-btn-toggle v-model="selectedDateRange" density="compact" elevation="0" variant="outlined" group mandatory @change="fetchData" class="custom-btn-toggle" rounded="xl">
          <v-btn value="today" class="custom-btn">📅 Daily</v-btn>
          <v-btn value="last7days" class="custom-btn">📅 Weekly</v-btn>
          <v-btn value="thisMonth" class="custom-btn">📅 Monthly</v-btn>
          <v-btn value="thisYear" class="custom-btn">📅 Annually</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <!-- Dashboard Cards -->
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="6" md="3" v-for="(card, index) in dashboardCards" :key="index">
        <v-card class="dashboard-card animate__animated animate__zoomIn animate__delay-{{ index * 0.2 }}s" @click="navigateTo(card.route)" :data-icon-color="card.iconColor">
          <v-card-title class="card-title">
            <span class="emoji">{{ card.emoji }}</span> 
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
      selectedDateRange: 'today', // Default value for date range
      dashboardCards: [
        {
          title: 'Total Sales',
          iconColor: 'primary',
          value: '2,350,000 TZS',
          route: 'sales-history',
          emoji: '💰'
        },
        {
          title: 'Inventory Value',
          iconColor: 'success',
          value: '1,200,000 TZS',
          route: 'inventory-management',
          emoji: '📦'
        },
        {
          title: 'Expenses',
          iconColor: 'error',
          value: '500,000 TZS',
          route: 'expenses',
          emoji: '💸'
        },
        {
          title: 'Profit',
          iconColor: 'success',
          value: '1,850,000 TZS',
          route: 'profit',
          emoji: '📈'
        },
        {
          title: 'Total Products',
          iconColor: 'info',
          value: '120',
          route: 'products',
          emoji: '🛍️'
        },
        {
          title: 'Orders Today',
          iconColor: 'warning',
          value: '50',
          route: 'orders',
          emoji: '📦'
        },
        {
          title: 'Customers',
          iconColor: 'purple',
          value: '350',
          route: 'customers',
          emoji: '👥'
        },
        {
          title: 'Suppliers & Vendors',
          iconColor: 'pink',
          value: '15',
          route: 'suppliers',
          emoji: '🚚'
        }
      ]
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(`/${route}`); // Adjust the route based on your routing setup
    },
    fetchData() {
      // Fetch data based on selected date range
    }
  }
}
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

.dashboard-card[data-icon-color="error"] {
  border-left-color: #F44336;
}

.dashboard-card[data-icon-color="info"] {
  border-left-color: #2196F3;
}

.dashboard-card[data-icon-color="warning"] {
  border-left-color: #FF9800;
}

.dashboard-card[data-icon-color="purple"] {
  border-left-color: #9C27B0;
}

.dashboard-card[data-icon-color="pink"] {
  border-left-color: #FF1493;
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
