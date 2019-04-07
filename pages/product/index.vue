<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">{{tab.categoryName}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab,index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<block v-for="(newsitem,index2) in tab.data" :key="index2">
						<pic-title :data="newsitem" @click="jumpDetail"></pic-title>
						<!-- <media-list :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-list> -->
					</block>
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	// import mediaList from '@/components/tab-nvue/mediaList.vue';
	import picTitle from '@/components/pic-title.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import api from '../../common/api/index.js'
	export default {
		components: {
			// mediaList,
			picTitle,
			uniLoadMore
		},
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				newsitems: [],
				tabBars: [],
				pageSize:10
			}
		},
		computed:{
			categoryId(){
				let tabIndex = this.tabIndex
				let tabBars = this.tabBars
				if(tabIndex == null || tabBars.length==0){return ""}
				return tabBars[tabIndex]["id"]
			}
		},
		watch:{
			tabIndex(v){
				if(!this.newsitems[v].pageNum){
					this.queryProduct(1)
				}
			}
		},
		onLoad: function() {
			// this.newsitems = this.randomfn()
			this.queryCategory()
			this.queryProduct(1)
		},
		methods: {
			queryCategory:async function(){
				let res = await api.getCategories();
				console.log(res)
				if (res.data.code === 200) {
				  this.tabBars = res.data.data
				  this.tabBars.unshift({
					  id: 0,
					  categoryName: '全部'
				  })
				  for(let i =0;i<this.tabBars.length;i++){
					  this.newsitems.push({
						  loadingType: 0,
						  data:[]
					  })
				  }
				}
			},
			queryProduct:async function(pageNum = ""){
				let res = await api.getProducts({
					pageNum,
					pageSize: this.pageSize,
					type: this.categoryId?this.categoryId:""
				});
				console.log(res)
				if (res.data.code === 200) {
					let products = res.data.data
					this.handleProducts(products,res.data)
				  // this.tabBars = res.data.data
				}
			},
			handleProducts(arr,data){
				let tabIndex = this.tabIndex
				let newsitems = this.newsitems
				let {pageNum,pages} = data
				console.log(tabIndex,111,newsitems[tabIndex],arr)
				this.$set(this.newsitems,tabIndex,{
					loadingType: pageNum == pages ? 2 : 0,
					pageNum:pageNum,
					data: arr
				})
			},
			loadMore(e) {
				if(this.newsitems[e].loadingType == 2)return
				this.newsitems[e].loadingType = 1;
				setTimeout(() => {
					this.addData(e);
				}, 300);
			},
			addData(e) {
				if (this.newsitems[e].data.length > 30) {
					this.newsitems[e].loadingType = 2;
					return;
				}
				this.queryProduct(this.newsitems[e].pageNum + 1)
			},
			async changeTab(e) {
				let index = e.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].id);
					console.log('result',result)
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
				}
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						loadingType: 0,
						data: []
					};
					for (let j = 1; j <= 10; j++) {
						aryItem.data.push(this['data' + Math.floor(Math.random() * 5)]);
					}
					ary.push(aryItem);
				}
				return ary;
			},
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?data=' + e.title
				})
			},
			close(index1, index2) {
				uni.showModal({
					content: '是否删除本条信息？',
					success: (res) => {
						if (res.confirm) {
							this.newsitems[index1].data.splice(index2, 1);
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	/* #ifdef MP-ALIPAY */
	.swiper-tab-list {
		display: inline-block;
	}

	/* #endif */
</style>
