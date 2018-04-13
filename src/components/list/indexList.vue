<template>
    <div class="childSwiper">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item v-for="item,index in swiperCurrentData" :id="item.id" :key="item.id">{{item.name}}
            </mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item :id="item.id" v-for="item,index in swiperCurrentData" :key="index">
                <index-squared :menu="listMenu" :list="listData"></index-squared>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    import IndexSquared from '../index/indexSquared'

    export default {
        data() {
            return {
                selected: '0',
                currentId: this.$route.query.id,
                swiperData: [],          // swiper轮换
                swiperCurrentData: [],          // swiper子集轮换
                listData: [],             // 列表信息
                listMenu: {},
            }
        },
        components: {IndexSquared},
        computed: {},
        mounted() {
            // 获取页头swiper
            this.getSwiper();
            this.getMore(this.currentId)
        },
        methods: {
            getSwiper() {
                this.$post('index/getexplore',{})
                    .then((res) => {
                        if (res.status == '1') {
                            this.swiperData = res.result.cat
                            for (let i = 0; i < this.swiperData.length; i++) {
                                for (let j = 0; j < this.swiperData[i].cat2.length; j++) {
                                    if (this.swiperData[i].cat2[j].id == this.currentId) {
                                        this.swiperCurrentData = this.swiperData[i].cat2[j].cat3
                                    }
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

            getMore(id) {
                this.$post('goods/getMore', {
                    id: id,
                    type: '0',
                    rank: '2'
                })
                    .then((res) => {
                        if (res.status == '1') {
                            this.listData = res.result.items
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
    .childSwiper {
        .mint-navbar {
            width: 750px;
            overflow: scroll;
            .mint-tab-item {
                background-color: #fff;
                margin-bottom: -1px;
                .mint-tab-item-label {
                    width: 140px;
                    padding: 4px 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
