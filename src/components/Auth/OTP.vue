<template>
<v-card class="pa-10 mx-auto otp-card" elevation="12" max-width="400" width="100%">
    <h3 class="text-h6 mb-4 text-center">Verify Your Account</h3>

    <div class="text-body-2 text-center">
        We sent a verification code to <strong>{{ email }} {{ user_id }}</strong> <br>
        Please check your email and enter the code below.
    </div>

    <v-sheet color="surface">
        <v-otp-input v-model="otp" type="password" variant="solo"></v-otp-input>
    </v-sheet>

    <v-btn class="my-4 verify-btn" height="40" text="Verify" variant="flat" block @click="verifyOtpHandler"></v-btn>

    <div class="text-caption text-center">
        <span v-if="timer > 0" class="countdown-text">Resend OTP in {{ formattedTime }}</span>
        <a v-else href="#" @click.prevent="resendOtp" class="color-text">Resend OTP</a>
    </div>
</v-card>
</template>

<script>
import axios from "axios";
import {
    mapActions
} from 'vuex';

export default {
    data() {
        return {
            email: this.$route.query.email ? decodeURIComponent(this.$route.query.email) : "",
            user_id: this.$route.query.userId || "", // Extract user ID from query parameters
            otp: "",
            timer: 0,
            countdownInterval: null,
        };
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.timer / 60);
            const seconds = this.timer % 60;
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        },
    },
    methods: {
        ...mapActions({
            verifyOtpAction: 'auth/verifyOtp'
        }),

        // Use this method to handle OTP verification
        async verifyOtpHandler() {
            if (!this.otp) {
                this.$swal.fire({
                    icon: "error",
                    title: "OTP is required",
                    timer: 2000,
                    showConfirmButton: false,
                });
                return;
            }

            if (!this.user_id) {
                this.$swal.fire({
                    icon: "error",
                    title: "User ID is missing",
                    timer: 2000,
                    showConfirmButton: false,
                });
                return;
            }

            try {
                // Dispatch the verifyOtp action and get the accessToken
                await this.verifyOtpAction({
                    otp: this.otp,
                    user_id: this.user_id,
                });

                // After successful authentication, navigate to the company-profile
                this.$router.push({
                    name: "company-profile"
                });
            } catch (error) {
                this.$swal.fire({
                    icon: "error",
                    title: error.message || "OTP Verification Failed",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        },

        // Resend OTP method
        async resendOtp() {
            if (!this.user_id) {
                this.$swal.fire({
                    icon: "error",
                    title: "User ID is missing",
                    timer: 2000,
                    showConfirmButton: false,
                });
                return;
            }

            try {
                await axios.post("/resend-otp", {
                    user_id: this.user_id
                });

                const expiryTime = Date.now() + 120000; // Set expiry time to 2 minutes
                localStorage.setItem("otpExpiryTime", expiryTime); // Store expiry time in localStorage
                this.startCountdown(); // Restart the countdown

                this.$swal.fire({
                    icon: "success",
                    title: "New OTP has been sent to your email",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } catch (error) {
                this.$swal.fire({
                    icon: "error",
                    title: "Failed to resend OTP",
                    text: error.response.data.message || "Something went wrong",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        },

        // Start countdown for OTP resend
        startCountdown() {
            let expiryTime = localStorage.getItem("otpExpiryTime");

            if (!expiryTime) {
                expiryTime = Date.now() + 120000;
                localStorage.setItem("otpExpiryTime", expiryTime);
            }

            if (Date.now() > expiryTime) {
                this.timer = 0;
                localStorage.removeItem("otpExpiryTime");
                return;
            }

            this.timer = Math.floor((expiryTime - Date.now()) / 1000);

            this.countdownInterval = setInterval(() => {
                if (this.timer > 0) {
                    this.timer--;
                } else {
                    clearInterval(this.countdownInterval);
                }
            }, 1000);
        },
    },
    created() {
        // this.startCountdown();
    },
    beforeUnmount() {
        clearInterval(this.countdownInterval);
    },
};
</script>

<style scoped>
.verify-btn {
    background-color: #3674B5 !important;
    color: white !important;
    font-weight: bold;
}

.color-text {
    color: #3674B5;
    text-decoration: none;
    font-weight: bold;
    margin-left: 5px;
}

.otp-card {
    margin-top: 15%;
}

.countdown-text {
    color: #ff0000;
    font-weight: bold;
}
</style>
