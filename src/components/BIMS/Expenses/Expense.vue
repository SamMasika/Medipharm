<template>
<v-dialog v-model="dialog" max-width="900">
    <v-card prepend-icon="mdi-plus" title="Add Expense">
        <v-form>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field type="date" label="Expense Date*" v-model="category.expense_date" required variant="outlined" density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <PaginatedDropdown v-model="expense.account_id" :api-endpoint="'/expense-account'" label="Expense Account..." placeholder="Search Accounts" item-title="name"></PaginatedDropdown>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="12" sm="4" md="4">
                        <v-text-field label="Amount*" v-model="expense.amount" required variant="outlined" density="compact"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <PaginatedDropdown v-model="expense.account_id" :api-endpoint="'/asset-account'" label="Paid Through..." placeholder="Search Accounts" item-title="name"></PaginatedDropdown>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="12" sm="12" md="12">
                        <v-textarea label="Description*" row-height="25" rows="3" v-model="expense.description" required variant="outlined" density="compact"></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addExpense" rounded="xl"></v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</v-dialog>
<v-container fluid v-if="itemsLength > 0">
    <nav class="custom-breadcrumbs">
        <span class="breadcrumb-item" @click="$router.push('/dashboard')">Dashboard</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item active">Categories</span>
    </nav>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Expense" variant="flat" @click="dialog=true" rounded="xl"></v-btn>
        </v-col>
    </v-row>
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-tag" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
            Expenses
            <v-spacer></v-spacer>
        </v-toolbar>
        <DataTable :api-url="'/expense-list'" :headers="headers">
            <template v-slot:actions="{ item }">
                <v-menu transition="slide-x-transition">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">
                            mdi-dots-vertical
                        </v-icon>
                    </template>
                    <!-- List for actions -->
                    <v-list>
                        <v-list-item @click="editExpense(item)">
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
    <v-dialog v-model="expenseEditDialog" max-width="600">
        <v-card prepend-icon="mdi-plus" title="Update Category">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Name*" v-model="expenseEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Description*" v-model="expenseEdit.description" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="expenseEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateExpense" rounded="xl"></v-btn>
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
            <h2 class="mt-4 mb-2 text-grey-darken-2">No Expenses Data Found</h2>
            <p class="text-grey">
                There are no expense records found at the moment.
            </p>
            <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Expense" variant="flat" @click="dialog = true" rounded="xl"></v-btn>

        </v-card>
    </div>
</v-container>
</template>

<script>
import DataTable from '@/components/BIMS/SharedComponents/dataTable';
import axios from "axios";
import alert from '@/mixins/swtalert';
import NoRecords from '@/mixins/NoRecords';
export default {
    mixins: [alert, NoRecords],
    components: {
        DataTable
    },
    data() {
        return {
            search: "",
            categories: [],
            category: {},
            dialog: false,
            expenseEditDialog: false,
            expenseEdit: {},
            dialogDelete: false,
            confirmDialogVisible: false,
            isLoading: false,
            itemToDelete: {},
            headers: [{
                    title: 'Name',
                    value: 'name',
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
            axios.get('/expense-list') // Replace with your actual API URL
                .then(response => {
                    this.itemsLength = response.data.data; // Store the fetched data in 'purchases'
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        },
        addExpense() {
            const data = {
                ...this.category,
            };
            axios.post('/category-store', data, {
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
        //UpdateCategory
        editExpense(item) {
            this.expenseEdit = item
            this.expenseEditDialog = true
        },
        updateExpense() {
            const {
                id,
                name,
                description

            } = this.expenseEdit;

            axios.put(`/category-update/${id}`, {
                    name,
                    description
                })
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.expenseEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => {
                    this.showAlert(error.response.data.message, 'error')
                    this.expenseEditDialog = false;
                });
        },

        deleteItem() {
            axios.delete(`/category-delete/${this.itemToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.categories.indexOf(this.itemToDelete);
                    if (index > -1) {
                        this.categories.splice(index, 1);
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
