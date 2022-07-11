<template>
    <view class="app-container">
        <view class="top-background">
            <cover-image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/metopbg.png"></cover-image>
        </view>

        <view class="page-title">
			<text>我的</text>
		</view>

        <view class="person-wrapper">
            <view class="left">
                <view class="name text-ellipse"><text>Hi~, 我是茜茜</text></view>
                <view class="team"><text>所属团队: 精神小伙队</text>
                    <view class="leader">
                        <text>队长</text>
                        <view class="background">
                            <cover-image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/duizhang.png"></cover-image>
                        </view>
                    </view>
                </view>
            </view>
            <view class="right">
                <view class="avatar">
                    <cover-image src="https://cdn.uviewui.com/uview/album/1.jpg"></cover-image>
                </view>
                <view class="fanhui">
                    <cover-image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/fanhui.png"></cover-image>
                </view>
            </view>
        </view>

        <view class="jifen-wrapper">
            <view class="bg-wrapper">
                <cover-image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/mejifenbg.png"></cover-image>
            </view>
            <view class="jifen">
                <view><text>4696</text></view>
                <view><text>我的积分</text></view>
            </view>
            <view class="cishu">
                <view><text>4696</text></view>
                <view><text>旅行次数</text></view>
            </view>
        </view>

        <view class="wo-container">
            <view class="order-wrapper">
                <view class="title"><text>我的订单</text></view>
                <view class="order-type">
                    <view class="item" v-for="(item, index) in orderTypes" :key="index">
                        <view :class="['icon', `icon__${index+1}`]">
                            <cover-image :src="item.icon"></cover-image>
                        </view>
                        <view class="title"><text>{{ item.title }}</text></view>
                    </view>
                </view>
            </view>
    
            <view class="order-wrapper">
                <view class="title"><text>更多功能</text></view>
                <view class="order-type">
                    <view class="item" v-for="(item, index) in functions" :key="index">
                        <view class="function-icon">
                            <cover-image :src="item.icon"></cover-image>
                        </view>
                        <view class="title"><text>{{ item.title }}</text></view>
                    </view>
                </view>
            </view>
    
            <view class="order-wrapper about">
                <view class="about-list" v-for="(item, index) in about" :key="index">
                    <view class="about-icon">
                        <cover-image :src="item.icon"></cover-image>
                    </view>
                    <view class="about-title"><text>{{ item.title }}</text></view>
                    <view class="go">
                        <cover-image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/fanhui.png"></cover-image>
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
            orderTypes: [
                { title: '全部', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/dingdanorder.png' },
                { title: '待支付', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/qianbao.png' },
                { title: '待出行', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/lvhangxiang.png' },
                { title: '取消', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/daishouhuo.png' },
                { title: '退款', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/tuikuanshouhou.png' }
            ],
            functions: [
                { title: '积分明细', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/jifenmingxi.png' },
                { title: '我的收藏', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/wodeshoucang.png' },
                { title: '分享好友', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/fenxiang.png' }
            ],
            about: [
                { title: '关于我们', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/guanyuwomen.png' },
                { title: '用户协议', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/xieyi.png' },
                { title: '联系客服', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/kefu.png' }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.wo-container {
    background: linear-gradient(175deg, #FFFFFF 0%, #F8F8FA 100%);
    margin: -30px;
    padding: 30px;
}
.top-background {
    height: 500px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
}
/deep/
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
            .background {
                position: absolute;
                top: 4px;
                left: 0;
                height: 100%;
                z-index: -1;
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
        .avatar {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            overflow: hidden;
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
    .bg-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        height: 196px;
        z-index: -1;
    }
    .jifen, .cishu {
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
    background: linear-gradient(335deg, rgba(255,255,255,0) 0%, #fff 100%);
    box-shadow: 0px 17px 23px 0px rgba(138,131,168,0.1);
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
            .icon__5 {
                width: 67px;
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
        &:not(:first-child) {
            margin-top: 80px;
        }
        .about-icon {
            height: 40px;
            width: 44px;
        }
        .about-title {
            font-size: 32px;
            color: #333;
            line-height: 46px;
            flex: 1;
            padding-left: 34px;
        }
        .go {
            width: 17px;
            height: 30px;
        }
        &:nth-child(2) {
            .about-icon {
                width: 33px;
            }
            .about-title {
                padding-left: 44px;
            }
        }
    }
}

</style>