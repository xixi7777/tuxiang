<template>
    <view class="detail-container" v-if="product.cpmc">
        <top title="商品详情" />
        <view class="photo-wrapper">
            <u-swiper
                :list="images"
                @change="e => currentNum = e.current"
                :autoplay="false"
                >
                    <view slot="indicator" class="indicator-num">
                        <text class="indicator-num__text">{{ currentNum + 1 }}/{{ images.length }}</text>
                    </view>
            </u-swiper>
            <view class="cf-city"><text>{{ cfd }}出发</text></view>
            <view class="product-id"><text>商品ID：{{ product.cpbh }}</text></view>
        </view>

        <view class="desc-wrapper">
            <view class="product-name">
                <text>{{ product.cpmc }}</text>
            </view>

            <view class="consult flex-box" v-if="cpbqLabel.length">
                <view class="consult-item" v-for="(item, index) in cpbqLabel" :key="index"><text>{{ item }}</text></view>
            </view>

            <view class="desc-price flex-box space-between align_baseline">
                <view>
                    <view class="price" v-if="crhdj">￥{{ $fixedPrice(crhdj) }}</view>
                    <template v-else>
                        <text class="price">￥{{ product.yhjPrice ? product.price-product.yhjPrice : product.price }}</text>
                        <text class="plummet_price text-line_through text-sm" v-if="product.yhjPrice">￥{{ product.price }}</text>
                    </template>
                </view>
                <view>
                    <text v-if="product.yhjPrice" class="subsidy_price text-sm ml-10">补贴{{ product.yhjPrice }}元</text>
                </view>
            </view>
            
            <u-line color="#D7D7D7"></u-line>
            <view class="service flex-box" v-if="fwbqLabel.length">
                <view class="service-title"><text>服务</text></view>
                <view class="btn-group flex-box">
                    <view class="flex-box btn-item" v-for="(item, index) in fwbqLabel" :key="index">
                        <u-icon name="checkmark-circle" size="13"></u-icon>
                        <text>{{ item }}</text>
                    </view>
                </view>
            </view>
            <view class="desc-footer flex-box space-between">
                <view class="left flex-box">
                    <view class="anxinyou-icon">
                        <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/anxinyou.png"></image>
                    </view>
                    <view class="anxinyou"><text>安心游</text></view>
                </view>
                <view class="right flex-box">
                    <view class="biaoqian-item">
                        <text style="vertical-align: 1px;">严格消毒</text>
                    </view>
                    <text class="biaoqian-item">
                        <text>体温监测</text>
                    </text>
                    <text class="biaoqian-item">
                        <text>健康码乘车</text>
                    </text>
                </view>
            </view>
        </view>

        <view class="exchange-wrapper" v-if="skuList.length">
            <view class="header flex-box space-between">
                <view class="start-city">
                    <u-icon color="#17AA7D" name="map" size="20"></u-icon>
                    <text>{{ cfd }}出发</text>
                </view>
                <!-- <view class="exchange-start flex-box">
                    <text>切换出发地 (35个)</text>
                    <u-icon name="arrow-right" size="14" class="ml-20"></u-icon>
                </view> -->
            </view>
            <view class="exchange-date__wrapper">
                <view class="more-choose">
                    <navigator 
                    :url="`/productPages/pages/selectDate/index?skubh=${defaultSelected.skubh}&kcrq=${defaultSelected.kcrq}&teamId=${teamId}&activityId=${activityId}`" 
                    hover-class="navigator-hover-class">更多班期</navigator>
                </view>
                <view class="scroll-list-wrapper">
                    <scroll-view scroll-x="true" class="scroll" :show-scrollbar="false" :enhanced="true">
                        <view 
                        :class="['dates-item', isSelected(item) && 'is-active']" 
                        v-for="(item, index) in skuList" 
                        :key="index"
                        @click="toSelect(item)">
                            <text>{{ moment(item.kcrq).format('MM-DD') }}</text>
                            <text>{{ weekdays[moment(item.kcrq).isoWeekday()] }}</text>
                            <text>￥{{ crhdj ? $fixedPrice(crhdj) : $fixedPrice(item.crj) }}</text>
                            <text v-if="item.stock <= 10">余 {{ item.stock }}</text>
                        </view>
                    </scroll-view>
                </view>
            </view>
        </view>

        <view class="product-detail" v-if="product.cpms">
            <view v-html="productDesc"></view>
        </view>

        <view class="fixed-button">
            <view class="operation">
                <button class="open-type__button" open-type="contact" hover-class="none" plain>
                    <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/kefu.png"></image>
                    <text>客服</text>
                </button>
            </view>
            <view class="operation">
                <button id="product_share" class="open-type__button" open-type="share" hover-class="none" plain>
                    <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/fenxiang_detail.png"></image>
                    <text>分享</text>
                </button>
            </view>
            <view class="button-wrapper">
                <u-button type="primary" :disabled="!defaultSelected.kcrq" shape="circle" @click="toSelectDate">立即购买</u-button>
            </view>
        </view>
    </view>
</template>
<script>
import Top from '@/components/top/Top'
import _ from 'lodash'
import moment from 'moment'
import { mapMutations, mapGetters } from 'vuex'
import graceRichText from '@/utils/formatRichText'
export default {
    components: {
        Top
    },
    onLoad(option) {
        const { cpbh, cxrq, teamId, activityId, dltid } = option

        this.getProductDetail(cpbh, dltid)

        this.cpbh = cpbh
        this.individualCxrq = cxrq || ''
        this.teamId = teamId || ''
        this.activityId = activityId || ''
        this.setIndividual(!!dltid || false)
    },
    created() {
        this.setCxrSelectedList([])
    },
    data() {
        return {
            shareVisible: false,
            product: {},
            currentNum: 0,
            skuList: [],
            dlt: {},
            defaultSelected: {},
            cpbh: '',
            teamId: '',
            activityId: '',
            individualCxrq: '',
            weekdays: {
                1: '周一',
                2: '周二',
                3: '周三',
                4: '周四',
                5: '周五',
                6: '周六',
                7: '周日'
            }
        }
    },
    computed: {
        ...mapGetters(['isIndividual']),
        images() {
            const images = _.get(this.product, ['cpzt']) || ''
            return images.split(',')
        },
        productDesc() {
            if (_.get(this.product, ['cpms'])) {
                return graceRichText.format(_.get(this.product, ['cpms']));
            }
            return ''
        },
        fwbqLabel() {
            if (this.product.fwbq) {
                return this.product.fwbq.split(',')
            }
            return []
        },
        cpbqLabel() {
            if (this.product.cpbq) {
                return this.product.cpbq.split(',')
            }
            return []
        },
        cfd() {
            if (this.product.cfd) {
                const cfd = this.product.cfd.split(',')
                return cfd[cfd.length-1]
            }
            return ''
        },
        crhdj() {
            return _.get(this.dlt, ['crhdj']) || ''
        }
    },
    methods: {
        ...mapMutations(['setOrderProduct', 'setIndividual', 'setCxrSelectedList']),
        moment,
        isSelected(item) {
            return this.defaultSelected.id == item.id
        },
        toSelect(item) {
            if (this.isIndividual && this.defaultSelected.kcrq != item.kcrq) {
                return
            } 
            this.defaultSelected = item
            // uni.navigateTo({
            //     url: `/productPages/pages/selectDate/index?skubh=${item.skubh}&kcrq=${item.kcrq}&teamId=${this.teamId}&activityId=${this.activityId}`
            // })
        },
        toSelectDate() {
            uni.navigateTo({
                url: `/productPages/pages/selectDate/index?skubh=${this.defaultSelected.skubh}&kcrq=${this.defaultSelected.kcrq}&teamId=${this.teamId}&activityId=${this.activityId}`
            })
        },
        getProductDetail(cpbh, dltid = '') {
            let params = { cpbh }
            if (dltid) {
                params = { ...params, dltid }
            }
            this.$api.selectProductVo(params).then(res => {
                this.product = res.data
                this.dlt = res.dlt
                this.setOrderProduct({
                    ...this.product,
                    fjfwOptions: res.fjfw,
                    dlt: { ...res.dlt, dltid }
                })
                this.getDefaultSku(res.data.cpbh, res.skubh)
            })
        },
        getDefaultSku(cpbh, skubh) {
            this.$api.selectProductStock({ 
                    cpbh, 
                    skubh,
                    beginDate: moment().format('YYYY-MM-DD'),
                    endDate: moment().add(1, 'y').format('YYYY-MM-DD')
                }).then(res => {
                    this.skuList = this.sortSkuByDate(res.data)
                    this.skuList.forEach(item => {
                        const date = this.individualCxrq || moment().format('YYYY-MM-DD')
                        if (date == moment(item.kcrq).format('YYYY-MM-DD')) {
                            this.defaultSelected = item
                        }
                    })
            })
        },
        sortSkuByDate(list) {
            return list.sort((a, b) => {
                return Date.parse(a.kcrq.replace(/-/g, '/')) - Date.parse(b.kcrq.replace(/-/g, '/'))
                
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.detail-container {
    padding-bottom: 120px;
    overflow-x: hidden;
    .fixed-button {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        padding: 0 30px;
        height: 120px;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0px -6px 10px 0px rgba(0,0,0,0.0600);
        background: #FFFFFF;
        z-index: 999;
        .button-wrapper {
            width: 64%;
            /deep/
            .u-button {
                height: 90px;
                font-size: 32px;
            }
        }
        .operation {
            width: 18%;
            text-align: center;
            image {
                width: 40px;
                height: 40px;
                display: block;
                margin: 0 auto;
            }
            text {
                display: block;
                text-align: center;
                font-size: 24px;
                font-weight: 400;
                color: #000000;
                line-height: 33px;
            }
        }
    }
    .photo-wrapper {
        height: 434px;
        margin-top: 190px;
        border-top: 1px solid transparent;
        position: relative;
        .product-id,
        .cf-city {
            position: absolute;
            bottom: 12px;
            font-size: 24px;
            font-weight: 400;
            color: #000000;
            line-height: 33px;
        }
        .product-id {
            right: 28px;
        }
        .cf-city {
            left: 28px;
        }
        .indicator-num {
            background: rgba(0,0,0,0.3);
            border-radius: 100px;
            @include flex;
            justify-content: center;
            width: 86px;
            height: 40px;
            border-radius: 20px;
            text-align: center;
            line-height: 40px;

            &__text {
                color: #fff;
                font-size: 28px;
            }
        }
        /deep/ .u-swiper {
            height: 434px !important;
            border-radius: unset !important;
            .u-swiper__wrapper__item__wrapper__image,
            .u-swiper__wrapper {
                border-radius: unset !important;
                height: 100% !important;
            }
        }
        /deep/ .u-swiper__indicator {
            top: 30px;
            right: 30px;
        }
    }
    .desc-wrapper {
        margin: 0 30px;
        border-radius: 20px;
        padding-top: 30px;
        .desc-price {
            margin: 30px auto 20px;
            .price {
                font-size: 50px;
                font-weight: bold;
                color: #17AA7D;
                line-height: 58px;
                letter-spacing: 1px;
            }
        }
        .product-name {
            overflow: hidden; 
            text-overflow: ellipsis;
            display: -webkit-box; 
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            text {
                font-size: 34px;
                font-weight: 500;
                color: #2A2A2A;
                line-height: 44px;
            }
        }
        .consult {
            margin-top: 22px;
            .consult-item {
                padding: 0 16px 6px 16px;
                background: rgba(0,0,0,0.06);
                border-radius: 4px;
                text-align: center;
                text {
                    font-size: 24px;
                    font-weight: 300;
                    color: rgba(0,0,0,0.7);
                }
                &:not(:first-child) {
                    margin-left: 30px;
                }
            }
        }
        .service {
            margin-top: 12px;
            .service-title {
                font-size: 26px;
                font-weight: 400;
                color: #006848;
                line-height: 47px;
            }
            .btn-group {
                .btn-item {
                    margin-left: 30px;
                }
                text {
                    font-size: 20px;
                    font-weight: 400;
                    color: #000000;
                    line-height: 47px;
                    margin-left: 10px;
                }
            }
        }
        .desc-footer {
            margin: 14px -30px -30px;
            height: 88px;
            background: rgba(23,170,125,0.2);
            box-shadow: 0px 0px 23px 0px rgba(147,147,147,0.2);
            opacity: 0.55;
            padding: 0 30px;
            .anxinyou-icon {
                width: 70px;
                height: 60px;
            }
            .anxinyou {
                margin-left: 10px;
                font-size: 32px;
                font-weight: 500;
                color: #006848;
            }
            &>.left {
                width: 220px;
            }
            &>.right {
                flex: 1;
                .biaoqian-item {
                    padding: 0 12px;
                    &:not(:first-child) {
                        border-left: 1px solid #17AA7D;
                    }
                }
                text {
                    font-size: 24px;
                    font-weight: 400;
                    color: #17AA7D;
                    margin-left: 10px;
                }
            }
        }
    }
    .exchange-wrapper {
        margin: 60px -30px;
        background: #FFFFFF;
        padding: 16px 60px 30px 60px;
        box-shadow: 0px 0px 23px 0px rgba(147,147,147,0.2000);
        .start-city {
            font-size: 32px;
            font-weight: bold;
            color: #006848;
            line-height: 47px;
            /deep/ .u-icon {
                display: inline-block;
                margin-right: 12px;
            }
        }
        .exchange-start {
            font-size: 24px;
            font-weight: 400;
            color: #000;
            line-height: 47px;
        }
        .exchange-date__wrapper {
            margin-top: 30px;
            position: relative;
            .more-choose {
                position: absolute;
                top: 0;
                bottom: 0;
                right: -30px;
                background: #fff;
                width: 60px;
                text-align: center;
                font-size: 22px;
                font-weight: 500;
                color: #17AA7D;
                line-height: 40px;
                word-wrap: break-word;
                z-index: 3;
                display: flex;
                align-items: center;
            }
        }
        .scroll-list-wrapper {
            .scroll {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
            }
            .dates-item {
                // width: 160px;
                background: rgba(0,0,0,.1);
                border-radius: 4px;
                opacity: 0.5;
                text-align: center;
                padding: 16px 40px;
                display: inline-block;
                text {
                    color: #000;
                    font-size: 24px;
                    line-height: 33px;
                    display: block;
                    font-weight: 500;
                    &:last-child {
                        font-size: 28px;
                        line-height: 34px;
                    }
                }
                &.is-active {
                    background-color: #17AA7D;
                    opacity: 1;
                    text {
                        color: #fff;
                    }
                }
                &:not(:first-child) {
                    margin-left: 4px;
                }
            }
        }
    }
    .product-detail {
        margin-top: 30px;
        background-color: #3cacc4;
        padding: 30px;
    }
}
</style>