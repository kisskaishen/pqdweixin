<template>
	<div class="footer">
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="1">
				<img slot="icon" src="">
				首页
			</mt-tab-item>
			<mt-tab-item id="2">
				<img slot="icon" src="">
				排行榜
			</mt-tab-item>
			<mt-tab-item id="3">
				<img slot="icon" src="">
				品质水果
			</mt-tab-item>
			<mt-tab-item id="4">
				<img slot="icon" src="">
				探索
			</mt-tab-item>
			<mt-tab-item id="5">
				<img slot="icon" src="">
				个人中心
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabItem } from 'mint-ui';
	export default {
		data() {
			return {
				selected:'1'
			}
		},
		mounted() {

		},
		methods:{

		}
	}
</script>

<style lang="scss">
	.mint-tabbar > .mint-tab-item.is-selected {
		color:#F13D3C;
	}
</style>