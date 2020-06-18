import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index";
import Login from '../views/Login.vue'
import Requirement from '../views/Requirement.vue'
import CourseTable from '../views/CourseTable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
  }
]

const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  const isLogin = store.state.user.isLogin;
  /**
  * to:router即将进入的路由对象
    from:当前导航即将离开的路由
    next:Function,进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed；否则为false，终止导航。
  **/
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!isLogin) {
      next("/login");
    } else next();
  } else if (to.path === "/login" && isLogin) {
    next("/");
  } else {
    next();
  }
});

export default router
