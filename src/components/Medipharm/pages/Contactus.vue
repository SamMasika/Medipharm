<template>
<div class="contact-page">

    <AppBar />

    <!-- =====================================================
        HERO
    ====================================================== -->
    <section class="hero">

        <div class="hero-bg">
            <img :src="require('@/assets/livestock/feed6.jpeg')" alt="Livestock Hero">
        </div>

        <div class="hero-overlay"></div>

        <div class="hero-content">

            <span class="badge">
               THRISHOOL EXIM LTD
            </span>

            <h1>
                Quality Livestock
                <span>Feeds & Medicines</span>
            </h1>

            <p>
                We provide certified livestock feeds, veterinary medicines,
                supplements, and animal health solutions to support healthy
                and productive farming.
            </p>

            <div class="actions">

                <a href="#form" class="btn primary">
                    Make Inquiry
                </a>

                <a href="#info" class="btn outline">
                    Contact Info
                </a>

            </div>

        </div>

    </section>

    <!-- =====================================================
        INFO SECTION
    ====================================================== -->
    <section class="info-section" id="info">

        <v-container>

            <div class="section-head">

                <span class="small-badge">Get In Touch</span>

                <h2>Trusted Livestock Partner</h2>

                <p>
                    We support farmers, veterinary clinics, and distributors with
                    reliable livestock nutrition and healthcare products.
                </p>

            </div>

            <div class="grid">

                <!-- LEFT CARD -->
                <div class="card main-card">

                    <div class="icon">
                        <v-icon size="36">mdi-cow</v-icon>
                    </div>

                    <h3>Livestock Health Solutions</h3>

                    <p>
                        Safe, tested and high-quality animal feeds and veterinary medicines
                        designed for modern farming.
                    </p>

                    <ul>
                        <li><v-icon small>mdi-check</v-icon> Animal Feeds</li>
                        <li><v-icon small>mdi-check</v-icon> Veterinary Drugs</li>
                        <li><v-icon small>mdi-check</v-icon> Nutritional Supplements</li>
                    </ul>

                </div>

                <!-- RIGHT STACK -->
                <div class="stack">

                    <div class="mini-card">
                        <v-icon>mdi-map-marker</v-icon>
                        <div>
                            <h4>Location</h4>
                            <p>{{ address.location }} {{ address.city }}</p>
                        </div>
                    </div>

                    <div class="mini-card">
                        <v-icon>mdi-phone</v-icon>
                        <div>
                            <h4>Phone</h4>
                            <p>+{{ address.phone }}</p>
                        </div>
                    </div>

                    <div class="mini-card">
                        <v-icon>mdi-email</v-icon>
                        <div>
                            <h4>Email</h4>
                            <p>{{ address.email }}</p>
                        </div>
                    </div>

                    <div class="mini-card">
                        <v-icon>mdi-clock</v-icon>
                        <div>
                            <h4>Working Hours</h4>
                            <p>Mon - Sat | 8:00 AM - 6:00 PM</p>
                        </div>
                    </div>

                </div>

            </div>

        </v-container>

    </section>

    <!-- =====================================================
        FORM
    ====================================================== -->
    <section class="form-section" id="form">

        <v-container>

            <div class="form-wrapper">

                <!-- LEFT -->
                <div class="form-info">

                    <span class="badge gold">Inquiry Form</span>

                    <h2>Request Livestock Products</h2>

                    <p>
                        Send your request for feeds, medicines, or veterinary support.
                        We respond quickly with the right solution for your farm.
                    </p>

                    <div class="stats">

                        <div>
                            <h3>100%</h3>
                            <span>Quality Tested</span>
                        </div>

                        <div>
                            <h3>24/7</h3>
                            <span>Support</span>
                        </div>

                    </div>

                </div>

                <!-- RIGHT -->
                <div class="form-card">

                    <v-form v-model="formValid" @submit.prevent="submitForm">

                        <v-text-field v-model="form.name" label="Full Name" variant="outlined" />

                        <v-text-field v-model="form.email" label="Email" variant="outlined" />

                        <v-text-field v-model="form.phone" label="Phone" variant="outlined" />

                        <v-text-field v-model="form.subject" label="Product Type (Feed / Medicine)" variant="outlined" />

                        <v-textarea v-model="form.message" label="Your Request" rows="5" variant="outlined" />

                        <button class="submit" type="submit" :disabled="!formValid">
                            Send Inquiry
                            <v-icon>mdi-send</v-icon>
                        </button>

                    </v-form>

                </div>

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

export default {
    name: "ThrishoolContact",
    mixins: [swtalert],
    components: { AppBar, Footer },

    data() {
        return {
            formValid: false,
            address: {},

            form: {
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            }
        };
    },

    methods: {

        submitForm() {

            axios.post("/contact", this.form)
                .then(res => {

                    this.showAlert(res.data.message, "success");

                    this.form = {
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: ""
                    };

                })
                .catch(err => {
                    this.showAlert(
                        err.response?.data?.message || "Failed to send request",
                        "error"
                    );
                });

        },

        async loadAddress() {
            try {
                const res = await axios.get("/company-address");
                this.address = res.data.data || {};
            } catch (e) {
                console.log(e);
            }
        }

    },

    mounted() {
        this.loadAddress();
    }
};
</script>

<style scoped>

/* =========================
   COLORS
========================= */
:root {
    --maroon: #9a2424;
    --maroon-dark: #6d1414;
    --maroon-light: #c53a3a;

    --gold: #d97706;
    --gold-light: #ffcb74;

    --white: #ffffff;
    --text: #ececec;
}

/* =========================
   BASE
========================= */
.contact-page {
    background: #f6f1f1;
}

/* =========================
   HERO
========================= */
.hero {
    position: relative;
    min-height: 90vh;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.hero-bg img {
    width: 100%;
    height: 100%;
		border-radius: 16px;
    object-fit: cover;
}

.hero-overlay {
    position: absolute;
    inset: 0;
    /* darker, richer maroon (better contrast) */
    background: linear-gradient(
        135deg,
        #4a0f0f,
        #6d1414,
        #9a2424
    );
}

.hero-content {
    position: relative;
    max-width: 750px;
    padding: 60px;
    color: white;
}

.badge {
    background: rgba(255,255,255,0.12);
    padding: 10px 18px;
    border-radius: 999px;
    font-size: 14px;
    margin-bottom: 20px;
    display: inline-block;
}

.hero h1 {
    font-size: 3.8rem;
    line-height: 1.1;
}

.hero h1 span {
    color: var(--gold-light);
}

.hero p {
    margin-top: 20px;
    line-height: 1.8;
    color: #f1f1f1;
}

.actions {
    margin-top: 30px;
    display: flex;
    gap: 15px;
}

.btn {
    padding: 14px 26px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
}

.primary {
    background: var(--gold);
    color: white;
}

.outline {
    border: 1px solid white;
    color: white;
}


/* =========================
   INFO SECTION (ULTRA PREMIUM)
========================= */

.info-section {
    padding: 130px 0;
    background: linear-gradient(180deg, #f7f4f4, #ffffff);
}

/* =========================
   HEADER
========================= */

.section-head {
    text-align: center;
    max-width: 760px;
    margin: auto;
}

.small-badge {
    display: inline-flex;
    align-items: center;

    padding: 9px 18px;
    border-radius: 999px;

    background: rgba(154, 36, 36, 0.10);
    color: var(--maroon);

    font-weight: 800;
    letter-spacing: 0.4px;

    border: 1px solid rgba(154, 36, 36, 0.15);
}

.section-head h2 {
    margin-top: 16px;

    font-size: 3rem;
    font-weight: 900;

    color: #111;
    letter-spacing: -0.5px;
}

.section-head p {
    margin-top: 14px;

    color: #666;
    line-height: 1.9;
    font-size: 1.05rem;
}

/* =========================
   GRID LAYOUT
========================= */

.grid {
    margin-top: 80px;

    display: grid;
    grid-template-columns: 1.25fr 1fr;
    gap: 32px;
}

/* =========================
   MAIN CARD (PREMIUM DEPTH)
========================= */

.main-card {
    position: relative;
    overflow: hidden;

    /* darker, richer maroon (better contrast) */
    background: linear-gradient(
        135deg,
        #4a0f0f,
        #6d1414,
        #9a2424
    );

    color: #ffffff !important;

    padding: 52px;
    border-radius: 30px;

    box-shadow:
        0 30px 90px rgba(0, 0, 0, 0.35);
}
.main-card:hover {
    transform: translateY(-6px);
}

/* soft luxury glow */
.main-card::before {
    content: "";
    position: absolute;

    width: 320px;
    height: 320px;

    top: -120px;
    right: -120px;

    background: rgba(255, 203, 116, 0.10);

    filter: blur(60px);
    border-radius: 50%;

    z-index: 0;
}
/* icon container */
.main-card .icon {
    width: 74px;
    height: 74px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 22px;

    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.18);

    margin-bottom: 22px;
}


/* FORCE CARD TEXT TO ALWAYS BE VISIBLE */
.main-card {
    color: #ffffff !important;
}
.main-card * {
    position: relative;
    z-index: 1;
}

/* TITLE */
.main-card h3 {
    font-size: 2.2rem;
    font-weight: 900;

    margin-bottom: 14px;

    color: #ffffff !important;

    opacity: 1 !important;
}

/* PARAGRAPH */
.main-card p {
    color: rgba(255, 255, 255, 0.92) !important;
    line-height: 1.9;
    font-size: 1.05rem;

    opacity: 1 !important;
}

/* CHECKLIST */
.checks {
    margin-top: 26px;

    display: flex;
    flex-direction: column;
    gap: 12px;

    font-weight: 600;

    color: #ffffff !important;
}

/* ENSURE CHILD ELEMENTS DON'T OVERRIDE */
.main-card * {
    color: inherit !important;
}
.main-card .v-icon,
.main-card span,
.main-card div {
    color: #ffffff !important;
}
/* =========================
   SIDE STACK (MODERN CARDS)
========================= */

.stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* mini cards */
.mini-card {
    display: flex;
    align-items: center;
    gap: 16px;

    padding: 24px;
    border-radius: 22px;

    background: rgba(255, 255, 255, 0.95);

    border: 1px solid rgba(154, 36, 36, 0.10);

    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.06);

    transition: all 0.35s ease;

    backdrop-filter: blur(10px);
}

/* hover lift + color accent */
.mini-card:hover {
    transform: translateY(-6px);

    border-color: rgba(154, 36, 36, 0.25);

    box-shadow:
        0 30px 80px rgba(0, 0, 0, 0.12);
}

/* icon */
.mini-card .v-icon {
    color: var(--maroon);
    font-size: 28px;
}

/* text */
.mini-card h4 {
    margin: 0;

    font-size: 1.05rem;
    font-weight: 800;

    color: #111;
}

.mini-card p {
    margin: 0;

    color: #666;
    font-size: 0.95rem;
    line-height: 1.6;
}
/* =========================
   FORM
========================= */
.form-section {
    padding: 100px 0;
}



/* =========================
   WRAPPER (MODERN SPLIT CARD)
========================= */

.form-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.1fr;

    border-radius: 36px;
    overflow: hidden;

    background: #ffffff;

    box-shadow: 0 40px 120px rgba(0, 0, 0, 0.12);

    transform: translateY(0);
    transition: 0.4s ease;
}

.form-wrapper:hover {
    transform: translateY(-6px);
}

/* =========================
   LEFT PANEL (BRAND STORY SIDE)
========================= */

.form-info {
    position: relative;

    padding: 70px;
    background: linear-gradient(
        135deg,
        #4a0f0f,
        #6d1414,
        #9a2424
    );
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* soft luxury glow */
.form-info::before {
    content: "";
    position: absolute;

    width: 350px;
    height: 350px;

    top: -120px;
    right: -120px;

    background: rgba(255, 203, 116, 0.12);
    filter: blur(70px);

    border-radius: 50%;
}

/* ensure content above glow */
.form-info > * {
    position: relative;
    z-index: 2;
}

/* badge */
.badge.gold {
    display: inline-block;

    padding: 8px 16px;
    border-radius: 999px;

    background: rgba(255, 203, 116, 0.15);
    border: 1px solid rgba(255, 203, 116, 0.3);

    color: #ffcb74;

    font-weight: 700;
    letter-spacing: 0.5px;

    margin-bottom: 20px;
}

/* title */
.form-info h2 {
    font-size: 2.6rem;
    font-weight: 900;

    line-height: 1.2;

    margin-bottom: 18px;

    color: #fff;
}

/* description */
.form-info p {
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.9;
    font-size: 1.05rem;
    margin-bottom: 35px;
}

/* stats */
.stats {
    display: flex;
    gap: 20px;
}

.stats div {
    flex: 1;

    padding: 18px;

    border-radius: 18px;

    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);

    backdrop-filter: blur(10px);
}

.stats h3 {
    font-size: 2rem;
    color: #ffcb74;
    margin-bottom: 6px;
}

.stats span {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.8);
}

/* =========================
   RIGHT PANEL (FORM SIDE)
========================= */

.form-card {
    padding: 70px;

    background: #f9fafb;
}

/* Vuetify input spacing fix */
.form-card .v-input {
    margin-bottom: 18px;
}

/* inputs focus polish */
.v-text-field input,
.v-textarea textarea {
    font-size: 1rem;
}

/* =========================
   SUBMIT BUTTON (PREMIUM CTA)
========================= */

.submit {
    width: 100%;

    margin-top: 10px;

    padding: 14px 20px;

    border: none;
    border-radius: 999px;

    background: linear-gradient(135deg, #d97706, #ffcb74);

    color: #1a1a1a;

    font-weight: 800;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    cursor: pointer;

    transition: 0.3s ease;
}

.submit:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(217, 119, 6, 0.35);
}

.submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

/* =========================
   RESPONSIVE
========================= */
@media(max-width: 900px) {

    .grid,
    .form-wrapper {
        grid-template-columns: 1fr;
    }

    .hero h1 {
        font-size: 2.5rem;
    }
}

</style>