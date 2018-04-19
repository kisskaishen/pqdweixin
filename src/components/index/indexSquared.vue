<template>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100">
        <menu-list :info="listMenu" v-if="this.$route.path != '/list/index'"></menu-list>
        <goods-squared :goods="listInfo"></goods-squared>
    </div>
</template>

<script>
    import MenuList from '../menuList.vue'
    import GoodsSquared from './goodsSquared.vue'

    export default {
        props: ['menu', 'list', 'currentId'],
        data() {
            return {
                menuData: [],            // 菜单列表
                page: 1,
                loading: false,
                listData: [],
            }
        },
        components: {MenuList, GoodsSquared},
        computed: {
            listMenu() {
                return this.menu.cat2
            },
            listInfo() {
                return this.list
            },
            listId() {
                return this.currentId
            }
        },
        mounted() {
            // this.getList(this.currentId,this.page)

        },
        methods: {
            // getList(id,page) {
            //     this.$post('goods/getMore', {
            //         id: id,
            //         page: page
            //     })
            //         .then((res) => {
            //             if (res.status == '1') {
            //                 if (this.page == 1) {
            //                     this.listData = res.result.items
            //                 } else {
            //                     this.listData = this.listData.concat(res.result.items)
            //                 }
            //                 console.log(res.result.items)
            //                 this.loading = false
            //             } else {
            //                 console.log('出错了')
            //             }
            //         })
            //         .catch((err) => {
            //             console.log(err)
            //         })
            // },
            loadMore() {
                this.loading = true
                this.page++
                this.$emit('moreData',this.page)
                setTimeout(()=>{
                    this.loading = false
                },1000)
                // this.getList(this.currentId,this.page)
            }
        }
    }
</script>
