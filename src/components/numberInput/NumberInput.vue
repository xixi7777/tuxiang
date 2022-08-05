<template>
    <view class="number-input">
        <view class="decrease-btn"><u-icon name="minus"></u-icon></view>
        <view class="input-wrapper">
            <u-input type="number" />
        </view>
        <view class="increase-btn"><u-icon name="plus"></u-icon></view>
    </view>
</template>
<script>
export default {
    props: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: null
        },
        value: {
            type: Number,
            default: null
        }
    }
}
</script>
<style lang="scss" scoped>
.number-input {
    display: flex;
    width: 100%;
    height: 58px;
    line-height: 56px;
    border: 1px solid #d7d7d7;
    border-radius: 29px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    .decrease-btn,
    .increase-btn {
        flex: 1;
        text-align: center;
        line-height: 56px;
        /deep/ .u-icon {
            flex-direction: column !important;
        }
    }
    .input-wrapper {
        width: 45%;
        border-left: 1px solid #d7d7d7;
        border-right: 1px solid #d7d7d7;
        /deep/ .u-input__content__field-wrapper__field {
            text-align: center !important;
        }
    }
}
</style>