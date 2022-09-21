<template>
    <view class="app-container">
        <view class="page-title">
            <text>我的</text>
        </view>

        <view class="person-wrapper" v-if="logined">
            <view class="left">
                <view class="name text-ellipsis">
                    <text>Hi~, 我是{{ userInfo.nickName }}</text>
                </view>
                <view class="team"><text>所属团队: {{ userInfo.team ? userInfo.team : '暂未加入团队' }}</text>
                    <view class="leader" v-if="userInfo.teamzw_dictLabel">
                        <text>{{ userInfo.teamzw_dictLabel }}</text>
                    </view>
                </view>
            </view>
            <view class="right">
                <view class="me-avatar">
                    <image mode="aspectFill" :src="userInfo.imageUrl"></image>
                </view>
                <navigator url="/pages/editInfo/index" hover-class="navigator-hover-class">
                    <view class="fanhui">
                        <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/arrow-right.png">
                        </image>
                    </view>
                </navigator>
            </view>
        </view>
        <view v-else class="person-wrapper">
            <view class="left">
                <view class="name">
                <text>Hi~, 请登录</text>
            </view>
            </view>
            <view class="right">
                <navigator url="/pages/login/index" hover-class="navigator-hover-class">
                    <u-button shape="circle" type="primary">登录</u-button>
                </navigator>
            </view>
        </view>

        <view class="jifen-wrapper">
            <view class="jifen">
                <view><text>{{ userInfo.integral || 0 }}</text></view>
                <view><text>我的积分</text></view>
            </view>
            <view class="cishu">
                <view><text>{{ userInfo.orderNum || 0 }}</text></view>
                <view><text>旅行次数</text></view>
            </view>
        </view>

        <view class="wo-container">
            <view class="order-wrapper">
                <view class="title"><text>我的订单</text></view>
                <view class="order-type">
                    <view class="item" v-for="(item, index) in orderTypes" :key="index">
                        <navigator :url="`/orderPages/pages/myOrders/index?status=${item.value}`" hover-class="navigator-hover-class">
                            <view :class="['icon', `icon__${index + 1}`]">
                                <cover-image :src="item.icon"></cover-image>
                            </view>
                            <view class="title"><text>{{ item.label }}</text></view>
                        </navigator>
                    </view>
                </view>
            </view>

            <view class="order-wrapper about">
                <view class="about-list" v-for="(item, index) in about" :key="index">
                    <button v-if="item.openType" class="open-type__button" :open-type="item.openType" hover-class="none" plain>
                        <view class="about-icon">
                            <image :src="item.icon"></image>
                        </view>
                        <view class="about-title"><text>{{ item.title }}</text></view>
                        <view class="go">
                            <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/arrow-right.png">
                            </image>
                        </view>
                    </button>
                    <button v-else class="open-type__button" @click="goPage(item)" hover-class="none" plain>
                        <view class="about-icon">
                            <image :src="item.icon"></image>
                        </view>
                        <view class="about-title"><text>{{ item.title }}</text></view>
                        <view class="go">
                            <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/arrow-right.png">
                            </image>
                        </view>
                    </button>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
        return {
            policy: '',
            orderTypes: [
                { label: '全部', value: '1', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/dingdanorder.png' },
                { label: '待付款', value: '2', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/qianbao.png' },
                { label: '未出行', value: '3', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/lvhangxiang.png' },
                { label: '退款', value: '4', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/tuikuanshouhou.png' }
            ],
            about: [
                { title: '积分明细', url: '/otherPages/pages/collection/index?integral=1', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/me_jifen.png' },
                // { title: '我的收藏', url: '/otherPages/pages/collection/index?type=1', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/me_shoucang.png' },
                { title: '分享好友', openType: 'share', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/me_share.png' },
                { title: '关于我们', url: '/otherPages/pages/policy/index?key=mall.system.we', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/guanyuwomen.png' },
                { title: '用户协议', url: '/otherPages/pages/policy/index?key=mall.system.policy', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/xieyi.png' },
                { title: '联系客服', openType: 'contact', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/kefu.png' }
            ]
        }
    },
    computed: {
        ...mapGetters(['orderStatus', 'userInfo'])
    },
    onShow() {
        this.getUserInfo()
    },
    onPullDownRefresh() {
        wx.stopPullDownRefresh();
        setTimeout(() => {
            this.getUserInfo()
        }, 500)
    },
    methods: {
        ...mapMutations(['setOrderStatus']),
        getOrderTypes() {
            this.$api.orderConfigType({ code: 'mall_order_status' }).then(res => {
                this.setOrderStatus(res.data)
            })
        },
        goPage(item) {
            uni.navigateTo({ url: item.url })
        },
        toOthers(url) {
            uni.navigateTo({ url })
        }
    },
    watch: {
        orderStatus: {
            immediate: true,
            deep: true,
            handler(n) {
                if (!n.length) {
                    this.getOrderTypes()
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.app-container {
    background-color: linear-gradient(175deg, #FFFFFF 0%, #F8F8FA 100%);
    background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/metopbg.png);
    background-size: 100% 500px;
    background-attachment: fixed;
    background-repeat: no-repeat;
}

.top-background {
    height: 500px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
}

.person-wrapper {
    display: flex;
    margin-top: 55px;
    flex-direction: space-between;

    .left {
        flex: 1;

        .name {
            color: #333;
            font-size: 46px;
            letter-spacing: 3px;
            font-weight: bold;
            max-width: 500px;
        }

        .team {
            margin-top: 20px;

            text {
                font-size: 28px;
                font-weight: 300;
                color: #333;
                line-height: 44px;
            }
        }

        .leader {
            position: relative;
            width: 97px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            display: inline-block;
            margin-left: 4px;
            background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/duizhang.png);
            background-size: cover;

            .background {
                position: absolute;
                top: 4px;
                left: 0;
                height: 100%;
                z-index: -1;
                background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/duizhang.png);
                background-size: cover;
            }

            text {
                color: #fff;
                font-size: 24px;
                line-height: 50px;
            }
        }
    }

    .right {
        display: flex;
        justify-content: center;
        width: 176px;
        flex-direction: space-between;
        align-items: center;

        .me-avatar {

            image {
                width: 130px;
                height: 130px;
                border-radius: 50%;
            }
        }

        .fanhui {
            width: 26px;
            height: 54px;
            margin-left: 20px;
        }
    }
}

.jifen-wrapper {
    height: 196px;
    position: relative;
    margin: 24px -30px;
    justify-content: center;
    align-items: center;
    display: flex;
    background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/mejifenbg.png);
    background-size: cover;

    .jifen,
    .cishu {
        flex: 1;
        text-align: center;

        &>view:first-child {
            color: #FDFEFE;
            font-size: 36px;
            line-height: 42px;
            font-weight: bold;
        }

        &>view:last-child {
            margin-top: 10px;
            font-size: 28px;
            color: #fbfefd;
        }
    }
}

.order-wrapper {
    background: linear-gradient(335deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1);
    border-radius: 20px;
    padding: 40px;

    &:not(:first-child) {
        margin-top: 40px;
    }

    &>.title {
        color: #333;
        font-size: 36px;
        font-weight: bold;
        margin-top: 40px;
        padding-left: 40px;
    }

    .order-type {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 65px auto 25px;

        .item {
            flex: 1;
            text-align: center;

            .title {
                margin-top: 20px;
                font-size: 26px;
                color: #6F7075;
                line-height: 37px;
            }

            .icon {
                height: 50px;
                margin: 0 auto;
            }

            .icon__1 {
                width: 43px;
            }

            .icon__2 {
                width: 58px;
            }

            .icon__3 {
                width: 41px;
            }

            .icon__4 {
                width: 51px;
            }

            .function-icon {
                width: 74px;
                height: 65px;
                margin: 0 auto;
            }
        }
    }

    &.about {
        padding: 70px 40px;
    }

    .about-list {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
            text-align: left;
            display: flex;
        }
        &:not(:first-child) {
            margin-top: 30px;
        }

        .about-icon {
            height: 40px;
            width: 44px;
        }

        .about-title {
            font-size: 32px;
            color: #333;
            flex: 1;
            padding-left: 34px;
        }

        .go {
            width: 17px;
            height: 30px;
        }

        &:nth-child(4) {
            .about-icon {
                width: 33px;
            }
        }
        &:nth-child(4) {
            .about-title {
                padding-left: 40px;
            }
        }
    }
}
</style>