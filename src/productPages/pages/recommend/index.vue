<template>
    <view class="app-container">
        <view class="recommend-header">
            <view class="app-top-background home"></view>
            <view class="page-title">
                <navigator open-type="navigateBack" delta="1" hover-class="navigator-hover-class">
                    <u-icon color="#006848" size="20" name="arrow-left" class="arrow-left"></u-icon>
                </navigator>
            </view>
            <search class="mt-10" v-model="query.cpmc" @confirm="searchConfirm" />

            <view class="header-filter">
                <!-- <view class="title">热门推荐</view> -->
                <view class="sort-wrapper">
                    <view class="sort">
                        <view 
                        :class="['sort-item', query.sfrmtj && 'selected']" 
                        @click="changeRmtj">
                            <text>热门推荐</text>
                        </view>
                        <view 
                        @click="showDatePicker = !showDatePicker"
                        :class="['sort-item', query.ywts && 'selected']" >
                            <text>线路 / 天数</text>
                            <u-icon name="arrow-down-fill" size="16"></u-icon>
                            <u-picker 
                            :show="showDatePicker" 
                            :columns="[ywDays]" 
                            @cancel="showDatePicker = false"
                            @confirm="confirmDatePicker"></u-picker>
                        </view>
                        <view 
                        :class="['sort-item', query.xlflCode == item && 'selected']" 
                        @click="selectXlflCode(item)"
                        v-for="(item, index) in nav" 
                        :key="index">
                            <text>{{ item }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="list-wrapper">
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
                                    <view class="desc-title ellipsis-column-2">
                                        <text>{{ item.cpmc }}</text>
                                    </view>
                                    <view class="price-wrapper">
                                        <text class="price-code">￥</text>
                                        <text class="price">{{ item.price || 0 }}</text>
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
            search: '',
            nav: ['自由行', '跟团游'],
            showDatePicker: false,
            ywDays: ['请选择', '1天', '2天', '3天', '4天', '5天', '6天', '7天', '8天'],
            query: {
                pageNum: 1,
                pageSize: 10,
                cpmc: '',
                xlflCode: '',
                sfrmtj: '',
                ywts: ''
            }
        }
    },
    onLoad(option) {
        const { cpmc, xlflCode } = option
        if (xlflCode) {
            this.query.cpmc = xlflCode
            this.query.xlflCode = xlflCode
        }
        if (cpmc) {
            this.query.cpmc = cpmc
        }
    },
    onReachBottom() {
        if (this.total === this.list.length) {
            return
        }
        this.query.pageNum++
    },
    onPullDownRefresh() {
        this.query.pageNum = 1
    },
    methods: {
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
        },
        confirmDatePicker(e) {
            const ywts = e.value[0] == '请选择' ? '' : e.value[0].replace('天', '')
            this.query.ywts = ywts*1
            this.query.xlflCode = ''
            this.query.sfrmtj = ''
            this.showDatePicker = false
            this.query.pageNum = 1
        },
        getProductList: _.debounce(function() {
            this.$api.selectProductListVo(this.query).then(res => {
				this.list = [...this.list, ...res.rows]
                this.total = res.total
			})
        }, 300)
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
    .home {
        height: 380px;
    }
}
.header-filter {
    margin-top: 56px;
    display: flex;
    align-items: center;
    .sort-wrapper {
        flex: 1;
    }
    .empty {
        width: 60px;
    }
    .sort {
        display: flex;
        justify-content: space-between;
        .sort-item {
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
            &.selected {
                text {
                    color: #17AA7D;
                    font-size: 30px;
                    font-weight: 600;
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
            }
        }
    }
}
.list-wrapper {
    margin-top: 350px;
    .list-item {
        margin: 22px auto;
        display: flex;
        .left {
            width: 237px;
            height: 237px;
            position: relative;
            border-radius: 13px;
            overflow: hidden;
            .top-left {
                line-height: 35px;
                text-align: left;
                font-size: 22px;
                padding: 10px;
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