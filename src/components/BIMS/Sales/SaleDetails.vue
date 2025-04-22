<template>
<v-container fluid class="sale-details">
	<nav class="custom-breadcrumbs">
				<span class="breadcrumb-item" @click="$router.push('/dashboard')">Dashboard</span>
				<span class="breadcrumb-separator">/</span>
				<span class="breadcrumb-item" @click="$router.push('/sales-history')">Sales History</span>
				<span class="breadcrumb-separator">/</span>
				<span class="breadcrumb-item active">Sale Details</span>
		</nav>
    <!-- Header -->
    <v-row justify="center" class="mb-10">
        <v-col cols="12" md="8" class="text-center">
            <h1 class="title">🧾 Sale Details</h1>
            <p class="subtitle">Full breakdown of this transaction</p>
        </v-col>
    </v-row>

    <!-- Sale Card -->
    <v-row justify="center">
        <v-col cols="12" md="10">
            <v-card  class="sale-card">
                <v-row>
                    <!-- General Info -->
                    <v-col cols="12">
                        <div class="section-title blue lighten-4">📝 General Info</div>
                        <v-row dense>
                            <v-col cols="12" sm="6" class="detail"><strong>Sale Code:</strong> {{ sale.sale_code }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Sale Date:</strong> {{ formatDate(sale.sales_date) }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Sale Status:</strong> {{ sale.sale_status }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Payment Mode:</strong> {{ sale.payment_mode }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Payment Status:</strong> {{ sale.payment_status }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Created By:</strong> {{ sale.created_by }}</v-col>
                        </v-row>
                    </v-col>

                    <!-- Customer Info -->
                    <v-col cols="12">
                        <div class="section-title amber lighten-4 mt-6">👤 Customer Info</div>
                        <v-row dense>
                            <v-col cols="12" sm="6" class="detail"><strong>Name:</strong> {{ sale.customer.name }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Phone:</strong> {{ sale.customer.phone }}</v-col>
                        </v-row>
                    </v-col>

                    <!-- Items -->
                    <!-- Items - Redesigned -->
                    <v-col cols="12">
                        <div class="section-title green lighten-4 mt-6">📦 Items</div>
                        <v-data-table :headers="itemHeaders" :items="sale.items" class="elevation-0 styled-table" item-value="id" hide-default-footer dense>
                            <template v-slot:[`item.index`]="{ index }">
                                {{ index + 1 }}
                            </template>
                            <template v-slot:[`item.price`]="{ item }">
                                {{ formatCurrency(item.price) }}
                            </template>
                            <template v-slot:[`item.sub_total`]="{ item }">
                                {{ formatCurrency(item.sub_total) }}
                            </template>
                        </v-data-table>
                    </v-col>

                    <!-- Totals -->
                    <v-col cols="12">
                        <div class="section-title deep-purple lighten-4 mt-6">💰 Totals</div>
                        <v-row dense>
                            <v-col cols="12" sm="6" class="detail"><strong>Total Sale:</strong> {{ formatCurrency(sale.totalsales_price) }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Total Purchase:</strong> {{ formatCurrency(sale.totalpurchases_price) }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Total Quantity:</strong> {{ sale.total_quantity }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Discount:</strong> {{ formatCurrency(sale.discount) }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Tax:</strong> {{ formatCurrency(sale.taxes) }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Paid Amount:</strong> {{ formatCurrency(sale.paid_amount) }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Remaining:</strong> {{ formatCurrency(sale.remaining_amount) }}</v-col>
                        </v-row>
                    </v-col>

                    <!-- Metadata -->
                    <v-col cols="12">
                        <div class="section-title grey lighten-3 mt-6">📅 Metadata</div>
                        <v-row dense>
                            <v-col cols="12" sm="6" class="detail"><strong>Created At:</strong> {{ formatDate(sale.created_at) }}</v-col>
                            <v-col cols="12" sm="6" class="detail"><strong>Updated At:</strong> {{ formatDate(sale.updated_at) }}</v-col>
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
            sale: {
                customer: {},
                items: []
            },
            itemHeaders: [{
                    title: '#',
                    value: 'index',
                    width: '5%'
                },
                {
                    title: 'Product Name',
                    value: 'product_name'
                },
                {
                    title: 'Unit',
                    value: 'unit',
                    width: '15%'
                },
                {
                    title: 'Quantity',
                    value: 'quantity',
                    width: '10%'
                },
                {
                    title: 'Price',
                    value: 'price',
                    width: '20%'
                },
                {
                    title: 'Subtotal',
                    value: 'sub_total',
                    width: '20%'
                },
            ]
        };
    },
    created() {
        const saleId = this.$route.params.id;
        this.fetchSaleDetails(saleId);
    },
    methods: {
        async fetchSaleDetails(id) {
            try {
                const res = await axios.get(`/sale-show/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                this.sale = res.data.data;
                console.log(this.sale);
            } catch (error) {
                this.$emit("error", "Failed to fetch sale details");
            }
        },
        formatCurrency(value) {
            return new Intl.NumberFormat("en-TZ", {
                style: "currency",
                currency: "TZS"
            }).format(value);
        },
        formatDate(date) {
            return new Date(date).toLocaleString();
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
.sale-card {
    background: #ffffff;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    padding: 30px;
}

.section-title {
    font-weight: bold;
    padding: 10px;
    font-size: 18px;
    border-radius: 8px;
    margin-bottom: 15px;
}

.detail {
    margin-bottom: 10px;
}

.title {
    font-size: 32px;
    font-weight: 700;
}

.subtitle {
    color: #666;
}

.styled-table .v-data-table-header th {
    background-color: #f0f0f0;
    font-weight: 600;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #ddd;
}

.styled-table .v-data-table__td {
    font-size: 14px;
    padding: 12px 8px;
    color: #444;
}

.styled-table .v-data-table__tr:nth-child(even) {
    background-color: #fafafa;
}
</style>
