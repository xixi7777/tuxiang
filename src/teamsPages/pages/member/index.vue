<template>
  <view class="member-container">
    <top title="成员管理" />
    <search @confirm="searchConfirm" />

    <view class="member-wrap">
      <scroll-view scroll-y="true" show-scrollbar="true">
        <view class="list">
          <view class="list-title">
            <view class="left"><text class="text">成员列表</text></view>
          </view>

          <view class="list-content">
            <view class="item item-title">
              <view class="text__wrapper"><text>姓名</text></view>
              <view class="text__wrapper text-right"><text>职位</text></view>
            </view>
            <u-swipe-action>
              <u-swipe-action-item
                :options="options"
                v-for="(item, index) in list"
                :disabled="item.positionId != 'team_leader'"
                :key="index"
                @click="remove(item, index)"
              >
                <view class="item item-con">
                  <view class="text__wrapper"><text class="left">{{ item.nickName }}</text></view>
                <view class="text__wrapper text-right"><text>{{ item.positionId_dictLabel }}</text></view>
                </view>
              </u-swipe-action-item>
            </u-swipe-action>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import Top from '@/components/top/Top';
import Search from '@/components/pageSearch/PageSearch';
import { mapGetters } from 'vuex';
export default {
  components: {
    Top,
    Search,
  },
  data() {
    return {
      list: [],
      dzid: '',
      edit: false,
      query: {
        teamId: '',
        nickname: ''
      }
    }
  },
  onLoad(option) {
    this.query.teamId = option.teamId
    this.dzid = option.dzid
  },
  computed: {
    ...mapGetters(['userInfo']),
    options() {
      if (this.dzid != this.userInfo.id) {
        return []
      }
      return [
        {
					icon: 'minus',
					style: {
						backgroundColor: '#e45656',
						borderRadius: '50%',
            padding: '6px',
            width: '16px',
            height: '16px',
            marginLeft: '16px'
					}
        }
      ]
    }
  },
  methods: {
    getMembers() {
      this.$api.memberList(this.query).then(res => {
        this.list = res.rows
      })
    },
    searchConfirm(search) {
      this.query.nickname = search
    },
    remove(user, index) {
      uni.showModal({
        title: '温馨提示',
        content: '确定要移除此人吗？',
        success: res => {
          if (res.confirm) {
            this.$api.removeMember({
              loginUserId: this.userInfo.id,
              userId: user.id,
              teamId: this.query.teamId
            }).then(res => {
              this.list.splice(index, 1)
            })
          }
        }
      })
    }
  },
  watch: {
    query: {
      immediate: true,
      deep: true,
      handler(n) {
        if (n.teamId) {
          this.getMembers()
        }
      }
    }
  }
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

.member-container {}

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

.list-content {
  .item {
    height: 80px;
    align-items: center;
    .text__wrapper {
      text-align: left;
      flex: 1;
      line-height: 50px;
      &.text-right {
        text-align: right;
      }
    }
    .text__icon {
      width: 100px;
      /deep/ .u-icon {
        float: right;
      }
    }
  }
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
