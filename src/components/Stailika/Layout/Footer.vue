<template>
  <!-- Footer -->
  <v-footer height="auto" color="#020B2C" class="py-8 text-white">
    <v-container>
      <v-row>

        <!-- About / Brand -->
        <v-col cols="12" md="3" class="mb-4 mb-md-0">
          <h4 class="footer-title">Stailika</h4>
          <p>Tailored to fit. Designed to stand out.</p>
        </v-col>

        <!-- Contact Info -->
        <v-col cols="12" md="3" class="mb-4 mb-md-0">
          <h4 class="footer-title">Contact</h4>
          <p>Email: <a :href="`mailto:${form.email}`" class="footer-link">{{ form.email }}</a></p>
          <p>Phone: <a :href="`https://wa.me/${form.phone}`" target="_blank" class="footer-link">+255{{ form.phone }}</a></p>
          <p>Location: {{ form.location }}</p>
          <p>City: {{ form.city }}</p>
        </v-col>

        <!-- Working Days -->
        <v-col cols="12" md="3" class="mb-4 mb-md-0">
          <h4 class="footer-title">Working Days</h4>
          <ul class="footer-list">
            <li>Monday – Saturday: Open</li>
            <li>Monday – Saturday: Services by appointment</li>
            <li>Sunday: Closed</li>
          </ul>
        </v-col>

        <!-- Social Links -->
        <v-col cols="12" md="3">
          <h4 class="footer-title">Follow Us</h4>
          <v-btn icon color="red" :href="'https://www.facebook.com/yourpage'" target="_blank">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon color="red" :href="`https://wa.me/${form.phone}`" target="_blank">
            <v-icon>mdi-whatsapp</v-icon>
          </v-btn>
          <v-btn icon color="red" :href="`mailto:${form.email}`">
            <v-icon>mdi-email</v-icon>
          </v-btn>
          <v-btn icon color="red" :href="'https://www.instagram.com/yourprofile'" target="_blank">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn icon color="red" :href="'https://twitter.com/yourhandle'" target="_blank">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
        </v-col>

      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        email: '',
        phone: '',
        location: '',
        city: ''
      },
    };
  },
  mounted() {
    this.loadAddress();
  },
  methods: {
    loadAddress() {
      axios
        .get("/company-address", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          },
        })
        .then(response => {
          if (response.data && response.data.data) {
            this.form = { ...response.data.data };
          }
        })
        .catch(() => {
          this.$toast.error("Failed to load company address.");
        });
    },
  },
};
</script>

<style scoped>
.footer-title {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #D32F2F;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list li {
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.footer-link {
  color: #ffffff;
  text-decoration: none;
}

.footer-link:hover {
  color: #D32F2F;
}
</style>
