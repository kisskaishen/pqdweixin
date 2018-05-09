<template>
    <div class="menuList">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="0">首页</mt-tab-item>
            <mt-tab-item v-for="item,index in swiperData" :id="item.id" :key="item.id">{{item.name}}</mt-tab-item>
        </mt-navbar>

        <div class="container">
            <!--首页模块-->
            <index-list v-if="selected=='0'"></index-list>
            <!--首页切换模块-->
            <index-squared v-else :currentId="selected"></index-squared>

            <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
        </div>
    </div>
</template>
<script>
    import IndexList from './index/indexList'
    import IndexSquared from './index/indexSquared'

    export default {
        data() {
            return {
                selected: '0',
                currentId: '',
                swiperData: [],          // swiper轮换
                listData: [],             // 列表信息

                swiperOptionNavbar: {//导航栏
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,//滑动误触
                    onClick: this.navBarTap,
                },
                swiperIndex: 0,
                page:1,
                scrollTop:0,            // 距离顶部的距离
                iconTopShow:false,
            }
        },
        components: {IndexList, IndexSquared},
        computed: {},
        mounted() {
            // 获取页头swiper
            this.getSwiper();
            this.getChild()
            // 检测页面滚动
            window.addEventListener('scroll',this.handScroll)
        },
        methods: {
            // 获取导航
            getSwiper() {
                this.$post('index/getNavList', {})
                    .then((res) => {
                        this.swiperData = res
                    })
            },

            getChild() {
                this.$post('common/getCategory', {})
                    .then((res) => {
                        if (res) {
                            this.$local.set('indexData',res)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },

            // 监听滚动方法
            handScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 156) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            }


        }
        ,
        watch: {
            selected(newVal,oldVal) {
                this.toTopClick()
            }
        }
    }
</script>
<style lang="scss">
    .menuList {
        .mint-navbar {
            max-width: 1044px;
            min-width: 640px;
            width: 100%;
            margin: 0 auto;
            overflow: scroll;
            .mint-tab-item {
                background-color: #fff;
                margin-bottom: -1px;
                .mint-tab-item-label {
                    width: 140px;
                    padding: 4px 10px;
                    color: #333;
                }
            }
            .is-selected {
                border-bottom: 1px solid #f13d3c;
                .mint-tab-item-label {
                    color: #f13d3c;
                    font-weight: bold;
                }
            }
        }
        .container {
            margin-top: 68px;
        }
    }

</style>
<style lang="scss" scoped>
    #navBar {
        /*position: fixed;*/
        /*top: 100px;*/
        margin-top: 100px;
        /*max-width: 1044px;*/
        /*min-width: 640px;*/
        width: 750px;
        /*z-index: 9;*/
        overflow: scroll;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-content: center;

        .navList {
            width: 140px !important;
            padding: 4px 10px;
            text-align: center;
        }
        .active {
            border-bottom: 1px solid #f13d3c;
            color: #f13d3c;
            font-weight: bold;
        }
    }
    .toTop {
        position: fixed;
        bottom: 100px;
        right: 40px;
        width: 60px;
        height: 60px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            display: block;
            color: #fff;
            width: 20px;
            height: 20px;
            margin-top: 6px;
            border-right: 4px solid #fff;
            border-top: 4px solid #fff;
            transform: rotate(-45deg);
        }
    }
</style>
