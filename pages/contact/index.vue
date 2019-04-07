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
	import api from '../../common/api/index.js'
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
					title: "荣兴木业",
					label: {
						content: "荣兴木业",
						fontSize: 12
					}
				}],
				name: null,
				address: null,
				homephone:null,
				telephone:null,
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
						name: self.homephone,
						isCall: true
					},
					{
						tag: "手机",
						name: self.telephone,
						isCall: true
					}
				]
			}
		},
		mounted() {
			this.queryData()
		},
		methods: {
			queryData: async function() {
				let info = uni.getStorageSync('info')
				console.log('storage info:',info)
				if(info){
					let {
						name,
						address,
						homephone,
						telephone,
						about,
						job,
						id
					} = info;
					this.name = name
					this.address = address
					this.homephone = homephone
					this.telephone = telephone
					this.content = about
					this.content1 = job
					this.id = id
				}
			},
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
				if (obj.isCall) {
					uni.makePhoneCall({
						phoneNumber: obj.name
					});
				}
				if (obj.isAddress) {
					this.openMap(self.latitude, self.longitude)
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
			margin-right: 10upx;
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
