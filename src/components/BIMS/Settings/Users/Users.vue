<template>
<v-container fluid>
    <!-- User Table with Actions and Search -->
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-account-group" class="mx-5" size="40"></v-icon>&nbsp; Users
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-row justify="end" class="mt-2">
            <v-col cols="12" md="4" class="d-flex justify-end">
                <v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" @input="onSearchChange" flat variant="solo-filled" hide-details single-line class="search-field" style="max-width: 300px;" />
            </v-col>
        </v-row>
        <v-card-text>
            <!-- <v-data-table :headers="headers" :items="users" :search="search" :items-per-page="10" v-model:expanded="expanded" sho-expand> -->
            <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="users" :items-length="totalItems" :loading="loading" item-value="id" :page="currentPage" @update:options="handlePageChange">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-menu transition="slide-x-transition" bottom>
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="cursor-pointer">mdi-dots-vertical</v-icon>
                        </template>
                        <v-list>
                            <!-- Edit Item -->
                            <v-list-item @click="editUser(item)" class="rounded-lg hover:bg-blue-100 hover:text-blue-800">
                                <template v-slot:prepend>
                                    <v-icon>mdi-pencil</v-icon>
                                </template>
                                <v-list-item-title class="font-weight-bold">Edit</v-list-item-title>
                            </v-list-item>
                            <template v-if="item.status === true">
                                <v-list-item @click="deactivateDialog(item)" class="rounded-lg hover:bg-blue-100 hover:text-blue-800">
                                    <template v-slot:prepend>
                                        <v-icon> mdi-toggle-switch</v-icon>
                                    </template>
                                    <v-list-item-title class="font-weight-bold">Deactivate</v-list-item-title>
                                </v-list-item>
                            </template>
                            <template v-else>
                                <v-list-item @click="activateDialog(item)" class="rounded-lg hover:bg-blue-100 hover:text-blue-800">
                                    <template v-slot:prepend>
                                        <v-icon> mdi-toggle-switch-off</v-icon>
                                    </template>
                                    <v-list-item-title class="font-weight-bold">Activate</v-list-item-title>
                                </v-list-item>
                            </template>
                            <v-list-item @click="deleteDialog(item)" class="rounded-lg hover:bg-blue-100 hover:text-blue-800">
                                <template v-slot:prepend>
                                    <v-icon> mdi-delete</v-icon>
                                </template>
                                <v-list-item-title class="font-weight-bold">Delete</v-list-item-title>
                            </v-list-item>

                        </v-list>
                    </v-menu>

                </template>
                <template v-slot:[`item.status`]="{ item }">

                    <v-chip :color="item.status ? 'green' : 'red'" :text="item.status ? 'Active' : 'Inactive'" variant="flat" class="text-mixedcase" size="small"></v-chip>

                </template>
                <template v-slot:expanded-row="{ columns, item }">
                    <tr>
                        <td :colspan="columns.length">
                            <v-card flat class="expanded-card mx-5 my-5">
                                <v-row>
                                    <v-col cols="12" md="3" class="user-avatar-section d-flex align-center justify-center">
                                        <v-avatar size="100" class="mb-4">
                                            <v-icon color="blue-grey " size="100">mdi-account</v-icon>
                                        </v-avatar>
                                        <v-chip color="green" dark v-if="item.status === true">Active</v-chip>
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
                                                    <p><strong>Phone No.:</strong> {{ item.phone }}</p>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <p><strong>Email:</strong> {{ item.email }}</p>
                                                </v-col>
                                                <v-col cols="12" sm="6">
                                                    <p><strong>Company:</strong>{{item.company.companyId }}

                                                    </p>
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
                                    <v-card-title>
                                        <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Edit User" @click="editUser(item)" variant="outlined flat" v-bind="activatorProps" rounded="xl"></v-btn>
                                    </v-card-title>
                                    <v-card-text v-if="tab === 'option-1'">
                                        <v-data-table :headers="rolesHeaders" :items="item.roles" dense class="elevation-1 pa-8">
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
                                        <v-data-table :headers="permissionsHeaders" :items="permissions(item.roles)" dense class="elevation-1 pa-8">
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
            </v-data-table-server>

        </v-card-text>
    </v-card>
    <v-dialog v-model="userEditDialog" persistent max-width="900px">
        <v-card class="elevation-12 ">
            <v-card-title class="text-h5 font-weight-bold text-center">
                <v-icon left class="mr-2">mdi-pencil</v-icon> Edit User Details
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
                <v-form @submit.prevent="updateUser">
                    <!-- User Info Fields -->
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="userEdit.name" label="Name" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="userEdit.phone" label="Phone" variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Username and Email Fields -->
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="userEdit.username" label="Username" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="userEdit.email" label="Email" type="email" variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Role Selection -->
                    <v-row>
                        <v-col cols="12">
													<v-autocomplete v-model="selectedRole[userEdit.id]" :items="filteredRoles" item-title="name" item-value="id" class="rounded-lg custom-autocomplete" color="blue-lighten-1" label="Select Permissions" variant="outlined" multiple>
															<template v-slot:chip="{ props, item }">
																	<v-chip v-bind="props" color="blue-lighten-1" closable @click="props.select" @click:close="remove(item)">
																			{{ item.raw.name }}
																	</v-chip>
															</template>
													</v-autocomplete>
													</v-col>
												</v-row>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <!-- Dialog Actions -->
            <v-card-actions class="d-flex ">
                <v-btn text class="text-none" variant="tonal" @click="userEditDialog = false" rounded="xl">
                    Close
                </v-btn>
                <v-btn type="submit" text class="text-none button-color" variant="contained" @click="updateUser" rounded="xl">
                    Update
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>

    <v-dialog v-model="deactivateConfirm" max-width="450">
        <v-card class="rounded-lg elevation-16" style="background-color: #f9f9f9;">
            <!-- Title Section -->
            <v-card-title class="text-h5 font-weight-bold white--text text-center py-2" style="font-family: 'Roboto', sans-serif; font-size: 20px;">
                <v-icon size="90" color="red" class="mr-3">mdi-lock</v-icon>
                Confirm Deactivation
            </v-card-title>

            <!-- Content Section -->
            <v-card-text class="text-center py-1" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6;">

                <div class="font-weight-medium text-body-1 text-center mb-4">
                    Are you sure you want to deactivate <b>"{{ UserToActivate.name }} </b>?
                </div>

            </v-card-text>

            <!-- Divider -->
            <v-divider></v-divider>

            <!-- Action Buttons -->
            <v-card-actions class="justify-center py-4">
                <v-btn text class="mr-3" variant="outlined" @click="deactivateConfirm = false" rounded="xl" color="grey lighten-2" style="font-family: 'Roboto', sans-serif; font-weight: 500;">
                    Cancel
                </v-btn>
                <v-btn text variant="tonal" @click="activateUser" rounded="xl" color="red" style="font-family: 'Roboto', sans-serif; font-weight: 600;">
                    <v-icon left>mdi-delete</v-icon> Deactivate
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="activateConfirm" max-width="450">
        <v-card class="rounded-lg elevation-16" style="background-color: #f9f9f9;">
            <!-- Title Section -->
            <v-card-title class="text-h5 font-weight-bold white--text text-center py-2" style="font-family: 'Roboto', sans-serif; font-size: 20px;">
                <v-icon size="90" color="green" class="mr-3">mdi-delete</v-icon>
                Confirm Activation
            </v-card-title>

            <!-- Content Section -->
            <v-card-text class="text-center py-1" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6;">

                <div class="font-weight-medium text-body-1 text-center mb-4">
                    Are you sure you want to activate <b>"{{ UserToActivate.name }} </b>?
                </div>
            </v-card-text>

            <!-- Divider -->
            <v-divider></v-divider>

            <!-- Action Buttons -->
            <v-card-actions class="justify-center py-4">
                <v-btn text class="mr-3" variant="outlined" @click="activateConfirm = false" rounded="xl" color="grey lighten-2" style="font-family: 'Roboto', sans-serif; font-weight: 500;">
                    Cancel
                </v-btn>
                <v-btn text variant="tonal" @click="activateUser" rounded="xl" color="success" style="font-family: 'Roboto', sans-serif; font-weight: 600;">
                    <v-icon left>mdi-check</v-icon> Activate
                </v-btn>
            </v-card-actions>
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
                    Are you sure you want to delete <b>"{{ UserToDelete.name }} </b>?
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
                <v-btn text variant="tonal" @click="activateUser" rounded="xl" color="red" style="font-family: 'Roboto', sans-serif; font-weight: 600;">
                    <v-icon left>mdi-delete</v-icon> Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</v-container>
</template>

<script>
import axios from "axios";
import singledatatable from "@/mixins/singledatatable";
import alert from "@/mixins/swtalert";
import {
    mapGetters
} from 'vuex';

export default {
    mixins: [singledatatable,alert],
   
    data() {
        return {
            search: "", // Search query         
            expanded: [],
            userEditDialog: false,
            deactivateConfirm: false,
            activateConfirm: false,
            UserToActivate: {},
            users: [],
            user: {},
            dialog: false,
            confirmDialogVisible: false,
            UserToDelete: {},
            userEdit: {},
            selectedRole: {},
            tab: 'option-1', // Set the initial tab to show roles by default
            rolesHeaders: [{
                    title: 'Role ID',
                    value: 'id'
                },
                {
                    title: 'Role Name',
                    value: 'name'
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
                    title: "Mobile Phone",
                    value: "phone",
                    sortable: false,
                },
                {
                    title: "Email",
                    value: "email",
                    sortable: false,
                },
                {
                    title: "Company Name",
                    value: "company.companyName",
                    sortable: false,
                },
                {
                    title: "Company ID",
                    value: "company.companyId",
                    sortable: false,
                },
                {
                    title: "Email",
                    value: "email",
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
        filteredRoles() {
            if (!this.searchRole) {
                return this.role;

            }
            const keyword = this.searchRole.toLowerCase();
            return this.role.filter((role) =>
                role.name.toLowerCase().includes(keyword)
            );
        },

        likesAllRole() {
            return this.selectedRole.length === this.role.length
        },
        likesSomeRole() {
            return this.selectedRole.length > 0 && !this.likesAllRole
        },
        icon() {
            if (this.likesAllRole) return 'mdi-close-box'
            if (this.likesSomeRole) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        },

        permissionsToUpdate() {
            // Find the permissions that were removed (unchecked)
            const removedPermissions = this.userEdit.role.filter(role => !this.selectedRole.includes(role));
            // Find the permissions that were added (checked)
            const addedPermissions = this.selectedRole.filter(role => !this.userEdit.role.includes(role));
            return {
                removed: removedPermissions,
                added: addedPermissions,
            };
        },
    },
    methods: {
        async fetchData() {
            try {
                this.loading = true;

                // Fetch Users & Roles simultaneously
                const userParams = {
                    page: this.currentPage,
                    per_page: this.itemsPerPage === -1 ? this.totalItems : this.itemsPerPage,
                    search: this.search,
                };
				

                const [userResponse, roleResponse] = await Promise.all([
                    axios.get("/user-list", {
                        params: userParams
                    }),
                    axios.get("/role-list") // Fetch roles
                ]);

                // Process Users
                const responseData = userResponse.data.data || {};
                this.users = Array.isArray(responseData.data) ? responseData.data : [];
                this.totalItems = responseData.meta ?.total || 0;
                this.totalPages = responseData.meta ?.last_page || 1;
                this.users.forEach(user => {
                    const selectedRoles = Array.isArray(user.roles) ? user.roles.map(role => role.id) : [];
                    this.selectedRole[user.id] = selectedRoles;
                });

                // Process Roles with correct data path
                const roleData = roleResponse.data.data ?.data || [];
                if (Array.isArray(roleData)) {
                    this.role = roleData.map(role => ({
                        id: role.id,
                        name: role.name,
                    }));
                } else {
                    console.error("Invalid role data structure:", roleResponse.data.data);
                    this.role = [];
                }

                console.log(this.role);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                this.loading = false;
            }
        },
        hasRole(user, roleName) {
            return user.roles.some(role => role.name === roleName);
        },

        remove(item) {
            const userId = this.userEdit.id;
            const index = this.selectedRole[userId].indexOf(item.id);
            if (index >= 0) {
                this.selectedRole[userId].splice(index, 1);
            }
        },

        customFilter(value, search, item) {
            if (!search) return true;
            const keyword = search.toLowerCase();
            return item.name.toLowerCase().includes(keyword);
        },
        toggle(userId) {
            this.$nextTick(() => {
                const userRoles = this.selectedRole[userId] || [];

                if (userRoles.length === this.role.length) {
                    this.selectedRole[userId] = []; // Directly update in Vue 3
                } else {
                    const selectedRoles = this.$refs.roleDropdown[userId] ?.internalValue || [];

                    this.selectedRole[userId] = this.role
                        .filter(role => selectedRoles.includes(role.id))
                        .map(role => role.id);
                }
            });
        },
        editUser(item) {
            this.userEdit = item
            this.userEditDialog = true
        },
        updateUser() {
            const {
                id,
                name,
                username,
                email,
                phone
            } = this.userEdit;
            const selectedRoles = this.selectedRole[id] || []; // Get the selected roles for the specific role

            axios
                .put("/user-update/" + this.userEdit.id, {
                    name: name,
                    username: username,
                    email: email,
                    phone: phone,
                    roles: selectedRoles,
                })
                .then((response) => {
                    console.log(response); // You can log the response for debugging
                    if (response.data && response.data.message) {
                        this.showAlert(response.data.message, 'success');
                        this.userEditDialog = false;
                        this.fetchData(); // Optionally, refresh data after successful update
                    } else {
                        console.error('No message found in the response data');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    this.showAlert('API call failed! ' + error.message, 'error');
                    this.userEditDialog = false;
                });
        },
        deleteDialog(item) {
            this.UserToDelete = item;
            this.confirmDialogVisible = true;
        },
        permissions(roles) {
            return roles.flatMap(role => role.permissions);
        },

        activateUser() {
            axios.put(`user-activate/${this.UserToActivate.id}`)
                .then(response => {
                    // Remove the item from the data array
                    const index = this.users.indexOf(this.UserToActivate);
                    if (index > -1) {
                        this.users.splice(index, 1);
                    }
                    this.deactivateConfirm = false;
                    this.activateConfirm = false;

                    // Use showAlert to display the success message
                    this.showAlert(response.data.message, 'success');

                    // Optionally, refresh the page after success
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    // API call failed, show error message using showAlert
                    this.activateConfirm = false;
                    this.deactivateConfirm = false;
                    this.showAlert('API call failed! ' + error.message, 'error');
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

        deleteUser() {
            axios.delete(`user-delete/${this.UserToDelete.id}`)
                .then(response => {
                    // Remove the user from the list without reloading the page
                    const index = this.users.indexOf(this.UserToDelete);
                    if (index > -1) {
                        this.users.splice(index, 1);
                    }
                    this.confirmDialogVisible = false;

                    // Show success message
                    this.showAlert(response.data.message, "success");

                    // Optionally refresh the page after 2 seconds
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(error => {
                    this.confirmDialogVisible = false;

                    // Show error message
                    this.showAlert("API call failed! " + error.message, "error");
                });
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
        },
    },
    watch: {
        currentPage() {
            this.fetchData(); // Fetch data when page changes
        },
        itemsPerPage() {
            this.currentPage = 1; // Reset to page 1 when items per page changes
            this.fetchData();
        },
    },

    mounted() {
        this.fetchData();

        // Set the initially selected permissions
        // this.selectedRole = this.role
        //     .filter(role => this.userEdit.role.includes(role.id))
        //     .map(role => role.id);

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

    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.user-details-card {
    /* background: #ffffff; */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-content {
    padding: 16px;
}
</style>
