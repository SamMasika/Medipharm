<template>
<!-- Search and Items Per Page Options -->

<!-- Data Table -->
<v-card-text>
	<v-row justify="space-between" align="center">
			<!-- Search Input -->
			<v-spacer></v-spacer>
			<v-col cols="12" md="4" class="d-flex justify-end">
					<v-text-field v-model="search" label="Search" rounded="xl" density="compact" prepend-inner-icon="mdi-magnify" @input="onSearchChange" flat variant="solo-filled" hide-details single-line class="search-field" style="max-width: 300px;" />
			</v-col>
	
	</v-row>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="items" :items-length="totalItems" :loading="loading" item-value="id" :page="currentPage" @update:options="handlePageChange">
        <!-- Dynamically Render Actions through Slot -->
        <template v-slot:item="props">
            <tr :key="props.item.id">
                <td v-for="(column, index) in headers" :key="index">
                    <span v-if="column.value !== 'actions'">{{ getNestedValue(props.item, column.value) }}</span>
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

        // Method to handle nested properties (e.g., zone.name)
        getNestedValue(item, field) {
            return field.split('.').reduce((obj, key) => (obj && obj[key]) ? obj[key] : '', item);
        },
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
