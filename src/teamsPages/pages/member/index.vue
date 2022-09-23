<template>
  <view class="member-container">
    <top title="成员管理"  />
    <search className="mt-90" @confirm="searchConfirm" />

    <view class="member-wrap">
      <scroll-view scroll-y="true" show-scrollbar="true">
        <view class="list">
          <view class="list-title">
            <view class="left"><text class="text">成员列表</text></view>
          </view>

          <view class="list-content">
            <view class="item item-title">
              <view class="text__wrapper"><text>姓名</text></view>
              <view class="text__wrapper"><text>职位</text></view>
              <view class="actions"></view>
            </view>
            <view class="item item-con" v-for="(item, index) in list" :key="index">
              <view class="text__wrapper text-ellipsis"><text class="left">{{ item.nickName }}</text></view>
              <view class="text__wrapper"><text>{{ item.positionId_dictLabel }}</text></view>
              <view class="actions">
                <template v-if="dzid == loginUserId || loginUserId == item.userId">
                  <u-icon name="trash" color="#fa3534" size="22" @click="remove(item, index)"></u-icon>
                  <u-icon name="edit-pen" color="#2979ff" size="22" @click="update(item, index)"></u-icon>
                </template>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <u-modal 
    :show="showEdit" 
    showCancelButton
    @cancel="showEdit = false" 
    @confirm="saveUpdate">
      <u-form 
      :model="editForm"
      :rules="rules"
      ref="uForm"
      >
        <u-form-item label="姓名" prop="nickName">
          <u-input v-model="editForm.nickName"></u-input>
        </u-form-item>
        <u-form-item label="职务" prop="positionId">
          <view 
            class="picker-input no-border" 
            @click="positionShow = true">{{ editForm.positionId_dictLabel }} 
            <u-icon name="arrow-right"></u-icon> 
          </view>
          <u-picker 
            :show="positionShow"
            :defaultIndex="pickDefaultIndex"
            :columns="[positionPickers]" 
            keyName="label"
            @cancel="positionShow = false" 
            @confirm="confirmPosition"></u-picker>
        </u-form-item>
      </u-form>
    </u-modal>
  </view>
</template>

<script>
import Top from '@/components/top/Top';
import Search from '@/components/pageSearch/PageSearch';
import { mapGetters } from 'vuex';
import _ from 'lodash'
export default {
  components: {
    Top,
    Search,
  },
  data() {
    return {
      list: [],
      positionList: [],
      dzid: '',
      showEdit: false,
      editForm: {
        nickName: '',
        positionId: ''
      },
      positionShow: false,
      pickDefaultIndex: [],
      query: {
        teamId: '',
        nickname: ''
      },
      rules: {
        positionId: [
          { required: true, message: '请选择职务' }
        ],
        nickName: [
          { required: true, message: '请输入名称' }
        ]
      }
    }
  },
  onLoad(option) {
    this.query.teamId = option.teamId
    this.dzid = option.dzid
    this.getPosition()
  },
  computed: {
    userInfo() {
      return JSON.parse(uni.getStorageSync('userInfo'))
    },
    loginUserId() {
      return _.get(this.userInfo, ['id'])
    },
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
    },
    positionPickers() {
      if (this.loginUserId == this.dzid) {
        return this.positionList
      }
      const list = _.cloneDeep(this.positionList)
      list.forEach((item, index) => {
        if (item.dictValue == 'team_leader') {
          list.splice(index, 1)
        }
      })
      return list
    }
  },
  methods: {
    getMembers() {
      this.$api.memberList(this.query).then(res => {
        this.list = res.rows
      })
    },
    getPosition() {
      this.$api.teamPosition().then(res => {
        this.positionList = res.data
      })
    },
    searchConfirm(search) {
      this.query.nickname = search
    },
    update(user, index) {
      this.showEdit = true
      this.editForm = {
        positionId: user.positionId,
        userId: user.userId,
        teamCode: user.teamCode,
        nickName: user.nickName,
        positionId_dictLabel: user.positionId_dictLabel,
        meId: this.loginUserId
      }
      const idx = this.positionList.findIndex(item => item.value == user.positionId)
      this.pickDefaultIndex = [idx]
    },
    confirmPosition(selector) {
      this.editForm.positionId = selector.value[0].value
      this.editForm.positionId_dictLabel = selector.value[0].label
      this.positionShow = false
    },
    saveUpdate() {
      this.$refs.uForm.validate().then(valid => {
        this.$api.manageMember(this.editForm).then(res => {
          uni.$u.toast('已修改')
          this.showEdit = false
          setTimeout(() => {
            this.getMembers()
          }, 800)
        })
      })
    },
    remove(user, index) {
      uni.showModal({
        title: '温馨提示',
        content: '确定要移除此人吗？',
        success: res => {
          if (res.confirm) {
            this.$api.removeMember({
              loginUserId: this.userInfo.id,
              userId: user.userId,
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
    'query.teamId': {
      immediate: true,
      deep: true,
      handler(n) {
        if (n) {
          this.getMembers()
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .top {
  padding: 120px 30px 180px 30px !important;

  .back-icon {
    top: 120px !important;
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
  top: 300px;
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
    // height: 80px;
    padding: 10px 0;
    align-items: center;
    .text__wrapper {
      text-align: left;
      line-height: 50px;
      &:nth-of-type(1) {
        width: 45%;
      }
      &.text-right {
        text-align: right;
      }
    }
    .actions {
        width: 130px;
        line-height: 50px;
        /deep/ .u-icon {
          float: right;
          margin-right: 10px;
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
.picker-input {
  padding-left: 20px;
}

</style>
