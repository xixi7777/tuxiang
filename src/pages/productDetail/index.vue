<template>
    <view class="detail-container">
        <view class="header">
            <navigator open-type="navigateBack" delta="1">
                <u-icon color="#006848" size="20" name="arrow-left"></u-icon>
            </navigator>
            <view><text>商品详情</text></view>
        </view>

        <view class="photo-wrapper">
            <u-swiper
                :list="swiper"
                @change="e => currentNum = e.current"
                :autoplay="false"
                >
                    <view slot="indicator" class="indicator-num">
                        <text class="indicator-num__text">{{ currentNum + 1 }}/{{ swiper.length }}</text>
                    </view>
            </u-swiper>
        </view>

        <view class="desc-wrapper">
            <view class="desc-header flex-box p-h-20">
                <view><text>￥1600-1800</text></view>
                <view><u-icon name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/info.png" size="20"></u-icon></view>
            </view>
            <view class="product-name p-h-20">
                <text>天天发班+暑期钜惠·云南昆明大理丽江6天5晚跟团游 国际五星+海景酒店(玉龙雪山大索道+敞篷吉普洱海旅拍+洱海游船+赠丽水金沙)</text>
            </view>
            <view class="consult p-h-20 flex-box">
                <view class="consult-item"><text>咨询下单赠红包</text></view>
                <view class="consult-item"><text>动车返回昆明</text></view>
            </view>
            <u-line dashed color="#D7D7D7"></u-line>
            <view class="service flex-box p-h-20">
                <view class="service-title"><text>服务</text></view>
                <view class="btn-group flex-box">
                    <view class="flex-box">
                        <u-icon name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/check.png" size="10"></u-icon>
                        <text>二次确认</text>
                    </view>
                    <view class="flex-box">
                        <u-icon name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/check.png" size="10"></u-icon>
                        <text>无自费</text>
                    </view>
                </view>
            </view>
            <view class="desc-footer flex-box space-between p-h-20">
                <view class="left flex-box">
                    <view class="anxinyou-icon">
                        <cover-image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/anxinyou.png"></cover-image>
                    </view>
                    <view class="anxinyou"><text>安心游</text></view>
                </view>
                <view class="right flex-box">
                    <text>严格消毒</text>
                    <text>体温监测</text>
                    <text>健康码乘车</text>
                </view>
            </view>
        </view>

        <view class="exchange-wrapper">
            <view class="header flex-box space-between">
                <view class="start-city"><text>济宁出发</text></view>
                <view class="exchange-start flex-box">
                    <text>切换出发地 (35个)</text>
                    <u-icon name="arrow-right" size="10"></u-icon>
                </view>
            </view>
            <view class="exchange-date__wrapper">
                <view class="more-choose">更多班期</view>
                <view class="scroll-list-wrapper">
                    <u-scroll-list>
                        <view class="dates-item" v-for="(item, index) in dates" :key="index">
                            <text>{{ item.date }}</text>
                            <text>{{ item.weekday }}</text>
                            <text>￥{{ item.price }}起</text>
                        </view>
                    </u-scroll-list>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            currentNum: 0,
            swiper: [
                '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/foot_1.png',
                '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/foot_2.png',
                '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/hot_1.png',
                '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/hot_2.png',
            ],
            dates: [
                { date: '07-13', weekday: '周四', price: 1999 },
                { date: '07-14', weekday: '周五', price: 1999 },
                { date: '07-15', weekday: '周六', price: 1999 },
                { date: '07-16', weekday: '周日', price: 1999 }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.detail-container {
    &>.header {
        background: linear-gradient(180deg, #A1F5E2 0%, #EAF6F5 100%);
        padding: 88px 0 38px 0;
        position: fixed;
        top: 0;
        left: 0;
        text-align: center;
        z-index: 9;
        width: 100%;
        /deep/ .u-icon {
            position: absolute;
            left: 30px;
        }
        text {
            font-size: 36px;
            font-weight: 500;
            color: #333333;
            line-height: 50px;
            letter-spacing: 1px;
        }
    }
    .photo-wrapper {
        height: 434px;
        margin-top: 176px;
        border-top: 1px solid transparent;
        .indicator-num {
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 100px;
            @include flex;
            justify-content: center;
            width: 86px;
            height: 40px;
            border-radius: 20px;
            text-align: center;
            line-height: 40px;

            &__text {
                color: #fff;
                font-size: 28px;
            }
        }
        /deep/ .u-swiper {
            height: 434px !important;
            border-radius: unset !important;
            .u-swiper__wrapper__item__wrapper__image,
            .u-swiper__wrapper {
                border-radius: unset !important;
                height: 100% !important;
            }
        }
        /deep/ .u-swiper__indicator {
            top: 30px;
            right: 30px;
        }
    }
    .desc-wrapper {
        margin: 0 30px;
        transform: translateY(-70px);
        background: linear-gradient(335deg, rgba(255,255,255,0.4) 0%, #FFFFFF 100%);
        box-shadow: 0px 17px 23px 0px rgba(138,131,168,0.1000);
        border-radius: 20px;
        padding-top: 30px;
        .desc-header {
            text {
                font-size: 50px;
                font-weight: bold;
                color: #17AA7D;
                line-height: 58px;
                letter-spacing: 1px;
                margin-right: 16px;
            }
        }
        .product-name {
            margin-top: 24px;
            overflow: hidden; 
            text-overflow: ellipsis;
            display: -webkit-box; 
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            text {
                font-size: 34px;
                font-weight: 500;
                color: #2A2A2A;
                line-height: 44px;
            }
        }
        .consult {
            margin-top: 22px;
            margin-bottom: 46px;
            .consult-item {
                padding: 0 16px 6px 16px;
                background: rgba(0,0,0,0.06);
                border-radius: 30px;
                text-align: center;
                text {
                    font-size: 24px;
                    font-weight: 300;
                    color: rgba(0,0,0,0.7);
                }
                &:not(:first-child) {
                    margin-left: 30px;
                }
            }
        }
        .service {
            margin-top: 28px;
            .service-title {
                font-size: 26px;
                font-weight: 400;
                color: #006848;
                line-height: 47px;
            }
            .btn-group {
                margin-left: 15px;
                background: rgba(255,255,255,0.3);
                border-radius: 20px;
                border: 1px solid #7ECFB7;
                height: 40px;
                line-height: 40px;
                text {
                    font-size: 20px;
                    color: #17AA7D;
                    margin-left: 8px;
                }
                &>.flex-box {
                    padding: 0 20px;
                    &:not(:first-child) {
                        border-left: 1px solid #17AA7D;
                    }
                }
            }
        }
        .desc-footer {
            margin-top: 30px;
            height: 88px;
            background: rgba(23,170,125,0.2);
            border-radius: 20px 20px 0px 0px;
            opacity: 0.55;
            .anxinyou-icon {
                width: 70px;
                height: 60px;
            }
            .anxinyou {
                margin-left: 14px;
                font-size: 32px;
                font-weight: 500;
                color: #006848;
            }
            &>.right {
                text {
                    padding: 0 16px;
                    display: inline-block;
                    font-size: 24px;
                    font-weight: 400;
                    color: #17AA7D;
                    &:not(:first-child) {
                        border-left: 1px solid #17AA7D;
                    }
                }
            }
        }
    }
    .exchange-wrapper {
        margin: 30px;
        background: #FFFFFF;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0px 0px 23px 0px rgba(147,147,147,0.2000);
        .start-city {
            font-size: 32px;
            font-weight: bold;
            color: #006848;
            line-height: 47px;
        }
        .exchange-start {
            font-size: 24px;
            font-weight: 400;
            color: #000;
            line-height: 47px;
        }
        .exchange-date__wrapper {
            margin-top: 33px;
            position: relative;
            .more-choose {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                background: #fff;
                width: 68px;
                width: 22px;
                font-size: 22px;
                font-weight: 500;
                color: #17AA7D;
                line-height: 30px;
                word-wrap: break-word;
            }
        }
    }
}
</style>