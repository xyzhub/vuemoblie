<template>
  <div>
    <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar title="登录"
                  left-arrow />
      <!-- logo 区域 -->
      <div class="logo">
          <img src="@/assets/logo2.png" alt="">
      </div>
      <!-- 表单区域 -->
      <van-form ref="form" @submit="onSubmit" :show-error="false">
        <van-field v-model="formData.mobile"
                  name="mobile"
                  left-icon="shouji"
                  icon-prefix="toutiao"
                  clearable
                  placeholder="请输入手机号"
                  :rules="rulesForm.mobile" />
        <van-field v-model="formData.code"
                  name="code"
                  left-icon="yanzhengma"
                  icon-prefix="toutiao"
                  center
                  clearable
                  placeholder="请输入短信验证码"
                  :rules="rulesForm.code">
                  <!-- #button 是个插槽,相当于slot -->
          <template #button>
            <!-- 注意表单下的按钮默认拥有提交行为,需要使用  native-type='button' 修改为button  -->
            <!-- 倒计时 -->
                  <van-count-down v-if="countDownShow" millisecond :time="time" format="ss 秒" @finish="countDownShow=false" />
            <!-- 按钮 -->
              <van-button v-else class="code-btn" round size="small" native-type='button' type="default" @click="sendSms">发送验证码</van-button>

          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round
                      block
                      type="info"
                      native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// 引入用户注册请求
import { login, getSms } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      formData: {
        mobile: '17718263858',
        code: '246810'
      },
      // 定义表单验证规则
      rulesForm: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号不合法' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码不合法' }
        ]
      },
      // 倒计时
      time: 3 * 1000,
      // 定义切换变量
      countDownShow: false
    }
  },
  methods: {
    // 表单提交
    async onSubmit (values) {
      try {
        this.$toast.loading({
          message: '加载中...',
          duration: 0, // 持续展示 toast
          forbidClick: true
        })
        const { data: res } = await login(values)
        // 存储用户的token信息
        // 注意调用传入 mutations 的方法,和实参
        this.$store.commit('setUser', res.data)
        console.log(res)
        this.$toast.success('登录成功')
        // 跳转到个人中心(判断是否有重定向的地址)
        this.$router.replace(this.$route.query.url || '/user')
      } catch (error) {
        this.$toast.fail('登录失败')
        console.log(error)
      }
    },
    // 验证码处理
    async sendSms () {
      try {
        // 手机号验证
        // 注意this.$refs.form.validate() 参数是一个表单中 name 值 返回的是一个promise
        await this.$refs.form.validate('mobile')
        // 发送请求
        await getSms(this.formData.mobile)
        // console.log(res)
        // 倒计时切换
        this.countDownShow = true
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .login-container {
.toutiao {
    font-size: 37px;
    margin-right: 10px;
  }

  .code-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 16px;
    color: #666;
  }
  .logo{
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 220px;
    }
  }
}
</style>
