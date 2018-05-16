<template>
    <div class="orderDetail">
        <div class="orderInfo">
            <div class="status">
                <span>{{orderInfo.status_info}}</span>
                <img src="../../images/redBao.png" alt="">
            </div>
            <div class="address">
                <img src="../../images/icon_address@2x.png" alt="">
                <div class="addressInfo">
                    <p>收货人：{{orderInfo.shipping_info.consignee}} {{orderInfo.shipping_info.mobile}}</p>
                    <p>收货地址：{{orderInfo.shipping_info.address}}</p>
                </div>
            </div>
            <div class="goodsDiv">
                <div class="store">
                    <router-link :to="'/store/index?store_id='+orderInfo.store_id">
                        <div>
                            <img :src="orderInfo.store_logo" alt="">
                            <span>商家</span>
                        </div>
                        <div>
                            <span class="red">{{orderInfo.status_info}}</span>
                        </div>
                    </router-link>
                </div>
                <div class="goods">
                    <router-link :to="'/detail/index?goods_id='+orderInfo.goods_id">
                        <div class="divFl">
                            <img src="" alt="商品图片">
                            <div>
                                <span>{{orderInfo.goods_name}}</span>
                                <span>{{orderInfo.spec_key_name}}</span>
                            </div>
                        </div>

                        <div class="divFr">
                            <span class="red">￥{{orderInfo.goods_price}}</span>
                            <span>￥{{orderInfo.market_price}}</span>
                            <span>x{{orderInfo.goods_num}}</span>
                        </div>
                    </router-link>
                </div>
                <div class="money">
                    <p>
                        实付：<span class="red">￥{{orderInfo.order_amount}}</span>({{orderInfo.shipping_free}})
                    </p>
                    <p>
                        <mt-button type="danger">操作</mt-button>
                    </p>
                </div>
                <div class="contact">
                    <div>
                        <router-link to="">
                            <i></i><span>联系卖家</span>
                        </router-link>
                    </div>
                    <div>
                        <router-link to="">
                            <i></i><span>拨打电话</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="groupInfo" v-if="orderInfo.group_id">
                <div class="divFl">
                    <img src="../../images/icon-tuan.png" alt="">
                    <span>拼团</span>
                    <img src="" alt="">
                </div>
                <div class="divFr">
                    <mt-button type="danger" @click.native="goGroup">拼团详情</mt-button>
                </div>
            </div>
            <div class="orderDiv">
                <p>订单编号：{{orderInfo.order_sn}}</p>
                <p>支付方式：{{orderInfo.pay_name}}</p>
                <p>下单时间：{{orderInfo.add_time}}</p>
            </div>
        </div>
        <div class="moreList">
            <div class="top">猜你喜欢</div>
            <!--<goods-squared :goods=""></goods-squared>-->
        </div>
    </div>
</template>

<script>
    import GoodsSquared from "../../components/index/goodsSquared";

    export default {
        name: "detail",
        components: {GoodsSquared},
        data() {
            return {
                orderInfo: {shipping_info: {}},
            }
        },
        mounted() {
            this.getOrder()
        },
        methods: {
            // 获取订单详情
            getOrder() {
                this.$post('user/getOrderDetail', {
                    token: this.$token,
                    order_sn: this.$route.query.order_sn
                })
                    .then(res => {
                        this.orderInfo = res
                    })
            },
            // 查看拼团详情页面
            goGroup() {
                this.$router.push({
                    path: '/group/detail',
                    query: {
                        group_id: this.orderInfo.group_id
                    }
                })
            },
            // 猜你喜欢
        }
    }
</script>

<style scoped lang="scss">
    .orderInfo {
        > div {
            margin-bottom: 20px;
            background-color: #fff;
            padding: 20px;
        }
        .status {
            position: relative;
            padding: 64px;
            margin: 0;
            background-color: #e02e24;
            span {
                color: #fff;
                font-size: 40px;
            }
            img {
                position: absolute;
                right: 96px;
                top: 50%;
                margin-top: -52px;
                width: 104px;
                height: 104px;
            }
        }
        .address {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
                margin-right: 20px;
            }
            .addressInfo {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                align-self: center;
                p {
                    padding: 4px 0;
                }
            }
        }
        .goodsDiv {
            padding: 0 20px;
            .store {
                a {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    border-bottom: 1px solid #eee;
                    color: #333;
                    div {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        img {
                            display: block;
                            width: 44px;
                            height: 44px;
                            margin-right: 20px;
                        }
                        span {
                        }
                    }
                }
            }
            .goods {
                a {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 0;
                    background-color: #fafafa;
                    border-bottom: 1px solid #eee;
                    .divFl {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        img {
                            width: 120px;
                            height: 120px;
                            border: 1px solid red;
                        }
                        div {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            align-self: stretch;
                            span {
                                width: 440px;
                                text-align: left;
                                white-space: normal;
                                margin: 6px 0;
                            }
                        }
                    }
                    .divFr {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        span {
                            &:nth-child(1) {
                                font-size: 26px;
                            }
                            &:nth-child(2) {
                                text-decoration: line-through;
                            }
                            &:nth-child(3) {
                                margin-top: 20px;
                            }

                        }
                    }
                }
            }
            .money {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px 0;
                border-bottom: 1px solid #eee;
                .red {
                    font-size: 26px;
                    margin: 0 10px;
                }
            }
            .contact {
                display: flex;
                justify-content: space-around;
                align-items: center;
                background-color: #fff;
                > div {
                    a {
                        padding: 20px 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        i {
                            width: 34px;
                            height: 34px;
                            margin-right: 10px;

                        }
                    }
                    &:nth-child(1) {
                        a {
                            i {
                                background: url("../../images/icon-message.png") no-repeat center /100%;
                            }
                        }
                    }
                    &:nth-child(2) {
                        a {
                            i {
                                background: url("../../images/icon-calling.png") no-repeat center /100%;
                            }
                        }
                    }
                }
            }
        }
        .groupInfo {
            display: flex;
            justify-content: space-between;
            .divFl {
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                }
            }
        }
        .orderDiv {
            p {
                padding: 6px 0;
            }
        }
    }

    .moreList {
        .top {
            padding: 20px;
            text-align: center;
            background-color: #fff;
        }
    }
</style>
