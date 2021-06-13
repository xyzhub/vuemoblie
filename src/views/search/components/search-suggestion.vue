<template>
  <div class="search-suggestion">
    <van-cell v-for="(item,index) in list"
              :key="index"
              icon="search"
              @click="$emit('search',item)">
    <!-- 定义插槽 -->
    <span slot="title" v-html="textActive(item,SearchValue)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
// 引入过滤器
import { textActive } from '@/filters'
// debounce(函数,时间) 返回一个函数,防抖
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      // 搜索建议数组
      list: []
    }
  },
  props: {
    // 搜索关键字
    SearchValue: {
      type: String,
      require: true
    }
  },
  watch: {
    SearchValue: {
      immediate: true, // 一开始就触发一次
      // this.loadSearchSuggestion()
      // 使用防抖函数
      handler: debounce(function () {
        this.loadSearchSuggestion()
      }, 1000)
    }
  },
  methods: {
    // 获取搜索建议
    async loadSearchSuggestion () {
      try {
        const { data: res } = await getSearchSuggestion(this.SearchValue)
        // console.log(res)
        this.list = res.data.options
      } catch (error) {
        console.dir(error)
      }
    },
    // 文字高亮
    textActive
  }

}
</script>

<style lang="less" scoped>

</style>
