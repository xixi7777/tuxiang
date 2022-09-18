<template>
    <view class="app-container">
        <top :title="name" />

        <view class="product">
            <view class="image">
                <image :src="productImage" lazy-load />
            </view>
            <view>
                <view class="product-title text-ellipsis"><text>{{ name }}</text></view>
                <view class="product-price">
                    <text>￥ {{ crhdj ? $fixedPrice(crhdj) : selectedSku.crj ? $fixedPrice(selectedSku.crj) : '' }}</text>
                </view>
            </view>
        </view>

        <view class="project-group">
            <view class="project-group__item" v-for="p in skuggList" :key="p.id">
                <view class="project-title"><text>{{ p.ggmc }}</text></view>
                <view class="project-list">
                    <text 
                    @click="changeSkugg(p, c)" 
                    :class="[skuXm[p.id] == c.id && 'is-active']" 
                    v-for="c in p.childList" 
                    :key="c.id">{{ c.ggmc }}</text>
                </view>
            </view>
        </view>

        <view class="calendar-wrapper">
            <Calendar 
            :disabled="isIndividual" 
            :sku-list="skuList" 
            :crhdj="crhdj"
            @select-date="selectDate" 
            :default-select-date="calendarDefaultDate" />
        </view>

        <view class="quantity-wrapper">
            <view class="quantity-list">
                <view class="title"><text>购买数量 <text class="text-error text-sm" v-if="selectedSku.stock <= 10">(余 {{ selectedSku.stock }})</text></text></view>
            </view>
            <view class="quantity-list" v-for="(item, index) in orderCount" :key="index">
                <view>
                    <text>{{ item.label }}</text>
                    <text class="price">￥{{ item.hdj ? item.hdj : item.price }}</text>
                </view>
                <view class="quantity-input">
                    <NumberInput v-model="item.count" :max="countMax(item.value)" />
                </view>
            </view>
        </view>

        <view class="quantity-wrapper" v-if="orderExtra.length">
            <view class="quantity-list">
                <view class="title"><text>附加服务</text></view>
            </view>
            <view class="quantity-list" v-for="(item, index) in orderExtra" :key="index">
                <view>
                    <text>{{ item.fwmc }}</text>
                    <text class="price">￥{{ $fixedPrice(item.price) }}</text>
                </view>
                <view class="quantity-input">
                    <NumberInput v-model="item.count" />
                </view>
            </view>
        </view>

        <view class="fixed-button">
            <view class="price-wrapper"><text>￥ {{ totalPrice }}</text></view>
            <view class="button-wrapper">
                <u-button :disabled="buyDisabled" type="primary" shape="circle" @click="confirmOrder">立即购买</u-button>
            </view>
        </view>
    </view>
</template>
<script>
import Top from '@/components/top/Top'
import NumberInput from '../comps/NumberInput'
import Calendar from '../comps/Calendar'

import _ from 'lodash'
import moment from 'moment'
import { mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        Top,
        NumberInput,
        Calendar
    },
    data() {
        return {
            teamId: '',
            activityId: '',
            defaultSkubh: '',
            calendarDefaultDate: '',
            skuggList: [],
            skuList: [],
            skuXm: {},
            selectedSku: {},
            orderCount: [],
            orderExtra: [],
            productStockParam: {
                cpbh: '',
                skubh: '',
                beginDate: moment().format('YYYY-MM-DD'),
                endDate: moment().add(1, 'y').format('YYYY-MM-DD')
            }
        }
    },
    onLoad(option) {
        let { skubh, kcrq } = option
        this.defaultSkubh = skubh || ''
        this.calendarDefaultDate = kcrq || ''
        this.productStockParam.skubh = skubh
        this.teamId = option.teamId || ''
        this.activityId = option.activityId
    },
    computed: {
        ...mapGetters(['orderProduct', 'isIndividual', 'cxlxOptions']),
        fjfwOptions() {
            return _.get(this.orderProduct, ['fjfwOptions']) || []
        },
        productImage() {
            let images = _.get(this.orderProduct, ['cpzt']) || ''
            images = images.split(',')
            return images[0]
        },
        skuName() {
            let s = []
            this.skuggList.forEach(item => {
                item.childList.forEach(child => {
                    if (Object.values(this.skuXm).includes(child.id)) {
                        s.push(child.ggmc)
                    }
                })
            })
            return s.join('|')
        },
        name() {
            return _.get(this.orderProduct, ['cpmc'])
        },
        buyDisabled() {
            return !_.sumBy(this.orderCount, 'count') || !this.selectedSku.kcrq
        },
        crj() {
            return _.get(this.selectedSku, ['crj']) ?? 0
        },
        etj() {
            return _.get(this.selectedSku, ['etj']) ?? 0
        },
        cryhj() {
            return _.get(this.orderProduct, ['yhjPrice']) ?? 0
        },
        etyhj() {
            return _.get(this.orderProduct, ['yhjPriceEt']) ?? 0
        },
        crhdj() {
            return _.get(this.orderProduct, ['dlt', 'crhdj']) || ''
        },
        ethdj() {
            return _.get(this.orderProduct, ['dlt', 'ethdj']) || ''
        },
        totalCountPrice() {
            return this.orderCount.reduce((prev, curr) => {
                return prev += curr.count*(curr.hdj ? curr.hdj : curr.price)
            }, 0)
        },
        totalExtra() {
            return this.orderExtra.reduce((prev, curr) => {
                return prev += curr.count*curr.price
            }, 0)
        },
        totalPrice() {
            return (this.totalCountPrice + this.totalExtra).toFixed(2)
        }
    },
    methods: {
        ...mapMutations(['setOrderInfo', 'setCxlxOptions']),
        getCxlxOptions() {
            this.$api.orderConfigType({ code: 'mall_order_people' }).then(res => {
                this.setCxlxOptions(res.data)
            })
        },
        countMax(key) {
            const stock = _.get(this.selectedSku, ['stock'])
            return stock - _.sumBy(this.orderCount.filter(item => item.value !== key), 'count')
        },
        selectDate(date) {
            this.selectedSku = date
        },
        changeSkugg(p, c) {
            if (!this.skuXm[p.id] || this.skuXm[p.id] !== c.id) {
                this.skuXm[p.id] = c.id
            }
            else if (this.skuXm[p.id] == c.id) {
                this.skuXm[p.id] = ''
            }
            if (Object.values(this.skuXm).every(Boolean)) {
                this.productStockParam.skubh = Object.values(this.skuXm).join('_')
            }
        },
        setSkuParentId() {
            let skus = []
            if (this.defaultSkubh) {
                skus = this.defaultSkubh.split('_')
            }
            this.skuggList.forEach(item => {
                this.$set(this.skuXm, item.id, '')
                item.childList.forEach(sub => {
                    if (skus.includes(sub.id)) {
                        this.skuXm[item.id] = sub.id
                    }
                })
            })
        },
        getProductSku(cpbh) {
            this.$api.selectProductSkuggVo({ cpbh })
            .then(res => {
                this.skuggList = res.data.skuggList
                this.setSkuParentId()
            })
        },
        selectProductStock: _.debounce(function() {
            this.$api.selectProductStock(this.productStockParam).then(res => {
                this.skuList = res.data
                if (this.calendarDefaultDate) {
                    this.skuList.forEach(sku => {
                        if(sku.kcrq == this.calendarDefaultDate) {
                            this.selectedSku = sku
                        }
                    })
                }
            })
        }, 300),
        confirmOrder() {
            this.setOrderInfo({
                product: this.orderProduct,
                orderCount: this.orderCount,
                orderExtra: this.orderExtra,
                sku: this.selectedSku,
                skuName: this.skuName,
                teamId: this.teamId,
                activityId: this.activityId
            })
            uni.navigateTo({ 
                url: '/orderPages/pages/orderConfirm/index'
            })
        }
    },
    watch: {
        productStockParam: {
            immediate: true,
            deep: true,
            handler(n) {
                this.selectProductStock()
            }
        },
        orderProduct: {
            immediate: true,
            deep: true,
            handler(n) {
                if (n.cpbh) {
                    this.getProductSku(n.cpbh)
                    this.productStockParam = {
                        ...this.productStockParam,
                        skubh: this.defaultSkubh,
                        cpbh: n.cpbh
                    }
                }
            }
        },
        cxlxOptions: {
            immediate: true,
            deep: true,
            handler(n) {
                if (!n.length) {
                    this.getCxlxOptions()
                } else {
                    this.orderCount = []
                    n.forEach(item => {
                        this.orderCount.push({
                            ...item,
                            count: 0
                        })
                    })
                }
            }
        },
        fjfwOptions: {
            immediate: true,
            deep: true,
            handler(n) {
                this.orderExtra = []
                n.forEach(item => {
                    this.orderExtra.push({
                        ...item,
                        count: 0
                    })
                })
            }
        },
        selectedSku: {
            immediate: true,
            deep: true,
            handler(n) {
                this.orderCount.forEach(item => {
                    if (item.value == 1) {
                        this.$set(item, 'price', this.$fixedPrice(n.crj))
                        this.$set(item, 'hdj', this.$fixedPrice(this.crhdj))
                        this.$set(item, 'yhj', this.$fixedPrice(this.cryhj))
                    } else if (item.value == 2) {
                        this.$set(item, 'price', this.$fixedPrice(n.etj))
                        this.$set(item, 'hdj', this.$fixedPrice(this.ethdj))
                        this.$set(item, 'yhj', this.$fixedPrice(this.etyhj))
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
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
    z-index: 99;
    .price-wrapper {
        flex: 1;
        text {
            font-size: 42px;
            font-weight: 500;
            color: #17AA7D;
        }
    }
    .button-wrapper {
        width: 65%;
        /deep/
        .u-button {
            height: 90px;
            // width: 100%;
            font-size: 32px;
        }
    }
}
.product {
    display: flex;
    padding: 30px 0;
    align-items: center;
    border-bottom: 1px dashed #d7d7d7;
    margin-top: 190px;
    .image {
        width: 155px;
        height: 155px;
    }
    .product-title {
        max-width: 400px;
        font-size: 36px;
        font-weight: 500;
        color: #000000;
        line-height: 50px;
        margin-left: 30px;
    }
    .product-price {
        margin-top: 10px;
        font-size: 50px;
        font-weight: bold;
        color: #17AA7D;
        line-height: 58px;
        letter-spacing: 1px;
        margin-left: 30px;
    }
}
.project-group {
    .project-group__item {
        margin-top: 40px;
        .project-title {
            font-size: 32px;
            font-weight: bold;
            color: #006848;
            line-height: 47px;
        }
        .project-list {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
            margin-top: 30px;
            text {
                display: block;
                padding: 0 20px;
                height: 60px;
                border-radius: 30px;
                line-height: 60px;
                font-size: 28px;
                color: #000;
                font-weight: 300;
                background: rgba(0,0,0,0.0600);
                &.is-disabled {
                    color: rgba(0,0,0,0.2000);
                }
                &.is-active {
                    color: #fff;
                    background: #17AA7D;
                }
            }
        }
    }
}
.calendar-wrapper {
    margin-top: 45px;
    padding-bottom: 54px;
    border-bottom: 1px dashed #d7d7d7;
}
.person-type {
    margin-top: 40px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    text {
        display: block;
        height: 60px;
        line-height: 60px;
        background: rgba(0,0,0,0.0600);
        border-radius: 30px;
        color: #000;
        padding: 0 18px;
    }
}
.quantity-wrapper {
    margin-top: 20px;
    .quantity-list {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-size: 32px;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: bold;
            color: #006848;
            line-height: 47px;
        }
        .price {
            color: #17AA7D;
            font-size: 26px;
            margin-left: 20px;
        }
        .quantity-input {
            width: 272px;
        }
    }
}
.app-container {
    padding-bottom: 150px;
}
</style>