import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入全局自定义样式
import '@/styles/index.less'
// 引入 lib-flexible 动态设置 REM 基准值
import 'amfe-flexible'
// 引入自定义过滤器函数
import * as filters from '@/filters'
console.log(filters)
// 批量注册过滤器
Object.keys(filters).forEach(key => {
  console.log(key) // key函数名
  console.log(filters[key]) // 函数
  Vue.filter(key, filters[key])
})
// 注册使用vant组件
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
