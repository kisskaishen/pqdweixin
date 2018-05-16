<template>
    <div class="menuList">

        <div class="swiperDiv">
            <swiper :options="swiperOptionTap" ref="mySwiperTap">
                <swiper-slide :class="activeIndex==0?'active':''">首页</swiper-slide>
                <swiper-slide v-for="item,index in swiperData" :key="item.id"
                              :class="index+1==activeIndex?'active':''">
                    {{item.name}}
                </swiper-slide>
            </swiper>
        </div>

        <div class="container">
            <!--首页模块-->
            <index-list v-if="activeIndex=='0'"></index-list>
            <!--首页切换模块-->
            <!--activeIndex-1 的目的是获取子组件数组的第0个-->
            <index-squared v-else :currentId="activeIndex-1"></index-squared>

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
                swiperOptionTap: {
                    notNextTick: true,
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,
                    onClick: this.activeClick
                },
                activeIndex: 0,
                selected: '0',
                currentId: '',
                swiperData: [],          // swiper轮换
                listData: [],             // 列表信息
                page: 1,
                scrollTop: 0,            // 距离顶部的距离
                iconTopShow: false,
            }
        },
        components: {IndexList, IndexSquared},
        computed: {},
        mounted() {
            // 获取页头swiper
            this.getSwiper();
            this.getChild()
            // 检测页面滚动
            window.addEventListener('scroll', this.handScroll)
        },
        methods: {
            // 获取导航
            getSwiper() {
                this.$post('index/getNavList', {})
                    .then((res) => {
                        this.swiperData = res
                    })
            },

            // 点击swiper
            activeClick(val) {
                console.log('点击了第'+val.clickedIndex+'个')
                this.activeIndex = val.clickedIndex
                this.swiperCenter(val)
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


            getChild() {
                this.$post('common/getCategory', {})
                    .then((res) => {
                        if (res) {
                            this.$local.set('indexData', res)
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
            activeIndex() {
                this.toTopClick()
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
<style lang="scss" scoped>
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
                font-weight: bold;
            }
        }
    }
    .container {
        margin-top: 68px;
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
