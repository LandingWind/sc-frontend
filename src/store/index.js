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
        s.add(item.classId);
      }
      console.log("s",s);
      
      return state.classlist.map(item => {
        if (s.has(item.id.toString())) item.status = "selected"
        else item.status = "unselected"
        return item;
      })
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit("userStatus", user);
    },
    async updateUser({ commit, state }) {
      const res = await axios.post("/user/get/own/info", { uid: state.user.currentUser.uid });
      commit("userStatus", res.data.user);
    },
    async pullClassNumber({ commit }) {
      const res = await axios.get("class/number");
      commit("classNumberStatus", res.data.number);
    },
    async pullClasslist({ commit }, conditions) {
      // if (pagination === undefined) pagination = state.classlistPagination;
      const res = await axios.post("/classes/search", {
        ...conditions
      })
      commit("classlistStatus", res.data.classes);
      // commit("classlistPaginationStatus", pagination);
    },
    async pullSelectedClasslist({ commit }) {
      const res = await axios.get('/classes/get_selected/2020/SECOND')
      commit("selectedClasslistStatus", res.data.classes);
    },
  },
  modules: {
  }
})
