import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from "axios";
import Router from 'vue-router';

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(Router);

Vue.prototype.$Axios = Axios;
Vue.prototype.BASEURL='http://localhost:8080/rap';

import MenuDetail from './components/MenuDetail.vue'
import Project from './components/Project.vue'
const routes = [
  { path: '/Project', component: Project },
  { path: '/', component: Project },
  { path: '/MenuDetail/:id', component: MenuDetail },

]
const router = new Router({routes})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
