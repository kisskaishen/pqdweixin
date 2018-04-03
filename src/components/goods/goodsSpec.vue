<template>
	<transition name="fade">
		<div class="goodsSpec" v-if="isShowSpec">
			<div class="specBg" @click="closeSpec"></div>
			<div class="specInfo">
				<div class="infoTop divFl">
					<div class="topImg">
						<img src="" alt="图片">
					</div>
					<div class="topTxt">
						<b>￥26.9</b>
						<p>请选择颜色尺寸</p>
					</div>					
				</div>
				<div>
					<div class="infoSpec">
						<p>{{spec[0].name}}</p>
						<ul>
							<li :class="{'specActive':ind0 == index}" v-for="item,index in spec[0].children" :key="item.id" @click="specChoose0(item,index)">{{item.name}}</li>
						</ul>
					</div>
					<div class="infoSpec">
						<p>{{spec[1].name}}</p>
						<ul>
							<li :class="{'specActive':ind1 == index}" v-for="item,index in spec[1].children" :key="item.id" @click="specChoose1(item,index)">{{item.name}}</li>
						</ul>
					</div>
				</div>
				<div class="infoSpec">
					<p>数量</p>
					<div class="number">
						<button @click="reduceNum" v-if="number > 1">-</button>
						<input type="number" v-model="number">
						<button @click="addNum">+</button>
					</div>
				</div>
				<div class="infoBtn">
					<button @click="specBtn">确认</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props:['isShowSpec'],
		data() {
			return {
				spec:[
					{
						id:'1',
						name:'尺寸',
						children:[
							{
								id:'11',
								name:'36码'
							},
							{
								id:'12',
								name:'37码'
							},
							{
								id:'13',
								name:'38码'
							}
						]
					},
					{
						id:'2',
						name:'颜色',
						children:[
							{
								id:'21',
								name:'白色'
							},
							{
								id:'22',
								name:'黑色'
							}
						]
					}
				],
				ind0:'',
				ind1:'',
				number:1,
				isDisabled:true
			}
		},

		computed:{
			specDiv() {
				return this.isShowSpec
			}
		},
		mounted() {

		},
		methods:{
			// 点击阴影关闭规格选择弹框
			closeSpec() {
				this.$emit('reviseSpec',false)
			},

			// 规格选择
			specChoose0(val,index) {
				console.log(val)
				this.ind0 = index
			},
			specChoose1(val,index) {
				console.log(val)
				this.ind1 = index
			},

			addNum() {
				this.number += 1
			},
			reduceNum() {
				this.number -= 1
			},


			// 确认按钮
			specBtn() {
				this.$emit('reviseSpec',false)
				this.$router.push({path:'/pay/index',query:{payInfo:1231}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsSpec {
		position: fixed;
		top:0;
		bottom: 0;
		left:0;
		right:0;
		background-color:rgba(#000, .6);
		.specBg {
			position: fixed;
			right: 0;
			left:0;
			top:0;
			height: 334px;
		}
		.specInfo {
			position: fixed;
			right: 0;
			left:0;
			bottom:0;
			height: 1000px;
			background-color:#fff;
			z-index:99;
			.infoTop {
				position: relative;
				padding: 0 20px;
				border-bottom:1px solid #eee;
				.topImg {
					width:200px;
					height: 180px;
					margin-right:30px;
					img {
						position: absolute;
						top:-60px;
						width:200px;
						height: 200px;
						background-color:#fff;
						border-radius:16px;
					}
				}

				.topTxt {
					b {
						color:red;
						font-size:32px;
					}
				}
				
			}

			.infoSpec {
				padding: 0 20px;
				border-bottom:1px solid #efefef;
				p {
					padding: 20px 0; 
				}
				ul {
					padding: 10px 20px 30px;
					li {
						display: inline-block;
						padding: 8px 40px;
						background-color:#f5f5f5;
						border-radius:10px;
						margin-right:10px;
						color:#555;
					}
					.specActive {
						background-color:red;
						color:#fff;
					}
				}
				.number {
					margin-bottom:20px;
					button {
						padding: 6px 24px;
						font-size:36px;
						border-radius:4px;
						font-weight:bolder;
						color:#333;
					}
					input {
						width:100px
					}
				}
			}

			.infoBtn {
				position: absolute;
				left:0;
				right:0;
				bottom:0;
				button {
					width: 100%;
					height: 96px;
					background-color:red;
				}
			}
		}
	}



</style>