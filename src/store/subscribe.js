import store from "@/store";
import axios from "axios";
import router from "@/router"; // Assuming you have a Vue Router instance

const SESSION_TIMEOUT = 120 * 60 * 1000; // 120 minutes in milliseconds
const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

let logoutTimer;
let idleTimer;

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'auth/SET_TOKEN':
      if (mutation.payload) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
        localStorage.setItem('access_token', mutation.payload);
        startSessionTimeout(); // Start the session timeout when the token is set
      } else {
        axios.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('access_token');
        clearTimers(); // Clear both session and idle timers when the token is cleared
      }
      break;
    // Handle other mutations if needed
    // case ...
  }
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

function startSessionTimeout() {
  logoutTimer = setTimeout(() => {
    logout();
  }, SESSION_TIMEOUT);
}

function clearSessionTimeout() {
  clearTimeout(logoutTimer);
}

function startIdleTimeout() {
  idleTimer = setTimeout(() => {
    logout();
  }, IDLE_TIMEOUT);
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
  clearTimers();
  // Perform any additional logout actions, such as redirecting to the login page
  router.push('/'); // Redirect the user to the login page
}

// Bind event listeners to reset idle timer on user activity
function resetIdleTimeoutOnActivity() {
  const resetIdleTimeoutHandler = () => {
    resetIdleTimeout();
  };
  ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'].forEach((event) => {
    document.addEventListener(event, resetIdleTimeoutHandler, { passive: true });
  });
}

// Call the function to start/reset the session and idle timeouts
startSessionTimeout();
resetIdleTimeoutOnActivity();
