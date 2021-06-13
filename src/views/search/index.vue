<template>
  <div class="search-container">
    <form action="/" class="fix-top">
      <van-search background="#3296fa"
                  v-model="searchValue"
                  show-action
                  placeholder="请输入搜索关键词"
                  @search="onSearch"
                  @clear="isResultShow=false"
                  @cancel="$router.back()" />
    </form>
    <!-- 内容区域 -->
    <!-- 第一种 -->
    <!-- 搜索结果 -->
    <search-result :search-value="searchValue" v-if="isResultShow"></search-result>
    <!-- 搜索建议 -->
    <search-suggestion :search-value="searchValue"
                       v-else-if="searchValue"
                       @search="onSearch"></search-suggestion>
    <!-- 搜索历史 -->
    <search-history @search="onSearch" :history-list="searchHistoryList" v-else></search-history>

    <!-- 第二种 -->
    <!-- 搜索结果 -->
    <!-- <search-result v-if="isResultShow && searchValue"></search-result> -->
    <!-- 搜索建议 -->
    <!-- <search-suggestion :search-value="searchValue"
                       v-if="searchValue && !isResultShow"
                       @search="onSearch"></search-suggestion> -->
    <!-- 搜索历史 -->
    <!-- <search-history v-if="!searchValue && !isResultShow"></search-history> -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import SearchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '@/utils/storge'
export default {
  components: {
    SearchResult,
    SearchSuggestion,
    SearchHistory
  },
  name: 'Search',
  data () {
    return {
      searchValue: '', // 搜索框绑定的数据
      isResultShow: false, // 是否显示搜索结果
      // 定义存储变量,如果本地有就使用本地,没有就空数组
      searchHistoryList: getItem('SEARCH-TOUTIAO') || [] // 搜索历史
    }
  },
  methods: {
    onSearch (val) {
      // 注意value就是输入框的数据
      // console.log(val)
      this.searchValue = val
      this.isResultShow = true
      // 保存搜索历史
      const idx = this.searchHistoryList.findIndex(item => item === val)
      if (idx !== -1) {
        this.searchHistoryList.splice(idx, 1)
      }
      this.searchHistoryList.unshift(val)
      // 保存到本地
      setItem('SEARCH-TOUTIAO', this.searchHistoryList)
    }
  }

}
</script>

<style lang="less" scoped>
.search-container{
  /deep/ .van-search__action{
    color: #fff;
  }
  .fix-top{
    // 粘性布局
    position: sticky;
    top: 0;
    z-index: 100;
  }
}

</style>
