<template>
    <div class="order"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="20">
        <div class="swiperDiv">
            <swiper :options="swiperOptionTap" ref="mySwiperTap">
                <swiper-slide v-for="item,index in swiperData" :key="item.id" :class="index==activeIndex?'active':''">
                    {{item.name}}
                </swiper-slide>
            </swiper>
        </div>
        <div class="list">
            <swiper :options="swiperOptionCon" ref="mySwiperCon">
                <swiper-slide>
                    <ul>
                        <li v-for="item,index in list">
                            <router-link :to="'/order/detail?order_sn='+item.order_sn">
                                <div class="store">
                                    <div>
                                        <img :src="item.store_logo" alt="">
                                        <span>{{item.store_name}}</span>
                                    </div>
                                    <div>
                                        <span class="red">{{item.status_info}}</span>
                                    </div>
                                </div>
                                <div class="goods">
                                    <div class="divFl">
                                        <img :src="item.list_img" alt="商品图片">
                                        <div>
                                            <span>{{item.goods_name}}</span>
                                            <span>{{item.spec_key_name}}</span>
                                        </div>
                                    </div>

                                    <div class="divFr">
                                        <span class="red">￥{{item.order_amount}}</span>
                                        <span>￥{{item.market_price}}</span>
                                        <span>x{{item.goods_num}}</span>
                                    </div>
                                </div>
                                <div class="money">
                                    实付：<span class="red">￥{{item.order_amount}}</span>(免运费)
                                </div>
                            </router-link>
                            <div class="operate">
                                <mt-button type="default" plain v-if="item.button.is_cancel_order=='1'"
                                           @click="cancelOrder(item)">取消订单
                                </mt-button>
                                <mt-button type="danger" v-if="item.button.is_remind_goods=='1'"
                                           @click="remindDelivery(item)">提醒发货
                                </mt-button>
                                <mt-button type="danger" plain v-if="item.button.is_extend_goods=='1'"
                                           @click="extend(item)">延长收货
                                </mt-button>
                                <mt-button type="danger" plain v-if="item.button.is_shipping_info=='1'"
                                           @click="goLogistics(item)">物流详情
                                </mt-button>
                                <mt-button type="danger" v-if="item.button.is_confirm_goods=='1'"
                                           @click="sureGet(item)">确认收货
                                </mt-button>
                                <mt-button type="danger" v-if="item.button.is_pay_order=='1'" @click="goPay(item)">去支付
                                </mt-button>
                            </div>
                        </li>
                    </ul>
                </swiper-slide>
            </swiper>
            <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';

    export default {
        name: "order",
        data() {
            return {
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick
                },
                swiperOptionCon: {},
                swiperData: [
                    {
                        id: '0',
                        name: '全部'
                    },
                    {
                        id: '1',
                        name: '待发货'
                    },
                    {
                        id: '2',
                        name: '待收货'
                    },
                    {
                        id: '3',
                        name: '待付款'
                    },
                    {
                        id: '4',
                        name: '已完成'
                    },
                    {
                        id: '5',
                        name: '售后'
                    }
                ],
                activeIndex: this.$route.query.type || 0,
                loading: false,
                list: [{button: {}}],
                page: 0,
                iconTopShow: false,
            }
        },

        mounted() {
            window.addEventListener('scroll', this.handScroll)

        },
        methods: {
            // 点击swiper
            activeClick(val) {
                this.activeIndex = val.clickedIndex
                this.swiperCenter(val)
                this.getOrderList(this.activeIndex, 1)
            },
            // 居中显示
            swiperCenter(swiper) {
                const swiperWidth = swiper.container[0].clientWidth     // 屏幕宽度
                const maxTranslate = swiper.maxTranslate()      // 可滑动的总宽度（最左边和最右边的总宽）
                const maxWidth = -maxTranslate + swiperWidth / 2


                let slide = swiper.slides[swiper.clickedIndex]
                let slideLeft = slide.offsetLeft
                let slideWidth = slide.clientWidth
                let slideCenter = slideLeft + slideWidth / 2

                swiper.setWrapperTransition(300)
                if (slideCenter < slideWidth / 2) {
                    swiper.setWrapperTranslate(0)
                } else if (slideCenter > maxWidth) {
                    swiper.setWrapperTranslate(maxTranslate)
                } else {
                    let nowTranslate = slideCenter - swiperWidth / 2
                    swiper.setWrapperTranslate(-nowTranslate)
                }
            },
            // 获取订单列表
            getOrderList(type, page) {
                this.$post('user/getOrderList', {
                    token: this.$token,
                    type: type,
                    page: page
                })
                    .then(res => {
                        if (res.total == '0') {
                            this.list = []
                            Toast({
                                message: '没有更多数据！',
                                duration: 1400
                            })
                        } else {
                            if (page == '1') {
                                this.list = res.list
                            } else if (page > 1) {
                                if (res.page_total < page) {
                                    Toast({
                                        message: '别拉了，我是有底线的！',
                                        duration: 1400
                                    })
                                } else {
                                    this.list = this.list.concat(res.list)
                                }
                            }
                        }
                    })
            },
            // 回到顶部
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },
            // 取消订单
            cancelOrder(val) {
                this.$post('user/cancelOrder', {
                    order_sn: val.order_sn,
                    token: this.$token
                })
                    .then(res => {
                        console.log(res)
                    })
            },
            // 延长收货
            extend(val) {
                console.log(val)
                MessageBox.confirm('是否延长收货时间？每笔订单只能延长一次哦~', '提示').then(res => {
                    this.$post('user/extendCollectGoods', {
                        order_sn: val.order_sn,
                        token: this.$token
                    })
                        .then(res => {
                            Toast({
                                message: '已延长收货',
                                duration: 1400
                            })
                        })
                })


            },
            // 提醒发货
            remindDelivery(val) {
                console.log('提醒发货')
            },
            // 物流详情->跳转到物流详情页面
            goLogistics(val) {
                this.$router.push({
                    path: '/order/logistics',
                    query: {
                        order_sn: val.order_sn
                    }
                })
            },
            // 去支付->跳转到详情页
            goPay(val) {
                this.$router.push({
                    path: '/order/detail',
                    query: {
                        order_sn: val.order_sn
                    }
                })
            },
            // 确认收货
            sureGet(val) {
                MessageBox.confirm('提交后该订单状态不可更改，要确认收货么？', '提示').then(res => {
                    this.$post('user/confirmGoods', {
                        order_sn: val.order_sn,
                        token: this.$token
                    })
                        .then(res => {
                            Toast({
                                message: '已确认收货',
                                duration: 1400
                            })
                        })
                })
            },

            // 监听滚动方法
            handScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 156) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            },
            // 加载更多
            loadMore() {
                this.loading = true
                this.page++;
                this.getOrderList(this.activeIndex, this.page)
                this.loading = false
            }
        }
    }
</script>

<style lang="scss">
    .swiperDiv {
        .swiper-wrapper {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
<style scoped lang="scss">
    .swiperDiv {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 750px;
        background-color: #fff;
        z-index: 9;
        .swiper-container {
            width: 100%;
            overflow: hidden;
            .swiper-slide {
                width: auto !important;
                padding: 16px 24px;
                text-align: center;
            }
            .active {
                color: red;
                border-bottom: 2px solid red;
            }
        }
    }

    .list {
        position: relative;
        width: 100%;
        margin-top: 66px;
        .swiper-container {
            .swiper-slide {
                ul {
                    li {
                        margin-top: 20px;
                        background-color: #fff;
                        a {
                            display: block;
                            padding: 0 20px;
                            .store {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 12px 0;
                                border-bottom: 1px solid #f3f3f3;
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
                            .goods {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 12px 0;
                                background-color: #fafafa;
                                .divFl {
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    img {
                                        width: 120px;
                                        height: 120px;
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
                            .money {
                                padding: 16px 0;
                                text-align: right;
                                border-bottom: 1px solid #ccc;
                                .red {
                                    font-size: 26px;
                                    margin: 0 10px;
                                }
                            }
                        }
                        .operate {
                            display: flex;
                            justify-content: flex-end;
                            padding: 16px 20px;
                            .mint-button {
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }

    }

</style>
