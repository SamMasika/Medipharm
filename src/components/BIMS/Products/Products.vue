<template>
<v-dialog v-model="dialog" max-width="900">
    <v-card prepend-icon="mdi-plus" title="Add Product">
        <v-form>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-text-field label="Name*" placeholder="Name" v-model="product.name" required variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <PaginatedDropdown v-model="product.category_id" :api-endpoint="'/category-list'" label="Select Category..." placeholder="Search Category" item-title="categoryName"></PaginatedDropdown>
                    </v-col>
                </v-row>

                <v-row dense>
                    <v-col cols="12" sm="6">
                        <v-text-field label="Selling Price*" placeholder="Selling Price" v-model="product.selling_price" required variant="outlined" type="number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field label="Purchasing Price*" v-model="product.purchasing_price" required variant="outlined" type="number"></v-text-field>
                    </v-col>
                </v-row>

                <v-row dense>
                    <v-col cols="12" sm="6">
                        <PaginatedDropdown v-model="product.unit_id" :api-endpoint="'/unit-list'" label="Select Unit..." placeholder="Search Unit" item-title="name"></PaginatedDropdown>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field label="Low Stock Level*" placeholder="Low Stock Level" v-model="product.low_stock_level" required variant="outlined" type="number"></v-text-field>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="12" sm="4">
                        <v-text-field label="Brand(Optional)" placeholder="Brand(Optional)" v-model="product.selling_price" required variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field label="Weight(Optional)" placeholder="Weight(Optional)" v-model="product.purchasing_price" required variant="outlined" type="number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-text-field label="Length(Optional)" placeholder="Length(Optional)" v-model="product.purchasing_price" required variant="outlined" type="number"></v-text-field>
                    </v-col>
                </v-row>

                <v-row dense>
                    <v-col cols="12">
                        <v-file-input label="Product Image" v-model="product.image" accept="image/*" variant="outlined"></v-file-input>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addProduct" rounded="xl"></v-btn>
            </v-card-actions>
        </v-form>

    </v-card>
</v-dialog>
<v-container fluid v-if="itemsLength > 0">
		<nav class="custom-breadcrumbs">
			<span class="breadcrumb-item" @click="$router.push('/dashboard')">Dashboard</span>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-item active">Products</span>
	</nav>
    <!-- Add Account Dialog -->
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Product" variant="flat" @click="dialog=true" rounded="xl"></v-btn>
        </v-col>
    </v-row>
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-cube" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
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
                        <!-- Edit Item -->
                        <v-list-item @click="goToProductDetails(item.id)" class="rounded-lg hover:bg-blue-100 hover:text-blue-800">
                            <template v-slot:prepend>
                                <v-icon> mdi-eye</v-icon>
                            </template>
                            <v-list-item-title>View Details </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="editProduct(item)" class="rounded-lg hover:bg-blue-100 hover:text-blue-800">
                            <template v-slot:prepend>
                                <v-icon>mdi-pencil</v-icon>
                            </template>
                            <v-list-item-title>Edit</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="deleteDialog(item)" class="rounded-lg hover:bg-blue-100 hover:text-blue-800">
                            <template v-slot:prepend>
                                <v-icon> mdi-delete</v-icon>
                            </template>
                            <v-list-item-title>Delete</v-list-item-title>
                        </v-list-item>

                    </v-list>
                </v-menu>
            </template>
        </DataTable>

    </v-card>
    <v-dialog v-model="productEditDialog" max-width="900">
        <v-card prepend-icon="mdi-plus" title="Update Product">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Name*" v-model="productEdit.name" required variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <PaginatedDropdown v-model="productEdit.category_id" :api-endpoint="'/category-list'" label="Select Category..." placeholder="Search Category" item-title="categoryName" disabled></PaginatedDropdown>
                        </v-col>
                    </v-row>

                    <v-row dense>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Selling Price*" v-model="productEdit.selling_price" required variant="outlined" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Purchasing Price*" v-model="productEdit.purchasing_price" required variant="outlined" type="number"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row dense>
                        <v-col cols="12" sm="6">
                            <PaginatedDropdown v-model="productEdit.unit_id" :api-endpoint="'/unit-list'" label="Select Unit..." placeholder="Search Unit" item-title="name" disabled></PaginatedDropdown>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field label="Low Stock Level*" v-model="productEdit.low_stock_level" required variant="outlined" type="number"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row dense>
                        <v-col cols="12">
                            <v-file-input label="Product Image" v-model="productEdit.image" accept="image/*" variant="outlined"></v-file-input>
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="productEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateProduct" rounded="xl"></v-btn>
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
<v-container class="relative-container" fluid v-else>
    <div class="centered-message">
        <v-card class="pa-6 text-center" elevation="0" max-width="500">
            <v-icon size="48" color="grey">mdi-file-document-outline</v-icon>
            <h2 class="mt-4 mb-2 text-grey-darken-2">No Products Data Found</h2>
            <p class="text-grey">
                There are no products records found at the moment.
            </p>
            <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Product" variant="flat" @click="dialog = true" rounded="xl"></v-btn>

        </v-card>
    </div>
</v-container>
</template>

<script>
import DataTable from '@/components/BIMS/SharedComponents/dataTable';
import PaginatedDropdown from '@/components/BIMS/SharedComponents/paginatedDropdown'
import alert from '@/mixins/swtalert';
import NoRecords from '@/mixins/NoRecords';
import axios from "axios";
export default {
    mixins: [alert,NoRecords],
    components: {
        DataTable,
        PaginatedDropdown
    },
    data() {
        return {
            search: "",
            products: [],
			product: {},
            dialog: false,
            productEditDialog: false,
            productEdit: {},
            dialogDelete: false,
            confirmDialogVisible: false,
            isLoading: false,
            itemToDelete: {},
            headers: [{
                    title: 'Image',
                    value: 'image',
                },
                {
                    title: 'SKU',
                    value: 'SKU',
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
                    format: true,

                },
                {
                    title: 'Selling Price',
                    value: 'selling_price',
                    format: true
                },
                {
                    title: 'Quantity',
                    value: 'quantity',
                },
                {
                    title: 'Stock Status',
                    value: 'low_stock_level',
                },

                {
                    title: 'Action',
                    value: 'actions'
                }

            ],
        };
    },

    methods: {
        fetchItems() {
            axios.get('/product-list') // Replace with your actual API URL
                .then(response => {
					this.itemsLength = response.data.data.meta.total; // Store the fetched data in 'purchases'
					console.log(this.itemsLength)
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        },
        addProduct() {
            const formData = new FormData();
            formData.append('name', this.product.name);
            formData.append('selling_price', this.product.selling_price);
            formData.append('purchasing_price', this.product.purchasing_price);
            formData.append('category_id', this.product.category_id);
            formData.append('unit_id', this.product.unit_id);
            formData.append('low_stock_level', this.product.low_stock_level);
            formData.append('image', this.product.image);

            axios.post('/product-store', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
        //UpdateProduct
        editProduct(item) {
            this.productEdit = item
            this.productEditDialog = true
        },
        updateProduct() {
            const {
                id, // Add id here
                name,
                description,
            } = this.productEdit;

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
                    this.showAlert(response.data.message, 'success');
                    this.productEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => {
                    this.showAlert(error.response.data.message, 'error');
                    this.productEditDialog = false;
                });
        },

        deleteItem() {
            axios.delete(`product-delete/${this.itemToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.products.indexOf(this.itemToDelete);
                    if (index > -1) {
                        this.products.splice(index, 1);
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
        goToProductDetails(id) {
            this.$router.push({
                name: 'product-details',
                params: {
                    id
                }
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
