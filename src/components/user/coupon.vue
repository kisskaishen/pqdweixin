<template>
    <div class="coupon">
        <ul>
            <li v-for="item,index in couponList">
                <div class="couponTop">
                    <div class="couponTopFl">
                        <div class="couponTopFl1">
                            <p>￥<b>{{item.money}}</b></p>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="couponTopFl2">
                            <p>{{item.name}}</p>
                            <span>-{{item.use_end_time}}</span>
                            <span>-可叠加</span>
                        </div>
                    </div>
                    <div class="couponTopFr">
                        <router-link :to="'/store/index?store_id='+item.store_id">立即使用</router-link>
                        <!--<p>剩余：{{item.use_end_time}}天</p>-->
                    </div>
                </div>
                <div class="couponBottom">
                    <span>{{userName}}</span>
                    <span>限{{item.store_name||'平台'}}可用</span>
                </div>
            </li>
        </ul>
        <p>------别拉了，我是有底线的------</p>
    </div>
</template>

<script>
    import {formatDate} from "../../config/date";

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
        mounted() {
            console.log('now:' + new Date().getTime())
        },
        filters: {
            formatDate(time) {
                var date = new Date(time * 1000)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            },
            formatDay(time) {
                var countDate = new Date(time * 1000) - new Date().getTime()
                return parseInt(countDate / 86400000)
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
                            p {
                                color: #f61027;
                                font-size: 24px;
                                b {
                                    font-size: 40px;
                                }
                            }
                        }
                        .couponTopFl2 {
                            margin-left: 20px;
                            p {
                                font-size: 28px;
                                font-weight: bold;
                            }
                            span {
                                display: block;
                                color: #ccc;
                            }
                        }
                    }
                    .couponTopFr {
                        padding-right: 40px;
                        a {
                            display: block;
                            width: 120px;
                            padding: 4px 10px;
                            -webkit-border-radius: 42px;
                            -moz-border-radius: 42px;
                            border-radius: 42px;
                            margin-bottom: 10px;
                            color: #fff;
                            background-color: red;
                        }
                        p {
                            color: #f61027;
                        }
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
        > p {
            text-align: center;
            margin-top: 20px;
        }
    }
</style>
