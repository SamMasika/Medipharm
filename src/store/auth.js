import axios from "axios";

export default {
  namespaced: true,
  state: {
    access_token: null,
    user: null,
  },
  getters: {
    authenticated(state) {
      return !!state.access_token && !!state.user;
    },
    user(state) {
      return state.user;
    },
    userName(state) {
      return state.user ? state.user.name : null;
    },
    hasPermission: (state) => (permission) => {
      return state.user?.roles?.some(role =>
        role.permissions.some(p => p.name === permission)
      );
    }
  },
  mutations: {
    SET_TOKEN(state, access_token) {
      state.access_token = access_token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_EXPIRE(state, expires_in) {
      state.expires_in = expires_in;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        let response = await axios.post("/login", credentials);
        const { token, user, expires_in } = response.data.data;

        // Calculate expiration timestamp and store it
        const expirationTime = new Date().getTime() + expires_in * 1000;
        console.log(expirationTime)

        // Save token, user data, and expiration time
        commit("SET_TOKEN", token);
        commit("SET_USER", user);
        commit("SET_EXPIRE", expires_in);
        localStorage.setItem("access_token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token_expiration", expirationTime); // store expiration time

        // Set axios default Authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    attempt({ commit }) {
      const token = localStorage.getItem("access_token");
      const user = localStorage.getItem("user");
      const expirationTime = localStorage.getItem("token_expiration");

      if (token && user && expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime < expirationTime) {
          // Token is valid; proceed with setting state
          commit("SET_TOKEN", token);
          commit("SET_USER", JSON.parse(user));
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          // Token expired; remove it and redirect to login
          commit("SET_TOKEN", null);
          commit("SET_USER", null);
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          localStorage.removeItem("token_expiration");
        }
      }
    },
    logout({ commit }) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      localStorage.removeItem("token_expiration");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
};
