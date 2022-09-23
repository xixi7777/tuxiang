<template>
  <view class="app-container activity-container">
    <top title="发起活动" />

    <view class="form-wrapper">
      <view class="form">
          <u-form
            labelPosition="left"
            :model="form"
            :rules="rules"
            ref="uForm"
            labelWidth="120"
          >
            <u-form-item prop="image">
              <view class="upload-avatar" @click="uploadImage">
                <image class="image" :src="uploadUrl" mode="aspectFill" lazy-load></image>
                <text class="text text-sm">上传活动图片</text>
              </view>
            </u-form-item>
            <u-form-item
              label="关联活动"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_connected.png"
              prop="cpbh"
            >
              <view class="picker-input no-border" @click="showProductList">{{ productName }} <u-icon name="arrow-right"></u-icon> </view>
            </u-form-item>
            <u-form-item
              label="活动名称"
              prop="name"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_activity_name.png"
            >
              <u-input
                type="text"
                v-model="form.name"
              />
            </u-form-item>
            <!-- <u-form-item
              label="活动地点"
              prop="address"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_place.png"
            >
              <u-input
                type="text"
                v-model="form.address"
              />
            </u-form-item> -->
            <u-form-item
              label="开始时间"
              prop="beginTime"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_days.png"
            >
              <view class="picker-input no-border" @click="beginTimeShow = true">{{ form.beginTime }}</view>
              <u-datetime-picker
                :show="beginTimeShow"
                :minDate="new Date(moment().add(1, 'd').format('YYYY-MM-DD')).getTime()"
                @cancel="beginTimeShow = false"
                @confirm="confirmBeginTime"
                mode="date"
              ></u-datetime-picker>
            </u-form-item>
            <u-form-item
              label="结束时间"
              prop="finishTime"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_end_time.png"
            >
              <view class="picker-input no-border" @click="finishTimeShow = true">{{ form.finishTime }}</view>
              <u-datetime-picker
                :show="finishTimeShow"
                :minDate="new Date(moment(form.beginTime).add(1, 'd').format('YYYY-MM-DD')).getTime()"
                @cancel="finishTimeShow = false"
                @confirm="confirmFinishTime"
                mode="date"
              ></u-datetime-picker>
            </u-form-item>
            <u-form-item
              label="报名截止时间"
              prop="deadlineTime"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_end_time.png"
            >
              <view class="picker-input no-border" @click="deadlineTimeShow = true">{{ form.deadlineTime }}</view>
              <u-datetime-picker
                :show="deadlineTimeShow"
                :minDate="new Date(moment().format('YYYY-MM-DD')).getTime()"
                :maxDate="new Date(moment(form.beginTime).add(-1, 'd').format('YYYY-MM-DD')).getTime()"
                @cancel="deadlineTimeShow = false"
                @confirm="confirmDeadlineTime"
                mode="date"
              ></u-datetime-picker>
            </u-form-item>
            <u-form-item
              label="人数要求"
              prop="headcount"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_member_num.png"
            >
              <u-input
                type="number"
                v-model="form.headcount"
              />
            </u-form-item>
          </u-form>
      </view>
    </view>

    <view class="bottom-btn">
      <u-button shape="circle" type="primary" @click="submit" class="btn-submit">确定</u-button>
    </view>

    <u-popup :show="productShow" mode="bottom"  @close="productShow = false">
      <view class="top-tools flex-box space-between">
        <view><text class="text-disabled" @click="productShow = false">取消</text></view>
        <view><text class="text-blue" @click="confirmPicker">确定</text></view>
      </view>
      <view class="picker-data__wrapper">
        <u-search placeholder="搜索" @search="searchProduct" :showAction="false"></u-search>
        <picker-view @change="pickerHandleChange" indicator-class="indicator-class">
          <picker-view-column class="picker-column">
            <view v-for="pro in productList" :key="pro.keyId" class="picker-item text-ellipsis">{{ pro.keyName}}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import Top from '@/components/top/Top';
import { mapGetters } from 'vuex';
import config from '@/utils/config'
import moment from 'moment'
export default {
  components: {
    Top,
  },
  data() {
    return {
      beginTimeShow: false,
      finishTimeShow: false,
      deadlineTimeShow: false,
      productShow: false,
      productList: [],
      productName: '',
      productSearch: '',
      pickedPro: {},
      form: {
        image: '',
        userId: '',
        teamId: '',
        name: '',
        info: '',
        address: '',
        beginTime: '',
        finishTime: '',
        deadlineTime: '',
        headcount: '',
        cpbh: ''
      },
      rules: {
        image: [
          {
            type: 'string',
            required: false,
            message: '请上传活动图片',
            trigger: ['change'],
          }
        ],
        name: [
          {
            type: 'string',
            required: true,
            message: '请输入活动名称',
            trigger: ['blur'],
          }
        ],
        // address: [
        //   {
        //     type: 'string',
        //     required: true,
        //     message: '请输入活动地点',
        //     trigger: ['blur'],
        //   }
        // ],
        beginTime: [
          {
            type: 'string',
            required: true,
            message: '请输入开始时间',
            trigger: ['blur'],
          }
        ],
        finishTime: [
          {
            type: 'string',
            required: true,
            message: '请输入截止时间',
            trigger: ['blur'],
          }
        ],
        deadlineTime: [
          {
            type: 'string',
            required: true,
            message: '请输入报名截止时间',
            trigger: ['blur'],
          }
        ],
        headcount: [
          {
            required: false,
            message: '请输入人数要求',
            trigger: ['blur'],
          }
        ],
        cpbh: [
          {
            required: true,
            message: '请选择产品',
            trigger: ['blur'],
          }
        ]
      }
    }
  },
  onLoad(option) {
    this.form.teamId = option.teamId
  },
  computed: {
    ...mapGetters(['userInfo']),
    uploadUrl() {
      if (this.form.image) {
        return this.form.image
      }
      return '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/upload_avatar.png'
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    moment,
    getProducts(keyname = '') {
      this.$api.activityProduct({ keyname }).then(res => {
        this.productList = res.data
      })
    },
    confirmBeginTime(e) {
      this.form.beginTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
      this.beginTimeShow = false
    },
    confirmFinishTime(e) {
      this.form.finishTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
      this.finishTimeShow = false
    },
    confirmDeadlineTime(e) {
      this.form.deadlineTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
      this.deadlineTimeShow = false
    },
    uploadImage() {
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          const tempFilePaths = res.tempFilePaths;
          wx.uploadFile({
              url: `${config.httpUrl}/file/upload/uploadFile`,
              filePath: tempFilePaths[0],
              name: 'file',
              success: uploadFileRes => {
                const res = JSON.parse(uploadFileRes.data)
                this.form.image = res.data.url
              },
              fail: err => {
                console.log(err)
              }
          });
        },
        fail: error => {
          console.log(error)
        }
      })
    },
    submit() {
      this.$refs.uForm
        .validate()
        .then((res) => {
          let params = {
            ...this.form,
            userId: this.userInfo.id
          }
          this.$api.addActivity(params).then(res => {
            uni.navigateTo({ url: '/teamsPages/pages/myTeam/index' })
          })
        })
        .catch((errors) => {
          uni.$u.toast('请完善活动信息！');
        });
    },
    showProductList() {
      this.productShow = true
    },
    confirmPicker() {
      this.form.cpbh = this.pickedPro.keyid;
      this.productName = this.pickedPro.keyName;
      this.form.name = this.productName
      this.form.image = this.pickedPro.imageUrl ? this.pickedPro.imageUrl.split(',')[0] : ''
      this.productShow = false
    },
    searchProduct(search) {
      this.getProducts(search)
    },
    pickerHandleChange(evt) {
      const { detail } = evt
      const idx = detail.value[0]
      this.pickedPro = this.productList[idx]
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .top {
  padding: 120px 30px 60px 30px !important;
  border-radius: 0px 0px 0px 50px;
  .back-icon {
    top: 120px !important;
  }
}
.activity-container {
  .form-wrapper {
    box-sizing: border-box;
    width: 100%;
    padding: 200px 30px 200px 30px;
    background: linear-gradient(
      335deg,
      rgba(255, 255, 255, 0) 0%,
      #ffffff 100%
    );
    box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1);
    border-radius: 30px;
    .form {
      position: relative;
      padding: 30px 25px 40px;
    }
    /deep/ .u-input {
      padding-left: 0 !important;
    }
    .upload-avatar {
      padding: 0;
    }
  }
}
.text-sm {
  font-size: 28px;
}
.top-tools {
  padding: 16px 50px;
}
.picker-data__wrapper {
  margin-top: 30px;
  padding: 16px 50px;
}
.picker-item {
  height: 80px;
  line-height: 80px;
  text-align: center;
  width: 100%;
}
.picker-column {
  height: 400px;
}
/deep/ .indicator-class {
  height: 80px;
  line-height: 80px;
}
</style>
