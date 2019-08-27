import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import MenuDetail from '@/manager/MenuDetail.vue'
import UserDetail from '@/user/index.vue'
import Project from '@/manager/Project.vue'
const routes = [
  { path: '/Project', component: Project },
  { path: '/', component: Project },
  { path: '/MenuDetail/:id', component: MenuDetail },
  { path: '/UserDetail/:id', component: UserDetail },
]
export default new Router({ routes })