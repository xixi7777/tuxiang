<template>
    <view class="top" :style="{ background: backgroundColor }">
        <navigator open-type="navigateBack" delta="1" hover-class="navigator-hover-class">
            <view class="back-icon">
                <u-icon :color="backIconColor" size="20" name="arrow-left"></u-icon>
            </view>
            <text class="title text-ellipsis">{{ title }}</text>
        </navigator>
    </view>
</template>
<script>
export default {
    props: {
        backgroundColor: {
            type: String,
            default: 'linear-gradient(180deg, #A1F5E2 0%, #EAF6F5 100%);'
        },
        backIconColor: {
            type: String,
            default: '#006848'
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 100px 30px 50px 30px;
    text-align: center;
    z-index: 99;
    .back-icon {
        position: absolute;
        left: 30px;
        top: 100px;
    }
    .title {
        display: inline-block;
        max-width: 80%;
    }
}
</style>