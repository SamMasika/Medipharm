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
              Snapchat Contents
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
              <v-row class="pagination-row mx-8">
                  <v-col cols="12" sm="4">
                      <p class="items-range text-blue font-weight-bold">
                          <!-- Showing {{ startIndex }} - {{ endIndex }} out of 1000  -->
                          Showing 100 - 200 out of 1000
                      </p>
                  </v-col>
                  <v-col cols="12" sm="4" class="text-right">
                      <v-pagination v-model="page" :length="4" rounded="circle" active-class="blue--text" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
                  </v-col>
                  <v-col cols="12" sm="1">
                      <v-select v-model="itemsPerPage" :items="itemsPerPageOptions" rounded="lg" label="Items per page" density="compact" variant="solo-filled" single-line flat hide-details color="blue"></v-select>
                  </v-col>
              </v-row>
              <!-- <div class="text-center">
                  <v-pagination v-model="page" :length="4" rounded="circle" active-class="blue--text" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
  
                  <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" icon>
                              <v-icon>mdi-menu-down</v-icon>
                          </v-btn>
                      </template>
  
                      <v-list>
                          <v-list-item-group v-model="itemsPerPage" active-class="blue--text">
                              <v-list-item v-for="option in itemsPerPageOptions" :key="option" @click="updateItemsPerPage(option)">
                                  <v-list-item-content>{{ option }}</v-list-item-content>
                              </v-list-item>
                          </v-list-item-group>
                      </v-list>
                  </v-menu>
              </div> -->
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
              itemsPerPageOptions: [5, 10, 20, 50],
              pageCount: 0,
              search: '',
              scatOptions: [{
                      text: 'Keyword',
                      value: 'Keyword'
                  },
                  {
                      text: 'Hashtag',
                      value: 'Hashtag'
                  },
                  {
                      text: 'Schedules',
                      value: 'Schedules'
                  },
              ],
              headers: [{
                      title: 'ID#',
                      align: 'start',
                      key: 'name',
                      sortable: false,
                      removable: false,
                      visible: true,
                  },
                  {
                      title: 'Username',
                      key: 'calories',
                      removable: true,
                      visible: true,
                  },
                  {
                      title: 'Image/Video ',
                      key: 'fat',
                      removable: true,
                      visible: true,
                  },
                  {
                      title: 'Content ',
                      key: 'carbs',
                      removable: true,
                      visible: true,
                  },
                  {
                      title: 'Posted Date ',
                      key: 'protein',
                      removable: true,
                      visible: true,
                  },
              ],
              desserts: [{
                      name: 'Frozen Yogurt',
                      calories: 159,
                      fat: 6.0,
                      carbs: 24,
                      protein: 4.0,
                      iron: 1,
                  },
                  {
                      name: 'Ice cream sandwich',
                      calories: 237,
                      fat: 9.0,
                      carbs: 37,
                      protein: 4.3,
                      iron: 1,
                  },
                  {
                      name: 'Eclair',
                      calories: 262,
                      fat: 16.0,
                      carbs: 23,
                      protein: 6.0,
                      iron: 7,
                  },
                  {
                      name: 'Cupcake',
                      calories: 305,
                      fat: 3.7,
                      carbs: 67,
                      protein: 4.3,
                      iron: 8,
                  },
                  {
                      name: 'Gingerbread',
                      calories: 356,
                      fat: 16.0,
                      carbs: 49,
                      protein: 3.9,
                      iron: 16,
                  },
                  {
                      name: 'Jelly bean',
                      calories: 375,
                      fat: 0.0,
                      carbs: 94,
                      protein: 0.0,
                      iron: 0,
                  },
                  {
                      name: 'Lollipop',
                      calories: 392,
                      fat: 0.2,
                      carbs: 98,
                      protein: 0,
                      iron: 2,
                  },
                  {
                      name: 'Honeycomb',
                      calories: 408,
                      fat: 3.2,
                      carbs: 87,
                      protein: 6.5,
                      iron: 45,
                  },
                  {
                      name: 'Donut',
                      calories: 452,
                      fat: 25.0,
                      carbs: 51,
                      protein: 4.9,
                      iron: 22,
                  },
                  {
                      name: 'KitKat',
                      calories: 518,
                      fat: 26.0,
                      carbs: 65,
                      protein: 7,
                      iron: 6,
                  },
              ],
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
  