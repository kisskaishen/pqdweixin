<template>
    <div>
        <div class="storeInfo detailsDiv">
            <router-link :to="'/store/index?store_id='+order.merchant_info.store_id" class="divFl">
                <img :src="order.merchant_info.store_logo" :alt="order.merchant_info.store_name">
                <p>{{order.merchant_info.store_name}}</p>
            </router-link>
        </div>

        <div class="goodsInfo detailsDiv">
            <img :src="order.goods_info.goods_price.img" alt="商品图片">
            <div class="divFr">
                <p>{{order.goods_info.goods_name}}</p>
                <p>{{order.goods_info.goods_price.key_name}}</p>
                <p>￥{{order.goods_info.goods_price.prom_price}}/件</p>
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
            <router-link
                :to="'/address/index?goods_id='+this.$route.query.goods_id+'&goods_number='+this.$route.query.goods_number+'&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id"
                class="divDiv">
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
                        <div v-if="mechatCoupon">
                            <p>{{mechatCoupon.coupon_name}}</p>
                            <p>-{{mechatCoupon.money}}</p>
                        </div>
                        <p v-else>当前没有可用优惠券</p>
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
                        <div v-if="platformCoupon">
                            <p>{{platformCoupon.coupon_name}}</p>
                            <p>-{{platformCoupon.money}}</p>
                        </div>
                        <p v-else>当前没有可用优惠券</p>
                    </router-link>
                    <span></span>
                </div>
            </div>
        </div>

        <div class="payTypeDiv detailsDiv">
            <div class="divFl">
                <i class="icon-wxPay"></i>
                <span>{{order.pay_list[0].pay_name}}</span>
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
                number: this.$route.query.goods_number,
                totalMoney: '',
                order: {goods_info: {goods_price: {}}, merchant_info: {}, default_address_info: {},pay_list:{}},
                orderPrice: 0,             // 店铺合计
                totalPrice: 0,             // 您需支付

                // 优惠券
                merchatCouponList: [],           // 商家优惠券列表
                platformCouponList: [],           // 平台优惠券列表

                useMerchatCouponList: [],            // 可用商家优惠券

                mechatCoupon: {},                   // 商家默认优惠券
                platformCoupon: {},                   // 平台默认优惠券

                mechatCouponMoney: '',                   // 商家默认优惠券
                platformCoupon: {},            // 平台默认优惠券
            }
        },
        mounted() {
            // this.$nextTick(()=>{
            this.getCoupon()
            // })
            // setTimeout(() => {
            this.getOrder()
            // },1000)


        },
        methods: {
            // 获取优惠券
            getCoupon() {
                this.$post('buy/getOrderCoupon', {
                    goods_id: this.$route.query.goods_id,
                    token: this.$token
                })
                    .then(res => {
                        this.merchatCouponList = res.merchant
                        this.platformCouponList = res.platform
                        if (this.merchatCouponList != '' && this.platformCouponList != '') {  // 如果商家优惠券和平台优惠券同时存在，先判断平台优惠券是否可以使用---规则：先扣除商家在扣除平台
                            let couponList = []   // 定义一个可用优惠券的数据，他肯定是小于等于原数组---商家优惠券数组
                            let platformcouponList = []   // 定义一个可用优惠券的数据，他肯定是小于等于原数组---平台优惠券数组
                            for (let i = 0; i < this.merchatCouponList.length; i++) {
                                if (this.merchatCouponList[i].condition_money < this.orderPrice) {
                                    couponList.push(this.merchatCouponList[i])
                                }
                            }
                            this.mechatCoupon = couponList[0]                           // 默认商家券
                            this.orderPrice = (this.orderPrice - couponList[0].money).toFixed(2)         // 先扣除商家后得到的值
                            for (let i = 0; i < this.platformCouponList.length; i++) {
                                if (this.platformCouponList[i].condition_money < this.orderPrice) {
                                    platformcouponList.push(this.platformCouponList[i])
                                }
                            }
                            this.platformCoupon = platformcouponList[0]             // 默认平台券
                            this.totalPrice = (this.orderPrice - platformcouponList[0].money).toFixed(2)

                        } else if (this.merchatCouponList != '' && this.platformCouponList == '') {       // 只存在商家优惠券
                            let couponList = []   // 定义一个可用优惠券的数据，他肯定是小于等于原数组
                            for (let i = 0; i < this.merchatCouponList.length; i++) {
                                if (this.merchatCouponList[i].condition_money < this.orderPrice) {
                                    couponList.push(this.merchatCouponList[i])
                                }
                            }
                            this.platformCoupon = ''
                            this.mechatCoupon = couponList[0]                       // 默认商家券
                            this.totalPrice = (this.orderPrice - couponList[0].money).toFixed(2)

                        } else if (this.merchatCouponList == '' && this.platformCouponList != '') {          // 只存在平台优惠券
                            let platformcouponList = []   // 定义一个可用优惠券的数据，他肯定是小于等于原数组
                            for (let i = 0; i < this.platformCouponList.length; i++) {
                                if (this.platformCouponList[i].condition_money < this.orderPrice) {
                                    platformcouponList.push(this.platformCouponList[i])
                                }
                            }
                            this.mechatCoupon = ''
                            this.platformCoupon = platformcouponList[0]             // 默认平台券
                            this.totalPrice = (this.orderPrice - platformcouponList[0].money).toFixed(2)
                        }
                    })
            },
            // 获取订单信息
            getOrder() {
                this.$post('buy/getBuyInfo', {
                    token: this.$token,
                    goods_id: this.$route.query.goods_id,
                    goods_number: this.number,
                    spec_key: this.$route.query.spec_key,
                    address_id: this.$route.query.address_id,
                    order_class: this.$route.query.order_class,                    // 1：单买 2：拼团 3：秒杀 4：免单
                    is_group: this.$route.query.order_class == '2' ? this.$route.query.group_id ? '2' : '1' : '0',      // if order_class==2(当前类型为2即拼团类型时)，在判断是否有group_id，if true 拼团：参团
                    group_id: this.$route.query.order_class == '2' ? this.$route.query.group_id : '',               // 1：单买 2：拼团 3：秒杀 4：免单
                    time: Math.round(new Date().getTime() / 1000),
                    sign: '123',
                    referer: '1', // 1.weixin 2.ios 3.安卓 4.小程序 5.H5 6.QQ
                })
                    .then(res => {
                        this.order = res
                        this.orderPrice = this.$route.query.order_class == '1' ? (res.goods_info.goods_price.price * this.number).toFixed(2) : (res.goods_info.goods_price.prom_price * this.number).toFixed(2)
                        this.totalPrice = this.$route.query.order_class == '1' ? (res.goods_info.goods_price.price * this.number - this.mechatCoupon.money).toFixed(2) : (res.goods_info.goods_price.prom_price * this.number).toFixed(2)
                    })
            },

            reduceBtn() {
                this.number = parseInt(this.number) - 1
            },
            addBtn() {
                this.number = parseInt(this.number) + 1
            },
            // 立即支付
            payClick() {
                this.$post('buy/submit', {
                    token: this.$token,
                    goods_id: this.$route.query.goods_id,
                    order_class: this.$route.query.order_class,
                    spec_key: this.$route.query.spec_key,
                    goods_number: this.$route.query.goods_number,
                    is_group: this.$route.query.order_class == '2' ? this.$route.query.group_id ? '2' : '1' : '0',
                    group_id: this.$route.query.group_id,
                    referer: '1', // 1.weixin 2.ios 3.安卓 4.小程序 5.H5 6.QQ
                    sign: '132',
                    address_id: this.order.default_address_info.address_id,
                    pay_code: this.order.pay_list[0].pay_code,
                    p_coupon_code: '',
                    m_coupon_code: '',
                })
                    .then(res => {
                        Toast({
                            message: '提交订单成功',
                            duration: 1200
                        })
                        // 这里找支付接口的，暂且先跳转到订单详情页面吧2018-05-10 14：17
                        setTimeout(() => {
                            this.$router.push({
                                path: '/order/detail',
                                query: {
                                    order_sn: res.order_sn
                                }
                            })
                        }, 1200)
                    })
            }
        },
        watch: {
            number() {
                console.log(this.number)
                if (this.number < 1) {
                    Toast('购买数量至少为1');
                    this.number = 1
                } else {
                    this.orderPrice = this.$route.query.order_class == '1' ? (this.order.goods_info.goods_price.price * this.number).toFixed(2) : (this.order.goods_info.goods_price.prom_price * this.number).toFixed(2)
                    this.totalPrice = this.$route.query.order_class == '1' ? (this.order.goods_info.goods_price.price * this.number).toFixed(2) : (this.order.goods_info.goods_price.prom_price * this.number).toFixed(2)
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
                justify-content: space-between;
                align-items: center;
                width: 100%;
                text-align: left;
                > div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        &:nth-child(2) {
                            margin-right: 40px;
                        }
                    }
                }
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
