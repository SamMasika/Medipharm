<template>
  <v-card class="pa-10 mx-auto otp-card" elevation="12" max-width="400" width="100%">
    <h3 class="text-h6 mb-4 text-center">Verify Your Account</h3>

    <div class="text-body-2 text-center">
      We sent a verification code to <strong>{{ email }}</strong> <br>
      Please check your email and enter the code below.
    </div>

    <v-sheet color="surface">
      <v-otp-input v-model="otp" type="password" variant="solo"></v-otp-input>
    </v-sheet>

    <v-btn class="my-4 verify-btn" height="40" text="Verify" variant="flat" block @click="verifyOtp"></v-btn>

    <div class="text-caption text-center">
      <span v-if="timer > 0" class="countdown-text">Resend OTP in {{ formattedTime }}</span>
      <a v-else href="#" @click.prevent="resendOtp" class="color-text">Resend OTP</a>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: this.$route.query.email ? decodeURIComponent(this.$route.query.email) : "",
      otp: "",
      timer: 0, // Default to 0, will be set dynamically
      countdownInterval: null,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },
  },
  methods: {
    verifyOtp() {
      if (!this.otp) {
        this.$swal.fire({
          icon: "error",
          title: "OTP is required",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }
      console.log("Verifying OTP:", this.otp);
    },
    resendOtp() {
      const expiryTime = Date.now() + 120000; // Set expiry 2 minutes from now
      localStorage.setItem("otpExpiryTime", expiryTime);
      this.startCountdown();
      this.$swal.fire({
        icon: "success",
        title: "New OTP has been sent to your email",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    startCountdown() {
      const expiryTime = localStorage.getItem("otpExpiryTime");

      if (!expiryTime || Date.now() > expiryTime) {
        this.timer = 0; // OTP expired
        return;
      }

      this.timer = Math.floor((expiryTime - Date.now()) / 1000);

      this.countdownInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.countdownInterval);
        }
      }, 1000);
    },
  },
  mounted() {
    this.startCountdown();
  },
  beforeUnmount() {
    clearInterval(this.countdownInterval);
  },
};
</script>

<style scoped>
.verify-btn {
  background-color: #3674B5 !important;
  color: white !important;
  font-weight: bold;
}

.color-text {
  color: #3674B5;
  text-decoration: none;
  font-weight: bold;
  margin-left: 5px;
}

.otp-card {
  margin-top: 15%;
}

.countdown-text {
  color: #ff0000;
  font-weight: bold;
}
</style>
