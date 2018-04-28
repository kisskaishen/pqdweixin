<template>
    <div class="fruit" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100">
        <list :goods="goodsList"></list>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import List from '../../components/index/goodsSquared'
    import Tabbar from '../../components/footer'
    import { Toast } from 'mint-ui';
    export default {
        name: "index",
        data() {
            return {
                goods: {},
                goodsList: [],
                loading:false,
                page:0
            }
        },
        components: {List, Tabbar},
        mounted() {
        },
        methods: {
            getList(page) {
                this.$post('index/getActivGoods', {
                    type: '11',
                    page: page
                })
                    .then(res => {
                        this.goodsList = this.goodsList.concat(res.result.goodsList.items)
                        if (res.result.goodsList.items == '') {
                            Toast({
                                message: '别拉了，我是有底线的',
                                duration: 2000
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            loadMore() {
                this.loading = true
                this.page ++
                this.getList(this.page)
                this.loading = false
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
