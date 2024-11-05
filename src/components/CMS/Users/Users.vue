<template>
<v-container fluid>
    <!-- User Management Header and Add User Dialog -->
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="900">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add User" variant="flat" v-bind="activatorProps" rounded="xl">
                    </v-btn>
                </template>
                <v-card  >
                    <v-toolbar>
                        <v-icon icon="mdi-plus" class="mx-5" size="40"></v-icon>&nbsp; Add User
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-form>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Name*" v-model="user.name" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Email*" v-model="user.email" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Phone No.*" v-model="user.phoneNumber" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Membership No.*" v-model="user.membershipNumber" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn text="Save" class="text-none button-color" variant="flat" @click="addUser" rounded="xl"></v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>

    <!-- User Table with Actions and Search -->
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-account-group" class="mx-5" size="40"></v-icon>&nbsp; Users
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-row justify="end" class="mt-2">
            <v-col cols="12" md="4" class="d-flex justify-end">
                <v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" flat variant="solo-filled" hide-details single-line class="search-field" :style="{ maxWidth: '300px' }">
                </v-text-field>
            </v-col>
        </v-row>
        <v-card-text>
            <v-data-table :headers="headers" :items="users" :search="search" :items-per-page="10" v-model:expanded="expanded" sho-expand>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-menu transition="slide-x-transition">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props">mdi-dots-vertical</v-icon>
                        </template>
                        <v-list>
                            <v-list-item @click="editUser(item)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-pencil</v-icon>
                                </template>
                                <v-list-item-title>Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="deleteDialog(item)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-delete</v-icon>
                                </template>
                                <v-list-item-title>Deactivate</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
                <!-- Expanded row content with attractive user details section -->
                <template v-slot:expanded-row="{ columns, item }">
                    <tr>
                        <td :colspan="columns.length">
                            <v-card flat class="expanded-card mx-5 my-5">
                                <v-row>
                                    <v-col cols="12" md="3" class="user-avatar-section d-flex align-center justify-center">
                                        <v-avatar size="100" class="mb-4">
                                            <v-icon color="blue-grey " size="100">mdi-account</v-icon>
                                        </v-avatar>
                                        <v-chip color="green" dark v-if="item.status === 'Active'">Active</v-chip>
                                        <v-chip color="red" dark v-else>Inactive</v-chip>
                                    </v-col>

                                    <v-col cols="12" md="9">
                                        <v-card flat class="user-details-card pa-4">
                                            <v-card-title class="font-weight-bold grey--text text--darken-3">User Details</v-card-title>
                                            <v-divider></v-divider>

                                            <v-row class="mt-4">
                                                <v-col cols="12" sm="6">
                                                    <p><strong>Name:</strong> {{ item.name }}</p>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <p><strong>Phone No.:</strong> {{ item.phoneNumber }}</p>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <p><strong>Membership No.:</strong> {{ item.membershipNumber }}</p>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <p><strong>Status:</strong> {{ item.status }}</p>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <!-- Tabs for Roles and Permissions -->
                                <v-tabs v-model="tab" color="primary" grow>
                                    <v-tab value="option-1">
                                        <v-icon left>mdi-account</v-icon>
                                        Roles
                                    </v-tab>
                                    <v-tab value="option-2">
                                        <v-icon left>mdi-lock</v-icon>
                                        Permissions
                                    </v-tab>
                                </v-tabs>

                                <!-- Tab Contents for Roles and Permissions -->
                                <v-card flat class="tab-content">
                                    <v-card-text v-if="tab === 'option-1'">
                                        <v-data-table :headers="rolesHeaders" :items="item.roles" dense class="elevation-1">
                                            <template v-slot:[`item.permissions`]="{ item: role }">
                                                <ul>
                                                    <li v-for="permission in role.permissions" :key="permission.id">{{ permission.name }}</li>
                                                </ul>
                                            </template>
                                            <template v-slot:[`item.actions`]="{ item }">
                                                <v-menu transition="slide-x-transition">
                                                    <template v-slot:activator="{ props }">
                                                        <v-icon v-bind="props">mdi-dots-vertical</v-icon>
                                                    </template>
                                                    <v-list>
                                                        <v-list-item @click="editRole(item)">
                                                            <template v-slot:prepend>
                                                                <v-icon>mdi-pencil</v-icon>
                                                            </template>
                                                            <v-list-item-title>Edit</v-list-item-title>
                                                        </v-list-item>
                                                        <v-list-item @click="deleteRole(item)">
                                                            <template v-slot:prepend>
                                                                <v-icon>mdi-delete</v-icon>
                                                            </template>
                                                            <v-list-item-title>Delete</v-list-item-title>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>

                                    <v-card-text v-if="tab === 'option-2'">
                                        <v-data-table :headers="permissionsHeaders" :items="permissions(item.roles)" dense class="elevation-1">
                                            <template v-slot:[`item.actions`]="{ item }">
                                                <v-menu transition="slide-x-transition">
                                                    <template v-slot:activator="{ props }">
                                                        <v-icon v-bind="props">mdi-dots-vertical</v-icon>
                                                    </template>
                                                    <v-list>
                                                        <v-list-item @click="editPermission(item)">
                                                            <template v-slot:prepend>
                                                                <v-icon>mdi-pencil</v-icon>
                                                            </template>
                                                            <v-list-item-title>Edit</v-list-item-title>
                                                        </v-list-item>
                                                        <v-list-item @click="deletePermission(item)">
                                                            <template v-slot:prepend>
                                                                <v-icon>mdi-delete</v-icon>
                                                            </template>
                                                            <v-list-item-title>Delete</v-list-item-title>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-card>
                        </td>
                    </tr>
                </template>
            </v-data-table>

        </v-card-text>
    </v-card>

    <!-- Confirmation Dialog for Deactivation -->
    <v-dialog v-model="confirmDialogVisible" max-width="400">
        <v-card class="rounded-lg" elevation="24">
            <v-card-title class="text-h5 white--text text-center my-1">
                <v-icon size="80" color="red">mdi-lock-open-variant</v-icon>
            </v-card-title>
            <v-card-text class="text-center">
                Are you sure you want to delete <b>"{{ UserToDelete.name }}"</b>?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close" class="text-none" variant="tonal" @click="confirmDialogVisible = false" rounded="xl"></v-btn>
                <v-btn color="blue" text="Ok" class="text-none" variant="flat" @click="deleteRole" rounded="xl"></v-btn>
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
            expanded: [],
            users: [],
            user: {},
            tab: 'option-1', // Set the initial tab to show roles by default
            rolesHeaders: [{
                    title: 'Role ID',
                    value: 'id'
                },
                {
                    title: 'Role Name',
                    value: 'name'
                },
                {
                    title: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
            permissionsHeaders: [{
                    title: 'Permission ID',
                    value: 'id'
                },
                {
                    title: 'Permission Name',
                    value: 'name'
                },
                {
                    title: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
            dialog: false,
            confirmDialogVisible: false,
            UserToDelete: {},
            headers: [{
                    title: '',
                    value: 'data-table-expand',
                    align: 'start',
                },
                {
                    title: "Name",
                    value: "name",
                    sortable: false,
                },
                {
                    title: "Phone No.",
                    value: "phoneNumber",
                    sortable: false,
                },
                {
                    title: "Membership No.",
                    value: "membershipNumber",
                    sortable: false,
                },
                {
                    title: "Status",
                    value: "status",
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
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            username: 'auth/userName',
        }),
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get("/users/list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    },
                });
                this.users = response.data.data.data;
            } catch (error) {
                this.showAlert(error.response.data.meta.message, 'error');
            }
        },
        addUser() {
            axios.post('/users/create', this.user, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    },
                })
                .then(response => {
                    this.showAlert(response.data.meta.message, 'success');
                    this.dialog = false;
                    this.fetchData();
                })
                .catch(error => this.showAlert(error.response.data.meta.message, 'error'));
        },
        deleteDialog(item) {
            this.UserToDelete = item;
            this.confirmDialogVisible = true;
        },
        permissions(roles) {
            return roles.flatMap(role => role.permissions);
        },

        editRole(role) {
            // Logic to edit role
            console.log("Editing role:", role);
        },

        editPermission(permission) {
            // Logic to edit permission
            console.log("Editing permission:", permission);
        },
        deletePermission(permission) {
            // Logic to delete permission
            console.log("Deleting permission:", permission);
        },

        deleteRole() {
            axios.delete(`/user-delete/${this.UserToDelete.id}`)
                .then(response => {
                    this.confirmDialogVisible = false;
                    this.fetchData();
                    this.showAlert(response.data.message, 'success');
                })
                .catch(error => {
                    this.confirmDialogVisible = false;
                    this.showAlert(error.message, 'error');
                });
        }
    },
    mounted() {
        this.fetchData();
    }
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
    background-color: #A82228 !important;
    color: white !important;
}

.text-color {
    color: #A82228;
}

.toolbar {
    background-color: #A82228;
    color: white;
}

.d-flex {
    display: flex;
}

.expanded-card {
    background: #f9f9f9;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.user-avatar-section {
    border-right: 1px solid #e0e0e0;
}

.user-details-card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-content {
    padding: 16px;
}
</style>
