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
                        <div class="event-item text-center" :style="{ backgroundColor: event.color }">
                            <strong>{{ event.title }}</strong>
                            <div class="event-time">
                                <!-- Display "All Day" if the event is an all-day event, otherwise display time -->
                                <span>{{ formatEventTime(event.start, event.end) }}</span> <br>
                                <div class="text-center">
                                    <span v-if="event.allDay" >In a Day</span>
                                </div>
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
import axios from "axios";
import Footer from "@/components/Website/Layout/Footer.vue";
import Loader from "@/components/Loader/Loader.vue";
import AppBar from "@/components/Website/Layout/AppBar.vue";

export default {
    components: {
        AppBar,
        Footer,
        Loader,
    },
    data: () => ({
        type: "month", // Default view mode
        types: ["month", "week", "day"], // Calendar view modes
        weekday: [0, 1, 2, 3, 4, 5, 6], // Default weekdays
        weekdays: [{
                title: "Sun - Sat",
                value: [0, 1, 2, 3, 4, 5, 6],
            },
            {
                title: "Mon - Sun",
                value: [1, 2, 3, 4, 5, 6, 0],
            },
            {
                title: "Mon - Fri",
                value: [1, 2, 3, 4, 5],
            },
            {
                title: "Mon, Wed, Fri",
                value: [1, 3, 5],
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
        // Fetch events from the API and map them to the correct format
        async getEvents() {
            try {
                const response = await axios.get("/events"); // API call for events

                // Transform the events data
                this.events = response.data.map((event) => {
                    const startDateTime = new Date(`${event.start_date}T${event.start_time}`);
                    const endDateTime = new Date(`${event.end_date}T${event.end_time}`);

                    // Ensure the dates are valid and log for debugging
                    if (isNaN(startDateTime) || isNaN(endDateTime)) {
                        console.error(
                            "Invalid date format:",
                            event.start_date,
                            event.start_time,
                            event.end_date,
                            event.end_time
                        );
                        return {}; // Skip invalid events
                    }

                    return {
                        title: event.name,
                        start: startDateTime, // Ensure this is a valid Date object
                        end: endDateTime, // Ensure this is a valid Date object
                        color: event.color || "#A82228", // Default color if not specified
                        allDay: event.all_day || false, // Mark event as all day or not
                    };
                });
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                this.loading = false; // Hide loader after fetching
            }
        },
        // Format the event time to a readable format
        formatEventTime(start, end) {
            const options = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
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
}

.footer {
    margin-top: 0;
}

.rounded-sheet {
    border-radius: 16px;
    padding: 16px;
    background-color: white;
}

.event-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 10px;
    color: white;
}

.event-time {
    font-size: 0.85rem;
    color: lightgray;
}

/* Optional: Style for All Day events */
.event-time span {
    font-weight: bold;
    color: #FFD700;
    /* Gold color for All Day */
}
</style>
