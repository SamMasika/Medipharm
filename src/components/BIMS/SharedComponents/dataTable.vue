<template>
<v-card-text>
    <v-row justify="space-between" align="center">
        <!-- Search Input -->
        <v-spacer></v-spacer>
        <v-col cols="12" md="4" class="d-flex justify-end">
            <v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" @input="onSearchChange" flat variant="solo-filled" hide-details single-line class="search-field" style="max-width: 300px;" />
        </v-col>
    </v-row>

    <!-- Data Table -->
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="items" :items-length="totalItems" :loading="loading" item-value="id" :page="currentPage" @update:options="handlePageChange">
        <!-- Dynamically Render Actions through Slot -->
        <template v-slot:item="props">
            <tr :key="props.item.id">
                <td v-for="(column, index) in headers" :key="index">
                    <span v-if="column.value !== 'actions'">
                        <span v-if="column.format && column.value.toLowerCase().includes('price')">
                            {{ formatPrice(getNestedValue(props.item, column.value)) }}
                        </span>
                        <span v-else>
                            {{ getNestedValue(props.item, column.value) }}
                        </span>
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
import _ from "lodash"; // For debounce

export default {
    name: "SharedDataTable",
    props: {
        apiUrl: {
            type: String,
            required: true,
        },
        headers: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            items: [],
            search: "",
            itemsPerPage: 10, // Default items per page
            itemsPerPageOptions: [10, 25, 50, 100, -1], // Options for dropdown (-1 for "All")
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
                    per_page: this.itemsPerPage === -1 ? this.totalItems : this.itemsPerPage, // Fetch all if -1
                    search: this.search,
                };

                const response = await axios.get(this.apiUrl, {
                    params,
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

        // Format price to include commas and currency symbol (e.g., TZS 1,000,000)
        formatPrice(price) {
            if (!price) return "TZS 0"; // Handle cases where price is null or undefined
            return "TZS " + parseInt(price).toLocaleString();
        },

        // Method to handle nested properties (e.g., item.selling_price or item.details.selling_price)
        getNestedValue(item, field) {
            const value = field.split(".").reduce((obj, key) => (obj && obj[key] ? obj[key] : ""), item);

            // If the value is a date string, format it with ordinal suffix
            if (value && !isNaN(Date.parse(value))) {
                return this.formatDateWithOrdinal(new Date(value));
            }

            return value;
        },

        // Method to format date with ordinal suffix (e.g., 1st, 2nd, 3rd, 4th)
        formatDateWithOrdinal(date) {
            const day = date.getDate();
            const month = date.toLocaleString('default', {
                month: 'long'
            });
            const year = date.getFullYear();

            const suffix = this.getOrdinalSuffix(day); // Get the ordinal suffix (st, nd, rd, th)

            return `${day}${suffix} ${month} ${year}`;
        },

        // Helper method to get the ordinal suffix for a day (1st, 2nd, 3rd, etc.)
        getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return 'th'; // Handle 11th, 12th, 13th etc.
            switch (day % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        },

        handlePageChange(newOptions) {
            // Capture the new page and itemsPerPage from the updated options
            this.currentPage = newOptions.page;
            this.itemsPerPage = newOptions.itemsPerPage;
            this.fetchData(); // Fetch the data again when page or items per page change
        },

        onSearchChange: _.debounce(function () {
            this.currentPage = 1; // Reset to page 1 on search
            this.fetchData();
        }, 300), // Debounce to delay search
    },
    watch: {
        currentPage() {
            this.fetchData(); // Fetch data when page changes
        },
        itemsPerPage() {
            this.currentPage = 1; // Reset to page 1 when items per page changes
            this.fetchData();
        },
    },
    mounted() {
        this.fetchData(); // Initial data fetch
    },
};
</script>

<style scoped>
/* Add any custom styling here if needed */
</style>
