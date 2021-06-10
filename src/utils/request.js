/*
  封装axios请求模块
*/
import axios from 'axios'
import store from '@/store'
// 创建axios实例对象
const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // 读取环境变量获取不同环境下的接口
  timeout: 5000
})
// 配置请求拦截器
$axios.interceptors.request.use(config => {
  // 如果登录成功
  if (store.getters.token) {
    config.headers.Authorization = 'Bearer ' + store.getters.token
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 暴露接口
export default $axios
