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
                    <text>￥ {{ totalPrice }}</text>
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
            <Calendar :sku-list="skuList" @select-date="selectDate" :default-select-date="calendarDefaultDate" />
        </view>

        <view class="person-type">
            <text v-for="(item, index) in personTypes" :key="index">{{ item }}</text>
        </view>

        <view class="quantity-wrapper">
            <view><text>购买数量</text></view>
            <view class="quantity-input">
                <NumberInput v-model="count" :max="countMax" />
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
import NumberInput from '@/components/numberInput/NumberInput'
import Calendar from '@/components/calendar/Calendar'

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
            defaultSkubh: '',
            calendarDefaultDate: '',
            personTypes: ['成人', '儿童'],
            skuggList: [],
            skuList: [],
            count: 0,
            skuXm: {},
            selectedSku: {},
            productStockParam: {
                cpbh: '',
                skubh: '',
                beginDate: '2022-07-11',
                endDate: '2023-07-11'
            }
        }
    },
    onLoad(option) {
        let { skubh, kcrq } = option
        this.defaultSkubh = skubh || ''
        this.calendarDefaultDate = kcrq || ''
        this.productStockParam.skubh = skubh
    },
    computed: {
        ...mapGetters(['orderProduct']),
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
            return s.join('+')
        },
        name() {
            return _.get(this.orderProduct, ['cpmc'])
        },
        buyDisabled() {
            // return false
            return !this.count || !this.selectedSku.kcrq
        },
        totalPrice() {
            const crj = _.get(this.selectedSku, ['crj'])*1 || 0
            return crj * this.count
        },
        countMax() {
            return _.get(this.selectedSku, ['stock']) || -1
        }
    },
    methods: {
        ...mapMutations(['setOrderInfo']),
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
                if (this.defaultSkubh) {
                    this.skuList.forEach(sku => {
                        if (sku.skubh === this.defaultSkubh) {
                            this.selectedSku = sku
                        }
                    })
                }
            })
        }, 300),
        confirmOrder() {
            this.setOrderInfo({
                product: this.orderProduct,
                count: this.count,
                sku: this.selectedSku,
                skuName: this.skuName
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
        image {
            width: 100%;
            height: 100%;
        }
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
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text {
        font-size: 32px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #006848;
        line-height: 47px;
    }
    .quantity-input {
        width: 272px;
    }
}
.app-container {
    padding-bottom: 150px;
}
</style>