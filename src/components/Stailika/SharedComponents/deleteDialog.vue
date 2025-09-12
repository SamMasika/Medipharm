<template>
  <v-dialog v-model="internalVisible" max-width="450">
    <v-card class="rounded-lg elevation-16" style="background-color: #f9f9f9;">
      <!-- Title Section -->
      <v-card-title class="text-h5 font-weight-bold white--text text-center py-2" style="font-family: 'Roboto', sans-serif; font-size: 20px;">
        <v-icon size="90" color="red" class="mr-3">mdi-delete</v-icon>
        Confirm Deletion
      </v-card-title>

      <!-- Content Section -->
      <v-card-text class="text-center py-1" style="font-family: 'Roboto', sans-serif; font-size: 16px; line-height: 1.6;">
        <template v-if="itemToDelete && itemToDelete.filePath">
          <!-- Display the image if it exists -->
          <v-avatar size="100" class="mb-3">
            <img :src="getImageUrl(itemToDelete.filePath)" alt="Item Image" width="100" class="my-3">
          </v-avatar>
        </template>
        <template v-else>
          <!-- Fallback Icon if no image -->
          <v-avatar size="100" class="mb-3">
            <v-icon color="blue-grey" size="100">mdi-account-circle</v-icon>
          </v-avatar>
        </template>

        <div class="font-weight-medium text-body-1 text-center mb-4">
          Are you sure you want to delete <b>"{{ itemToDelete.name }}"</b>?
        </div>
        <div class="font-italic text-subtitle-1" style="color: #777;">
          This action cannot be undone.
        </div>
      </v-card-text>

      <!-- Divider -->
      <v-divider></v-divider>

      <!-- Action Buttons -->
      <v-card-actions class="justify-center py-4">
        <v-btn text class="mr-3" variant="outlined" @click="closeDialog" rounded="xl" color="grey lighten-2" style="font-family: 'Roboto', sans-serif; font-weight: 500;">
          Cancel
        </v-btn>
        <v-btn text variant="tonal" @click="confirmDelete" rounded="xl" color="red" style="font-family: 'Roboto', sans-serif; font-weight: 600;">
          <v-icon left>mdi-delete</v-icon> Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    itemToDelete: Object, // Can be any object with 'name' and 'filePath'
    title: {
      type: String,
      default: 'Confirm Deletion',
    },
    icon: {
      type: String,
      default: 'mdi-delete',
    }
  },
  data() {
    return {
      internalVisible: this.visible
    };
  },
  watch: {
    // Sync the visible prop with internalVisible
    visible(newVal) {
      this.internalVisible = newVal;
    },
    // Emit updated visibility status to the parent
    internalVisible(newVal) {
      this.$emit('update:visible', newVal);
    }
  },
  methods: {
    closeDialog() {
      this.internalVisible = false;
    },
    confirmDelete() {
      this.$emit('confirm-delete', this.itemToDelete);
      this.closeDialog();
    },
    getImageUrl(filePath) {
      // Implement logic to return the full image URL
      return `/images/${filePath}`;
    }
  }
};
</script>
