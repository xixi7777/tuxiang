<template>
    <view class="app-container">
        <top :title="`【${name}】`" />

        <view class="product">
            <view class="image">
                <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/hot_2.png" />
            </view>
            <view>
                <view class="product-title text-ellipsis"><text>{{ `【${name}】` }}</text></view>
                <view class="product-price">
                    <text>￥ {{ price }}</text>
                </view>
            </view>
        </view>

        <view class="project-group">
            <view class="project-group__item" v-for="p in skuggList" :key="p.id">
                <view class="project-title"><text>{{ p.ggmc }}</text></view>
                <view class="project-list">
                    <text @click="changeSkugg(p, c)" :class="[skuSelected[p.id] == c.id && 'is-active']" v-for="c in p.childList" :key="c.id">{{ c.ggmc }}</text>
                </view>
            </view>
        </view>

        <view class="calendar-wrapper">
            <view class="months-wrapper">
                <scroll-view scroll-x="true" class="scroll">
                    <view @click="selectMonth(m)" :class="['month-item', m == currentMonth && 'is-selected']" v-for="(m, i) in months" :key="i">
                        <text>{{ m }}</text>
                        <text class="line"></text>
                    </view>
                </scroll-view>
            </view>

            <view class="calendar-content">

            </view>
        </view>

        <view class="person-type">
            <text v-for="(item, index) in personTypes" :key="index">{{ item }}</text>
        </view>

        <view class="quantity-wrapper">
            <view><text>购买数量</text></view>
            <view class="quantity-input">
                <NumberInput v-model="count" />
                <!-- <u-input shape="circle" type="number" v-model="count">
                    <view slot="prefix" @click="decrease"><u-icon name="minus"></u-icon></view>
                    <view slot="suffix" @click="increase"><u-icon name="plus"></u-icon></view>
                </u-input> -->
            </view>
        </view>

        <view class="fixed-button">
            <view class="price-wrapper"><text>￥ {{ price }}</text></view>
            <view class="button-wrapper">
                <u-button type="primary" shape="circle">立即购买</u-button>
            </view>
        </view>
    </view>
</template>
<script>
import Top from '@/components/top/Top'
import NumberInput from '@/components/numberInput/NumberInput'
import _ from 'lodash'
import moment from 'moment'
export default {
    components: {
        Top,
        NumberInput
    },
    data() {
        return {
            currentMonth: '',
            defaultSkubh: '',
            personTypes: ['成人', '儿童'],
            skuggList: [],
            count: 0,
            price: 0,
            skuSelected: {},
            months: [],
            productStockParam: {
                cpbh: '',
                skubh: '',
                beginDate: '',
                endDate: ''
            }
        }
    },
    onLoad(option) {
        const { cpbh, skubh } = option
        this.defaultSkubh = skubh || ''
        this.getProductSku(cpbh)
        // this.getProductDetail(cpbh)
        this.productStockParam = {
            ...this.productStockParam,
            skubh: this.defaultSkubh,
            cpbh
        }
        this.setMonths()
    },
    computed: {
        name() {
            let s = []
            this.skuggList.forEach(item => {
                item.childList.forEach(child => {
                    if (Object.values(this.skuSelected).includes(child.id)) {
                        s.push(child.ggmc)
                    }
                })
            })
            return s.join('+')
        }
    },
    methods: {
        selectMonth(month) {
            this.currentMonth = month
        },
        setMonths() {
            const nowMonth = moment().month()
            this.currentMonth = `${nowMonth+1}月`
            this.months.push(this.currentMonth)
            for (let i = 1, j = 0; i < 12; i++) {
                if (nowMonth+i+1 >= 13) {
                    const monthStr = `${moment().year()+1}年${j+1}月`
                    const nextYearMonth = j === 0 ? monthStr.substring(2): `${j+1}月`
                    this.months.push(nextYearMonth)
                    j++
                } else {
                    this.months.push(`${nowMonth+i+1}月`)
                }
            }
        },
        changeSkugg(p, c) {
            if (!this.skuSelected[p.id] || this.skuSelected[p.id] !== c.id) {
                this.skuSelected[p.id] = c.id
            }
            else if (this.skuSelected[p.id] == c.id) {
                this.skuSelected[p.id] = ''
            }
            if (Object.values(this.skuSelected).every(Boolean)) {
                this.productStockParam.skubh = Object.values(this.skuSelected).join('_')
            }
        },
        setSkuParentId() {
            this.skuggList.forEach(item => {
                this.$set(this.skuSelected, item.id, '')
            })
        },
        getProductSku(cpbh) {
            this.$api.selectProductSkuggVo({ cpbh })
            .then(res => {
                this.skuggList = res.data.skuggList
                this.setSkuParentId()
            })
        },
        getProductDetail(cpbh) {
            this.$api.selectProductVo({ cpbh }).then(res => {
                this.product = res.data
            })
        },
        selectProductStock: _.debounce(function() {
            this.$api.selectProductStock(this.productStockParam).then(res => {

            })
        }, 300),
        increase() {
            console.log('increase')
            if (this.count < this.product.stock) {
                this.count++  
            }
        },
        decrease() {
            console.log('decrease')
            if (this.count > 0) {
                this.count--
            }
        },
    },
    watch: {
        productStockParam: {
            immediate: true,
            deep: true,
            handler(n) {
                this.selectProductStock()
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

    .month-item {
        display: inline-block;
        font-size: 30px;
        font-weight: 500;
        color: #333333;
        line-height: 35px;
        height: 45px;
        position: relative;
        &:not(:first-child) {
            margin-left: 74px;
        }
        .line {
            display: none;
        }
        &.is-selected {
            color: #17AA7D;
            .line {
                display: block;
                position: absolute;
                height: 8px;
                background-color: #17AA7D;
                border-radius: 4px;
                bottom: 0;
                left: 5px;
                right: 5px;
            }
        }
    }
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