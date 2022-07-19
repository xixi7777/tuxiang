<template>
  <view class="activity-container">
    <top title="发起活动" />

    <view class="form-wrapper">
      <scroll-view scroll-y="true" class="scroll-Y scroll-view">
        <view class="form">
          <u-form
            labelPosition="left"
            :model="userInfo"
            :rules="rules"
            ref="form1"
            labelWidth="90"
          >
            <u-form-item
              label="活动名称"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_activity_name.png"
            >
              <u-input
                type="text"
                v-model="activityInfo.name"
                placeholder="请输入活动名称"
              />
            </u-form-item>
            <u-form-item
              label="活动地点"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_place.png"
            >
              <u-input
                type="text"
                v-model="place"
                placeholder="请输入活动地点"
              />
            </u-form-item>
            <u-form-item
              label="活动天数"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_days.png"
            >
              <u-input
                type="text"
                v-model="place"
                placeholder="请输入活动天数"
              />
            </u-form-item>
            <u-form-item
              label="截止时间"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_end_time.png"
            >
              <u-input
                type="text"
                v-model="place"
                placeholder="请输入截止时间"
              />
            </u-form-item>
            <u-form-item
              label="人数要求"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_member_num.png"
            >
              <u-input
                type="text"
                v-model="place"
                placeholder="请输入人数要求"
              />
            </u-form-item>
            <u-form-item
              label="关联活动"
              leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_connected.png"
            >
              <u-input type="text" v-model="place" placeholder=" ">
                <template slot="suffix">
                  <navigator>
                    <image
                      src="//mall-lyxcx/front_end/icon/arrow-right.png"
                    ></image>
                  </navigator>
                </template>
              </u-input>
            </u-form-item>
          </u-form>
        </view>
      </scroll-view>

      <button @click="submit" class="btn-submit">确定</button>
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
      activityInfo: {
        name: '',
        place: '',
        days: '',
        endTime: '', //截止时间
        memberNum: '',
      },
      rules: {
        name: [
          {
            type: 'string',
            required: true,
            message: '请输入',
            trigger: ['blur'],
          },
        ],
        place: [
          {
            type: 'string',
            required: true,
            message: '请输入',
            trigger: ['blur'],
          },
        ],
        days: [
          {
            required: true,
            message: '请输入',
            trigger: ['blur'],
          },
        ],
        endTime: [
          {
            type: 'string',
            required: true,
            message: '请输入',
            trigger: ['blur'],
          },
        ],
        memberNum: [
          {
            required: true,
            message: '请输入',
            trigger: ['blur'],
          },
        ],
      },
    };
  },
  mounted() {
    this.$refs.form1.setRules(this.rules);
  },
  methods: {
    submit() {
      this.$refs.form1
        .validate()
        .then((res) => {
          uni.$u.toast('校验通过');
        })
        .catch((errors) => {
          // uni.$u.toast("内容有误噢");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.activity-container {
  position: fixed;
  width: 100%;
  height: 100%;
  .bg {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 175px;
    background: linear-gradient(to bottom, #a1f5e2 0%, #eaf6f5 100%);
    border-radius: 0px 0px 0px 50px;
  }
  .form-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 155px 30px 50px;
    .scroll-view {
      height: 830px;
    }
    .form {
      background: linear-gradient(
        335deg,
        rgba(255, 255, 255, 0) 0%,
        #ffffff 100%
      );
      box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1);
      border-radius: 30px;
      padding: 30px 25px 40px;
    }
    .btn-submit {
      position: absolute;
      bottom: 50px;
      width: 690px;
      height: 100px;
      border-radius: 60px;
      background: #17aa7d;
      font-size: 32px;
      line-height: 100px;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
