<template>
	<div>
		<div class="storeInfo detailsDiv">
			<router-link to="" class="divFl">
				<img src="" alt="商家图片">
				<p>商家名称</p>
			</router-link>
		</div>

		<div class="goodsInfo detailsDiv">
			<img src="" alt="商品图片">
			<div class="divFr">
				<p>商品名称</p>
				<p>说明</p>
				<p>￥49.00/件</p>
			</div>
		</div>

		<div class="number detailsDiv divDiv">
			<div class="divFl">购买数量</div>
			<div class="divFr">
				<div>
					<button @click="reduceBtn" v-if="number>1">-</button>
					<input type="number" v-model="number">
					<button @click="addBtn">+</button>
				</div>
				<p>店铺合计：￥49.00(全场包邮)</p>
			</div>
		</div>

		<div class="address detailsDiv">
			<router-link to="" class="divDiv">
				<div class="divFl">
					<img src="" alt="">
					<div>
						<p>秦 189****9821</p>
						<p>广东省深圳市宝安区中粮商务公园</p>
					</div>
				</div>
				<div class="divFr">
					<span></span>
				</div>
			</router-link>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				number:1,
				totalMoney:''
			}
		},
		mounted() {

		},
		methods:{
			reduceBtn() {
				this.number -= 1
			},
			addBtn() {
				this.number += 1
			}
		}
	}
</script>
<style lang="scss" scoped>
	.storeInfo {
		padding: 20px;
		.divFl {
			color:#333;
			img {
				width:100px;
				height: 100px;
				border:1px solid red;
			}
		}
	}

	.goodsInfo {
		display: flex;
		justify-content:flex-start;
		padding: 20px;
		img {
			width: 168px;
			height: 168px;
			margin-right:20px;
			border:1px solid red;
		}
		.divFr {
			flex:1;
			display: flex;
			flex-direction:column;
			align-items:flex-start;
			p {
				width:100%;
				color:#333;
				&:nth-child(1) {
					font-size:28px;
				}
				&:nth-child(2) {
					color:#999;
				}
				&:nth-child(3) {
					text-align:right;
				}
			}
		}
	}

	.number {
		align-items:baseline;
		margin-bottom:20px;
		padding: 20px;
		button {
			padding: 2px 10px;
			font-size:30px;
			border-radius:0;
			font-weight:bolder;
			color:#333;
		}
		input {
			width:72px;
			text-align:center;
			padding: 2px;
		}
		.divFr {
			display: flex;
			flex-direction:column;
			align-items:flex-end;
			p {
				margin-top:20px;
			}
		}
	}

	.address {
		padding: 20px;
		.divFl {
			p {
				text-align:left;
			}
		}
		.divFr {
			position: relative;
			span {
				position: absolute;
				content:'';
				right:50%;
				top:50%;
				margin:-15px 15px;
				width: 30px;
				height: 30px;
				border-top:1px solid #ccc;
				border-right:1px solid #ccc;
				transform:rotate(45deg);
			}
		}
	}
</style>