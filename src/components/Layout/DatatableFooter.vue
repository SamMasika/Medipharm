<template>
<v-divider></v-divider>
<v-row class="pagination-row mx-8">
    <v-col cols="12" sm="2">
        <p class="items-range text-blue font-weight-bold">
            <!-- Showing {{ startIndex }} - {{ endIndex }} out of 1000  -->
            Showing 100 - 200 out of 1000
        </p>
    </v-col>
    <v-col cols="12" sm="4" class="text-right">
        <v-pagination v-model="page" :length="4" rounded="circle" active-class="blue--text" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
    </v-col>

    <v-col cols="12" sm="1">
        <span>
            <p class=" text-small-emphasis font-weight-thin">Items/Page</p>
        </span>
        <v-select v-model="itemsPerPage" :items="itemsPerPageOptions" rounded="xl" density="compact" variant="solo-filled" single-line flat hide-details color="blue"></v-select>
    </v-col>
</v-row>
</template>

<script>
export default {
    data() {
        return {
            startDate: null,
            page: 1,
            itemsPerPage: 10, // Adjust the number of items per page as needed
            itemsPerPageOptions: [10, 20, 50, 100],
            pageCount: 0,
            search: '',

            endDate: null,

            selectedCategory: null,
        };
    },

    methods: {
        remove(key) {
            this.headers = this.headers.filter(header => header.key !== key)
        },
        updateItemsPerPage(option) {
            this.itemsPerPage = option;
            // You can update your data or fetch new data based on the selected items per page here
        },
    },

    mounted() {
        console.log('scatOptions:', this.scatOptions);
    },

    computed: {
        visibleHeaders() {
            return this.headers.filter(column => column.visible !== false);
        },
        startIndex() {
            return (this.page - 1) * this.itemsPerPage + 1;
        },

        endIndex() {
            const end = this.page * this.itemsPerPage;
            return end > this.sales.length ? this.sales.length : end;
        },
        // Calculate the next day after the selected start date
        nextDayAfterStartDate() {
            if (!this.startDate) return null;

            const nextDate = new Date(this.startDate);
            nextDate.setDate(nextDate.getDate() + 1);

            // Format the next date to match the input format
            const formattedNextDate = nextDate.toISOString().split('T')[0];

            return formattedNextDate;
        },

        maxEndDate() {
            const today = new Date();
            const formattedToday = today.toISOString().split('T')[0];
            return formattedToday;
        },
        showKeywordAutocomplete() {
            return this.selectedCategory === 'Keyword';
        },
        showHashtagAutocomplete() {
            return this.selectedCategory === 'Hashtag';
        },
        showSchedulesAutocomplete() {
            return this.selectedCategory === 'Schedules';
        },
        customDateFormat() {
            return (value) => {
                if (!value) return '';
                const date = new Date(value);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Months are zero-based
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            };
        },
    },
};
</script>

<style>
.pagination-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    /* Adjust margin as needed */
}
</style>
