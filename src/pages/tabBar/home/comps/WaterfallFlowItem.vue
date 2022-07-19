<template>
	<view class="content-box-item">
		<view class="show-img">
			<image :disabled="false" :controls='false' :autoplay='false' @click="goClass(item)"
				:src="item.url" mode="widthFix"></image>
		</view>
		<view class="description">
			<text class="title">{{item.name}}</text>
			<text class="info">{{item.info}}</text>
			<text class="interest">1万人感兴趣</text>
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
			}
		}
		.description {
			position: absolute;
			top: 32px;
			left: 35px;
			right: 0;
			color: #2a2a2a;
			.title {
				font-weight: bold;
				font-size: 34px;
				display: block;
			}
			.info {
				font-size: 20px;
				display: block;
				margin-top: 20px;
			}
			.interest {
				margin-top: 11px;
				display: inline-block;
				font-size: 20px;
				padding: 2px 16px 2px 30px;
				border: 1px solid #fff;
				border-radius: 17px;
				background: rgba(255, 255, 255, .7);
				position: relative;
				&::before {
					position: absolute;
					content: "";
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #FD9E47;
					left: 10px;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
</style>
