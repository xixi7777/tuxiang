<template>
    <view class="app-container" :style="{backgroundImage: `url(${phbtpImage})`}">
        <top background-color="#000421" backIcon-color="#fff"/>
        <view class="biwan">
            <cover-image :src="phbtpText"></cover-image>
        </view>

        <view class="hot-line">
            <view class="scroll-list-wrapper">
                <scroll-view scroll-x="true" class="scroll">
                    <view class="hot-item" v-for="(item, index) in rmxl" :key="index">
                        <navigator :url="item.url" hover-class="navigator-hover-class">
                            <view class="hot-image">
                                <image :src="item.image" lazy-load></image>
                            </view>
                            <view class="item-footer"><text>{{ item.name }}</text></view>
                        </navigator>
                    </view>
                </scroll-view>
            </view>
        </view>

        <view class="classics-wrapper">
            <text class="header">经典必去</text>
            <view class="list" v-if="jdbq.length">
                <view class="list__item" v-for="(item, index) in jdbq" :key="index" @click="toProductDetail(item)">
                    <view class="image image-radius">
                        <view class="top-icon" v-if="index<=2">
                            <image :src="`//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/top${index+1}.png`"></image>
                        </view>
                        <image :src="item.image" lazy-load></image>
                    </view>
                    <view class="desc">
                        <view class="desc__content">
                            <view class="ellipsis-column-2 title">
                                <text>{{ item.name }}</text>
                            </view>
                            <view class="detail-info">
                                <text class="plummet_price text-line_through text-sm" v-if="item.yhjPrice">原价:￥{{ item.price }}</text>
                                <text v-if="item.yhjPrice" class="subsidy_price text-sm ml-10">补贴{{ item.yhjPrice }}元</text>
                            </view>
                            <view class="actions">
                                <view class="">
                                    <text class="price-code">￥</text>
                                    <text class="price">{{ item.yhjPrice ? formatPrice(item.price-item.yhjPrice) : item.price }}</text>
                                </view>
                                <view class="trade-in">立即抢购</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <u-empty mode="list" v-else></u-empty>
        </view>
    </view>
</template>
<script>
import Top from '@/components/top/Top'
import _ from 'lodash'
export default {
    components: {
        Top
    },
    data() {
        return {
            info: {},
            list: []
        }
    },
    onLoad() {
        this.getConfig()
    },
    onPullDownRefresh() {
        wx.stopPullDownRefresh();
        setTimeout(() => {
            this.getConfig()
        }, 500)
	},
    computed: {
        jdbq() {
            return _.get(this.info, ['jdbq']) || []
        },
        rmxl() {
            return _.get(this.info, ['rmxl']) || []
        },
        phbtpText() {
            return _.get(this.info, ['phbtp', 1, 'image']) || '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/biwan.png'
        },
        phbtpImage() {
            return _.get(this.info, ['phbtp', 0, 'image']) || '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/paihangbang_bg.png'
        }
    },
    methods: {
        formatPrice(price) {
            if (price <= 0) return 0.01
            return this.$fixedPrice(price)
        },
        getConfig() {
            this.$api.getConfigCache({
                key: 'mall.system.phb'
            }).then(res => {
                const keyValue = res.data['mall.system.phb'].keyValue
				this.info = JSON.parse(keyValue)
            })
        },
        toProductDetail(product) {
            uni.navigateTo({ url: product.url })
        }
    }
}
</script>
<style lang="scss" scoped>
.app-container {
    background: #000421;
    // background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/paihangbang_bg.png);
    background-position: 0 0;
    background-size: 100% 818px;
    background-repeat: no-repeat;
}
.biwan {
    width: 578px;
    height: 347px;
    margin: 150px auto 60px auto;
}
.hot-line {
    .scroll {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }
    .hot-item {
        width: 194px;
        border-radius: 20px;
        overflow: hidden;
        display: inline-block;
        &:not(:first-child) {
            margin-left: 20px;
        }
        .hot-image {
            width: 100%;
            height: 163px;
        }
        &:nth-child(4n) {
            background: #A3AEC6;
        }
        &:nth-child(4n+1) {
            background: #605A4B;
        }
        &:nth-child(4n+2) {
            background: #A18D47;
        }
        &:nth-child(4n+3) {
            background: #02698F;
        }
        .item-footer {
            text-align: center;
            color: #fff;
            font-size: 32px;
            padding: 10px 0;
        }
    }
}
.classics-wrapper {
    margin-top: 50px;
    .header {
        font-size: 36px;
        font-weight: 600;
        color: #A8F5E4;
        line-height: 44px;
    }
    .list {
        margin-top: 12px;
        .list__item {
            margin-top: 20px;
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0px 17px 23px 0px rgba(138,131,168,0.1000);
            padding: 30px;
            display: flex;
            .image {
                width: 207px;
                height: 207px;
                position: relative;
                .top-icon {
                    position: absolute;
                    width: 91px;
                    height: 40px;
                }
            }
            .desc {
                flex: 1;
                padding-left: 24px;
                height: 207px;
                .desc__content {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: space-between;
                }
                .title {
                    width: 391px;
                    font-size: 34px;
                    font-weight: bold;
                    color: #2A2A2A;
                    line-height: 44px;
                }
                .detail-info {
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    font-size: 26px;
                    color: #969696;
                    margin-top: 10px;
                    .plummet_price {
                        margin-left: 0;
                    }
                }
                .actions {
                    display: flex;
                    justify-content: space-between;
                    // margin-top: 14px;
                    .trade-in {
                        width: 175px;
                        height: 55px;
                        text-align: center;
                        line-height: 55px;
                        background: linear-gradient(147deg, #FFDFB4 0%, #DEB67E 100%);
                        box-shadow: 0px 2px 4px 0px #DEB67E, inset 1px 1px 0px 0px #FFF4E0;
                        border-radius: 32px;
                        color: #780000;
                        font-size: 30px;
                    }
                }
            }
        }
    }
}
</style>