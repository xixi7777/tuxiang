<template>
    <view class="orders-detail-container">
        <!-- 顶部背景色块 -->
        <view class="top-background"> </view>
        <!-- 页面标题栏 -->
        <view class="top-title">
            <view class="title-content">
                <!-- 返回 -->
                <view class="arrow-back">
                    <navigator open-type="navigateBack" hover-class="navigator-hover-class">
                        <u-icon color="#006848" name="arrow-left" size="20"></u-icon>
                    </navigator>
                </view>
                <text>订单详情</text>
            </view>
        </view>

        <view class="detail-wrapper">
            <!-- 联系版块 -->
            <view class="contact-section">
                <view class="contact-item">
                    <image class="img" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_wx.png">
                    </image>
                    <view> <text>客服微信</text></view>
                </view>
                <view class="contact-item">
                    <image class="img" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_phone.png">
                    </image>
                    <view><text>商家电话</text></view>
                </view>
                <view class="contact-item">
                    <image class="img" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_edit.png">
                    </image>
                    <view><text>意见反馈</text></view>
                </view>
            </view>
            <!-- 详情内容 -->
            <view class="detail-box">
                <!-- 出行人信息 -->
                <view class="detail-item">
                    <view class="item-line ">
                        <text class="item-title flex-padding">出行人信息</text>
                        <text class="go-detail-txt">查看详情</text>
                        <image class="go-detail-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/arrow-right.png">
                        </image>
                    </view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png"></image>
                        <text class="key">出行人</text>
                        <text class="value text-ellipsis">王学良</text>
                        <view class="add">+</view>
                    </view>
                    <view>
                        <image class="decor left-decor"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                        <image class="decor right-decor"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    </view>
                </view>
                <!-- 预订人信息 -->
                <view class="detail-item">
                    <view class="item-line"> <text class="item-title">预订人信息</text></view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png"></image>
                        <text class="key">联系人</text>
                        <text class="value">王大锤</text>
                    </view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png">
                        </image>
                        <text class="key">手机号</text>
                        <text class="value">86 *******0555</text>
                    </view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png">
                        </image>
                        <text class="key">身份证</text>
                        <text class="value">11************2430</text>
                    </view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_date.png"></image>
                        <text class="key">出行时间</text>
                        <text class="value">2022.1.1～2022.1.5</text>
                    </view>
                    <view>
                        <image class="decor left-decor"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                        <image class="decor right-decor"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    </view>
                </view>
                <!-- 其他信息 -->
                <view class="detail-item">
                    <view class="item-line"> <text class="item-title">其他信息</text></view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_supplier.png">
                        </image>
                        <text class="key">供应商</text>
                        <text class="value value-focus text-ellipsis">恒大国旅</text>
                    </view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_no.png"></image>
                        <text class="key">订单号</text>
                        <text class="value">21616142022062331801</text>
                    </view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_date.png"></image>
                        <text class="key">时间</text>
                        <text class="value">2022.06.23 22:40:39</text>
                    </view>
                    <view>
                        <image class="decor left-decor"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                        <image class="decor right-decor"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    </view>
                </view>

                <!-- 评价 -->
                <view class="detail-item appraise">
                    <view class="item-line"><text class="item-title">您愿意推荐朋友们使用某某预订旅游产品吗？</text></view>
                    <view class="appraise-txt">
                        <text class="no-satisfy">非常不满意</text>
                        <text class="ordinary">一般</text>
                        <text class="satisfy">非常满意</text>
                    </view>
                    <view class="">
                        <view :class="['appraise-item', { 'active': index < 3 }]" v-for="(item, index) in appraise"
                            :key="index">{{
                                    item
                            }}</view>
                    </view>
                </view>
            </view>

            <view class="bottom-btn">
                <button class="btn btn-proto">电子合同</button>
                <button class="btn btn-refund">申请退款</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            appraise: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    }
}
</script>

<style lang="scss" scoped>
.orders-detail-container {
    padding: 155px 0;
    position: relative;
    z-index: 9;
}

.top-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    height: 175px;
    background: linear-gradient(180deg, #A1F5E2 0%, #EAF6F5 100%);
    border-radius: 0px 0px 0px 50px;
}

.top-title {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    padding: 70px 0 30px;
    width: 100%;
    color: #006848;
    font-size: 36px;
    background: linear-gradient(180deg, #A1F5E2 0%, #e2f7f5 100%);
    z-index: 10;
    transform: translateZ(1px);

    .title-content {
        padding-left: 70px;
        text-align: center;
    }

    .arrow-back {
        position: absolute;
        left: 15px;
        top: 70px;
    }
}

.detail-wrapper {
    padding: 0 30px;
    font-size: 32px;
    color: #000000;

    .contact-section,
    .item-line {
        display: flex;
        flex-direction: row;
        align-items: center;
        line-height: 45px;
        position: relative;
        z-index: 9;
    }

    .contact-item {
        position: relative;
        z-index: 9;
        width: 215px;
        height: 215px;
        margin: 0 10px 30px;
        background: linear-gradient(335deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
        box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1000);
        border-radius: 20px;
        font-size: 30px;
        font-weight: 500;
        color: #2A2A2A;
        text-align: center;

        .img {
            width: 90px;
            height: 90px;
        }
    }

    .detail-item {
        position: relative;
        padding: 30px 30px 75px;
        margin-bottom: 40px;
        background: linear-gradient(335deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
        box-shadow: 0px 0px 23px 0px rgba(138, 131, 168, 0.1000);

        &:not(:first-child) {
            padding-top: 72px;
        }

        .pre-img {
            width: 40px;
            height: 40px;
            margin-right: 15px;
        }

        .key {
            width: 160px;
            padding-right: 40px;
        }

        .decor {
            position: absolute;
            z-index: 9;
            width: 18px;
            height: 108px;
            bottom: -74px;

            &.left-decor {
                left: 20px;
            }

            &.right-decor {
                right: 10px;
            }
        }
    }

    .item-line {
        margin-bottom: 30px;

        .flex-padding,
        .value {
            flex: 1;
        }

        .item-title {
            font-weight: bold;
            color: #006848;
            font-size: 32px;
        }

        .go-detail-txt {
            font-size: 24px;
            font-weight: 500;
            color: #999;
        }

        .go-detail-img {
            width: 12px;
            height: 22px;
            margin-left: 15px;
        }

        .add {
            font-size: 50px;
            color: #17AA7D;
        }

        .value-focus {
            color: #17AA7D;
        }
    }
}

.appraise {
    .appraise-txt {
        font-size: 26px;
        color: #666;
        margin-bottom: 40px;

        .ordinary {
            margin: 0 65px 0 270px;
        }
    }

    .appraise-item {
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 60px;
        margin-right: 17px;
        background-image: url('//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_like.png');
        background-position: 0 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        font-size: 20px;
        color: #fff;

        &.active {
            background-image: url('//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_like_active.png');
        }
    }
}

.bottom-btn {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFFFFF;
    box-shadow: 0px -6px 10px 0px rgba(0, 0, 0, 0.0600);
    padding: 15px 30px;
    text-align: right;

    .btn {
        display: inline-block;
        width: 240px;
        height: 90px;
        line-height: 90px;
        border-radius: 45px;
        font-size: 32px;
        font-weight: 500;
    }

    .btn-proto {
        background: #17AA7D;
        color: #FFFFFF;
        margin-right: 30px;
    }

    .btn-refund {
        background: rgba(0, 0, 0, 0.0600);
        color: #000000;
    }
}
</style>