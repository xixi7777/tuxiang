<template>
    <view class="app-container" :style="{backgroundImage: `url(${bgImage})`}">
        <view class="spell-group">
            <view class="spell-item" v-for="(item, index) in list" :key="index">
                <view class="header">
                    <text class="start-date">出发日期：{{ item.cfrq }}</text>
                    <text class="sign-up">报名中</text>
                </view>
                <view class="content">
                    <view class="left">
                        <view class="title"><text>{{ item.cpmc }}</text></view>
                        <view class="sign-date"><text>报名时间：{{ registerDate(item) }}</text></view>
                        <view>
                            <text class="vip-price">{{ item.hdPriceName }}: 
                                <text class="price-code">￥</text>
                                <text class="price">{{ item.hdPrice }}</text>
                            </text>
                            <text class="original-price">
                                原价: {{ item.yjPrice }}
                            </text>
                        </view>
                        <view>
                            <text class="member">{{ item.teamRs }}人发起</text>
                        </view>
                        <view class="item-footer">
                            <view class="grad" @click="goDetail(item)">
                                <text>立即抢位</text>
                            </view>
                            <view class="grad-icon">
                                <button 
                                :data-cpbh="item.cpbh"
                                data-image="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/yunnan.png"
                                class="open-type__button" 
                                id="product_share" 
                                open-type="share" 
                                hover-class="none" 
                                plain>
                                    <image class="icon-share" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/share.png"></image>
                                </button>
                            </view>
                            <view class="grad-icon">
                                <button class="open-type__button" open-type="contact" hover-class="none" plain>
                                    <image class="icon-headset" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/listen.png"></image>
                                </button>
                            </view>
                        </view>
                    </view>
                    <view class="right">
                        <view class="image">
                            <image :src="image(item)"></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            query: {
                pageNum: 1,
                pageSize: 10
            },
            bgImage: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/spell_bg.png',
            total: 0,
            list: []
        }
    },
    onReachBottom() {
        if (this.list.length === this.total) {
            return
        }
        this.query.pageNum++
        this.getList()
    },
    onPullDownRefresh() {
        this.query.pageNum = 1
        this.getList()
    },
    onShow() {
        this.getList()
        this.getConfig()
    },
    methods: {
        getConfig() {
            this.$api.getConfigCache({ key: 'mall.system.phb' })
            .then(res => {
                let keyValue = res.data['mall.system.phb'].keyValue
				keyValue = JSON.parse(keyValue)
                this.bgImage = keyValue.pt.image
            })
        },
        registerDate(item) {
            return `${uni.$u.timeFormat(item.bmBeginDate, 'mm/dd')}-${uni.$u.timeFormat(item.bmEndDate, 'mm/dd')}`
        },
        image(item) {
            const images = item.image.split(',')
            return images[0]
        },
        goDetail(item) {
            uni.navigateTo({ url: `/productPages/pages/productDetail/index?individual=true&cpbh=${item.cpbh}&cxrq=${item.cfrq}`})
        },
        getList() {
            if (this.query.pageNum === 1) {
                this.list = []
            }
            this.$api.mallLeagueVo(this.query).then(res => {
                this.total = res.total
                this.list = [...this.list, ...res.rows]
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-container {
        // background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/spell_bg.png);
        background-size: 100% 596px;
        background-attachment: fixed;
        background-repeat: no-repeat;
    }
    .spell-group {
        margin-top: 455px; 
    }
    .spell-item {
        height: 422px;
        background: linear-gradient(335deg, rgba(255,255,255,0) 0%, #FFFFFF 100%);
        box-shadow: 0px 17px 23px 0px rgba(138,131,168,0.1);
        border-radius: 20px;
        overflow: hidden;
        &:not(:first-child) {
            margin-top: 30px;
        }
        .header {
            height: 68px;
            line-height: 68px;
            background-color: #17AA7D;
            padding: 0 30px;
            position: relative;
            .start-date {
                color: #fff;
                font-size: 28px;
            }
            .sign-up {
                background: #FFB359;
                color: #fff;
                height: 36px;
                width: 94px;
                border-radius: 7px;
                font-size: 24px;
                position: absolute;
                right: 40px;
                top: 12px;
                line-height: 36px;
                text-align: center;
            }
        }
        .content {
            padding: 30px;
            display: flex;
            .left {
                flex: 1;
                .title {
                    max-width: 300px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text {
                        font-size: 34px;
                        font-weight: 500;
                        color: #2a2a2a;
                        line-height: 44px;
                    }
                }
                .sign-date {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text {
                        font-size: 26px;
                        font-family: 'PingFangSC-Light, PingFang SC';
                        font-weight: 300;
                        color: #969696;
                        line-height: 44px;
                    }
                }
                .vip-price {
                    font-size: 28px;
                    font-weight: 300;
                    color: #7F776F;
                    line-height: 44px;
                    margin-top: 9px;
                    .price-code {
                        font-size: 24px;
                        font-weight: bold;
                        color: #17aa7d;
                    }
                    .price {
                        line-height: 53px;
                        font-size: 36px;
                        font-weight: bold;
                        color: #17aa7d;
                    }
                }
                .original-price {
                    font-size: 24px;
                    color: #7f776f;
                    line-height: 44px;
                    text-decoration: line-through;
                    margin-left: 15px;
                }
                .member {
                    font-size: 26px; 
                    line-height: 44px;
                    color: #7B6654;
                    margin-top: 7px;
                }
                .item-footer {
                    display: flex;
                    margin-top: 20px;
                    justify-content: space-between;
                    align-items: center;
                    .grad {
                        width: 183px;
                        height: 63px;
                        border-radius: 34.5px;
                        overflow: hidden;
                        position: relative;
                        background-image: url(//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/qiangwei.png);
                        background-size: cover;
                        text {
                            position: absolute;
                            top: 0;
                            left: 0;
                            font-size: 30px;
                            color: #780000;
                            line-height: 63px;
                            width: 100%;
                            text-align: center;
                            z-index: 2;
                        }
                    }
                    .grad-icon {
                        flex: 1;
                    }
                    .icon-share {
                        width: 32px;
                        height: 34px;
                        margin: 0 auto;
                    }
                    .icon-headset {
                        width: 37px;
                        height: 34px;
                        margin: 0 auto;
                    }
                }
            }
            .right {
                width: 275px;
                .image {
                    width: 100%;
                    height: 275px;
                }
            }
        }
    }
</style>