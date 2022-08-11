<template>
    <view class="app-container">
        <view class="app-top-background home"></view>
		<view class="page-title">
            <navigator open-type="navigateBack" delta="1" hover-class="navigator-hover-class">
                <u-icon color="#006848" size="20" name="arrow-left" class="arrow-left"></u-icon>
            </navigator>
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
            <scroll-view scroll-x="true" class="scroll">
                <view class="travel-item" v-for="(item, index) in travels" :key="item.name">
                    <view class="image-list">
                        <view :class="['icon-wrapper', `icon-${index}`]">
                            <image mode="scaleToFill" class="icon" :src="item.icon"></image>
                        </view>
                    </view>
                    <text>{{ item.name }}</text>
                </view>
            </scroll-view>
		</view>

		<!-- recommend -->
		<view class="recommend">
			<view class="top">
				<text class="title">热门推荐</text>
				<view class="more">
					<!-- <navigator url="/productPages/pages/leaderboard/index" hover-class="navigator-hover-class"> -->
						<text>查看全部</text>
						<image class="more-icon" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/more.png"></image>
					<!-- </navigator> -->
				</view>
			</view>

			<view class="scroll-list-wrapper">
				<scroll-view scroll-x="true" class="scroll">
					<view v-for="item in recommends" class="scroll-item" :key="item.name">
						<view class="list-image">
							<image :src="item.url"></image>
						</view>
						<!-- <navigator hover-class="navigator-hover-class" :url="`/productPages/pages/productDetail/index?id=${item.id}`"> -->
							<view class="scroll-title"><text>{{ item.name }}</text></view>
							<view><text class="price-code">￥</text><text class="price">{{ item.price }}</text><text class="sale">{{ item.sale }}</text></view>
						<!-- </navigator> -->
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="recommend">
			<view class="top">
				<text class="title">好物推荐</text>
			</view>

			<view class="flow-wrapper">
				<view class="wf-page">
					<view>
						<view id="left" v-if="leftList.length">
							<view v-for="(item,index) in leftList" :key="index" class="wf-item" @tap="itemTap(item)">
								<WaterfallFlowItem :item="item" />
							</view>
						</view>
					</view>

					<view>
						<view id="right" v-if="rightList.length">
							<view v-for="(item,index) in rightList" :key="index" class="wf-item" @tap="itemTap(item)">
								<WaterfallFlowItem :item="item" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view >
    </view>
</template>
<script>
import Search from '@/components/pageSearch/PageSearch'
import WaterfallFlowItem from './comps/WaterfallFlowItem';
import { waterfallMixins } from '@/mixins/waterfallMixins'
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
			images: [
				'https://img14.360buyimg.com/babel/jfs/t1/152451/38/24044/73060/62bd40a8E5b7825ff/acfcd4fe7d5d4e31.jpg.webp',
				'https://img12.360buyimg.com/babel/jfs/t1/154351/20/24314/35881/62be5d11Edc8a9539/83dd22f9bae8c8db.jpg.webp',
				'https://img11.360buyimg.com/babel/jfs/t1/207900/19/24249/58514/62be5e22Ec497ab55/ae8c8ae92228ce66.jpg.webp'
			],
			travels: [
				{ name: '春夏', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/chunxia.png' },  
				{ name: '秋冬', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/qiudong.png' },
				{ name: 'Polo衫', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/polo.png' },
				{ name: '冲锋衣', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/chongfengyi.png' },
				{ name: '运动鞋', icon: '//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/sportshose.png' }
			],
			recommends: [
				{ id: 1, name: '卡帝乐鳄鱼(CARTELO)衬衫男 纯色休闲长袖衬衫舒适透气白衬衣男', url: 'https://img13.360buyimg.com/n7/jfs/t1/222205/9/5409/115034/61b1cfe2E998645d6/7a202d8b220c4c09.jpg.avif', price: '580', sale: '超值' },
				{ id: 2, name: '法国CebrodzPOLO衫短袖翻领男设计感小众宽松高级感痞帅工装衬衫体恤', url: 'https://img12.360buyimg.com/n7/jfs/t1/203781/27/21412/100402/627cba57Ed59e658f/761b35624d93912c.jpg.avif', price: '580', sale: '七折' },
				{ id: 3, name: 'GONES TOMMY琼思汤米联名男士短袖polo衫商务休闲体恤刺绣冰感衬衫t恤半袖', url: 'https://img10.360buyimg.com/n7/jfs/t1/75296/10/20620/83019/62d60265Ebf9a56b5/5cdd78b04f3e1d3f.jpg.avif', price: '580', sale: '七折' }
			],
			wfList: [
				{
					name: 'JOESRAW官方美式街头字母刺绣短袖polo衫男国潮男装联名POLO情侣装t恤男士潮', 
					url: 'https://img13.360buyimg.com/n7/jfs/t1/203072/39/22169/167978/627b25aaE2ce6c677/5a476dc531c2de28.jpg.avif',
					price: '629',
					sale: '七折',
                    count: 555
				},
				{
					name: '两三事梵高系列 沉默演绎 春装新款复古绣花翻领长', 
                    url: 'https://img11.360buyimg.com/babel/s320x320_jfs/t1/11995/15/18090/239538/62d586e1Ef0bd0e1c/d1fb3ab790f70687.jpg!cc_320x320.webp',
					price: '329',
					sale: '七折',
                    count: 50
				},
				{
					name: '森马风衣女短款卡其色宽松简约2022秋季新款气质时尚外套百搭复古 卡其5610',
                    url: 'https://img10.360buyimg.com/n7/jfs/t1/58467/15/20157/200617/62c54b9bE33705fae/ee14010d650dad46.jpg.avif', 
					price: '439',
					sale: '七折',
                    count: 199
				},
				{
					name: '韩璐娇 卡其色风衣女中长款2022春秋新款女装韩版宽松气质显瘦英伦风长款过膝', 
                    url: 'https://img11.360buyimg.com/n7/jfs/t1/192193/17/15730/321592/6103a9fdE99239adc/9083396ef313cbf7.jpg.avif',
					price: '169',
					sale: '七折',
                    count: 99
				}
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
		.travel-item {
            display: inline-block;
            &:not(:first-child) {
                margin-left: 80px;
            }
		}
		.icon-wrapper {
			width: 85px;
			margin: 0 auto;
			margin-bottom: 14px;
			height: 80px;
			image {
				width: 100%;
				height: 100%;
			}
			&.icon-0 {
				width: 85px;
			}
			&.icon-1 {
				width: 68px;
			}
			&.icon-2 {
				width: 82px;
			}
			&.icon-3 {
				width: 78px;
			}
            &.icon-4 {
				width: 70px;
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
			display: inline-block;
            overflow: hidden;
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
            navigator {
                width: 100%;
            }
			.scroll-title {
                // width: 100%;
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
</style>
