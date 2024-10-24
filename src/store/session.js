import router from '@/router'; // Adjust the path as necessary
import store from '@/store'; // Import your Vuex store

let idleTimeout; // Idle timeout variable
let tokenTimeout; // Token expiration timeout variable

// Reset idle timer on user activity
function resetIdleTimer() {
  if (store.getters['auth/authenticated']) { // Only reset timer if user is logged in
    clearSessionTimeout(); // Clear previous idle timeout
    startSessionTimeout(); // Restart the idle timeout
  }
}
// Start session timeout based on idle activity
export function startSessionTimeout(idleLimit = 5 * 60 * 1000) { // 5 minutes default for idle
  clearSessionTimeout(); // Clear any existing idle timeout
  idleTimeout = setTimeout(() => {
    if (store.getters['auth/authenticated']) { // Check if the user is still logged in
      handleIdleTimeout();
    }
  }, idleLimit); // Set the idle timeout
}
// Handle idle timeout
function handleIdleTimeout() {
  store.dispatch('auth/logout').then(() => {
    router.push('/login'); // Automatically redirect to login page
  });
}

export function startTokenExpirationTimeout(expires_in) {
  clearTokenTimeout(); // Clear any existing token expiration timeout
  if (expires_in) {
    console.log(`Setting token expiration timeout for ${expires_in} seconds`);
    tokenTimeout = setTimeout(() => {
      if (store.getters['auth/authenticated']) { // Check if the user is still logged in
        console.log("Token expired, logging out");
        handleTokenExpiration();
      }
    }, expires_in * 1000); // expires_in is in seconds, so multiply by 1000 for milliseconds
  }
}

// Handle token expiration
function handleTokenExpiration() {
  store.dispatch('auth/logout').then(() => {
    router.push('/login'); // Automatically redirect to login page
  });
}

// Clear session timeout (idle)
export function clearSessionTimeout() {
  clearTimeout(idleTimeout); // Clear existing idle timeout
}

// Clear token expiration timeout
export function clearTokenTimeout() {
  clearTimeout(tokenTimeout); // Clear existing token expiration timeout
}

// Clear both session and token timeouts on logout
export function clearAllTimeouts() {
  clearSessionTimeout();
  clearTokenTimeout();
}

// Set up activity listeners for user interactions (to reset idle timer)
function setupActivityListeners() {
  window.addEventListener('mousemove', resetIdleTimer);
  window.addEventListener('keypress', resetIdleTimer);
  window.addEventListener('click', resetIdleTimer);
}

// Initialize activity listeners when the app starts
setupActivityListeners();
