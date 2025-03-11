<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="800">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-2" prepend-icon="mdi-plus" text="Add Supplier" variant="flat" v-bind="activatorProps" rounded="xl"></v-btn>
                </template>
                <v-card prepend-icon="mdi-plus" title="Add Supplier">
                    <v-form>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field placeholder="Name*" v-model="supplier.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field placeholder="Contact Person*" v-model="supplier.contact_person" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field placeholder="Phone*" v-model="supplier.phone" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field placeholder="Email*" type="email" v-model="supplier.email" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field placeholder="Location*" v-model="supplier.location" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addSupplier" rounded="xl"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-truck" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
            Suppliers
            <v-spacer></v-spacer>
        </v-toolbar>
        <DataTable :api-url="'/supplier-list'" :headers="headers">
            <template v-slot:actions="{ item }">
                <v-menu transition="slide-x-transition">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">
                            mdi-dots-vertical
                        </v-icon>
                    </template>
                    <!-- List for actions -->
                    <v-list>
                        <v-list-item @click="editSupplier(item)">
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
    <v-dialog v-model="supplierEditDialog" max-width="600">
        <v-card prepend-icon="mdi-plus" title="Update Supplier">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field placeholder="Name*" v-model="supplierEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field placeholder="Contact Person*" v-model="supplierEdit.contact_person" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field placeholder="Phone*" v-model="supplierEdit.phone" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field placeholder="Email*" type="email" v-model="supplierEdit.email" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field placeholder="Location*" v-model="supplierEdit.location" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="supplierEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateSupplier" rounded="xl"></v-btn>
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
import DataTable from '@/components/BIMS/SharedComponents/dataTable';
import axios from "axios";
export default {
    components: {
        DataTable
    },
    data() {
        return {
            search: "",
            suppliers: [],
            supplier: {},
            dialog: false,
            supplierEditDialog: false,
            supplierEdit: {},
            dialogDelete: false,
            confirmDialogVisible: false,
            isLoading: false,
            itemToDelete: {},
            headers: [{
                    title: 'Name',
                    value: 'name',
                },
                {
                    title: 'Contact Person',
                    value: 'contact_person',
                },
                {
                    title: 'Email',
                    value: 'email',
                },
                {
                    title: 'Phone',
                    value: 'phone',
                },
                {
                    title: 'Location',
                    value: 'location',
                },
                {
                    title: 'Action',
                    value: 'actions'
                }

            ],
        };
    },

    methods: {

        addSupplier() {
            const data = {
                ...this.supplier,
            };
            axios.post('/supplier-store', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    }
                })
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.dialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => this.showAlert(error.response.data.message, 'error'));
        },
        //UpdateSupplier
        editSupplier(item) {
            this.supplierEdit = item
            this.supplierEditDialog = true
        },
        updateSupplier() {
            const {
                id,
                supplierName,
                description

            } = this.supplierEdit;

            axios.put(`/supplier-update/${id}`, {
                    supplierName,
                    description
                })
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.supplierEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => {
                    this.showAlert(error.response.data.message, 'error')
                    this.supplierEditDialog = false;
                });
        },

        deleteItem() {
            axios.delete(`/supplier-delete/${this.itemToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.suppliers.indexOf(this.itemToDelete);
                    if (index > -1) {
                        this.suppliers.splice(index, 1);
                    }
                    this.confirmDialogVisible = false;
                    this.showAlert(response.data.message, 'success');

                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => this.showAlert(error.response.data.message, 'error'));
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
