<template>
    <view class="app-container">
        <view class="recommend-header">
            <view class="app-top-background home"></view>
            <view class="page-title">
                <u-icon @click="navigateBack" color="#006848" size="20" name="arrow-left" class="arrow-left"></u-icon>
            </view>
            <search class="mt-10" v-model="query.cpmc" @blur="searchConfirm" @confirm="searchConfirm" />

            <view class="header-filter">
                <view class="scroll-wrapper" id="scrollViewWrapper">
                    <scroll-view 
                    scroll-x="true" 
                    :show-scrollbar="false" 
                    :enhanced="true" 
                    :scroll-left="scrollLeft"
                    class="scroll">
                        <view 
                        :class="['sort-item', query.sfrmtj && 'selected']" 
                        @click="changeRmtj">
                            <text>热门推荐</text>
                        </view>
                        <view 
                        :class="['sort-item', query.xlflCode == item.dictValue && 'selected']" 
                        @click="selectXlflCode(item.dictValue)"
                        v-for="(item, index) in nav" 
                        :key="index">
                            <text>{{ item.dictLabel }}</text>
                        </view>
                    </scroll-view>
                </view>
                <view class="text-center">
                    <view
                    @click="showOrderBy = !showOrderBy"
                    :class="['sort-item sub-sort text-subtitle', query.orderby && 'selected text-primary']" >
                        <text class="">{{ query.orderby ? sortLabel : '综合排序' }}</text>
                        
                        <u-icon v-if="query.orderby == 'priceMax'" name="arrow-down-fill" size="16"></u-icon>
                        <u-icon v-else-if="query.orderby == 'priceMin'" name="arrow-up-fill" size="16"></u-icon>
                        <u-icon v-else-if="!query.orderby" name="home" size="16"></u-icon>
                    </view>
                    <view 
                    @click="showDatePicker = !showDatePicker"
                    :class="['sort-item sub-sort text-subtitle', query.ywts && 'selected text-primary']" >
                        <text class="">线路 / 天数</text>
                        <u-icon name="arrow-down-fill" size="16"></u-icon>
                    </view>
                </view>
            </view>

            <u-picker 
            :show="showDatePicker" 
            :columns="[ywDays]" 
            @cancel="showDatePicker = false"
            @confirm="confirmDatePicker"></u-picker>

            <u-picker 
            :show="showOrderBy" 
            :columns="[sorts]" 
            @cancel="showOrderBy = false"
            @confirm="confirmOrderBy"></u-picker>
        </view>

        <view class="hot-list__wrapper">
            <template v-if="list.length">
                <view v-for="item in list" :key="item.cpbh">
                    <navigator hover-class="navigator-hover-class" :url="`/productPages/pages/productDetail/index?cpbh=${item.cpbh}`">
                        <view class="list-item">
                            <view class="left">
                                <text class="top-left ellipsis-column-2" v-if="item.cfd">{{ cfd(item) }}出发</text>
                                <image lazy-load v-if="item.cpzt" :src="cpzt(item)"></image>
                                <image lazy-load v-else src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_2.png"></image>
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
                                            <text class="price">{{ item.yhjPrice ? formatPrice(item.price-item.yhjPrice) : item.price }}</text>
                                            <text class="plummet_price text-line_through text-sm" v-if="item.yhjPrice">￥{{ item.price }}</text>
                                        </view>
                                        <view>
                                            <text v-if="item.yhjPrice" class="subsidy_price text-sm">补贴{{ item.yhjPrice }}元</text>
                                        </view>
                                    </view>
                                    <view class="desc-footer">
                                        <view class="footer-icon">
                                            <u-icon v-if="item.gys_dictLabel" name="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/dianpu.png"></u-icon>
                                            <text v-if="item.gys_dictLabel">{{ item.gys_dictLabel }}</text>
                                        </view>
                                        <view><text v-if="isShowNum" class="sold-text">已售{{ item.stock || 0 }}</text></view>
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
</template>
<script>
import Search from '@/components/pageSearch/PageSearch'

import _ from 'lodash'
export default {
    components: {
        Search
    },
    data() {
        return {
            list: [],
            total: 0,
            scrollLeft: 0,
            isShowNum: 0,
            search: '',
            nav: ['自由行', '跟团游'],
            showDatePicker: false,
            showOrderBy: false,
            sorts: [
                { key: '', text: '综合排序' },
                { key: 'priceMin', text: '低价优先' },
                { key: 'priceMax', text: '高价优先' }
            ],
            ywDays: ['请选择', '1天', '2天', '3天', '4天', '5天', '6天', '7天', '8天'],
            query: {
                pageNum: 1,
                pageSize: 10,
                cpmc: '',
                xlflCode: '',
                sfrmtj: '',
                ywts: '',
                orderby: ''
            }
        }
    },
    onLoad(option) {
        const { cpmc, xlflCode } = option
        if (xlflCode) {
            this.query.xlflCode = xlflCode
        }
        if (cpmc) {
            this.query.cpmc = cpmc
        }
    },
    created() {
        this.getXllxCode()
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
    computed: {
        sortLabel() {
            let sort = this.sorts.find(item => item.key == this.query.orderby)
            return sort.text
        }
    },
    methods: {
        formatPrice(price) {
            if (price <= 0) return 0.01
            return this.$fixedPrice(price)
        },
        setScrollLeft() {
            const query = uni.createSelectorQuery().in(this)
            this.$nextTick(() => {
                query.select('#scrollViewWrapper').boundingClientRect(data => {
                    const width = data.width
                    const index = _.findIndex(this.nav, { dictValue: this.query.xlflCode })
                    
                    console.log(index, width)
                    // if (index >= 4) {
                        // this.scrollLeft = width+50
                    // }
                    // if (index >= 8) {
                        this.scrollLeft = width*2+50
                    // }
                }).exec();
            })
        },
        cfd(pro) {
            let startCity = []
            if (pro.cfd) {
                const cfd = pro.cfd.split(',')
                cfd.forEach(item => {
                    const c = item.split('/')
                    startCity.push(c.at(-1))
                })
            }
            return startCity.join(',')
        },
        selectXlflCode(item) {
            this.query.pageNum = 1
            this.query.xlflCode = this.query.xlflCode == item ? '' : item
            this.query.sfrmtj = ''
            this.query.ywts = ''
        },
        changeRmtj() {
            this.query.sfrmtj = this.query.sfrmtj ? 0 : 1
            this.query.ywts = ''
            this.query.xlflCode = ''
            this.query.pageNum = 1
        },
        cpzt(item) {
            const images = item.cpzt.split(',')
            return images[0]
        },
        searchConfirm(search) {
            this.query.cpmc = search
            this.query.pageNum = 1
            this.query.ywts = ''
            this.query.xlflCode = ''
            this.query.sfrmtj = ''
            this.query.orderby = ''
        },
        confirmDatePicker(e) {
            const ywts = e.value[0] == '请选择' ? '' : e.value[0].replace('天', '')
            this.query.ywts = ywts
            this.query.orderby = ''
            this.query.pageNum = 1
            this.showDatePicker = false
        },
        confirmOrderBy(e) {
            this.query.orderby = e.value[0].key ?? ''
            this.query.ywts = ''
            this.query.pageNum = 1
            this.showOrderBy = false
        },
        getProductList: _.debounce(function() {
            if (this.query.pageNum === 1) {
                this.list = []
            }
            this.$api.selectProductListVo(this.query).then(res => {
				this.list = [...this.list, ...res.rows]
                this.total = res.total
                this.isShowNum = !!res.isShowNum
			})
        }, 300),
        getXllxCode() {
            this.$api.getXllxCode().then(res => {
                this.nav = res.data
            })
        }
    },
    watch: {
        query: {
            immediate: true,
            deep: true,
            handler(n) {
                this.getProductList()
            }
        },
        nav: {
            deep: true,
            handler(n) {
                this.$nextTick(() => {
                    let index = _.findIndex(this.nav, { dictValue: this.query.xlflCode })
                    index = index+1
                    if (index >= 3) {
                        this.scrollLeft = 50*(index+1)
                    } 
                })
            }
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
.recommend-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 30px;
    z-index: 99;
}
.header-filter {
    margin-top: 30px;
    // display: flex;
    align-items: center;
    .empty {
        width: 60px;
    }
    .scroll-wrapper {
        width: 100%;
    }

    /deep/ .sort-item {
        display: inline-block;
        padding: 20px 26px 10px 26px;
        text {
            font-size: 30px;
            color: #333;
            line-height: 42px;
        }
        .u-icon {
            display: inline-block;
            width: 18px;
            height: 15px;
            margin-left: 10px;
            margin-top: 2px;
        }
        &.selected {
            position: relative;
            text {
                color: #17AA7D;
                font-size: 30px;
                font-weight: 600;
                line-height: 50px;
            }
            &::after {
                position: absolute;
                content: "";
                bottom: 5px;
                width: 34px;
                height: 8px;
                background: #17AA7D;
                border-radius: 4px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        &.text-subtitle {
            text {
                color: #909399;
            }
            &.selected text{
                color: #17AA7D;
            }
            /deep/ .u-icon__icon {
                margin-left: 6px;
            }
        }
        &.sub-sort {
            padding: 10px 80px;
        }
    }
}
.hot-list__wrapper {
    margin-top: 440px;
}
</style>