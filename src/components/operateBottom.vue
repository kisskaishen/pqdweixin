<template>
	<div class="bottom">
		<div class="bottomFl">
			<div>
				<router-link to="/">首页</router-link>
			</div>
			<div>
				收藏
			</div>
			<div>
				客服
			</div>
		</div>
		<div class="bottomFr">
			<button class="buyFl" @click="showSpec(1)">
				<p>￥99.9</p>
				<p>单独购买</p>
			</button>
			<button class="buyFr" @click="showSpec(2)">
				<p>￥90</p>
				<p>发起拼团</p>
			</button>
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
			showSpec(val) {
				this.$emit('buyClick',val)
			}
 		}
	}
</script>

<style lang="scss" scoped>
	.bottom {
		display: flex;
		position: fixed;
		bottom:0;
		left:0;
		right:0;
		width:100%;
		// height: 108px;
		background-color:#fff;
		border-top:1px solid #ccc;
	}
	.bottomFl {
		display: flex;
		align-items:center;
		div {
			width:100px;
			text-align:center;
		}
	}
	.bottomFr {
		display: flex;
		align-items:center;
		button {
			padding: 20px 0;
			color:#fff;
		}
		.buyFl {
			width:200px;
			background-color:#f3aba7;
		}
		.buyFr {
			width:250px;
			background-color:#e02e24;
		}
	}
</style>