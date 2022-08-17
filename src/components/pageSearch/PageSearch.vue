<template>
    <!-- <view class="search-wrapper"> -->
        <!-- <u-sticky offset-top="40"> -->
            <view class="page-search">
                <view class="search-icon">
                    <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/search.png"></image>
                </view>
                <input 
                class="input"
                v-model="inputVal" 
                @confirm="confirm"
                placeholder="请输入你想要的内容" />
            </view>
        <!-- </u-sticky> -->
    <!-- </view> -->
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            inputVal: ''
        }
    },
    methods: {
        confirm(e) {
            this.$emit('confirm', this.inputVal)
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(n) {
                this.inputVal = n
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.page-search {
    // margin-top: 50px;
    position: relative;
    width: 690px;
    height: 80px;
    background: #EDF9F8;
    border-radius: 40px;
    overflow: hidden;
    .search-icon {
        position: absolute;
        left: 30px;
        width: 35px;
        height: 35px;
        top: 50%;
        transform: translateY(-50%);
    }
    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 500px;
        height: 80px;
        line-height: 80px;
        left: 90px;
        font-size: 24px;
    }
}
</style>