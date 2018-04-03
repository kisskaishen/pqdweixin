<template>
	<div class="menu">
		<ul>
			<li v-for="item in 8">
				<router-link to="">
					<i></i>
					<span>为我助力</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'mint-ui';
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
					i {
						display: block;
						margin:0 auto;
						width:80px;
						height: 80px;
						border:1px solid red;
					}
					span {
						color: #666;
					}
				}
			}
		}
	}
</style>