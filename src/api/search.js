import $axios from '@/utils/request'
// 获取搜索建议
export const getSearchSuggestion = q => {
  return $axios({
    method: 'get',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getSearchResult = params => {
  return $axios({
    method: 'get',
    url: '/v1_0/search',
    params
  })
}
