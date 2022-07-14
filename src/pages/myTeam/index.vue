<template>
  <view class="app-container">
    <!-- 页面标题栏 -->
    <view class="top-title">
      <view class="title-content">
        <!-- 返回 -->
        <navigator open-type="navigateBack">
          <u-icon
            color="#006848"
            name="arrow-left"
            class="arrow-back"
            size="20"
          ></u-icon>
        </navigator>
        <view class="title"><text>我的团队</text></view>
      </view>
    </view>

    <!-- 顶部背景图 -->
    <view class="app-top-background myteam">
      <cover-image
        src="https://mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_top_bg.png"
      ></cover-image>
    </view>

    <!-- 顶部版块 -->
    <view class="top-wrapper">
      <!-- 团队信息 -->
      <view class="info">
        <view class="info-name">
          <text class="name text-ellipse">烈性小鸟队</text>
          <view class="team-btn">
            <button>邀请</button>
            <button>退团</button>
          </view>
        </view>
        <view class="info-gender">
          <view class="image">
            <cover-image
              src="https://mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/male.png"
            ></cover-image
          ></view>
          <view class="image">
            <cover-image
              src="https://mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/female.png"
            ></cover-image>
          </view>
          <text>S码</text>
        </view>

        <!-- 头像 -->
        <view class="info-avatar">
          <u-row>
            <u-col :span="4.5">
              <view class="avatar">
                <cover-image
                  src="https://cdn.uviewui.com/uview/album/1.jpg"
                ></cover-image>
              </view>
            </u-col>
            <u-col :span="7.5">
              <view class="right">
                <view>
                  <view class="name row-box">
                    <text>名称</text>
                    <text>肖战</text>
                    <text>王一博</text>
                  </view>
                  <view class="role row-box">
                    <text>成员</text>
                    <text>副队长</text>
                    <text>队长</text>
                  </view>
                </view>
                <view class="data-box">
                  <view class="row-box">
                    <text class="num">4968</text>
                    <text class="num">4968</text>
                  </view>
                  <view class="row-box">
                    <text>总人数</text>
                    <text>积分</text>
                    <navigator url="/pages/ediInfo/index">
                      <view class="info-edit"><text>信息编辑</text></view>
                    </navigator>
                  </view>
                </view>
              </view>
            </u-col>
          </u-row>
        </view>

        <!-- 简介 -->
        <view class="info-introduce">
          <text
            >河南省洛阳栾川老君山·鸡冠洞旅游区由老君山景区和鸡冠洞景区组成</text
          >
        </view>
      </view>

      <!-- 功能区 -->
      <view class="feature-wrapper">
        <u-row>
          <u-col :span="3" v-for="(item, index) in features" :key="item.name">
            <view class="feature-item">
              <view>
                <cover-image class="icon-image" :src="item.icon"></cover-image>
              </view>
              <text>{{ item.name }}</text>
            </view>
          </u-col>
        </u-row>
      </view>
    </view>

    <!-- 活动列表 -->
    <view class="activity-group">
      <view class="activity-item" v-for="(item, index) in list" :key="index">
        <cover-image
          class="item-bg"
          src="https://mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_bg.png"
        ></cover-image>
        <view class="activity-content">
          <view class="left">
            <view class="image">
              <cover-image :src="item.url"></cover-image>
            </view>
          </view>
          <view class="right">
            <view class="title"
              ><text>{{ item.name }}</text></view
            >
            <view class="place"
              ><text>活动地点：</text
              ><text class="place-name">{{ item.place }}</text></view
            >
            <view class="date-box">
              <view>活动时间：</view>
              <view class="date">
                <view class="date1">{{ item.date1 }}</view>
                <view class="date2">{{ item.date2 }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="btn-wrapper">
          <button>邀请好友</button>
          <button>报名列表</button>
          <button>立即报名</button>
        </view>
        <view v-if="index != list.length - 1">
          <cover-image
            class="decor left-decor"
            src="https://mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"
          ></cover-image>
          <cover-image
            class="decor right-decor"
            src="https://mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"
          ></cover-image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          name: "发起活动",
          icon: "//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/activity.png",
        },
        {
          name: "排行榜",
          icon: "//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/rankings.png",
        },
        {
          name: "成员列表",
          icon: "//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/member.png",
        },
        {
          name: "服装商城",
          icon: "//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/mall.png",
        },
      ],
      list: [
        {
          date1: "2022.05.12 13:00",
          date2: "2022.05.12 21:00",
          name: "夏令营夜爬老君山",
          place: "老君山",
          url: "//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png",
        },
        {
          date1: "2022.05.12 13:00",
          date2: "2022.05.12 21:00",
          name: "夏令营夜爬老君山",
          place: "老君山",
          url: "//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png",
        },
        {
          date1: "2022.05.12 13:00",
          date2: "2022.05.12 21:00",
          name: "夏令营夜爬老君山",
          place: "老君山",
          url: "//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  font-size: 28px;
  color: #a7afaf;
}
.app-top-background {
  height: 364px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
.top-title {
  position: fixed;
  top: 60px;
  width: 90%;
  color: #006848;
  font-size: 36px;
  .title-content {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .arrow-back {
    font-size: 36px;
  }
  .title {
    flex: 1;
    text-align: center;
  }
}
.top-wrapper {
  width: 690px;
  height: 658px;
  border-radius: 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1);
  margin-top: 250px;
  overflow: hidden;
  .info {
    padding: 50px 40px 20px 50px;
    .info-name {
      display: flex;
      flex-direction: space-between;
      .name {
        flex: 1;
        font-size: 38px;
        font-weight: bold;
        color: #2a2a2a;
      }
      .team-btn {
        button {
          display: inline-block;
          height: 66px;
          line-height: 60px;
          padding: 0 25px 0 30px;
          font-size: 28px;
          color: #f2fcfa;
          letter-spacing: 10px;
          text-align: center;
          border-radius: 39px;
          border: 1px solid #ffffff;
          &:nth-child(1) {
            background: rgba(255, 81, 42, 0.8);
            box-shadow: 0px 7px 25px 0px #ffcc94;
          }
          &:nth-child(2) {
            background: rgba(163, 158, 153, 0.8);
            box-shadow: 0px 7px 25px 0px #b3b1ac;
            margin-left: 50px;
          }
        }
      }
    }
    .info-gender {
      display: flex;
      flex-direction: row;
      .image {
        width: 30px;
        height: 30px;
        &:nth-child(2) {
          margin-left: 26px;
          margin-right: 58px;
        }
      }
    }
    .info-avatar {
      margin-top: 18px;
      .avatar {
        width: 190px;
        height: 190px;
        border-radius: 50%;
        margin-right: 53px;
        overflow: hidden;
      }
      .data-box {
        position: relative;
      }
      .row-box {
        line-height: 40px;
        &:last-child {
          margin-top: 10px;
        }
        text {
          display: inline-block;
          width: 30%;
          text-align: center;
        }
        .num {
          font-size: 36px;
          font-weight: bold;
          color: #17aa7d;
        }
        .info-edit {
          position: absolute;
          top: 50%;
          right: -40px;
          transform: translateY(-50%);
          width: 150px;
          height: 55px;
          line-height: 55px;
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          text-align: center;
          background: #17aa7d;
          box-shadow: 0px 2px 4px 0px rgba(23, 170, 125, 0.6);
          border-radius: 100px 0px 0px 100px;
        }
      }
      .name {
        color: #2a2a2a;
        font-weight: 600;
      }
      .role {
        margin: 10px 0 40px;
      }
    }
    .info-introduce {
      font-size: 26px;
      color: #a5a6ae;
      margin: 20px 0 10px;
      line-height: 42px;
    }
  }
  .feature-wrapper {
    height: 125px;
    padding: 20px 50px;
    background: rgba(227, 234, 232, 0.22);
    .feature-item {
      text-align: center;
    }
    .icon-image {
      display: inline-block;
      width: 30px;
      height: 30px;
      overflow: hidden;
      margin-bottom: 10px;
    }
  }
}
.activity-group {
  .activity-item {
    position: relative;
    padding: 0 30px 75px;
    margin: 20px -23px 0;
    background: url("https://mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_bg.png")
      cover no-repeat;
    .item-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: -1;
    }
    .decor {
      position: absolute;
      width: 18px;
      height: 108px;
      bottom: -15px;
      &.left-decor {
        left: 35px;
      }
      &.right-decor {
        right: 35px;
      }
    }
  }
  .activity-content {
    display: flex;
    flex-direction: row;
    padding: 36px 40px 55px 30px;
    .left {
      margin-right: 25px;
      .image {
        width: 224px;
        height: 224px;
        border-radius: 13px;
        background: #d8d8d8;
      }
    }
    .right {
      font-size: 28px;
      color: #a7afaf;
      .title {
        color: #2a2a2a;
        font-size: 34px;
        font-weight: 600;
        margin-bottom: 30px;
      }
      .place-name {
        color: #2a2a2a;
      }
      .date-box {
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        white-space: nowrap;
        .date {
          white-space: nowrap;
        }
      }
    }
  }
  .btn-wrapper {
    text-align: center;
    padding: 18px;
    button {
      display: inline-block;
      margin-right: 28px;
      width: 180px;
      height: 55px;
      line-height: 55px;
      border-radius: 32px;
      font-size: 30px;
      color: #fff;
      &:nth-child(1) {
        background: #17aa7d;
      }
      &:nth-child(2) {
        background: #74b9fd;
      }
      &:nth-child(3) {
        background: #f8ab52;
        margin-right: 0;
      }
    }
  }
}
</style>
