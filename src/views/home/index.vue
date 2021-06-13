<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn"
                  slot="title"
                  type="info"
                  size="small"
                  round
                  icon="search" @click="$router.push('/search')">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs class="channel-tabs"
              v-model="active"
              swipeable
              animated
              border>
      <!-- 循环渲染 -->
      <van-tab v-for="item in userChannel"
               :key="item.id"
               :title="item.name">
        <!-- 文章列表组件 -->
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <!-- 右侧自定义内容 -->
      <!-- 占位元素 -->
      <div slot="nav-right"
           class="placeholder"></div>
      <!-- 右侧按钮 -->
      <div slot="nav-right"
           class="hamburger-btn"
           @click="isEditChannelShow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->
    <van-popup v-model="isEditChannelShow"
               position="bottom"
               closeable
               close-icon="close"
               close-icon-position="top-left"
               :style="{ height: '100vh' }">
      <!-- 我的频道 -->
      <channel-edit :active-index="active"
                    @change-active="active=$event"
                    @close="isEditChannelShow=false"
                    :user-channel="userChannel"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channels'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
// 导入本地存储
import { getItem } from '@/utils/storge'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  name: 'Home',
  data () {
    return {
      // tab激活项
      active: 0,
      // 定义用户频道列表数组
      userChannel: [],
      isEditChannelShow: false
    }
  },
  created () {
    this.loadUserChannel()
  },
  methods: {
    // 获取用户列表
    async loadUserChannel () {
      // 判断是否登录
      if (this.$store.getters.token) {
        // 用线上的
        try {
        // 发送请求
          const { data: res } = await getUserChannels()
          // console.log(res)
          // 成功赋值(如需要处理数据,在赋值之前处理)
          this.userChannel = res.data.channels
        } catch (error) {
        // 错误处理
          this.$toast.fail('获取用户频道列表失败')
          console.log(error)
        }
      } else {
        // 判断本地存储是否有
        if (getItem('TOU_CHANNELS')) {
          // 存在用本地的
          this.userChannel = getItem('TOU_CHANNELS')
        } else {
          // 使用线上默认的
          try {
            // 发送请求
            const { data: res } = await getUserChannels()
            // console.log(res)
            // 成功赋值(如需要处理数据,在赋值之前处理)
            this.userChannel = res.data.channels
          } catch (error) {
            // 错误处理
            this.$toast.fail('获取用户频道列表失败')
            console.log(error)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  // 深度选择器问题
  /deep/ .van-nav-bar__title {
    // unset不设置
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  /deep/ .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
  }
  /deep/ .van-tabs__line {
    width: 32px;
    height: 6px;
    background-color: #3296fa;
    bottom: 40px;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
