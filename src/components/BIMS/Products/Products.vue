<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Product" variant="flat" v-bind="activatorProps" rounded="xl"></v-btn>
                </template>
                <v-card prepend-icon="mdi-plus" title="Add Product">
                    <v-form>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Name*" v-model="product.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Selling Price*" v-model="product.selling_price" required variant="outlined" density="compact" type="number"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Purchasing Price*" v-model="product.purchasing_price" required variant="outlined" density="compact" type="number"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-select label="Category*" v-model="product.category_id" :items="categories" item-text="name" item-value="id" required variant="outlined" density="compact"></v-select>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-select label="Unit*" v-model="product.unit_id" :items="units" item-text="name" item-value="id" required variant="outlined" density="compact"></v-select>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Low Stock Level*" v-model="product.low_stock_level" required variant="outlined" density="compact" type="number"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="12" md="12">
                                    <v-file-input label="Image" v-model="product.image" accept="image/*" required variant="outlined" density="compact"></v-file-input>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addProduct" rounded="xl"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-account-group" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
            Products
            <v-spacer></v-spacer>
        </v-toolbar>
        <DataTable :api-url="'/product-list'" :headers="headers">
            <template v-slot:actions="{ item }">
                <v-menu transition="slide-x-transition">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">
                            mdi-dots-vertical
                        </v-icon>
                    </template>
                    <!-- List for actions -->
                    <v-list>
                        <v-list-item @click="editDepartment(item)">
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
    <v-dialog v-model="departmentEditDialog" max-width="600">
        <v-card prepend-icon="mdi-plus" title="Update Department">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Name*" v-model="departmentEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Description*" v-model="departmentEdit.description" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="departmentEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateDepartment" rounded="xl"></v-btn>
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
            products: [],
            product: {},
            dialog: false,
            departmentEditDialog: false,
            departmentEdit: {},
            dialogDelete: false,
            confirmDialogVisible: false,
            isLoading: false,
            itemToDelete: {},
            headers: [{
                    title: 'Image',
                    value: 'image',
                },
                {
                    title: 'Name',
                    value: 'name',
                },
                {
                    title: 'Category',
                    value: 'category',
                },
                {
                    title: 'Unit',
                    value: 'unit',
                },
                {
                    title: 'Purchasing Price',
                    value: 'purchasing_price',
                },
                {
                    title: 'Selling Price',
                    value: 'selling_price',
                },
                {
                    title: 'Available Stock',
                    value: 'quantity',
                },

                {
                    title: 'Action',
                    value: 'actions'
                }

            ],
        };
    },

    methods: {
        async fetchData() {
            this.isLoading = true;
            try {
                const response = await axios.get("/product-list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                });

                this.ministries = response.data.data.data;
            } catch (error) {
                this.showAlert(error.response.data.meta.message, 'error');
            } finally {
                this.isLoading = false;
            }
        },
        addProduct() {
            const data = {
                ...this.department,
            };
            axios.post('/department/create', data, {
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
        //UpdateDepartment
        editDepartment(item) {
            this.departmentEdit = item
            this.departmentEditDialog = true
        },
        updateDepartment() {
            const {
                id, // Add id here
                name,
                description,
            } = this.departmentEdit;

            axios
                .post("/department/update", {
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
                    this.departmentEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => {
                    this.showAlert(error.response.data.meta.message, 'error');
                    this.departmentEditDialog = false;
                });
        },

        deleteItem() {
            axios.delete(`department/delete/${this.itemToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.products.indexOf(this.itemToDelete);
                    if (index > -1) {
                        this.products.splice(index, 1);
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
