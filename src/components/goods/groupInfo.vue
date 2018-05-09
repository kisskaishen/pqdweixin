<template>
	<div>
		<div class="groupInfo detailsDiv">
			<!--<div class="tip">{{groupInfo.group_buy.length}}人拼团中，可直接参与</div>-->
			<div class="groupBody">
				<div class="bodyList divDiv" v-for="item,index in groupInfo" :key="item.photo">
					<div class="bodyListFl divFl">
						<img :src="item.photo" alt="头像">
						<span>{{item.user_name}}</span>
					</div>
					<div class="bodyListFr divFr">
						<div class="frTime">
							<p>还差<span>{{item.prom_mens}}人</span>成团</p>
							<p>剩余{{item.end_time}}</p>
						</div>
						<div>
							<router-link to="">参与拼单</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	    props:['group'],
		data() {
			return {

			}
		},
        computed:{
	        groupInfo() {
	            return this.group
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
                -webkit-border-radius: 60px;
                -moz-border-radius: 60px;
                border-radius: 60px;
                margin-bottom: 16px;
                background-color: #eee;
				.bodyListFl {
					img {
						width: 72px;
						height: 72px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        border:none;
					}
					span {
						width:260px;
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
					a {
                        display: block;
						width:120px;
                        height: 98px;
                        line-height: 98px;
						margin-left:40px;
                        background-color: red;
                        color: #fff;
                        -webkit-border-radius: 0 60px 60px 0;
                        -moz-border-radius: 0 60px 60px 0;
                        border-radius: 0 60px 60px 0;
					}
				}
			}
		}
	}
</style>
