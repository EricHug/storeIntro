<template>
	<view class="show_item">
		<view class="pic">
			<image mode="aspectFit" :src="data.src"></image>
		</view>
		<view class="title">
			<text>{{data.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "load-more",
		props: {
			data: {
				type: Object,
				default () {
					return {
						src:"http://temp.im/100x100",
						title:""
					};
				}
			}
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss">
	.show_item{
		width:90%;
		margin:28upx auto;
		display: flex;
		flex-direction: row;
		.pic{
			width:400upx;
			height:300upx;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			border-radius: 26upx;
			background-color:#ddd;
			image{
				width: 100%;
				height:100%;
			}
		}
		.title{
			display: flex;
			justify-content: center;
			width:calc(100% - 400upx);
			height:300upx;
			align-items: center;
			>text{
				padding-left:20upx;
			}
		}
	}
</style>
