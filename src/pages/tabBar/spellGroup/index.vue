<template>
    <view class="app-container">
        <view class="spell-group">
            <view class="spell-item" v-for="(item, index) in list" :key="index">
                <view class="header">
                    <text class="start-date">出发日期：{{ item.date }}</text>
                    <text class="sign-up">报名中</text>
                </view>
                <view class="content">
                    <view class="left">
                        <view class="title"><text>{{ item.name }}</text></view>
                        <view class="sign-date"><text>{{ item.registrationDate }}</text></view>
                        <view>
                            <text class="vip-price">会员价: 
                                <text class="price-code">￥</text>
                                <text class="price">{{ item.vipPrice }}</text>
                            </text>
                            <text class="original-price">
                                原价: {{ item.price }}
                            </text>
                        </view>
                        <view>
                            <text class="member">{{ item.members }}人发起</text>
                        </view>
                        <view class="item-footer">
                            <view class="grad">
                                <text>立即抢位</text>
                            </view>
                            <view class="icon-share">
                                <cover-image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/share.png"></cover-image>
                            </view>
                            <view class="icon-headset">
                                <cover-image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/listen.png"></cover-image>
                            </view>
                        </view>
                    </view>
                    <view class="right">
                        <view class="image">
                            <cover-image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png"></cover-image>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    date: '7月9日',
                    name: '云南的第一场旅行',
                    registrationDate: '7月9日-8月15日',
                    vipPrice: 580,
                    price: 120,
                    members: 15,
                    url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png'
                },
                {
                    date: '7月9日',
                    name: '云南的第一场旅行',
                    registrationDate: '7月9日-8月15日',
                    vipPrice: 580,
                    price: 120,
                    members: 15,
                    url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png'
                },
                {
                    date: '7月9日',
                    name: '云南的第一场旅行',
                    registrationDate: '7月9日-8月15日',
                    vipPrice: 580,
                    price: 120,
                    members: 15,
                    url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png'
                },
                {
                    date: '7月9日',
                    name: '云南的第一场旅行',
                    registrationDate: '7月9日-8月15日',
                    vipPrice: 580,
                    price: 120,
                    members: 15,
                    url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png'
                },
                {
                    date: '7月9日',
                    name: '云南的第一场旅行',
                    registrationDate: '7月9日-8月15日',
                    vipPrice: 580,
                    price: 120,
                    members: 15,
                    url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png'
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-container {
        background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/spell_bg.png);
        background-size: 100% 596px;
        background-attachment: fixed;
        background-repeat: no-repeat;
    }
    .spell-group {
        margin-top: 455px; 
    }
    .spell-item {
        height: 422px;
        background: linear-gradient(335deg, rgba(255,255,255,0) 0%, #FFFFFF 100%);
        box-shadow: 0px 17px 23px 0px rgba(138,131,168,0.1);
        border-radius: 20px;
        overflow: hidden;
        &:not(:first-child) {
            margin-top: 30px;
        }
        .header {
            height: 68px;
            line-height: 68px;
            background-color: #17AA7D;
            padding: 0 30px;
            position: relative;
            .start-date {
                color: #fff;
                font-size: 28px;
            }
            .sign-up {
                background: #FFB359;
                color: #fff;
                height: 36px;
                width: 94px;
                border-radius: 7px;
                font-size: 24px;
                position: absolute;
                right: 40px;
                top: 12px;
                line-height: 36px;
                text-align: center;
            }
        }
        .content {
            padding: 30px;
            display: flex;
            .left {
                flex: 1;
                .title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text {
                        font-family: 'PingFangSC-Medium, PingFang SC';
                        font-size: 34px;
                        font-weight: 500;
                        color: #2a2a2a;
                        line-height: 44px;
                    }
                }
                .sign-date {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text {
                        font-size: 26px;
                        font-family: 'PingFangSC-Light, PingFang SC';
                        font-weight: 300;
                        color: #969696;
                        line-height: 44px;
                    }
                }
                .vip-price {
                    font-size: 28px;
                    font-weight: 300;
                    color: #7F776F;
                    line-height: 44px;
                    margin-top: 9px;
                    .price-code {
                        font-size: 24px;
                        font-weight: bold;
                        color: #17aa7d;
                    }
                    .price {
                        line-height: 53px;
                        font-size: 36px;
                        font-weight: bold;
                        color: #17aa7d;
                    }
                }
                .original-price {
                    font-size: 24px;
                    color: #7f776f;
                    line-height: 44px;
                    text-decoration: line-through;
                    margin-left: 15px;
                }
                .member {
                    font-size: 26px; 
                    line-height: 44px;
                    color: #7B6654;
                    margin-top: 7px;
                }
                .item-footer {
                    display: flex;
                    margin-top: 20px;
                    .grad {
                        width: 183px;
                        height: 63px;
                        border-radius: 34.5px;
                        overflow: hidden;
                        position: relative;
                        background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/qiangwei.png);
                        background-size: cover;
                        text {
                            position: absolute;
                            top: 0;
                            left: 0;
                            font-size: 30px;
                            color: #780000;
                            line-height: 63px;
                            width: 100%;
                            text-align: center;
                            z-index: 2;
                        }
                    }
                    .icon-share {
                        width: 32px;
                        height: 34px;
                        margin-left: 20px;
                        margin-top: 10px;
                    }
                    .icon-headset {
                        width: 37px;
                        height: 34px;
                        margin-left: 54px;
                        margin-top: 10px;
                    }
                }
            }
            .right {
                width: 275px;
                .image {
                    width: 100%;
                    height: 275px;
                }
            }
        }
    }
</style>