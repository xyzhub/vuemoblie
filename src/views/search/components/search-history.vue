<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelete && historyList.length">
        <span @click="delALL">全部删除</span>
        <span @click="isDelete=false">完成</span>
      </template>
      <van-icon v-else
                @click="isDelete=true"
                name="delete-o" />
    </van-cell>
    <!-- 列表 -->
    <van-cell v-for="(item,index) in historyList"
              @click="onClickHandler(item,index)"
              :key="item"
              :title="item">
      <van-icon v-if="isDelete" name="close" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storge'
export default {
  name: 'SearchHistory',
  props: {
    historyList: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isDelete: false
    }
  },
  methods: {
    // 删除所有
    delALL () {
      this.historyList.splice(0)
      // 存入本地存储
      setItem('SEARCH-TOUTIAO', this.historyList)
    },
    // 删除
    onClickHandler (val, idx) {
      // 判断操作行为
      if (this.isDelete) {
        // 删除状态,删除内容
        this.historyList.splice(idx, 1)
        // 存入本地存储
        setItem('SEARCH-TOUTIAO', this.historyList)
      } else {
        // 非删除,进行跳转
        this.$emit('search', val)
      }
    }
  }

}
</script>

<style lang="less" scoped>

</style>
