// 文章接口

import $axios from '@/utils/request'

/**
  * 获取频道的文章列表
  */
export const getArticles = params => {
  return $axios({
    method: 'GET',
    url: '/v1_1/articles',
    params
  })
}
