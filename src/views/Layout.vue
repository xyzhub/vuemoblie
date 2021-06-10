<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- tabbar区域 -->
    <van-tabbar class="tab-bar"  v-model="active" route>
      <van-tabbar-item icon-prefix="toutiao" to="/home" icon="shouye">首页</van-tabbar-item>
      <van-tabbar-item icon-prefix="toutiao" to="/qa" icon="wenda">问答</van-tabbar-item>
      <van-tabbar-item icon-prefix="toutiao" to="/video" icon="shipin">视频</van-tabbar-item>
      <van-tabbar-item icon-prefix="toutiao" to="/user" icon="wode">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .tab-bar .toutiao{
  font-size: 36px;
}
</style>
