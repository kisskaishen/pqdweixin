<template>
    <div class="swiper">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="0">首页</mt-tab-item>
            <mt-tab-item v-for="item,index in swiperData" :id="item.id" :key="item.id">{{item.name}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="0">
                <index-list></index-list>
            </mt-tab-container-item>
            <mt-tab-container-item :id="item.id" v-for="item,index in swiperData" :key="index">
                <index-squared :menu="listMenu" :list="listData"></index-squared>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    import IndexList from './index/indexList'
    import IndexSquared from './index/indexSquared'

    export default {
        data() {
            return {
                selected: '0',
                currentId:'',
                swiperData: [],          // swiper轮换
                listData: [],             // 列表信息
                listMenu:{},
            }
        },
        components: {IndexList, IndexSquared},
        computed: {},
        mounted() {
            // 获取页头swiper
            this.getSwiper();
        },
        methods: {
            getSwiper() {
                this.$post('index/getexplore',{})
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

            getMore(id) {
                this.$post('goods/getMore', {
                    id: id,
                })
                    .then((res) => {
                        if (res.status == '1') {
                            this.listData = res.result.items
                            for(let i=0;i<this.swiperData.length;i++) {
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
            }

        }
        ,
        watch: {
            selected(e) {
                if (e != '0') {
                    this.getMore(e)
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
        .mint-tab-container {
            margin-top: 68px;
        }
    }

</style>
<style lang="scss" scoped>


</style>
