import store from "@/store";
import axios from 'axios';
import router from "@/router";

let logoutTimer;
let idleTimer;

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if (mutation.payload) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
        startSessionTimeout();
        startIdleTimeout();
      } else {
        axios.defaults.headers.common['Authorization'] = null;
        clearTimers();
      }
      break;
  }
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

function startSessionTimeout() {
  clearSessionTimeout(); // Clear any existing session timeout
  const expirationTime = localStorage.getItem("token_expiration");
  if (expirationTime) {
    const remainingTime = expirationTime - new Date().getTime();
    if (remainingTime > 0) {
      logoutTimer = setTimeout(() => {
        logout();
      }, remainingTime);
    } else {
      logout(); // Token is already expired, log out immediately
    }
  }
}

function startIdleTimeout() {
  clearIdleTimeout(); // Clear any existing idle timeout
  idleTimer = setTimeout(() => {
    logout();
  }, 5 * 60 * 1000); // Idle timeout set to 10 minutes
}

function clearSessionTimeout() {
  clearTimeout(logoutTimer);
}

function clearIdleTimeout() {
  clearTimeout(idleTimer);
}

function resetIdleTimeout() {
  clearIdleTimeout();
  startIdleTimeout();
}

function clearTimers() {
  clearSessionTimeout();
  clearIdleTimeout();
}

function logout() {
  store.commit('auth/SET_TOKEN', null);
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_expiration');
  localStorage.removeItem('user');
  clearTimers();
  router.push('/'); // Redirect to login page
}

function resetIdleTimeoutOnActivity() {
  ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'].forEach((event) => {
    document.addEventListener(event, resetIdleTimeout, { passive: true });
  });
}

// Initialize idle timeout tracking on user activity
resetIdleTimeoutOnActivity();
