<template>
    <view class="app-container">
        <top :title="title" />

        <view class="list_wrapper">
            <view class="list" v-if="!integral">
                <view class="list__item" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
                    <view class="image">
                        <image :src="image(item)" lazy-load></image>
                    </view>
                    <view class="product__name">
                        <text>{{ item.cpmc }}</text>
                    </view>
                </view>
            </view>
            <view class="list" v-else>
                <view class="integral__item" v-for="(item, index) in list" :key="index">
                    <view class="list__name">
                        <view class="product__name"><text>{{ item.cpmc }}</text></view>
                        <view class="create_time"><text>{{ moment(item.createTime).format('YYYY-MM-DD HH:mm') }}</text></view>
                    </view>
                    <view class="integral">
                        <text>{{ item.integral }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import Top from '@/components/top/Top'
import moment from 'moment'
export default {
    components: {
        Top
    },
    data() {
        return {
            list: [],
            type: 0, // 0: 分享, 1: 收藏,
            integral: '' // 是否是积分列表
        }
    },
    onLoad(option) {
        this.type = option.type
        this.integral = option.integral
        if (!this.integral) {
            this.getList(option.type)
        } else {
            this.getIntegral()
        }
    },
    computed: {
        title() {
            if (this.type == 1) {
                return '我的收藏'
            }
            if (this.type == 0) {
                return '我的分享'
            }
            if (this.integral) {
                return '积分明细'
            }
            return ''
        }
    },
    methods: {
        moment,
        image(pro) {
            return pro.image ? pro.image.split(',')[0] : ''
        },
        toDetail(pro) {
            uni.navigateTo({
                url: `/productPages/pages/productDetail/index?cpbh=${pro.cpbh}`
            })
        },
        getList(type) {
            this.$api.getScList({
                openid: uni.getStorageSync('openid'),
                type
            }).then(res => {
                this.list = res.data
            })
        },
        getIntegral() {
            this.$api.getIntegralList({
                openid: uni.getStorageSync('openid')
            }).then(res => {
                this.list = res.data
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.list_wrapper {
    margin-top: 190px;
    .list {
        margin-top: 12px;
        .list__item {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:not(:last-of-type) {
                border-bottom: 1px solid #d7d7d7;
            }
            .image {
                width: 80px;
                height: 80px;
            }
            .product__name {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 28px;
                color: #333;
                white-space: nowrap;
                padding-left: 30px;
            }
        }
        .integral__item {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #d7d7d7;
            .list__name {
                flex: 1;
                .product__name {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 28px;
                    color: #333;
                    white-space: nowrap;
                }
                .create_time {
                    font-size: 24px;
                    color: #969696;
                    margin-top: 10px;
                }
            }
            .integral {
                text-align: right;
                width: 150px;
                font-weight: 500;
                font-size: 36px;
            }
        }
    }
}
</style>