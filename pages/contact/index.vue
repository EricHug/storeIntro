<template>
	<view class="content">
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 30vh;" scale="15" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
				<view class="address" @click="openMap(latitude,longitude)">
					<image src="../../static/address.png"></image>
					<view>{{address}}</view>
				</view>
				<view class="contact">
					<view v-for="(item, index) in info" :key="index">
						<view class="left">{{item.tag}}</view>
						<view class="right" @click="call(item)">{{item.name}}</view>
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
				title: 'map',
				latitude: 23.330154,
				longitude: 116.150986,
				covers: [{
					latitude: 23.330154,
					longitude: 116.150986,
					iconPath: '../../static/location.png',
					width: 30,
					height: 30,
					title:"荣兴木业",
					label:{
						content: "荣兴木业",
						fontSize: 12
					}
				}],
				name: "荣兴木业",
				address: "广东省揭阳普宁市燎原街道普师高级中学西300米",
			}
		},
		computed: {
			info() {
				let self = this
				return [{
						tag: "公司名称",
						name: self.name
					},
					{
						tag: "地址",
						name: self.address,
						isAddress: true
					},
					{
						tag: "座机",
						name: "(0663)2285847",
						isCall: true
					},
					{
						tag: "手机",
						name: "13531994925",
						isCall: true
					}
				]
			}
		},
		mounted() {},
		methods: {
			openMap(latitude, longitude) {
				let self = this
				uni.openLocation({
					latitude,
					longitude,
					name: self.name,
					address: self.address,
					success: function() {
						console.log('success');
					}
				});
			},
			call(obj) {
				let self = this
				if (obj.isCall){
					uni.makePhoneCall({
						phoneNumber: obj.name
					});
				}
				if (obj.isAddress){
					this.openMap(self.latitude,self.longitude)
				}
			}
		}
	}
</script>

<style lang="scss">
	.page-body {
		width: 100%;
	}

	.address {
		display: flex;
		width: 88%;
		margin: 20upx auto;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 34upx;
		text-align: center;
		text-decoration: underline;

		image {
			width: 50upx;
			height: 50upx;
			align-self: flex-start;
			margin-right:10upx;
		}

		view {
			line-height: 1.5;
		}
	}

	.contact {
		width: 90%;
		margin: 40upx auto;
		line-height: 1.5;

		>view {
			margin-bottom: 22upx;
		}

		.left {
			color: #333;
			font-size: 36upx;
		}

		.right {
			color: #999;
			font-size: 34upx;
		}
	}
</style>
