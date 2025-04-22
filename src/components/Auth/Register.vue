<template>
<Loader :loading="loading" v-if="loading" />
<v-container fluid class="d-flex justify-center align-center my-5">
    <v-card class="pa-8" max-width="800" elevation="6">
        <!-- Header with back button and title -->
        <v-row justify="center" class="mb-8">
            <v-col cols="12" class="text-center">
                <h1 class="title">👤 Personal Information</h1>
                <p class="subtitle">Please provide your personal details to create your account.</p>
            </v-col>
        </v-row>

        <!-- Form -->
        <v-form @submit.prevent="registerUser" ref="form">
            <v-row dense>
                <v-col cols="12" md="6">
                    <v-text-field v-model="user.name" label="Full Name*" prepend-inner-icon="mdi-account" variant="outlined"  required />
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="user.username" label="Username*" prepend-inner-icon="mdi-account-circle" variant="outlined"  required />
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field v-model="user.email" label="Email*" prepend-inner-icon="mdi-email" type="email" variant="outlined"  required />
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="user.phone" label="Phone Number*" prepend-inner-icon="mdi-phone" variant="outlined"  required />
                </v-col>

                <v-col cols="12" md="6">
                    <v-text-field v-model="user.password" :type="showPassword ? 'text' : 'password'" label="Password*" prepend-inner-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showPassword = !showPassword" variant="outlined"  :error-messages="passwordError" @input="validatePassword" required />
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="user.password_confirmation" :type="showPassword ? 'text' : 'password'" label="Confirm Password*" prepend-inner-icon="mdi-lock-check" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showPassword = !showPassword" variant="outlined"  :error-messages="confirmPasswordError" @input="validateConfirmPassword" required />
                </v-col>
                <v-col cols="12" class="text-center mt-4">
                    <v-btn type="submit"   class="px-6 py-3 register-btn" block flat>
                        <v-icon start>mdi-account-check</v-icon>
                        Register
                    </v-btn>
                </v-col>

                <v-col cols="12" class="text-center mt-4">
                    <span>Already have an account?</span>
                    <router-link to="/" class="text-primary font-weight-bold ms-1">Login</router-link>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</v-container>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader/Loader.vue";

export default {
    components: {
        Loader
    },
    data() {
        return {
            showPassword: false,
            loading: false,
            user: {
                name: "",
                username: "",
                email: "",
                phone: "",
                password: "",
                password_confirmation: "",
            },
            passwordError: "",
            confirmPasswordError: "",
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        validatePassword() {
            const password = this.user.password;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const isLongEnough = password.length >= 8;

            if (!password) {
                this.passwordError = "Password is required.";
            } else if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecial) {
                this.passwordError =
                    "Must be at least 8 characters, with uppercase, lowercase, number, and special character.";
            } else {
                this.passwordError = "";
            }

            this.validateConfirmPassword();
        },
        validateConfirmPassword() {
            if (!this.user.password_confirmation) {
                this.confirmPasswordError = "Confirm password is required.";
            } else if (this.user.password !== this.user.password_confirmation) {
                this.confirmPasswordError = "Passwords do not match.";
            } else {
                this.confirmPasswordError = "";
            }
        },
        registerUser() {
            this.loading = true;
            this.validatePassword();
            this.validateConfirmPassword();

            if (!this.passwordError && !this.confirmPasswordError) {
                axios
                    .post("/register", this.user)
                    .then((res) => {
                        const userData = res.data.data;
                        if (userData && userData.id) {
                            this.$router.push({
                                path: "/otp-verify",
                                query: {
                                    email: encodeURIComponent(this.user.email),
                                    userId: userData.id,
                                },
                            });
                        } else {
                            this.$swal.fire({
                                icon: "error",
                                title: "User ID not returned",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        }
                        this.loading = false;
                    })
                    .catch((err) => {
                        const errorMsg = err.response.data.message || "An error occurred.";
                        this.$swal.fire({
                            icon: "error",
                            title: errorMsg,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        this.loading = false;
                    });
            } else {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
h1 {
    font-weight: 700;
}
/* Buttons */
.register-btn {
    background-color: #3674B5 !important;
    color: white !important;
    font-weight: bold;
}
.text-subtitle-1 {
    color: #555;
}

a {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>
