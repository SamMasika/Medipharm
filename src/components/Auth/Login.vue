<template>
<Loader :loading="loading" v-if="loading" />
<div v-else>
    <AppBar />
    <v-container class="my-5">
        <v-card class=" my-card mx-auto pa-12 pb-3 " elevation="0" max-width="448" rounded="lg" color="transparent">
            <div class="d-flex justify-center">
                <v-avatar size="150">
                    <v-img alt="NIDC Logo" src="@/assets/tag.png" transition="scale-transition" />
                </v-avatar>
            </div>
            <h3 class="text-center my-3">BCMS</h3>
            <v-form @submit.prevent="submit" ref="form">
                <div class="text-subtitle-1 text-medium-emphasis">Phone No.</div>
                <v-text-field type="phone" density="compact" v-model="form.phoneNumber" placeholder="Phone No." prepend-inner-icon="mdi-phone-outline" variant="outlined"  autocomplete></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                    <a class="text-caption text-decoration-none text-blue-grey text-darken-3" href="#" rel="noopener noreferrer" target="_blank">
                        Forgot login password?
                    </a>
                </div>

                <v-text-field v-model="form.password" :type="visible ? 'text' : 'password'" density="compact" placeholder="Password" prepend-inner-icon="mdi-lock-outline" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="visible = !visible" variant="outlined" ></v-text-field>

                <v-btn block type="submit" class="mb-8 my-5 btn-color" size="large" prepend-icon="mdi-arrow-right-bold" elevation="0">
                    LOG IN
                </v-btn>
            </v-form>

            <v-card-text class="text-center">
                <!-- Sign up link can be added here if needed -->
            </v-card-text>
        </v-card>
    </v-container>
    <Footer />
</div>
</template>

<script>
import AppBar from "@/components/Layout/AppBar.vue";
import Footer from "@/components/Layout/Footer.vue";
import Loader from '@/components/Layout/Loader.vue';
import loaderSet from '@/mixins/loaderSet.js'
import {
    mapActions,
    mapGetters
} from 'vuex';

export default {
    mixins:[loaderSet],
    components: {
        AppBar,
        Footer,
        Loader
    },

    data() {
        return {
            visible: false,
            form: {
                phoneNumber: '',
                password: ''
            },
            inputRules: [
                v => v.length >= 2 || 'Minimum length is 2 characters'
            ]
        };
    },

    props: {
        source: String
    },

    computed: {
        emailRules() {
            return [v => !!v || 'Email is required'];
        },
        passwordRules() {
            return [v => !!v || 'Password required'];
        },
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            username: 'auth/userName',
        })
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
                        location.reload(); // Reload after error
                    });
                } else {
                    this.$router.replace({
                        name: 'dashboard'
                    });
                }
            }
            this.loading = false; // Ensure loading is false after validation check
        }
    },

    mounted() {
        // Simulating an asynchronous operation; replace with your logic
        setTimeout(() => {
            this.loading = false; // Set loading to false after loading completes
        }, 2000);
    },

    unmounted() {
        this.loading = false; // Stop loading on component unmount
    }
};
</script>

<style scoped>
.btn-color {
    background-color: #E9D3CD !important;
    color: #A82228 !important;
}

.btn-color .v-icon {
    color: #A82228;
    /* Set icon color */
}
.my-card {
  border: 0.3px solid #d3d2d2; /* Change the color to your desired border color */
  border-radius: 12px; /* Adjust radius if needed */
}
</style>
