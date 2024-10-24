<template>
<v-container fluid class="my-5">
    <v-row align="center" justify="center" dense>
        <v-col cols="12" md="3">
            <v-card class="dashboard-card" @click="navigateTo('view-members')">
                <v-card-title class="card-title">
                    <v-icon color="primary" size="28">mdi-account</v-icon>
                    <span class="ml-1">Number of Members</span>
                </v-card-title>
                <v-card-text class="card-text">
                    1500
                    <!-- Placeholder for member count -->
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="3">
            <v-card class="dashboard-card" @click="navigateTo('donations-report')">
                <v-card-title class="card-title">
                    <v-icon color="success" size="28">mdi-hand-heart</v-icon>
                    <span class="ml-1">Donations Report</span>
                </v-card-title>
                <v-card-text class="card-text">
                    2500 TZS
                    <!-- Placeholder for total donations -->
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="3">
            <v-card class="dashboard-card" @click="navigateTo('events')">
                <v-card-title class="card-title">
                    <v-icon color="warning" size="28">mdi-calendar</v-icon>
                    <span class="ml-1">Upcoming Events</span>
                </v-card-title>
                <v-card-text class="card-text">
                    3
                    <!-- Placeholder for number of upcoming events -->
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" md="3">
            <v-card class="dashboard-card" @click="navigateTo('clusters-deacons')">
                <v-card-title class="card-title">
                    <v-icon color="info" size="28">mdi-account-group</v-icon>
                    <span class="ml-1">Clusters/Deacons</span>
                </v-card-title>
                <v-card-text class="card-text">
                    5
                    <!-- Placeholder for number of clusters/deacons -->
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
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
    height: 100px;
    /* Maintain reduced height of the cards */
}

.dashboard-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-title {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    /* Increased font size for the title */
}

.card-text {
    color: #555;
    margin-top: 4px;
    /* Slightly increased margin for spacing */
    font-size: 16px;
    /* Increased font size for numbers */
    font-weight: bold;
    /* Make the numbers bold */
}
</style>
