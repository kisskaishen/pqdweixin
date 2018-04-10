<template>
	<div class="list">
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="goods" v-for="item,index in goodsList" :key="item.goods_id">
                <router-link :to="'/detail/index?goods_id='+item.goods_id">
                    <div class="goodsImage">
                        <img :src="item.original_img" :alt="item.goods_name">
                    </div>
                    <div class="goodsName">
                        {{item.goods_name}}
                    </div>
                    <div class="goodsDetail">
                        <div class="detailFl">
                            <span class="tuanNum">{{item.prom}}人团</span>
                            <b>￥9.9</b>
                            <span class="singlePrice">单买价格：{{item.market_price}}</span>
                        </div>
                        <div class="detailFr">
                            <mt-button type="danger">去拼团&gt;</mt-button>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
	</div>
</template>

<script>
	export default {
	    props:['list'],
		data() {
			return {
                page:1,
                loading:false,
			}
		},
        computed:{
	        goodsList() {
	            return this.list
            }
        },
		mounted() {

		},
		methods:{
            loadMore() {
                this.$emit('listenLoading',this.page++)
                this.loading = true
                // setTimeout(()=>{
                //     this.loading = false
                // },2000)
            }
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		width:100%;
		margin-bottom:80px;
		.goods {
			width: 100%;
			padding-bottom:10px;
			margin-top:20px;
			background-color:#fff;
			.goodsImage {
				img {
					display: block;
					width:100%;
					height: 344px;
				}
			}
			.goodsName {
				padding: 20px;
				font-size:32px;
				color:#444;
                text-align: left;
			}
			.goodsDetail {
				display: flex;
				align-content:center;
				justify-content:space-between;
				padding: 0 20px;
				.detailFl {
					display: flex;
					justify-content:center;
					align-items:center;
					b {
						color:#F13D3C;
						font-size:36px;
					}
                    span {
                        font-size: 20px;
                    }
					.tuanNum {
                        color: #333;
                        margin-right: 20px;
                    }
                    .singlePrice {
                        margin-left: 20px;
                        color: #999;
                    }
				}
				.detailFr {
					display: flex;
					justify-content:center;
					align-items:center;
				}

			}
		}
	}
</style>
