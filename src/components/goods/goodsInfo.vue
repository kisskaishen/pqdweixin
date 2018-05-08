<template>
    <div class="goodsBaseInfo">
        <div class="top">
            <div class="price">
                <b class="pqdPrice">￥{{goodsInfo.prom_price}}</b>
                <span class="marketPrice">￥{{goodsInfo.market_price}}</span>
            </div>
            <div class="saleNum">累计销量：{{goodsInfo.sales}}件</div>
        </div>
        <div class="tip">
            <div v-for="item,index in goodsInfo.security" :key="item.type">
                <i></i>
                <span>{{item.type}}</span>
            </div>
        </div>
        <div class="goodsName">
            <b>{{goodsInfo.goods_name}}</b>
            <span>{{goodsInfo.goods_remark}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['info'],
        data() {
            return {}
        },
        computed: {
            goodsInfo() {
                return this.info
            },
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .goodsBaseInfo {
        width: 100%;
        > div {
            padding: 0 20px;
        }
        .top {
            display: flex;
            justify-content: space-between;
            color: #666;
            font-size: 28px;
            padding: 20px;
            background-color: #f6f6f6;
            .price {
                display: flex;
                justify-content: flex-start;
                align-items: baseline;
                .pqdPrice {
                    color: #f13d3c;
                    margin-right: 20px;
                }
                .marketPrice {
                    text-decoration: line-through;
                    font-size: 20px;
                }
            }
        }
        .tip {
            display: flex;
            justify-content: space-around;
            padding: 10px 20px;
            color: #666;
            i {
                display: inline-block;
                width: 30px;
                height: 30px;
                vertical-align: middle;
                background: url("../../images/icon-check.png") no-repeat center /100%;
                box-sizing: border-box;
            }
        }
        .goodsName {
            padding: 20px;
            background-color: #fff;
            b {
                display: block;
                font-size: 28px;
                color: #000;
                margin-bottom: 20px;

            }
            span {
                font-size: 20px;
                color: #666;
            }
        }
    }
</style>
