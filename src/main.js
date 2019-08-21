import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from "axios"
import router from '@/router'

Vue.use(ElementUI)
Vue.config.productionTip = false

Axios.defaults.baseURL = 'http://192.168.1.109:8080/rap'
Vue.prototype.$Axios = Axios


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
