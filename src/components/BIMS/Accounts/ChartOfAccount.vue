<template>
<v-container fluid>
    <!-- Add Account Dialog -->
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="600">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-2" prepend-icon="mdi-plus" text="Add Account" variant="flat" v-bind="activatorProps" rounded="xl"></v-btn>
                </template>
                <v-card prepend-icon="mdi-plus" title="Add Account">
                    <v-form @submit.prevent="addAccount">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-text-field label="Account Name*" v-model="account.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-text-field label="Account Description*" v-model="account.description" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-text-field label="Account Type*" v-model="account.type" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text class="text-none" variant="tonal" @click="dialog = false" rounded="xl">Close</v-btn>
                            <v-btn type="submit" text class="text-none button-color" variant="flat" rounded="xl">Save</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>

    <!-- Chart of Accounts Table -->
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-account" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
            Chart of Accounts
            <v-spacer></v-spacer>
        </v-toolbar>
        <DataTable :api-url="'/account-list'" :headers="headers">
            <template v-slot:actions="{ item }">
                <v-menu transition="slide-x-transition">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-dots-vertical</v-icon>
                    </template>
                    <v-list>
                        <v-list-item @click="editAccount(item)">
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

    <!-- Edit Account Dialog -->
    <v-dialog v-model="accountEditDialog" max-width="600">
        <v-card prepend-icon="mdi-plus" title="Update Account">
            <v-form @submit.prevent="updateAccount">
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field label="Account Name*" v-model="accountEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field label="Account Description*" v-model="accountEdit.description" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field label="Account Type*" v-model="accountEdit.type" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text class="text-none" variant="tonal" @click="accountEditDialog = false" rounded="xl">Close</v-btn>
                    <v-btn type="submit" text class="text-none button-color" variant="flat" rounded="xl">Save</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="confirmDialogVisible" max-width="450">
        <v-card class="rounded-lg elevation-16" style="background-color: #f9f9f9;">
            <v-card-title class="text-h5 font-weight-bold white--text text-center py-2">
                <v-icon size="90" color="red" class="mr-3">mdi-delete</v-icon>
                Confirm Deletion
            </v-card-title>
            <v-card-text class="text-center py-1">
                <div class="font-weight-medium text-body-1 text-center mb-4">
                    Are you sure you want to delete <b>"{{ itemToDelete.name }}"</b>?
                </div>
                <div class="font-italic text-subtitle-1" style="color: #777;">
                    This action cannot be undone.
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center py-4">
                <v-btn text class="mr-3" variant="outlined" @click="confirmDialogVisible = false" rounded="xl" color="grey lighten-2">Cancel</v-btn>
                <v-btn text variant="tonal" @click="deleteItem" rounded="xl" color="red">
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
import alert from '@/mixins/swtalert';

export default {
    mixins: [alert],
    components: {
        DataTable
    },
    data() {
        return {
            search: "",
            accounts: [],
            account: {},
            dialog: false,
            accountEditDialog: false,
            accountEdit: {},
            confirmDialogVisible: false,
            isLoading: false,
            itemToDelete: {},
            headers: [{
                    title: 'Code',
                    value: 'name'
                },
                {
                    title: 'Account Name',
                    value: 'type'
                },
                {
                    title: 'Type',
                    value: 'name'
                },
                {
                    title: 'Category',
                    value: 'type'
                },
                {
                    title: 'Description',
                    value: 'name'
                },
                {
                    title: 'Action',
                    value: 'actions'
                }
            ],
        };
    },

    methods: {
        addAccount() {
            const data = {
                ...this.account
            };
            axios.post('/account-store', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.dialog = false;
                    setTimeout(() => window.location.reload(), 500);
                })
                .catch(error => this.showAlert(error.response.data.message, 'error'));
        },

        editAccount(item) {
            this.accountEdit = item;
            this.accountEditDialog = true;
        },

        updateAccount() {
            const {
                id,
                name,
                description,
                type
            } = this.accountEdit;
            axios.put(`/account-update/${id}`, {
                    name,
                    description,
                    type
                })
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.accountEditDialog = false;
                    setTimeout(() => window.location.reload(), 500);
                })
                .catch(error => {
                    this.showAlert(error.response.data.message, 'error');
                    this.accountEditDialog = false;
                });
        },

        deleteItem() {
            axios.delete(`/account-delete/${this.itemToDelete.id}`)
                .then(response => {
                    const index = this.accounts.indexOf(this.itemToDelete);
                    if (index > -1) {
                        this.accounts.splice(index, 1);
                    }
                    this.confirmDialogVisible = false;
                    this.showAlert(response.data.message, 'success');
                    setTimeout(() => window.location.reload(), 500);
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
