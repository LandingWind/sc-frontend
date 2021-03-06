import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index";
import Requirement from '../views/Requirement.vue'
import CourseTable from '../views/CourseTable.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
// import Main from '../views/Main.vue'
import Info from '../views/Info.vue'
import ClassList from '../views/ClassList.vue'
import SetTime from '../views/SetTime.vue'

import axios from "../plugins/axios";
import Auth from '../utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/',
    name: 'main',
    redirect: { name: 'classlist' },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/reqtable',
    name: 'reqtable',
    component: Requirement,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/courseTable',
    name: 'courseTable',
    component: CourseTable,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/info',
    name: 'info',
    component: Info,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/classlist',
    name: 'classlist',
    component: ClassList,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/manage',
    name: 'manage',
    component: SetTime,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  /**
  * to:router即将进入的路由对象
    from:当前导航即将离开的路由
    next:Function,进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed；否则为false，终止导航。
  **/
  const token = localStorage.getItem("token") || null;
  const uid = localStorage.getItem("uid") || null;

  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!Auth.loggedIn(token)) {
      next("/login");
    } else {
      if (!store.state.user.isLogin) {
        axios.post("/user/get/own/info", { uid }).then(res => {
          store.dispatch("setUser", res.data);
          next();
        });
      } else next();
    }
  } else if (to.path === "/login" && Auth.loggedIn(token)) {
    next("/");
  } else {
    next();
  }
});

export default router
