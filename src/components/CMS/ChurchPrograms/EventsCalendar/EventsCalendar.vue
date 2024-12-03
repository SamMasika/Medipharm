<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="700">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Event" variant="flat" v-bind="activatorProps" rounded="xl">
                        Add Event
                    </v-btn>
                </template>

                <v-card prepend-icon="mdi-plus" title="Add Event">
                    <v-form @submit.prevent="addEvent">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-text-field label="Name*" v-model="event.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>

                            <!-- Radio Group for Event Occurrence -->
                            <v-row dense>
                                <v-col cols="12">
                                    <v-radio-group v-model="event.allDay" row density="compact" label="Is it happening in a single day?">
                                        <v-radio label="Yes" :value="true"></v-radio>
                                        <v-radio label="No" :value="false"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>

                            <!-- Date and Time Fields -->
                            <v-row dense>
                                <v-col cols="12" sm="4">
                                    <v-text-field type="date" label="Start Date*" v-model="event.startDate" required variant="outlined" density="compact"></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="4">
                                    <v-text-field type="time" label="Start Time*" v-model="event.startTime" required variant="outlined" density="compact"></v-text-field>
                                </v-col>

                                <!-- Conditionally Display End Date and Time Fields if 'No' is Selected -->
                                <v-col v-if="!event.allDay" cols="12" sm="4">
                                    <v-text-field type="date" label="End Date*" v-model="event.endDate" required variant="outlined" density="compact"></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="4">
                                    <v-text-field type="time" label="End Time*" v-model="event.endTime" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>

                            <!-- Description Field -->
                            <v-row dense>
                                <v-col cols="12">
                                    <v-textarea label="Description (Optional)" v-model="event.description" row-height="25" rows="3" variant="outlined" auto-grow shaped></v-textarea>
                                </v-col>
                            </v-row>

                            <!-- Color Picker -->
                            <v-row dense>
                                <v-col cols="12">
                                    <v-text-field label="Event Color" readonly v-model="event.color" variant="outlined" density="compact" @click="colorPickerDialog = true"></v-text-field>
                                    <v-menu v-model="colorPickerDialog" offset-y>
                                        <v-color-picker v-model="event.color" hide-mode-switch swatches swatches-max-height="200"></v-color-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" rounded="xl">Save</v-btn>
                        </v-card-actions>
                    </v-form>

                </v-card>
            </v-dialog>

        </v-col>
    </v-row>
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-calendar-month custom-icon" class="mx-5 " size="40"></v-icon> &nbsp;
            Events
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-row justify="end" class="mt-2">
            <v-col cols="12" md="4" class="d-flex justify-end">
                <v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" flat variant="solo-filled" hide-details single-line class="search-field" :style="{ maxWidth: '300px' }"></v-text-field>
            </v-col>
        </v-row>
        <v-card-text>
            <v-data-table :headers="headers" :items="events" :search="search" :items-per-page="10">
                <!-- Actions slot for custom menu with 3 dots -->
                <template v-slot:[`item.actions`]="{ item }">
                    <v-menu transition="slide-x-transition">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">
                                mdi-dots-vertical
                            </v-icon>
                        </template>
                        <!-- List for actions -->
                        <v-list>
                            <v-list-item @click="editEvent(item)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-pencil</v-icon>
                                </template>
                                <v-list-item-title>Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="deleteDialog(item)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-delete</v-icon>
                                </template>
                                <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>

                <template v-slot:[`item.startDate`]="{ item }">
                    {{ formatDate(item.startDate) }}
                </template>
                <template v-slot:[`item.endDate`]="{ item }">
                    {{ formatDate(item.endDate) }}
                </template>
                <!-- Format startTime and endTime -->
                <template v-slot:[`item.startTime`]="{ item }">
                    {{ formatTime(item.startTime) }}
                </template>
                <template v-slot:[`item.endTime`]="{ item }">
                    {{ formatTime(item.endTime) }}
                </template>
            </v-data-table>

        </v-card-text>
    </v-card>
    <v-dialog v-model="eventEditDialog" max-width="800">
        <v-card prepend-icon="mdi-plus" title="Update event">
            <v-form >
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field label="Name*" v-model="eventEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Radio Group for Event Occurrence -->
                    <v-row dense>
                        <v-col cols="12">
                            <v-radio-group v-model="eventEdit.allDay" row density="compact" label="Is it happening in a single day?">
                                <v-radio label="Yes" :value="true"></v-radio>
                                <v-radio label="No" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <!-- Date and Time Fields -->
                    <v-row dense>
                        <v-col cols="12" sm="4">
                            <v-text-field type="date" label="Start Date*" v-model="eventEdit.startDate" required variant="outlined" density="compact"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-text-field type="time" label="Start Time*" v-model="eventEdit.startTime" required variant="outlined" density="compact"></v-text-field>
                        </v-col>

                        <!-- Conditionally Display End Date and Time Fields if 'No' is Selected -->
                        <v-col v-if="!eventEdit.allDay" cols="12" sm="4">
                            <v-text-field type="date" label="End Date*" v-model="eventEdit.endDate" required variant="outlined" density="compact"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-text-field type="time" label="End Time*" v-model="eventEdit.endTime" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Description Field -->
                    <v-row dense>
                        <v-col cols="12">
                            <v-textarea label="Description (Optional)" v-model="eventEdit.description" row-height="25" rows="3" variant="outlined" auto-grow shaped></v-textarea>
                        </v-col>
                    </v-row>

                    <!-- Color Picker -->
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field label="Event Color" readonly v-model="eventEdit.color" variant="outlined" density="compact" @click="colorPickerDialog = true"></v-text-field>
                            <v-menu v-model="colorPickerDialog" offset-y>
                                <v-color-picker v-model="eventEdit.color" hide-mode-switch swatches swatches-max-height="200"></v-color-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="eventEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateEvent" rounded="xl"></v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialogVisible" max-width="350">
        <v-card class="rounded-lg" elevation="24">
            <v-card-title class=" text-h5 white--text text-center my-1">
                <v-icon size="80" color="red">mdi-delete</v-icon>
            </v-card-title>
            <v-card-text class=" text-center ">
                Are you sure you want to delete <b>"{{ eventToDelete.name }}"</b>?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" class="text-none" variant="tonal" @click="confirmDialogVisible = false" rounded="xl"></v-btn>
                <v-btn type="submit" text="Ok" class="text-none button-color" variant="flat" @click="deleteEvent" rounded="xl"></v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            search: "",
            events: [],
            event: {
                name: '',
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: '',
                description: '',
                color: '#0F7BE1',
                allDay: false
            },
            dialog: false,
            eventEditDialog: false,
            eventEdit: {},
            dialogDelete: false,
            confirmDialogVisible: false,
            colorPickerDialog: false,
            isLoading: false,
            eventToDelete: {},
            headers: [{
                    title: "Event Name",
                    value: "name",
                    sortable: false,
                },
                {
                    title: "Start Date",
                    value: "startDate",
                    sortable: false,
                },
                {
                    title: "Start Time",
                    value: "startTime",
                    sortable: false,
                },
                {
                    title: "End Date",
                    value: "endDate",
                    sortable: false,
                },
                {
                    title: "End Time",
                    value: "endTime",
                    sortable: false,
                },

                {
                    title: "Actions",
                    value: "actions",
                    sortable: false,
                },
            ],
        };
    },
    watch: {
        "event.allDay"(newVal) {
            if (newVal && this.event.startDate) {
                this.event.endDate = this.event.startDate;
            }
        }
    },

    methods: {
        // calculateDaysRemaining(eventStartDate) {
        //     // Get the current date (today)
        //     const today = new Date();

        //     // Get the event start date, making sure it's a Date object
        //     const eventStart = new Date(eventStartDate);

        //     // Calculate the difference in time (in milliseconds)
        //     const timeDifference = eventStart - today;

        //     // Convert the time difference from milliseconds to days
        //     const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

        //     // Return the number of days remaining (can be negative if the event is in the past)
        //     return daysRemaining;
        // },
        formatDate(date) {
            if (!date) return '';
            return new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(new Date(date));
        },
        formatTime(time) {
            if (!time) return '';
            const [hours, minutes] = time.split(':');
            const date = new Date();
            date.setHours(hours, minutes);

            // Format time with lowercase am/pm, then replace it to uppercase
            let formattedTime = new Intl.DateTimeFormat('en-GB', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }).format(date);

            return formattedTime.replace(/(am|pm)/, (match) => match.toUpperCase());
        },
        async fetchData() {
            this.isLoading = true;
            try {
                const response = await axios.get("/calendar-event/list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                });
                this.events = response.data.data.data;
            } catch (error) {
                this.showAlert(error.response.data.meta.message, 'error');
            } finally {
                this.isLoading = false;
            }
        },
        addEvent() {
            const daysRemaining = this.calculateDaysRemaining(this.event.startDate);
            console.log(`Days remaining: ${daysRemaining}`);

            const eventData = {
                name: this.event.name,
                startDate: this.event.startDate,
                endDate: this.event.allDay ? this.event.startDate : this.event.endDate,
                allDay: this.event.allDay,
                startTime: this.event.startTime,
                endTime: this.event.endTime,
                description: this.event.description,
                color: this.event.color,
            };
            axios.post('/calendar-event/create', eventData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                .then(response => {
                    this.showAlert(response.data.meta.message, 'success');
                    this.dialog = false;
                    this.fetchEvents(); // Refetch the events instead of reloading the page
                })
                .catch(error => this.showAlert(error.response.data.meta.message, 'error'));
        },
        //UpdateEvent
        editEvent(item) {
            this.eventEdit = item
            this.eventEditDialog = true
        },
        updateEvent() {
            const {
                id,
                name,
                startDate,
                endDate,
                allDay,
                startTime,
                endTime,
                description,
                color,
            } = this.eventEdit;
            axios
                .post("/calendar-event/update", {
                    id: id, // Include id in the payload
                    name: name,
                    startDate: startDate,
                    endDate: allDay ? startDate : endDate,
                    allDay: allDay,
                    startTime: startTime,
                    endTime: endTime,
                    description: description,
                    color: color,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                })
                .then(response => {
                    this.showAlert(response.data.meta.message, 'success');
                    this.eventEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => {
                    this.showAlert(error.response.data.meta.message, 'error');
                    this.eventEditDialog = false;
                });
        },

        deleteEvent() {
            axios.delete(`calendar-event/delete/${this.eventToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.events.indexOf(this.eventToDelete);
                    if (index > -1) {
                        this.events.splice(index, 1);
                    }
                    this.confirmDialogVisible = false;
                    this.showAlert(response.data.meta.message, 'success');

                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => this.showAlert(error.response.data.meta.message, 'error'));
        },
        deleteDialog(item) {
            this.eventToDelete = item;
            this.confirmDialogVisible = true;
        },

        showAlert(message, type) {
            this.$swal.fire({
                icon: type,
                title: message,
                showConfirmButton: false,
                timer: 2000,
            });
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style>
.header {
    padding: 16px 24px;
    border-bottom: 1px solid #e0e0e0;
}

.title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
}

.add-button {
    border-radius: 24px;
}

.search-field {
    flex-grow: 1;
    max-width: 300px;
    margin-right: 10px;
}

.v-card {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.v-data-table {
    margin-top: 16px;
}

.datatable-header {
    background-color: #1976d2 !important;
    color: white !important;
}

.text-color {
    color: #A82228;
}

.button-color {
    background-color: #002147 !important;
    color: white !important;
}

.toolbar {
    background-color: #A82228;
    color: white;
}
</style>
