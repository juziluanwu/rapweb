import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import MenuDetail from '@/manager/MenuDetail.vue'
import Project from '@/manager/Project.vue'
import userinfo from '@/user/index.vue'
import UserDetail from '@/user/prolist.vue'
const routes = [
  { path: '/', component: Project },
  { path: '/MenuDetail/:id', component: MenuDetail },
  { path: '/userpro', component: userinfo },
  { path: '/UserDetail/:id', component: UserDetail },
]
export default new Router({ routes })