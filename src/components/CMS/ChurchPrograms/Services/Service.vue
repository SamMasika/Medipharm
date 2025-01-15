<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="800">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Service" variant="flat" v-bind="activatorProps" rounded="xl"></v-btn>
                </template>
                <v-card prepend-icon="mdi-plus" title="Add Service">
                    <v-form>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Name*" v-model="service.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <PaginatedDropdown :api-endpoint="'service-category/list'" :label="'Select Category'" :placeholder="'Select Category'" v-model="service.categoryId"></PaginatedDropdown>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field type="time" label="Start Time*" v-model="service.startTime" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field type="time" label="End Time*" v-model="service.endTime" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="6" md="6">
                                    <v-autocomplete :items="daysOfWeek" label="Day of The Week" v-model="service.dayOfWeek" required variant="outlined" density="compact"></v-autocomplete>
                                </v-col>

                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addService" rounded="xl"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-account-group" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
            Services
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-row justify="end" class="mt-2">
            <v-col cols="12" md="4" class="d-flex justify-end">
                <v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" flat variant="solo-filled" hide-details single-line class="search-field" :style="{ maxWidth: '300px' }"></v-text-field>
            </v-col>
        </v-row>
        <v-card-text>
            <v-data-table :headers="headers" :items="services" :search="search" :items-per-page="10">
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
                            <v-list-item @click="editService(item)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-pencil</v-icon> <!-- Edit Icon -->
                                </template>
                                <v-list-item-title>Edit</v-list-item-title>
                            </v-list-item>

                            <v-list-item @click="deleteDialog(item)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-delete</v-icon> <!-- Delete Icon -->
                                </template>
                                <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>

                <template v-slot:[`item.status`]="{ item }">
                    <v-chip :color="item.status ? 'green' : 'red'" :text="item.status ? 'Active' : 'Inactive'" class="text-mixedcase" size="small"></v-chip>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
    <v-dialog v-model="serviceEditDialog" max-width="600">
        <v-card prepend-icon="mdi-plus" title="Update Service">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Name*" v-model="serviceEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <PaginatedDropdown :api-endpoint="'service-category/list'" :label="'Select Category'" :placeholder="'Select Category'" v-model="serviceEdit.categoryId"></PaginatedDropdown>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field type="time" label="Start Time*" v-model="serviceEdit.startTime" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field type="time" label="End Time*" v-model="serviceEdit.endTime" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete :items="daysOfWeek" label="Day of The Week" v-model="serviceEdit.dayOfWeek" required variant="outlined" density="compact"></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="serviceEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateService" rounded="xl"></v-btn>
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
                Are you sure you want to delete <b>"{{ serviceToDelete.name }}"</b>?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" class="text-none" variant="tonal" @click="confirmDialogVisible = false" rounded="xl"></v-btn>
                <v-btn type="submit" text="Ok" class="text-none button-color" variant="flat" @click="deleteService" rounded="xl"></v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import PaginatedDropdown from '../../SharedComponents/paginatedDropdown'
import axios from "axios";
import {
    churchProgramCategoriesOptions,
} from '@/json/enum'
export default {
    components: {
        PaginatedDropdown
    },

    data() {
        return {
            search: "",
            services: [],
            zones: [],
            service: {},
            dialog: false,
            churchProgramCategoriesOptions,
            serviceEditDialog: false,
            serviceEdit: {},
            dialogDelete: false,
            confirmDialogVisible: false,
            isLoading: false,
            serviceToDelete: {},
            daysOfWeek: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            headers: [{
                    title: "Name",
                    value: "name",
                    sortable: false,
                },
                {
                    title: "Category",
                    value: "category.name",
                    sortable: false,
                },
                {
                    title: "Start Time",
                    value: "startTime",
                    sortable: false,
                },
                {
                    title: "End Time",
                    value: "endTime",
                    sortable: false,
                },
                {
                    title: "Day",
                    value: "dayOfWeek",
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

    methods: {
        async fetchData() {
            this.isLoading = true;
            try {
                const response = await axios.get("/services/list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                });

                this.services = response.data.data.data;
            } catch (error) {
                this.showAlert(error.response.data.meta.message, 'error');
            } finally {
                this.isLoading = false;
            }
        },
        addService() {
            const data = {
                ...this.service,
            };
            axios.post('/services/create', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    }
                })
                .then(response => {
                    this.showAlert(response.data.meta.message, 'success');
                    this.dialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => this.showAlert(error.response.data.meta.message, 'error'));
        },
        //UpdateService
        editService(item) {
            this.serviceEdit = item
            this.serviceEditDialog = true
        },
        updateService() {
            const {
                id, // Add id here
                name,
                description,
            } = this.serviceEdit;

            axios
                .post("/services/update", {
                    id: id, // Include id in the payload
                    name: name,
                    description: description,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                })
                .then(response => {
                    this.showAlert(response.data.meta.message, 'success');
                    this.serviceEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => {
                    this.showAlert(error.response.data.meta.message, 'error');
                    this.serviceEditDialog = false;
                });
        },

        deleteService() {
            axios.delete(`services/delete/${this.serviceToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.services.indexOf(this.serviceToDelete);
                    if (index > -1) {
                        this.services.splice(index, 1);
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
            this.serviceToDelete = item;
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

<style scoped>
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

.toolbar {
    background-color: #A82228;
    color: white;
}
</style>
