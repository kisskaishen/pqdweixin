<template>
    <div>
        <div class="storeInfo">
            <div class="storeTop">
                <div class="storeTopFl">
                    <img :src="storeData.store_logo" :alt="storeData.store_name">
                    <div>
                        <b>{{storeData.store_name}}</b>
                        <p>销量：{{storeData.sales}}件</p>
                    </div>
                </div>
                <div class="storeTopFr">
                    <mt-button type="danger">联系卖家</mt-button>
                </div>
            </div>
            <div class="storeBottom">
                {{storeData.introduce}}
            </div>
        </div>
        <!--<div class="coupon" v-if="storeData.coupon">-->
            <!--<p>优惠券</p>-->
            <!--<ul class="couponbg">-->
                <!--<li v-for="item,index in storeData.coupon">-->
                    <!--<div>-->
                        <!--<p>￥<b>{{item.money}}</b></p>-->
                        <!--<p>{{item.name}}</p>-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--<p><span @click="getCoupon(item)">领取</span></p>-->
                        <!--<p>{{item.use_end_time | formatDate}}过期</p>-->
                    <!--</div>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--<div class="title">-->
            <!--<div>全部商品（{{storeData.goods.total}}）</div>-->
            <!--<div>-->
                <!--<mt-button type="danger" :plain="!isPlain" @click="plainChange">销量</mt-button>-->
                <!--<mt-button type="danger" :plain="isPlain" @click="plain2Change">上新</mt-button>-->
            <!--</div>-->
        <!--</div>-->

    </div>
</template>

<script>
    import {formatDate} from "../../config/date";

    export default {
        name: "storeInfo",
        props: ['store','list'],
        data() {
            return {
                isPlain:false,
            }
        },
        computed: {
            storeData() {
                return this.store
            },
            listData() {
                return this.list
            }
        },
        mounted() {

        },
        filters:{
            formatDate(time) {
                var date = new Date(time * 1000)
                return formatDate(date, 'yyyy-MM-dd')
            },
        },
        methods: {
            // 领取优惠券
            getCoupon(val) {
                this.$post('user/getReceiveCoupon',{
                    user_id:this.$getCookie('user_id'),
                    coupon_id:val.id,
                    type:'2'
                })
                    .then(res=>{
                        console.log(res.result)
                    })
            },
            // 条件筛选
            plainChange() {
                this.isPlain = !this.isPlain
            },
            plain2Change() {
                this.isPlain = !this.isPlain
            }
        }
    }
</script>

<style scoped lang="scss">
    .storeInfo {
        width: 100%;
        background-color: #fff;
        > div {
            padding: 20px;
        }
        .storeTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .storeTopFl {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                img {
                    width: 100px;
                    height: 100px;
                    margin-right: 20px;
                }
                div {
                    color: #666;
                    font-size: 24px;
                    b {
                        color: #000;
                        font-size: 28px;
                    }
                }
            }
        }
    }
    .coupon {
        background-color: #fff;
        border-top: 1px solid #eee;
        p {
            padding: 20px;
        }
        .couponbg {
            display: flex;
            justify-content: flex-start;
            width: 750px;
            padding: 0 20px 10px;
            overflow: scroll;
            li {
                display: flex;
                justify-content: space-around;
                min-width: 336px;
                height: 120px;
                margin-right: 20px;
                background: url("../../images/icon_coupon_background.png") no-repeat center center /100% 100%;
                >div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p {
                        font-size: 20px;
                        padding: 0;
                        color: #fff;
                        b {
                            font-size: 30px;
                        }
                        span {
                            display: block;
                            border: 1px solid #fff;
                            padding: 2px 10px;
                        }
                    }
                }


            }
        }
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 20px !important;
        margin: 20px 0;
        > div {
            color: #333;
        }
        .mint-button {

        }
    }
</style>
