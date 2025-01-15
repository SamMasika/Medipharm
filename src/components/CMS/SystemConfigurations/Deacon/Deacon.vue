<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Deacon" variant="flat" v-bind="activatorProps" rounded="xl"></v-btn>
                </template>
                <v-card prepend-icon="mdi-plus" title="Add Deacon">
                    <v-form>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Name*" v-model="deacon.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <PaginatedDropdown :api-endpoint="'zones/list'" :label="'Select Zone'" :placeholder="'Search Zone'" v-model="deacon.zoneId"></PaginatedDropdown>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Description*" v-model="deacon.description" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addDeacon" rounded="xl"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-card>
        <v-toolbar>
            <v-icon icon="mdi-account-group" class="mx-5" size="40"></v-icon>&nbsp; Deacons
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <shared-data-table api-url="deacons/list" :headers="headers" @edit="editDeacon" @delete="deleteDialog">
                <!-- Actions Slot -->
                <template v-slot:actions="{ item }">
                    <v-menu transition="slide-x-transition">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">mdi-dots-vertical</v-icon>
                        </template>
                        <v-list>
                            <v-list-item @click="editDeacon(item)">
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
            </shared-data-table>
        </v-card-text>
    </v-card>
    <v-dialog v-model="deaconEditDialog" max-width="600">
        <v-card prepend-icon="mdi-plus" title="Update Zone">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Name*" v-model="deaconEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-autocomplete v-model="deaconEdit.zoneId" label="Zone" density="compact" placeholder="Zone" variant="outlined" item-title="name" item-value="id" :items="zones"></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Description*" v-model="deaconEdit.description" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="deaconEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateDeacon" rounded="xl"></v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialogVisible" max-width="450">
        <v-card class="rounded-lg elevation-16" style="background-color: #f9f9f9;">
            <!-- Title Section -->
            <v-card-title class="text-h5 font-weight-bold white--text text-center py-2" style="font-family: 'Roboto', sans-serif; font-size: 20px;">
                <v-icon size="90" color="red" class="mr-3">mdi-delete</v-icon>
                Confirm Deletion
            </v-card-title>

            <!-- Content Section -->
            <v-card-text class="text-center py-1" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6;">

                <div class="font-weight-medium text-body-1 text-center mb-4">
                    Are you sure you want to delete <b>"{{ itemToDelete.name }} </b>?
                </div>
                <div class="font-italic text-subtitle-1" style="color: #777;">
                    This action cannot be undone.
                </div>
            </v-card-text>

            <!-- Divider -->
            <v-divider></v-divider>

            <!-- Action Buttons -->
            <v-card-actions class="justify-center py-4">
                <v-btn text class="mr-3" variant="outlined" @click="confirmDialogVisible = false" rounded="xl" color="grey lighten-2" style="font-family: 'Roboto', sans-serif; font-weight: 500;">
                    Cancel
                </v-btn>
                <v-btn text variant="tonal" @click="deleteItem" rounded="xl" color="red" style="font-family: 'Roboto', sans-serif; font-weight: 600;">
                    <v-icon left>mdi-delete</v-icon> Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</v-container>
</template>

<script>
import SharedDataTable from '../../SharedComponents/dataTable.vue';
import PaginatedDropdown from '../../SharedComponents/paginatedDropdown.vue';
import axios from "axios";
export default {
    components: {
        SharedDataTable,
        PaginatedDropdown
    },
    data() {
        return {
            dialog: false,
            deacon: {},
            deacons: [],
            zones: [],
            deaconEditDialog: false,
            deaconEdit: {},
            dialogDelete: false,
            confirmDialogVisible: false,
            isLoading: false,
            itemToDelete: {},
            headers: [{
                    title: "Name",
                    value: "name"
                },
                {
                    title: "Zone",
                    value: "zone.name"
                },
                {
                    title: "Actions",
                    value: "actions"
                }, // Placeholder for actions slot
            ],
        };
    },
    methods: {
        addDeacon() {
            const data = {
                ...this.deacon,
            };
            axios.post('/deacons/create', data, {
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
        //UpdateDeacon
        editDeacon(item) {

            this.deaconEdit = {
                ...item
            }; // Copy the item data to avoid reference issues
            this.deaconEdit.zoneId = item.zone.id || null; // Assign the cluster ID if available
            this.deaconEditDialog = true; // Open the dialog
        },
        updateDeacon() {
            const {
                id, // Add id here
                name,
                description,
                zoneId
            } = this.deaconEdit;

            axios
                .post("/deacons/update", {
                    id: id, // Include id in the payload
                    name: name,
                    description: description,
                    zoneId: zoneId,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                })
                .then(response => {
                    this.showAlert(response.data.meta.message, 'success');
                    this.deaconEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => {
                    this.showAlert(error.response.data.meta.message, 'error');
                    this.deaconEditDialog = false;
                });
        },
        deleteItem() {
            axios.delete(`deacons/delete/${this.itemToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.deacons.indexOf(this.itemToDelete);
                    if (index > -1) {
                        this.deacons.splice(index, 1);
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
            this.itemToDelete = item;
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
};
</script>
