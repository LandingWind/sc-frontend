import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import infiniteScroll from 'vue-infinite-scroll'
import htmlToPdf from './utils/htmlToPdf'

Vue.use(infiniteScroll)
Vue.use(htmlToPdf)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
