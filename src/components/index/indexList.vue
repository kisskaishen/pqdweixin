<template>
    <div>
        <index-banner :banner="bannerData"></index-banner>
        <menu-list :info="menuData"></menu-list>
        <goods-list :list="listData" @listenLoading="morePage"></goods-list>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import IndexBanner from './banner'
    import MenuList from '../menuList.vue'
    import GoodsList from './goodsList.vue'
    import Tabbar from '../footer.vue'

    export default {
        data() {
            return {
                bannerData:[],          // 首页banner
                menuData:[],            // 菜单列表
                listData:[],            // 首页商品列表
                page:1,
            }
        },
        components: {IndexBanner, MenuList, GoodsList, Tabbar},
        mounted() {
            this.getInfo(this.page)
        },
        methods: {
            getInfo(page) {
                this.$post('index/home',{
                    page: page
                })
                    .then((res) => {
                        if (res.status == '1') {
                            this.bannerData = res.result.ad
                            this.menuData = res.result.cat
                            if (page == 1) {
                                this.listData = res.result.goodsList.items
                            } else {
                                this.listData.push(res.result.goodsList.items)
                            }

                        } else {
                            console.log('出错了')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            // 加载更加数据
            morePage(page) {
                this.getInfo(page)
            }
        }
    }
</script>
