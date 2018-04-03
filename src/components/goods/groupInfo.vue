<template>
	<div>
		<div class="groupInfo detailsDiv">
			<div class="tip">1人拼团中，可直接参与</div>
			<div class="groupBody">
				<div class="bodyList divDiv" v-for="item in 2">
					<div class="bodyListFl divFl">
						<img src="" alt="">
						<span>明月几时有</span>
					</div>
					<div class="bodyListFr divFr">
						<div class="frTime">
							<p>还差<span>1人</span>拼成</p>
							<p>剩余23:47:25</p>
						</div>
						<div>
							<mt-button type="danger">去拼单</mt-button>
						</div>
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

<style lang="scss" scoped>
	.groupInfo {
		.tip {
			padding:0 0 10px 0;
			font-size:30px;
		}
		.groupBody {
			.bodyList {
				display: flex;
				justify-content: space-between;
				padding: 16px 0;
				border-top:1px solid #ccc;
				.bodyListFl {
					img {
						width: 72px;
						height: 72px;
					}
					span {
						width:280px;
					}
				}
				.bodyListFr {
					display: flex;
					align-items:center;
					align-content:center;
					justify-content: space-between;
					.frTime {
						span {
							color:red;
						}
					}
					.mint-button {
						width:120px;
						margin-left:40px;
					}
				}
			}
		}
	}
</style>