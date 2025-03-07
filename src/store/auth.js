import axios from "axios";

export default {
 
  namespaced: true,
  state: {
    access_token: null,
    user: {
      permissions: [],
      roles: [], // Include roles in the user object
    },
  },
  getters: {
    authenticated(state) {
      return state.access_token && state.user;
    },
    user(state) {
      return state.user;
    },
    hasPermission: (state) => (permission) => {
      return state.user.permissions.includes(permission);
    },
    hasRole: (state) => (role) => {
      return state.user.roles.includes(role);
    }
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
    async login({ dispatch, commit }, credentials) {
      try {
        let response = await axios.post("/login", credentials);
        const { access_token } = response.data;
        commit("SET_TOKEN", access_token);
        return dispatch("attempt", access_token);
      } catch (error) {
        // Handle error
        return error.response.data.message;
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
        let response = await axios.get("/user");
        const { name, username, email, phone, permissions, roles } = response.data.data;
        const user = { name, username, email, phone, permissions, roles };
        commit("SET_USER", user);
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },
    logout({ commit }) {
      return axios.get("/logout").then(() => {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      });
    },
  },
};