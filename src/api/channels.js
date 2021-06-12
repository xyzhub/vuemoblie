// 导入请求
import $axios from '@/utils/request'

// 获取用户频道信息
export const getUserChannels = () => {
  return $axios({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道
export const getAllChannels = () => {
  return $axios({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 添加用户频道
export const addUserChannel = channels => {
  return $axios({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}

// 删除用户频道
export const deleteUserChannel = channelId => {
  return $axios({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
