<template>

<v-container fluid v-if="itemsLength>0">
		<nav class="custom-breadcrumbs">
			<span class="breadcrumb-item" @click="$router.push('/dashboard')">Dashboard</span>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-item active">Stock Overview</span>
	</nav>
    <v-card flat>
        <v-toolbar>
            <v-icon icon="mdi-cube-outline" class="mx-5 custom-icon" size="40"></v-icon> &nbsp;
            Stock Overview
            <v-spacer></v-spacer>
        </v-toolbar>
        <DataTable :api-url="'/stock-list'" :headers="headers">
        </DataTable>

    </v-card>
   
  
</v-container>
<v-container class="relative-container" fluid v-else>
    <div class="centered-message">
        <v-card class="pa-6 text-center" elevation="0" max-width="500">
            <v-icon size="48" color="grey">mdi-file-document-outline</v-icon>
            <h2 class="mt-4 mb-2 text-grey-darken-2">No Stock Data Found</h2>
            <p class="text-grey">
                There are no stock records found at the moment.
            </p>

        </v-card>
    </div>
</v-container>
</template>

<script>
import DataTable from '@/components/BIMS/SharedComponents/dataTable';
import axios from "axios";
import alert from '@/mixins/swtalert';
import NoRecords from '@/mixins/NoRecords';
export default {
    mixins: [alert,NoRecords],
    components: {
        DataTable,
    },
    data() {
        return {
            search: "",
            dialog: false,
            isLoading: false,
            headers: [{
                    title: 'Product',
                    value: 'productName',
                },
                {
                    title: 'BatchNo',
                    value: 'batchNo',
                },
                {
                    title: 'Purchase Date',
                    value: 'purchased_date',
                    format: true
                },
                {
                    title: 'Available Stock',
                    value: 'availableQty',
                },

            ],
        };
    },

    methods: {
        fetchItems() {
            axios.get('/stock-list') // Replace with your actual API URL
                .then(response => {
                    this.itemsLength = response.data.data.meta.total; // Store the fetched data in 'purchases'
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        },
    },

};
</script>

<style scoped>
.header {
    padding: 16px 24px;
    border-bottom: 1px solid #e0e0e0;
}

.title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
}

.add-button {
    border-radius: 24px;
}

.search-field {
    flex-grow: 1;
    max-width: 300px;
    margin-right: 10px;
}

.v-card {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.v-data-table {
    margin-top: 16px;
}

.datatable-header {
    background-color: #1976d2 !important;
    color: white !important;
}

.text-color {
    color: #A82228;
}

.toolbar {
    background-color: #A82228;
    color: white;
}
</style>
