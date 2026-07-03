<template>
  <app-bar></app-bar>

  <v-container class="py-12">
    <h1
      class="text-center mb-12"
      :style="{ color: darkBlue, fontWeight: '800', fontSize: '2.5rem' }"
    >
      Book Your Appointment
    </h1>

    <v-row justify="center" align="stretch" class="card-row">
      <!-- Show both cards if no appointment selected -->
      <template v-if="!selectedAppointment">
        <v-col cols="12" md="5">
          <v-card class="appointment-card" elevation="6">
            <div class="image-container">
              <v-img src="@/assets/appointments/custom.webp" height="280" cover>
                <div class="image-overlay"></div>
              </v-img>
            </div>
            <v-card-title class="title-text">Custom Appointment</v-card-title>
            <v-card-text class="description-text">
              Tailored sessions focusing on your unique style and preferences.
              From bespoke suits to personalized fittings, we’ll bring your vision
              to life with expert craftsmanship.
            </v-card-text>
            <v-card-actions>
              <v-btn class="book-btn" @click="selectAppointment('Custom Appointment')">
                Book Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="5">
          <v-card class="appointment-card" elevation="6">
            <div class="image-container">
              <v-img src="@/assets/appointments/consult.webp" height="280" cover>
                <div class="image-overlay"></div>
              </v-img>
            </div>
            <v-card-title class="title-text">Consultation</v-card-title>
            <v-card-text class="description-text">
              Not sure about the style or fabric? Sit down with our experts to
              discuss your ideas, explore options, and receive personalized advice
              before you make a decision.
            </v-card-text>
            <v-card-actions>
              <v-btn class="book-btn" @click="selectAppointment('Consultation')">
                Book Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>

      <!-- If appointment selected, show selection and date/time picker -->
      <v-col v-else cols="12" md="5" style="order: 1;">
        <v-card class="appointment-card" elevation="6">
          <div class="image-container">
            <v-img :src="getImage(selectedAppointment)" height="280" cover>
              <div class="image-overlay"></div>
            </v-img>
          </div>
          <v-card-title class="title-text">{{ selectedAppointment }}</v-card-title>
          <v-card-text class="description-text">
            {{ getDescription(selectedAppointment) }}
          </v-card-text>
          <v-card-actions>
            <v-btn class="book-btn" @click="clearSelection()">
              Change Selection
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col v-if="selectedAppointment" cols="12" md="7" style="order: 2;">
        <v-card class="appointment-card" elevation="6" style="padding: 24px;">
          <h3 class="mb-4" :style="{ color: darkBlue }">Select Date & Time</h3>

          <!-- Date Picker -->
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            location="bottom start"
          >
            <template #activator="{ props }">
              <v-text-field
                v-model="selectedDateFormatted"
                label="Pick a date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="props"
                density="comfortable"
                variant="outlined"
              />
            </template>

            <v-card>
              <v-date-picker
                v-model="selectedDate"
                :min="minDate"
                @update:modelValue="menu = false"
              />
            </v-card>
          </v-menu>

          <!-- Time Slots -->
          <div class="mt-6">
            <div class="mb-2" :style="{ color: darkBlue, fontWeight: '600' }">
              Available Time Slots:
            </div>
            <v-chip-group
              v-model="selectedTime"
              mandatory
              column
              class="time-slot-group"
            >
              <v-chip
                v-for="slot in filteredTimeSlots"
                :key="slot"
                :value="slot"
                class="ma-2"
                :variant="selectedTime === slot ? 'elevated' : 'outlined'"
                :color="selectedTime === slot ? '#A82228' : ''"
                :text-color="selectedTime === slot ? 'white' : ''"
              >
                <v-icon
                  v-if="selectedTime === slot"
                  start
                  icon="mdi-checkbox-marked-circle"
                />
                {{ slot }}
              </v-chip>
            </v-chip-group>
          </div>

          <v-btn
            :disabled="!selectedDate || !selectedTime"
            class="book-btn mt-8"
            @click="proceedToBooking"
          >
            Continue
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <Footer></Footer>
</template>

<script>

import appBar from "../Layout/appBar.vue";
import Footer from "../Layout/Footer.vue";
import swtalert from "@/mixins/swtalert";

export default {
  components: { appBar, Footer },
  mixins: [swtalert],
  data() {
    return {
      darkBlue: "#020B2C",
      selectedAppointment: null,
      selectedDate: null,
      selectedTime: null,
      menu: false,
      allTimeSlots: this.generateTimeSlots("09:00", "19:00"), // full range
    };
  },
  computed: {
    minDate() {
      return new Date().toISOString().substr(0, 10);
    },
    selectedDateFormatted() {
      if (!this.selectedDate) return "";
      return new Date(this.selectedDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    filteredTimeSlots() {
      if (!this.selectedDate) return [];

      const today = new Date();
      const selected = new Date(this.selectedDate);

      // If selected date is today → filter out past times
      if (
        selected.getFullYear() === today.getFullYear() &&
        selected.getMonth() === today.getMonth() &&
        selected.getDate() === today.getDate()
      ) {
        const currentHour = today.getHours();
        return this.allTimeSlots.filter((slot) => {
          const hour = this.parseHour(slot);
          return hour > currentHour;
        });
      }

      // Future date → show all slots
      return this.allTimeSlots;
    },
  },
  methods: {
    selectAppointment(type) {
      this.selectedAppointment = type;
      this.selectedDate = null;
      this.selectedTime = null;
    },
    clearSelection() {
      this.selectedAppointment = null;
      this.selectedDate = null;
      this.selectedTime = null;
    },
    getImage(type) {
      if (type === "Custom Appointment")
        return require("@/assets/appointments/custom.webp");
      if (type === "Consultation")
        return require("@/assets/appointments/consult.webp");
      return "";
    },
    getDescription(type) {
      if (type === "Custom Appointment")
        return "Tailored sessions focusing on your unique style and preferences. From bespoke suits to personalized fittings, we’ll bring your vision to life with expert craftsmanship.";
      if (type === "Consultation")
        return "Not sure about the style or fabric? Sit down with our experts to discuss your ideas, explore options, and receive personalized advice before you make a decision.";
      return "";
    },
    proceedToBooking() {
      if (!this.selectedAppointment || !this.selectedDate || !this.selectedTime) return;

      const dateObj = new Date(this.selectedDate);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      this.$router.push({
        name: "BookingForm",
        params: {
          appointmentType: this.selectedAppointment,
          date: formattedDate,
          time: this.selectedTime,
        },
      });
    },
    generateTimeSlots(start, end) {
      const slots = [];
      const startHour = parseInt(start.split(":")[0]);
      const endHour = parseInt(end.split(":")[0]);

      for (let hour = startHour; hour <= endHour; hour++) {
        const ampm = hour < 12 ? "AM" : "PM";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        slots.push(`${displayHour}:00 ${ampm}`);
      }
      return slots;
    },
    parseHour(slot) {
      const [time, period] = slot.split(" ");
      let [hour] = time.split(":").map(Number);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;
      return hour;
    },
  },
};
</script>

<style scoped>
/* same styles as yours */
.appointment-card {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.appointment-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 28px rgba(0, 0, 0, 0.25);
}

.image-container {
  position: relative;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.3)
  );
}

.title-text {
  font-size: 1.4rem;
  font-weight: 700;
  color: #020b2c;
  padding: 20px 20px 10px;
}

.description-text {
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  padding: 0 20px 20px;
  flex-grow: 1;
}

.book-btn {
  background-color: #a82228 !important;
  color: white !important;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 30px;
  padding: 12px 28px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.book-btn:hover {
  background-color: #8a1d21 !important;
}

.time-slot-group {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
