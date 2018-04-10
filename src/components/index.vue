<template>
    <div class="swiper">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="1">首页</mt-tab-item>
            <mt-tab-item v-for="item,index in swiperData" :id="item.id+1" :key="item.id+1">{{item.name}}</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <index-list :menuData="menuData"></index-list>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <index-squared></index-squared>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <index-squared></index-squared>
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
                selected: '1',
                swiperData:[],          // swiper轮换
                menuData:[],            // 菜单列表
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
                this.$post('index/getexplore')
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
            }
        }
    }
</script>
<style lang="scss">
    .swiper {
        .mint-navbar {
            width: 750px;
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
                color: #f13d3c;
                border-bottom: 1px solid #f13d3c;
            }
        }
        .mint-tab-container {
            margin-top: 68px;
        }
    }

</style>
<style lang="scss" scoped>


</style>
