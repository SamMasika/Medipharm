<template>
<v-container class="contact-support" fluid>
    <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
            <h1 class="text-h3 font-weight-bold text-primary mt-3 animate__animated animate__fadeInDown">Contact Support</h1>
            <p class="text-subtitle-1 text-grey-darken-1 animate__animated animate__fadeInUp animate__delay-1s">
                Need help? Fill out the form below, and our support team will get back to you soon.
            </p>
        </v-col>
    </v-row>

    <v-row justify="center" class="mt-5">
        <v-col cols="12" md="6">
            <v-card class="contact-card">
                <v-card-title class="text-h6 font-weight-bold text-center">Send Us a Message</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field label="Full Name" prepend-inner-icon="mdi-account" density="comfortable" variant="outlined" required placeholder="e.g. John Doe"></v-text-field>

                        <v-text-field label="Email" type="email" prepend-inner-icon="mdi-email" density="comfortable" variant="outlined" required placeholder="e.g. john.doe@example.com"></v-text-field>

                        <v-textarea label="Message" prepend-inner-icon="mdi-message-text" density="comfortable" variant="outlined" required placeholder="Write your message here"></v-textarea>

                        <v-btn class="submit-btn mt-3" block>
                            <v-icon left>mdi-send</v-icon> Submit
                        </v-btn>
                    </v-form>

                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

    <v-row justify="center" class="animate__animated animate__fadeInUp animate__delay-1s my-5">
        <v-col cols="12" md="6" class="text-center">
            <h2 class="text-h5 font-weight-bold ">Other Ways to Reach Us</h2>
            <p class="text-body-2 text-grey-darken-1">
                You can also contact us through the following methods:
            </p>

            <v-row class="contact-info mt-5 d-flex justify-center align-center" dense>
                <v-col cols="12" sm="4" class="contact-item text-center">
                    <v-card class="pa-3" flat>
                        <v-icon size="40" color="indigo">mdi-phone</v-icon>
                        <p class="text-body-2 mt-2 font-weight-medium">+255 123 456 789</p>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="4" class="contact-item text-center">
                    <v-card class="pa-3" flat>
                        <v-icon size="40" color="green-darken-2">mdi-email</v-icon>
                        <p class="text-body-2 mt-2 font-weight-medium">support@inventory.com</p>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="4" class="contact-item text-center">
                    <v-card class="pa-3" flat>
                        <v-icon size="40" color="pink-darken-2">mdi-map-marker</v-icon>
                        <p class="text-body-2 mt-2 font-weight-medium">Dar es Salaam, Tanzania</p>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>

</v-container>
</template>

<script>
export default {
    name: "ContactSupportComponent",
};
</script>

<style scoped>
.contact-support {
    padding: 40px 20px;
    border-radius: 10px;
    animation: fadeIn 1s ease-in-out;
}

.contact-card {
    padding: 20px;
    /* border-radius: 12px; */
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.contact-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

.submit-btn {
    background: linear-gradient(to right, #489DE7FF, #1565C0);
    color: white;
    font-weight: bold;
    transition: transform 0.2s ease-in-out;
}

.submit-btn:hover {
    background: linear-gradient(to right, #1565C0, #0D47A1);
    transform: scale(1.05);
}

.submit-btn:active {
    animation: bounce 0.3s;
}

.contact-item {
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
    cursor: pointer;
}

.contact-item:hover {
    transform: scale(1.1);
    color: #1565C0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}
</style>
