import Vue from 'vue'
import Router from 'vue-router'

const IndexIndex = r => require.ensure([], () => r(require('@/view/index/index')), 'IndexIndex')
const DetailIndex = r => require.ensure([], () => r(require('@/view/detail/index')), 'DetailIndex')
const StoreIndex = r => require.ensure([], () => r(require('@/view/store/index')), 'StoreIndex')
const ListIndex = r => require.ensure([], () => r(require('@/view/list/index')), 'ListIndex')
const PayIndex = r => require.ensure([], () => r(require('@/view/pay/index')), 'PayIndex')
const AddressIndex = r => require.ensure([], () => r(require('@/view/address/index')), 'AddressIndex')
const AddAddress = r => require.ensure([], () => r(require('@/view/address/addAddress')), 'AddAddress')

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        // 首页
        {
            path: '/',
            component: IndexIndex,
            children: [
                {
                    path: '/index/index',
                    component: IndexIndex,
                    meta: {
                        title: '商城',
                        login: false
                    }
                }
            ],
            meta: {
                title: '拼趣多商城',
                login: false
            }
        },
        // 商品详情页
        {
            path: '/detail',
            component: DetailIndex,
            children: [
                {
                    path: '/detail/index',
                    component: DetailIndex,
                    meta: {
                        title: '商品详情',
                        login: false
                    }
                }
            ],
            meta: {
                title: '商品详情',
                login: false
            }
        },
        // 商家页面
        {
            path: '/store',
            component: StoreIndex,
            children: [
                {
                    path: '/store/index',
                    component: StoreIndex,
                    meta: {
                        title: '商家详情',
                        login: false
                    }
                }
            ],
            meta: {
                title: '商家详情',
                login: false
            }
        },
        // list页面
        {
            path: '/list',
            component: ListIndex,
            children: [
                {
                    path: '/list/index',
                    component: ListIndex,
                    meta: {
                        title: '商品列表',
                        login: false
                    }
                }
            ],
            meta: {
                title: '商品列表',
                login: false
            }
        },
        // 商品支付页面
        {
            path: '/pay',
            component: PayIndex,
            children: [
                {
                    path: '/pay/index',
                    component: PayIndex,
                    meta:{
                        title:'支付详情',
                        // login:true
                    }
                }
            ],
            meta:{
                title:'支付详情',
                // login:true
            }
        },
        // 地址列表
        {
            path: '/address',
            component: AddressIndex,
            children: [
                {
                    path: '/address/index',
                    component: AddressIndex,
                    meta: {
                        title: '地址列表',
                        // login: true
                    }
                }
            ],
            meta: {
                title: '地址列表',
                // login: true
            }
        },
        // 新增地址
        {
            path: '/address/addAddress',
            component: AddAddress,
            meta: {
                title: '新增地址',
                // login: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((item) => item.meta.login)) {
        let info = router.app.$local.fetch('info');
        if (info.login) {
            // if (info.token) {
            next()
            // } else {
            //     router.push({path: '/login'})
            // }
        } else {
            router.push({path: '/login'})
        }
    } else {
        next()
    }
    if (to.meta.title) {
        window.document.title = to.meta.title
    } else {
        window.document.title = '拼趣多微信商城'
    }
})
export default router;
