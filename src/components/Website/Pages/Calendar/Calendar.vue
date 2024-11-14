<template>
<AppBar />
<Loader :loading="loading" v-if="loading" />
<v-container fluid class="schedule-container">
    <v-row justify="center">
        <v-col cols="12" md="10">
            <h2 class="text-center worship-title my-5">
                Our <i class="text-color">Calendar</i>
            </h2>
            <v-sheet border="rounded" class="rounded-sheet">
                <div class="d-flex" height="54" tile>
                    <v-select v-model="type" :items="types" class="ma-2" label="View Mode" variant="outlined" density="compact" rounded="lg" hide-details></v-select>
                    <v-select v-model="weekday" :items="weekdays" class="ma-2" label="Weekdays" variant="outlined" density="compact" rounded="lg" hide-details></v-select>
                </div>
                <v-calendar ref="calendar" v-model="value" :events="events" :view-mode="type" :weekdays="weekday">
                    <!-- Display the event title and time -->
                    <template v-slot:event="{ event }">
                        <div class="event-item">
                            <strong>{{ event.title }}</strong>
                            <div class="event-time">
                                {{ formatEventTime(event.start, event.end) }}
                            </div>
                        </div>
                    </template>
                </v-calendar>
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
<Footer class="footer" />
</template>

<script>
import axios from 'axios';
import Footer from '@/components/Website/Layout/Footer.vue';
import Loader from '@/components/Loader/Loader.vue';
import AppBar from '@/components/Website/Layout/AppBar.vue';

export default {
    components: {
        AppBar,
        Footer,
        Loader,
    },
    data: () => ({
        type: 'month', // Default view mode
        types: ['month', 'week', 'day'], // Calendar view modes
        weekday: [0, 1, 2, 3, 4, 5, 6], // Default weekdays
        weekdays: [{
                title: 'Sun - Sat',
                value: [0, 1, 2, 3, 4, 5, 6]
            },
            {
                title: 'Mon - Sun',
                value: [1, 2, 3, 4, 5, 6, 0]
            },
            {
                title: 'Mon - Fri',
                value: [1, 2, 3, 4, 5]
            },
            {
                title: 'Mon, Wed, Fri',
                value: [1, 3, 5]
            },
        ],
        value: [new Date()], // Selected date
        events: [], // Events data
        loading: true, // Loader state
    }),
    mounted() {
        this.getEvents();
    },
    methods: {
        async getEvents() {
            try {
                const response = await axios.get('/events.json'); // API call for events
                this.events = response.data.map((event) => ({
                    title: event.name,
                    start: new Date(event.start_date),
                    end: new Date(event.end_date),
                    color: event.color || 'blue',
                    allDay: event.all_day || false,
                }));
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                this.loading = false; // Hide loader after fetching
            }
        },
        formatEventTime(start, end) {
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            };
            const startTime = start.toLocaleTimeString([], options); // Format start time
            const endTime = end.toLocaleTimeString([], options); // Format end time
            return `${startTime} - ${endTime}`; // Return formatted time range
        },
    },
};
</script>

<style scoped>
.schedule-container {
    margin-bottom: 0;
    /* Remove margin at the bottom of the container */
}

.footer {
    margin-top: 0;
    /* Ensure footer has no margin on top */
}

.rounded-sheet {
    border-radius: 16px;
    /* Adjust the radius for rounded corners */
    padding: 16px;
    /* Optional: add padding for better spacing */
    background-color: white;
    /* Optional: set a background color */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
    /* Optional: add a subtle shadow */
}
</style>
