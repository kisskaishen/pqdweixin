<template>
	<div class="menu">
		<ul>
			<li v-for="item,index in menu" :key="item.cat_name">
				<router-link :to="item.id">
					<img :src="item.cat_img"></img>
					<span>{{item.cat_name}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	export default {
	    props:['info'],
		data() {
			return {

			}
		},
        computed:{
	        menu() {
	            return this.info
            }
        },
		mounted() {

		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
	.menu {
		width: 100%;
		padding:16px 0;
		background-color:#fff;
		ul {
			display: flex;
			flex-deraction:row;
			flex-wrap:wrap;
			li {
				width: 25%;
				a {
					display: block;
                    padding: 20px;
					img {
						display: block;
						margin:0 auto;
						width:80px;
						height: 80px;
					}
					span {
                        display: block;
						color: #666;
                        margin-top: 10px;
					}
				}
			}
		}
	}
</style>
