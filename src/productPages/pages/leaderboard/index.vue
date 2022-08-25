<template>
    <view class="app-container">
        <top background-color="#000421" backIcon-color="#fff"/>
        <view class="biwan">
            <cover-image v-if="!phbtp" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/biwan.png"></cover-image>
            <cover-image v-else :src="phbtp"></cover-image>
        </view>

        <view class="hot-line">
            <view class="scroll-list-wrapper">
                <scroll-view scroll-x="true" class="scroll">
                    <view class="hot-item" v-for="(item, index) in rmxl" :key="index">
                        <navigator :url="`/${item.url}`" hover-class="navigator-hover-class">
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
            <view class="list">
                <view class="list__item" v-for="(item, index) in jdbq" :key="index">
                    <view class="image">
                        <view class="top-icon">
                            <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/top1.png"></image>
                        </view>
                        <image :src="item.image" lazy-load></image>
                    </view>
                    <view class="desc">
                        <view class="desc__content">
                            <view class="text-ellipsis title">
                                <text>{{ item.cpmc }}</text>
                            </view>
                            <view class="detail-info">
                                <!-- <text>云南属于高原地区，景区距离相隔比较远，并且不在同一个方向。云南属于高原地区，景区距离相隔比较远，并且不在同一个方向</text> -->
                            </view>
                            <view class="actions">
                                <view class="">
                                    <text class="price-code">￥</text>
                                    <text class="price">{{ item.price }}</text>
                                </view>
                                <view class="trade-in" @click="toProductDetail(item)">立即抢购</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import Top from '@/components/top/Top'
import _ from 'lodash'
const key = 'mall.system.phb'
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
		this.getConfig()
	},
    computed: {
        jdbq() {
            return _.get(this.info, ['jdbq']) || []
        },
        rmxl() {
            return _.get(this.info, ['rmxl'])
        },
        phbtp() {
            return _.get(this.info, ['phbtp', 'image']) || ''
        }
    },
    methods: {
        getConfig() {
            this.$api.getConfigCache({
                key
            }).then(res => {
                const keyValue = res.data[key].keyValue
				this.info = JSON.parse(keyValue)
            })
        },
        toProductDetail(product) {
            uni.navigateTo({ url: `/productPages/pages/productDetail/index?${product.url}`})
        }
    }
}
</script>
<style lang="scss" scoped>
.app-container {
    background: #000421;
    background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/paihangbang_bg.png);
    background-position: 0 150px;
    background-size: 100% 818px;
    background-repeat: no-repeat;
}
.biwan {
    width: 578px;
    height: 347px;
    margin: 150px auto 124px auto;
}
.hot-line {
    margin-top: 124px;
    .scroll {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }
    .hot-item {
        width: 194px;
        height: 232px;
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
            line-height: 45px;
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
                    line-height: 44px;
                    margin-top: 6px;
                }
                .actions {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 14px;
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