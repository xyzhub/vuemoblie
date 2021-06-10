<template>
  <div>
    <div class="user-content">
      <!-- 头部区域 -->
      <div class="header">
        <!-- 未登录 -->
        <div class="no-loign" v-if="!$store.getters.token">
          <img
              class="mobile-img"
              src="~@/assets/mobile.png"
              @click="$router.push('/login')"
              >
          <p>登录&nbsp;/&nbsp;注册</p>
        </div>
        <!-- 已登录 -->
        <div class="has-login" v-else>
          <!-- 用户信息 -->
          <div class="user-info">
            <div class="icon">
              <van-image
                        class="img"
                        round
                        fit="cover"
                        :src="userinfo.photo"
                        />
              <span class="name">{{userinfo.name}}</span>
            </div>
            <router-link to="" class="edit-btn">编辑资料</router-link>
          </div>
          <!-- 用户数据 -->
          <div class="user-data">
            <router-link to="/">
              <p class="num">{{userinfo.art_count}}</p>
              <p class="name">头条</p>
            </router-link>
            <router-link to="/">
              <p class="num">{{userinfo.follow_count}}</p>
              <p class="name">关注</p>
            </router-link>
            <router-link to="/">
              <p class="num">{{userinfo.fans_count}}</p>
              <p class="name">粉丝</p>
            </router-link>
            <router-link to="/">
              <p class="num">{{userinfo.like_count}}</p>
              <p class="name">获赞</p>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 2宫格 -->
      <van-grid class="grid-item" :column-num="2" clickable>
          <van-grid-item to="/user/collect">
            <!-- 使用插槽 -->
            <i class="toutiao toutiao-shoucang" slot="icon"></i>
            <span class="text" slot="text">收藏</span>
          </van-grid-item>
          <van-grid-item to="/user/history">
            <i class="toutiao toutiao-lishi" slot="icon"></i>
            <span class="text" slot="text">历史</span>
          </van-grid-item>
      </van-grid>
      <!-- 单元格导航 -->
      <div class="grid-nav">
        <van-cell title="消息通知" is-link to="/user/msg" />
        <van-cell title="小智同学" is-link to="/user/student" />
      </div>
      <!-- 退出按钮 -->
      <van-cell title="退出" @click="quit"  v-if="$store.getters.token" class="quit-btn" />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'User',
  data () {
    return {
      userinfo: {}
    }
  },
  created () {
    // 页面加载就调用
    // 注意登陆了才能获取数据
    this.$store.getters.token && this.loadUserInfo()
  },
  methods: {
    // 获取用户信息
    async loadUserInfo () {
      try {
        const { data: res } = await getUserInfo()
        // console.log(res)
        this.userinfo = res.data
      } catch (error) {
        if (error.response.status === 401) {
          // 提示信息
          this.$toast.fail('登录失效,请重新登录')
          // 清空原来的登录信息
          this.$store.commit('setUser', {})
          // 跳转登录
          this.$router.push('/login?url=/user')
        } else {
          this.$toast.fail('获取用户资料失效')
          // 打印错误信息
          console.dir(error)
        }
      }
    },
    async quit () {
      try {
        // 弹框提示退出信息
        // 清空本地存储和token
        await this.$dialog.confirm({
          title: '提示',
          message: '确认退出吗'
        })
        // 退出处理
        this.$store.commit('setUser', {})
      } catch (error) {
        console.log('取消退出')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-content {
  > .header {
    height: 361px;
    // css中 不能简单直接使用@表示src目录，这样是无法读取，还需要加上一个~
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    // 没登录
    .no-loign {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      p {
        font-size: 28px;
        color: #fff;
      }
    }
    // 已登录
    .has-login{
      .user-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:76px 32px 0;
        .icon{
          display: flex;
          align-items: center;
          .img{
            width: 132px;
            height:132px;
            background-color: #fff;
            padding: 4px;
          }
          .name{
            margin-left: 24px;
            font-size: 30px;
            color: #fff;
          }
        }
        .edit-btn{
          width: 116px;
          height: 30px;
          display: block;
          border-radius: 15px;
          background-color: #fff;
          font-size: 20px;
          color: #666;
          text-align: center;
          line-height: 30px;
        }
      }
      .user-data{
        display: flex;
        height: 130px;
        margin-top: 10px;
        a{
          flex: 1;
          text-align: center;
          color: #fff;
          .num{
            font-size: 36px;
            margin:33px 0 10px;
          }
          .name{
            font-size: 24px;
            margin:0;
          }
        }
      }

    }

  }
  /deep/ .quit-btn{
    margin-top: 10px;
    .van-cell__title{
      text-align: center;
      line-height: 70px;
      span{
        color: #d86262;
        font-size: 30px;
      }
    }
  }
  .grid-item {
    margin-bottom: 10px;
    .toutiao {
      font-size: 48px;
    }
    .text {
      font-size: 28px;
      margin-top: 10px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
  }
}
</style>
