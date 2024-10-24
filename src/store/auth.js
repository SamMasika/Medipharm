import axios from "axios";
import { startSessionTimeout, clearSessionTimeout, startTokenExpirationTimeout } from './session'; // Import session functions

export default {
  namespaced: true,
  state: {
    access_token: null,
    user: null,
    expires_in: null, // Store token expiration time here
  },
  getters: {
    authenticated(state) {
      return state.access_token && state.user;
    },
    user(state) {
      return state.user;
    },
    expiresIn(state) {
      return state.expires_in;
    },
    hasPermission: (state) => (permission) => {
      return state.user && state.user.roles.some(role =>
        role.permissions.some(perm => perm.name === permission)
      );
    },
  },
  mutations: {
    SET_TOKEN(state, access_token) {
      state.access_token = access_token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_EXPIRES_IN(state, expires_in) {
      state.expires_in = expires_in;
    },
  },
  actions: {
    async login({ dispatch, commit }, credentials) {
      try {
        let response = await axios.post("/login", credentials);
        const { token, expires_in, user } = response.data.data; // Extract token, expires_in, and user data

        // Store token, user, and expiration time in Vuex state
        commit("SET_TOKEN", token);
        commit("SET_USER", user);
        commit("SET_EXPIRES_IN", expires_in);

        // Store token, user, and expiration time in local storage
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('expires_in', expires_in);

        // Start session and token expiration timeouts
        startSessionTimeout(); // Start idle timeout
        startTokenExpirationTimeout(expires_in); // Start token expiration timeout using expires_in

        return dispatch("attempt", token); // Attempt with the token
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        return "Network challenge"; // Handle error appropriately
      }
    },

    async attempt({ commit, state }, access_token) {
      if (access_token) {
        commit("SET_TOKEN", access_token);
      }

      if (!state.access_token) {
        return;
      }

      try {
        // You can fetch user data here if necessary
        // let response = await axios.get("/user");
        // const user = response.data;
        // commit("SET_USER", user);
      } catch (error) {
        console.error("Error fetching user information:", error);
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },

    async logout({ commit, state }) {
      localStorage.clear()
      try {
        const token = state.access_token;
        if (!token) {
          throw new Error('No token found');
        }

        // Include the Authorization header with the token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Call the logout endpoint with headers
        await axios.post("/logout", {}, { headers });

        // If successful, clear the state and storage
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
        commit("SET_EXPIRES_IN", null); // Clear the expiration time

        clearSessionTimeout();
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.removeItem('expires_in');
        
        console.log('Logout successful');
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
      }
    },

    initializeStore({ commit }) {
      const token = localStorage.getItem('access_token');
      const user = localStorage.getItem('user');
      const expires_in = localStorage.getItem('expires_in');

      if (token) {
        commit("SET_TOKEN", token);
      } else {
        commit("SET_TOKEN", null);
      }

      if (user) {
        commit("SET_USER", JSON.parse(user));
      } else {
        commit("SET_USER", null);
      }

      if (expires_in) {
        commit("SET_EXPIRES_IN", expires_in);
      } else {
        commit("SET_EXPIRES_IN", null);
      }
    },
  },
};
