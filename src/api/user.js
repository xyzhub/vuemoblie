// 引入请求工具
import $axios from '@/utils/request'
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
