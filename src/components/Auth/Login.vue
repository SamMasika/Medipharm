<template>
<Loader :loading="loading" v-if="loading" />
<div v-else>
    <v-container class="d-flex justify-center align-center fill-height">
        <v-card class="auth-card mx-auto pa-10" elevation="12" max-width="450" rounded="lg">
            <!-- Logo -->
            <div class="d-flex justify-center mb-5">
                <v-img alt="BIMS Logo" src="@/assets/banal.png" transition="scale-transition" max-width="150" />
            </div>

            <h2 class="text-center font-weight-bold">BIMS Login</h2>

            <v-form @submit.prevent="submit" ref="form">
                <!-- Username -->
                <v-text-field v-model="form.username" class="my-3" label="Username" prepend-inner-icon="mdi-account" variant="outlined" density="compact" :rules="[v => !!v || 'Username is required']" placeholder="Sammie Richard"></v-text-field>

                <!-- Password -->
                <v-text-field v-model="form.password" class="my-3" :type="visible ? 'text' : 'password'" label="Password" prepend-inner-icon="mdi-lock" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="visible = !visible" variant="outlined" density="compact" :rules="[v => !!v || 'Password is required']" placeholder="Sammie Richard"></v-text-field>

                <!-- Forgot Password -->
                <div class="text-right mb-3">
                    <a href="#" class="forgot-password">Forgot your password?</a>
                </div>

                <!-- Login Button -->
                <v-btn block type="submit" class="login-btn" size="large" elevation="1">
                    <v-icon left>mdi-arrow-right-bold</v-icon> LOG IN
                </v-btn>
            </v-form>

            <!-- Divider -->
            <v-divider class="my-5"></v-divider>
            <!-- Sign-up Section -->
            <div class="text-center">
                <span class="text-grey-darken-1">Don't have an account?</span>
                <router-link to="/register" class="register-link">Sign Up</router-link>
            </div>
        </v-card>
    </v-container>
</div>
</template>

<script>
import Loader from '@/components/Loader/Loader.vue';
import {
    mapActions
} from 'vuex';

export default {
    components: {
        Loader
    },
    data() {
        return {
            visible: false,
            form: {
                username: '',
                password: ''
            },
            loading: false
        };
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        async submit() {
            this.loading = true;
            if (this.$refs.form.validate()) {
                const errorMessage = await this.login(this.form);
                if (errorMessage) {
                    this.$swal.fire({
                        icon: 'error',
                        title: errorMessage,
                        timer: 5000
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    this.$router.replace({
                        name: 'dashboard'
                    });
                }
            }
            this.loading = false;
        }
    }
};
</script>

<style scoped>
/* Center the card in the viewport */
.v-container {
    height: 100vh;
}

/* Login Card */
.auth-card {
    width: 100%;
    max-width: 450px;
    border-radius: 12px;
    margin-top: 15%;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Buttons */
.login-btn {
    background-color: #3674B5 !important;
    color: white !important;
    font-weight: bold;
}

.signup-btn {
    border-color: #3674B5 !important;
    color: #3674B5 !important;
    font-weight: bold;
}

/* Forgot Password */
.forgot-password {
    font-size: 14px;
    color: #3674B5;
    text-decoration: none;
    transition: 0.3s;
}

.forgot-password:hover {
    text-decoration: underline;
}

/* Sign-up Button */
.register-link {
    color: #3674B5;
    text-decoration: none;
    font-weight: bold;
    margin-left: 5px;
}
</style>
