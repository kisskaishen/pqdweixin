<template>
    <div>
        <div class="storeInfo detailsDiv">
            <router-link :to="'/store/index?store_id='+order.goods.store_id" class="divFl">
                <img :src="order.goods.store.store_logo" :alt="order.goods.store.store_name">
                <p>{{order.goods.store.store_name}}</p>
            </router-link>
        </div>

        <div class="goodsInfo detailsDiv">
            <img :src="order.goods.original" alt="商品图片">
            <div class="divFr">
                <p>{{order.goods.goods_name}}</p>
                <p>{{order.key_name}}</p>
                <p>￥{{order.goods.prom_price}}/件</p>
            </div>
        </div>

        <div class="number detailsDiv divDiv">
            <div class="divFl">购买数量</div>
            <div class="divFr">
                <div>
                    <button @click="reduceBtn" v-if="number>1">-</button>
                    <input type="number" v-model="number">
                    <button @click="addBtn">+</button>
                </div>
                <p>店铺合计：￥{{orderPrice}}(全场包邮)</p>
            </div>
        </div>

        <div class="address detailsDiv">
            <router-link to="/address/index" class="divDiv">
                <div class="divFl">
                    <i></i>
                    <div>
                        <p>{{order.user.consignee}} {{order.user.mobile}}</p>
                        <p>{{order.user.address_base}}{{order.user.address}}</p>
                    </div>
                </div>
                <div class="divFr">
                    <span></span>
                </div>
            </router-link>
        </div>

        <div class="couponDiv detailsDiv">
            <div class="divDiv">
                <div class="divFl">
                    店铺优惠券
                </div>
                <div class="divFr">
                    <router-link to="">
                        当前没有可用优惠券
                    </router-link>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="couponDiv detailsDiv">
            <div class="divDiv">
                <div class="divFl">
                    平台优惠券
                </div>
                <div class="divFr">
                    <router-link to="">
                        当前没有可用优惠券
                    </router-link>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="payTypeDiv detailsDiv">
            <div class="divFl">
                <i class="icon-wxPay"></i>
                <span>微信支付</span>
            </div>
            <div class="divFr">
                <i class="icon-check"></i>
            </div>
        </div>

        <div class="moneyDiv">
            <p>您需支付：￥{{totalPrice}}</p>
        </div>

        <div class="payBtn">
            <mt-button type="danger" @click="payClick">立即支付</mt-button>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                number: 1,
                totalMoney: '',
                order:{goods:{store:{}},user:{}},
                orderPrice:'',             // 店铺合计
                totalPrice:'',             // 您需支付
            }
        },
        mounted() {
            this.getOrder()
        },
        methods: {
            // 获取订单信息
            getOrder() {
                this.$post('goods/getGenerateOrder', {
                    goods_id: this.$route.query.goods_id,
                    user_id: '2556555',
                    num: this.$route.query.num,
                    type: this.$route.query.type,                    // type => 0参团，1开团，2单买
                    spec_key: this.$route.query.spec_key,
                    prom_id: this.$route.query.prom_id               // prom_id=>团id，if prom_id == '':'开团1或单买2':''
                })
                    .then(res => {
                        this.order = res.result
                        this.orderPrice = res.result.prom_price
                        this.totalPrice = res.result.prom_price
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            reduceBtn() {
                this.number -= 1
            },
            addBtn() {
                this.number += 1
            },
            // 立即支付
            payClick() {
                Toast('调用支付接口')
            }
        },
        watch:{
            number() {
                if (this.number<1) {
                    Toast('购买数量至少为1');
                    this.number = 1
                } else {
                    this.orderPrice = (this.number * this.order.prom_price).toFixed(2)
                    this.totalPrice = (this.number * this.order.prom_price).toFixed(2)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .storeInfo {
        padding: 20px;
        .divFl {
            color: #333;
            img {
                width: 100px;
                height: 100px;
            }
        }
    }

    .goodsInfo {
        display: flex;
        justify-content: flex-start;
        padding: 20px;
        img {
            width: 168px;
            height: 168px;
            margin-right: 20px;
        }
        .divFr {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            p {
                width: 100%;
                color: #333;
                &:nth-child(1) {
                    font-size: 28px;
                }
                &:nth-child(2) {
                    color: #999;
                }
                &:nth-child(3) {
                    text-align: right;
                }
            }
        }
    }

    .number {
        align-items: baseline;
        margin-bottom: 20px;
        padding: 20px;
        button {
            padding: 2px 10px;
            font-size: 30px;
            border-radius: 0;
            font-weight: bolder;
            color: #333;
        }
        input {
            width: 72px;
            text-align: center;
            padding: 2px;
        }
        .divFr {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            p {
                margin-top: 20px;
            }
        }
    }

    .address, .couponDiv {
        padding: 20px;
        .divFl {
            p {
                text-align: left;
            }
            i {
                width: 42px;
                height: 60px;
                margin-right: 20px;
                background: url("../../images/icon-address.png") no-repeat center /100%;
            }
        }
        .divFr {
            position: relative;
            span {
                position: absolute;
                content: '';
                right: 50%;
                top: 50%;
                margin: -10px 10px;
                width: 20px;
                height: 20px;
                border-top: 1px solid #ccc;
                border-right: 1px solid #ccc;
                transform: rotate(45deg);
            }
        }
    }

    .couponDiv {
        .divFl {
            color: #000;
        }
        .divFr {
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 20px;
            a {
                color: #999;
            }
            span {
                right: 0;
            }
        }
    }

    .payTypeDiv {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        .icon-wxPay {
            margin-right: 20px;
            background: url("../../images/icon-wxPay.png") no-repeat center /100%;
        }
        .icon-check {
            background: url("../../images/icon-check.png") no-repeat center /100%;
        }
    }

    .moneyDiv {
        p {
            text-align: center;
            margin-top: 40px;
        }
    }

    .payBtn {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        .mint-button {
            width: 100%;
            height: 100px;
            font-size: 30px;
        }
    }

</style>
