<template>
	<div class="list">
		<div class="goods" v-for="item in 2">
			<router-link to="/detail/index">
				<div class="goodsImage">
					<img src="" alt="商品图片">
				</div>
				<div class="goodsName">
					商品名称等信息
				</div>
				<div class="goodsDetail">
					<div class="detailFl">
						<b>￥9.9</b>
						<span class="quan">券</span>
						<span class="num">已拼6.9万件</span>
					</div>
					<div class="detailFr">
						<mt-button type="danger">去拼团&gt;</mt-button>
					</div>
				</div>
			</router-link>
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
					border:1px solid red;
				}
			}
			.goodsName {
				padding: 0 16px;
				font-size:36px;
				color:#444;
			}
			.goodsDetail {
				display: flex;
				align-content:center;
				justify-content:space-between;
				padding: 0 16px;
				.detailFl {
					display: flex;
					justify-content:center;
					align-items:center;
					b {
						color:#F13D3C;
						font-size:44px;
					}
					.quan {
						display: block;
						border:1px solid #F13D3C;
						color:#F13D3C;
						padding: 4px 10px;
						margin:0 8px;
					}
					.num {
						font-size:20px;
						color:#999;
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