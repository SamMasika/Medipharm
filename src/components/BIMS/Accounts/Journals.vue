<template>
<v-dialog v-model="dialog" max-width="900">
    <v-card prepend-icon="mdi-plus" title="Add Journal">
        <v-form>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12" sm="12" md="12">
                        <v-text-field label="Journal Name*" v-model="journal.name" required variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="12" sm="12" md="12">
                        <v-text-field label="Journal Description*" v-model="journal.description" required variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="12" sm="12" md="12">
                        <v-text-field label="Journal Type*" v-model="journal.type" required variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addJournal" rounded="xl"></v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</v-dialog>
<v-container fluid v-if="itemsLength>0">
		<nav class="custom-breadcrumbs">
			<span class="breadcrumb-item" @click="$router.push('/dashboard')">Dashboard</span>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-item active">Journals</span>
	</nav>
    <!-- Add Account Dialog -->
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Journal" variant="flat" @click="dialog=true" rounded="xl"></v-btn>
        </v-col>
    </v-row>

    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-book-open-page-variant" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
            Journal Entries
            <v-spacer></v-spacer>
        </v-toolbar>
        <DataTable :api-url="'/journal-list'" :headers="headers">
            <template v-slot:actions="{ item }">
                <v-menu transition="slide-x-transition">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">
                            mdi-dots-vertical
                        </v-icon>
                    </template>
                    <!-- List for actions -->
                    <v-list>
                        <v-list-item @click="editJournal(item)">
                            <template v-slot:prepend>
                                <v-icon>mdi-pencil</v-icon> <!-- Ed Iconit -->
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

    <!-- Edit Journal Dialog -->
    <v-dialog v-model="journalEditDialog" max-width="600">
        <v-card prepend-icon="mdi-pencil" title="Update Journal">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Journal Name*" v-model="journalEdit.name" required variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Journal Description*" v-model="journalEdit.description" required variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Journal Type*" v-model="journalEdit.type" required variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="journalEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateJournal" rounded="xl"></v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>

    <!-- Confirm Delete Dialog -->
    <v-dialog v-model="confirmDialogVisible" max-width="450">
        <v-card class="rounded-lg elevation-16" style="background-color: #f9f9f9;">
            <v-card-title class="text-h5 font-weight-bold white--text text-center py-2" style="font-family: 'Roboto', sans-serif; font-size: 20px;">
                <v-icon size="90" color="red" class="mr-3">mdi-delete</v-icon>
                Confirm Deletion
            </v-card-title>

            <v-card-text class="text-center py-1" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6;">
                <div class="font-weight-medium text-body-1 text-center mb-4">
                    Are you sure you want to delete <b>"{{ itemToDelete.name }}"</b>?
                </div>
                <div class="font-italic text-subtitle-1" style="color: #777;">
                    This action cannot be undone.
                </div>
            </v-card-text>

            <v-divider></v-divider>

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
            <h2 class="mt-4 mb-2 text-grey-darken-2">No Journals Data Found</h2>
            <p class="text-grey">
                There are no journals records found at the moment.
            </p>
            <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Journal" variant="flat" @click="dialog = true" rounded="xl"></v-btn>

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
    mixins: [alert,NoRecords],
    components: {
        DataTable
    },
    data() {
        return {
            journal: {},
            journalEdit: {},
			dialog: false,
            journalEditDialog: false,
            confirmDialogVisible: false,
            itemToDelete: {},
            headers: [{
                    title: 'Code',
                    value: 'name'
                },
                {
                    title: 'Journal Name',
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
                    title: 'Actions',
                    value: 'actions'
                },
            ],
        };
    },

    methods: {
        fetchItems() {
            axios.get('/journal-list') // Replace with your actual API URL
                .then(response => {
                    this.itemsLength = response.data.data.meta.total; // Store the fetched data in 'purchases'
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        },
        addJournal() {
            const data = {
                ...this.journal
            };
            axios.post('/journal-store', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    }
                })
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.dialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload after success
                    }, 500);
                })
                .catch(error => this.showAlert(error.response.data.message, 'error'));
        },

        // Edit Journal
        editJournal(item) {
            this.journalEdit = item;
            this.journalEditDialog = true;
        },

        updateJournal() {
            const {
                id,
                name,
                description,
                type
            } = this.journalEdit;

            axios.put(`/journal-update/${id}`, {
                    name,
                    description,
                    type
                })
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.journalEditDialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload after success
                    }, 500);
                })
                .catch(error => {
                    this.showAlert(error.response.data.message, 'error');
                    this.journalEditDialog = false;
                });
        },

        deleteItem() {
            axios.delete(`/journal-delete/${this.itemToDelete.id}`)
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.confirmDialogVisible = false;
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
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
