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
                <text>订单确认</text>
            </view>
        </view>

        <view class="content-box">
            <view class=" order-info">
                <view class="info-box" v-for="item in orderItem">
                    <view class="order-product">
                        <view class="left">
                            <image class="img" mode="scaleToFill" :src="item.url"></image>
                        </view>
                        <view class="right">
                            <view class="title">
                                <text>{{ item.title }}</text>
                            </view>
                            <view class="detail">
                                <view class="text-ellipsis">{{ item.place }}</view>
                                <view><text>出行日期：{{ item.date }}</text></view>
                            </view>
                        </view>
                    </view>
                    <view class="info-num">
                        <text>数量:</text>
                        <text>成人x4、儿童x3、老人x4</text>
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
                <u-form labelPosition="left" :model="userInfo" :rules="rules" ref="form1" labelWidth="80">
                    <u-form-item label="联系人" prop="name"
                        leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png">
                        <u-input type="text" v-model="userInfo.name" placeholder="请填写订单联系人姓名" />
                    </u-form-item>

                    <u-form-item label="手机号" prop="phone"
                        leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png">
                        <u-input type="number" v-model="userInfo.phone" placeholder="请输入手机号">
                            <u--text text="+86" slot="prefix" margin="0 3px 0 0" type="tips"></u--text>
                        </u-input>
                    </u-form-item>

                    <u-form-item label="备注" prop="remark"
                        leftIcon="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_phone.png">
                        <u-input type="text" v-model="userInfo.remark" placeholder="如有特殊需要请备注" />
                    </u-form-item>
                </u-form>
                <view>
                    <image class="decor left-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    <image class="decor right-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                </view>
            </view>
            <view class="content-item check-box">
                <view class="item-line">
                    <text class="item-title">下单之后再填写出行信息</text>

                    <u-checkbox-group v-model="checkboxValue1" @change="checkboxChange">
                        <u-checkbox activeColor="#17AA7D" :key="index" shape="circle">
                        </u-checkbox>
                    </u-checkbox-group>
                </view>
                <view>
                    <image class="decor left-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                    <image class="decor right-decor"
                        src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/myteam_activity_decor.png"></image>
                </view>
            </view>
            <view class="content-item travel-info">
                <view class="item-line"> <text class="item-title">出行信息</text> </view>
                <u-form :model="dynamicForm" ref="formGoOut">
                    <view class="item-line" v-for="(item, index) in dynamicForm.counter">
                        <image class="pre-img"
                            src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/ipt_icon_user.png"></image>
                        <text class="key">出行人</text>
                        <u-input class="value" type="text" v-model="item.name" placeholder="请添加1个出行人" border='none'>
                        </u-input>
                        <view class="add">+</view>
                    </view>
                </u-form>

            </view>

            <u-popup :show="show" mode="bottom" @close="close">
                <view class='detail-box'>
                    <view class="row">
                        <text>成人</text><text class="num">×3</text>
                    </view>
                    <view class="row">
                        <text>儿童</text><text class="num">×1</text>
                    </view>
                    <view class="row">
                        <text>合计</text><text class="num">4</text>
                    </view>
                </view>
            </u-popup>

            <view class="bottom-btn">
                <view>
                    <view class="txt">总价</view>
                    <view>
                        <text class="price">￥5895</text>
                        <text @click="show = true">
                            <text class="detail">明细</text>
                            <text class="arrow"></text>
                        </text>
                    </view>
                </view>
                <button class="btn">提交订单</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {

            dynamicForm: {
                'counter': [{ name: '' }, { name: '' }]
            },
            orderItem: [{
                title: '三亚槟榔谷南湾猴岛一日游海南陵水跟团旅游门票岛一日游海南陵水跟团旅游门票',
                desc: 'A.猴岛+槟榔谷；成人',
                date: '7月8日',
                price: '188.00',
                totalPrice: '188.00',
                payPrice: '188.00',
                status: '待付款',
                num: 1,
                url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png',
                place: '活动地点活动地点活动地点'
            }],
            userInfo: {
                name: '',
                phone: '',
                remark: '',
            },
            rules: {
                name: [
                    {
                        type: 'string',
                        required: true,
                        message: '请输入真实姓名',
                        trigger: ['blur'],
                    },
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: ['blur'],
                    },
                    {
                        // 自定义验证函数
                        validator: (rule, value, callback) => {
                            // 返回true或者false的
                            return uni.$u.test.mobile(value);
                        },
                        message: '手机号码不正确',
                        trigger: ['blur'],
                    },
                ]
            },
            show: false
        };
    },
    mounted() {
        this.$refs.form1.setRules(this.rules);
    },
    methods: {
        submit() {
            this.$refs.form1
                .validate()
                .then((res) => {
                    uni.$u.toast('校验通过');
                })
                .catch((errors) => {
                    // uni.$u.toast("内容有误噢");
                });
        },
        close() {
            this.show = false
        }
    },
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
    height: 300px;

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
    padding: 15px 30px;
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
        width: 400px;
        height: 90px;
        background: #17AA7D;
        border-radius: 45px;
        line-height: 90px;
        font-size: 32px;
        font-weight: 500;
        color: #fff;
    }
}
</style>