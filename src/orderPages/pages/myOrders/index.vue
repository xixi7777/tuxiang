<template>
    <view class="orders-container">
        <!-- 顶部背景色块 -->
        <view class="top-background"> </view>
        <!-- 页面标题栏 -->
        <view class="top-title">
            <view class="title-content">
                <!-- 返回 -->
                <view class="arrow-back" @click="navigateBack">
                    <u-icon color="#006848" name="arrow-left" bold size="24"></u-icon>
                </view>
                <text>我的订单</text>
            </view>
        </view>


        <view class="tabs-status">
            <u-tabs 
            :list="listTabs"
            lineColor="#17AA7D" 
            :current="currentTab"
            @change="tabChange"
            keyName="label"
            :activeStyle="{
                fontWeight: 'bold',
                transform: 'scale(1.05)'
            }"></u-tabs>
        </view>

        <view class="order-wrapper" v-if="orderList.length">
            <!-- <view class="outer booking">
                <view class="left">
                    <view class="title">预约订单在这里</view>
                    <view class="desc">预约商品订单，请点击查看</view>
                </view>
                <view class="right">
                    <image class="img" lazy-load src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/arrow_r.png">
                    </image>
                </view>
            </view> -->
            <view class="order-list">
                <view class="outer order-item" v-for="item in orderList" :key="item.id">
                    <view class="status-box">
                        <view class="left">
                            <image class="logo" lazy-load
                                src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/logo.png" />
                            <text>途享旅程</text>
                            <image class="img" lazy-load
                                src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/arrow-right.png" />
                        </view>
                        <view class="right">
                            <text :class="[!item.zfzt && item.ddzt === 0 && 'wait-payment']">
                                <template v-if="!item.zfzt && item.ddzt === 0">待付款</template>
                                <template v-else>{{ item.ddzt_dictLabel }}</template>
                            </text>
                        </view>
                    </view>
                    <navigator :url="`/orderPages/pages/ordersDetail/index?id=${item.id}`" hover-class="navigator-hover-class">
                        <view class="info-box">
                            <view class="left">
                                <image class="img" lazy-load mode="scaleToFill" :src="productImg(item)"></image>
                            </view>
                            <view class="right">
                                <view class="title-box">
                                    <view class="title">
                                        <text>{{ item.spmc }}</text>
                                    </view>
                                    <view class="num-box">
                                        <view class="price"> <text>{{ '￥' + item.unitPrice }}</text></view>
                                        <view class="num"><text>× {{ item.gmsl }}</text></view>
                                    </view>
                                </view>
                                <view class="detail">
                                    <view>{{ item.skumc }}</view>
                                    <view><text>出行日期：{{ item.cxrq }}</text></view>
                                </view>
                            </view>
                        </view>
                    </navigator>
                    <view class="price-box">
                        <text class="total-price">总价{{ '￥' + item.price }}</text>
                        <text v-if="item.zfzt === 0 && item.ddzt === 0" class="wait-payment">待付款</text>
                        <text v-else>实付款<text class="pay-price">{{ '￥' + item.realPrice }}</text></text>
                    </view>
                    <view class="btn-box" v-if="item.ddzt === 0 && item.zfzt === 0">
                        <u-button plain type="warning" shape="circle" @click="cancelOrder(item)" text="取消订单"></u-button>
                    </view>
                    <view class="btn-box" v-if="item.ddzt === 0 && item.zfzt === 0">
                        <u-button type="primary" shape="circle" @click="paymentOrder(item)" text="立即支付"></u-button>
                    </view>
                    <view class="btn-box" v-if="item.ddzt === 5 && item.zfzt === 1">
                        <u-button plain type="warning" shape="circle" @click="toRefund(item)" text="申请退款"></u-button>
                    </view>
                </view>
            </view>
        </view>
        <u-empty v-else mode="order"></u-empty>
    </view>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            currentTab: 0,
            query: {
                status: null,
                openid: uni.getStorageSync('openid'),
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            listTabs: [
                { label: '全部', value: '1' }, 
                { label: '待付款', value: '2' },
                { label: '未出行', value: '3' },
                { label: '退款', value: '4' }
            ],
            orderList: []
        }
    },
    onLoad(option) {
        this.query.status = ''+option.status || ''
        this.orderList = []
    },
    onReachBottom() {
        if (this.orderList.length === this.total) {
            return
        }
        this.query.pageNum++
    },
    onPullDownRefresh() {
        wx.stopPullDownRefresh();
        setTimeout(() => {
            this.query.pageNum = 1
        }, 500)
    },
    methods: {
        tabChange(item) {
            this.query.status = item.value
        },
        productImg(pro) {
            if (!pro.productImg) {
                return ''
            }
            const images = pro.productImg.split(',')
            return images[0]
        },
        getOrderList: _.debounce(function() {
            if (this.query.pageNum == 1) {
                this.orderList = []
            }
            this.$api.orderList(this.query).then(res => {
                this.orderList = [...this.orderList, ...res.data.records]
                this.total = res.data.total
            })
        }, 300),
        toRefund(order) {
            uni.navigateTo({ url: `/orderPages/pages/refund/index?id=${order.id}` })
        },
        cancelOrder(order) {
            uni.showModal({
                title: '温馨提示',
                content: '确定要取消订单吗？',
                success: res => {
                    if (res.confirm) {
                        this.$api.cancelOrder({ 
                            ddbh: order.ddbh 
                        }).then(res => {
                            this.query.pageNum = 1
                            wx.redirectTo({ url: '/orderPages/pages/myOrders/index' })
                        })
                    }
                }
            })
        },
        paymentOrder(order) {
            this.$api.paidByOrderNo({
                orderNo: order.ddbh
            }).then(res => {
                this.payment(res.data)
            })
        },
        payment(param) {
            wx.requestPayment({
                timeStamp: param.timeStamp,
                nonceStr: param.nonceStr,
                package: param.packageValue,
                signType: param.signType,
                paySign: param.paySign,
                success: res => {
                    this.query.pageNum = 1
                    wx.redirectTo({ url: '/orderPages/pages/myOrders/index' })
                },
                fail: err => {
                    uni.$u.toast('支付失败')
                }
            })
        }
    },
    watch: {
        query: {
            immediate: true,
            deep: true,
            handler(n) {
                if (n.openid) {
                    this.getOrderList()
                }
            }
        },
        'query.status': {
            immediate: true,
            handler(n) {
                if (n !== '' || n !== undefined) {
                    this.listTabs.forEach((tab, index) => {
                        if (tab.value == this.query.status) {
                            this.currentTab = index
                        }
                    })
                } else {
                    this.currentTab = 0
                }
            }
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
    background: #A1F5E2;
    border-radius: 0px 0px 0px 50px;
}

.top-title {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 180px;
    width: 100%;
    color: #006848;
    font-size: 36px;
    background: #A1F5E2;
    z-index: 10;

    .title-content {
        padding-left: 70px;
        margin-top: 120px;
        text-align: center;
    }

    .arrow-back {
        position: absolute;
        left: 15px;
        top: 120px;
    }
}

.tabs-status {
    position: fixed;
    z-index: 10;
    top: 180px;
    left: 0;
    right: 0;
    padding-bottom: 20px;
    background: #A1F5E2;

    /deep/ .u-tabs {
        font-size: 26px !important;
    }
    /deep/ .u-tabs__wrapper__nav__item {
        flex: 1 !important;
    }
}

.orders-container {
    padding: 300px 30px 30px;

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
        justify-content: space-between;
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
                justify-content: space-between;
                margin-bottom: 20px;

                .title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    max-width: 400px;
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
    .detail {
        line-height: 32px;
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

        /deep/ .u-button {
            width: 200px;
            height: 68px;
            line-height: 68px;
            font-size: 28px;
            display: inline-block;
        }
    }
}
.wait-payment {
    color: #FF5323;
}
</style>>
