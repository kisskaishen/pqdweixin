<template>
	<div>
		<div class="goodsDetail detailsDiv">
			<p>商品详情</p>
			<div class="detailTxt">
				这里是商品详情这里是商品详情这里是商品详情这里是商品详情这里是商品详情这里是商品详情这里是商品详情这里是商品详情
			</div>
		</div>

		<div class="detailImg" v-for="item in 2"></div>
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
	.goodsDetail {
		&>p {
			padding: 10px 0;
		}
		.detailTxt {
			padding: 40px 20px;
		}
	}

	.detailImg {
		width:100%;
		height: 400px;
		border:1px solid red;
	}
</style>