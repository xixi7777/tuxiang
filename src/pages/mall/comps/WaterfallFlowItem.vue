<template>
	<view class="content-box-item">
		<view class="show-img">
			<image :disabled="false" :controls='false' :autoplay='false' @click="goClass(item)"
				:src="item.url" mode="widthFix"></image>
		</view>
		<view class="title"><text>{{ item.name }}</text></view>
        <view class="price-wrapper">
            <view>
                <text class="price-code">￥</text>
                <text class="price">{{ item.price }}</text>
                <text class="sale">{{ item.sale }}</text> 
            </view>
            <view class="count"><text>销量 {{ item.count }} 件</text></view>
        </view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				require: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-box-item {
		position: relative;
		letter-spacing:0;
		margin-bottom: 40px;
		width: 100%;
		border-radius: 14px;
		overflow: hidden;
		background-color: #fff;

		.show-img {
			position: relative;
			width: 100%;

			image {
				width: 100%;
				height: auto !important;
			}
		}
        .title {
            margin-top: 18px;
            overflow: hidden; 
            text-overflow: ellipsis;
            display: -webkit-box; 
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text {
                font-size: 30px;
                font-weight: 400;
                color: #333;
                line-height: 44px;
            }
        }
		.price-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
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
				margin-left: 20px;
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
			.count {
				font-size: 24px;
				color: #bbb2b2;
				line-height: 33px;
			}
        }
	}
</style>
