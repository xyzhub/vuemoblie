<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title"
           class="title-text">我的频道</div>
      <van-button class="edit-btn"
                  type="danger"
                  plain
                  round
                  @click="isEdit=!isEdit"
                  size="mini">{{isEdit ? '完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="(item,index) in userChannel"
                     @click="itemClickHandler(index)"
                     :key="item.id">
        <van-icon slot="icon"
                  v-if="isEdit && item.name!=='推荐'"
                  name="clear"></van-icon>
        <span class="text"
              :class="{active:activeIndex===index}"
              slot="text">{{item.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title"
           class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="item in recommendChannel"
                     :key="item.id"
                     icon="plus"
                     :text="item.name"
                     @click="addtoUserChannel(item)" />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channels'
// 引入本地存储工具
import { setItem } from '@/utils/storge'
export default {
  name: 'ChannelEdit',
  props: {
    userChannel: {
      type: Array,
      require: true
    },
    // 激活下标位置
    activeIndex: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      // 全部频道列表
      allChannels: [],
      // 定义编辑状态
      isEdit: false
    }
  },
  // 计算属性
  computed: {
    // 推荐频道
    recommendChannel () {
      // 推荐频道=全部频道-我的频道
      // 思路:遍历全部的频道数据,判断是否在我的频道中,如果不在,说明就是推荐频道的数据
      const arr = []
      this.allChannels.forEach(item => {
        // 遍历的这个值是否在我的频道中
        const isExist = this.userChannel.some(val => val.id === item.id)
        // 如果不在就插入到推荐里
        if (!isExist) {
          arr.push(item)
        }
      })
      return arr
    }
    // 简写方法
    // return this.allChannels.filter(item=>{
    //   return !this.userChannel.some(val=>val.id===item.id)
    // })
  },
  created () {
    // 调用获取所有频道信息函数
    this.loadAllChannels()
  },
  methods: {
    // 所有频道信息
    async loadAllChannels () {
      try {
        // 调用请求
        const { data: res } = await getAllChannels()
        // 成功处理
        this.allChannels = res.data.channels
      } catch (error) {
        // 错误处理
        console.dir(error)
        this.$toast.fail('获取所有列表失败')
      }
    },
    // 添加频道
    async addtoUserChannel (val) {
      /* 父子通信的props是一个数组或者对象,name我们子组件里面,对数组和对象进行了修改不算违背了单项数据流的原则,只要你不赋值就行 */
      // this.userChannel.push(val) // 不算修改了props,而父组件也获取到最新值,因为父子使用共有的引用地址
      //  this.userChannel=[] // 修改了props

      /*
        数据持久化操作
        如果未登录,则存储到本地,如果已登录,则存储到线上
      */
      if (this.$store.getters.token) {
        try {
          // 线上有
          await addUserChannel([{
            id: val.id, // 频道id
            seq: this.userChannel.length
          }])
          this.userChannel.push(val) // 本地更新
        } catch (error) {
          console.dir(error)
          this.$toast.fail('添加频道列表失败')
        }
      } else {
        this.userChannel.push(val)
        setItem('TOU_CHANNELS', this.userChannel)
      }
    },
    // 我的频道点击事件
    async itemClickHandler (idx) {
      // 判断状态
      if (this.isEdit) {
        // 编辑状态
        if (idx === 0) return false
        if (idx <= this.activeIndex) {
          this.$emit('change-active', this.activeIndex - 1)
        }
        // 判断是否登录
        // 实录:如果未登录,则删除后存储到本地,如果已登录,则删除线上
        if (this.$store.getters.token) {
          try {
            // 删除线上
            await deleteUserChannel(this.userChannel[idx].id)
          } catch (error) {
            this.$toast.fail('删除失败')
          }
          // 操作完成才更新视图
          this.userChannel.splice(idx, 1)
        } else {
          // 操作完成才更新视图
          this.userChannel.splice(idx, 1)
          // 存储到本地
          setItem('TOU_CHANNELS', this.userChannel)
        }
      } else {
        // 完成状态
        this.$emit('change-active', idx)
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
