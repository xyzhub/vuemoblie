<template>
  <div class="search-result">
    <!-- 数据列表 -->
    <van-list v-model="loading"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              :finished="finished"
              finished-text="没有更多了"
              @load="loadResultList">
      <!-- 列表组件 -->
      <van-cell v-for="item in list"
                    :key="item.art_id"
                    :title="item.title"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchValue: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: [], // 搜索列表
      page: 1, // 页码
      size: 10, // 每页数量
      loading: false, // 是否加载中
      finished: false, // 是否结束
      error: false // 是否错误
    }
  },
  methods: {
    // 获取搜索结果
    async loadResultList () {
      try {
        const { data: res } = await getSearchResult({
          q: this.searchValue,
          per_page: this.size,
          page: this.page
        })
        // 解构追加
        this.list.push(...res.data.results)
        // 判断是否结束
        if (res.data.results.length < this.size) {
          // 最后一页结束
          this.finished = true
        } else {
          // 页码+1
          this.page++
        }
      } catch (error) {
        // 错误处理
        this.$toast.fail('获取结果失败')
        // 是否显示错误
        this.error = true
      }
      // 关闭加载
      this.loading = false
    }
  }

}
</script>

<style lang="less" scoped>

</style>
