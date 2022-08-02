<template>
    <view class="app-container">
        <view class="app-top-background home"></view>
        <view class="page-title">
            <navigator open-type="navigateBack" delta="1" hover-class="navigator-hover-class">
                <u-icon color="#006848" size="20" name="arrow-left" class="arrow-left"></u-icon>
            </navigator>
		</view>
		<search></search>

        <view class="header-filter">
            <view class="title">热门推荐</view>
            <!-- <view class="empty"></view> -->
            <view class="sort-wrapper">
                <view class="sort">
                    <view class="sort-item">
                        <text>线路 / 天数</text>
                        <u-icon name="arrow-down-fill" size="16"></u-icon>
                    </view>
                    <view class="sort-item"><text>自由行</text></view>
                    <view class="sort-item"><text>飞机游</text></view>
                </view>
            </view>
        </view>

        <view class="list-wrapper">
            <view v-for="item in list" :key="item.cpbh">
                <navigator hover-class="navigator-hover-class" :url="`/pages/productDetail/index?cpbh=${item.cpbh}`">
                    <view class="list-item">
                        <view class="left">
                            <text class="top-left" v-if="item.cfd">{{ item.cfd_dictLabel }}出发</text>
                            <text class="bottom" v-if="item.ywts">多日游玩</text>
                            <view class="image">
                                <cover-image v-if="item.cpzt" :src="item.cpzt"></cover-image>
                                <cover-image v-else src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_2.png"></cover-image>
                            </view>
                        </view>
                        <view class="right">
                            <view class="desc">
                                <view class="desc-title">
                                    <text>{{ item.cpmc }}</text>
                                </view>
                                <view class="price-wrapper">
                                    <text class="price-code">￥</text>
                                    <text class="price">{{ item.price || 0 }}</text>
                                    <!-- <text class="price-from ml-5">起</text> -->
                                </view>
                                <view class="desc-footer">
                                    <view class="footer-icon">
                                        <u-icon name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/dianpu.png"></u-icon>
                                        <text>{{ item.gys_dictLabel }}</text>
                                    </view>
                                    <view><text class="sold-text">已售{{ item.stock || 0 }}</text></view>
                                </view>
                            </view>
                        </view>
                    </view>
                </navigator>
            </view>
        </view>
    </view>
</template>
<script>
import Search from '@/components/pageSearch/PageSearch'

export default {
    components: {
        Search
    },
    data() {
        return {
            list: []
        }
    },
    onLoad() {
        this.getProductList()
    },
    methods: {
        getProductList() {
			this.$api.selectProductListVo().then(res => {
				this.list = res.data
			})
		}
    }
}
</script>
<style lang="scss" scoped>
.page-title {
    /deep/ .u-icon--right {
        display: inline-block;
    }
}
.header-filter {
    margin-top: 56px;
    display: flex;
    align-items: center;
    &>.title {
        // width: 144px;
        font-size: 36px;
        font-weight: 600;
        color: #17AA7D;
        line-height: 50px;
        position: relative;
        &::after {
            position: absolute;
            content: "";
            bottom: -5px;
            width: 34px;
            height: 8px;
            background: #17AA7D;
            border-radius: 4px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .sort-wrapper {
        flex: 1;
    }
    .empty {
        width: 60px;
    }
    .sort {
        display: flex;
        justify-content: flex-end;
        .sort-item {
            // flex: 1;
            padding-left: 60px;
            &:first-child {
                // width: 220px;
            }
            text {
                font-size: 30px;
                color: #333;
                line-height: 42px;
            }
            /deep/ .u-icon--right {
                display: inline-block;
                width: 18px;
                height: 15px;
                margin-left: 2px;
                margin-top: 2px;
            }
        }
    }
}
.list-wrapper {
    margin-top: 100px;
    .list-item {
        margin: 22px auto;
        display: flex;
        .left {
            width: 237px;
            height: 237px;
            position: relative;
            border-radius: 13px;
            overflow: hidden;
            .image {
                width: 100%;
                height: 100%;
            }
            .top-left {
                line-height: 35px;
                text-align: center;
                font-size: 22px;
                width: 131px;
                height: 35px;
                background: #000000;
                border-radius: 0px 0px 23px 0px;
                opacity: 0.4;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                color: #fff;
            }
            .bottom {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 35px;
                background: rgba(0,0,0,0.3000);
                backdrop-filter: blur(10px);
                color: #fff;
                font-size: 22px;
                text-align: center;
                line-height: 35px;
            }
        }
        .right {
            flex: 1;
            padding-left: 20px;
            .desc {
                padding-bottom: 24px;
                border-bottom: 1px solid #ddd;
                .desc-title {
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    font-weight: bold;
                    color: #2A2A2A;
                    line-height: 48px;
                    font-size: 32px;
                }
                .price-wrapper {
                    margin-top: 35px;
                }
                .desc-footer {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 18px;
                    text {
                        font-size: 26px;
                        font-weight: 300;
                        color: #969696;
                        line-height: 37px;
                    }
                    .footer-icon {
                        display: flex;
                        text {
                            margin-left: 16px;
                        }
                    }
                }
            }
        }
    }
}
</style>