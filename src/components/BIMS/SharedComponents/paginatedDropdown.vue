<template>
  <v-autocomplete
    v-model="selectedItem"
    :items="computedItems"
    v-model:search-input="search"
    :loading="loading"
    variant="outlined"
    :label="label"
    :placeholder="placeholder"
    @update:search="onSearch"
    :menu-props="{ maxHeight: '300px' }"
    :item-title="itemTitle"
    item-value="id"
  >
    <!-- Custom Load All button -->
    <template v-slot:prepend-item>
      <v-list-item
        v-if="pagination.currentPage < pagination.lastPage && !loading && !loadedAll && apiEndpoint"
        @click="loadAllItems"
      >
        <v-list-item-content>
          <v-btn block color="blue" @mouseover="hover = true" @mouseleave="hover = false">
            <v-icon left>mdi-arrow-down-circle</v-icon>
            Load All Items
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-progress-circular
        v-if="loading"
        indeterminate
        size="24"
        class="loading-indicator"
      />
    </template>

    <!-- 👇 Added this for append-item slot support -->
    <template v-slot:append-item>
      <slot name="append-item" />
    </template>
  </v-autocomplete>
</template>


<script>
import axios from "axios";

export default {
    props: {
        apiEndpoint: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        itemTitle: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number, Object],
            default: null,
        },
        items: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            selectedItem: this.modelValue,
            dropdownItems: [],
            search: null,
            loading: false,
            pagination: {
                currentPage: 1,
                lastPage: 1,
            },
            hover: false,
            loadedAll: false,
        };
    },
    computed: {
        computedItems() {
            return this.items.length ? this.items : this.dropdownItems;
        },
    },
    mounted() {
        if (this.apiEndpoint) {
            this.fetchData();
        } else if (this.items.length) {
            this.dropdownItems = this.items;
        }
    },
    watch: {
        selectedItem(newValue) {
            this.$emit("update:modelValue", newValue);
        },
    },
    methods: {
        async fetchData(page = 1) {
            if (!this.apiEndpoint || page > this.pagination.lastPage) return;

            this.loading = true;
            try {
                const response = await axios.get(`${this.apiEndpoint}?page=${page}`);
                const {
                    data,
                    meta
                } = response.data.data;

                this.dropdownItems = [...this.dropdownItems, ...data];
                this.pagination.currentPage = meta.current_page;
                this.pagination.lastPage = meta.last_page;
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                this.loading = false;
            }
        },

        async loadAllItems() {
            if (!this.apiEndpoint) return;

            this.loading = true;
            let page = this.pagination.currentPage;

            try {
                while (page <= this.pagination.lastPage) {
                    const response = await axios.get(`${this.apiEndpoint}?page=${page}`);
                    const {
                        data
                    } = response.data.data;
                    this.dropdownItems = [...this.dropdownItems, ...data];
                    page++;
                }
                this.loadedAll = true;
            } catch (error) {
                console.error("Error fetching all items:", error);
            } finally {
                this.loading = false;
            }
        },

        onSearch() {
            if (this.pagination.currentPage < this.pagination.lastPage && !this.loading && this.apiEndpoint) {
                this.fetchData(this.pagination.currentPage + 1);
            }
        },
    },
};
</script>

<style scoped>
.v-icon.left {
    margin-right: 8px;
}

/* Style for the loading indicator inside the input field */
.loading-indicator {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
	color: #3674B5;
}
</style>
