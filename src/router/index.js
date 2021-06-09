import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 路由映射
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
