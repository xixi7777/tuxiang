<template>
  <view class="list-container">
    <top title="报名列表" />

    <view class="list">
      <view class="list-item list-item-title">
        <view class="left">排名</view>
        <view class="center">姓名</view>
        <view class="right">付款状态</view>
      </view>

      <scroll-view scroll-y="true" show-scrollbar="true" class="scroll-view">
        <view class="list-item" v-for="(item, index) in list" :key="index">
          <view class="left" v-if="index <= 2">
            <image lazy-load class="image" :src="topImageUrl[index]" />
          </view>
          <view class="left" v-if="index > 2"
            ><text class="text">{{ index }}</text></view
          >

          <view class="center"
            ><text>{{ item.xm }}</text></view
          >
          <view
            :class="[
              'right',
              {
                paid: item.status == 1,
                unpaid: item.status == 0,
              },
            ]"
          >
            <text>{{ item.zfzt ? '已支付' : '未支付' }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import Top from '@/components/top/Top';
export default {
  components: {
    Top,
  },
  data() {
    return {
      list: [],
      total: 0,
      query: {
        pageNum: 1,
        pageSize: 10
      },
      topImageUrl: [
        '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_top1.png',
        '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_top2.png',
        '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_top3.png',
      ],
    };
  },
  onShow() {
    this.getList()
  },
  onReachBottom() {
    if (this.list.length === this.total) {
      return
    }
    this.query.pageNum++
    this.getList()
  },
  onPullDownRefresh() {
    this.query.pageNum = 1
    this.getList()
  },
  methods: {
    getList() {
      this.$api.activityUserList({
        openid: uni.getStorageSync('openid'),
        ...this.query
      }).then(res => {
        this.list = [...this.list, ...res.rows]
        this.total = res.total
      })
    },
  },
  watch: {
    'query.pageNum'(n) {
      if (n === 1) {
        this.list = []
      }
    }
  }
};
</script>
<style lang="scss" scope>
/deep/ .top {
  padding: 70px 30px 60px 30px !important;
  border-radius: 0px 0px 0px 50px;
  .back-icon {
    top: 70px !important;
  }
}

.list {
  position: fixed;
  z-index: 100;
  left: 30px;
  right: 30px;
  top: 155px;
  bottom: 50px;
  padding: 40px 30px;
  background: linear-gradient(335deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1);
  border-radius: 20px;
  .scroll-view {
    height: 100%;
  }
  .list-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 26px;
    color: #000;
    margin-bottom: 25px;
    text-align: center;
    .left {
      width: 100px;
    }
    .center {
      flex: 1;
    }
    .right {
      width: 120px;
      text-align: left;
      color: #b1b1b1;
      &.paid {
        color: #17aa7d;
      }
      &.unpaid {
        color: #f8ab52;
      }
      &.pay_failed {
        color: #aa4717;
      }
    }
    .text {
      display: inline-block;
      width: 33px;
    }
    .image {
      width: 33px;
      height: 43px;
    }
  }
  .list-item-title {
    color: #929292;
  }
}
</style>
