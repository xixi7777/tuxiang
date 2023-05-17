<template>
  <view>
    <view class="check-in-container">
        <!-- 顶部背景色块 -->
        <view class="top-background"></view>
        <!-- 页面标题栏 -->
        <view class="top-title">
            <view class="title-content">
                <!-- 返回 -->
                <view class="arrow-back" @click="navigateBack">
                    <u-icon color="#006848" name="arrow-left" bold size="24"></u-icon>
                </view>
                <text>每日签到</text>
            </view>
        </view>

        <view class="check-info__container">
            <view class="info-item">
                <view class="label">连续签到天数</view>
                <view class="number">{{ signData.day }}</view>
            </view>
            <view class="info-item">
                <view class="label">当前积分</view>
                <view class="number">{{ signData.totalIntegral }}</view>
            </view>
        </view>

        <view class="check-btn__container" @click="checkIn">
          <u-button type="primary" shape="circle" :disabled="parseInt(signData.signFlag)">{{ parseInt(signData.signFlag)?`已连续签到 ${signData.day} 天`:'立即签到' }}</u-button>
        </view>
    </view>
  </view>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'checkIn',
  data() {
    return {
      userInfo: {},
      teamId: '',
      signData: {}
    }
  },
  onShow() {
    let info = uni.getStorageSync('userInfo')
    this.userInfo = info ? JSON.parse(info) : {}
  },
  onLoad(option) {
    this.teamId = option.teamId ?? ''
  },
  methods: {
    getCheckInData() {
      this.$api.signInData({ 
        userId: this.userInfo.id
      }).then(res => {
        this.signData = res.data
      })
    },
    checkIn() {
      this.$api.checkIn({
        userId: this.userInfo.id,
        teamId: this.teamId
      }).then(res => {
        uni.showToast({
          icon: 'none',
          title: '签到成功',
          mask: true,
          duration: 2000
        })
      })
      this.getCheckInData()
    }
  },
  watch: {
    teamId: {
      immediate: true,
      handler(n) {
        if (n) {
          this.getCheckInData()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.check-in-container {
    padding: 300px 30px 30px;
}
  .top-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    height: 365px;
    background: #A1F5E2;
    border-radius: 0px 0px 0px 50px;
}

.top-title {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 160px;
    width: 100%;
    color: #006848;
    font-size: 36px;
    background: #A1F5E2;
    z-index: 10;

    .title-content {
        padding-left: 70px;
        margin-top: 120px;
        text-align: center;
    }

    .arrow-back {
        position: absolute;
        left: 15px;
        top: 120px;
    }
}

.check-info__container {
  position: fixed;
  top: 220px;
  z-index: 10;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  .label {
    color: #f5fffd;
    font-size: 32px;
  }
  .number {
    color: #46e0bc;
    font-size: 60px;
    font-weight: bold;
  }
  .info-item {
    flex: 1;
    text-align: center;
    &:first-child .number {
      border-right: 1px solid #f5fffd;
    }
  }
}

.check-btn__container {
  position: fixed;
  z-index: 8;
  width: 580px;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30;
}
</style>