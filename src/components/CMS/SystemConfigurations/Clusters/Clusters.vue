<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Cluster" variant="flat" v-bind="activatorProps" rounded="xl"></v-btn>
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
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-account-group " class="mx-5 custom-icon " size="40"></v-icon> &nbsp;
            Clusters
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-row justify="end" class="mt-2">
            <v-col cols="12" md="4" class="d-flex justify-end">
                <v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" flat variant="solo-filled" hide-details single-line class="search-field" :style="{ maxWidth: '300px' }"></v-text-field>
            </v-col>
        </v-row>
        <v-card-text>
            <v-data-table :headers="headers" :items="clusters" :search="search" :items-per-page="10">
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

               
            </v-data-table>
        </v-card-text>
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
    <v-dialog v-model="confirmDialogVisible" max-width="350">
        <v-card class="rounded-lg" elevation="24">
            <v-card-title class=" text-h5 white--text text-center my-1">
                <v-icon size="80" color="red">mdi-delete</v-icon>
            </v-card-title>
            <v-card-text class=" text-center ">
                Are you sure you want to delete <b>"{{ clusterToDelete.name }}"</b>?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" class="text-none" variant="tonal" @click="confirmDialogVisible = false" rounded="xl"></v-btn>
                <v-btn type="submit" text="Ok" class="text-none button-color" variant="flat" @click="deleteCluster" rounded="xl"></v-btn>
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
        };
    },

    methods: {
        async fetchData() {
            this.isLoading = true;
            try {
                const response = await axios.get("/clusters/list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                });
                this.clusters = response.data.data.data;
            } catch (error) {
                this.showAlert(error.response.data.meta.message, 'error');
            } finally {
                this.isLoading = false;
            }
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
