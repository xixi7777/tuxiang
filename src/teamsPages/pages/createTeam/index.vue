<template>
  <view class="team-container">
    <top title="创建团队" />

    <view class="form-wrapper">
        <!-- upload -->
        <view class="form upload-avatar" @click="uploadImage">
            <image class="image" :src="avatarUrl" mode="scaleToFill"></image>
          <text class="text">上传头像</text>
          <!-- <u-upload
            :fileList="fileList"
            @afterRead="afterRead"
            @delete="deletePic"
            name="avatar"
            :previewFullImage="true"
            width="690"
            height="250"
            :maxCount="1"
          >
            <image
              v-if="!fileList.length"
              class="image"
              src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/upload_avatar.png"
              mode="widthFix"
            ></image>
          </u-upload> -->
        </view>

          <u-form
            labelPosition="left"
            :model="teamInfo"
            :rules="rules"
            ref="uForm"
            labelWidth="85"
          >
          <!-- 队伍名称等基本信息 -->
          <view class="form">
              <u-form-item
                label="队伍名称"
                prop="title"
                leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_team_name.png"
              >
                <u-input
                  type="text"
                  v-model="teamInfo.title"
                  placeholder="请输入队伍名称"
                />
              </u-form-item>
              <u-form-item
                label="队长姓名"
                prop="dzid"
                leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_team_leader.png"
              >
                <u-input
                  type="text"
                  v-model="teamInfo.dzid"
                  placeholder="请输入队长姓名"
                />
              </u-form-item>
              <u-form-item
                label="所在地区"
                prop="szdq"
                leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_place.png"
              >
                <u-input
                v-model="teamInfo.szdq"
                  placeholder="请填写所在地区">
                  <!-- <template slot="suffix"> -->
                    <!-- <u-icon name="arrow-right" color="#595757;"></u-icon> -->
                  <!-- </template> -->
                </u-input>
              </u-form-item>
              <u-form-item
                label="手机号"
                prop="dzsjh"
                leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png"
              >
                <u-input
                  type="number"
                  v-model="teamInfo.dzsjh"
                  placeholder="请输入手机号"
                />
              </u-form-item>
          </view>

          <!-- 队伍简介 -->
          <view class="form block-label__form">
              <u-form-item
                label="队伍简介"
                prop="note"
                leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/dingdanorder.png"
              >
                <u-textarea
                  class="intro"
                  v-model="teamInfo.note"
                  placeholder="请输入队伍简介"
                ></u-textarea>
              </u-form-item>
            <!-- </u-form> -->
          </view>

          <!-- 进队要求 -->
          <view class="form block-label__form">
              <u-form-item
                label="进队要求"
                prop="jdyq"
                leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/dingdanorder.png"
              >
                <u-radio-group
                  placement="column"
                  v-model="teamInfo.jdyq"
                  iconPlacement="right"
                  @change="radioChange"
                >
                  <view v-for="item in joinTeamTypes" :key="item.name">
                    <u-radio
                      :label="item.label"
                      :name="item.name"
                      activeColor="#55C6A6"
                      inactiveColor="#D8D8D8"
                      backgroundColor="#D8D8D8"
                      class="radio"
                      :customStyle="{ marginBottom: '5px', marginTop: '5px' }"
                      iconSize="13px"
                      labelSize="13px"
                    >
                    </u-radio>
                    <template v-if="item.name == 1 && teamInfo.jdyq === 1">
                      <u-input
                        type="password"
                        v-model="teamInfo.mima"
                        placeholder="请输入密码"
                        @input="pwdInput"
                      ></u-input>
                      <text v-if="showError" class="pwd-error">请填写进队密码</text>
                    </template>
                  </view>
                </u-radio-group>
              </u-form-item>
          </view>
        </u-form>
      <button @click="submit" class="btn-submit">提交申请</button>
    </view>
  </view>
</template>

<script>
import Top from '@/components/top/Top';
import { httpUrl } from '@/utils/config'
export default {
  components: {
    Top
  },
  data() {
    return {
      fileList: [],
      avatarUrl: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/upload_avatar.png',
      showError: false,
      teamInfo: {
        logo: '',
        title: '',
        note: '',
        dzid: '',
        dzsjh: '',
        szdq: '',
        jdyq: 0,
        mima: '',
        remark: ''
      },
      joinTeamTypes: [
        {
          label: '任何人可加入',
          name: 0
        },
        {
          label: '输入团队密码加入',
          name: 1
        },
        {
          label: '仅限团队邀请加入',
          name: 2
        },
      ],
      rules: {
        logo: [
          {
            required: true,
            message: '请上传团队logo',
            trigger: ['blur']
          }
        ],
        title: [
          {
            type: 'string',
            required: true,
            message: '请输入团队名称',
            trigger: ['blur'],
          },
        ],
        dzid: [
          {
            type: 'string',
            required: true,
            message: '请输入队长姓名',
            trigger: ['blur'],
          },
        ],
        szdq: [
          {
            required: true,
            message: '请填写所在地区',
            trigger: ['blur'],
          },
        ],
        dzsjh: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['blur'],
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: '手机号码不正确',
            trigger: ['input'],
          },
        ],
        mima: [
          {
            required: false,
            message: '请输入进队密码',
            trigger: ['blur']
          }
        ]
      }
    };
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.fileList.splice(event.index, 1);
    }, 
    // 新增图片
    async afterRead(event) {
      console.log(event)
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this.fileList.length;
      lists.map((item) => {
        this.fileList.push({
          ...item,
          status: 'uploading',
          message: '上传中',
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        console.log(result)
        let item = this.fileList[fileListLen];
        this.fileList.splice(
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
          url: `${httpUrl}/file/upload/uploadFile`, // 仅为示例，非真实的接口地址
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
    uploadImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: res => {
          var filePath = res.tempFilePaths[0];
          uni.uploadFile({
              url: `${httpUrl}/file/upload/uploadFile`,
              filePath,
              name: 'file',
              formData: {
                  'user': 'test'
              },
              success: uploadFileRes => {
                  console.log(uploadFileRes.data);
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
    radioChange(name) {
      this.teamInfo.jdyq = name
      if (name !== 1) {
        this.teamInfo.mima = ''
        this.showError = false
      }
      if (name === 1) {
        this.rules.mima[0].required = true
      } else {
        this.rules.mima[0].required = false
      }
    },
    pwdInput(value) {
      this.teamInfo.mima = value.trim()
      if (this.teamInfo.mima !== '') this.showError = false
    },
    // 提交申请
    submit() {
      this.$refs.uForm.validate().then(res => {
        if (this.teamInfo.jdyq === 1 && this.teamInfo.mima == '') {
          this.showError = true
          return
        }
        this.$u.toast('success')
      }).catch(err => {
        this.$u.toast('请完善信息')
      })
    }
  },
};
</script>

<style lang="scss" scope>
/deep/ .top {
  // padding: 70px 30px 60px 30px !important;
  // border-radius: 0px 0px 0px 50px;
  // transform: translateZ(1px);

  // .back-icon {
  //   top: 70px !important;
  // }
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
    display: flex;
    // /deep/ .u-upload {
    //   flex-direction: row !important;
    // }

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
.pwd-error {
  color: #f56c6c;
  font-size: 24px;
}
.block-label__form {
  /deep/ .u-form-item__body {
    display: block !important;
    .u-form-item__body__left {
      width: 100% !important;
      margin-bottom: 20px !important;
    }
    .u-form-item__body__right__message {
      margin-left: 0 !important;
    }
  }
}
</style>
