<template>
    <div>
        <div class="storeInfo detailsDiv">
            <router-link :to="'/store/index?store_id='+order.merchant_info.store_id" class="divFl">
                <img :src="order.merchant_info.store_logo" :alt="order.merchant_info.store_name">
                <p>{{order.merchant_info.store_name}}</p>
            </router-link>
        </div>

        <div class="goodsInfo detailsDiv">
            <img :src="order.spec_goods_price.img" alt="商品图片">
            <div class="divFr">
                <p>{{order.goods_name}}</p>
                <p>{{order.spec_goods_price.key_name}}</p>
                <p>￥{{order.prom_price}}/件</p>
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
            <router-link :to="'/address/index?goods_id='+this.$route.query.goods_id+'&goods_number='+this.$route.query.goods_number+'&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id" class="divDiv">
                <div class="divFl">
                    <i></i>
                    <div>
                        <p>{{order.default_address_info.consignee}} {{order.default_address_info.mobile}}</p>
                        <p>{{order.default_address_info.address_base}}{{order.default_address_info.address}}</p>
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
                    <router-link to="/user/myCoupon?from=pay">
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
                    <router-link to="/user/myCoupon?from=pay">
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
    import {Toast} from 'mint-ui';

    export default {
        data() {
            return {
                number: 1,
                totalMoney: '',
                order: {merchant_info: {},spec_goods_price:{},default_address_info:{}},
                orderPrice: '',             // 店铺合计
                totalPrice: '',             // 您需支付
            }
        },
        mounted() {
            this.getOrder()
        },
        methods: {
            // 获取订单信息
            getOrder() {
                this.$post('buy/getBuyInfo', {
                    token: this.$token,
                    goods_id: this.$route.query.goods_id,
                    goods_number: this.$route.query.goods_number,
                    spec_key: this.$route.query.spec_key,
                    order_class: this.$route.query.order_class,                    // 1：单买 2：拼团 3：秒杀 4：免单
                    is_group: this.$route.query.order_class == '2' ? this.$route.query.group_id ? '2' : '1' : '0',      // if order_class==2(当前类型为2即拼团类型时)，在判断是否有group_id，if true 拼团：参团
                    group_id: this.$route.query.order_class == '2' ? this.$route.query.group_id : '',               // 1：单买 2：拼团 3：秒杀 4：免单
                    time: Math.round(new Date().getTime() / 1000),
                    sign:'123'
                })
                    .then(res => {
                        this.order = res
                        this.orderPrice = res.prom_price
                        this.totalPrice = res.prom_price
                    })
            },
            reduceBtn() {
                this.number -= 1
                this.orderPrice = this.order.prom_price * this.number
            },
            addBtn() {
                this.number+= 1
                console.log(this.number)
                this.orderPrice = this.order.prom_price * this.number

            },
            // 立即支付
            payClick() {
                this.$post('buy/submit',{
                    token:this.$token,
                    goods_id:this.$route.query.goods_id,
                    order_class:this.$route.query.order_class,
                    spec_key:this.$route.query.spec_key,
                    goods_number:this.$route.query.goods_number,
                    is_group:this.$route.query.is_group,
                    group_id:this.$route.query.group_id,
                    referer:'1',
                    sign:'132',
                    address_id:this.order.default_address_info.address_id,
                    pay_code:this.order.pay_list[0].pay_code,
                    p_coupon_code:'',
                    m_coupon_code:'',
                })
                    .then(res=>{
                        console.log(res)
                    })
            }
        },
        watch: {
            number() {
                if (this.number < 1) {
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
                display: block;
                width: 100%;
                text-align: left;
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
