<template>
    <div class="coupon">
        <ul>
            <li v-for="item,index in couponList">
                <router-link :to="'/store/index?store_id='+item.store_id">
                    <div class="couponTop">
                        <div class="couponTopFl">
                            <div class="couponTopFl1">
                                <img :src="item.store_info.store_logo" alt="">
                                <p>{{item.store_info.store_name}}</p>
                            </div>
                            <div class="couponTopFl2">
                                <p>{{item.name}}</p>
                                <p class="price">￥<b>{{item.money}}</b></p>
                                <span>--可叠加使用</span>
                                <span>--{{item.condition}}</span>
                            </div>
                        </div>
                        <div class="couponTopFr">
                            <vm-progress v-if="item.coupon_type == '1'" type="circle" :percentage="item.percent" stroke-color="#105cf6" :width="40" :stroke-width="4"></vm-progress>
                            <vm-progress v-if="item.coupon_type == '2'" type="circle" :percentage="item.percent" stroke-color="#f61027" :width="40" :stroke-width="4"></vm-progress>
                            <vm-progress v-if="item.coupon_type == '3'" type="circle" :percentage="item.percent" stroke-color="#f69d10" :width="40" :stroke-width="4"></vm-progress>
                            <vm-progress v-if="item.coupon_type == '4'" type="circle" :percentage="item.percent" stroke-color="#f69d10" :width="40" :stroke-width="4"></vm-progress>
                            <vm-progress v-if="item.coupon_type == '5'" type="circle" :percentage="item.percent" stroke-color="#f69d10" :width="40" :stroke-width="4"></vm-progress>
                            <countDown v-if="item.coupon_type == '1'" :index="index" :endTime="item.left_time" @countDownOut="listenCountDown"></countDown>
                        </div>
                    </div>
                    <div class="couponBottom">
                        <span>活动有效期到{{item.send_end_time | formatDate}}</span>
                        <span>如使用多账号套券将取消资格</span>
                    </div>
                </router-link>
            </li>
        </ul>
        <p>------别拉了，我是有底线的------</p>
    </div>
</template>

<script>
    import {formatDate} from "../../config/date";
    import CountDown from './countDown'

    export default {
        name: "coupon",
        props: ['list'],
        data() {
            return {
                userName: decodeURI(this.$getCookie('user_name'))

            }
        },
        computed: {
            couponList() {
                return this.list
            }
        },
        components:{CountDown},
        mounted() {
            console.log('now:' + new Date().getTime())
        },
        filters: {
            formatDate(time) {
                var date = new Date(time * 1000)
                return formatDate(date, 'yyyy-MM-dd')
            },
            formatDay(time) {
                var countDate = new Date(time * 1000) - new Date().getTime()
                return parseInt(countDate / 86400000)
            }
        },
        methods:{
            listenCountDown(val) {
                console.log(val)
            }
        }

    }
</script>

<style scoped lang="scss">
    .coupon {
        ul {
            li {
                width: 720px;
                margin: 0 auto 20px;
                background-color: #fff;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                a {
                    text-align: left;
                    .couponTop {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .couponTopFl {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            .couponTopFl1 {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                padding: 20px;
                                border-right: 1px solid #eee;
                                img {
                                    display: block;
                                    width: 76px;
                                    height: 76px;
                                    -webkit-border-radius: 50%;
                                    -moz-border-radius: 50%;
                                    border-radius: 50%;
                                }
                                p {
                                    width: 120px;
                                    overflow: hidden;
                                    -ms-text-overflow: ellipsis;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                            .couponTopFl2 {
                                margin-left: 20px;
                                p {
                                    color: #333;
                                    font-size: 26px;
                                    b {
                                        font-size: 34px;
                                    }
                                }
                                span {
                                    display: block;
                                    color: #ccc;
                                }
                                .price {
                                    color: #105cf6;
                                }
                            }
                        }
                        .couponTopFr {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: flex-end;
                            justify-content: center;
                            padding-right: 40px;

                        }
                    }
                    .couponBottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background-color: #FBFBFB;
                        padding: 10px 20px;
                        span {
                            color: #ccc;
                        }
                    }
                }

            }
        }
        > p {
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
