<template>
<v-container class="d-flex justify-center align-center fill-height">
    <v-card class="password-card pa-8 animate__animated animate__zoomIn animate__delay-{{ index * 0.1 }}s"  max-width="450">
        <!-- Title -->
        <v-card-title class="text-h5 font-weight-bold text-center">
            Change Password
        </v-card-title>

        <!-- Subtitle -->
        <v-card-subtitle class="text-center mb-5">
            Ensure your new password is strong and secure.
        </v-card-subtitle>

        <!-- Form -->
        <v-form @submit.prevent="changePassword" ref="form">
            <!-- Current Password -->
            <v-text-field v-model="form.currentPassword" label="Current Password" variant="outlined" density="compact" :type="showCurrent ? 'text' : 'password'" :append-inner-icon="showCurrent ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showCurrent = !showCurrent" prepend-inner-icon="mdi-lock" class="my-3" :rules="[v => !!v || 'Current password is required']"></v-text-field>

            <!-- New Password -->
            <v-text-field v-model="form.newPassword" label="New Password" variant="outlined" density="compact" :type="showNew ? 'text' : 'password'" :append-inner-icon="showNew ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showNew = !showNew" prepend-inner-icon="mdi-lock-check" class="my-3" :rules="[v => v.length >= 6 || 'Password must be at least 6 characters']"></v-text-field>

            <!-- Confirm New Password -->
            <v-text-field v-model="form.confirmPassword" label="Confirm New Password" variant="outlined" density="compact" :type="showConfirm ? 'text' : 'password'" :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="showConfirm = !showConfirm" prepend-inner-icon="mdi-lock-check" class="my-3" :rules="[v => v === form.newPassword || 'Passwords do not match']"></v-text-field>

            <!-- Submit Button -->
            <v-btn type="submit" block class="change-btn" size="large" elevation="2">
                <v-icon left>mdi-check-bold</v-icon> Update
            </v-btn>
        </v-form>

    </v-card>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            showCurrent: false,
            showNew: false,
            showConfirm: false,
            form: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            }
        };
    },
    methods: {
        changePassword() {
            if (this.$refs.form.validate()) {
                console.log("Password Change Data:", this.form);
                this.$swal.fire({
                    icon: "success",
                    title: "Password Updated Successfully",
                    timer: 3000
                });
            }
        }
    }
};
</script>

<style scoped>
/* Center the card */
.v-container {
    height: 100vh;
}

/* Password Card */
.password-card {
    width: 100%;
    max-width: 600px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Update Button */
.change-btn {
    background-color: #3674B5 !important;
    color: white !important;
    font-weight: bold;
}

/* Back Link */
.back-link {
    color: #3674B5;
    font-weight: bold;
    text-decoration: none;
    margin-left: 5px;
    transition: 0.3s;
}

.back-link:hover {
    text-decoration: underline;
}
</style>
