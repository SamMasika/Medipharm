import axios from 'axios';

export default {
    data() {
        return {
            selectedItem: null,
            dropdownItems: [], // Dropdown items
            search: null, // Search term
            loading: false, // Loading indicator
            pagination: {
                currentPage: 1,
                lastPage: 1,
            },
        };
    },
    mounted() {
        this.fetchClusters();
    },
    methods: {
         // Fetch data from the API
         async fetchClusters(page = 1) {
            if (page > this.pagination.last_page) return;

            this.loading = true;
            try {
                const response = await axios.get(
                    `clusters/list?page=${page}`
                );
                const {
                    data,
                    meta
                } = response.data.data;

                // Update items and pagination
                this.dropdownItems = [...this.dropdownItems, ...data];
                this.pagination.current_page = meta.current_page;
                this.pagination.last_page = meta.last_page;
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                this.loading = false;
            }
        },
         // Fetch data from the API
         async fetchZones(page = 1) {
            if (page > this.pagination.last_page) return;

            this.loading = true;
            try {
                const response = await axios.get(
                    `zones/list?page=${page}`
                );
                const {
                    data,
                    meta
                } = response.data.data;

                // Update items and pagination
                this.dropdownItems = [...this.dropdownItems, ...data];
                this.pagination.current_page = meta.current_page;
                this.pagination.last_page = meta.last_page;
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                this.loading = false;
            }
        },
        // Handle search and pagination
        onSearch() {
            if (
                this.pagination.current_page < this.pagination.last_page &&
                !this.loading
            ) {
                this.fetchClusters(this.pagination.current_page + 1);
            }
        },
    },
};