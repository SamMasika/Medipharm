<template>
  <v-container class="help-page" fluid>
    <!-- Title Section -->
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="title animate__animated animate__fadeInDown">
          📦 Product Management Support
        </h1>
        <p class="subtitle animate__animated animate__fadeInUp animate__delay-1s">
          Master how to manage, categorize, and organize your products 🧮.
        </p>
      </v-col>
    </v-row>

    <!-- Steps Timeline -->
    <v-row class="mt-6 my-5" justify="center">
      <v-col cols="12" md="8">
        <v-timeline align-top dense>
          <v-timeline-item
            v-for="(step, i) in productSteps"
            :key="i"
            :color="step.color"
            small
          >
            <v-card class="pa-4 step-card">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <!-- Highlighted Tip -->
        <v-alert
          type="success"
          class="mt-6 tip-alert"
          border="start"
          colored-border
          elevation="0"
        >
          💡 <strong>Tip:</strong> Use <strong>categories</strong> and <strong>tags</strong> to keep your inventory organized for easier search and filtering 🗂️.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      productSteps: [
        {
          title: "📋 Open Product Dashboard",
          description: "Navigate to 'Products' in the sidebar to view and manage items 📦.",
          color: "blue"
        },
        {
          title: "➕ Add a New Product",
          description: "Click 'Add Product' and input all relevant data such as name, SKU, price, and category 🧾.",
          color: "green"
        },
        {
          title: "✏️ Edit Product Details",
          description: "Use the edit icon to update product descriptions, pricing, or stock availability 🧮.",
          color: "orange"
        },
        {
          title: "📂 Manage Categories",
          description: "Organize your products into categories for easier filtering and analytics 🧠.",
          color: "purple"
        },
        {
          title: "🏢 Track Inventory",
          description: "Ensure stock levels are always updated. Enable low-stock alerts if available 🚨.",
          color: "red"
        }
      ]
    };
  }
};
</script>

<style scoped>
.help-page {
  padding: 40px 20px;
}

.step-card {
  background: linear-gradient(to right, #ffffff, #f1f5f8);
  border-left: 4px solid #2196f3;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.step-title {
  font-size: 18px;
  font-weight: 600;
  color: #37474f;
  margin-bottom: 8px;
}

.step-desc {
  font-size: 14px;
  color: #616161;
}

.tip-alert {
  background-color: #e8f5e9;
  border-left: 5px solid #43a047;
  color: #1b5e20;
  font-weight: 500;
}
</style>
