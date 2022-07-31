<template>
    <view class="app-container">
        <view class="app-top-background"></view>
        <cover-image class="logo" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/logo.png"></cover-image>

        <button class="primary-button" shape="circle" @click="login">微信一键登录</button>
        <!-- <button class="primary-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信一键登录</button> -->
        <view class="radio">
            <radio-group @change="handleChange">
                <radio :value="true" color="#17AA7D"></radio>
                <text>我已阅读并同意
                    <text class="text-primary">《途享旅程用户协议》</text>
                    <text class="text-primary ml-10">隐私政策</text></text>
            </radio-group>
            <button @click="login" ref="getUserInfo" style="opacity: 0; width: 0, height: 1px;"></button>
        </view>
        <u-toast ref="uToast"></u-toast>

        <u-modal
			title="绑定手机号"
			:show="show"
			content="请先绑定手机号再进行此操作"
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
			>微信用户一键绑定</button>
		</u-modal>
    </view>
</template>
<script>
import Request from "@/utils/api.js";
export default {
    data() {
        return {
            checked: false,
            show: false,
            userInfo: {},
            openid: '',
            jsCode: ''
        }
    },
    onLoad() {
        const openid = uni.getStorageSync('openid')
        if (openid) {
            uni.reLaunch({
                url: '/pages/tabBar/home/index'
            });
        }
    },
    methods: {
        showGetPhoneModal() {
            this.show = true
        },
        getPhoneNumber(e) {
            const { detail } = e
            if (!detail.code) {
                // this.show = false
                this.$refs.uToast.show({
                    type: 'default',
                    title: '',
                    message: '请绑定手机号码',
                })
                return
            }
            let p3 = this.userLogin(this.jsCode)

            p3.then(loginRes => {
                uni.setStorageSync('openid', loginRes.openid);
                uni.setStorageSync('userinfo', this.userInfo);
                this.editUserInfo(loginRes.openid, this.userInfo)
                uni.reLaunch({
                    url: '/pages/tabBar/home/index'
                });
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
        editUserInfo(openid, userInfo) {
            console.log(userInfo)
            this.$api.editUserVo({
                openid,
                nickName: userInfo.nickName,
                imageUrl: userInfo.avatarUrl,
                xb: userInfo.gender
            }).then(res => {})
        },
        login() {
            if (!this.checked) {
                this.$refs.uToast.show({
                    type: 'default',
                    title: '',
                    message: "请先阅读并勾选用户协议",
                })
                return
            }
            const p1 = this.silentLogin()
            const p2 = this.getUserProfile()

            p1.then(code => {
                return code
            }).then(code => {
                return new Promise((resolve, reject) => {
                    p2.then(res => {
                        resolve({
                            code,
                            userInfo: res.userInfo
                        })
                    }).catch(err => {
                        reject(err)
                    })
                })
            }).then(res => {
                this.jsCode = res.code
                this.userInfo = res.userInfo
                // this.showGetPhoneModal()

                let p3 = this.userLogin(this.jsCode)

                p3.then(loginRes => {
                    uni.setStorageSync('openid', loginRes.data.openid);
                    uni.setStorageSync('userinfo', this.userInfo);
                    this.editUserInfo(loginRes.data.openid, this.userInfo)
                    uni.reLaunch({
                        url: '/pages/tabBar/home/index'
                    });
                })
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
    /deep/
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