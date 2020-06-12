import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../plugins/axios";

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
        localStorage.setItem("token", user.token);
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
    async updateUser({ commit }) {
      const res = await axios.get("user/getuserinfo");
      if (res.data.code === 200) {
        commit("userStatus", res.data.user);
      } else {
        console.log("update userinfo fail!");
      }
    },
  },
  modules: {
  }
})
