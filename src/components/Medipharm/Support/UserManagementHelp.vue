<template>
<v-container class="help-page" fluid>
 
	<nav class="custom-breadcrumbs">
			<span class="breadcrumb-item" @click="$router.push('/dashboard')">Dashboard</span>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-item" @click="$router.push('/help-center')">Help Center</span>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-item active">User Management Support</span>
	</nav>
	<v-row class="mb-10 align-start">
       
        <!-- Title and Subtitle (Centered) -->
        <v-col cols="12" class="text-center">
            <h1 class="title animate__animated animate__fadeInDown"> 👥 User Management Support</h1>
            <p class="subtitle animate__animated animate__fadeInUp animate__delay-1s">
               Learn how to manage users, assign roles, and control access in your system 🔐.
            </p>
        </v-col>
    </v-row>

    <!-- Steps Timeline -->
    <v-row class="mt-6 my-5" justify="center">
        <v-col cols="12" md="8">
            <v-timeline align-top dense>
                <v-timeline-item v-for="(step, i) in userSteps" :key="i" :color="step.color" small>
                    <!-- <template v-slot:opposite>
              <v-icon :color="step.color">{{ step.icon }}</v-icon>
            </template> -->

                    <v-card class="pa-4 step-card">
                        <h3 class="step-title">{{ step.title }}</h3>
                        <p class="step-desc">{{ step.description }}</p>
                    </v-card>
                </v-timeline-item>
            </v-timeline>

            <!-- Highlighted Tip -->
            <v-alert type="info" class="mt-6 tip-alert" border="start" colored-border elevation="0">
                <v-icon left>mdi-information</v-icon>
                💡 <strong>Tip:</strong> Only users with <strong>admin</strong> privileges can manage roles and permissions effectively 🔧.
            </v-alert>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            userSteps: [{
                    title: "📋 Access User Panel",
                    description: "Go to the sidebar and click on 'Users' under the Admin section 🧭.",
                    icon: "mdi-account-group-outline",
                    color: "blue"
                },
                {
                    title: "➕ Create a New User",
                    description: "Click the 'Add User' button and fill in the required information such as email, name, and role 📝.",
                    icon: "mdi-account-plus-outline",
                    color: "green"
                },
                {
                    title: "✏️ Edit Existing User",
                    description: "Click on the pencil icon next to a user to update their information or change roles 🔄.",
                    icon: "mdi-account-edit",
                    color: "orange"
                },
                {
                    title: "🛡️ Assign Roles and Permissions",
                    description: "Use the 'Role' dropdown to assign predefined roles with specific access rights 🎯.",
                    icon: "mdi-shield-account-outline",
                    color: "purple"
                },
                {
                    title: "🚫 Deactivate or Remove Users",
                    description: "Use the options menu to disable a user or remove them permanently from the system 🗑️.",
                    icon: "mdi-account-remove-outline",
                    color: "red"
                }
            ]
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
.help-page {
    padding: 40px 20px;
}

.step-card {
    background: linear-gradient(to right, #ffffff, #f1f5f8);
    border-left: 4px solid #2196f3;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
}

.step-title {
    font-size: 18px;
    font-weight: 600;
    color: #37474f;
    margin-bottom: 8px;
}

.step-desc {
    font-size: 14px;
    color: #616161;
}

.tip-alert {
    background-color: #e3f2fd;
    border-left: 5px solid #2196f3;
    color: #0d47a1;
    font-weight: 500;
}
</style>
