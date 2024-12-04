<template>
<v-container fluid>
    <v-row justify="end">
        <v-col cols="12" md="auto" class="d-flex justify-end">
            <v-dialog v-model="dialog" max-width="900">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn class="text-none font-weight-regular import-color my-5" prepend-icon="mdi-file-import" text="Add Event" variant="flat" rounded="xl">
                        Import Members
                    </v-btn>
                    <v-btn class="text-none font-weight-regular button-color my-5" prepend-icon="mdi-plus" text="Add Event" variant="flat" v-bind="activatorProps" rounded="xl">
                        Add Member
                    </v-btn>
                </template>

                <v-card prepend-icon="mdi-plus" title="Add Member">
                    <v-form @submit.prevent="addMember">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" sm="4" md="4">
                                    <v-text-field label="Firstname*" v-model="member.firstName" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-text-field label="Middlename(Optional)" v-model="member.middleName" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-text-field label="Lastname*" v-model="member.lastName" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="4" md="4">
                                    <v-text-field type="date" label="Birthdate*" v-model="member.birthDate" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-text-field type="email" label="Email(Optional)" v-model="member.email" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-text-field label="Phone No.*" v-model="member.phoneNumber" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="4" md="4">
                                    <v-text-field label="Tribe" v-model="member.tribe" required variant="outlined" density="compact"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-autocomplete v-model="member.nationality" label="Nationality" density="compact" placeholder="Nationality" variant="outlined" item-title="country_name" item-value="country_name" :items="countries"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-autocomplete v-model="member.clusterId" label="Cluster" density="compact" placeholder="Cluster" variant="outlined" item-title="name" item-value="id" :items="clusters" @change="onClusterChange"></v-autocomplete>
                                </v-col>

                                <!-- Zone Dropdown -->
                                <v-col cols="12" sm="4" md="4">
                                    <v-autocomplete v-model="member.zoneId" label="Zone" density="compact" placeholder="Zone" variant="outlined" item-title="name" item-value="id" :items="filteredZones" @change="onZoneChange" :disabled="!member.clusterId"></v-autocomplete>
                                </v-col>

                                <!-- Deacon Dropdown -->
                                <v-col cols="12" sm="4" md="4">
                                    <v-autocomplete v-model="member.deaconId" label="Deacon" density="compact" placeholder="Deacon" variant="outlined" item-title="name" item-value="id" :items="filteredDeacons" :disabled="!member.zoneId"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-file-input label="Member's Photo" v-model="member.image" required variant="outlined" density="compact"></v-file-input>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="12" sm="4" md="4">
                                    <v-autocomplete label="--Status Reason--" v-model="member.statusReason" :items="statusReasonsOptions" variant="outlined" density="compact" item-title="text" item-value="value" return-object></v-autocomplete>

                                </v-col>
                            </v-row>
                            <!-- Radio Group for member Occurrence -->
                            <v-row dense>
                                <v-col cols="12" sm="6" md="6">
                                    <v-radio-group v-model="member.gender" row density="compact" label="What is your gender?">
                                        <v-radio label="Male" value="Male"></v-radio>
                                        <v-radio label="Female" value="Female"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-radio-group v-model="member.maritalStatus" row density="compact" label="What is your marital status?">
                                        <v-radio label="Single" value="Single"></v-radio>
                                        <v-radio label="Married" value="Married"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                            <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" rounded="xl">Save</v-btn>
                        </v-card-actions>
                    </v-form>

                </v-card>
            </v-dialog>

        </v-col>
    </v-row>
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-account-group custom-icon" class="mx-5 " size="40"></v-icon> &nbsp;
            Members
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-row justify="end" class="mt-2">
            <v-col cols="12" md="4" class="d-flex justify-end">
                <v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" flat variant="solo-filled" hide-details single-line class="search-field" :style="{ maxWidth: '300px' }"></v-text-field>
            </v-col>
        </v-row>
        <v-card-text>
            <v-data-table :headers="headers" :items="members" :search="search" :items-per-page="10">
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
                            <v-list-item @click="viewMember(item.id)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-eye</v-icon>
                                </template>
                                <v-list-item-title>View</v-list-item-title>
                            </v-list-item>

                            <v-list-item @click="editEvent(item)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-pencil</v-icon>
                                </template>
                                <v-list-item-title>Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="deleteDialog(item)">
                                <template v-slot:prepend>
                                    <v-icon>mdi-delete</v-icon>
                                </template>
                                <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>

                <template v-slot:[`item.birthDate`]="{ item }">
                    {{ formatDate(item.birthDate) }}
                </template>
                <template v-slot:[`item.status`]="{ item }">

                    <v-chip :color="item.status ? 'green' : 'red'" :text="item.status ? 'Active' : 'Inactive'" variant="flat" class="text-mixedcase" size="small"></v-chip>

                </template>

            </v-data-table>

        </v-card-text>
    </v-card>
    <v-dialog v-model="memberEditDialog" max-width="800">
        <v-card prepend-icon="mdi-plus" title="Update event">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field label="Name*" v-model="memberEdit.name" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Radio Group for Event Occurrence -->
                    <v-row dense>
                        <v-col cols="12">
                            <v-radio-group v-model="memberEdit.allDay" row density="compact" label="Is it happening in a single day?">
                                <v-radio label="Yes" :value="true"></v-radio>
                                <v-radio label="No" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <!-- Date and Time Fields -->
                    <v-row dense>
                        <v-col cols="12" sm="4">
                            <v-text-field type="date" label="Start Date*" v-model="memberEdit.startDate" required variant="outlined" density="compact"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-text-field type="time" label="Start Time*" v-model="memberEdit.startTime" required variant="outlined" density="compact"></v-text-field>
                        </v-col>

                        <!-- Conditionally Display End Date and Time Fields if 'No' is Selected -->
                        <v-col v-if="!memberEdit.allDay" cols="12" sm="4">
                            <v-text-field type="date" label="End Date*" v-model="memberEdit.endDate" required variant="outlined" density="compact"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-text-field type="time" label="End Time*" v-model="memberEdit.endTime" required variant="outlined" density="compact"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Description Field -->
                    <v-row dense>
                        <v-col cols="12">
                            <v-textarea label="Description (Optional)" v-model="memberEdit.description" row-height="25" rows="3" variant="outlined" auto-grow shaped></v-textarea>
                        </v-col>
                    </v-row>

                    <!-- Color Picker -->
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field label="Event Color" readonly v-model="memberEdit.color" variant="outlined" density="compact" @click="colorPickerDialog = true"></v-text-field>
                            <v-menu v-model="colorPickerDialog" offset-y>
                                <v-color-picker v-model="memberEdit.color" hide-mode-switch swatches swatches-max-height="200"></v-color-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="memberEditDialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="updateEvent" rounded="xl"></v-btn>
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
               
								<template v-if="memberToDelete.filePath">
                    <!-- Display the image if it exists -->
                    <v-avatar size="100" class="mb-3">
                        <img :src="getImageUrl(memberToDelete.filePath)" alt="Profile Image" width="100" class="my-3">
                    </v-avatar>
                </template>
                <template v-else>
                    <!-- Fallback Icon if no image -->
                    <v-avatar size="100" class="mb-3">
                        <v-icon color="blue-grey" size="100">mdi-account-circle</v-icon>
                    </v-avatar>
                </template>

                <div class="font-weight-medium text-body-1 text-center mb-4">
                    Are you sure you want to delete <b>"{{ memberToDelete.firstName }} - {{ memberToDelete.middleName }} - {{ memberToDelete.lastName }}"</b>?
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
                <v-btn text variant="tonal" @click="deleteMember" rounded="xl" color="red" style="font-family: 'Roboto', sans-serif; font-weight: 600;">
                    <v-icon left>mdi-delete</v-icon> Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</v-container>
</template>

<script>
import axios from "axios";
import {
    statusReasonsOptions,
} from '@/json/enum'
export default {
    data() {
        return {
            search: "",
            members: [],
            clusters: [],
            statusReasonsOptions,
            zones: [],
            deacons: [],
            countries: [],
            member: {
                clusterId: null,
                zoneId: null,
                deaconId: null,
            },

            dialog: false,
            memberEditDialog: false,
            memberEdit: {},
            dialogDelete: false,
            confirmDialogVisible: false,
            colorPickerDialog: false,
            isLoading: false,
            memberToDelete: {},
            headers: [{
                    title: "Membership No.",
                    value: "membershipNumber",
                    sortable: true
                },
                {
                    title: "Firstname",
                    value: "firstName",
                    sortable: true
                },
                {
                    title: "Middlename",
                    value: "middleName",
                    sortable: true
                },
                {
                    title: "Lastname",
                    value: "lastName",
                    sortable: true
                },
                {
                    title: "Gender",
                    value: "gender",
                    sortable: true
                },
                {
                    title: "Phone",
                    value: "phoneNumber",
                    sortable: true
                },
                {
                    title: "Birthdate",
                    value: "birthDate",
                    sortable: true
                },
                {
                    title: "Status",
                    value: "status",
                    sortable: false
                },
                {
                    title: "Actions",
                    value: "actions",
                    sortable: false
                },
            ],
        };
    },
    computed: {
        filteredZones() {
            const filtered = this.zones.filter(zone => zone.cluster.id === this.member.clusterId);
            return filtered;
        },
        filteredDeacons() {
            return this.deacons.filter((deacon) => deacon.zone.id === this.member.zoneId);
        },
    },

    methods: {
        // Format the date for display
        formatDate(date) {
            if (!date) return "";
            return new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(new Date(date));
        },
        getImageUrl(imageName) {
            return this.$getImageUrl(imageName);
        },

        // Fetch data for clusters, zones, members, and deacons
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
                const [zonesResponse, clustersResponse, membersResponse, deaconsResponse] =
                await Promise.all([
                    fetchList("/zones/list"),
                    fetchList("/clusters/list"),
                    fetchList("/members/list"),
                    fetchList("/deacons/list"),
                ]);

                this.zones = zonesResponse.data.data.data;
                this.clusters = clustersResponse.data.data.data;
                this.members = membersResponse.data.data.data;
                this.deacons = deaconsResponse.data.data.data;
            } catch (error) {
                const errorMessage =
                    error.response.data.meta.message || "An error occurred";
                this.showAlert(errorMessage, "error");
            } finally {
                this.isLoading = false;
            }
        },
        async fetchCountries() {
            this.isLoading = true
            axios.get('/countries')
                .then(response => {
                    this.countries = response.data
                })

                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                })
        },
        onClusterChange() {
            // console.log("Selected Cluster ID:", this.member.clusterId);
            this.member.zoneId = null; // Reset Zone selection
            this.member.deaconId = null; // Reset Deacon selection
        },
        onZoneChange() {
            this.member.deaconId = null; // Reset Deacon selection
        },
        // Add a new member
        addMember() {
            // Create a new FormData object
            const formData = new FormData();

            // Append the member data to FormData
            formData.append('firstName', this.member.firstName);
            formData.append('middleName', this.member.middleName);
            formData.append('lastName', this.member.lastName);
            formData.append('image', this.member.image);
            formData.append('clusterId', this.member.clusterId);
            formData.append('zoneId', this.member.zoneId);
            formData.append('deaconId', this.member.deaconId);
            formData.append('gender', this.member.gender);
            formData.append('birthDate', this.member.birthDate);
            formData.append('nationality', this.member.nationality);
            formData.append('email', this.member.email);
            formData.append('maritalStatus', this.member.maritalStatus);
            formData.append('tribe', this.member.tribe);
            if (this.member.statusReason && this.member.statusReason.value) {
                formData.append('statusReason', this.member.statusReason.value); // Append the value (e.g., 'GoodStanding')
            } else {
                formData.append('statusReason', null); // If no value selected, append null
            }
            formData.append('phoneNumber', this.member.phoneNumber);
            // Append other fields...

            // Send the FormData using axios
            axios
                .post("/members/create", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                })
                .then((response) => {
                    this.showAlert(response.data.meta.message, "success");
                    this.dialog = false;
                    this.fetchData(); // Refetch the data instead of reloading the page
                })
                .catch((error) => {
                    this.showAlert(error.response.data.meta.message, "error");
                });
        },
        viewMember(id) {
            this.$router.push({
                name: 'member-details',
                params: {
                    id
                }
            });
        },
        // Edit member
        editEvent(item) {
            this.memberEdit = item;
            this.memberEditDialog = true;
        },

        // Update member
        updateEvent() {
            axios
                .post("/members/update", this.memberEdit, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                })
                .then((response) => {
                    this.showAlert(response.data.meta.message, "success");
                    this.memberEditDialog = false;
                    this.fetchData(); // Refetch the data instead of reloading
                })
                .catch((error) => {
                    this.showAlert(error.response.data.meta.message, "error");
                    this.memberEditDialog = false;
                });
        },

        deleteMember() {
            axios.delete(`members/delete/${this.memberToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogRole = true
                    const index = this.members.indexOf(this.memberToDelete);
                    if (index > -1) {
                        this.members.splice(index, 1);
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
            this.memberToDelete = item;
            this.confirmDialogVisible = true;
        },

        // Show alert
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
        this.fetchCountries();
        console.log(this.statusReasonsOptions);

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

.button-color {
    background-color: #002147 !important;
    color: white !important;
}

.import-color {
    background-color: #2196F3 !important;
    color: white !important;
}

.toolbar {
    background-color: #A82228;
    color: white;
}

.v-btn:hover {
    background-color: rgba(255, 0, 0, 0.1);
}
</style>
