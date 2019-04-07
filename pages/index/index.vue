<template>
	<view class="content">
		<image class="bk" mode="widthFix" src="../../static/bk.png"></image>
		<view class="nav">
			<view v-for="(item, index) in navList" :key="index" class="nav_item" @click="jumpTo(item.link)">
				<image :src="item.icon"></image>
				<text class="title">{{item.title}}</text>
				<view class="square"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../common/api/index.js'
	export default {
		data() {
			return {
				title: 'Hello',
				navList: [{
						title: "产品展示",
						icon: "../../static/product.png",
						link: "/pages/product/index"
					},
					{
						title: "联系我们",
						icon: "../../static/phone.png",
						link: "/pages/contact/index"
					},
					{
						title: "关于我们",
						icon: "../../static/about.png",
						link: "/pages/about/index"
					},
					{
						title: "加入我们",
						icon: "../../static/join.png",
						link: "/pages/join/index"
					}
				]
			}
		},
		mounted() {
			this.queryData()
		},
		methods: {
			queryData:async function(){
				let res = await api.getHomes();
				console.log(res)
				if (res.data.code === 200) {
				  let info = res.data.data
				  console.log(info)
				  uni.setStorageSync('info', info)
				}
			},
			jumpTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	// 将背景颜色值定义成变量
	$purple : #800080;
	$red : #FF0000;
	$orange : #FFA500;
	$yellow : #FFFF00;
	$green : #008000;
	$bluegreen : #00FFFF;
	$blue : #0000FF;

	// 定义一个list储存背景颜色
	$bgcolorlist: $purple $red $orange $green $blue $bluegreen $yellow;

	// 使用SASS for循环语句为每一个li设置background-color
	@for $i from 1 to length($bgcolorlist)+1 {
		.nav .nav_item:nth-child(#{$i}) {
			.square {
				background-color: nth($bgcolorlist, $i);
			}
		}
	}

	.bk {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	.nav {
		width: 50%;
		height: 100vh;
		padding-left: 66upx;
		padding-top: 200upx;
		display: flex;
		flex-direction: column;
	}

	.nav_item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		text-align: center;
		width: 180upx;
		height: 180upx;
		color: #fff;
		margin-top: -38upx;

		&:nth-child(odd) {
			margin-left: 138upx;
		}

		image {
			width: 66upx;
			height: 66upx;
			margin: 10upx auto;
			z-index: 1;
		}
		.title{
			z-index: 1;
			color: #fff;
			font-size: 28upx;
		}
		.square{
			z-index: 0;
		}
	}


	.square {
		position: absolute;
		width: 180upx;
		height: 180upx;
		top: 0;
		left: 0;
		transform: rotate(135deg);
	}

	.content {
		position: relative;
		text-align: center;
		height: auto;
		font-size: 28upx;
		background-color: #fffae8;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
