<template>
  <van-cell class="article-item">
    <div slot="title"
         class="title">{{ articleInfo.title }}</div>
    <!--三图区域 -->
    <div slot="label">
      <div v-if="articleInfo.cover.type === 3"
           class="cover-wrap">
        <div class="cover-item"
             v-for="(img, index) in articleInfo.cover.images"
             :key="index">
          <van-image width="100"
                     height="100"
                     :src="img" />
        </div>
      </div>
      <!-- 三个文字内容 -->
      <div class="text-box">
        <span>{{ articleInfo.aut_name }}</span>
        <span>{{ articleInfo.comm_count }}评论</span>
        <!-- 使用过滤器加工数据 -->
        <span>{{ articleInfo.pubdate | getRelativeTime }}</span>
      </div>
    </div>
    <!-- 单图区域 -->
    <van-image v-if="articleInfo.cover.type === 1"
               slot="default"
               width="100"
               height="100"
               :src="articleInfo.cover.images[0]" />
  </van-cell>
</template>

<script>
/*
    数据加工的两种方式,
    1.在获取数据后进行加工,
    2.在模板中使用过滤器进行加工
*/
export default {
  name: 'ArticleItem',
  // 本行数据信息
  props: {
    articleInfo: {
      typeof: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .text-box{
    margin-top: 30px;
    span{
      margin-right: 20px;
    }
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
