<template>
    <div>
        <div class="like" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="100">
            <div class="banner">
                <img src="" alt="">
            </div>
            <div class="swiperHorization">
                <swiper :options="swiperOptionTap" ref="mySwiperTap">
                    <swiper-slide v-for="item,index in messageList" :key="item.name">
                        <span>恭喜：{{item.name}}成功获得了</span>
                        <span class="red">{{item.goodsName}}</span>
                    </swiper-slide>
                </swiper>

            </div>
            <div class="myFree">
                <b>我的免单</b>
                <router-link to="">点击查看></router-link>
            </div>
            <div class="list">
                <div class="goods" v-for="item,index in 3">
                    <div class="divFl">
                        <img src="" alt="">
                    </div>
                    <div class="divFr">
                        <p class="goodsName">商品名称商品名称商品名称商品名称商品名称商品名称称商品名称商品名称商品名称</p>
                        <p>需<span class="red">15</span>人助力</p>
                        <p class="operate">
                        <span>
                            <b class="red">￥0.00</b>
                            <span>￥62.00</span>
                        </span>
                            <mt-button type="danger" @click="showSpecDiv">马上抢></mt-button>
                            <!--<mt-button type="danger">继续分享></mt-button>-->
                            <!--<mt-button type="default" disabled>已售罄></mt-button>-->
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--规格弹框-->
        <div class="specDiv dialogDiv" v-if="specShow">
            <div class="bg" @click="closeSpecDiv"></div>
            <div class="spec">
                <div class="goodsInfo">
                    <div class="divFl">
                        <img src="" alt="">
                        <div class="info">
                            <span>商品名称</span>
                            <span class="red">商品价格</span>
                        </div>
                    </div>
                    <div class="divFr">
                        <img src="../../images/icon-close.png" alt="" @click="closeSpecDiv">
                    </div>
                </div>
                <div class="goodsSpec">
                    <div class="infoSpec" v-for="item,index in 2">
                        <p>规格标题</p>
                        <ul>
                            <li v-for="item,index in 6">规格内容</li>
                        </ul>
                    </div>
                </div>
                <div class="submitBtn">
                    <mt-button type="danger" size="large" @click="showAddress">免费抢</mt-button>
                </div>
            </div>
        </div>
        <!--地址弹框-->
        <div class="addressDiv dialogDiv" v-if="addressShow">
            <div class="bg" @click="closeAddressDiv"></div>
            <div class="address">
                <ul>
                    <li>
                        <b>选择收货地址</b>
                        <img src="../../images/icon-close-noCircle.png" alt="" @click="closeAddressDiv">
                    </li>
                    <li>
                        <p>添加收货地址</p>
                        <img src="../../images/icon-right.png" alt="">
                    </li>
                    <li v-for="item,index in 3" @click="choooseAddress(item)">
                        <p>广东省深圳市宝安区中粮商务公园三栋1408</p>
                        <img src="../../images/icon-right.png" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
    </div>
</template>

<script>


    export default {
        name: "like",
        data() {
            return {
                swiperOptionTap: {
                    direction: 'vertical',
                    initialSlide: 0,//设定初始化时slide的索引
                    loop: true,  //无限滚动
                    speed: 800,//滑动速度
                    autoplay: 1600,//自动切换的时间间隔
                },
                messageList: [
                    {
                        name: 'kisskaishen',
                        goodsName: '这个产品一堆'
                    },
                    {
                        name: 'qwk',
                        goodsName: '不知道什么鬼'
                    },
                    {
                        name: 'dasdsa',
                        goodsName: '这个产品一堆'
                    },
                    { 
                        name: 'qqqq',
                        goodsName: '不知道什么鬼'
                    }
                ],
                loading: false,
                iconTopShow: false,
                specShow: false,         // 规格弹框
                addressShow: false,
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },

        methods: {

            // 监听滑动事件
            handleScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 156) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            },
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },
            // 加载更多
            loadMore() {
                // this.loading = true
                // console.log(1111)
                // this.loading = false
            },
            // 点击马上抢显示规格弹框
            showSpecDiv() {
                this.specShow = true
            },
            // 点击阴影关闭
            closeSpecDiv() {
                this.specShow = false
            },
            closeAddressDiv() {
                this.addressShow = false
            },
            // 显示地址弹框
            showAddress() {
                this.specShow = false
                this.addressShow = true
            },
            // 选择地址
            choooseAddress(val) {
                this.getPicture(val)
            },
            // 生成图片接口
            getPicture() {
                console.log('生成图片')
            }
        }
    }
</script>

<style scoped lang="scss">
    .like {
        > div {
            width: 100%;
            background-color: #fff;
            padding: 0 20px;
        }
        .banner {
            padding: 0;
            img {
                display: block;
                height: 280px;
                border: 1px solid red;
            }
        }
        .swiperHorization {
            height: 80px;
            line-height: 80px;
            overflow: hidden;
            border-bottom: 1px solid #ccc;
            .swiper-slide {

            }
        }
        .myFree {
            display: flex;
            justify-content: space-between;
            padding: 20px;
            b {
                border-left: 8px solid red;
                padding-left: 10px;
                font-size: 26px;
                color: #333;
            }
            a {
                font-size: 24px;
            }
        }
        .list {
            background-color: transparent;
            padding: 0;
            .goods {
                margin-top: 20px;
                padding: 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                background-color: #fff;
                .divFl {
                    img {
                        display: block;
                        width: 264px;
                        height: 264px;
                        border: 1px solid red;
                    }
                }
                .divFr {
                    flex-direction: column;
                    align-items: flex-start;
                    p {
                        width: 100%;
                        color: #999;
                    }
                    .goodsName {
                        font-size: 30px;
                        margin-bottom: 20px;
                        color: #444;
                    }
                    .operate {
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        > span {
                            b {
                                font-size: 32px;
                            }
                            span {
                                text-decoration: line-through;
                                color: #999;
                            }
                        }
                    }
                }
            }

        }
    }

    .dialogDiv {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: 0;
        z-index: 999;
        .bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, .6);
        }
    }

    .specDiv {
        .spec {
            position: absolute;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            background-color: #fff;
            .goodsInfo {
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 1px solid #ccc;
                .divFl {
                    flex: 1;
                    img {
                        display: block;
                        width: 120px;
                        height: 120px;
                        border: 1px dashed red;
                    }
                    .info {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        align-self: flex-start;
                        span {
                            width: 100%;
                            white-space: normal;
                            &:first-child {
                                font-size: 26px;
                                margin-bottom: 20px;
                            }
                        }
                    }
                }
                .divFr {
                    img {
                        width: 48px;
                        height: 48px;
                    }
                }
            }
            .infoSpec {
                padding: 20px;
                > p {
                    color: #888;
                }
                ul {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    li {
                        padding: 10px 20px;
                        background-color: #f3f3f3;
                        margin-right: 20px;
                        margin-top: 20px;
                    }
                }
            }
        }
    }
    .addressDiv {
        .address {
            position: absolute;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            background-color: #fff;
            ul {
                padding: 0 20px;
                max-height: 800px;
                overflow: scroll;
                li {
                    width: 100%;
                    border-bottom: 1px solid #ccc;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #999;
                    padding: 20px 0;
                    img {
                        width: 30px;
                        height: 30px;
                    }
                    &:nth-child(1) {
                        position: relative;
                        justify-content: center;
                        font-size: 40px;
                        color: #333;
                        img {
                            position: absolute;
                            right: 0px;
                        }
                    }
                    &:nth-child(2) {
                        font-size: 30px;
                        color: #333;
                    }
                }
            }
        }
    }
</style>
