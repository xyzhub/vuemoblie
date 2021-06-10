import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地存储工具
import { setItem, getItem } from '@/utils/storge'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义用户信息
    user: getItem('UserToken') || {}
  },
  getters: {
    // token
    token: state => state.user.token
  },
  mutations: {
    // 设置用户信息
    setUser (state, data) {
      // 设置给state
      state.user = data
      // 用户信息存储到本地存储
      setItem('UserToken', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
