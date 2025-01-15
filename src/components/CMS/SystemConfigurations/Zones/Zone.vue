<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Zone" variant="flat" v-bind="activatorProps" rounded="xl"></v-btn>
                </template>
                <v-card prepend-icon="mdi-plus" title="Add Zone">
                    <v-form>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Name*" v-model="zone.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <PaginatedDropdown v-model="zone.clusterId" :api-endpoint="'clusters/list'" :label="'Select Cluster...'" :placeholder="'Search Cluster'"></PaginatedDropdown>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Description*" v-model="zone.description" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addZone" rounded="xl"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-account-group" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
            Zones
            <v-spacer></v-spacer>
        </v-toolbar>
        <DataTable :api-url="'zones/list'" :headers="headers">
					<template v-slot:actions="{ item }">
                <v-menu transition="slide-x-transition">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">
                            mdi-dots-vertical
                        </v-icon>
                    </template>
                    <!-- List for actions -->
                    <v-list>
                        <v-list-item @click="editZone(item)">
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
    <v-dialog v-model="zoneEditDialog" max-width="600">
        <v-card prepend-icon="mdi-plus" title="Update Cluster">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Name*" v-model="zoneEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-autocomplete v-model="zoneEdit.clusterId" :items="clusters" item-title="name" item-value="id" label="Cluster" density="compact" placeholder="Select Cluster" variant="outlined"></v-autocomplete>
                        </v-col>
                    </v-row>

                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Description*" v-model="zoneEdit.description" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="zoneEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateZone" rounded="xl"></v-btn>
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
                Are you sure you want to delete <b>"{{ zoneToDelete.name }}"</b>?
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
import DataTable from '../../SharedComponents/dataTable'
import PaginatedDropdown from '../../SharedComponents/paginatedDropdown'
import axios from "axios";
export default {
    components: {
        DataTable,
        PaginatedDropdown
    },
    data() {
        return {
            zones: [],
            clusters: [],
            zone: {},
            dialog: false,
            zoneEditDialog: false,
            zoneEdit: {},
            dialogDelete: false,
            confirmDialogVisible: false,
            isLoading: false,
            zoneToDelete: {},
            headers: [{
                    title: "Name",
                    value: "name",
                    sortable: false,
                },
                {
                    title: "Cluster",
                    value: "cluster.name",
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

            const fetchList = async (url) => {
                return await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
            };

            try {
                const [zonesResponse, clustersResponse] = await Promise.all([
                    fetchList("/zones/list"),
                    fetchList("/clusters/list")
                ]);

                this.zones = zonesResponse.data.data.data;
                this.clusters = clustersResponse.data.data.data;
            } catch (error) {
                const errorMessage = error.response.data.meta.message || "An error occurred";
                this.showAlert(errorMessage, 'error');
            } finally {
                this.isLoading = false;
            }
        },

        addZone() {
            const data = {
                ...this.zone,
            };
            axios.post('/zones/create', data, {
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
        editZone(item) {
            this.zoneEdit = {
                ...item
            }; // Copy the item data to avoid reference issues
            this.zoneEdit.clusterId = item.cluster.id || null; // Assign the cluster ID if available
            this.zoneEditDialog = true; // Open the dialog
        },
        updateZone() {
            const {
                id, // Add id here
                name,
                description,
                clusterId
            } = this.zoneEdit;

            axios
                .post("/zones/update", {
                    id: id, // Include id in the payload
                    name: name,
                    description: description,
                    clusterId: clusterId,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                })
                .then(response => {
                    this.showAlert(response.data.meta.message, 'success');
                    this.zoneEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => {
                    this.showAlert(error.response.data.meta.message, 'error');
                    this.zoneEditDialog = false;
                });
        },

        deleteCluster() {
            axios.delete(`zones/delete/${this.zoneToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.zones.indexOf(this.zoneToDelete);
                    if (index > -1) {
                        this.zones.splice(index, 1);
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
            this.zoneToDelete = item;
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
.dropdown-menu {
    max-height: 300px;
    overflow-y: auto;
}

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
