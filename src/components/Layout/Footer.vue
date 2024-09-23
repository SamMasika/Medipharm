<template>
<v-container class="vision-section" fluid >
    <v-row justify="center">
        <v-col cols="12" md="10">
            <div class="text-center my-5">
                <v-row justify="center">
                    <!-- Church Vision -->
                    <v-col cols="12" md="3" class="vision-content text-left">
                        <p style="font-size:medium">
                            Our mission is to be active disciples of Jesus Christ, who demonstrate the Power of the Holy Spirit to all nations.
                        </p>
                    </v-col>
                    <!-- Links and Social Media -->
                    <v-col cols="12" md="9" class="links-social">
                        <v-row class="d-flex align-center" justify="center">
                            <!-- Links -->
                            <v-col cols="auto">
                                <v-list class="d-flex align-center links-list">
                                    <v-list-item link href="/careers">Careers</v-list-item>
                                    <v-list-item link href="/events">Events</v-list-item>
                                    <v-list-item link href="/privacy-policy">Privacy Policy</v-list-item>
                                    <v-list-item link href="https://www.instagram.com" target="_blank">
                                        <v-icon>mdi-instagram</v-icon>
                                    </v-list-item>
                                    <v-list-item link href="https://www.facebook.com" target="_blank">
                                        <v-icon>mdi-facebook</v-icon>
                                    </v-list-item>
                                    <v-list-item link href="https://twitter.com" target="_blank">
                                        <v-icon>mdi-twitter</v-icon>
                                    </v-list-item>
                                    <v-list-item link href="https://wa.me/255717135829" target="_blank">
                                        <v-icon>mdi-whatsapp</v-icon>
                                    </v-list-item>
                                    <!-- YouTube Link -->
                                    <v-list-item link href="https://www.youtube.com" target="_blank">
                                        <v-icon>mdi-youtube</v-icon>
                                    </v-list-item>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </v-col>
    </v-row>
</v-container>

<v-footer class="footer main-color">
    <v-container fluid class="py-4">
        <v-row class="justify-center align-center">
            <v-col class="text-center">
                <!-- Reservation Text -->
                <p class="footer-text white--text">
                    © {{ new Date().getFullYear() }} TAG Bethel Revival Temple-Morogoro. All rights reserved.
                </p>
            </v-col>
        </v-row>
    </v-container>
</v-footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
.footer {
    background-color:#800000;
    color: #ffffff;
    font-size: 14px;
    margin-top: 0;
}

.footer-text {
    margin: 0;
    padding: 0;
}

.vision-section {
    background-color: #E0CFC2;
    padding: 40px 0 0 0;
    margin-bottom: 0;
    margin-top: 50px;
}

.vision-content p {
    font-size: 16px;
    color: #333;
}

.links-social .v-list {
    margin: 0;
    padding: 0;
    background-color: #E0CFC2;
    /* Matches the background color of the vision section */
    border-radius: 8px;
    /* Optional: adds rounded corners */
}

.links-social .v-list-item {
    margin: 0 10px;
}

.links-social .v-icon {
    font-size: 24px;
}

.links-social .v-list-item:hover {
    color:#A82228;
}
</style>
