<template>
    <div class="childSwiper">
        <div class="swiperDiv">
            <swiper :options="swiperOptionTap" ref="mySwiperTap" v-if="!this.$route.query.is_special">
                <swiper-slide :class="activeIndex==0?'active':''">首页</swiper-slide>
                <swiper-slide v-for="item,index in swiperData" :key="item.id"
                              :class="index+1==activeIndex?'active':''">
                    {{item.name}}
                </swiper-slide>
            </swiper>
        </div>
        <div :class="this.$route.query.is_special?'':'container'">
            <index-squared :currentId="selected"></index-squared>
        </div>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
    </div>
</template>
<script>
    import IndexSquared from '../index/indexSquared'

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
                activeIndex: 0,             // 第几个
                selected: this.$route.query.id, //导航栏id，第几个的id

                swiperData: [],          // swiper子集轮换
                iconTopShow: false,
                scrollTop: 0,            // 距离顶部的距离
            }
        },
        components: {IndexSquared},
        computed: {},
        mounted() {
            this.getInfo()
            // 检测页面滚动
            window.addEventListener('scroll', this.handScroll)
        },
        methods: {
            // 获取本地保存的其他信息
            getInfo() {
                this.indexData = this.$local.get('indexData')
                for (let i = 0; i < this.indexData.category.length; i++) {
                    if (this.$route.query.parent_id == this.indexData.category[i].id) {
                        for (let j = 0; j < this.indexData.category[i].child.length; j++) {
                            if (this.$route.query.id == this.indexData.category[i].child[j].id) {
                                this.swiperData = this.indexData.category[i].child[j].child
                                this.selected = this.indexData.category[i].child[j].id
                            }
                        }
                    } else if (this.$route.query.id == this.indexData.category[i].id) {
                        this.swiperData = this.indexData.category[i].child
                        this.selected = this.indexData.category[i].id
                    }
                }
            },
            // 点击swiper
            activeClick(val) {

                this.activeIndex = val.clickedIndex
                this.swiperCenter(val)
                this.selected = this.swiperData[this.activeIndex - 1].id            // 获取当前点击的id值

                this.toTopClick()
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
            // 监听滚动方法
            handScroll() {
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
