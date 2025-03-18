<template>
  <v-container class="help-center" fluid>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-bold text-primary mt-3 animate__animated animate__fadeInDown">Welcome to the Help Center</h1>
        <p class="text-subtitle-1 text-grey-darken-1 animate__animated animate__fadeInUp animate__delay-1s">
          Find answers to your questions, explore guides, and get the support you need.
        </p>
      </v-col>
    </v-row>

    <v-row class="mt-5" justify="center">
      <v-col cols="12" sm="6" md="4" v-for="(item, index) in helpTopics" :key="index">
        <v-card class="help-card animate__animated animate__zoomIn animate__delay-{{ index * 0.2 }}s">
          <v-card-title class="d-flex align-center">
            <v-avatar size="50" class="mr-3" :color="item.color" dark>
              <v-icon size="28">{{ item.icon }}</v-icon>
            </v-avatar>
            <span class="text-h6 font-weight-bold">{{ item.title }}</span>
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 text-grey-darken-1">{{ item.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="item.link" color="primary" class="text-weight-bold " elevation="0">
              Learn More
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-divider class="my-8"></v-divider> -->

    <v-row justify="center" class="text-center animate__animated animate__fadeInUp animate__delay-1s my-5">
      <v-col cols="12" md="6">
        <h2 class="text-h5 font-weight-bold">Need More Help?</h2>
        <p class="text-body-2 text-grey-darken-1">
          If you need further assistance, feel free to contact our support team.
        </p>
        <v-btn class="contact-support-btn" to="/contact-support">
          <v-icon left>mdi-headset</v-icon> Contact Support
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      helpTopics: [
        { title: "Getting Started", description: "Learn how to set up your inventory system quickly.", link: "/help/getting-started", icon: "mdi-play-circle-outline", color: "blue" },
        { title: "Managing Products", description: "Add, edit, and manage your products efficiently.", link: "/help/managing-products", icon: "mdi-package-variant", color: "green" },
        { title: "Processing Sales", description: "Guide on handling transactions and sales reports.", link: "/help/processing-sales", icon: "mdi-cash-register", color: "red" },
        { title: "Stock Management", description: "Monitor and control your stock levels with ease.", link: "/help/stock-management", icon: "mdi-warehouse", color: "purple" },
        { title: "User Accounts", description: "Learn how to manage user roles and permissions.", link: "/help/user-accounts", icon: "mdi-account-cog", color: "orange" },
        { title: "Frequently Asked Questions", description: "Find quick answers to common questions.", link: "/help/faq", icon: "mdi-help-circle-outline", color: "teal" },
      ],
    };
  },
};
</script>

<style scoped>


.help-center {
  padding: 40px 20px;
}

.help-card {
  /* border-radius: px; */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  /* background: linear-gradient(145deg, #ffffff, #f0f0f0); */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.help-card:hover {
  transform: scale(1.06);
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.25);
}

.contact-support-btn {
  background: linear-gradient(to right, #ff6b6b, #ff8e53);
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 25px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 15px rgba(255, 107, 107, 0.5);
}

.contact-support-btn:hover {
  background: linear-gradient(to right, #ff8e53, #ff6b6b);
  transform: scale(1.1);
  box-shadow: 0px 6px 20px rgba(255, 107, 107, 0.7);
}
</style>
