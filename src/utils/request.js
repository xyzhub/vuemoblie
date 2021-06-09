/*
  封装axios请求模块
*/
import axios from 'axios'
// 创建axios实例对象
const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // 读取环境变量获取不同环境下的接口
  timeout: 5000
})
// 暴露接口
export default $axios
