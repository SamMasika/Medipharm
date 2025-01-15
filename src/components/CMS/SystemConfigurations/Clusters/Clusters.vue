<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color mb-5" prepend-icon="mdi-plus" text="Add Cluster" variant="flat" v-bind="activatorProps" rounded="xl"></v-btn>
                </template>
                <v-card prepend-icon="mdi-plus" title="Add Cluster">
                    <v-form>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Name*" v-model="cluster.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Description*" v-model="cluster.description" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addCluster" rounded="xl"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-card>
        <v-toolbar>
            <v-icon icon="mdi-account-group" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
            Clusters
            <v-spacer></v-spacer>
        </v-toolbar>
        <DataTable :api-url="'clusters/list'" :headers="headers">
        <template v-slot:actions="{item }">
            <v-menu transition="slide-x-transition">
                <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">
                        mdi-dots-vertical
                    </v-icon>
                </template>
                <!-- List for actions -->
                <v-list>
                    <v-list-item @click="editCluster(item)">
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
			</DataTable>
       
    </v-card>
    <v-dialog v-model="clusterEditDialog" max-width="600">
        <v-card prepend-icon="mdi-plus" title="Update Cluster">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Name*" v-model="clusterEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Description*" v-model="clusterEdit.description" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="clusterEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateCluster" rounded="xl"></v-btn>
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
                    Are you sure you want to delete <b>"{{ clusterToDelete.name }}"</b>?
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
                <v-btn text variant="tonal" @click="deleteCluster" rounded="xl" color="red" style="font-family: 'Roboto', sans-serif; font-weight: 600;">
                    <v-icon left>mdi-delete</v-icon> Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import DataTable from '../../SharedComponents/dataTable'
import axios from "axios";

export default {
    components: {
        DataTable
    },
    data: () => ({
        itemsPerPage: 10,

        search: "",
        clusters: [],
        cluster: {},
        dialog: false,
        clusterEditDialog: false,
        clusterEdit: {},
        dialogDelete: false,
        confirmDialogVisible: false,
        isLoading: false,
        clusterToDelete: {},
        headers: [{
                title: "Name",
                value: "name",
                sortable: false,
            },
            {
                title: "Description",
                value: "description",
                sortable: false,
            },
            {
                title: "Actions",
                value: "actions",
                sortable: false,
            },
        ],
        serverItems: [],
        loading: false,
        totalItems: 0,
        searchDebounceTimeout: null, // Debounce for search
    }),
    methods: {
        loadItems({
            page,
            itemsPerPage
        }) {
            this.loading = true;

            axios
                .get("clusters/list", {
                    params: {
                        page,
                        per_page: itemsPerPage,
                        search: this.search, // Include search query
                    },
                })
                .then((response) => {
                    const responseData = response.data;
                    this.serverItems = responseData.data.data;
                    this.totalItems = responseData.data.meta.total;
                })
                .catch((error) => {
                    console.error("Error loading data:", error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        onSearch() {
            // Debounce search to avoid multiple rapid requests
            clearTimeout(this.searchDebounceTimeout);
            this.searchDebounceTimeout = setTimeout(() => {
                this.loadItems({
                    page: 1,
                    itemsPerPage: this.itemsPerPage
                });
            }, 300); // Adjust debounce delay as needed
        },
        addCluster() {
            const data = {
                ...this.cluster,
            };
            axios.post('/clusters/create', data, {
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
        //UpdateCluster
        editCluster(item) {
            this.clusterEdit = item
            this.clusterEditDialog = true
        },
        updateCluster() {
            const {
                id, // Add id here
                name,
                description,
            } = this.clusterEdit;

            axios
                .post("/clusters/update", {
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
                    this.clusterEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => {
                    this.showAlert(error.response.data.meta.message, 'error');
                    this.clusterEditDialog = false;
                });
        },
        deleteCluster() {
            axios.delete(`clusters/delete/${this.clusterToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.clusters.indexOf(this.clusterToDelete);
                    if (index > -1) {
                        this.clusters.splice(index, 1);
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
            this.clusterToDelete = item;
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
        this.loadItems({
            page: 1,
            itemsPerPage: this.itemsPerPage
        });
    },
};
</script>
