<template>
	<view class="app-container">
		<!-- <tab-bar :current="0"></tab-bar> -->
        <view class="app-top-background home"></view>
		<view class="page-title">
			<text>旅游</text>
		</view>
		<search></search>

		<!-- swiper -->
		<view class="banner-wrapper">
			<view class="swiper-container">
				<u-swiper
				:list="slide"
				:current="current"
				radius="10"
				:autoplay="false"
				@change="swiperChange"
				>
				</u-swiper>
			</view>
		</view>
		<!-- swiper indicator -->
		<view class="cus-indicator">
			<view
				class="cus-indicator__dot"
				v-for="(item, index) in slide"
				:key="index"
				:class="[index === current && 'cus-indicator__dot--active']"
			>
			</view>
		</view>

		<!-- trip example -->
		<view class="travel-group">
			<scroll-view scroll-x="true" class="scroll">
                <view class="travel-item" v-for="(item, index) in nav" :key="index">
                    <navigator hover-class="navigator-hover-class" :url="item.url">
						<view class="image-list">
							<view class="icon-wrapper">
								<image lazy-load mode="heightFix" class="icon" :src="item.image"></image>
							</view>
						</view>
						<text>{{ item.name }}</text>
					</navigator>
                </view>
            </scroll-view>
		</view>

		<!-- recommend -->
		<view class="recommend">
			<view class="top">
				<text class="title">排行榜</text>
				<view class="more">
					<navigator url="/pages/leaderboard/index" hover-class="navigator-hover-class">
						<text>查看全部</text>
						<image class="more-icon" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/more.png"></image>
					</navigator>
				</view>
			</view>

			<view class="scroll-list-wrapper">
				<scroll-view scroll-x="true" class="scroll">
					<view v-for="item in rankproduct" class="scroll-item" :key="item.name">
						<view class="list-image">
							<image lazy-load :src="item.image"></image>
						</view>
						<navigator hover-class="navigator-hover-class" :url="`/pages/productDetail/index?${item.url}`">
							<view class="scroll-title"><text>{{ item.name }}</text></view>
							<view class="price-wrapper"><text class="price-code">￥</text><text class="price">1180</text><text class="sale">七折</text></view>
						</navigator>
					</view>
				</scroll-view>
			</view>
		</view>

		<!--  -->
		<view class="recommend">
			<view class="top">
				<text class="title">热门推荐</text>
				<view class="more">
					<navigator url="/pages/recommend/index" hover-class="navigator-hover-class">
						<text>更多</text>
						<image lazy-load class="more-icon" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/more.png"></image>
					</navigator>
				</view>
			</view>

			<view class="flow-wrapper">
				<view class="wf-page">
					<!--    left    -->
					<view>
						<view id="left" v-if="leftList.length">
							<view v-for="(item,index) in leftList" :key="index" class="wf-item" @tap="itemTap(item)">
								<WaterfallFlowItem :item="item" />
							</view>
						</view>
					</view>

					<!--    right    -->
					<view>
						<view id="right" v-if="rightList.length">
							<view v-for="(item,index) in rightList" :key="index" class="wf-item" @tap="itemTap(item)">
								<WaterfallFlowItem :item="item" />
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="footer-wrapper">
				<view class="list" v-for="(item, index) in footers" :key="index">
					<view class="image">
						<cover-image :src="item"></cover-image>
					</view>
				</view>
			</view>
		</view >
	</view>
</template>

<script>
import WaterfallFlowItem from './comps/WaterfallFlowItem';
import Search from '@/components/pageSearch/PageSearch'


import { waterfallMixins } from '@/mixins/waterfallMixins';
import _ from 'lodash'
export default {
	mixins: [waterfallMixins],
	components: {
		Search,
		WaterfallFlowItem
	},
	data() {
		return {
			keyword: null,
			current: 0,
			wfList: [],
			flowList: [],
			footers: [
				'//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/foot_1.png',
				'//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/foot_2.png'
			],
			homeInfo: {}
		}
	},
	onLoad() {
		this.getConfig()
	},
	computed: {
		slide() {
			const slide = _.get(this.homeInfo, ['slide']) || []
			return slide.map(item => item.image)
		},
		nav() {
			return _.get(this.homeInfo, ['nav']) || []
		},
		rank() {
			return _.get(this.homeInfo, ['rank']) || []
		},
		rankproduct() {
			return _.get(this.homeInfo, ['rankproduct']) || []
		},
		hot() {
			return _.get(this.homeInfo, ['hot']) || []
		}
	},
	methods: {
		swiperChange({current}) {
			this.current = current
		},
		getConfig() {
			this.$api.getConfigCache({
				key: 'mall.system.bannl'
			}).then(res => {
				const keyValue = res.data['mall.system.bannl'].keyValue
				this.homeInfo = JSON.parse(keyValue)
				this.wfList = _.get(this.homeInfo, ['hotproduct']) || []
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	/deep/
	.banner-wrapper {
		margin-top: 30px;
		height: 380px;
		border-radius: 30px;
		padding: 20px;
		background: rgba(255,255,255,0.5);
		border: 1px solid #FFFFFF;
		box-shadow: 0px 17px 37px 0px rgba(28,157,122,0.2000);
		.swiper-container {
			height: 380px;
			.u-swiper,
			.u-swiper__wrapper,
			.u-swiper__wrapper__item__wrapper__image {
				height: 100% !important;
			}
		}
	}
	.cus-indicator {
		@include flex(row);
		justify-content: center;
		margin-top: 30px;
		&__dot {
			height: 10px;
			width: 10px;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, 0.1);
			margin: 0 5px;
			transition: background-color 0.3s;

		&--active {
				background-color: #21A77D;
				width: 20px;
			}
		}
	}
	/deep/
	.travel-group {
		margin-top: 36px;
		padding: 0 20px;
		.travel-item {
            display: inline-block;
            &:not(:first-child) {
                margin-left: 80px;
            }
		}
		.icon-wrapper {
			width: 76px;
			margin: 0 auto;
			margin-bottom: 14px;
			height: 80px;
			position: relative;
			image {
				height: 100%;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
	.image-list {
		height: 110px;
		line-height: 110px;
		display: flex;
		align-items: flex-end;
	}
	.recommend {
		margin-top: 50px;
		.top {
			margin-bottom: 31px;
		}
		.title {
			color: #0B6749;
			font-size: 32px;
			font-weight: bold;
		}
		.more {
			float: right;
			text {
				color: #868686;
				font-size: 24px;
				font-weight: 400;
			}
			.more-icon {
				width: 19px;
				height: 18px;
				margin-left: 11px
			}
		}
	}
	.scroll-list-wrapper {
		.scroll {
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
		}
		.scroll-item {
			width: 302px;
			background: linear-gradient(-23deg, rgba(255,255,255,0) 0%, #FFF1F1 100%);
			box-shadow: 0px 17px 23px 6px rgba(138,132,167,0.1);
			border-radius: 20px;
			display: inline-block;
			&:not(:first-child) {
				margin-left: 20px;
			}
			.list-image {
				width: 302px;
				height: 220px;
				image {
					height: 100%;
					width: 100%;
				}
			}
			.scroll-title {
				margin-top: 18px;
				font-size: 30px;
				color: #2A2A2A;
				font-weight: 500;
				padding-left: 20px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.price-code {
				margin-left: 20px;
				font-size: 24px;
				color: #25A97E;
			}
			.price {
				color: #25A97E;
				font-size: 36px;
				font-weight: bold;
			}
			.sale {
				display: inline-block;
				margin-left: 35px;
				width: 71px;
				height: 35px;
				text-align: center;
				background-color: #fff5e8;
				border-radius: 18px;
				line-height: 35px;
				color: #FD9026;
				font-weight: 500;
				font-size: 22px;
			}
		}
	}
	.footer-wrapper {
		margin-top: 30px;
		.list {
			border-radius: 30px;
			box-shadow: 0px 17px 37px 0px rgba(28,157,122,0.2);
			background: rgba(255,255,255,0.5);
			&:not(:first-child) {
				margin-top: 30px;
			}
			padding: 20px;
		}
	}
</style>
