<template>
<Loader :loading="loading" v-if="loading" />
<div v-else>
    <AppBar />
    <v-container fluid class="back-container">
        <v-row justify="center" class="align-center my-3 mb-6">
            <v-col cols="12" md="7" class="d-flex align-center justify-center my-8">
                <v-row>
                    <v-col cols="12" md="6" class="image-stack-container my-8 d-flex justify-center">
                        <!-- Image for medium and larger devices -->
                        <v-img class="stacked-image" src="@/assets/mtokambali.jpg" max-height="250px" max-width="45%" cover aspect-ratio="16/9" />
                        <!-- Centered image for small devices -->
                        <v-img class="stacked-image d-none d-md-flex" src="@/assets/mtokambali.jpg" max-height="300px" max-width="58%" cover aspect-ratio="16/9" />
                    </v-col>

                    <v-col cols="12" md="6" class="contact-info-container">
                        <h2 class="text-center text-md-left">
                            <i class="text-color">Connect with us</i>
                        </h2>
                        <div class="contact-info">
                            <v-icon class="mr-2 custom-icon-color">mdi-map-marker</v-icon>
                            Mwembesongo Street, Mji Mpya - Morogoro<br />

                            <v-icon class="mr-2 custom-icon-color">mdi-post-outline</v-icon>
                            P.O.Box 3240, Morogoro, Tanzania<br />

                            <v-icon class="mr-2 custom-icon-color">mdi-phone</v-icon>
                            +255 717 061 778<br />

                            <v-icon class="mr-2 custom-icon-color">mdi-email</v-icon>
                            <a href="mailto:info@brt.or.tz" class="email-link">info@brt.or.tz</a><br />

                            <v-icon class="mr-2 custom-icon-color">mdi-web</v-icon>
                            <a href="http://www.brt.or.tz" target="_blank" class="website-link">www.brt.or.tz</a>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>

    <v-container fluid class="contact-form-container">
        <h2><i>Send Us a Message</i></h2>
        <v-form v-model="valid" ref="form">
            <v-text-field v-model="name" label="Your Name" :rules="[rules.required]" required class="mb-8" variant="underlined" />
            <v-text-field v-model="email" label="Your Email" :rules="[rules.required, rules.email]" required class="mb-8" variant="underlined" />
            <v-text-field v-model="subject" label="Subject" :rules="[rules.required]" required class="mb-8" variant="underlined" />
            <v-textarea v-model="message" label="Your Message" :rules="[rules.required]" required class="mb-8" variant="underlined" />
            <v-btn class="custom-view-color" rounded="xl" @click="submitForm" prepend-icon="mdi-message">
                Send Message
            </v-btn>
        </v-form>
    </v-container>

    <v-container fluid class="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.948454401867!2d37.66298931529257!3d-6.816612295072708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185d9b90e05810a9%3A0x609071a58a3ea708!2sBethel%20Revival%20Temple!5e0!3m2!1sen!2stz!4v1695835557925!5m2!1sen!2stz" width="100%" height="600px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="map-iframe"></iframe>
    </v-container>

    <Footer />
</div>
</template>

<script>
import AppBar from "@/components/Layout/AppBar.vue";
import Footer from "@/components/Layout/Footer.vue";
import Loader from '@/components/Layout/Loader.vue';
import loaderSet from '@/mixins/loaderSet.js'; 


export default {
    mixins: [loaderSet],
    components: {
        AppBar,
        Footer,
        Loader,
    },
    data() {
        return {
            valid: false,
            name: '',
            email: '',
            subject: '',
            message: '',
            rules: {
                required: (value) => !!value || 'Required.',
                email: (value) => {
                    const pattern = /^[^@]+@\w+(\.\w+)+\w$/;
                    return pattern.test(value) || 'Invalid e-mail.';
                },
            },
        };
    },
    methods: {
        submitForm() {
            console.log('Form Submitted:', {
                name: this.name,
                email: this.email,
                subject: this.subject,
                message: this.message,
            });

            this.name = '';
            this.email = '';
            this.subject = '';
            this.message = '';
            this.$refs.form.resetValidation();
        },
    },
};
</script>

<style>
.map-container {
    max-width: 100%;
    padding: 0;
    margin-bottom: 0;
    /* Ensure no space below the map */
}

.contact-form-container {
    max-width: 1000px;
    margin: auto;
    padding: 50px;
    border-radius: 8px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.map-iframe {
    width: 100%;
    height: 600px;
    /* Increased height */
    border: 0;
    border-radius: 0;
}

.image-stack-container {
    display: flex;
    justify-content: center;
}

.contact-info-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.contact-info {
    font-size: 16px;
    line-height: 1.8;
}

.email-link,
.website-link {
    color: #007bff;
    text-decoration: none;
}

.email-link:hover,
.website-link:hover {
    text-decoration: underline;
}

.text-color {
    color: #A82228;
}

@media (max-width: 960px) {
    .contact-info-container {
        text-align: center;
    }

    .image-stack-container {
        justify-content: center;
        margin-bottom: 20px;
    }

    .contact-info {
        font-size: 14px;
        /* Slightly smaller font size on smaller screens */
    }
}
</style>
