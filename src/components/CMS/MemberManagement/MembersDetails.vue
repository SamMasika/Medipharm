<template>
<v-container fluid>
    <v-card flat class="expanded-card">
        <!-- Back Button -->
        <!-- Member Overview Section -->

        <v-btn icon @click="goBack" class="ma-3" color="primary">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-row>
            <v-col cols="12" md="3" class="d-flex flex-column align-center justify-center">
                <!-- Conditional Avatar -->
                <template v-if="member.filePath">
                    <!-- Display the image if it exists -->
                    <v-avatar size="250" class="mb-3">
                        <img :src="getImageUrl(member.filePath)" alt="Profile Image" width="250" class="my-3">
                    </v-avatar>
                </template>
                <template v-else>
                    <!-- Fallback Icon if no image -->
                    <v-avatar size="250" class="mb-3">
                        <v-icon color="blue-grey" size="230">mdi-account-circle</v-icon>
                    </v-avatar>
                </template>

                <!-- Status Chip -->
                <v-chip :color="member.status === 'Active' ? 'green' : 'red'" dark class="text-capitalize font-weight-bold">
                    {{ member.status }}
                </v-chip>
            </v-col>

            <!-- Member Details Section -->
            <v-col cols="12" md="9">
                <v-card flat class="pa-4">
                    <!-- Personal Information Title -->
                    <v-card-title class="section-title">Personal Information</v-card-title>
                    <v-divider></v-divider>

                    <v-row class="mt-4">
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Full Name:</strong> {{ member.firstName }} {{ member.middleName }} {{ member.lastName }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Membership No.:</strong> {{ member.membershipNumber }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Email:</strong> {{ member.email }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Phone:</strong> {{ member.phoneNumber }}</p>
                        </v-col>
                    </v-row>

                    <v-row class="mt-4">
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Gender:</strong> {{ member.gender }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Date of Birth:</strong> {{ formattedBirthDate }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Nationality:</strong> {{ member.nationality }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Marital Status:</strong> {{ member.marital_status }}</p>
                        </v-col>
                    </v-row>

                    <!-- Grouping Location Info -->
                    <v-card-title class="section-title mt-5">Location Information</v-card-title>
                    <v-divider></v-divider>

                    <v-row class="mt-4">
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Tribe:</strong> {{ member.tribe }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Cluster:</strong> {{ member.cluster?.name }} - {{ member.cluster?.description }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Zone:</strong> {{ member.zone?.name }} - {{ member.zone?.description }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Deacon:</strong> {{ member.deacon?.name }} - {{ member.deacon?.description }}</p>
                        </v-col>
                    </v-row>

                    <!-- Status & Updates Section -->
                    <v-card-title class="section-title mt-5">Status & Updates</v-card-title>
                    <v-divider></v-divider>

                    <v-row class="mt-4">
                        <v-col cols="12">
                            <p class="subheading"><strong>Status Reason:</strong>
                                <v-chip class="ma-2"   color="cyan" > {{ member.statusReason || 'N/A' }}</v-chip>
                            </p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Created By:</strong> {{ member.createdBy }}</p>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <p class="subheading"><strong>Updated By:</strong> {{ member.updatedBy }}</p>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</v-container>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            member: {}
        };
    },
    computed: {
        formattedBirthDate() {
            const date = new Date(this.member.birthDate);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
    },
    created() {
        const memberId = this.$route.params.id;
        this.fetchMemberDetails(memberId);
    },

    methods: {
        async fetchMemberDetails(id) {
            try {
                const response = await axios.get(`/members/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    },
                });
                this.member = response.data.data; // Update this according to your API response structure
                console.log(this.member)
            } catch (error) {
                this.showAlert(error.response.data.meta.message || "An error occurred", 'error');
            }
        },
        showAlert(message, type) {
            console.log(`${type}: ${message}`); // Replace with your alert logic
        },
        getImageUrl(imageName) {
            return this.$getImageUrl(imageName);
        },
        goBack() {
            this.$router.go(-1); // This will navigate back to the previous page
        }
    }
};
</script>

<style scoped>
.expanded-card {
    /* border-radius: 8px; */
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
}

.v-card-title {
    font-weight: bold;
    font-size: 1.25rem;
    color: #263238;
}

.section-title {
    font-weight: 600;
    font-size: 1.125rem;
    color: #546e7a;
    background-color: #f5f5f5;
    padding: 8px;
    border-radius: 8px;
}

.subheading {
    font-size: 1rem;
    color: #424242;
    line-height: 1.5;
}

.v-divider {
    margin: 20px 0;
}

.v-chip {
    font-size: 0.875rem;
    padding: 5px 10px;
    text-transform: capitalize;
}

.v-avatar {
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
