<template>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100">
        <index-banner :banner="bannerData"></index-banner>
        <menu-list :info="menuData"></menu-list>
        <!--<router-link to="" class="enter" >-->
        <!--<img src="" alt="活动入口" >-->
        <!--</router-link>-->
        <goods-list :list="listData"></goods-list>
    </div>
</template>

<script>
    import IndexBanner from './banner'
    import MenuList from '../menuList.vue'
    import GoodsList from './goodsList.vue'

    export default {
        data() {
            return {
                bannerData: [],          // 首页banner
                menuData: [],            // 菜单列表
                listData: [],            // 首页商品列表
                page: 0,
                loading: false,
                enterInfo: {homeBanner: {}},
            }
        },
        components: {IndexBanner, MenuList, GoodsList},
        mounted() {
            // this.getInfo(1)
            this.getIndex()
        },
        methods: {
            // 获取menu和banner图
            getIndex() {
                this.$post('index/getIndex', {})
                    .then((res) => {
                        this.bannerData = res.ad_list
                        this.menuData = res.column_list
                    })
            },
            // 商品列表
            getList(page) {
                this.$post('search/search', {
                    page: page
                })
                    .then((res) => {
                        if (page =='1') {
                            this.listData = res.list
                        } else {
                            this.listData = this.listData.concat(res.list)
                        }
                    })
            },

            // 加载更多
            loadMore() {
                this.loading = true
                this.page++
                this.getList(this.page)
                this.loading = false
            }

        }
    }
</script>
<style scoped lang="scss">
    .enter {
        /*display: block;*/
        width: 100%;
        img {
            width: 100%;
            height: 230px;
        }
    }

</style>
