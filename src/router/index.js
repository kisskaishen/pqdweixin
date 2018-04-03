import Vue from 'vue'
import Router from 'vue-router'
const IndexIndex = r => require.ensure([], () => r(require('@/view/index/index')), 'index')
const DetailIndex = r => require.ensure([], () => r(require('@/view/detail/index')), 'index')
const PayIndex = r => require.ensure([], () => r(require('@/view/pay/index')), 'index')

Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
		// 首页
		{
			path: '/',
			component: IndexIndex,
			children:[
				{
					path:'/index/index',
					component: IndexIndex
				}
			]
		},
		// 商品详情页
		{
			path:'/detail',
			component: DetailIndex,
			children:[
				{
					path:'/detail/index',
					component: DetailIndex
				}
			]	
		},
		// 商品支付页面
		{
			path:'/pay',
			component: PayIndex,
			children:[
				{
					path:'/pay/index',
					component: PayIndex
				}
			]	
		},
	]
})
