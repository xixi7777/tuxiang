<template>
    <view class="app-container">
        <view class="app-top-background"></view>
        <cover-image class="logo" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/logo.png"></cover-image>

        <u-button type="primary" class="button" @click="login">微信一键登录</u-button>
        <view class="radio">
            <radio-group @change="handleChange">
                <radio :value="true" color="#17AA7D"></radio>
                <text>我已阅读并同意
                    <text class="text-primary">《途享旅程用户协议》</text>
                    <text class="text-primary ml-10">隐私政策</text></text>
            </radio-group>
        </view>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>
<script>
export default {
    data() {
        return {
            checked: false
        }
    },
    methods: {
        handleChange(evt) {
            const { value } = evt.detail
            this.checked = value
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
            uni.switchTab({ url: '/pages/tabBar/home/index' })
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
        /deep/
        .u-button {
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
</style>