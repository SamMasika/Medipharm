<template>
  <v-app-bar app scroll-behavior="elevate" height="100" color="darkblue">
    <v-container>
      <v-row align="center" no-gutters>
        <!-- Logo -->
        <v-col cols="6" md="2" class="d-flex align-center">
          <v-img
            src="@/assets/stailika.png"
            alt="Stailika Logo"
            contain
            max-width="150"
            class="mr-3"
          ></v-img>
        </v-col>

        <!-- Desktop Navigation Links -->
        <v-col class="d-none d-md-flex justify-end nav-links-container">
          <a
            v-for="(link, i) in navLinks"
            :key="i"
            :href="link.route"
            @click.prevent="navigate(link.route)"
            class="nav-link"
            :class="{ 'selected-link': isSelected(link.route) }"
          >
            {{ link.text }}
          </a>
        </v-col>

        <!-- Mobile Menu Toggle -->
        <v-col cols="6" class="d-flex d-md-none justify-end">
          <v-btn icon @click="drawer = !drawer">
            <v-icon color="white">{{ drawer ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Mobile Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    class="bg-darkblue"
  >
    <v-list>
      <v-list-item
        v-for="(link, i) in navLinks"
        :key="i"
        @click="navigate(link.route); drawer = false"
        :class="{ 'selected-link': isSelected(link.route) }"
      >
        <v-list-item-title>{{ link.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      navLinks: [
        { text: "Home", route: "/" },
        { text: "Book an Appointment", route: "/book-appointment" },
        { text: "Pricing", route: "/pricing" },
        { text: "Contact", route: "/contact" },
      ],
    };
  },
  methods: {
    navigate(route) {
      this.$router.push(route).catch(() => {});
    },
    isSelected(route) {
      if (route === "/") {
        return this.$route.path === "/";
      }
      return this.$route.path.startsWith(route);
    },
  },
};
</script>

<style scoped>
.nav-links-container {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 8px 0;
}

.nav-link:hover {
  color: #d32f2f;
}

.selected-link {
  color: #d32f2f !important; /* Highlight for desktop links */
  font-weight: bold;
}

/* Highlight drawer items */
.v-navigation-drawer .v-list-item.selected-link {
  background-color: rgba(211, 47, 47, 0.2); /* light red background */
  color: #d32f2f !important;
  font-weight: bold;
}
.v-navigation-drawer .v-list-item.selected-link .v-list-item-title {
  color: #d32f2f !important;
}
</style>
