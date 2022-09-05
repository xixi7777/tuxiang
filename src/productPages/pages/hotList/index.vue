<template>
    <view class="app-container" :style="{backgroundImage: `url(${rmtjImage})`}">
        <top background-color="transparent" backIcon-color="#fff"/>

        <view class="hot-wrapper">
            <view class="header">推荐列表</view>
            <view class="hot-list__wrapper">
                <template v-if="list.length">
                    <view v-for="item in list" :key="item.cpbh">
                        <navigator hover-class="navigator-hover-class" :url="`/productPages/pages/productDetail/index?cpbh=${item.cpbh}`">
                            <view class="list-item">
                                <view class="left">
                                    <text class="top-left ellipsis-column-2" v-if="item.cfd">{{ item.cfd }}出发</text>
                                    <image lazy-load v-if="item.cpzt" :src="cpzt(item)"></image>
                                    <image lazy-load v-else src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_2.png"></image>
                                    <!-- </view> -->
                                </view>
                                <view class="right">
                                    <view class="desc">
                                        <view class="plummet_icon" v-if="item.yhjPrice">
                                            <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/jiagezhijiang.png"></image>
                                        </view>
                                        <view class="desc-title ellipsis-column-2">
                                            <text>{{ item.cpmc }}</text>
                                        </view>
                                        <view :class="['price-wrapper flex-box space-between align_baseline', item.yhjPrice && 'no-mt']">
                                            <view>
                                                <text class="price-code">￥</text>
                                                <text class="price">{{ item.yhjPrice ? item.price-item.yhjPrice : item.price }}</text>
                                                <text class="plummet_price text-line_through text-sm" v-if="item.yhjPrice">￥{{ item.price }}</text>
                                            </view>
                                            <view>
                                                <text v-if="item.yhjPrice" class="subsidy_price text-sm">补贴{{ item.yhjPrice }}元</text>
                                            </view>
                                        </view>
                                        <view class="desc-footer">
                                            <view class="footer-icon">
                                                <u-icon name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/dianpu.png"></u-icon>
                                                <text>{{ item.gys_dictLabel }}</text>
                                            </view>
                                            <view><text v-if="item.isShowNum" class="sold-text">已售{{ item.stock || 0 }}</text></view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </navigator>
                    </view>
                </template>
                <u-empty mode="list" v-else></u-empty>
            </view>
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
            list: [],
            total: 0,
            query: {
                pageNum: 1,
                pageSize: 10,
                cpmc: ''
            }
        }
    },
    computed: {
        rmtjImage() {
            return _.get(this.info, ['rmtj', 0, 'image']) || '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/20220905/defaultScene/15558be900/f95068b7-b888-43ca-ac04-a7435c5e925d.png'
        }
    },
    onLoad(option) {
        this.query.cpmc = option.cpmc || ''
    },
    created() {
        this.getConfig()
    },
    onReachBottom() {
        if (this.total === this.list.length) {
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
        cpzt(item) {
            const images = item.cpzt.split(',')
            return images[0]
        },
        getConfig() {
            this.$api.getConfigCache({
                key: 'mall.system.phb'
            }).then(res => {
                const keyValue = res.data['mall.system.phb'].keyValue
				this.info = JSON.parse(keyValue)
            })
        },
        getProductList: _.debounce(function() {
            this.$api.selectProductListVo({
                ...this.query,
                sfrmtj: 1
            }).then(res => {
                this.list = [...this.list, ...res.rows]
                this.total = res.total
            })
        }, 300),
        toProductDetail(product) {
            uni.navigateTo({ url: `/productPages/pages/productDetail/index?${product.url}`})
        }
    },
    watch: {
        query: {
            immediate: true,
            deep: true,
            handler(n) {
                if (n.pageNum === 1) {
                    this.list = []
                }
                this.getProductList()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.app-container {
    background-position: 0 0;
    background-size: 100% 954px;
    background-repeat: no-repeat;
}
.hot-wrapper {
    margin-top: 650px;
    .header {
        height: 44px;
        font-size: 36px;
        font-weight: 600;
        color: #2A2A2A;
        line-height: 44px;
    }
}
</style>