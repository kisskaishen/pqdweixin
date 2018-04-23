<template>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100">
        <index-banner :banner="bannerData"></index-banner>
        <menu-list :info="menuData"></menu-list>
        <a :href="enterInfo.homeBanner.openUrl" class="enter">
            <img :src="enterInfo.homeBanner.logoUrl" alt="">
        </a>
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
                enterInfo:{homeBanner:{}},
            }
        },
        components: {IndexBanner, MenuList, GoodsList},
        mounted() {
            this.getInfo(1)
            this.getEnterInfo()
        },
        methods: {
            getInfo(page) {
                this.$post('index/home', {
                    page: page
                })
                    .then((res) => {
                        if (res.status == '1') {
                            this.bannerData = res.result.ad
                            this.menuData = res.result.cat
                            if (page == 1) {
                                this.listData = res.result.goodsList.items
                            } else {
                                this.listData = this.listData.concat(res.result.goodsList.items)
                            }
                            this.loading = false

                        } else {
                            console.log('出错了')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getEnterInfo() {
                this.$post('ad/positions',{})
                    .then((res)=>{
                        if (res.status == '1') {
                            this.enterInfo = res.result
                        } else {
                            alert('出错了')
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                })
            },
            // 加载更多
            loadMore() {
                this.loading = true
                this.page ++
                this.getInfo(this.page)
            }

        }
    }
</script>
<style scoped lang="scss">
    .enter {
        display: block;
        width: 100%;
        img {
            width: 100%;
            height: 230px;
        }
    }
</style>
