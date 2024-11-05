<template>
<v-container fluid class="">
    <v-row align="center" justify="center" dense >
        <v-col cols="12" sm="6" md="3" v-for="(card, index) in dashboardCards" :key="index">
            <v-card class="dashboard-card" @click="navigateTo(card.route)">
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
import {
    mapGetters,
} from 'vuex';
export default {
    data() {
        return {
            dashboardCards: [{
                    title: 'Number of Members',
                    icon: 'mdi-account',
                    iconColor: 'primary',
                    value: '1500',
                    route: 'view-members'
                },
                {
                    title: 'Donations Report',
                    icon: 'mdi-hand-heart',
                    iconColor: 'success',
                    value: '2500 TZS',
                    route: 'donations-report'
                },
                {
                    title: 'Upcoming Events',
                    icon: 'mdi-calendar',
                    iconColor: 'warning',
                    value: '3',
                    route: 'events'
                },
                {
                    title: 'Clusters/Deacons',
                    icon: 'mdi-account-group',
                    iconColor: 'info',
                    value: '5',
                    route: 'clusters-deacons'
                },
            ]
        };
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        }),
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
    /* Allow the height to adjust based on content */
    padding: 16px;
    /* Add some padding for better aesthetics */
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
