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
            <image class="image" :src="topImageUrl[index]" />
          </view>
          <view class="left" v-if="index > 2"
            ><text class="text">{{ index }}</text></view
          >

          <view class="center"
            ><text>{{ item.name }}</text></view
          >
          <view
            :class="[
              'right',
              {
                paid: item.status == 1,
                unpaid: item.status == 2,
                pay_failed: item.status == 3,
              },
            ]"
          >
            <text>{{ getStatusText(item.status) }}</text>
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
      list: [
        //0，取消支付；1，已支付；2，未支付；3，支付失败
        {
          name: '广河',
          status: 0,
        },
        {
          name: '广河',
          status: 1,
        },
        {
          name: '广河',
          status: 1,
        },
        {
          name: '广河',
          status: 2,
        },
        {
          name: '广河',
          status: 3,
        },
      ],
      topImageUrl: [
        '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_top1.png',
        '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_top2.png',
        '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_top3.png',
      ],
    };
  },
  methods: {
    getStatusText(status) {
      switch (status) {
        case 0:
          return '取消支付';
          break;
        case 1:
          return '已支付';
          break;
        case 2:
          return '未支付';
          break;
        case 3:
          return '支付失败';
          break;
        default:
          return '取消支付';
          break;
      }
    },
  },
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
