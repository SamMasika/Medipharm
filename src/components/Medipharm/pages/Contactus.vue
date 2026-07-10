<template>
<div class="medipharm-contact">
    <AppBar />

    <!-- HERO -->
    <section class="hero">
        <div class="hero-bg">
            <img :src="heroImage" alt="MSD Medipharm Facility" />
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-grid"></div>

        <div class="hero-container">

            <div class="hero-left">

                <h1>
                    Get In Touch
                    <span>With Us</span>
                </h1>

                <p class="lead">
                    Tanzania’s trusted manufacturer of high-quality pharmaceuticals and medical devices.<br>
                    We welcome partnerships that advance healthcare across the nation.
                </p>
                <div class="hero-actions">
                    <button large rounded class="btn-primary" @click="scrollToForm">
                        Send Us a Message
                    </button>

                    <button large outlined rounded class="btn-secondary" @click="scrollToInfo">
                        View Contact Details
                    </button>
                </div>

            </div>
        </div>

        <div class="scroll-indicator">
            <v-icon color="white" size="28">mdi-chevron-down</v-icon>
        </div>
    </section>

    <!-- CONTACT INFO -->
    <section class="info-section" id="info-section">
        <v-container>
            <div class="section-header">
                <span class="section-subtitle">CONNECT WITH US</span>
                <h2 class="section-title">Let’s Build a Healthier Future Together</h2>
            </div>

            <div class="info-grid">
                <!-- Partnership -->
                <div class="partnership-card">
                    <div class="icon-wrapper">
                        <v-icon size="82" color="#93C439">mdi-handshake</v-icon>
                    </div>
                    <h3>Strategic Partnerships</h3>
                    <p>
                        We actively collaborate with hospitals, distributors, NGOs, pharmacies,
                        and international health organizations to expand access to quality medical supplies.
                    </p>
                    <a href="#" class="cta-link" @click.prevent="scrollToForm">
                        Explore Partnership Opportunities
                        <v-icon small class="ml-2">mdi-arrow-right</v-icon>
                    </a>
                </div>

                <!-- Contact Details -->
                <div class="details-grid">
                    <div class="detail-item" v-for="(item, i) in contacts" :key="i">
                        <div class="detail-icon">
                            <v-icon :color="item.color" size="46">{{ item.icon }}</v-icon>
                        </div>
                        <div class="detail-content">
                            <div class="detail-label">{{ item.label }}</div>
                            <div class="detail-value">{{ item.value }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </section>

    <!-- INQUIRY FORM -->
    <section class="form-section" id="form-section">
        <v-container>
            <div class="form-card">
                <div class="form-header">
                    <h2>Send Your Inquiry</h2>
                    <p class="response-note">
                        Our team typically responds within 24 business hours
                    </p>
                </div>

                <v-form v-model="valid" ref="formRef" @submit.prevent="submitForm" class="inquiry-form">
                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.name" label="Full Name *" variant="outlined" density="comfortable" color="#162456" :rules="[v => !!v || 'Name is required']" required />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.email" label="Email Address *" type="email" variant="outlined" density="comfortable" color="#162456" :rules="[v => !!v || 'Email is required']" required />
                        </v-col>
                    </v-row>

                    <v-row dense>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.phone" label="Phone / WhatsApp" variant="outlined" density="comfortable" color="#162456" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.subject" label="Subject / Interest" placeholder="e.g. Surgical Gloves, N95 Masks, Partnership" variant="outlined" density="comfortable" color="#162456" />
                        </v-col>
                    </v-row>

                    <v-textarea v-model="form.message" label="Your Message *" rows="7" variant="outlined" density="comfortable" color="#162456" placeholder="Please tell us about your requirements or how we can assist you..." required />

                    <v-btn type="submit" block large rounded class="submit-btn" color="#93C439" :disabled="!valid || loading" :loading="loading">
                        SEND INQUIRY
                    </v-btn>
                </v-form>
            </div>
        </v-container>
    </section>
    <Footer />
</div>
</template>

<script>
import axios from "axios";
import AppBar from "../Layout/appBar.vue";
import Footer from "../Layout/Footer.vue";
import swtalert from "@/mixins/swtalert";
import heroImage from "@/assets/medifarm/medi15.jpeg";

export default {
    name: "MedipharmContact",
    mixins: [swtalert],
    components: {
        AppBar,
        Footer
    },

    data() {
        return {
            valid: true,
            heroImage,
            form: {
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            },
            contacts: [{
                    icon: "mdi-map-marker",
                    label: "Head Office",
                    value: "P.O. Box 9081, MSD Office, Block C, Keko Mwanga, Dar es Salaam, Tanzania",
                    color: "#162456"
                },
                {
                    icon: "mdi-phone",
                    label: "Phone",
                    value: "+255 718 672 540",
                    color: "#93C439"
                },
                {
                    icon: "mdi-email",
                    label: "Email",
                    value: "info.medipharm@msd.go.tz",
                    color: "#162456"
                },
                {
                    icon: "mdi-web",
                    label: "Website",
                    value: "www.msd.go.tz",
                    color: "#93C439"
                }
            ]
        };
    },

    methods: {
        async submitForm() {
            if (!this.valid) return;

            try {
                await axios.post("/contact", this.form);
                this.showAlert("Thank you! Your inquiry has been received successfully.", "success");
                this.$refs.formRef.reset();
            } catch (e) {
                this.showAlert("Failed to send your inquiry. Please try again later.", "error");
            }
        },
        scrollToForm() {
            document.getElementById('form-section').scrollIntoView({
                behavior: 'smooth'
            });
        },

        scrollToInfo() {
            document.getElementById('info-section').scrollIntoView({
                behavior: 'smooth'
            });
        },
    }
};
</script>

<style scoped>
.medipharm-contact {
    background: #f8fafc;

}

.hero-actions {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

/* HERO */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    color: white;
}

.hero-bg img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.75) contrast(1.05);
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero:hover .hero-bg img {
    transform: scale(1.03);
}

.brand-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 5px;
    color: #93C439;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
}

.tag-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #93C439;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

.premium-title {
    font-size: 3.2rem;
    font-family: 'Playfair Display', serif;
    line-height: 1.05;
    font-weight: 900;
    letter-spacing: -2.5px;
    margin-bottom: 1.75rem;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.lead {
    font-size: 1.35rem;
    line-height: 1.7;
    max-width: 620px;
    opacity: 0.95;
    margin-bottom: 3rem;
}

.cta-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    margin-bottom: 3.5rem;
}

.primary-btn {
    background: linear-gradient(135deg, #162456, #1e3a7a);
    color: white;
    padding: 22px 52px;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 1.15rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 15px 35px rgba(22, 36, 86, 0.35);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.primary-btn:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 25px 50px rgba(22, 36, 86, 0.45);
}

.secondary-btn {
    border: 2.5px solid rgba(255, 255, 255, 0.9);
    color: white;
    padding: 20px 48px;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.4s ease;
}

.secondary-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: white;
    transform: translateY(-4px);
}

.trust-badges {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
}

.badge {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    color: white;
    padding: 8px 22px;
    border-radius: 9999px;
    font-size: 0.95rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.scroll-indicator {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;
}

/* INFO SECTION */
.info-section {
    padding: 160px 0 120px;
    background: white;
}

.section-header {
    text-align: center;
    margin-bottom: 100px;
}

.section-subtitle {
    font-size: 1.05rem;
    letter-spacing: 4px;
    font-weight: 700;
    color: #93C439;
    text-transform: uppercase;
    display: block;
    margin-bottom: 12px;
}

.section-title {
    font-size: 3.2rem;
    font-weight: 800;
    color: #162456;
    line-height: 1.15;
    max-width: 720px;
    margin: 0 auto;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    align-items: start;
}

.partnership-card {
    background: #162456;
    color: white;
    padding: 80px 70px;
    border-radius: 32px;
    box-shadow: 0 30px 80px rgba(22, 36, 86, 0.18);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
}

.partnership-card:hover {
    transform: translateY(-20px);
}

.icon-wrapper {
    margin-bottom: 40px;
}

.partnership-card h3 {
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 24px;
    line-height: 1.2;
}

.partnership-desc {
    font-size: 1.2rem;
    line-height: 1.75;
    opacity: 0.9;
    margin-bottom: 48px;
}

.cta-link {
    color: #93C439;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.details-grid {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.detail-item {
    display: flex;
    gap: 32px;
    background: white;
    padding: 42px 48px;
    border-radius: 28px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.07);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(0, 0, 0, 0.04);
}

.detail-item:hover {
    transform: translateX(16px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.12);
}

.detail-icon {
    flex-shrink: 0;
    margin-top: 4px;
}

.detail-label {
    font-size: 1.05rem;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 4px;
}

.detail-value {
    font-size: 1.25rem;
    line-height: 1.5;
    color: #162456;
    font-weight: 500;
}

/* FORM */
.form-section {
    padding: 80px 0 160px;
    background: #f8fafc;
}

.form-card {
    background: white;
    border-radius: 36px;
    padding: 100px 90px;
    max-width: 960px;
    margin: 0 auto;
    box-shadow: 0 40px 120px rgba(0, 0, 0, 0.1);
}

.form-header {
    text-align: center;
    margin-bottom: 60px;
}

.form-header h2 {
    font-size: 3rem;
    font-weight: 800;
    color: #162456;
    margin-bottom: 16px;
}

.response-note {
    color: #64748b;
    font-size: 1.15rem;
}

.inquiry-form :deep(.v-text-field input),
.inquiry-form :deep(.v-textarea textarea) {
    font-size: 1.1rem;
}

.submit-btn {
    margin-top: 40px;
    height: 72px !important;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 15px 40px rgba(147, 196, 57, 0.35) !important;
    transition: all 0.4s ease;
}

.submit-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 55px rgba(147, 196, 57, 0.45) !important;
}

/* ANIMATIONS */
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
}

@keyframes bounce {

    0%,
    100% {
        transform: translateX(-50%) translateY(0);
    }

    50% {
        transform: translateX(-50%) translateY(12px);
    }
}

/* RESPONSIVE */
@media (max-width: 1200px) {
    .hero-content {
        padding: 0 3rem;
    }

    .info-grid {
        gap: 60px;
    }
}

@media (max-width: 992px) {
    .info-grid {
        grid-template-columns: 1fr;
    }

    .partnership-card {
        padding: 60px 50px;
    }

    .form-card {
        padding: 70px 40px;
    }
}

@media (max-width: 640px) {
    .hero-content {
        padding: 0 2rem;
    }

    .cta-group {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
