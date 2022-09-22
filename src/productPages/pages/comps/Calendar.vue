<template>
    <view class="calendar-wrapper">
        <!-- month -->
        <view class="header">
            <scroll-view scroll-x="true" class="scroll">
                <view 
                v-for="(item, i) in months" 
                @click="changeMonth(item)" 
                :class="['month-item', (currentMonth.y == item.y && currentMonth.m == item.m) && 'is-selected']" 
                :key="i">
                    <text v-if="year == item.y">{{ `${item.m}月` }}</text>
                    <text v-else>{{ `${(item.y).toString().substring(2)}年${item.m}月` }}</text>
                    <text class="line"></text>
                </view>
            </scroll-view>
        </view>

        <!-- week -->
        <view class="week">
            <view class="weekday" v-for="(week, index) in weekDay" :key="index">
                <view :class="['week-item', (week == '日' || week == '六') && 'weekend']">{{ week }}</view>
            </view>
        </view>

        <!-- days -->
        <view class="days-content">
            <view class="days">
                <view class="item" v-for="(item, index) in dates" :key="index">
                    <view 
                    :class="['day', 
                    (!item.isCurM || disabled) && 'not-current',
                    isSelected(item.year, item.month, item.date) && 'is-selected'
                    ]"
                    @click="selectDate(item)">
                        <view class="date-num">{{ item.date }}</view>
                        <view class="date-price" v-if="crhdj">{{ $fixedPrice(crhdj) }}</view>
                        <view class="date-price" v-else>{{ item.crj ? `￥${$fixedPrice(item.crj)}`: ' ' }}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        // 星期几为第一天（0为星期日）
        weekstart: {
            type: Number,
            default: 0
        },
        // 标记的日期、有sku的日期
        skuList: {
            type: Array,
            default: () => []
        },
        defaultSelectDate: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        crhdj: {
            type: [String, Number],
            default: null
        }
    },
    data() {
        return {
            currentMonth: { y: new Date().getFullYear(), m: new Date().getMonth()+1 },
            months: [],
            dates: [],
            weektext: ['日', '一', '二', '三', '四', '五', '六'],
            year: new Date().getFullYear(),
            month: new Date().getMonth()+1,
            choose: {}
        }
    },
    created() {
        this.setMonths()
        // this.dates = this.monthDay(this.year, this.month)
    },
    computed: {
        weekDay() {
            return this.weektext.slice(this.weekstart).concat(this.weektext.slice(0, this.weekstart))
        },
        today() {
            let date = new Date()
            let y = date.getFullYear()
            let m = date.getMonth()
            let d = date.getDate()
            let week = new Date().getDay()
            let formatWeek = `星期${this.weektext[week]}`
            let today = {
                week: formatWeek,
                year: y,
                month: m+1,
                date: d,
                kcrq: `${y}-${m+1}-${d}`
            }
            return today
        }
    },
    methods: {
        changeMonth(month) {
            this.currentMonth = month
            this.dates = this.monthDay(this.currentMonth.y, this.currentMonth.m)
            this.dates = this.setDateStock()
        },
        // 获取当前月及一年后的月份
        setMonths() {
            this.months = []
            // this.months.push({
            //     y: this.year,
            //     m: this.month-1
            // })
            for (let i = 0, j = 0; i < 12; i++) {
                if (this.month+i >= 13) {
                    this.months.push({
                        y: this.year+1,
                        m: j+1
                    })
                    j++
                } else {
                    this.months.push({
                        y: this.year,
                        m: this.month+i
                    })
                }
            }
        },
        // 获取选中月份数据
        monthDay(y, m) {
            let dates = []
            // 当月第一天周几
            let firstDayOfMonth = new Date(y, m-1, 1).getDay()
            // 当月最后一天
            let lastDayOfMonth = new Date(y, m-1, 0).getDate()
            // 上一个月的最后一天
            let lastDayOfMonthLastMonth = new Date(y, m-2, 0).getDate()
            let weekstart = this.weekstart === 7 ? 0 : this.weekstart
            let startDay = (() => {
                // 周初有几天是上个月的
                if (firstDayOfMonth == weekstart) {
                    return 0
                } else if (firstDayOfMonth > weekstart) {
                    return firstDayOfMonth - weekstart
                } else {
                    return 7 - weekstart + firstDayOfMonth
                }
            })()
            let endDay = 7 - ((startDay + lastDayOfMonth) % 7)
            for (let i = 1; i <= startDay; i++) {
                dates.push({
                    date: lastDayOfMonthLastMonth-startDay+i,
                    day: weekstart+i-1 || 7,
                    month: m-1 >= 0 ? m-1 : 12,
                    year: m-1 >= 0 ? y : y-1
                })
            }

            for (let j = 1; j <= lastDayOfMonth; j++) {
                dates.push({
                    date: j,
                    day: (j%7) + firstDayOfMonth-1 || 7,
                    month: m,
                    year: y,
                    isCurM: true
                })
            }

            for (let k = 1; k <= endDay; k++) {
                dates.push({
                    date: k,
                    day: (lastDayOfMonth + startDay + weekstart + k -1) % 7 || 7,
                    month: m+1 <= 11 ? m+1 : 0,
                    year: m+1 <= 11 ? y : y+1
                })
            }
            // dates = this.setDateStock(dates)
            return dates
        },
        setDateStock() {
            const skuDates = []
            this.dates.forEach(date => {
                let temp = date
                this.skuList.forEach(sku => {
                    let skuDate = []
                    if (sku.kcrq) {
                        skuDate = sku.kcrq.split(' ')
                        skuDate = skuDate[0].split('-')
                    }
                    if (skuDate[0] == date.year 
                        && skuDate[1] == date.month 
                        && skuDate[2] == date.date) {
                        temp = { ...temp, ... sku }
                    }
                })
                if (temp.year == this.choose.year
                    && temp.month == this.choose.month
                    && temp.date == this.choose.date) {
                    this.selectDate(temp)
                }
                skuDates.push(temp)
            })
            
            return skuDates
        },
        isSelected(y, m, d) {
            return y == this.choose.year && m == this.choose.month && d == this.choose.date
        },
        selectDate(date) {
            if (this.disabled) {
                return
            }
            this.$emit('select-date', date)
            this.choose = date
        }
    },
    watch: {
        defaultSelectDate: {
            immediate: true,
            handler(n) {
                if (n) {
                    let strDate = n.split(' ')
                    strDate = strDate[0].split('-')
                    this.choose = {
                        year: strDate[0],
                        month: strDate[1],
                        date: strDate[2]
                    }
                    this.currentMonth = { y: strDate[0], m: strDate[1] }
                    // this.dates = this.monthDay(this.currentMonth.y, this.currentMonth.m)
                } else {
                    this.choose = this.today
                }
            }
        },
        skuList: {
            immediate: true,
            deep: true,
            handler(n) {
                if (n.length) {
                    this.dates = this.setDateStock()
                } else {
                    this.dates = this.monthDay(this.year, this.month)
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.calendar-wrapper {
    .header {
        // padding-bottom: 22px;
        border-bottom: 1px dashed #d7d7d7;
        padding: 0 16px 22px;
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
    .week {
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px dashed #d7d7d7;
        padding: 22px 0;
        .weekday {
            text-align: center;
            flex: 1;
            .week-item {
                line-height: 42px;
                height: 42px;
                font-size: 30px;
                font-weight: 400;
                color: #333;
                &.weekend {
                    color: #17AA7D;
                }
            }
        }
    }
    .days-content {
        .days {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            .item {
                margin-top: 10px;
                width: calc(100% / 7);
            }
        }
        .day {
            width: 100%;
            text-align: center;
            padding: 6px auto;
            .date-num {
                font-size: 32px;
                font-weight: 500;
                color: #333;
            }
            .date-price {
                height: 33px;
                font-size: 22px;
                font-weight: 500;
                color: #FF9000;
            }
            &.not-current {
                .date-num, .date-price {
                    color: rgba(0,0,0,0.2000);
                }
            }
            &.is-selected {
                background: #17AA7D;
                border-radius: 20px;
                .date-num, .date-price {
                    color: #fff;
                }
            }
            &.weekend:not(.is-selected) {
                .date-num {
                    color: #17AA7D;
                }
            }
        }
    }
}
</style>