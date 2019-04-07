<template>
	<view class="content">
		<rich-text :nodes="html"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				html:""
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
					this.html = info.job
				}
			},
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 20rpx;
	}
</style>