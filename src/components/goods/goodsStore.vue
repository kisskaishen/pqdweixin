<template>
    <div>
        <i class="borderTop"></i>
        <div class="goodsStore detailsDiv">
            <router-link :to="{path:'/store/index',query:{store_id:store.store_id}}" class="divDiv">
                <div class="storeFl divFl">
                    <img :src="store.store_logo" :alt="store.store_name">
                    <div class="storeName">
                        <p>
                            <b>{{store.store_name}}</b>
                        </p>
                        <p>
                            <span>累计销量：{{store.sales}}</span>
                            <!--<span>商品数量35</span>-->
                            <!--<span>已拼35万</span>-->
                        </p>
                    </div>
                </div>
                <div class="storeFr divFr">
                    <div><i></i><span>进店逛逛</span></div>
                </div>
            </router-link>
        </div>

        <!--我的想法是做的，但是重构是说只是把原来的copy一遍，所以就隐藏了-->
        <!--<div class="storeGoods detailsDiv">-->
        <!--<p>店铺推荐</p>-->
        <!--<div class="storeGoodsList">-->
        <!--<div class="storeGoodsLi" v-for="item in 3">-->
        <!--<img src="" alt="">-->
        <!--<p>商品名称</p>-->
        <!--<p>-->
        <!--<span>￥39.9</span>-->
        <!--<span>已拼1800件</span>-->
        <!--</p>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        props: ['storeInfo'],
        data() {
            return {}
        },

        mounted() {
        },
        computed: {
            store() {
                return this.storeInfo.merchant_info
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .borderTop {
        width: 100%;
        height: 14px;
        background: url("../../images/img-line.png") no-repeat center /100%;
    }

    .goodsStore {
        margin-top: 0;
        a {
            .storeFl {
                img {
                    width: 86px;
                    height: 86px;
                }
                p {
                    text-align: left;
                    b {
                        color: #333;
                        font-size: 30px;
                    }
                    span {
                        display: inline;
                        margin-right: 20px;
                    }
                }
            }

            .storeFr {
                border: 1px solid #ccc;
                padding: 8px 12px;
                i {
                    display: inline-block;
                    width: 56px;
                    height: 56px;
                    vertical-align: middle;
                    margin-right: 12px;
                    background: url("../../images/icon-store.png") no-repeat center /100%;
                }
            }
        }
    }

    .storeGoods {
        & > p {
            padding: 10px 0;
        }
        .storeGoodsList {
            display: flex;
            justify-content: flex-start;
            .storeGoodsLi {
                width: 222px;
                margin-right: 22px;
                &:nth-child(3) {
                    margin-right: 0;
                }
                img {
                    width: 222px;
                    height: 222px;
                }
                p {
                    padding: 4px 0;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    span {
                        &:first-child {
                            text-align: left;
                            color: red;
                        }
                        &:last-child {
                            text-align: right;
                        }
                    }
                }
            }
        }
    }

</style>
