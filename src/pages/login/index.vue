<template>
    <view class="app-container">
        <view class="app-top-background"></view>
        <top background-color="transparent" title="登录" />
        <cover-image class="logo" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/logo.png"></cover-image>

        <button class="primary-button" shape="circle" @click="login">授权登录并获取手机号码</button>
        <!-- <button class="primary-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信一键登录</button> -->
        <view class="radio">
            <radio-group @change="handleChange" style="display: flex; align-items: center; justify-content: center;">
                <radio :value="true" color="#17AA7D"></radio>
                <view style="display: flex;">
                    我已阅读并同意
                    <view class="text-primary">
                        <navigator url="/otherPages/pages/policy/index?key=mall.system.policy" hover-class="navigator-hover-class">《途享旅程用户协议》</navigator>
                    </view>
                    <!-- <view class="text-primary ml-10">
                        <navigator url="/otherPages/pages/policy/index?type=policy" hover-class="navigator-hover-class"> 隐私政策</navigator>
                    </view> -->
                </view>
            </radio-group>
            <button @click="login" ref="getUserInfo" style="opacity: 0; width: 0, height: 1px;"></button>
        </view>

        <u-modal
			title="绑定手机号"
			:show="show"
			content="我们需要您的手机号码进行用户绑定"
			closeOnClickOverlay
			showCancelButton
		>
			<button
				slot="confirmButton"
				shape="circle"
                open-type="getPhoneNumber"  
                type="success"
                @getphonenumber="getPhoneNumber"
                class="phone-button"
			>获取手机号码</button>
		</u-modal>
    </view>
</template>
<script>
import Top from '@/components/top/Top'
const WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js')
export default {
    components: { Top },
    data() {
        return {
            checked: false,
            show: false,
            userInfo: {},
            openid: '',
            jsCode: '',
            appid: '',
            jumpPage: ''
        }
    },
    onLoad(options) {
        const { teamCode, activityId } = options
        this.getAppBaseInfo()
        if (!teamCode) {
            this.jumpPage = '/pages/tabBar/home/index'
        } else {
            this.jumpPage = `/teamsPages/pages/myTeam/index?teamCode=${teamCode}&activityId=${activityId}`
        }
    },
    methods: {
        getAppBaseInfo() {
            const appData = uni.getAppBaseInfo()
            this.appid = appData.host.appId
        },
        showGetPhoneModal() {
            this.show = true
        },
        getPhoneNumber(e) {
            const { detail: { code, encryptedData, iv } } = e
            if (!code) {
                // this.show = false
                uni.$u.toast('请绑定手机号码')
                return
            }
            let p3 = this.userLogin(this.jsCode)

            p3.then(loginRes => {
                const { sessionKey, openid } = loginRes.data

                uni.setStorageSync('openid', openid);

                const pc = new WXBizDataCrypt(this.appid, sessionKey)
                const decryptedData = pc.decryptData(encryptedData , iv)

                this.editUserInfo(openid, this.userInfo, decryptedData.phoneNumber)
                uni.reLaunch({
                    url: this.jumpPage
                });
                // uni.navigateBack()
            })
        },
        handleChange(evt) {
            const { value } = evt.detail
            this.checked = value
        },
        /* 授权登录弹框 */
        getUserProfile() {
            return new Promise((resolve, reject) => {
                uni.getUserProfile({
                    lang: 'zh_CN',
                    desc: '获取你的昵称、头像、地区及性别',
                    success: (res) => {
                        resolve(res)
                    },
                    fail: (err) => {
                        reject(err)
                    }
                })
            })
        },
        /* 用户确认授权，调用uni.login，拿到code */
        silentLogin() {
            return new Promise((resolve, reject) => {
                uni.login({
                    success: (res) => {
                        resolve(res.code)
                    },
                    fail: (err) => {
                        reject(err)
                    }
                })
            })
        },
        userLogin(jsCode) {
            return new Promise((resolve, reject) => {
                this.$api.wxLogin({ jsCode }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        editUserInfo(openid, userInfo, phone) {
            this.$api.editUserVo({
                openid,
                nickName: userInfo.nickName,
                imageUrl: userInfo.avatarUrl,
                xb: userInfo.gender == 1 ? '男' : userInfo.gender == 2 ? '女' : '未知',
                phone
            }).then(res => {
            })
        },
        login() {
            if (!this.checked) {
                uni.$u.toast('请先阅读并勾选用户协议')
                return
            }
            const p1 = this.silentLogin()
            const p2 = this.getUserProfile()

            p1.then(code => {
                return code
            }).then(code => {
                return new Promise((resolve, reject) => {
                    p2.then(res => {
                        const { userInfo } = res
                        resolve({
                            code,
                            userInfo
                        })
                    }).catch(err => {
                        reject(err)
                    })
                })
            }).then(res => {
                const { code, userInfo } = res
                
                this.jsCode = code
                this.userInfo = userInfo
                this.showGetPhoneModal()
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-container {
        .logo {
            width: 244px;
            height: 326px;
            margin: 255px auto auto;
        }
        .primary-button {
            width: 680px;
            height: 96px;
            line-height: 96px;
            font-size: 28px;
            border-radius: 48px;
            background-color: $uni-color-primary;
            margin-top: 220px;
            color: #fff;
        }
        .radio {
            margin: 60px;
            font-size: 24px;
            text-align: center;
            position: relative;
        }
    }
    .phone-button {
        height: 80px;
        line-height: 80px;
        border-radius: 40px;
        width: 80%;
        color: #fff;
        background-color: $uni-color-primary;
    }
    /deep/
    .u-modal__content {
        text-align: center;
    }
</style>