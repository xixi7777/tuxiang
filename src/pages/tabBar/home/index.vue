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
				:list="images"
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
				v-for="(item, index) in images"
				:key="index"
				:class="[index === current && 'cus-indicator__dot--active']"
			>
			</view>
		</view>

		<!-- trip example -->
		<view class="travel-group">
			<u-row>
				<u-col :span="3" v-for="(item, index) in travels" :key="item.name">
					<view class="travel-item">
						<view class="image-list">
							<view :class="['icon-wrapper', `icon-${index}`]">
								<cover-image class="icon" :src="item.icon"></cover-image>
							</view>
						</view>
						<text>{{ item.name }}</text>
					</view>
				</u-col>
			</u-row>
		</view>

		<!-- recommend -->
		<view class="recommend">
			<view class="top">
				<text class="title">排行榜</text>
				<view class="more">
					<text>查看全部</text>
					<image class="more-icon" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/more.png"></image>
				</view>
			</view>

			<view class="scroll-list-wrapper">
				<u-scroll-list :indicator="false">
					<view v-for="item in recommends" class="scroll-item" :key="item.name">
						<view class="list-image">
							<cover-image :src="item.url"></cover-image>
						</view>
						<view class="scroll-title"><text>{{ item.name }}</text></view>
						<view><text class="price-code">￥</text><text class="price">{{ item.price }}</text><text class="sale">{{ item.sale }}</text></view>
					</view>
				</u-scroll-list>
			</view>
		</view>

		<!--  -->
		<view class="recommend">
			<view class="top">
				<text class="title">热门推荐</text>
				<view class="more">
					<text>更多</text>
					<image class="more-icon" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/more.png"></image>
				</view>
			</view>

			<view class="flow-wrapper">
				<WaterfallsFlow :wfList="list" @Tap="goClass" />
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
import WaterfallsFlow from '@/components/waterfall/WaterfallsFlow/WaterfallsFlow.vue';
import Search from '@/components/pageSearch/PageSearch'
export default {
	components: {
		WaterfallsFlow,
		Search
	},
	data() {
		return {
			keyword: null,
			current: 0,
			images: [
				'//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/banner.png',
			],
			travels: [
				{ name: '自由行', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/independent.png' },  
				{ name: '跟团游', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/group.png' },
				{ name: '一日游', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/daily.png' },
				{ name: '飞机游', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/plane.png' }
			],
			recommends: [
				{ name: '三亚3天两晚自由行', url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_1.png', price: '580', sale: '超值' },
				{ name: '西安3天两晚自由行', url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_2.png', price: '580', sale: '七折' },
				{ name: '上海3天两晚自由行', url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/list_1.png', price: '580', sale: '七折' }
			],
			list: [
				{
					name: '洱海', 
					url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/hot_1.png',
					info: '一起去看海'
				},
				{
					name: '大理', 
					url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/hot_2.png',
					info: '一起去看海'
				},
				{
					name: '洱海', 
					url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/hot_1.png',
					info: '一起去看海'
				},
				{
					name: '大理', 
					url: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/hot_2.png',
					info: '一起去看海'
				}
			],
			flowList: [],
			footers: [
				'//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/foot_1.png',
				'//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/foot_2.png'
			]
		}
	},
	onLoad() {
	},
	methods: {
		swiperChange({current}) {
			this.current = current
		},
		goClass() {

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
		text-align: center;
		.travel-item {
			text-align: center;
		}
		.icon-wrapper {
			width: 76px;
			margin: 0 auto;
			margin-bottom: 14px;
			&.icon-0 {
				width: 57px;
			}
			&.icon-1 {
				width: 70px;
			}
			&.icon-2 {
				width: 62px;
			}
			&.icon-3 {
				width: 60px;
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
		.scroll-item {
			width: 302px;
			height: 335px;
			background: linear-gradient(-23deg, rgba(255,255,255,0) 0%, #FFF1F1 100%);
			box-shadow: 0px 17px 23px 6px rgba(138,132,167,0.1);
			border-radius: 20px;
			&:not(:first-child) {
				margin-left: 20px;
			}
			.list-image {
				width: 302px;
				height: 220px;
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
