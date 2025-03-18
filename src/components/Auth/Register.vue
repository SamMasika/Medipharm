<template>
<v-container class="fill-height d-flex align-center justify-center" fluid>
    <v-card class="pa-8 rounded-lg mx-auto signup-card" elevation="12">
        <v-card-title class="text-h5 font-weight-bold text-center mb-4">
            Create an Account
        </v-card-title>
        <v-form @submit.prevent="registerUser">
            <v-row>
                <v-col cols="12">
                    <v-text-field 
                        label="Full Name*" 
                        v-model="user.name" 
                        required 
                        variant="outlined" 
                        density="comfortable" 
                        placeholder="e.g. John Doe"
                        prepend-inner-icon="mdi-account"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field 
                        label="Username*" 
                        v-model="user.username" 
                        required 
                        variant="outlined" 
                        density="comfortable" 
                        placeholder="e.g. johndoe123"
                        prepend-inner-icon="mdi-account-circle"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field 
                        label="Email*" 
                        v-model="user.email" 
                        required 
                        variant="outlined" 
                        density="comfortable" 
                        type="email" 
                        placeholder="e.g. john.doe@example.com"
                        prepend-inner-icon="mdi-email"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field 
                        label="Phone Number*" 
                        v-model="user.phone" 
                        required 
                        variant="outlined" 
                        density="comfortable" 
                        placeholder="e.g. +2557567890"
                        prepend-inner-icon="mdi-phone"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field 
                        label="Password*" 
                        :type="showPassword ? 'text' : 'password'" 
                        v-model="user.password" 
                        required 
                        variant="outlined" 
                        density="comfortable" 
                        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" 
                        @click:append-inner="showPassword = !showPassword" 
                        :error-messages="passwordError" 
                        @input="validatePassword" 
                        placeholder="e.g. StrongPass#2025"
                        prepend-inner-icon="mdi-lock"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field 
                        label="Confirm Password*" 
                        :type="showPassword ? 'text' : 'password'" 
                        v-model="user.password_confirmation" 
                        required 
                        variant="outlined" 
                        density="comfortable" 
                        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" 
                        @click:append-inner="showPassword = !showPassword" 
                        :error-messages="confirmPasswordError" 
                        @input="validateConfirmPassword" 
                        placeholder="Confirm your password"
                        prepend-inner-icon="mdi-lock-check"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center">
                    <v-btn type="submit" color="primary" block class="text-white px-6 py-3 signup-btn" size="medium">
                        Register
                    </v-btn>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="text-center mt-4">
                    <span>Already have an account?</span>
                    <router-link to="/" class="login-link">Login</router-link>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</v-container>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            showPassword: false,
            user: {
                name: "",
                username: "",
                email: "",
                phone: "",
                password: "",
                password_confirmation: "",
            },
            passwordError: "",
            confirmPasswordError: ""
        };
    },
    methods: {
        validatePassword() {
            const password = this.user.password;
            if (!password) {
                this.passwordError = "Password is required.";
                return;
            }
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const isValidLength = password.length >= 8;

            if (!isValidLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
                this.passwordError = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
            } else {
                this.passwordError = "";
            }
            this.validateConfirmPassword();
        },
        validateConfirmPassword() {
            if (!this.user.password_confirmation) {
                this.confirmPasswordError = "Confirm password is required.";
                return;
            }
            if (this.user.password !== this.user.password_confirmation) {
                this.confirmPasswordError = "Passwords do not match.";
            } else {
                this.confirmPasswordError = "";
            }
        },
        registerUser() {
            this.validatePassword();
            this.validateConfirmPassword();
            if (!this.passwordError && !this.confirmPasswordError) {
                axios.post('/register', this.user)
                    .then(response => {
                        this.$swal.fire({
                            icon: 'success',
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        this.$router.push({ 
                            path: "/otp-verify", 
                            query: { email: encodeURIComponent(this.user.email) } 
                        });
                    })
                    .catch(error => {
                        const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
                        this.$swal.fire({
                            icon: 'error',
                            title: errorMessage,
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    });
            }
        }
    }
};
</script>

<style scoped>
.signup-card {
    max-width: 600px;
    width: 100%;
    border-radius: 12px;
}
.signup-btn {
    background-color: #3674B5 !important;
    font-size: 16px;
}
.login-link {
    color: #3674B5;
    text-decoration: none;
    font-weight: bold;
    margin-left: 5px;
}
.login-link:hover {
    text-decoration: underline;
}
</style>
