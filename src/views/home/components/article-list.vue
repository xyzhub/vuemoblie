<template>
  <div class="article-list">
    <!-- 下拉刷新 -->
    <van-pull-refresh :success-text="successText"
                      v-model="isLoading"
                      @refresh="onRefresh">
      <!-- 数据列表 -->
      <van-list v-model="loading"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <!-- 列表组件 -->
        <article-item v-for="item in list"
                     :key="item.art_id"
                     :article-info="item"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入文章接口函数
// 按需导入 export const
import { getArticles } from '@/api/article'
// 导入公共列表项组件
// 默认导入export default
import ArticleItem from '@/components/article-item'
export default {
  // 注册组件
  components: {
    ArticleItem
  },
  name: 'ArticleList',
  // 父子通信.1.定义props,2.绑定props,3.使用props
  // 子组件内定义props
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 数据列表
      loading: false, // 是否处于加载中
      finished: false, // 整个文章列表数据是否加载完成
      timestamp: Date.now(), // 下一页时间戳
      error: false, // 是否出错
      isLoading: false, // 是否处于下拉刷新状态
      successText: '' // 刷新成功的提示
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1.发送数据请求
        const { data: res } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp, // 时间戳
          with_top: 1 // 是否包含置顶,1是,0否
        })
        // 3.成功处理
        // 注意需要铺满界面,不能直接赋值,这样永远也铺不满
        /* // this.list = res.data.results */
        // 追加或者结构合并数组
        this.list = [...this.list, ...res.data.results] // 列表数据
        // 更新下一页的时间戳(本质是页码)
        this.timestamp = res.data.pre_timestamp
        // (判断是否结束)结束条件,(最后一页是否小于10,小于10表示是最后一页结束)
        if (res.data.results.length < 10) {
          this.finished = true
        }
      } catch (error) {
        // 2. 错误处理
        this.error = true // 显示错误
        console.dir(error)
        this.$toast.fail('文章列表加载失败')
      }
      // (加载中关闭)无论成功还是失败都要关闭loading
      this.loading = false
    },
    // 下拉刷新
    async onRefresh () {
      try {
        // 1.发送数据请求
        const { data: res } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(), // 修改最新的时间戳
          with_top: 1 // 是否包含置顶,1是,0否
        })
        // 3.成功处理
        // 调整数据合并结构,将最新的数据放在数组前
        this.list = [...res.data.results, ...this.list]
        // 成功提示
        this.successText = `成功为你刷新${res.data.results.length}条数据`
      } catch (error) {
        // 2. 错误处理
        console.dir(error)
        this.$toast.fail('文章列表加载失败')
      }
      // (加载中关闭)无论成功还是失败都要关闭isLoading
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-list{
  overflow-y: scroll;
  height: 79vh;
}
</style>
