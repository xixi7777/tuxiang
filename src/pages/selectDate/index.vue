<template>
    <view class="app-container">
        <top title="【真纯玩+川剧晚会】" />

        <view class="product">
            <view class="image">
                <image src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/hot_2.png" />
            </view>
            <view>
                <view class="product-title text-ellipsis"><text>【真纯玩+川剧晚会】</text></view>
                <view class="product-price">
                    <text>￥ 5895</text>
                </view>
            </view>
        </view>

        <view class="project-group">
            <view class="project-group__item" v-for="(p, index) in projects" :key="index">
                <view class="project-title"><text>{{ p.title }}</text></view>
                <view class="project-list">
                    <text :class="[item.id === 2 && 'is-active']" v-for="item in p.list" :key="item.id">{{ item.name }}</text>
                </view>
            </view>
        </view>

        <view class="calendar-wrapper">

        </view>

        <view class="person-type">
            <text v-for="(item, index) in personTypes" :key="index">{{ item }}</text>
        </view>

        <view class="quantity-wrapper">
            <view><text>购买数量</text></view>
            <view class="quantity-input">
                <u-input shape="circle" type="number">
                    <view slot="prefix"><u-icon name="minus"></u-icon></view>
                    <view slot="suffix"><u-icon name="plus"></u-icon></view>
                </u-input>
            </view>
        </view>

        <view class="fixed-button">
            <view class="price-wrapper"><text>￥ 5895</text></view>
            <view class="button-wrapper">
                <u-button type="primary" shape="circle">立即购买</u-button>
            </view>
        </view>
    </view>
</template>
<script>
import Top from '@/components/top/Top'
export default {
    components: {
        Top
    },
    data() {
        return {
            projects: [
                { title: '套餐类型', list: [{ id: 1, name: '都青纯玩一日游含门票' }] },
                { title: '玩乐项目', list: [{ id: 1, name: '水上餐厅+赠灯影戏' }, { id: 2, name: '升级蜀风雅韵川剧晚会' }] },
                { title: '交通车型', list: [{ id: 1, name: '【舒适型】空调旅游车' }, { id: 2, name: '【豪华型】宽体头等舱' }, { id: 3, name: 'C6人VIP团商务车' }] }
            ],
            personTypes: ['成人', '儿童', '老人', '残疾人']
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
        /deep/
        .u-input {
            border: 1px solid #d7d7d7;
            padding: 0 30px !important;
            .u-input__content__field-wrapper {
                padding: 10px;
                border-left: 1px solid #d7d7d7;
                border-right: 1px solid #d7d7d7;
            }
            .u-input__content__prefix-icon {
                margin-right: 20px;
            }
            .u-input__content__subfix-icon {
                margin-left: 20px;
            }
        }
    }
}
.app-container {
    padding-bottom: 150px;
}
</style>