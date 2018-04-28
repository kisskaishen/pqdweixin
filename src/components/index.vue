<template>
    <div class="swiper">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="0">首页</mt-tab-item>
            <mt-tab-item v-for="item,index in swiperData" :id="item.id" :key="item.id">{{item.name}}</mt-tab-item>
        </mt-navbar>
        <swiper :options="swiperOptionNavbar" ref="swiperNavbar" id="navBar">
            <swiper-slide class="navList" :class="swiperIndex==0?'active':''">首页</swiper-slide>
            <swiper-slide class="navList" :class="swiperIndex==index+1?'active':''" v-for="(item,index) in swiperData"
                          :key="item.id">{{item.name}}
            </swiper-slide>
        </swiper>
        <div class="container">
            <!--<mt-tab-container v-model="selected">-->
            <!--<mt-tab-container-item id="0">-->
            <index-list v-if="selected=='0'"></index-list>
            <!--</mt-tab-container-item>-->
            <!--<mt-tab-container-item v-for="item,index in swiperData" :id="item.id" :key="item.id">-->
            <index-squared v-for="item,index in swiperData" v-if="selected == item.id" :key="item.id" :menu="listMenu"
                           :list="listData" :currentId="selected" @moreData="getMoreData"></index-squared>
            <!--</mt-tab-container-item>-->
            <!--</mt-tab-container>-->
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
                listMenu: {},
                swiperOptionNavbar: {//导航栏
                    freeMode: true,
                    freeModeMomentumRatio: 0.5,
                    slidesPerView: 'auto',
                    preventClicks: true,//滑动误触
                    onClick: this.navBarTap,
                },
                swiperIndex: '0'
            }
        },
        components: {IndexList, IndexSquared},
        computed: {},
        mounted() {
            // 获取页头swiper
            this.getSwiper();
        },
        methods: {
            navBarCenter: function (swiper) {
                console.log(swiper)
                console.log(swiper.clickedIndex)
                console.log(swiper.maxTranslate())

                const swiperWidth = swiper.container[0].clientWidth
                const maxTranslate = swiper.maxTranslate();
                const maxWidth = -maxTranslate + swiperWidth / 2
                let slide = swiper.slides[swiper.clickedIndex]
                let slideLeft = slide.offsetLeft
                let slideWidth = slide.clientWidth
                let slideCenter = slideLeft + slideWidth / 2
                // 被点击slide的中心点
                swiper.setWrapperTransition(300)

                if (slideCenter < swiperWidth / 2) {

                    swiper.setWrapperTranslate(0)

                } else if (slideCenter > maxWidth) {

                    swiper.setWrapperTranslate(maxTranslate)

                } else {

                    let nowTlanslate = slideCenter - swiperWidth / 2

                    swiper.setWrapperTranslate(-nowTlanslate)

                }
            },
            navBarTap: function () {
                const swiperNavbar = this.$refs.swiperNavbar.swiper; //导航栏
                this.navBarCenter(swiperNavbar);//导航栏居中
                this.swiperIndex = swiperNavbar.clickedIndex;//改变当前选中状态
            },
            getSwiper() {
                this.$post('index/getexplore', {})
                    .then((res) => {
                        if (res.status == '1') {
                            this.swiperData = res.result.cat
                        } else {
                            console.log('出错了')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            getMore(id, page) {
                this.$post('goods/getMore', {
                    id: id,
                    page: page
                })
                    .then((res) => {
                        if (res.status == '1') {
                            if (page == 1) {
                                this.listData = res.result.items
                            } else {
                                this.listData = this.listData.concat(res.result.items)
                            }
                            console.log(res.result.items)
                            for (let i = 0; i < this.swiperData.length; i++) {
                                if (this.swiperData[i].id == id) {
                                    this.listMenu = this.swiperData[i]
                                }
                            }
                        } else {
                            console.log('出错了')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            getMoreData(val) {
                this.getMore(this.selected, val)
            }


        }
        ,
        watch: {
            selected(e) {
                if (e != '0') {
                    this.getMore(e, 0)
                    console.log(window)
                    console.log(window.screenTop)
                } else {
                    return
                }
            }
        }
    }
</script>
<style lang="scss">
    .swiper {
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
        position: fixed;
        top: 100px;
        max-width: 1044px;
        min-width: 640px;
        width: 100%;
        z-index: 9;
        overflow: scroll;
        background-color: #fff;
        .navList {
            width: 140px !important;
            padding: 4px 10px;
        }
        .active {
            border-bottom: 1px solid #f13d3c;
            color: #f13d3c;
            font-weight: bold;
        }
    }

</style>
