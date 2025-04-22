<template>
<v-card-text>
    <v-row justify="space-between" align="center">
        <v-spacer></v-spacer>
        <v-col cols="12" md="4" class="d-flex justify-end">
            <v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" @input="onSearchChange" flat variant="solo-filled" hide-details single-line class="search-field" style="max-width: 300px;" />
        </v-col>
    </v-row>

    <!-- Data Table -->
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="items" :items-length="totalItems" :loading="loading" item-value="id" :page="currentPage" @update:options="handlePageChange">
        <template v-slot:item="props">
            <tr :key="props.item.id">
                <td v-for="(column, index) in headers" :key="index">
                    <!-- Image Column -->
                    <span v-if="column.value === 'image'">
                        <v-img v-if="getImageUrl(getNestedValue(props.item, column.value))" :src="getImageUrl(getNestedValue(props.item, column.value))" alt="Product Image" class="product-image" cover aspect-ratio="1" />
                        <v-img v-else src="/path/to/default-image.jpg" alt="Placeholder Image" class="product-image" cover aspect-ratio="1" />
                    </span>

                    <!-- Stock Status Column -->
                    <span v-else-if="column.value === 'low_stock_level'">
                        <v-chip :color="getStockStatusColor(props.item.low_stock_level, props.item.quantity)" size="small" dark class="d-inline-flex align-center">
                            <v-icon start size="16">
                                {{ getStockStatusIcon(props.item.low_stock_level, props.item.quantity) }}
                            </v-icon>
                            {{ getStockStatusMessage(props.item.low_stock_level, props.item.quantity) }}
                            ({{ props.item.quantity }}/{{ props.item.low_stock_level }})
                        </v-chip>
                    </span>

                    <!-- Payment Status Chip -->
                    <span v-else-if="column.value === 'payment_status'">
                        <v-chip :color="getStatusColor(getNestedValue(props.item, column.value), 'payment_status')" size="small" dark class="d-inline-flex align-center">
                            <v-icon start size="16">
                                {{ getStatusIcon(getNestedValue(props.item, column.value), 'payment_status') }}
                            </v-icon>
                            {{ getNestedValue(props.item, column.value) }}
                        </v-chip>
                    </span>

                    <!-- Sale Status Chip -->
                    <span v-else-if="column.value === 'sale_status'">
                        <v-chip :color="getStatusColor(getNestedValue(props.item, column.value), 'sale_status')" size="small" dark class="d-inline-flex align-center">
                            <v-icon start size="16">
                                {{ getStatusIcon(getNestedValue(props.item, column.value), 'sale_status') }}
                            </v-icon>
                            {{ getNestedValue(props.item, column.value) }}
                        </v-chip>
                    </span>

                    <!-- Formatted Price -->
                    <span v-else-if="column.format && (
    ['price', 'amount'].some(term => column.value.toLowerCase().includes(term)) ||
    ['totalTD'].includes(column.value)
  )">
                        <v-icon size="14" class="mr-1" color="green">mdi-currency-tzs</v-icon>
                        {{ formatPrice(getNestedValue(props.item, column.value)) }}
                    </span>

                    <!-- Regular Values -->
                    <span v-else-if="column.value !== 'actions'">
                        {{ getNestedValue(props.item, column.value) }}
                    </span>

                    <!-- Actions Slot -->
                    <span v-else>
                        <slot name="actions" :item="props.item"></slot>
                    </span>
                </td>
            </tr>
        </template>
    </v-data-table-server>
	
</v-card-text>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
    name: "SharedDataTable",
    props: {
        apiUrl: {
            type: String,
            required: true
        },
        headers: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            items: [],
            search: "",
            itemsPerPage: 10,
            itemsPerPageOptions: [10, 25, 50, 100, -1],
            currentPage: 1,
            totalItems: 0,
            totalPages: 1,
            loading: false,
        };
    },
    methods: {
        async fetchData() {
            try {
                this.loading = true;
                const params = {
                    page: this.currentPage,
                    per_page: this.itemsPerPage === -1 ? this.totalItems : this.itemsPerPage,
                    search: this.search,
                };

                const response = await axios.get(this.apiUrl, {
                    params
                });
                const responseData = response.data.data || {};
                this.items = responseData.data || [];
                this.totalItems = responseData.meta.total || 0;
                this.totalPages = responseData.meta.last_page || 1;
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                this.loading = false;
            }
        },

        formatPrice(price) {
            if (!price) return "TZS 0";
            return "TZS " + parseInt(price).toLocaleString();
        },

        getNestedValue(item, field) {
            const value = field.split(".").reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : ""), item);

            // If the field name includes 'date' or ends with '_at', format as date
            const isDateField = field.toLowerCase().includes("date") || field.toLowerCase().endsWith("_at");

            if (isDateField && typeof value === "string" && !isNaN(Date.parse(value))) {
                return this.formatDateWithOrdinal(new Date(value));
            }

            return value;
        },

        getImageUrl(imagePath) {
            if (!imagePath) return null;
            return this.$getImageUrl(imagePath);
        },

        formatDateWithOrdinal(date) {
            const day = date.getDate();
            const month = date.toLocaleString("default", {
                month: "long"
            });
            const year = date.getFullYear();
            const suffix = this.getOrdinalSuffix(day);
            return `${day}${suffix} ${month} ${year}`;
        },

        getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return "th";
            switch (day % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        },

        handlePageChange(newOptions) {
            this.currentPage = newOptions.page;
            this.itemsPerPage = newOptions.itemsPerPage;
            this.fetchData();
        },

        onSearchChange: _.debounce(function () {
            this.currentPage = 1;
            this.fetchData();
        }, 300),
        getStockStatusIcon(low_stock_level, quantity) {
            if (quantity === 0) {
                return 'mdi-close-circle';
            } else if (quantity < low_stock_level) {
                return 'mdi-alert-circle';
            } else {
                return 'mdi-check-circle';
            }
        },

        // 🔴 Stock color and message functions
        getStockStatusColor(low_stock_level, quantity) {
            if (quantity === 0) return "red";
            else if (quantity < low_stock_level && quantity > 0) return "orange";
            else return "green";
        },

        getStockStatusMessage(low_stock_level, quantity) {
            if (quantity === 0) return "Out of Stock";
            else if (quantity < low_stock_level && quantity > 0) return "Low Stock";
            else return "In Stock";
        },
        getStatusColor(status, field = "") {
            const val = (status || "").toString().toUpperCase();

            if (field === "payment_status") {
                if (val === "COMPLETED") return "green";
                if (val === "PARTIAL") return "orange";
                if (val === "DUE") return "red";
            }

            if (field === "sale_status") {
                if (val === "PAY") return "blue";
                if (val === "GETINVOICE") return "teal";
            }

            return "grey"; // fallback
        },
        getStatusIcon(status, field = "") {
            const val = (status || "").toString().toUpperCase();

            if (field === "payment_status") {
                if (val === "COMPLETED") return "mdi-check-circle";
                if (val === "PARTIAL") return "mdi-alert-circle";
                if (val === "DUE") return "mdi-close-circle";
            }

            if (field === "sale_status") {
                if (val === "PAY") return "mdi-cash";
                if (val === "GETINVOICE") return "mdi-file-document";
            }

            return "mdi-help-circle"; // fallback icon
        }

    },
    watch: {
        currentPage() {
            this.fetchData();
        },
        itemsPerPage() {
            this.currentPage = 1;
            this.fetchData();
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style scoped>
.product-image {
    border-radius: 8%;
    max-height: 100px;
    max-width: 100px;
    min-height: 100px;
    min-width: 100px;
    object-fit: cover;
}
</style>
