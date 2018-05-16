<template>
    <div class="store">
        <store-info :store="storeInfo"></store-info>
        <goods-squared :goods="goodsInfo"></goods-squared>
    </div>
</template>

<script>
    import StoreInfo from '../../components/store/storeInfo'
    import GoodsSquared from '../../components/index/goodsSquared'

    export default {
        name: "index",
        data() {
            return {
                page: '1',
                pageSize: '10',
                storeInfo: {},
                goodsInfo:{list:[]}
            }
        },
        mounted() {
            this.getStore()
            this.getGoods()
        },
        components: {StoreInfo, GoodsSquared},
        methods: {
            // 获取商家信息
            getStore() {
                this.$post('merchant/getMerchantInfo', {
                    store_id: this.$route.query.store_id,
                })
                    .then((res) => {
                        this.storeInfo = res
                    })
            },
            // 获取商品列表
            getGoods() {
                this.$post('search/search',{
                    store_id: this.$route.query.store_id,
                })
                    .then(res=>{
                        this.goodsInfo = res.list
                    })
            }

        }
    }
</script>

<style scoped lang="scss">

</style>
