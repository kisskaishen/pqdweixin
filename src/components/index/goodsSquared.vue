<template>
    <div class="list">
        <div class="goods" v-for="item,index in goodsSquared" :key="item.goods_id">
            <router-link :to="{path:'/detail/index',query:{goods_id:item.goods_id}}">
                <div class="goodsImage">
                    <img :src="item.list_img" :alt="item.goods_name">
                </div>
                <div class="goodsName">
                    {{item.goods_name}}
                </div>
                <div class="goodsDetail">
                    <div class="detailFl">
                        <b>￥{{item.prom_price}}</b>
                        <span>{{item.prom}}人团</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['goods'],
        data() {
            return {}
        },
        computed: {
            goodsSquared() {
                return this.goods
            }
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 120px;
        .goods {
            width: 48%;
            padding-bottom: 10px;
            margin: 20px 1% 0;
            background-color: #fff;
            .goodsImage {
                img {
                    display: block;
                    width: 100%;
                    height: 384px;
                }
            }
            .goodsName {
                height: 72px;
                overflow: hidden;
                padding: 0 16px;
                font-size: 26px;
                color: #444;
                text-align: left;
            }
            .goodsDetail {
                display: flex;
                align-content: center;
                justify-content: space-between;
                padding: 0 16px;
                .detailFl {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    b {
                        color: #F13D3C;
                        font-size: 30px;
                        margin-right: 20px;
                    }
                    .quan {
                        display: block;
                        border: 1px solid #F13D3C;
                        color: #F13D3C;
                        padding: 4px 10px;
                        margin: 0 8px;
                    }
                    .num {
                        font-size: 20px;
                        color: #999;
                    }
                }
                .detailFr {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

            }
        }
    }
</style>
