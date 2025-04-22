<template>
<v-container fluid class="profile-container pa-0">
    <!-- Full-width Header -->
    <div class="profile-header">
        <!-- Background Image (Replace with your own image if needed) -->
        <v-img src="/lib/images/background.jpg" class="header-img" cover></v-img>
        <!-- Gradient Overlay -->
        <div class="header-overlay"></div>
        <!-- Header Content: Avatar, Name & Username/Email -->
        <div class="header-content">
            <v-avatar size="140" class="elevation-6">
                <v-img :src="getImageUrl(user.company.image)"></v-img>
            </v-avatar>
            <h1 class="profile-name">{{ user.name }}</h1>
            <div class="profile-username">@{{ user.username }} | {{ user.email }}</div>
        </div>
    </div>

    <!-- Main Content: Cards -->
    <v-container class="main-content">
        <v-row dense>
            <!-- Personal Information Card -->
            <v-col cols="12" md="6">
                <v-card class="pa-6" elevation="4">
                    <v-card-title class="card-title">
                        <v-icon left class="mr-2">mdi-account</v-icon>
                        Personal Information
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="card-details">
                        <div class="detail-item">
                            <span class="detail-label">📞 Phone:</span>
                            <span class="detail-value">{{ user.phone }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">🔒 Status:</span>
                            <v-chip :color="user.status ? 'green' : 'red'" small class="">
                                {{ user.status ? 'Active' : 'Inactive' }}
                            </v-chip>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">🕒 Last Login:</span>
                            <span class="detail-value">{{ formatDate(user.lastLogin) }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">🔢 Login Count:</span>
                            <span class="detail-value">{{ user.loginCount }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">👥 Roles:</span>
                            <span class="detail-value">
                                <span v-for="(role, index) in user.roles" :key="role.id">
                                    {{ role.displayName }}<span v-if="index < user.roles.length - 1">,</span>
                                </span>
                            </span>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Company Information Card -->
            <v-col cols="12" md="6">
                <v-card class="pa-6" elevation="4">
                    <v-card-title class="card-title">
                        <v-icon left class="mr-2">mdi-domain</v-icon>
                        Company Information
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="card-details">
                        <div class="detail-item">
                            <span class="detail-label">🏢 Company:</span>
                            <span class="detail-value">{{ user.company.companyName }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📧 Email:</span>
                            <span class="detail-value">{{ user.company.companyEmail }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📞 Phone:</span>
                            <span class="detail-value">{{ user.company.companyPhone }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">🏠 Address:</span>
                            <span class="detail-value">{{ user.company.address }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">🌆 City:</span>
                            <span class="detail-value">{{ user.company.companyCity }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">🌍 Country:</span>
                            <span class="detail-value">{{ user.company.companyCountry }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">🆔 Company ID:</span>
                            <span class="detail-value">{{ user.company.companyId }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">📌 Status:</span>
                            <v-chip :color="user.company.status ? 'green' : 'red'" small class="ml-2">
                                {{ user.company.status ? 'Active' : 'Inactive' }}
                            </v-chip>
                        </div>
												<v-divider class="my-8"></v-divider>
                        <!-- Add this inside the Company Information card, after the last detail-item -->
                        <!-- <div class="detail-item">
                            <span class="detail-label">🏬 Stores:</span>
                            <span class="detail-value">
                                {{ user.company.stores.length }} Store<span v-if="user.company.stores.length > 1">s</span>
                            </span>
                        </div> -->
                        <div v-for="store in user.company.stores" :key="store.id" class="store-item mt-3 pa-3">
                            <!-- <v-divider class="mb-2"></v-divider> -->
                            <div class="detail-item">
                                <span class="detail-label">🛍 Store Name:</span>
                                <span class="detail-value">{{ store.store_name }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">📍 Location:</span>
                                <span class="detail-value">{{ store.location }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">📌 Status:</span>
                                <v-chip :color="store.status ? 'green' : 'red'" small class="ml-2">
                                    {{ store.status ? 'Active' : 'Inactive' }}
                                </v-chip>
                            </div>
                        </div>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-container>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    name: 'UserProfile',
    computed: {
        ...mapGetters({
            user: 'auth/user'
        }),
    },
    methods: {
        // Generates the correct URL for the company image or a placeholder if missing.
        getImageUrl(imagePath) {
            return imagePath ?
                `/lib/images/company logo/${imagePath}` :
                '/lib/images/no-image.png'
        },
        // Formats a date string to a locale-specific output.
        formatDate(date) {
            return new Date(date).toLocaleString()
        }
    }
}
</script>

<style scoped>
/* Profile Container */
.profile-container {
    background-color: #f8f9fa;
}

/* Header */
.profile-header {
    position: relative;
    height: 340px;
    overflow: hidden;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-img {
    width: 100%;
    height: 100%;
    filter: brightness(55%);
}

.header-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0, 123, 255, 0.65), rgba(102, 126, 234, 0.65));
}

.header-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    text-align: center;
    color: #fff;
}

.v-avatar {
    border: 5px solid #fff;
    margin-bottom: 12px;
}

.profile-name {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 6px;
}

.profile-username {
    font-size: 1.1rem;
    font-style: italic;
    color: #e3f2fd;
}

/* Main Content */
.main-content {
    margin-top: -40px;
    padding: 24px 16px;
}

/* Cards */
.v-card {
    border-radius: 16px;
    transition: box-shadow 0.3s ease;
}

.v-card:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

/* Titles */
.card-title {
    font-size: 1.4rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    color: #3674B5;
}

.card-title v-icon {
    color: #1976d2;
}

/* Divider spacing */
.v-divider {
    margin: 10px 0;
}

/* Detail Items */
.card-details {
    margin-top: 16px;
}

.detail-item {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    padding: 2px 0;
}

.detail-label {
    font-weight: 600;
    min-width: 140px;
    color: #424242;
}

.detail-value {
    font-size: 1rem;
    color: #37474f;
    font-weight: 500;
}

/* Chips */
.v-chip {
    font-weight: 600;
    color: white;
}

/* Responsive Avatar */
@media (max-width: 600px) {
    .v-avatar {
        width: 100px !important;
        height: 100px !important;
    }

    .profile-name {
        font-size: 1.8rem;
    }

    .profile-username {
        font-size: 1rem;
    }
}
.store-item {
  /* background-color: #f1f1f1; */
  border-radius: 12px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
}

</style>
