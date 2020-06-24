import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../plugins/axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      currentUser: null,
      isLogin: false,
    },
    classlist: [],
    classlistPagination: {
      index: 1,
      limit: 5
    },
    selectedClasslist: [],
    classNumber: 100
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
    classlistStatus(state, classlist) {
      state.classlist = classlist
    },
    selectedClasslistStatus(state, selectedClasslist) {
      state.selectedClasslist = selectedClasslist;
    },
    classlistPaginationStatus(state, { index, limit }) {
      if (index !== undefined)
        state.classlistPagination.index = index;
      if (limit !== undefined)
        state.classlistPagination.limit = limit;
    },
    classNumberStatus(state, classNumber) {
      state.classNumber = classNumber;
    }
  },
  getters: {
    processedClasslist(state) {
      let s = new Set();
      for (const item of state.selectedClasslist) {
        s.add(item.id);
      }
      return state.classlist.map(item => {
        if (s.has(item.id)) item.status = "selected"
        else item.status = "unselected"
        return item;
      })
    }
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
    async pullClassNumber({ commit }) {
      const res = await axios.get("class/number");
      commit("classNumberStatus", res.data.number);
    },
    async pullClasslist({ commit, state }, conditions, pagination) {
      if (pagination === undefined) pagination = state.classlistPagination;
      const res = await axios.post("class/list", {
        conditions,
        pagination
      })
      if (res.data.code === 200) {
        commit("classlistStatus", res.data.classlist);
        commit("classlistPaginationStatus", pagination);
      } else {
        console.log("pull classlist fail!");
      }
    },
    async pullSelectedClasslist({ commit, state }) {
      const res = await axios.post('class/selected', {
        uid: state.user.currentUser.uid,
        token: state.user.currentUser.token
      })
      if (res.data.code === 200) {
        commit("selectedClasslistStatus", res.data.classlist);
      } else {
        console.log("pull selected classlist fail!");
      }
    },
  },
  modules: {
  }
})
