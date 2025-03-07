<template>
<Loader :loading="loading" v-if="loading" />
<div v-else>

    <v-container class="my-5">
        <v-card class=" my-crd mx-auto pa-12 pb-3 " elevation="0" max-width="448" rounded="lg" color="transparent">
            <div class="d-flex justify-center my-5">
                <!-- <v-avatar size="150" class="overflow-hidden"> -->
                    <v-img alt="NIDC Logo" src="@/assets/banal.png" transition="scale-transition" max-width="150" />
                <!-- </v-avatar> -->
            </div>

            <h3 class="text-center my-3">BIMS</h3>
            <v-form @submit.prevent="submit" ref="form">
                <div class="text-subtitle-1 text-medium-emphasis">Username</div>
                <v-text-field type="phone" density="compact" v-model="form.username" placeholder="Username" prepend-inner-icon="mdi-account" variant="outlined" autocomplete></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                    <a class="text-caption text-decoration-none text-blue-grey text-darken-3" href="#" rel="noopener noreferrer" target="_blank">
                        Forgot login password?
                    </a>
                </div>

                <v-text-field v-model="form.password" :type="visible ? 'text' : 'password'" density="compact" placeholder="Password" prepend-inner-icon="mdi-lock" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="visible = !visible" variant="outlined"></v-text-field>

                <v-btn block type="submit" class="mb-8 my-5 btn-color" size="large" prepend-icon="mdi-arrow-right-bold" elevation="0">
                    LOG IN
                </v-btn>
            </v-form>

            <v-card-text class="text-center">
                <!-- Sign up link can be added here if needed -->
            </v-card-text>
        </v-card>
    </v-container>
</div>
</template>
<script>
import Loader from '@/components/Loader/Loader.vue';
import loaderSet from '@/mixins/loaderSet.js'
import {
    mapActions,
    mapGetters
} from 'vuex';

export default {
    mixins: [loaderSet],
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
					console.log('Login successful, redirecting...');
					console.log('Authenticated:', this.$store.getters['auth/authenticated']);
					this.$router.replace({ name: 'dashboard' });
				}
			}
			this.loading = false;
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
    color: white !important;
    background-color: #3674B5 !important;
}

.btn-color .v-icon {
    color: white;

    /* Set icon color */
}

.my-card {
    border: 0.3px solid #d3d2d2;
    /* Change the color to your desired border color */
    border-radius: 12px;
    /* Adjust radius if needed */
}
</style>
