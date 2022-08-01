<template>
    <view class="orders-container">
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
                <text>我的订单</text>
            </view>
        </view>


        <view class="tabs-status">
            <u-tabs :list="listTabs" @click="click" lineWidth="30" lineColor="#17AA7D" :activeStyle="{
                fontWeight: 'bold',
                transform: 'scale(1.05)'
            }"></u-tabs>
        </view>

        <view class="order-wrapper">
            <view class="outer booking">
                <view class="left">
                    <view class="title">预约订单在这里</view>
                    <view class="desc">预约商品订单，请点击查看</view>
                </view>
                <view class="right">
                    <image class="img" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/arrow_r.png">
                    </image>
                </view>
            </view>
            <view class="order-list">
                <view class="outer order-item" v-for="(item, index) in orderList" :key="index">
                    <view class="status-box">
                        <view class="left">
                            <image class="logo"
                                src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/logo.png" />
                            <text>途享旅程</text>
                            <image class="img"
                                src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/arrow-right.png" />
                        </view>
                        <view class="right"><text>{{ item.status }}</text></view>
                    </view>
                    <navigator url="/pages/ordersDetail/index">
                        <view class="info-box">
                            <view class="left">
                                <image class="img" mode="scaleToFill" :src="item.url"></image>
                            </view>
                            <view class="right">
                                <view class="title-box">
                                    <view class="title">
                                        <text>{{ item.title }}</text>
                                    </view>
                                    <view class="num-box">
                                        <view class="price"> <text>{{ '￥' + item.price }}</text></view>
                                        <view class="num"><text>× {{ item.num }}</text></view>
                                    </view>
                                </view>
                                <view class="detail">
                                    <view>{{ item.desc }}</view>
                                    <view><text>出行日期：{{ item.date }}</text></view>
                                </view>
                            </view>
                        </view>
                    </navigator>
                    <view class="price-box">
                        <text class="total-price">总价{{ '￥' + item.totalPrice }}</text>
                        <text>实付款<text class="pay-price">{{ '￥' + item.payPrice }}</text></text>
                    </view>
                    <view class="btn-box">
                        <button class="btn">取消订单</button>
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
            listTabs: [{ name: '全部', }
                , { name: '待付款', }
                , { name: '处理中', }
                , { name: '未出行', }
                , { name: '待评价', }
                , { name: '退款/售后', }
            ],
            orderList: [{
                title: '三亚槟榔谷南湾猴岛一日游海南陵水跟团旅游门票岛一日游海南陵水跟团旅游门票',
                desc: 'A.猴岛+槟榔谷；成人',
                date: '7月8日',
                price: '188.00',
                totalPrice: '188.00',
                payPrice: '188.00',
                status: '待付款',
                num: 1,
                url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png',
            }, {
                title: '三亚槟榔谷南湾猴岛一日游海南陵水跟团旅游门票电…',
                desc: 'A.猴岛+槟榔谷；成人',
                date: '7月8日',
                price: '188.00',
                totalPrice: '¥188.00',
                payPrice: '¥188.00',
                status: '待付款',
                num: 1,
                url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png',
            }, {
                title: '三亚槟榔谷南湾猴岛一日游海南陵水跟团旅游门票电…',
                desc: 'A.猴岛+槟榔谷；成人',
                date: '7月8日',
                price: '188.00',
                totalPrice: '¥188.00',
                payPrice: '¥188.00',
                status: '待付款',
                num: 1,
                url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png',
            }, {
                title: '三亚槟榔谷南湾猴岛一日游海南陵水跟团旅游门票电…',
                desc: 'A.猴岛+槟榔谷；成人',
                date: '7月8日',
                totalPrice: '¥188.00',
                payPrice: '¥188.00',
                status: '待付款',
                num: 1,
                url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png',
            }
            ],
        }
    },
    methods: {
        click(item) {
            console.log('item', item);
        }
    }
}
</script>

<style lang="scss" scoped>
.top-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    height: 365px;
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
    background: #A1F5E2;
    z-index: 10;

    .title-content {
        padding-left: 70px;
    }

    .arrow-back {
        position: absolute;
        left: 15px;
        top: 70px;
    }
}

.tabs-status {
    position: fixed;
    z-index: 10;
    top: 130px;
    left: 0;
    right: 0;
    padding-bottom: 20px;
    background: linear-gradient(180deg, #A1F5E2 0%, #d0fdf3 100%);

    /deep/ .u-tabs {
        font-size: 26px !important;
    }
}

.orders-container {
    padding: 250px 30px 30px;

    .order-wrapper {
        position: relative;
        z-index: 9;
    }

    .outer {
        background: #FFFFFF;
        box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1000);
        border-radius: 20px;
        margin-bottom: 20px;
    }
}


.booking {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 40px 20px 40px 30px;

    .left {
        font-size: 24px;
        color: #999999;

        .title {
            font-weight: 500;
            color: #17AA7D;
            font-size: 32px;
        }
    }

    .right {
        position: relative;
        width: 48px;
        height: 48px;
        background: rgba(216, 216, 216, 0);
        border: 3px solid #17AA7D;
        border-radius: 50%;
        text-align: center;

        .img {
            position: absolute;
            width: 35px;
            height: 35px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.order-item {
    font-size: 28px;
    color: #333333;
    padding: 10px 20px 50px 30px;

    .status-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .logo {
            width: 40px;
            height: 50px;
            margin-right: 25px;
        }

        .img {
            height: 22px;
            width: 12px;
            margin-left: 20px;
        }

        .right {
            color: #17AA7D;
        }
    }

    .info-box {
        display: flex;
        flex-direction: row;
        margin: 25px 0 30px 0;

        .img {
            width: 180px;
            height: 180px;
            border-radius: 10px;
            margin-right: 15px;
        }

        .right {
            .title-box {
                font-weight: 500;
                display: flex;
                flex-direction: row;
                align-items: center;

                .title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }

                .num-box {
                    text-align: right;
                }

                .price {
                    font-size: 24px;
                    color: #333;
                    font-weight: 400;
                }

                .num {
                    font-size: 24px;
                    color: #999;
                    font-weight: 400;
                }
            }
        }
    }

    .detail,
    .total-price {
        font-size: 24px;
        color: #999;
        margin-right: 10px;
    }

    .price-box {
        text-align: right;

        .pay-price {
            font-size: 36px;
            color: #FF5323;
        }
    }

    .btn-box {
        text-align: right;
        margin-top: 20px;

        .btn {
            display: inline-block;
            width: 200px;
            height: 68px;
            line-height: 68px;
            font-size: 28px;
            color: #666666;
            border-radius: 48px;
            border: 1px solid #BDBDBD;
            text-align: center;
        }
    }
}
</style>>
