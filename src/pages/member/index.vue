<template>
  <view class="member-container">
    <top title="成员管理" />
    <search></search>

    <view class="member-wrap">
      <scroll-view  scroll-y="true"
          show-scrollbar="true">
        <view class="list">
          <view class="list-title">
            <view class="left"><text class="text">成员列表</text></view>
            <image
              class="image"
              src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/icon_edit.png"
            />
          </view>

          <view class="list-content">
            <view class="item item-title">
              <text>姓名</text>
              <text>职位</text>
              <text>积分</text>
            </view>
            <view
              v-for="(item, index) in list"
              :key="index"
              class="item item-con"
            >
              <text class="left">{{ item.name }}</text>
              <text>{{ item.position }}</text>
              <text>{{ item.point }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import Top from '@/components/top/Top';
import Search from '@/components/pageSearch/PageSearch';
export default {
  components: {
    Top,
    Search,
  },
  data() {
    return {
      list: [
        {
          name: '广合',
          position: '队长',
          point: '2410',
        },
        {
          name: '广合',
          position: '队长',
          point: '2410',
        },
        {
          name: '广合',
          position: '队长',
          point: '2410',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
/deep/ .top {
  padding: 70px 30px 180px 30px !important;
  .back-icon {
    top: 70px !important;
  }
}

/deep/ .page-search {
  position: fixed !important;
  top: 96px;
  left: 30px;
  z-index: 100;
}
.member-container {
}
.member-wrap {
  position: fixed;
  left: 30px;
  right: 30px;
  top: 240px;
  bottom: 50px;
  z-index: 100;
  padding: 30px;
  background: linear-gradient(335deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
  box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1);
  border-radius: 20px;
  .scroll-view {
    height: 100%;
  }
}

.list-title,
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 26px;
  text-align: center;
}
.list-title {
    margin-bottom: 25px;
  .left {
    background-color: rgba(23, 170, 125, 0.1);
    border-radius: 30px;
    height: 60px;
    width: 276px;
    position: relative;
    .text {
      position: absolute;
      left: 0;
      width: 176px;
      height: 60px;
      background: #17aa7d;
      border-radius: 30px 0 0 30px;
      line-height: 60px;
      color: #fff;
      text-align: center;
    }
  }
  .image {
    width: 36px;
    height: 36px;
  }
}
.item {
  margin-bottom: 25px;
}
.item-title {
  color: #929292;
}
.item-con {
  color: #17aa7d;

  .left {
    color: #000;
  }
}
</style>
