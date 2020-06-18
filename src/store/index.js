import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      currentUser: null,
      isLogin: false
    },
  },
  mutations: {
    userStatus(state, user) {
      if (user) {
        state.user.currentUser = user;
        state.user.isLogin = true;
      } else if (user === null) {
        state.user.currentUser = null;
        state.user.isLogin = false;
      }
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("userStatus", user);
    },
  },
  modules: {
  }
})
