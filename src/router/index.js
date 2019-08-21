import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import MenuDetail from '@/manager/MenuDetail.vue'
import Project from '@/manager/Project.vue'
const routes = [
  { path: '/Project', component: Project },
  { path: '/', component: Project },
  { path: '/MenuDetail/:id', component: MenuDetail },
]
export default new Router({ routes })