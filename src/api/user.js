// 引入请求工具
import $axios from '@/utils/request'
// 引入仓库
// import store from '@/store'
// 提交请求
export const login = data => {
  return $axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 获取手机验证码
export const getSms = data => {
  return $axios({
    url: `/v1_0/sms/codes/${data}`,
    method: 'GET'
  })
}

// 获取用户资料
export const getUserInfo = () => {
  return $axios({
    url: '/v1_0/user',
    method: 'GET'
    // headers: {
    //   Authorization: 'Bearer ' + store.getters.token
    // }
  })
}
