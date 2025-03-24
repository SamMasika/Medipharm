<template>
<v-container fluid>
    <v-card elevation="10" class="pa-5 rounded-lg animate__animated animate__fadeIn">
        <!-- Header Section -->
        <v-sheet class="header-section pa-5 rounded-lg text-center">
            <v-icon size="70" class="mb-2 text-white">mdi-domain</v-icon>
            <h2 class="text-h4 font-weight-bold text-white">Company Profile</h2>
            <p class="text-subtitle-1 text-grey-lighten-3">Manage and view company details easily</p>
        </v-sheet>

        <v-divider class="my-4"></v-divider>

        <!-- Company Info -->
        <v-row align="center" justify="center">
            <v-col cols="12" md="3" class="text-center">
                <v-avatar size="140" class="elevation-5">
                    <v-img v-if="company.image" :src="company.image" alt="Company Logo" class="rounded-circle" />
                    <v-icon v-else size="100" color="grey-lighten-1">mdi-office-building</v-icon>
                </v-avatar>
            </v-col>

            <v-col cols="12" md="9">
                <v-row align="center" no-gutters>
                    <v-col cols="auto">
                        <h2 class="text-h5 font-weight-bold text-blue-darken-2">{{ user?.company?.companyName }}</h2>
                        <p class="text-subtitle-1 text-grey-darken-1">{{ user?.company?.companyId }}</p>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                        <v-btn color="primary" class="text-white font-weight-bold rounded-xl shadow-2xl" @click="openEditDialog" elevation="0">
                            <v-icon class="me-2">mdi-pencil</v-icon> Edit
                        </v-btn>
                    </v-col>
                </v-row>
                <v-list density="compact">
                    <v-list-item v-for="(info, index) in companyDetails" :key="index" class="list-hover">
                        <v-list-item-title>
                            <v-icon class="me-2 text-blue-darken-2">{{ info.icon }}</v-icon> {{ info.value }}
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <!-- <v-icon class="me-2 text-blue-darken-2">mdi-check-circle</v-icon> -->
                            <!-- <span :class="statusClass" class="status-badge">{{ user?.company?.status }}</span> -->
                            <v-chip label color="red" prepend-icon="mdi-checkbox-marked-circle">{{ user?.company?.status }}</v-chip>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-col>

        </v-row>

        <v-divider class="my-4"></v-divider>

        <!-- Stores List in Expansion Panel -->
        <h3 v-if="user?.company?.stores.length > 0" class="text-h6 font-weight-bold mb-3 text-blue-darken-2">Stores</h3>
        <v-expansion-panels v-if="user?.company?.stores.length > 0">
            <v-expansion-panel v-for="store in user?.company?.stores" :key="store.id">
                <v-expansion-panel-title>
                    <v-icon class="me-2 text-blue-darken-2">mdi-store</v-icon>
                    <span class="font-weight-bold">{{ store.store_name }}</span>
                    <v-btn icon density="compact" @click="openStoreEditDialog(store)" class="ml-4" color="primary" elevation="5">
                        <v-icon size="15">mdi-pencil</v-icon>
                    </v-btn>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <p class="text-caption text-grey-darken-1">📍 {{ store.location }}</p>
                    <p class="text-caption text-grey-darken-1">👤 Managed by: {{ store.created_by }}</p>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <!-- No Stores Message -->
        <p v-else class="text-center text-grey-darken-2">No stores for this company.</p>

    </v-card>

    <!-- Edit Company Dialog -->

    <v-dialog v-model="editDialog" max-width="900">
        <v-card>
            <v-card-title class="text-h5 font-weight-bold text-center mb-4 my-5">
                <v-icon>mdi-pencil</v-icon> Update Company Details
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-row dense>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editCompany.companyName" label="Company Name" required variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editCompany.companyEmail" label="Email" variant="outlined" />
                        </v-col>
                    </v-row>

                    <v-row dense>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editCompany.companyPhone" label="Phone" variant="outlined" />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editCompany.address" label="Address" variant="outlined" />
                        </v-col>
                    </v-row>

                    <v-row dense>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editCompany.companyCity" label="City" variant="outlined" />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field v-model="editCompany.companyCountry" label="Country" variant="outlined" />
                        </v-col>
                    </v-row>

                    <!-- <v-row dense>
                            <v-col cols="12">
                                <v-file-input label="Product Image" v-model="product.image" accept="image/*" variant="outlined" density="compact" />
                            </v-col>
                        </v-row> -->

                    <v-divider></v-divider>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn text="Close" class="text-none" variant="tonal" @click="editDialog = false" rounded="xl"></v-btn>
                        <v-btn type="submit" text="Update" class="text-none button-color" variant="flat" @click="addProduct" rounded="xl"></v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>

        </v-card>
    </v-dialog>
    <!-- Edit Store Dialog -->
    <v-dialog v-model="storeEditDialog" max-width="600px">
        <v-card>
            <v-card-title class="bg-blue-darken-2 text-white">
                <v-icon class="me-2">mdi-store</v-icon> Edit Store Details
            </v-card-title>
            <v-card-text class="pa-5">
                <v-text-field v-model="editStore.store_name" label="Store Name" outlined dense></v-text-field>
                <v-text-field v-model="editStore.location" label="Location" outlined dense></v-text-field>
                <v-text-field v-model="editStore.created_by" label="Managed By" outlined dense></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn color="grey" text @click="storeEditDialog = false">Cancel</v-btn>
                <v-btn color="primary" class="text-white" @click="saveStoreChanges">Save Changes</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import {
    mapGetters,
} from 'vuex';

export default {
    data() {
        return {
            editDialog: false,
            storeEditDialog: false,
            company: {},
            editCompany: {},
            editStore: {},
        };
    },
    computed: {
        companyDetails() {
            return [{
                    icon: 'mdi-email',
                    value: this.user ?.company ?.companyEmail
                },
                {
                    icon: 'mdi-phone',
                    value: this.user ?.company ?.companyPhone
                },
                {
                    icon: 'mdi-map-marker',
                    value: `${this.user?.company?.address}, ${this.user?.company?.companyCity}, ${this.user?.company?.companyCountry}`
                },
                {
                    icon: 'mdi-store',
                    value: `${this.user?.company?.store_counts} Store(s)`
                },
            ];
        },
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        }),
        statusClass() {
            return this.company.status === 'ACTIVE' ? 'text-green-darken-2' : 'text-red-darken-2';
        }
    },
    methods: {
        openEditDialog() {
            this.editCompany = {
                ...this.user?.company 
            };
            this.editDialog = true;
        },
        saveChanges() {
            this.company = {
                ...this.editCompany
            };
            this.editDialog = false;
        },
        openStoreEditDialog(store) {
            this.editStore = {
                ...store
            };
            this.storeEditDialog = true;
        },
        saveStoreChanges() {
            const index = this.company.stores.findIndex(store => store.id === this.editStore.id);
            if (index !== -1) {
                this.company.stores[index] = {
                    ...this.editStore
                };
            }
            this.storeEditDialog = false;
        }
    }
};
</script>

<style scoped>
/* Header Section Styling */
.header-section {
    background: linear-gradient(135deg, #9dc5ec, #0D47A1);
    color: white;
    border-radius: 12px;
}

/* List and Icons */
.v-list-item-title {
    display: flex;
    align-items: center;
}

.v-icon {
    vertical-align: middle;
}

/* Status Badge */
.status-badge {
    font-weight: bold;
    padding: 4px 10px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease-in-out;
}

.status-badge.text-green-darken-2 {
    background-color: rgba(76, 175, 80, 0.2);
}

.status-badge.text-red-darken-2 {
    background-color: rgba(244, 67, 54, 0.2);
}

/* List Hover Effects */
.list-hover:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
}

/* Expansion Panel */
.v-expansion-panel-title {
    font-size: 1.1rem;
    font-weight: bold;
}

/* Button Enhancements */
.v-btn {
    transition: all 0.3s ease;
}

.v-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
