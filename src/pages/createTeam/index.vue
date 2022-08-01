<template>
  <view class="team-container">
    <top title="创建团队" />

    <view class="form-wrapper">
      <!-- upload -->
      <view class="form upload-avatar">
        <text class="text">上传头像</text>
        <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="avatar"
          :previewFullImage="true" width="690" height="250">
          <image class="image" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/upload_avatar.png"
            mode="widthFix"></image>
        </u-upload>
      </view>

      <!-- 队伍名称等基本信息 -->
      <view class="form">
        <u-form labelPosition="left" :model="teamInfo" :rules="rules" ref="form1" labelWidth="85">
          <u-form-item label="队伍名称" prop="name"
            leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_team_name.png">
            <u-input type="text" v-model="name" placeholder="请输入队伍名称" />
          </u-form-item>
          <u-form-item label="队长姓名" prop="leader"
            leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_team_leader.png">
            <u-input type="text" v-model="leader" placeholder="请输入队长姓名" />
          </u-form-item>
          <u-form-item label="所在地区" prop="region"
            leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_place.png">
            <u-input disabled disabledColor="#ffffff" placeholder="请选择" @click="
  showRegion = true;
hideKeyboard();
textRegion();
            ">
              <template slot="suffix">
                <u-icon name="arrow-right" color="#595757;"></u-icon>
              </template>
            </u-input>
          </u-form-item>
          <u-form-item label="手机号" prop="phone"
            leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png">
            <u-input type="number" v-model="userInfo.phone" placeholder="请输入手机号" />
          </u-form-item>
        </u-form>

        <u-action-sheet :show="showRegion" :actions="actions" title="请选择所在地区" @close="showRegion = false"
          @select="regionSelect">
        </u-action-sheet>
      </view>

      <!-- 队伍简介 -->
      <view class="form">
        <u-form labelPosition="top" labelWidth="100">
          <u-form-item label="队伍简介" prop="phone"
            leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/dingdanorder.png">
            <u-textarea class="intro" v-model="intro" placeholder="请输入队伍简介"></u-textarea>
          </u-form-item>
        </u-form>
      </view>

      <!-- 进队要求 -->
      <view class="form">
        <u-form labelPosition="top" labelWidth="100">
          <u-form-item label="进队要求" prop="phone"
            leftIcon="https://mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_team_require.png">
            <u-radio-group placement="column" v-model="require" iconPlacement="right">
              <template v-for="(item, index) in radiolist1">
                <u-radio :key="index" :label="item.name" :name="item.name" activeColor="#55C6A6" inactiveColor="#D8D8D8"
                  backgroundColor="#D8D8D8" class="radio" :customStyle="{ marginBottom: '5px', marginTop: '5px' }"
                  iconSize="13px" labelSize="13px">
                </u-radio>
                <u-input v-if="item.name == '输入团队密码加入'" type="password" placeholder="请输入密码"></u-input>
              </template>
            </u-radio-group>
          </u-form-item>
        </u-form>
      </view>

      <view class="btn-box">
        <button @click="submit" class="btn-submit">提交申请</button>
      </view>
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
      fileList1: [],
      showRegion: false,
      teamInfo: {
        name: '',
        leader: '',
        region: '',
        phone: '',
      },
      intro: '', //队伍简介
      radiolist1: [
        {
          name: '任何人可加入',
          disabled: false,
        },
        {
          name: '输入团队密码加入',
          disabled: false,
        },
        {
          name: '仅限团队邀请加入。',
          disabled: false,
        },
      ],
      rules: {
        name: [
          {
            type: 'string',
            required: true,
            message: '请输入队伍名称',
            trigger: ['blur'],
          },
        ],
        leader: [
          {
            type: 'string',
            required: true,
            message: '请输入队长姓名',
            trigger: ['blur'],
          },
        ],
        region: [
          {
            required: true,
            message: '请选择地区',
            trigger: ['blur'],
          },
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['blur'],
          },
          {
            // 自定义验证函数
            validator: (rule, value, callback) => {
              // 返回true或者false的
              return uni.$u.test.mobile(value);
            },
            message: '手机号码不正确',
            trigger: ['blur'],
          },
        ],
      },
      actions: ['深圳', '厦门', '上海', '拉萨'],
    };
  },
  mounted() {
    this.$refs.form1.setRules(this.rules);
  },
  /**
* 监听页面滑动事件
*/
  onPageScroll: function (res) {
    uni.$emit('onPageScroll', res.scrollTop);
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    }, // 新增图片
    async afterRead(event) {
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: 'uploading',
          message: '上传中',
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: 'success',
            message: '',
            url: result,
          })
        );
        fileListLen++;
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
          filePath: url,
          name: 'file',
          formData: {
            user: 'test',
          },
          success: (res) => {
            setTimeout(() => {
              resolve(res.data.data);
            }, 1000);
          },
        });
      });
    },
    //选择所在地区
    regionSelect(e) {
      this.model1.teamInfo.region = e.name;
      this.$refs.form1.validateField('teamInfo.region');
    },
    textRegion() {
      console.log(11111111);
      console.log(this.showRegion);
    },
  },
};
</script>

<style lang="scss" scope>
/deep/ .top {
  // padding: 70px 30px 60px 30px !important;
  border-radius: 0px 0px 0px 50px;
  transform: translateZ(1px);

  .back-icon {
    top: 70px !important;
  }
}

.team-container {
  padding-bottom: 150px;

  .form-wrapper {
    position: relative;
    z-index: 100;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 155px 30px 50px;

    .form {
      position: relative;
      z-index: 100;
      background: linear-gradient(335deg,
          rgba(255, 255, 255, 0) 0%,
          #ffffff 100%);
      box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1);
      border-radius: 30px;
      padding: 30px 25px 40px;
      margin-bottom: 30px;
    }

    /deep/ .u-input {
      padding-left: 0 !important;
    }

    .btn-box {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
      padding: 50px 30px;
      background: #fff;
    }

    .btn-submit {
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

  .upload-avatar {
    padding: 75px 40px 50px;

    /deep/ .u-upload {
      flex-direction: row !important;
    }

    .image {
      width: 125px;
      height: 125px;
    }

    .text {
      position: absolute;
      top: 50%;
      left: 200px;
      transform: translateY(-50%);
      font-size: 36px;
      color: #080808;
    }
  }
}
</style>
