import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from "axios";

Vue.use(ElementUI);
Vue.config.productionTip = false
// Vue.use(Axios);

Vue.prototype.$Axios = Axios;
Vue.prototype.BASEURL='http://localhost:8080/rap';

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

new Vue({
  // router,
  render: h => h(App),
}).$mount('#app')
