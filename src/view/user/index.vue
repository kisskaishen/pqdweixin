<template>
    <div class="user">
        <div class="container">
            <div class="top">
                <div class="topInfo">
                    <img src="../../images/ts_p1.jpg" alt="">
                    <p>请登录/注册</p>
                </div>
                <div class="topMenu horiMenu">
                    <ul>
                        <li v-for="item in topList">
                            <router-link :to="item.url">
                                <i></i>
                                <span>{{item.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="center">
                <div class="centerTop">
                    <router-link to="order">全部订单</router-link>
                </div>
                <div class="centerMenu horiMenu">
                    <ul>
                        <li v-for="item,index in centerList">
                            <router-link :to="'order.id='+item.id">
                                <mt-badge type="error" v-if="index == '0' && numObj.in_prom!='0'">{{numObj.in_prom}}</mt-badge>
                                <mt-badge type="error" v-if="index == '1' && numObj.daifahuo!='0'">{{numObj.daifahuo}}</mt-badge>
                                <mt-badge type="error" v-if="index == '2' && numObj.daishouhuo!='0'">{{numObj.daishouhuo}}</mt-badge>
                                <mt-badge type="error" v-if="index == '3' && numObj.daifukuan!='0'">{{numObj.daifukuan}}</mt-badge>
                                <mt-badge type="error" v-if="index == '4' && numObj.refund!='0'">{{numObj.refund}}</mt-badge>
                                <i></i>
                                <span>{{item.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <div class="bottomMenu">
                    <ul>
                        <li v-for="item,index in bottomList">
                            <router-link :to="item.url">
                                <i></i>
                                <span>{{item.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <p>退出登录</p>
            </div>
        </div>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import Tabbar from '../../components/footer'

    export default {
        name: "index",
        data() {
            return {
                list: [],
                loading: false,
                topList:[
                    {
                        url:'myMsg',
                        name:'我的消息'
                    },
                    {
                        url:'myCoupon',
                        name:'我的优惠券'
                    },
                    {
                        url:'myFree',
                        name:'我的免单'
                    },
                    {
                        url:'myProm',
                        name:'我的拼团'
                    }
                ],
                centerList:[
                    {
                        id:'1',
                        name:'拼团中'
                    },
                    {
                        id:'2',
                        name:'待发货'
                    },
                    {
                        id:'3',
                        name:'待收货'
                    },
                    {
                        id:'4',
                        name:'代付款'
                    },
                    {
                        id:'5',
                        name:'退款/售后'
                    }
                ],
                bottomList:[
                    {
                        url:'myLike',
                        name:'为我助力'
                    },
                    {
                        url:'myCollection',
                        name:'我的收藏'
                    },
                    {
                        url:'myAddress',
                        name:'收货地址'
                    },
                    {
                        url:'help',
                        name:'常见问题'
                    }
                ],
                numObj:{userdetails:{}}
            }
        },
        components: {Tabbar},
        mounted() {
            this.getNum()
        },
        methods: {
            // 获取小红点数字
            getNum() {
                this.$post('user/getRefresh',{
                    user_id: this.$getCookie('user_id')
                })
                    .then(res=>{
                        this.numObj = res.result.userdetails
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        .top {
            position: relative;
            height: 480px;
            background: url("../../images/img_background_02.jpg") no-repeat center /100% 100%;
            .topInfo {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                align-content: center;
                padding-top: 80px;
                img {
                    display: block;
                    width: 140px;
                    height: 140px;
                    border: 4px solid #fff;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                }
                p {
                    color: #fff;
                    margin-top: 20px;
                    font-size: 30px;
                }
            }
            .topMenu {
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, .1);
                ul {
                    li {

                        border-right: 1px solid #e95f75;
                        a {
                            span {
                                color: #fff;
                            }
                        }
                        &:nth-child(1) {
                            i {
                                background: url("../../images/icon_my_news@2x.png") no-repeat center /100%;

                            }
                        }
                        &:nth-child(2) {
                            i {
                                background: url("../../images/icon_coupon@2x.png") no-repeat center /100%;

                            }
                        }
                        &:nth-child(3) {
                            i {
                                background: url("../../images/icon_luck_draw@2x.png") no-repeat center /100%;

                            }
                        }
                        &:nth-child(4) {
                            border: none;
                            i {
                                background: url("../../images/icon_my_collage@2x.png") no-repeat center /100%;

                            }
                        }
                    }
                }
            }
        }
        .center {
            background-color: #fff;
            .centerTop {
                position: relative;
                border-bottom: 1px solid #eee;
                a {
                    position: relative;
                    display: block;
                    padding: 20px;
                    text-align: left;
                    color: #333;
                    &:after {
                        position: absolute;
                        content: '';
                        right: 20px;
                        bottom: 0;
                        width: 20px;
                        height: 20px;
                        top: 50%;
                        margin-top: -10px;
                        border-top:1px solid #ccc;
                        border-right:1px solid #ccc;
                        transform: rotate(45deg);
                    }

                }
            }
            .centerMenu {
                ul {
                    li {
                        a {
                            position: relative;

                            i {
                                width: 48px;
                                height: 40px;
                            }
                            .mint-badge {
                                position: absolute;
                                top: -20px;
                                right: 20px;
                                width: 36px;
                                height: 36px;
                                text-align: center;
                                font-size: 20px;
                                padding: 0;
                                margin: 0;
                                line-height: 36px;
                                -webkit-border-radius: 50%;
                                -moz-border-radius: 50%;
                                border-radius: 50%;
                            }
                        }
                        &:nth-child(1) {
                            i {
                                background: url("../../images/icon_fight_groups@2x.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(2) {
                            i {
                                background: url("../../images/icon_tobe_shipped@2x.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(3) {
                            i {
                                background: url("../../images/icon_goods_receipt@2x.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(4) {
                            i {
                                width: 40px;
                                background: url("../../images/icon_pay2x.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(5) {
                            i {
                                width: 40px;

                                background: url("../../images/icon_customer2_service@2x.png") no-repeat center bottom /100% 100%;

                            }
                        }
                    }
                }
            }
        }
        .bottom {
            margin-top: 20px;
            .bottomMenu {
                background-color: #fff;
                ul {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    li {
                        width: 100%;
                        a {
                            position: relative;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            padding: 30px;
                            width: 100%;
                            font-size: 28px;
                            color: #666;
                            i {
                                width: 34px;
                                height: 34px;
                                margin-right: 20px;
                            }
                            &:after {
                                position: absolute;
                                content: '';
                                right: 30px;
                                bottom: 0;
                                width: 20px;
                                height: 20px;
                                top: 50%;
                                margin-top: -10px;
                                border-top:1px solid #ccc;
                                border-right:1px solid #ccc;
                                transform: rotate(45deg);
                            }
                        }
                        &:nth-child(1) {
                            i {
                                background: url("../../images/refApply_tuan@2x.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(2) {
                            i {
                                background: url("../../images/icon_collection@2x.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(3) {
                            i {
                                background: url("../../images/icon_address@2x.png") no-repeat center bottom /100% 100%;

                            }
                        }
                        &:nth-child(4) {
                            i {
                                background: url("../../images/icon_problem@2x.png") no-repeat center bottom /100% 100%;

                            }
                        }

                    }
                }
            }
            &>p {
                margin-top: 60px;
                color: #888;
                text-align: center;
            }
        }
        .horiMenu {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            ul {
                width: 100%;
                display: flex;
                li {
                    flex: 1;
                    margin: 30px 0;
                    a {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        color: #666;
                        font-size: 24px;
                        i {
                            width: 54px;
                            height: 54px;
                        }
                        span {
                            font-size: 26px;
                            margin-top: 10px;
                        }
                    }

                }
            }
        }
    }
</style>
