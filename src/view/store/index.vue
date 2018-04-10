<template>
    <div class="store">
        <store-info :store="storeInfo"></store-info>
    </div>
</template>

<script>
    import StoreInfo from '@/components/store/storeInfo'

    export default {
        name: "index",
        data() {
            return {
                page:'1',
                pageSize:'10',
                storeInfo:'',
            }
        },
        mounted() {
            this.getStore(this.page,this.pageSize)
        },
        components:{ StoreInfo },
        methods: {
            getStore(page,pageSize) {
                this.$post('store/getStoreList', {
                    store_id: this.$route.query.store_id,
                    stor:'sales',
                    pageSize:pageSize,
                    page:page
                })
                    .then((res) => {
                        if (res.status == '1') {
                            this.storeInfo = res.result
                        } else {
                            console.log('出错了')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
