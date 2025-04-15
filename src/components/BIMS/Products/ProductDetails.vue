<template>
<v-container fluid class="product-details">
    <!-- Header -->
    <v-row justify="center" class="mb-10">
        <v-col cols="12" md="8" class="text-center">
            <h1 class="title">🛍️ Product Details</h1>
            <p class="subtitle">Here is everything you need to know about this product</p>
        </v-col>
        <v-btn color="primary" variant="outlined" rounded="xl" elevation="0" @click="goBack">
            <v-icon>mdi-arrow-left-bold</v-icon>Back
        </v-btn>
    </v-row>

    <!-- Main Card -->
    <v-row justify="center">
        <v-col cols="12" md="10">
            <v-card elevation="10" class="product-card">
                <v-row>
                    <!-- Product Image -->
                    <v-col cols="12" md="4" class="d-flex justify-center align-center">
                        <v-img :src="getImageUrl(product.image) || '/lib/images/no-image.png'" class="product-image" aspect-ratio="1" contain />
                    </v-col>

                    <!-- Product Info -->
                    <v-col cols="12" md="8">
                        <!-- General Info -->
                        <div class="section-title blue lighten-4">📝 General Info</div>
                        <v-row dense>
                            <v-col cols="12" sm="6" class="detail"><strong>Name:</strong> {{ product.name }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>SKU:</strong> {{ product.SKU }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Barcode:</strong> {{ product.barcode }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Category:</strong> {{ product.category }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Unit:</strong> {{ product.unit }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Created By:</strong> {{ product.createdBy }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Weight:</strong> {{ product.weight || 'N/A' }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Dimensions:</strong> {{ product.dimensions || 'N/A' }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Store ID:</strong> {{ product.store_id || 'N/A' }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Company ID:</strong> {{ product.company_id }}</v-col>
                        </v-row>

                        <!-- Pricing -->
                        <div class="section-title green lighten-4 mt-6">💰 Pricing</div>
                        <v-row dense>
                            <v-col cols="12" sm="6" class="detail">
                                <strong>Selling Price:</strong>
                                <span class="green--text font-weight-bold">{{ formatCurrency(product.selling_price) }}</span>
                            </v-col>
                            <v-col cols="12" sm="6" class="detail">
                                <strong>Purchasing Price:</strong>
                                <span class="red--text font-weight-bold">{{ formatCurrency(product.purchasing_price) }}</span>
                            </v-col>
                        </v-row>

                        <!-- Stock Info -->
                        <div class="section-title amber lighten-4 mt-6">📦 Stock</div>
                        <v-row dense>
                            <v-col cols="12" sm="6" class="detail"><strong>Stock Alert:</strong> {{ product.low_stock_level }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Max Stock Level:</strong> {{ product.max_stock_level || 'N/A' }}</v-col>
                            <v-col cols="12" sm="6" class="detail">
                                <strong>Status:</strong>
                                <v-chip class="ml-2" :color="product.flug === 'ACTIVE' ? 'green' : 'red'" variant="flat" dark>
                                    {{ product.flug }}
                                </v-chip>
                            </v-col>
                        </v-row>

                        <!-- Barcode -->
                        <div class="section-title deep-purple lighten-4 mt-6">🔍 Barcode Image</div>
                        <v-row>
                            <v-col cols="12" class="d-flex ">
                                <v-img :src="getImageUrl(product.barcode_image)" max-width="300" max-height="500" class="barcode-image mt-2" contain />
                            </v-col>
                        </v-row>

                        <!-- Metadata -->
                        <div class="section-title grey lighten-3 mt-6">📅 Metadata</div>
                        <v-row dense>
                            <v-col cols="12" sm="6" class="detail"><strong>Created At:</strong> {{ formatDate(product.created_at) }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Updated At:</strong> {{ formatDate(product.updated_at) }}</v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            product: {}
        };
    },
    created() {
        const productId = this.$route.params.id;
        this.fetchProductDetails(productId);
    },
    methods: {
        getImageUrl(imageName) {
            return this.$getImageUrl(imageName);
        },
        async fetchProductDetails(id) {
            try {
                const response = await axios.get(`/product-show/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    },
                });
                this.product = response.data.data;
            } catch (error) {
                this.showAlert(error.response.data.meta.message || "An error occurred", "error");
            }
        },
        formatCurrency(value) {
            return new Intl.NumberFormat("en-TZ", {
                style: "currency",
                currency: "TZS"
            }).format(value);
        },
        formatDate(date) {
            if (!date) return "N/A";
            return new Date(date).toLocaleString();
        },
        goBack() {
            this.$router.go(-1); // This will navigate back to the previous page
        }
    }
};
</script>

<style scoped>
.product-details {
    font-family: 'Segoe UI', sans-serif;
}



.product-card {
    background: #ffffff;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    padding: 30px;
}

.section-title {
    font-weight: 600;
    font-size: 17px;
    padding: 10px 14px;
    border-left: 5px solid #3f51b5;
    background-color: #e3f2fd;
    margin-bottom: 12px;
    border-radius: 6px;
    color: #263238;
}

.detail {
    font-size: 15px;
    color: #37474f;
    padding: 8px 0;
}

.product-image {
    max-width: 280px;
    width: 100%;
    border-radius: 12px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
}

.barcode-image {
    padding: 8px;
    height: 100%;
}
</style>
