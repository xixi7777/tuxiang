<template>
    <view class="orders-detail-container">
        <!-- 顶部背景色块 -->
        <view class="top-background"> </view>
        <!-- 页面标题栏 -->
        <view class="top-title">
            <view class="title-content">
                <!-- 返回 -->
                <view class="arrow-back" @click="navigateBack">
                    <u-icon color="#006848" name="arrow-left" size="20"></u-icon>
                </view>
                <text>订单详情</text>
            </view>
        </view>

        <view class="detail-wrapper">
            <!-- 联系版块 -->
            <view class="contact-section">
                <view class="contact-item">
                    <button class="open-type__button" open-type="contact" hover-class="none" plain>
                        <image class="img" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_wx.png">
                            </image>
                        <view><text>客服微信</text></view>
                    </button>
                </view>
                <view class="contact-item">
                    <button class="open-type__button" @click="phoneShow = true" hover-class="none" plain>
                        <image class="img" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_phone.png">
                            </image>
                        <view><text>商家电话</text></view>
                    </button>
                </view>
                <view class="contact-item">
                    <button class="open-type__button" @click="feedbackShow = true" hover-class="none" plain>
                        <image class="img" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_edit.png">
                            </image>
                        <view><text>意见反馈</text></view>
                    </button>
                </view>
            </view>
            <!-- 详情内容 -->
            <view class="detail-box">
                <!-- 出行人信息 -->
                <view class="detail-item">
                    <view class="item-line ">
                        <text class="item-title flex-padding">出行人信息</text>
                        <navigator style="width: auto;" :url="`/productPages/pages/traveler/index?readonly=${true}&cxrIds=${cxrIds}`" hover-class="navigator-hover-class">
                            <text class="go-detail-txt">查看详情</text>
                            <image class="go-detail-img"
                                src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/arrow-right.png">
                            </image>
                        </navigator>
                    </view>
                    <view class="item-line" v-for="(item, index) in cxrList" :key="index">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png"></image>
                        <text class="key">出行人</text>
                        <text class="value text-ellipsis">{{ item.xm }}</text>
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
                        <text class="value">{{ orderDetail.lxrxm }}</text>
                    </view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png">
                        </image>
                        <text class="key">手机号</text>
                        <text class="value">{{ orderDetail.lxrdh }}</text>
                    </view>
                    <!-- <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png">
                        </image>
                        <text class="key">身份证</text>
                        <text class="value">{{ orderDetail.zjhm || '' }}</text>
                    </view> -->
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_date.png"></image>
                        <text class="key">出行时间</text>
                        <text class="value">{{ orderDetail.cxrq }}</text>
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
                        <text class="value value-focus text-ellipsis">{{ orderDetail.gys_dictLabel }}</text>
                    </view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_no.png"></image>
                        <text class="key">订单号</text>
                        <text class="value">{{ orderDetail.ddbh }}</text>
                    </view>
                    <view class="item-line">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/orders_date.png"></image>
                        <text class="key">时间</text>
                        <text class="value">{{ orderDetail.createTime }}</text>
                    </view>
                    <!-- <view>
                        <image class="decor left-decor"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                        <image class="decor right-decor"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    </view> -->
                </view>
            </view>

            <view class="bottom-btn" v-show="showRefund || showPayment">
                <view class="button-line" v-if="showPayment">
                    <u-button shape="circle" plain type="warning" text="取消订单" @click="cancelOrder"></u-button>
                    <u-button shape="circle" type="primary" text="立即支付" @click="addOrder"></u-button>
                </view>
                <view class="button-line" v-if="showRefund">
                    <u-button plain type="warning" text="申请退款" shape="circle" @click="toRefund"></u-button>
                </view>
            </view>
        </view>

        <u-modal 
        :show="phoneShow" 
        title="提示" 
        :content='`确定拨打电话${phoneNumber}`'
        @cancel="phoneShow = false"
        @confirm="confirmCall"
        closeOnClickOverlay
        showCancelButton>
        </u-modal>

        <u-modal 
        :show="feedbackShow" 
        title="意见反馈" 
        @cancel="feedbackShow = false"
        @confirm="confirmFeedback"
        closeOnClickOverlay
        showCancelButton>
            <u-textarea v-model="feedback"></u-textarea>
        </u-modal>
    </view>
</template>

<script>
import _ from 'lodash'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            phoneShow: false,
            feedbackShow: false,
            appraise: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            orderId: '',
            orderDetail: {},
            phoneNumber: '',
            feedback: '',
            cxrIds: ''
        }
    },
    onLoad(option) {
        this.orderId = option.id
    },
    created() {
        this.getPhoneNumber()
    },
    computed: {
        cxrList() {
            return _.get(this.orderDetail, ['cxrList']) || []
        },
        showRefund() {
            return _.get(this.orderDetail, ['ddzt']) === 5 && _.get(this.orderDetail, ['zfzt']) === 1
        },
        showPayment() {
            return _.get(this.orderDetail, ['ddzt']) === 0 && _.get(this.orderDetail, ['zfzt']) === 0
        }
    },
    methods: {
        ...mapMutations(['setCxrSelectedList', 'setCxrList']),
        getPhoneNumber() {
            this.$api.getSysConfigCache({ key: 'mall.system.phone' }).then(res => {
                this.phoneNumber = res.data['mall.system.phone']
            })
        },
        getDetail() {
            this.$api.orderDetail({ id: this.orderId }).then(res => {
                this.orderDetail = res.data || {}
                const cxrList = _.get(this.orderDetail, ['cxrList']) || []
                const ids = cxrList.map(item => item.zjhm)
                this.cxrIds = ids.join(',')
            })
        },
        toRefund() {
            uni.navigateTo({ url: `/orderPages/pages/refund/index?id=${this.orderId}` })
        },
        confirmCall() {
            wx.makePhoneCall({
                phoneNumber: this.phoneNumber,
                success: res => {
                    this.phoneShow = flase
                }
            })
        },
        confirmFeedback() {
            this.feedback = this.feedback.trim()
            if (!this.feedback) {
                uni.$u.toast('请填写您的意见反馈')
                return
            }
            this.$api.insertFeedback({
                openid: uni.getStorageSync('openid'),
                yjnr: this.feedback,
                ddh: this.orderDetail.ddbh
            }).then(rest => {
                this.feedbackShow = false
            })
        },
        addOrder() {
            this.$api.paidByOrderNo({
                orderNo: this.orderDetail.ddbh
            }).then(res => {
                this.payment(res.data)
            })
        },
        cancelOrder(order) {
            uni.showModal({
                title: '温馨提示',
                content: '确定要取消订单吗？',
                success: res => {
                    if (res.confirm) {
                        this.$api.cancelOrder({ 
                            ddbh: this.orderDetail.ddbh 
                        }).then(res => {
                            uni.navigateTo({
                                url: '/orderPages/pages/myOrders/index'
                            })
                        })
                    }
                }
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
                    this.getDetail()
                },
                fail: err => {
                    uni.$u.toast('支付失败')
                }
            })
        }
    },
    watch: {
        orderId: {
            immediate: true,
            handler(n) {
                if (n) {
                    this.getDetail()
                }
            }
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
    position: fixed;
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
        .open-type__button {
            color: #2A2A2A;
            line-height: 50px;
            font-size: 30px;
            font-weight: 500;
        }
        .img {
            width: 90px;
            height: 90px;
            margin-top: 30px;
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

.bottom-btn {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFFFFF;
    box-shadow: 0px -6px 10px 0px rgba(0, 0, 0, 0.0600);
    padding: 15px 30px;
    .button-line {
        text-align: right;
    }

    /deep/ .u-button {
        display: inline-block;
        width: 240px;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        &:not(:last-child) {
            margin-right: 20px;
        }
    }
}
/deep/ .u-textarea {
    border: 1px solid #BDBDBD;
}
</style>