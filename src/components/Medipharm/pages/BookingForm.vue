<template>
<app-bar></app-bar>

<v-container class="py-12">
    <!-- Title -->
    <h1 class="text-center mb-8" :style="{ color: darkBlue, fontWeight: '800', fontSize: '2.5rem' }">
        Confirm Your {{ appointmentType }}
    </h1>

    <!-- Selected Appointment Summary -->
    <v-card class="summary-card mb-10" elevation="0">
        <v-card-text>
            <div class="summary-row">
                <strong>Appointment Type:</strong>
                <span>{{ appointmentType }}</span>
            </div>
            <div class="summary-row">
                <strong>Date:</strong>
                <span>{{ formattedDate }}</span>
            </div>
            <div class="summary-row">
                <strong>Time:</strong>
                <span>{{ $route.params.time }}</span>
            </div>
        </v-card-text>
    </v-card>

    <!-- Booking Form -->
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-row dense>
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.name" :rules="nameRules" label="Full Name" required variant="outlined" density="comfortable" clearable />
            </v-col>

            <v-col cols="12" sm="6">
                <v-text-field v-model="form.email" :rules="emailRules" label="Email Address" required variant="outlined" density="comfortable" clearable />
            </v-col>

            <v-col cols="12" sm="6">
                <v-text-field v-model="form.phone" :rules="phoneRules" label="Phone Number" required variant="outlined" density="comfortable" clearable />
            </v-col>

            <v-col cols="12">
                <v-textarea v-model="form.notes" label="Additional Notes" rows="4" variant="outlined" density="comfortable" clearable />
            </v-col>

            <!-- Submit Button -->
            <v-col cols="12" class="text-center mt-6">
                <v-btn :disabled="!valid || loading" color="#A82228" class="white--text submit-btn" @click="submitBooking" large elevation="6">
                    <v-icon left>mdi-calendar-check</v-icon>
                    Confirm Booking
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</v-container>

<Footer />
</template>

<script>
import axios from "axios";
import appBar from "../Layout/appBar.vue";
import Footer from "../Layout/Footer.vue";
import swtalert from "@/mixins/swtalert";

export default {
    components: {
        appBar,
        Footer
    },
    mixins: [swtalert],
    data() {
        return {
            darkBlue: "#020B2C",
            valid: false,
            loading: false,
            form: {
                name: "",
                email: "",
                phone: "",
                notes: "",
            },
            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length >= 3) || "Name must be at least 3 characters",
            ],
            emailRules: [
                v => !!v || "Email is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid",
            ],
            phoneRules: [
                v => !!v || "Phone number is required",
                v => /^\+?[0-9\s-]{7,15}$/.test(v) || "Phone number is invalid",
            ],
        };
    },
    computed: {
        appointmentType() {
            return this.$route.params.appointmentType || "Appointment";
        },
        formattedDate() {
            const date = this.$route.params.date;
            if (!date) return "";
            return new Date(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        },
    },
    methods: {
        submitBooking() {
            if (!this.$refs.form.validate()) return;

            this.loading = true;

            // Include date, time, and appointmentType
            const payload = {
                ...this.form,
                appointment_type: this.appointmentType,
                date: new Date(this.$route.params.date).toISOString().substr(0, 10),
                time: this.$route.params.time,
            };

            axios
                .post("/appointments", payload)
                .then(response => {
                    this.showAlert(response.data.message || "Booking submitted successfully!", "success");
                    this.resetForm();
                    this.$router.push({
                        path: "/book-appointment"
                    });
                })
                .catch(error => {
                    const msg = error.response ?.data ?.message || "Something went wrong. Please try again.";
                    this.showAlert(msg, "error");
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        resetForm() {
            this.form = {
                name: "",
                email: "",
                phone: "",
                notes: ""
            };
            this.$refs.form.resetValidation();
        },
    },
};
</script>

<style scoped>
.submit-btn {
    border-radius: 36px !important;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #8b1b1f !important;
    box-shadow: 0 8px 16px rgba(168, 34, 40, 0.6) !important;
}

.summary-card {
    border-left: 6px solid #a82228;
    background: #f9f9f9;
    border-radius: 5px;
    padding: 16px 20px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 1.05rem;
    color: #333;
}

h1 {
    user-select: none;
}
</style>
