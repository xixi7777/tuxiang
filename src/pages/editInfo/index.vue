<template>
  <view class="edit-container">
    <view class="bg"></view>
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
        <view class="title"><text>信息编辑</text></view>
      </view>
    </view>
    <view class="form-wrapper">
      <view class="form">
        <u-form
          labelPosition="left"
          :model="userInfo"
          :rules="rules"
          ref="form1"
          labelWidth="85"
        >
          <u-form-item
            label="真实姓名"
            prop="name"
            leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png"
          >
            <u-input v-model="userInfo.name" placeholder="请输入真实姓名" />
          </u-form-item>

          <u-form-item
            label="手机号"
            prop="phone"
            leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png"
          >
            <u-input v-model="userInfo.phone" placeholder="请输入手机号" />
          </u-form-item>

          <u-form-item
            label="性别"
            prop="gender"
            leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_gender.png"
          >
            <u-input v-model="userInfo.gender" placeholder="请输入手机号" />
          </u-form-item>
          <u-form-item
            label="尺码"
            prop="size"
            leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_size.png"
          >
            <u-input v-model="userInfo.size" placeholder="请输入尺码" />
          </u-form-item>
        </u-form>
      </view>
      <view @click="submit" class="btn-submit">提交</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "",
        phone: "",
        gender: "",
        size: "",
      },
      rules: {
        name: [
          {
            type: "string",
            required: true,
            message: "请输入真实姓名",
            trigger: ["blur"],
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["change", "blur"],
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // uni.$u.test.mobile()就是返回true或者false的
              return uni.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            // 触发器可以同时用blur和change
            trigger: ["change", "blur"],
          },
        ],
        gender: [
          {
            max: 1,
            type: "string",
            required: true,
            message: "请输入性别",
            trigger: ["blur"],
          },
        ],
        size: [
          {
            type: "string",
            required: true,
            message: "请输入尺码",
            trigger: ["blur"],
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form1
        .validate()
        .then((res) => {
          uni.$u.toast("校验通过");
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
        });
    },
  },
};
</script>

<style lang="scss">
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
  // .arrow-back {
  //   font-size: 30px;
  // }
  .title {
    flex: 1;
    text-align: center;
  }
}
.edit-container {
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
