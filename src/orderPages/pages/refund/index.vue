<template>
    <view class="order-confirm-container">
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
                <text>退款详情</text>
            </view>
        </view>

        <view class="content-box">
            <view class=" order-info">
                <view class="info-box">
                    <view class="order-product">
                        <view class="left">
                            <image class="img" mode="scaleToFill" :src="order.cpzp"></image>
                        </view>
                        <view class="right">
                            <view class="title">
                                <text>{{ order.spmc }}</text>
                            </view>
                            <view class="detail">
                                <view class="text-ellipsis">{{ order.skumc }}</view>
                                <view><text>出行日期：{{ order.cxrq }}</text></view>
                            </view>
                        </view>
                    </view>
                </view>
                <view>
                    <image class="decor left-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    <image class="decor right-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                </view>
            </view>

            <view class="content-item travel-info">
                <view class="item-line item-line__title">
                    <view>
                        <text class="item-title">退款金额</text>
                        <u-icon name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/info.png" size="20"></u-icon>
                    </view>
                    <view class="price">￥ {{ order.realPrice }}</view>
                </view>
                <view class="item-line item-line__title">
                    <view>
                        <u-icon size="20" name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png"></u-icon>
                        <text class="key">成人</text>
                    </view>
                    <view class="item-price">￥ {{ order.crj || 0}} * {{ adult.length }}</view>
                </view>

                <view class="item-line item-line__title" v-if="children.length">
                    <view>
                        <u-icon size="20" name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png"></u-icon>
                        <text class="key">儿童</text>
                    </view>
                    <view class="item-price">￥ {{ order.etj || 0}} * {{ children.length }}</view>
                </view>

                <view>
                    <image class="decor left-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    <image class="decor right-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                </view>
            </view>

            <view class="content-item travel-info">
                <view class="item-line item-line__title">
                    <view>
                        <text class="item-title">退款原因</text>
                    </view>
                    <view @click="refundModal = true">
                        <text class="tkyy-title">{{ refundLabel }}</text>
                        <u-icon color="#838689" name="arrow-right" size="12"></u-icon>
                    </view>
                </view>
                <view class="item-line" >
                    <u-icon size="20" name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/tuikuan.png"></u-icon>
                    <u-textarea 
                    v-model="refund.tkyy"
                    count
                    maxlength="200"
                    placeholder="退款说明，选填，限200字"></u-textarea>
                </view>
            </view>

            <view class="footer-button">
                <view class="remark">
                    <u-icon size="16" name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/dengpao.png"></u-icon>
                    <text>如需部分退款请联系商家操作</text>
                </view>
                <u-button type="primary" shape="circle" @click="submit">提交</u-button>
            </view>
        </view>

        <u-modal :show="refundModal" title="退款原因" :show-confirm-button="false" closeOnClickOverlay>
            <view class="refund-modal">
                <u-form :model="refund" ref="refundForm" labelPosition="top" labelWidth="200">
                    <u-form-item label="个人原因">
                        <u-radio-group 
                        placement="column"
                        iconPlacement="right"
                        v-model="refund.tklx">
                            <view 
                                class="checkbox-item"
                                v-for="(item, index) in refundTypes"
                                :key="index">
                                <u-radio
                                    activeColor="#55C6A6"
                                    inactiveColor="#D8D8D8"
                                    :label="item.dictLabel"
                                    :name="item.dictValue"
                                ></u-radio>
                                <!-- <u-textarea 
                                v-if="key === 5" 
                                v-model="other"
                                placeholder="请输入内容"></u-textarea> -->
                            </view>
                        </u-radio-group>
                    </u-form-item>
                </u-form>

                <view class="button-wrapper">
                    <u-button type="primary" shape="circle" @click="refundModal = false">确定</u-button>
                    <view class="cancel" @click="cancel">关闭</view>
                </view>
            </view>
        </u-modal>
    </view>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
export default {
    data() {
        return {
            order: {},
            refundModal: false,
            refund: {
                tklx: null,
                tkyy: ''
            },
            refundTypes: []
        };
    },
    onLoad(option) {
        const { id } = option
        this.getOrderDetail(id)
        this.getRefundTypes()
    },
    computed: {
        cxrList() {
            return _.get(this.order, ['cxrList']) || []
        },
        adult() {
            return this.cxrList.filter(i => i.cxlx === 1)
        },
        children() {
            return this.cxrList.filter(i => i.cxlx === 2)
        },
        refundLabel() {
            if (this.refund.tklx == null || this.refund.tklx == '') {
                return ''
            }

            const refund = this.refundTypes.find(item => item.dictValue == this.refund.tklx*1)
            if (refund) {
                return refund.dictLabel
            }

            return ''
        }
    },
    methods: {
        moment,
        submit() {
            if (!this.refund.tklx) {
                uni.$u.toast('请选择退款类型')
                return
            }
            this.refund.tklx = this.refund.tklx*1
            this.$api.applyRefund({
                id: this.order.id,
                openid: uni.getStorageSync('openid'),
                ...this.refund
            }).then(res => {
                uni.navigateTo({ url: '/orderPages/pages/myOrders/index' })
            })
        },
        cancel() {
            this.refundModal = false
            this.refund = {
                ...this.refund,
                tklx: null
            }
        },
        getOrderDetail(id) {
            this.$api.orderDetail({ id }).then(res => {
                this.order = res.data
            })
        },
        getRefundTypes() {
            this.$api.mallOrderRefund().then(res => {
                this.refundTypes = res.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.order-confirm-container {
    padding: 155px 0;
    position: relative;
    z-index: 9;
    /deep/ .u-icon {
        display: inline-block;
    }
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

.content-box {
    padding: 0 30px;
    font-size: 32px;
    color: #000000;

    .order-info {
        position: relative;
        padding: 30px 53px 85px;
        margin: 0 -23px;
        background-image: url('//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_bg.png');
        background-position: 0 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .info-box {
            .order-product {
                display: flex;
                flex-direction: row;

                .img {
                    width: 225px;
                    height: 225px;
                    border-radius: 10px;
                    margin-right: 25px;
                }

                .right {
                    .title {
                        font-size: 34px;
                        font-weight: 500;
                        color: #2A2A2A;
                        line-height: 44px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        margin-top: 15px;
                    }

                    .detail {
                        font-size: 28px;
                        color: #838689;
                        line-height: 40px;
                        margin-top: 10px;
                    }
                }
            }

        }

        .info-num {
            font-size: 28px;
            color: #838689;
            line-height: 50px;
        }

        .info-explain {
            margin-top: 15px;

            .explain-item {
                padding-left: 42px;
                background-image: url('//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/check.png');
                background-position: 0 50%;
                background-size: 28px;
                background-repeat: no-repeat;
                color: #17AA7D;
                font-size: 24px;
                line-height: 45px;
            }
        }

        .decor {
            bottom: -34px !important;

            &.left-decor {
                left: 35px !important;
            }

            &.right-decor {
                right: 35px !important;
            }
        }
    }

    .content-item {
        position: relative;
        padding: 60px 30px 70px;
        background: linear-gradient(335deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
        box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1000);
        font-size: 32px;
        margin-bottom: 30px;

        .item-line {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            /deep/ .u-textarea {
                padding-top: 0 !important;
            }
            &__title {
                justify-content: space-between;
                /deep/ .u-icon__img {
                    margin-left: 20px;
                    vertical-align: -10px;
                }
                /deep/ .uicon-arrow-right {
                    margin-left: 10px;
                }
                .price {
                    height: 32px;
                    font-size: 28px;
                    font-family: DINAlternate-Bold, DINAlternate;
                    font-weight: bold;
                    color: #17AA7D;
                    line-height: 32px;
                }
                .item-price {
                    height: 48px;
                    font-size: 42px;
                    font-family: DINAlternate-Bold, DINAlternate;
                    font-weight: bold;
                    color: #000000;
                    line-height: 48px;
                    letter-spacing: 1px;
                }
            }
            .tkyy-title {
                font-size: 24px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #838689;;
                line-height: 33px;
            }
        }

        .item-title {
            font-weight: bold;
            color: #006848;
        }

        .pre-img {
            width: 40px;
            height: 40px;
            margin-right: 15px;
        }

        .key {
            // width: 160px;
            padding-left: 20px;
        }

        .add {
            font-size: 50px;
            color: #17AA7D;
        }
    }
}

.travel-info {
    .item-line {
        padding: 10px 0;
    }
}

.decor {
    position: absolute;
    z-index: 9;
    width: 18px;
    height: 108px;
    bottom: -70px;

    &.left-decor {
        left: 25px;
    }

    &.right-decor {
        right: 25px;
    }
}

.footer-button {
    margin-top: 120px;
    .remark {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #E28C25;
        line-height: 47px;
        margin-bottom: 30px;
        text-align: center;
        /deep/ .u-icon {
            display: inline-block;
            margin-right: 24px;
        }
    }
    /deep/ .u-button {
        height: 100px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
    }
}

.refund-modal {
    /deep/ .u-form-item__body {
        display: block;
    }
    /deep/ .u-form-item__body__left__content__label {
        height: 42px;
        font-size: 30px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #000000;
        line-height: 42px;
        width: 500px;
    }
    .checkbox-item {
        margin-top: 25px;
        /deep/ .u-radio__text {
            height: 40px;
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #000000;
            line-height: 40px;
        }
    }
    .button-wrapper {
        margin-top: 60px;
        text-align: center;
        .cancel {
            margin-top: 42px;
            font-size: 30px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #959595;
            line-height: 42px;
        }
        /deep/ .u-button {
            width: 500px;
            height: 76px;
            font-size: 30px;
            font-family: PingFangSC-Regular, PingFang SC;
        }
    }
}

</style>