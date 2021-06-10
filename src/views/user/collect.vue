<template>
  <div>
    <!-- 导航栏 -->
      <van-nav-bar title="收藏"
      @click-left="$router.back()"
                  left-arrow />
    <h3>收藏</h3>
  </div>
</template>

<script>
export default {
  name: 'Collect'
}
</script>

<style lang="less" scoped>

</style>
