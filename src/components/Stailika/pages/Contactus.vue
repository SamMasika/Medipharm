<template>
<app-bar></app-bar>

<v-container class="py-12">
    <h1 class="text-center mb-6" :style="{ color: darkBlue, fontWeight: '800', fontSize: '2.5rem' }">
        Get in Touch
    </h1>
    <p class="text-center mb-10" style="color: #555; font-size: 1.1rem;">
        We'd love to hear from you! Please fill out the form below or use our
        contact details.
    </p>

    <!-- Contact Form -->
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <!-- Full Name -->
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.name" :rules="nameRules" label="Full Name" placeholder="Enter your full name" required variant="outlined" density="comfortable"></v-text-field>
            </v-col>

            <!-- Email -->
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.email" :rules="emailRules" label="Email Address" placeholder="Enter your email address" required variant="outlined" density="comfortable"></v-text-field>
            </v-col>

            <!-- Phone -->
            <v-col cols="12" sm="6">
                <v-text-field v-model="form.phone" :rules="phoneRules" label="Phone Number" placeholder="Enter your phone number" required variant="outlined" density="comfortable"></v-text-field>
            </v-col>

            <!-- Message -->
            <v-col cols="12">
                <v-textarea v-model="form.message" :rules="messageRules" label="Message" placeholder="Write your message here..." required variant="outlined" density="comfortable" rows="6"></v-textarea>
            </v-col>

            <!-- Submit Button -->
            <v-col cols="12" class="text-center">
                <v-btn :disabled="!valid || loading" color="#A82228" class="white--text submit-btn" @click="submitForm" large>
                    <v-icon left>mdi-send</v-icon>
                    Send Message
                </v-btn>
            </v-col>
        </v-row>
    </v-form>

    <v-divider class="my-12"></v-divider>

    <!-- Contact Info -->
    <v-row justify="center" align="center" class="contact-info" dense>
        <v-col cols="12" md="4" class="text-center mb-6">
            <v-icon size="36" color="#A82228">mdi-map-marker</v-icon>
            <h3 class="mt-2" :style="{ color: darkBlue }">Address</h3>
            <p>Jamirex Street, Mwenge, Dar es Salaam, Tanzania</p>
        </v-col>

        <v-col cols="12" md="4" class="text-center mb-6">
            <v-icon size="36" color="#A82228">mdi-phone</v-icon>
            <h3 class="mt-2" :style="{ color: darkBlue }">Phone</h3>
            <p>+255 123 456 789</p>
        </v-col>

        <v-col cols="12" md="4" class="text-center mb-6">
            <v-icon size="36" color="#A82228">mdi-email</v-icon>
            <h3 class="mt-2" :style="{ color: darkBlue }">Email</h3>
            <p>info@stailika.com</p>
        </v-col>
    </v-row>

    <!-- Map -->
    <v-row>
        <v-col cols="12">
            <iframe :src="mapSrc" width="100%" height="400" style="border:0; border-radius: 8px;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Location Map"></iframe>
        </v-col>
    </v-row>
</v-container>

<Footer></Footer>
</template>

<script>
import axios from "axios";
import appBar from "../Layout/appBar.vue";
import Footer from "../Layout/Footer.vue";
import alert from '@/mixins/swtalert';
export default {
    components: {
        appBar,
        Footer,
	},
	mixins:[alert],
    data() {
        return {
            darkBlue: "#020B2C",
            valid: false,
            loading: false,
            form: {
                name: "",
                email: "",
                phone: "",
                message: "",
            },
            nameRules: [
                (v) => !!v || "Name is required",
                (v) => (v && v.length >= 3) || "Name must be at least 3 characters",
            ],
            emailRules: [
                (v) => !!v || "Email is required",
                (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
            ],
            phoneRules: [
                (v) => !!v || "Phone number is required",
                (v) =>
                /^\+?[0-9]{7,15}$/.test(v) ||
                "Phone number must be valid (7-15 digits)",
            ],
            messageRules: [
                (v) => !!v || "Message is required",
                (v) =>
                (v && v.length >= 10) || "Message must be at least 10 characters",
            ],
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.434896812834!2d39.26709781475809!3d-6.792354795027477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b47b4df198b%3A0x3db12c5e8d9efcd6!2sDar%20es%20Salaam!5e0!3m2!1sen!2stz!4v1691325449187!5m2!1sen!2stz",
        };
    },
    methods: {
        
        submitForm() {
            const data = {
                ...this.form
            };
            axios
                .post("/contact", data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    },
                })
                .then((response) => {
                    this.showAlert(response.message, "success");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                })
                .catch((error) =>
                    this.showAlert(error.response.data.message, "error")
                );
        },
    },
   
};
</script>

<style scoped>
.contact-info h3 {
    font-weight: 700;
}

.contact-info p {
    color: #555;
    font-size: 1rem;
    margin-top: 4px;
}

.submit-btn {
    border-radius: 36px !important;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background-color: #8b1b1f !important;
    box-shadow: 0 8px 16px rgba(168, 34, 40, 0.6) !important;
}
</style>
