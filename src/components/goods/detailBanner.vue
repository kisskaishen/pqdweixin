<template>
	<div class="banner">
		<mt-swipe :auto="4000">
			<mt-swipe-item>banner1</mt-swipe-item>
			<mt-swipe-item>banner2</mt-swipe-item>
			<mt-swipe-item>banner3</mt-swipe-item>
		</mt-swipe>
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

<style lang="scss">
	.mint-swipe {
		min-height: 750px;
		border:1px solid red;
		.mint-swipe-indicators {
			.mint-swipe-indicator {
				width:18px;
				height:18px;
				margin:0 10px;
			}
			.is-active {
				background-color:red;
			}
		}
	}
</style>