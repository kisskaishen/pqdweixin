<template>
	<div class="banner">
		<div class="goodsReviews detailsDiv">
			<div class="reviewsTop">
				<router-link to="">
					<span>商品评价(800)</span>
					<span>查看全部></span>
				</router-link>
				<div class="reviewsTip">
					<router-link to="" v-for="item in 3" :key="item">很舒服(100)</router-link>
				</div>
			</div>
			<div class="reviewList">
				<div class="review" v-for="item in 2">
					<div class="reviewTop divDiv">
						<div class="reviewTopFl divFl">
							<img src="" alt="">
							<span>名字</span>
						</div>
						<div class="reviewTopFr divFr">
							<span>2018.02.24</span>
						</div>
					</div>
					<div class="reviewBody">
						鞋子，挺好的，质量不错
					</div>
					<div class="reviewBottom">
						<span>颜色：白色</span>
						<span>尺码：38</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		methods:{

		}
	}
</script>

<style lang="scss">
	.goodsReviews {
		.reviewsTop {
			a {
				display: flex;
				justify-content: space-between;
				align-items:center;
				align-content:center;
				span {
					color:#999;
					font-size:28px;
					&:first-child {
						color:#444;
					}
				}
			}
			.reviewsTip {
				display: flex;
				justify-content:flex-start;
				margin-top:10px;
				padding:10px 0;
				border-top:1px solid #ccc;
				a {
					background-color:#f3aba7;
					padding: 6px 20px;
					margin: 0 18px 0 0;
					border-radius:6px;
					color:#444;
				}
			}
		}
		.reviewList {
			.review {
				margin-top:10px;
				border-top:1px solid #eee;
				.reviewTop {
					padding: 10px 0;
					.reviewTopFl {
						img {
							width:60px;
							height:60px;
						}
						span {

						}
					}
				}
				.reviewBody {
					padding: 10px 0;
				}
				.reviewBottom {
					span {
						margin-right:40px;
					}
				}
			}
		}
	}
</style>
