import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入store
import store from '@/store'
Vue.use(VueRouter)
// 路由映射
const routes = [
  // 登录路由
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  },
  // 主界面路由
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout.vue'),
    redirect: '/home',
    children: [
      { path: '/home', name: 'Home', component: () => import('@/views/home'), meta: { title: '首页' } },
      { path: '/qa', name: 'Qa', component: () => import('@/views/qa'), meta: { title: '问答' } },
      { path: '/user', name: 'User', component: () => import('@/views/user'), meta: { title: '用户' } },
      { path: '/video', name: 'Video', component: () => import('@/views/video'), meta: { title: '视频' } }
    ]
  },
  // 历史
  {
    path: '/user/history',
    name: 'History',
    component: () => import('@/views/user/history'),
    meta: { title: '历史记录', needLogin: true }
  },
  // 收藏
  {
    path: '/user/collect',
    name: 'Collect',
    component: () => import('@/views/user/collect'),
    meta: { title: '收藏', needLogin: true }
  }
]

const router = new VueRouter({
  routes
})

// 解决路由重定向问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// 导航守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // 判断页面是否需要登录
  if (to.meta.needLogin) {
    // 判断是否登录
    if (store.getters.token) {
      // 登录放行
      next()
    } else {
      // 未登录去登录页
      next('/login?url=' + to.path)
    }
  } else {
    // 不需要登录直接放行
    next()
  }
})
export default router
