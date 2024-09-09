<template>
<v-container fluid class="my-2">
    <v-card rounded="lg" flat>
        <v-card-title>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" lg="2" md="2" sm="2"></v-col>
                <v-col cols="12" lg="4" md="4" sm="4">
                    <v-autocomplete v-model="selectedCategory" variant="outlined" density="compact" rounded="lg" color="blue lighten-1" label="--Select Category--" :items="scatOptions" item-title="text" item-value="value"></v-autocomplete>
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="4" v-if="showKeywordAutocomplete">
                    <v-autocomplete variant="outlined" density="compact" rounded="lg" class="rounded-lg" color="blue lighten-1" label="Select Keyword"></v-autocomplete>
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="4" v-if="showHashtagAutocomplete">
                    <v-autocomplete variant="outlined" density="compact" rounded="lg" class="rounded-lg" color="blue lighten-1" label="Select Hashtag"></v-autocomplete>
                </v-col>
                <v-col cols="12" lg="2" md="2" sm="2"></v-col>

            </v-row>
            <v-row v-if="showSchedulesAutocomplete">
                <v-col cols="12" lg="1" md="1" sm="1">
                    <h3 class="text-right">From</h3>
                </v-col>
                <v-col cols="12" lg="4" md="4" sm="4">
                    <v-text-field type="date" v-model="startDate" variant="outlined" rounded="lg" density="compact" class="rounded-lg" color="blue lighten-1" label="Start Date" :max="maxEndDate"></v-text-field>
                </v-col>

                <v-col cols="12" lg="1" md="1" sm="1">
                    <h3 class="text-right">To</h3>
                </v-col>

                <v-col cols="12" lg="4" md="4" sm="4">
                    <v-text-field type="date" v-model="endDate" variant="outlined" rounded="lg" density="compact" class="rounded-lg" color="blue lighten-1" label="End Date" :min="nextDayAfterStartDate" :max="maxEndDate"></v-text-field>
                </v-col>
            </v-row>
            <v-row>

                <v-col cols="6" offset="6">
                    <v-btn type="submit" color="blue lighten-1" class="" elevation="0">
                        Submit
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

    <v-card rounded="lg" class="my-4"  flat>

        <v-card-title class="d-flex align-center pe-2 " color="blue">
            <v-icon icon="mdi-file"></v-icon> &nbsp;
            Jamii Forum Contents
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" rounded="xl" label="Search" single-line flat hide-details variant="solo-filled"></v-text-field>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            
            <v-data-table :headers="headers" :items="desserts"  :search="search">
                <template #bottom></template>
                <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
                    <tr>
                        <template v-for="column in columns" :key="column.key">
                            <td>
                                <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{ column.title }}</span>
                                <template v-if="isSorted(column)">
                                    <v-icon :icon="getSortIcon(column)"></v-icon>
                                </template>
                                <!-- <v-icon v-if="column.removable" icon="$close" @click="() => remove(column.key)"></v-icon> -->
                            </td>
                        </template>
                    </tr>
                </template>
            </v-data-table>
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
                    <span> <p class=" text-small-emphasis font-weight-thin">Items/Page</p></span>
                    <v-select v-model="itemsPerPage" :items="itemsPerPageOptions" rounded="lg"  density="compact" variant="solo-filled" single-line flat hide-details color="blue"></v-select>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</v-container>
</template>

<script>
export default {
    data() {
        return {
            startDate: null,
            page: 1,
            itemsPerPage: 10, // Adjust the number of items per page as needed
            itemsPerPageOptions: [10, 20, 50,100],
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
