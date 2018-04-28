import Vue from 'vue'
import Router from 'vue-router'

const IndexIndex = r => require.ensure([], () => r(require('@/view/index/index')), 'IndexIndex')
const DetailIndex = r => require.ensure([], () => r(require('@/view/detail/index')), 'DetailIndex')
const StoreIndex = r => require.ensure([], () => r(require('@/view/store/index')), 'StoreIndex')
const ListIndex = r => require.ensure([], () => r(require('@/view/list/index')), 'ListIndex')
const PayIndex = r => require.ensure([], () => r(require('@/view/pay/index')), 'PayIndex')
const AddressIndex = r => require.ensure([], () => r(require('@/view/address/index')), 'AddressIndex')
const AddAddress = r => require.ensure([], () => r(require('@/view/address/addAddress')), 'AddAddress')

const RankingIndex = r => require.ensure([], () => r(require('@/view/ranking/index')), 'RankingIndex')

const FruitIndex = r => require.ensure([], () => r(require('@/view/fruit/index')), 'FruitIndex')

const ExploreIndex = r => require.ensure([], () => r(require('@/view/explore/index')), 'ExploreIndex')
const ExploreSearch = r => require.ensure([], () => r(require('@/view/explore/search')), 'ExploreSearch')

const CouponIndex = r => require.ensure([], () => r(require('@/view/coupon/index')), 'CouponIndex')

const UserIndex = r => require.ensure([], () => r(require('@/view/user/index')), 'UserIndex')
const UserOrder = r => require.ensure([], () => r(require('@/view/user/order')), 'UserOrder')
const UserMyMsg = r => require.ensure([], () => r(require('@/view/user/myMsg')), 'UserMyMsg')
const UserMyCoupon = r => require.ensure([], () => r(require('@/view/user/myCoupon')), 'UserMyCoupon')
const UserMyFree = r => require.ensure([], () => r(require('@/view/user/myFree')), 'UserMyFree')
const UserMyProm = r => require.ensure([], () => r(require('@/view/user/myProm')), 'UserMyProm')
const UserMyLike = r => require.ensure([], () => r(require('@/view/user/myLike')), 'UserMyLike')
const UserMyCollection = r => require.ensure([], () => r(require('@/view/user/myCollection')), 'UserMyCollection')
const UserMyAddress = r => require.ensure([], () => r(require('@/view/user/myAddress')), 'UserMyAddress')
const UserHelp = r => require.ensure([], () => r(require('@/view/user/help')), 'UserHelp')

// 活动专区
const ActivityWuyi = r => require.ensure([], () => r(require('@/view/activity/wuyi')), 'ActivityWuyi')
const ActivityWuyiRules = r => require.ensure([], () => r(require('@/view/activity/rules')), 'ActivityWuyiRules')
const ActivityWuyiMoreList = r => require.ensure([], () => r(require('@/view/activity/moreList')), 'ActivityWuyiMoreList')

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
                    meta: {
                        title: '支付详情',
                        // login:true
                    }
                }
            ],
            meta: {
                title: '支付详情',
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
        // 排行榜
        {
            path: '/ranking',
            component: RankingIndex,
            children: [
                {
                    path: '/ranking/index',
                    component: RankingIndex,
                }
            ],
            meta: {
                title: '排行榜',
                login: false
            }
        },
        // 品质水果
        {
            path: '/fruit',
            component: FruitIndex,
            children: [
                {
                    path: '/fruit/index',
                    component: FruitIndex,
                }
            ],
            meta: {
                title: '品牌水果',
                login: false
            }
        },
        // 探索
        {
            path: '/explore',
            component: ExploreIndex,
            children: [
                {
                    path: '/explore/index',
                    component: ExploreIndex,
                }
            ],
            meta: {
                title: '探索',
                login: false
            }
        },
        {
            path: '/explore/search',
            component: ExploreSearch,
            meta: {
                title: '搜索',
                login: false
            }
        },
        // 个人中心
        {
            path: '/user',
            component: UserIndex,
            children: [
                {
                    path: '/user/index',
                    component: UserIndex
                }
            ],
            meta: {
                title: '个人中心',
                // login: true
            }
        },
        // 个人中心-我的订单
        {
            path: '/user/order',
            component: UserOrder,
            meta: {
                title: '我的订单',
                // login: true
            }
        },
        // 个人中心-我的消息
        {
            path: '/user/myMsg',
            component: UserMyMsg,
            meta: {
                title: '我的消息',
                // login: true
            }
        },
        // 个人中心-我的优惠券
        {
            path: '/user/myCoupon',
            component: UserMyCoupon,
            meta: {
                title: '我的优惠券',
                // login: true
            }
        },
        // 个人中心-我的免单
        {
            path: '/user/myFree',
            component: UserMyFree,
            meta: {
                title: '我的免单',
                // login: true
            }
        },
        // 个人中心-我的拼团
        {
            path: '/user/myProm',
            component: UserMyProm,
            meta: {
                title: '我的拼团',
                // login: true
            }
        },
        // 个人中心-为我助力
        {
            path: '/user/myLike',
            component: UserMyLike,
            meta: {
                title: '为我助力',
                // login: true
            }
        },
        // 个人中心-我的收藏
        {
            path: '/user/myCollection',
            component: UserMyCollection,
            meta: {
                title: '我的收藏',
                // login: true
            }
        },
        // 个人中心-收货地址
        {
            path: '/user/myAddress',
            component: UserMyAddress,
            meta: {
                title: '收货地址',
                // login: true
            }
        },
        // 个人中心-常见问题
        {
            path: '/user/help',
            component: UserHelp,
            meta: {
                title: '常见问题',
                // login: true
            }
        },

        // 优惠券

        {
            path: '/coupon',
            component: CouponIndex,
            children: [
                {
                    path: '/coupon/index',
                    component: CouponIndex
                }
            ],
            meta: {
                title: '领取优惠券',
                // login: true
            }
        },

        // 活动专区
        {
            path: '/activity/wuyi',
            component: ActivityWuyi,
            meta: {
                title: '五一会场',
                // login: true
            }
        },
        {
            path: '/activity/rules',
            component: ActivityWuyiRules,
            meta: {
                title: '五一会场规则',
                // login: true
            }
        },
        {
            path: '/activity/moreList',
            component: ActivityWuyiMoreList,
            meta: {
                title: '五一会场--系列专场',
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
