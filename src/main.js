import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from "axios"
import router from '@/router'

Vue.use(ElementUI)
Vue.config.productionTip = false

// Axios.defaults.baseURL = 'http://localhost:8080/rap'
Axios.defaults.baseURL = 'http://47.95.10.169:8080/rap'
Vue.prototype.$Axios = Axios


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
