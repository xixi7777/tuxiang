<template>
    <view class="order-confirm-container">
        <!-- 顶部背景色块 -->
        <view class="top-background"> </view>
        <!-- 页面标题栏 -->
        <view class="top-title">
            <view class="title-content">
                <!-- 返回 -->
                <view class="arrow-back" @click="navigateBack">
                    <u-icon color="#006848" name="arrow-left" size="20"></u-icon>
                </view>
                <text>订单确认</text>
            </view>
        </view>

        <view class="content-box">
            <view class=" order-info">
                <view class="info-box">
                    <view class="order-product">
                        <view class="left">
                            <image class="img" mode="scaleToFill" :src="productImage"></image>
                        </view>
                        <view class="right">
                            <view class="title">
                                <text>{{ productName }}</text>
                            </view>
                            <view class="detail">
                                <view class="text-ellipsis">{{ orderProduct.cfd_dictLabel }}</view>
                                <view><text>出行日期：{{ moment(selectedSku.kcrq).format('YYYY-MM-DD') }}</text></view>
                            </view>
                        </view>
                    </view>
                    <view class="info-num">
                            数量: <text v-for="(item, index) in orderCount" :key="item.value">{{ item.label }}×{{ item.count }}<text v-if="index < orderCount.length-1">, </text></text>
                    </view>
                    <view class="info-explain">
                        <view class="explain-item">即时确认：此订单支付完成即为预订成功</view>
                        <view class="explain-item">订单支持有条件退</view>
                    </view>
                </view>
                <view>
                    <image class="decor left-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    <image class="decor right-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                </view>
            </view>

            <view class="content-item">
                <view class="item-line"> <text class="item-title">预订人信息</text></view>
                <u-form labelPosition="left" :model="formContact" :rules="rules" ref="contactForm" labelWidth="80">
                    <u-form-item label="联系人" prop="lxrxm"
                        leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png">
                        <u-input type="text" v-model="formContact.lxrxm" @input="setFormData" placeholder="请填写订单联系人姓名" />
                    </u-form-item>

                    <u-form-item label="手机号" prop="lxrdh"
                        leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png">
                        <u-input type="number" v-model="formContact.lxrdh" @input="setFormData" placeholder="请输入手机号">
                            <u--text text="+86" slot="prefix" margin="0 3px 0 0" type="tips"></u--text>
                        </u-input>
                    </u-form-item>

                    <u-form-item label="备注" prop="ddbz"
                        leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png">
                        <u-input type="text" v-model="formContact.ddbz" @input="setFormData" placeholder="如有特殊需要请备注" />
                    </u-form-item>
                </u-form>
                <view>
                    <image class="decor left-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    <image class="decor right-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                </view>
            </view>
            <view class="content-item travel-info">
                <view class="item-line"> <text class="item-title">出行信息</text> </view>
                <u-form ref="formGoOut">
                    <view class="item-line" v-for="(item, index) in travelers" :key="index" @click="addTravelers">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png"></image>
                        <text class="key">出行人</text>
                        <u-input 
                        readonly 
                        class="value" 
                        type="text" 
                        v-model="item.xm" 
                        placeholder="请添加1个出行人" 
                        border="none">
                        </u-input>
                        <u-icon name="plus" color="#17AA7D" size="20"></u-icon>
                    </view>
                </u-form>
            </view>

            <view class="mt-30">
                <text class="text-subtitle">点击“提交订单”则表示您已详细阅读同意并接受：</text>
                <text class="text-primary" @click="toProtocol">《途享旅程用户协议》</text>
            </view>

            <u-popup :show="show" mode="bottom" @close="close">
                <view class='detail-box'>
                    <view v-for="(item, index) in orderCount" :key="index">
                        <template v-if="item.count">
                            <view class="row">
                                <text>{{ item.label }}</text>
                                <text class="num text-primary" v-if="item.hdj">
                                    <text class="text-line_through mr-10 text-disabled">{{ `￥${item.price}` }}</text>
                                    {{ `￥${item.hdj} × ${item.count} `}}
                                </text>
                                <text class="num text-primary" v-else>
                                    {{ `￥${item.price} × ${item.count} `}}
                                </text>
                            </view>
                            <view class="row" v-if="item.yhj">
                                <text class="text-warning">优惠</text>
                                <text class="num text-warning">{{ `￥${item.yhj} × ${item.count} `}}</text>
                            </view>
                        </template>
                    </view>
                    <template v-if="orderExtra.length">
                        <view class="row">
                            <text class="text-primary">附加服务</text>
                        </view>
                        <view class="row" v-for="(item, index) in orderExtra" :key="index">
                            <text>{{ item.fwmc }}</text><text class="num text-primary">{{ `￥${item.price} × ${item.count} `}}</text>
                        </view>
                    </template>
                    <view class="row">
                        <text>合计</text><text class="num text-primary">￥ {{ detailTotal }}</text>
                    </view>
                </view>
            </u-popup>

            <view class="bottom-btn">
                <view>
                    <view class="txt">总价</view>
                    <view>
                        <text class="price">￥ {{ totalPrice }}</text>
                        <text @click="show = true">
                            <text class="detail">明细</text>
                            <text class="arrow"></text>
                        </text>
                    </view>
                </view>
                <button class="btn" @click="submit">提交订单</button>
            </view>
        </view>

        <u-modal 
        :show="successModal" 
        :show-confirm-button="false"
        :show-title="false">
            <view class="popup-wrapper">
                <view class="success-icon">
                    <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/xdcg.png" />
                </view>
                <view class="content">下单成功啦</view>
                <view class="button-wrapper">
                    <u-button type="primary" shape="circle" @click="toOrder">确定</u-button>
                    <view class="cancel" @click="successModal = false">关闭</view>
                </view>
            </view>
        </u-modal>
    </view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'
import moment from 'moment'
export default {
    data() {
        return {
            successModal: false,
            travelers: [],
            cxrIds: '',
            formContact: {
                lxrxm: '',
                lxrdh: '',
                ddbz: '',
            },
            rules: {
                lxrxm: [
                    {
                        type: 'string',
                        required: true,
                        message: '请输入真实姓名',
                        trigger: ['blur', 'change'],
                    },
                ],
                lxrdh: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: ['blur', 'change'],
                    },
                    {
                        validator: (rule, value, callback) => {
                            return uni.$u.test.mobile(value);
                        },
                        message: '手机号码格式不正确'
                    }
                ]
            },
            show: false
        };
    },
    computed: {
        ...mapGetters(['cxrList', 'orderProduct', 'orderInfo', 'cxrSelectedList']),
        productName() {
            return _.get(this.orderProduct, ['cpmc'])
        },
        yhjPrice() {
            return _.get(this.orderProduct, ['yhjPrice'])
        },
        selectedSku() {
            return _.get(this.orderInfo, ['sku']) || {}
        },
        productImage() {
            let images = _.get(this.orderProduct, ['cpzt']) || ''
            images = images.split(',')
            return images[0]
        },
        totalCount() {
            return _.sumBy(this.orderCount, 'count')
        },
        orderCount() {
            return _.get(this.orderInfo, ['orderCount']) || []
        },
        orderExtra() {
            return _.get(this.orderInfo, ['orderExtra']) || []
        },
        totalPrice() {
            return this.detailTotal || 0
        },
        totalCountPrice() {
            return this.orderCount.reduce((prev, curr) => {
                let price = 0
                if (curr.hdj) {
                    price = curr.hdj
                } else {
                    price = curr.price
                }
                let total = curr.count*price - curr.count*curr.yhj
                return prev += total
            }, 0)
        },
        totalExtra() {
            return this.orderExtra.reduce((prev, curr) => {
                return prev += curr.count*curr.price
            }, 0)
        },
        detailTotal() {
            let total = this.totalCountPrice + this.totalExtra
            if (total <= 0) return 0.01
            else return total.toFixed(2)
        },
        dltid() {
            return _.get(this.orderProduct, ['dlt', 'dltid']) || ''
        },
        contact() {
            let form = uni.getStorageSync('contact')
            form = form ? JSON.parse(form) : {}
            if (_.get(form, ['ddbz'])) {
                form.ddbz = ''
            }
            return form
        }
    },
    onShow() {
        const selectedList = _.cloneDeep(this.cxrSelectedList)
        this.travelers = selectedList
        this.cxrIds = selectedList.map(item => item.zjhm).join(',')
        if (selectedList.length < this.totalCount) {
            const len = selectedList.length
            for (let i = len; i < this.totalCount; i++) {
                this.travelers.push({
                    lxdh: '',
                    zjlx: '',
                    zjhm: '',
                    cxlx: '',
                    bz: ''
                })
            }
        }
    },
    methods: {
        moment,
        ...mapMutations(['setCxrSelectedList', 'setContact', 'setOrderInfo', 'setCxrList']),
        toOrder() {
            uni.navigateTo({ url: '/orderPages/pages/myOrders/index' })
        },
        setFormData() {
            this.setContact(this.formContact)
            uni.setStorageSync('contact', JSON.stringify(this.formContact));
        },
        submit() {
            this.$refs.contactForm.validate().then(res => {
                const cxrList = this.travelers.filter(item => !!item.zjhm)
                if (!cxrList.length) {
                    uni.$u.toast('请添加出行人！')
                    return
                }
                
                if (cxrList.length != this.totalCount) {
                    uni.$u.toast('出行人个数与购买数量不一致！')
                    return
                }

                const params = {
                    spbh: this.orderInfo.product.cpbh,
                    spmc: this.orderInfo.product.cpmc,
                    skubh: this.orderInfo.sku.skubh,
                    skumc: this.orderInfo.skuName,
                    cxrq: this.orderInfo.sku.kcrq,
                    gmsl: this.totalCount,
                    teamId: this.orderInfo.teamId,
                    activityId: this.orderInfo.activityId,
                    dltid: this.dltid,
                    openid: uni.getStorageSync('openid'),
                    ...this.formContact,
                    cxrList
                }
                this.$api.addOrder(params).then(res => {
                    this.cxrIds = ''
                    this.payment(res.data)
                    this.setCxrSelectedList([])
                    this.setCxrList([])
                })
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
                    this.successModal = true
                },
                fail: err => {
                    uni.$u.toast('支付失败')
                }
            })
        },
        close() {
            this.show = false
        },
        addTravelers() {
            uni.navigateTo({ url: `/productPages/pages/traveler/index?cxrIds=${this.cxrIds}&count=${this.totalCount}` })
        },
        toProtocol() {
            uni.navigateTo({ url: '/otherPages/pages/policy/index?key=mall.system.policy' })
        }
    },
    watch: {
        contact: {
            immediate: true,
            deep: true,
            handler(n) {
                if (!_.isEmpty(n)) {
                    this.formContact = _.cloneDeep(n)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.order-confirm-container {
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
                        -webkit-line-clamp: 4;
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
        padding: 40px 30px 20px;
        background: linear-gradient(335deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
        box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1000);
        font-size: 32px;
        margin-bottom: 30px;

        .item-line {
            display: flex;
            flex-direction: row;
            align-items: center;
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
            width: 160px;
        }

        .add {
            font-size: 50px;
            color: #17AA7D;
        }
        /deep/ .u-form {
            margin: 10px 0;
            .u-form-item__body {
                padding: 0 !important;
            }
        }
    }
}

.check-box {
    .item-line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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

.detail-box {
    box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1000);
    padding: 50px 30px;
    .close {
        text-align: right;
        font-size: 66px;
        color: #999;
    }

    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 25px;
        color: #666;
    }

    .num {
        font-weight: bold;
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
    padding: 30px 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .txt {
        margin-bottom: 15px;
        font-size: 24px;
        color: #000;
    }

    .price {
        font-size: 42px;
        line-height: 33px;
        font-weight: 500;
        color: #17AA7D;
    }

    .detail {
        padding: 0 15px;
        font-size: 24px;
        line-height: 33px;
        color: #E28C25;
    }

    .arrow {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-left: 1px solid #E28C25;
        border-bottom: 1px solid #E28C25;
        transform: rotate(135deg);
    }

    .btn {
        margin: 0;
        width: 350px;
        height: 90px;
        background: #17AA7D;
        border-radius: 45px;
        line-height: 90px;
        font-size: 32px;
        font-weight: 500;
        color: #fff;
    }
}
.popup-wrapper {
    // padding: 145px 50px 86px;
    .success-icon {
        width: 172px;
        height: 172px;
        margin: 0 auto;
    }
    .content {
        margin-top: 85px;
        text-align: center;
        font-size: 48px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 67px;
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