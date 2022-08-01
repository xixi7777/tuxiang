<template>
    <view class="top" :style="{ background: backgroundColor }">
        <view id="title-sticky" class="title-box">
            <navigator open-type="navigateBack" delta="1" hover-class="navigator-hover-class">
                <view class="back-icon">
                    <u-icon :color="backIconColor" size="20" name="arrow-left"></u-icon>
                </view>
                <text class="title text-ellipsis">{{ title }}</text>
            </navigator>
        </view>
        <!-- <view v-show="isFixedTop" class="title-box sticky" :style="{ background: backgroundColor }">
            <navigator open-type="navigateBack" delta="1" hover-class="navigator-hover-class">
                <view class="back-icon">
                    <u-icon :color="backIconColor" size="20" name="arrow-left"></u-icon>
                </view>
                <text class="title text-ellipsis">{{ title }}</text>
            </navigator>
        </view> -->
    </view>
</template>
<script>
import { methods } from 'uview-ui/libs/mixin/mixin'
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
    },
    data() {
        return {
            isFixedTop: false,
        }
    },
    onReady: function () {
        this.setTitle();
    },
    methods: {
        setTitle() {
            var titleHeight = 0;
            const query = uni.createSelectorQuery().in(this);
            query.select('#title-sticky').boundingClientRect().exec();
            query.selectViewport().scrollOffset()
            query.exec(function (res) {
                console.log(res)
                titleHeight = res[0].height;
            })


            uni.$on('onPageScroll', function (data) {
                console.log('页面滚动了');
                var scrollTop = parseInt(data); //竖直滚动位置
                console.log(scrollTop);
                console.log(titleHeight)

                var isSatisfy = scrollTop >= titleHeight ? true : false;
                this.isFixedTop = isSatisfy;
                console.log(this.isFixedTop);
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-bottom: 30px;
    text-align: center;

    .title-box {
        padding: 70px 30px 30px 30px;

        &.sticky {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 99;
            transform: translateZ(1px);
        }
    }

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