export default createStore({
    state: {
      userId: null,
      username: '',
      authToken: null,
      refreshToken: null,
      branchId: null,
      roles: [], // Add roles to the state
    },
    mutations: {
      setUser(state, payload) {
        state.userId = payload.userId;
        state.username = payload.username;
        state.authToken = payload.authToken;
        state.refreshToken = payload.refreshToken;
        state.branchId = payload.branchId;
        state.roles = payload.roles; // Store roles
      },
      clearUser(state) {
        state.userId = null;
        state.username = '';
        state.authToken = null;
        state.refreshToken = null;
        state.branchId = null;
        state.roles = []; // Clear roles
      }
    },
    actions: {
      login({ commit }, userData) {
        commit('setUser', userData);
        // Save user data in local storage
        localStorage.setItem('userId', userData.userId);
        localStorage.setItem('username', userData.username);
        localStorage.setItem('authToken', userData.authToken);
        localStorage.setItem('tokenExpiration', userData.expiration);
        localStorage.setItem('refreshToken', userData.refreshToken);
        localStorage.setItem('branchId', userData.branchId);
        localStorage.setItem('roles', JSON.stringify(userData.roles)); // Save roles in localStorage
      },
      logout({ commit }) {
        commit('clearUser');
        // Remove user data from local storage
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('branchId');
        localStorage.removeItem('roles'); // Remove roles from localStorage
      },
      loadUserFromStorage({ commit }) {
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        const authToken = localStorage.getItem('authToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const branchId = localStorage.getItem('branchId');
        const roles = JSON.parse(localStorage.getItem('roles')); // Load roles from localStorage
        if (userId && username && authToken && refreshToken && branchId !== null) {
          commit('setUser', { userId, username, authToken, refreshToken, branchId, roles });
        }
      }
    },
    getters: {
      isAuthenticated: (state) => !!state.authToken,
      getUserId: (state) => state.userId,
      getUsername: (state) => state.username,
      getBranchId: (state) => state.branchId,
      getUserRoles: (state) => state.roles, // Getter for user roles
    },
  });
  