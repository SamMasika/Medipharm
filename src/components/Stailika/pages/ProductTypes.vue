<template>
<app-bar></app-bar>

<v-container class="py-12">
    <!-- Back Icon -->
    <div class="back-icon" @click="goBack">
        <v-icon size="28" color="#020B2C">mdi-arrow-left</v-icon>
    </div>

    <!-- Heading -->
    <h1 class="text-center mb-6" :style="{ color: darkBlue, fontWeight: '800', fontSize: '2.5rem' }">
        {{ productTitle }}
    </h1>

    <!-- Intro -->
    <p v-if="variations.length" class="text-center mb-10 intro-text">
        Explore our premium selection of {{ productTitle.toLowerCase() }} crafted with precision and style.
    </p>

    <!-- Empty State -->
    <div v-else class="empty-state">
        <v-icon size="48" color="#A82228">mdi-alert-circle-outline</v-icon>
        <h2>No details available for {{ productTitle }}</h2>
        <p>Please check back later or explore other products.</p>
    </div>

    <!-- Variations -->
    <v-row v-if="variations.length" justify="center" align="stretch" dense>
        <v-col v-for="(variation, index) in variations" :key="index" cols="12" md="4" class="mb-8">
            <v-card class="pricing-card" elevation="10">
                <!-- Image -->
                <v-img v-if="variation.image" :src="getImageUrl(variation.image)" height="200px" cover></v-img>

                <!-- Header -->
                <div class="plan-header" :style="{ background: getColorForProduct(variation.name) }">
                    <h3>{{ variation.name }}</h3>
                </div>

                <!-- Price -->
                <v-card-text class="price-text">
                    <span class="currency">TZS</span>
                    <span class="amount">{{ variation.price }}</span>
                </v-card-text>

                <!-- Description & Details -->
                <v-card-text class="desc-text">
                    <p v-if="variation.desc">{{ variation.desc }}</p>

                    <!-- Checked Includes -->
                    <div v-if="variation.includes && variation.includes.length" class="section">
                        <strong>Includes:</strong>
                        <ul class="includes-list">
                            <li v-for="(item, i) in variation.includes" :key="i">
                                <v-icon small color="green" class="mr-1">mdi-check-circle</v-icon>
                                {{ item }}
                            </li>
                        </ul>
                    </div>

                    <!-- Pieces (only for suits) -->
                    <div v-if="variation.pieces && productTitle === 'Suit'" class="highlight-box">
                        <span class="highlight-label">Pieces</span>
                        <span class="highlight-value">{{ variation.pieces }}</span>
                    </div>

                    <!-- Category (for suits, trousers, jackets) -->
                    <div v-if="variation.category && ['Suit', 'Trouser', 'Jacket'].includes(productTitle)" class="highlight-box">
                        <span class="highlight-label">Category</span>
                        <span class="highlight-value">{{ variation.category }}</span>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>

<Footer></Footer>
</template>

<script>
import appBar from "../Layout/appBar.vue";
import Footer from "../Layout/Footer.vue";
import axios from "axios";

export default {
    components: {
        appBar,
        Footer
    },
    data() {
        return {
            darkBlue: "#020B2C",
            productTitle: "",
            variations: [],
            colorMapping: [{
                    name: "Suit",
                    color: "#A82228"
                },
                {
                    name: "Jacket",
                    color: "#8B4513"
                },
                {
                    name: "Trousers",
                    color: "#2E8B57"
                },
                {
                    name: "Shirt",
                    color: "#1E3A8A"
                },
                {
                    name: "Overcoats",
                    color: "#4B0082"
                },
            ],
        };
    },
    methods: {
        getImageUrl(imageName) {
            return this.$getImageUrl(imageName);
        },
        goBack() {
            this.$router.back();
        },
        getColorForProduct(name) {
            if (!name) return "#A82228";
            const lowerName = name.toLowerCase().trim();
            const found = this.colorMapping.find(item => lowerName.includes(item.name.toLowerCase()));
            return found ? found.color : "#A82228";
        }
    },
    async created() {
        const typeParam = this.$route.params.name.replace(/-/g, " ");
        this.productTitle = typeParam.charAt(0).toUpperCase() + typeParam.slice(1);

        try {
            const response = await axios.get(`/by-type?type=${typeParam}`);
            const packages = response.data.data || [];

            this.variations = packages.map(pkg => ({
                name: pkg.name,
                price: pkg.max_price || pkg.min_price || "N/A",
                desc: pkg.description || "",
                pieces: pkg.pieces || null,
                category: pkg.category || null,
                includes: pkg.includes || [], // ✅ now includes is mapped
                image: pkg.image || "",
            }));
        } catch (err) {
            console.error("Error fetching packages:", err);
        }
    }
};
</script>

<style scoped>
.back-icon {
    max-width: 1200px;
    margin: 0 auto 15px;
    cursor: pointer;
}

.back-icon:hover {
    color: #A82228;
}

.intro-text {
    color: #555;
    font-size: 1.1rem;
    max-width: 800px;
    margin: auto;
    line-height: 1.6;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 80px;
    color: #555;
}

.empty-state h2 {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 12px 0;
}

.empty-state p {
    font-size: 1rem;
    color: #888;
}

.pricing-card {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    overflow: hidden;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pricing-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 28px rgba(0, 0, 0, 0.25);
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
    text-align: left;
}

.highlight-box {
    margin-top: 12px;
    background: #f4f6f8;
    border-radius: 12px;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.95rem;
    font-weight: 500;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
}

.highlight-label {
    color: #333;
}

.highlight-value {
    background: #d32f2f;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
}

.section {
    margin-top: 12px;
}

.includes-list {
    list-style: none;
    padding: 0;
    margin: 5px 0 0;
}

.includes-list li {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
}

.includes-list li .v-icon {
    margin-right: 6px;
}
</style>
