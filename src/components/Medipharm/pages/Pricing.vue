<template>
<app-bar></app-bar>

<v-container class="py-12">
    <!-- Heading -->
    <h1 class="text-center mb-6" :style="{ color: darkBlue, fontWeight: '800', fontSize: '2.5rem' }">
        Our Craft & Pricing
    </h1>

    <!-- Intro -->
    <p class="text-center mb-10" style="color: #555; font-size: 1.1rem; max-width: 800px; margin: auto;">
        We’ve merged the traditional concepts of <strong>MTM</strong> and
        <strong>custom suiting</strong> into one seamless process.
        Every garment begins with a unique pattern created from
        <strong>over 50 precise measurements</strong>, ensuring an impeccable fit.
    </p>

    <!-- Features -->
    <v-row justify="center" class="mb-12">
        <v-col cols="12" md="8">
            <ul class="feature-list">
                <li>All natural materials with highest quality construction</li>
                <li>Thousands of premium fabric options</li>
                <li>Expert guidance from start to finish</li>
                <li>Exceptional tailoring</li>
                <li>A wide range of design choices</li>
            </ul>
        </v-col>
    </v-row>

    <!-- Pricing Cards -->
    <v-row justify="center" align="stretch" dense>
        <v-col v-for="(item, index) in pricing" :key="index" cols="12" md="4" class="mb-8">
            <v-card class="pricing-card" elevation="10" @click="goToProduct(item.name)" style="cursor: pointer;">
                <!-- Product Image -->
                <v-img :src="item.image" height="200px" aspect-ratio="4/3" cover class="image-fit" :alt="`${item.name} image`">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>

                <!-- Colored Header -->
                <div class="plan-header" :style="{ background: item.color }">
                    <h3>{{ item.name }}</h3>
                </div>

                <!-- Price -->
                <v-card-text class="price-text">
                    <span class="currency">TZS</span>
                    <span class="amount">{{ item.price }}</span>
                </v-card-text>

                <!-- Description -->
                <v-card-text class="desc-text">
                    {{ item.desc }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

    <!-- Turnaround & Note -->
    <div class="extra-info mt-10" style="max-width: 600px; margin: auto; color: #555; font-size: 1rem; text-align: center;">
        <p><strong>Production Times:</strong></p>
        <ul style="list-style: none; padding-left: 0; line-height: 1.6;">
            <li><strong>Suits:</strong> About 1 week</li>
            <li><strong>Jackets & Overcoats:</strong> About 4 days</li>
            <li><strong>Trousers:</strong> About 3 days</li>
            <li><strong>Shirts:</strong> About 2 days</li>
        </ul>
        <p style="font-style: italic; color: #888; margin-top: 12px;">
            * Please note that production times may vary slightly depending on the queue of people awaiting
    the service, fabric availability, and design complexity.
        </p>
    </div>
</v-container>

<Footer></Footer>
</template>

<script>
import appBar from "../Layout/appBar.vue";
import jacketImage from "@/assets/suits/taxedo.jpeg";
import suitImage from "@/assets/suits/official.jpeg";
import trousersImage from "@/assets/trouse.jpeg";
import shirtImage from "@/assets/shirt.webp";
import overcoatImage from "@/assets/overcoat.jpg";
import Footer from "../Layout/Footer.vue";

export default {
    components: {
        appBar,
        Footer,
    },
    data() {
        return {
            darkBlue: "#020B2C",
            pricing: [{
                    name: "Suit",
                    price: "550,000",
                    desc: "Tailored to perfection with world-class fabrics and craftsmanship.",
                    color: "#A82228",
                    image: suitImage,
                },
                {
                    name: "Jacket",
                    price: "200,000",
                    desc: "A refined touch to elevate your style for any occasion.",
                    color: "#8B4513",
                    image: jacketImage,
                },
                {
                    name: "Trousers",
                    price: "80,000",
                    desc: "Comfort, fit, and elegance tailored to your unique posture.",
                    color: "#2E8B57",
                    image: trousersImage,
                },
                {
                    name: "Shirt",
                    price: "40,000",
                    desc: "Premium cotton shirts with precision cuts for all-day comfort.",
                    color: "#1E3A8A",
                    image: shirtImage,
                },
                {
                    name: "Overcoats",
                    price: "220,000",
                    desc: "Luxurious layering for timeless style and unmatched warmth.",
                    color: "#4B0082",
                    image: overcoatImage,
                },
            ],
        };
    },
    methods: {
        goToProduct(name) {
            const productName = name.replace(/\s+/g, "-");
            this.$router.push({
                path: `/pricing/product/${productName}`,
            });
        },
    },
};
</script>

<style scoped>
.feature-list {
    list-style: none;
    padding-left: 0;
    font-size: 1rem;
    color: #444;
    line-height: 1.7;
}

.feature-list li {
    padding-left: 30px;
    position: relative;
    margin-bottom: 8px;
}

.feature-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #A82228;
    font-weight: bold;
}

.plan-header {
    padding: 16px;
    color: white;
    font-size: 1.4rem;
    font-weight: 700;
}

.price-text {
    padding-top: 15px;
    font-weight: 700;
    font-size: 1.2rem;
}

.currency {
    font-size: 1rem;
    vertical-align: top;
    margin-right: 2px;
}

.amount {
    font-size: 2rem;
}

.desc-text {
    color: #555;
    font-size: 0.95rem;
    padding: 10px 20px;
    min-height: 60px;
}

.extra-info {
    text-align: center;
    font-size: 1rem;
    color: #555;
}

.note {
    font-size: 0.9rem;
    color: #888;
    font-style: italic;
    margin-top: 8px;
}

.pricing-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 16px;
    overflow: hidden;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pricing-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.25);
}

.image-fit {
    width: 100%;
    background-color: #f5f5f5;
}

/* Adjust height for small screens */
@media (max-width: 600px) {
    .image-fit {
        height: 150px;
    }
}
</style>
