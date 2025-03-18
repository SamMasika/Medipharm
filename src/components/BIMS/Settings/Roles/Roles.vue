<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Role" variant="flat" v-bind="activatorProps" rounded="xl"></v-btn>
                </template>
                <v-card prepend-icon="mdi-plus" title="Add Role">
                    <v-form>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-text-field label="Name*" v-model="role.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn  type="submit" text="Save" class="text-none button-color" variant="flat" @click="addRole" rounded="xl"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-card flat>
        <v-toolbar >
            <v-icon icon="mdi-account-group" class="mx-5 " size="40"></v-icon> &nbsp;
            Roles & Permissions
            <v-spacer></v-spacer>
           
        </v-toolbar>
        <v-row justify="end" class="mt-2">
            <v-col cols="12" md="4" class="d-flex justify-end">
                <v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" flat variant="solo-filled" hide-details single-line class="search-field" :style="{ maxWidth: '300px' }"></v-text-field>
            </v-col>
        </v-row>
        <v-card-text>
            <v-data-table :headers="headers" :items="roles" :search="search" :items-per-page="10">
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
                            <router-link to="/roles-details" style="text-decoration:none;">
                                <v-list-item>
                                    <template v-slot:prepend>
                                        <v-icon>mdi-pencil</v-icon>
                                    </template>
                                    <v-list-item-title>Edit</v-list-item-title>
                                </v-list-item>
                            </router-link>
                            <v-list-item @click="deleteDialog(item)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-delete</v-icon> <!-- Delete Icon -->
                                </template>
                                <v-list-item-title>Diactivate</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>

                <template v-slot:[`item.status`]="{ item }">

                    <v-chip :color="item.status ? 'green' : 'red'" :text="item.status ? 'Active' : 'Inactive'" class="text-mixedcase" size="small"></v-chip>

                </template>
            </v-data-table>
        </v-card-text>
    </v-card>

    <v-dialog v-model="confirmDialogVisible" max-width="400">
        <v-card class="rounded-lg" elevation="24">
            <v-card-title class=" text-h5 white--text text-center my-1">
                <v-icon size="80" color="red">mdi-lock-open-variant</v-icon>
            </v-card-title>
            <v-card-text class=" text-center ">
                Are you sure you want to delete <b>"{{ UserToDelete.name }}"</b>?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" class="text-none" variant="tonal" @click="confirmDialogVisible = false" rounded="xl"></v-btn>
                <v-btn  type="submit" text="Ok" class="text-none button-color" variant="flat" @click="UserToDelete" rounded="xl"></v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>

</v-container>
</template>

<script>
import axios from "axios";
import {
    mapGetters
} from 'vuex';
export default {
    data() {
        return {
            search: "",
            roles: [],
            dialog: false,
            userEditDialog: false,
            userEdit: {},
            Roledialog: false,
            dialogDelete: false,
            confirmDialogVisible: false,
            activateConfirm: false,
            deactivateConfirm: false,
            isLoading: false,
            UserToDelete: {},
            UserToActivate: {},
            role: {},
            selectedRole: {},
            searchRole: "",
            headers: [{
                    title: "Name",
                    value: "name",
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
    watch: {
        'user.confirm_password'(newValue) {
            this.passwordErrorMessages = [];
            if (newValue !== this.user.password) {
                this.passwordErrorMessages.push('Passwords do not match');
            }
        },
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            username: 'auth/userName',

        }),
    },
    methods: {
        async fetchData() {
            this.isLoading = true;
            try {
                const response = await axios.get("/role-list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                });

                this.roles = response.data.data.data;
            } catch (error) {
                this.showAlert(error.response.data.meta.message, 'error');
            } finally {
                this.isLoading = false;
            }
        },
        addRole() {
            const data = {
                ...this.role,
            };
            axios.post('/roles/create', data, {
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
        editRole(item) {
            this.userEdit = item
            this.userEditDialog = true
        },
        updateUser() {
            const {
                id,
                name,
                email,
                phone
            } = this.userEdit;
            const selectedRoles = this.selectedRole[id] || []; // Get the selected roles for the specific role

            axios
                .put("/user-update/" + this.userEdit.id, {

                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                    name: name,
                    email: email,
                    phone: phone,
                    roles: selectedRoles,
                })
                .then((response) => {
                    console.log(response)
                    this.$swal
                        .fire({
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        })
                        .then(() => {
                            // Handle success case
                            this.userEditDialog = false;
                            // Optionally, you can refresh the data after successful update
                            this.fetchData();
                        });
                })
                .catch((error) => {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'API call failed!',
                        text: error.message,
                    });
                    this.userEditDialog = false;
                });
        },
        activateUser() {
            axios.put(`user-activate/${this.UserToActivate.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.users.indexOf(this.UserToActivate);
                    if (index > -1) {
                        this.users.splice(index, 1);
                    }
                    this.deactivateConfirm = false;
                    this.activateConfirm = false;
                    this.$swal.fire({
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        })
                        .then(() => {
                            // Refresh the page
                            window.location.reload();
                        });
                })
                .catch(error => {
                    // API call failed, show error message
                    this.activateConfirm = false;
                    this.deactivateConfirm = false;
                    this.$swal.fire({
                        icon: 'error',
                        title: 'API call failed!',
                        text: error.message
                    });
                });
        },

        activateDialog(item) {
            this.UserToActivate = item;
            this.activateConfirm = true;
        },
        deactivateDialog(item) {
            this.UserToActivate = item;
            this.deactivateConfirm = true;
        },

        deleteRole() {
            axios.delete(`user-delete/${this.UserToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.users.indexOf(this.UserToDelete);
                    if (index > -1) {
                        this.users.splice(index, 1);
                    }
                    this.confirmDialogVisible = false;
                    this.$swal.fire({
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 2000
                        })
                        .then(() => {
                            // Refresh the page
                            window.location.reload();
                        });
                })
                .catch(error => {
                    // API call failed, show error message
                    this.confirmDialogVisible = false;
                    this.$swal.fire({
                        icon: 'error',
                        title: 'API call failed!',
                        text: error.message
                    });
                });
        },
        deleteDialog(item) {
            this.UserToDelete = item;
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

<style>
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
