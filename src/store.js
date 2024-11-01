import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
    username: '',
    authToken: null,
    refreshToken: null,
    branchId: null,
    roles: [],
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.username = payload.username;
      state.authToken = payload.authToken;
      state.refreshToken = payload.refreshToken;
      state.branchId = payload.branchId;
      state.roles = payload.roles;
    },
    clearUser(state) {
      state.userId = null;
      state.username = '';
      state.authToken = null;
      state.refreshToken = null;
      state.branchId = null;
      state.roles = [];
    }
  },
  actions: {
    login({ commit }, userData) {
      try {
        const { access_token, refresh_token, user } = userData;
    
        if (!user) {
          throw new Error("User information is missing in the response.");
        }
    
        // Extracting required details from the API response
        const { id, username, branch, role } = user;
    
        const userPayload = {
          userId: id,
          username: username,
          authToken: access_token,
          refreshToken: refresh_token,
          branchId: branch ? branch.id : null,
          roles: role ? [role.name] : [] // Extract role name as array if it exists
        };
    
        // Commit user data to Vuex
        commit('setUser', userPayload);
    
        // Store user details and tokens in localStorage without expiration
        localStorage.setItem('loggedInUser', JSON.stringify(userPayload));
        localStorage.setItem('authToken', access_token);
    
        console.log("User payload to store:", userPayload);
      } catch (error) {
        console.error("Login failed:", error.message);
      }
    },
    
    logout({ commit }) {
      commit('clearUser');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('authToken');
    },
    loadUserFromStorage({ commit }) {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      const authToken = localStorage.getItem('authToken');

      // Ensure user is loaded from localStorage, if it exists
      if (loggedInUser && authToken) {
        commit('setUser', loggedInUser);
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.authToken,
    getUserId: (state) => state.userId,
    getUsername: (state) => state.username,
    getBranchId: (state) => state.branchId,
    getUserRoles: (state) => state.roles,
  },
});
