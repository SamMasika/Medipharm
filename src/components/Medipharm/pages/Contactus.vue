<template>
<div class="medipharm-contact">

    <AppBar />

    <!-- HERO -->
    <section class="hero">
         <div class="hero-bg">
        <img :src="heroImage" alt="MSD Medipharm Facility">
    </div>
        <div class="overlay"></div>

        <div class="hero-content">
            <div class="brand-tag">MSD MEDIPHARM</div>

            <h1 class="premium-title">Excellence in Health. <br>Partnership in Progress.</h1>

            <p class="lead">
                Tanzania’s trusted state-owned manufacturer of high-quality pharmaceutical and medical devices.
                Delivering safety, reliability, and innovation across Africa.
            </p>

            <div class="cta-group">
                <a href="#form" class="btn primary-btn">Make an Inquiry</a>
                <a href="#info" class="btn outline-btn">Our Details</a>
            </div>
        </div>
    </section>

    <!-- CONTACT INFO -->
    <section class="info-section" id="info">
        <v-container>
            <div class="section-title">
                <span class="subtitle">GET IN TOUCH</span>
                <h2>Connect With Us</h2>
            </div>

            <div class="info-grid">
                <div class="main-card">
                    <v-icon size="64" color="#93C439">mdi-handshake</v-icon>
                    <h3>Strategic Partnerships</h3>
                    <p>
                        We welcome collaboration with hospitals, distributors, NGOs, pharmacies,
                        and international health organizations seeking reliable, high-quality medical supplies.
                    </p>
                </div>

                <div class="details-grid">
                    <div class="detail-item" v-for="(item, i) in contacts" :key="i">
                        <v-icon :color="item.color" size="32">{{ item.icon }}</v-icon>
                        <div class="detail-text">
                            <strong>{{ item.label }}</strong>
                            <p>{{ item.value }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </section>

    <!-- INQUIRY FORM -->
    <section class="form-section" id="form">
        <v-container>
            <div class="form-box">
                <div class="form-header">
                    <h2>Send Your Inquiry</h2>
                    <p class="response-time">We typically respond within 24 business hours</p>
                </div>

                <v-form v-model="valid" @submit.prevent="submitForm" ref="formRef">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.name" label="Full Name" variant="outlined" density="comfortable" required />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.email" label="Email Address" type="email" variant="outlined" density="comfortable" required />
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.phone" label="Phone / WhatsApp" variant="outlined" density="comfortable" />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.subject" label="Product Interest (e.g. N95 Masks, Gloves)" variant="outlined" density="comfortable" />
                        </v-col>
                    </v-row>

                    <v-textarea v-model="form.message" label="Your Message" rows="6" variant="outlined" density="comfortable" />

                    <button type="submit" class="submit-btn" :disabled="!valid">
                        SEND INQUIRY
                        <v-icon right>mdi-arrow-right-bold</v-icon>
                    </button>
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
            try {
                await axios.post("/contact", this.form);
                this.showAlert("Thank you! Your inquiry was sent successfully.", "success");
                this.$refs.formRef.reset();
            } catch (e) {
                this.showAlert("Failed to send message. Please try again.", "error");
            }
        }
    }
};
</script>

<style scoped>
.medipharm-contact {
    background: #f8fafc;
}

/* HERO - More Premium */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.hero-bg img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.85);
}

.overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #162456, #233781, #93C439);
}

.hero-content {
    position: relative;
    z-index: 2;
    max-width: 780px;
    padding: 0 5rem;
    color: white;
}

.brand-tag {
    font-size: 1.05rem;
    letter-spacing: 4px;
    font-weight: 700;
    color: #93C439;
    margin-bottom: 16px;
    text-transform: uppercase;
}

.premium-title {
    font-size: 4.4rem;
    line-height: 1.05;
    font-weight: 900;
    margin-bottom: 28px;
    letter-spacing: -1px;
}

.lead {
    font-size: 1.35rem;
    line-height: 1.65;
    opacity: 0.95;
    margin-bottom: 48px;
    max-width: 620px;
}

.primary-btn {
    background: linear-gradient(135deg, #162456, #1e3a7a);
    color: white;
    padding: 20px 48px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.4s ease;
    box-shadow: 0 10px 30px rgba(22, 36, 86, 0.3);
}

.primary-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(22, 36, 86, 0.4);
}

.outline-btn {
    border: 2.5px solid white;
    color: white;
    padding: 18px 44px;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    margin-left: 20px;
    transition: all 0.4s ease;
}

.outline-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
}

/* INFO SECTION */
.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    margin-top: 80px;
    align-items: start;
}

.main-card {
    background: white;
    padding: 70px 60px;
    border-radius: 28px;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.08);
    transition: transform 0.4s ease;
}

.main-card:hover {
    transform: translateY(-12px);
}

.details-grid {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.detail-item {
    display: flex;
    gap: 28px;
    background: white;
    padding: 32px;
    border-radius: 24px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
}

.detail-item:hover {
    transform: translateX(12px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.detail-text strong {
    font-size: 1.1rem;
    color: #162456;
}

/* FORM */
.form-box {
    background: white;
    border-radius: 32px;
    padding: 90px 80px;
    box-shadow: 0 35px 100px rgba(0, 0, 0, 0.09);
    max-width: 920px;
    margin: 120px auto;
}

.form-header h2 {
    font-size: 2.6rem;
    margin-bottom: 8px;
    color: #162456;
}

.response-time {
    color: #666;
    font-size: 1.05rem;
}

.submit-btn {
    margin-top: 40px;
    width: 100%;
    background: linear-gradient(135deg, #93C439, #7eb32e);
    color: #0a2540;
    font-weight: 800;
    font-size: 1.15rem;
    padding: 22px;
    border: none;
    border-radius: 50px;
    box-shadow: 0 12px 35px rgba(147, 196, 57, 0.3);
    transition: all 0.4s ease;
}

.submit-btn:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 45px rgba(147, 196, 57, 0.4);
}

@media (max-width: 992px) {
    .premium-title {
        font-size: 3.4rem;
    }

    .info-grid {
        grid-template-columns: 1fr;
        gap: 50px;
    }

    .hero-content {
        padding: 0 2rem;
    }
}
</style>
