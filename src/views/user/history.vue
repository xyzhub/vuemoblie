<template>
  <div>
      <!-- 导航栏 -->
      <van-nav-bar title="历史记录"
      @click-left="$router.back()"
                  left-arrow />
    <h3>历史记录</h3>
  </div>
</template>

<script>
export default {
  name: 'History'

}
</script>

<style lang="less" scoped>

</style>
