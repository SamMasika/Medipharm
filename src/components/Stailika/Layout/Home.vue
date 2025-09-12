<template>
<v-app>
    <!-- Hero Section -->
    <v-container fluid class="hero-section">
        <video autoplay muted loop playsinline class="hero-video" :src="suitVideo"></video>

        <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" md="6" lg="5" class="text-center">
                <v-card class="hero-card" elevation="6" rounded>
                    <!-- Slider -->
                    <div class="slider-wrapper">
                        <!-- Headings -->
                        <transition-group name="slide-horizontal" tag="div" class="slider-text-wrapper">
                            <h1 v-for="(msg, index) in messages" v-show="index === currentIndex" :key="'heading-' + index" class="slider-heading">
                                {{ msg.heading }}
                            </h1>
                        </transition-group>

                        <!-- Subtitles -->
                        <transition-group name="slide-horizontal" tag="div" class="slider-text-wrapper">
                            <p v-for="(msg, index) in messages" v-show="index === currentIndex" :key="'subtitle-' + index" class="slider-subtitle" v-html="msg.subtitle"></p>
                        </transition-group>
                    </div>

                    <!-- CTA Button -->
                    <v-btn class="red-btn mt-6" size="x-large" rounded elevation="3" :style="{
                backgroundColor: red,
                color: 'white',
                fontWeight: 'bold',
              }" to="/book-appointment">
                        Book Your Appointment
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <!-- Main Content -->
    <v-main :style="{ backgroundColor: 'white' }" class="py-12 px-4 px-md-12">
        <v-container>
            <!-- About Us -->
            <section class="mb-16">
                <v-row align="center" justify="center">
                    <v-col cols="12" md="6">
                        <v-img src="@/assets/suits/official.jpeg" cover class="rounded-lg shadow-lg"></v-img>
                    </v-col>
                    <v-col cols="12" md="6">
                        <h2 class="text-dark-blue font-weight-bold mb-2">About Stailika</h2>
                        <div class="divider"></div>
                        <p class="body-1 text-justify mt-4" :style="{ color: '#444' }">
                            Welcome to <strong>Stailika</strong> – where timeless elegance meets
                            modern individuality. Founded in Dar es Salaam, we are a bespoke clothing
                            brand committed to redefining the tailoring experience for the modern
                            gentleman.
                        </p>
                        <p class="body-1 text-justify" :style="{ color: '#444' }">
                            We craft suits, tuxedos, and shirts with precision, passion, and a deep
                            respect for personal style. At Stailika, tailoring is more than
                            measurements — it’s an art form that reflects the uniqueness of every
                            client.
                        </p>
                    </v-col>
                </v-row>

                <!-- Mission & Vision -->
                <v-row class="mt-12" justify="center" align="stretch">
                    <v-col cols="12" md="6">
                        <v-card class="pa-6 mission-card h-100" elevation="0">
                            <v-icon size="40" color="#D32F2F" class="mb-3">mdi-target</v-icon>
                            <h3 class="text-dark-blue font-weight-bold mb-2">Our Mission</h3>
                            <p class="body-1" :style="{ color: '#555' }">
                                To revolutionize the tailoring experience by delivering quality,
                                convenience, and individuality at every stitch — from the first
                                consultation to the final fitting.
                            </p>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-card class="pa-6 mission-card h-100" elevation="0">
                            <v-icon size="40" color="#D32F2F" class="mb-3">mdi-eye</v-icon>
                            <h3 class="text-dark-blue font-weight-bold mb-2">Our Vision</h3>
                            <p class="body-1" :style="{ color: '#555' }">
                                To become Africa’s most trusted name in bespoke tailoring, setting the
                                standard for elegance, precision, and personalized service worldwide.
                            </p>
                        </v-card>
                    </v-col>
                </v-row>
            </section>

            <!-- Fabrics -->
            <v-container fluid class="fabric-section py-16">
                <h2 class="text-center text-white mb-8">Premium Fabrics</h2>
                <v-row justify="center">
                    <v-col v-for="(fabric, i) in fabrics" :key="i" cols="12" md="3">
                        <v-card class="fabric-card">
                            <v-img :src="fabric.image" height="200px" cover></v-img>
                            <v-card-title class="text-dark-blue">{{ fabric.name }}</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <!-- Testimonials -->
            <section v-if="testimonials && testimonials.length" class="mb-12">
                <h2 class="text-center mb-8 my-8 text-dark-blue">What Our Clients Say</h2>
                <v-row justify="center" class="mt-6">
                    <v-col v-for="(review, i) in testimonials" :key="i" cols="12" md="4" class="mb-6 d-flex">
                        <v-card outlined elevation="0" class="pa-6 flex-grow-1 d-flex flex-column justify-space-between">
                            <p class="body-1" :style="{ color: '#444', fontStyle: 'italic' }">
                                "{{ review.message }}"
                            </p>
                            <strong :style="{ color: red, marginTop: 'auto' }">- {{ review.name }}</strong>
                        </v-card>
                    </v-col>
                </v-row>
            </section>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import suitVideo from "@/assets/suit.mp4";
import axios from "axios";

export default {
    data() {
        return {
            darkBlue: "#020B2C",
            red: "#D32F2F",
            currentIndex: 0,
            sliderInterval: null,
            messages: [{
                    heading: "Luxury Bespoke Suits",
                    subtitle: "Stailika — crafting perfection in every stitch",
                },
                {
                    heading: "Tailored for You",
                    subtitle: "Experience the art of custom suits made just for you.",
                },
                {
                    heading: "Exceptional Fabrics",
                    subtitle: "Choose from the finest Italian wool, cashmere, and linen.",
                },
                {
                    heading: "Perfect Fit Guaranteed",
                    subtitle: "Precision measurements for unmatched comfort and style.",
                },
            ],
            fabrics: [{
                    name: "Italian Wool",
                    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
                },
                {
                    name: "Cashmere Blend",
                    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
                },
                {
                    name: "Linen",
                    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
                },
            ],
            testimonials: [],
            suitVideo,
            form: {},
        };
    },
    mounted() {
        this.startSlider();
        this.fetchTestimonials();
        this.loadAddress();
    },
    beforeUnmount() {
        if (this.sliderInterval) clearInterval(this.sliderInterval);
    },
    methods: {
        startSlider() {
            this.sliderInterval = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.messages.length;
            }, 5000);
        },
        async fetchTestimonials() {
            try {
                const response = await axios.get("/publish-comment");
                this.testimonials = response.data.comments || [];
                console.log(this.testimonials)
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                this.testimonials = [];
            }
        },
        async loadAddress() {
            try {
                const response = await axios.get("/company-address", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                if (response.data && response.data.data) {
                    this.form = {
                        ...response.data.data,
                    };
                }
            } catch (error) {
                console.error("Failed to load company address:", error);
            }
        },
    },
};
</script>

<style>
.hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    z-index: 0;
    filter: brightness(0.5) saturate(0.8);
    pointer-events: none;
}

.hero-card {
    background-color: rgba(2, 11, 44, 0.75);
    padding: 40px 30px;
    border-radius: 16px;
    max-width: 600px;
    height: auto;
    /* allow dynamic growth */
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25);
}

.slider-wrapper {
    width: 100%;
    text-align: center;
    padding: 0 10px;
}

.slider-text-wrapper {
    min-height: auto;
    /* remove fixed height */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.slider-heading {
    font-weight: 800;
    color: white;
    margin: 0;
    word-wrap: break-word;
    text-align: center;
    line-height: 1.3;
    font-size: 2.2rem;
}

.slider-subtitle {
    margin-top: 10px;
    font-size: 1.1rem;
    color: white;
    text-align: center;
    line-height: 1.4;
}

/* Responsive text scaling */
@media (max-width: 960px) {
    .slider-heading {
        font-size: 1.8rem;
    }

    .slider-subtitle {
        font-size: 1rem;
    }
}

@media (max-width: 600px) {
    .slider-heading {
        font-size: 1.4rem;
    }

    .slider-subtitle {
        font-size: 0.9rem;
    }
}

.text-dark-blue {
    color: #020b2c !important;
}

.red-btn:hover {
    background-color: #9a2424 !important;
}

/* Divider under About heading */
.divider {
    width: 60px;
    height: 4px;
    background-color: #d32f2f;
    border-radius: 2px;
}

/* Mission & Vision */
.mission-card {
    border-radius: 16px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mission-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* Fabrics */
.fabric-section {
    background: #020b2c;
    border-radius: 12px;
}

.fabric-card:hover {
    transform: translateY(-6px) scale(1.07);
    box-shadow: 0 14px 22px rgba(0, 0, 0, 0.3);
}
</style>
