import axios from "axios";

export default {
  namespaced: true,
  state: {
    access_token: null,
    user: {
      permissions: [],
      roles: [],
      company:null
    },
  },
  getters: {
    authenticated(state) {
      return state.access_token && state.user;
    },
    user(state) {
      return state.user;
    },
    stores(state) {
      // Safely access stores in case company or stores is null
      return state.user.company ? state.user.company.stores : [];
    },
    hasPermission: (state) => (permission) => {
      return state.user.permissions.includes(permission);
    },
    hasRole: (state) => (role) => {
      return state.user.roles.includes(role);
    },
  },
  mutations: {
    SET_TOKEN(state, access_token) {
      state.access_token = access_token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    // Login action (existing)
    async login({ dispatch, commit }, credentials) {
      try {
        let response = await axios.post("/login", credentials);
        const { access_token } = response.data;
        commit("SET_TOKEN", access_token);
        return dispatch("attempt", access_token);
      } catch (error) {
        return error.response.data.message;
      }
    },

    // Attempt to authenticate and set user data (existing)
    async attempt({ commit, state }, access_token) {
      if (access_token) {
        commit("SET_TOKEN", access_token);
      }
      if (!state.access_token) {
        return;
      }
      try {
        let response = await axios.get("/user");
        const { name, username, email, phone, permissions, roles, company, loginCount, lastLogin } = response.data.data;
        const user = { name, username, email, phone, permissions, roles, company, loginCount, lastLogin };
        commit("SET_USER", user);
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },

    // OTP verification action
    async verifyOtp({ commit, dispatch }, { otp, user_id }) {
      if (!otp || !user_id) {
        throw new Error("OTP and User ID are required.");
      }
      try {
        const response = await axios.post("/verify-otp", { otp, user_id });
        if (response.data.success) {
          // Destructure the access_token directly from the response
          const { access_token } = response.data;
          // Store the access token in Vuex state
          commit("SET_TOKEN", access_token);
          // Fetch user data with the newly acquired token
          await dispatch("attempt", access_token);  // Pass the access token for user data fetch
          return access_token;
        } else {
          throw new Error(response.data.message || "Invalid OTP");
        }
      } catch (error) {
        throw new Error(error.response?.data?.message || "OTP Verification Failed");
      }
    },
    // Logout action (existing)
    logout({ commit }) {
      return axios.get("/logout").then(() => {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      });
    },
  },
};
