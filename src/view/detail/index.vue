<template>
    <div class="detail">
        <div class="fixedApp">前往App</div>
        <div class="groupImg">
            <detail-banner :banner="goodsInfo.banner"></detail-banner>
        </div>
        <!-- 商品基本信息 -->
        <goods-info :info="goodsInfo" :info2="goodsInfo2"></goods-info>
        <!-- 该商品已经拼团情况 -->
        <group-info :group="groupInfo"></group-info>
        <!-- 评价模块 -->
        <!--<detail-review></detail-review>-->
        <!-- 该商品所在商家信息 -->
        <goods-store :storeInfo="goodsInfo"></goods-store>
        <!-- 商品其他详情信息 -->
        <goods-detail :moreInfo="goodsInfo.img_arr"></goods-detail>
        <div class="fixedBottom">
            <operate-bottom @buyClick="buyType" :bottomInfo="goodsInfo"></operate-bottom>
        </div>

        <goods-spec :specInfo="goodsInfo" :isShowSpec="showSpec" @reviseSpec="specHide" :buyTypeNum="buyTypeNumVal"></goods-spec>
    </div>
</template>

<script>
    import DetailBanner from '../../components/goods/detailBanner'
    import GoodsInfo from '../../components/goods/goodsInfo'
    import GroupInfo from '../../components/goods/groupInfo'
    import DetailReview from '../../components/goods/detailReview'
    import GoodsStore from '../../components/goods/goodsStore'
    import GoodsDetail from '../../components/goods/goodsDetail'

    import OperateBottom from '../../components/operateBottom'
    import GoodsSpec from '../../components/goods/GoodsSpec'

    export default {
        data() {
            return {
                scrollTop: '',
                showSpec: false,
                goodsInfo: {store: {},filter_spec:[],spec_goods_price:[]},
                goodsInfo2: '',
                groupInfo: '',
                storeInfo: '',

                ind0:'',
                ind1:'',
                number:1,
                isDisabled:true,
                buyTypeNumVal:'',

            }
        },
        components: {
            DetailBanner,
            GoodsInfo,
            GroupInfo,
            DetailReview,
            GoodsStore,
            GoodsDetail,
            OperateBottom,
            GoodsSpec,
        },
        mounted() {
            window.addEventListener('scrollTop', this.scroll())
            this.getGoodsInfo()
            this.getGoodsInfo2()
            this.getGroup()
        },
        methods: {
            scroll() {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                console.log('scrolltop：'+this.scrollTop)
            },

            // 父传子，控制spec的隐藏显示
            buyType(val) {
                this.buyTypeNumVal = val
                this.showSpec = true
            },
            specHide(val) {
                this.showSpec = val
            },
            // 获取商品详情
            getGoodsInfo() {
                this.$post('Goods/getDetaile', {
                    goods_id: this.$route.query.goods_id
                })
                    .then((res) => {
                        if (res.status == '1') {
                            this.goodsInfo = res.result
                        } else {
                            console.log('没有数据')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            // 获取商品详情2 // what，同一个页面为什么要两个接口？闲的？这个接口是为了获取销量
            getGoodsInfo2() {
                this.$post('goods/getDetaile_expand', {
                    goods_id: this.$route.query.goods_id
                })
                    .then((res) => {
                        if (res.status == '1') {
                            this.goodsInfo2 = res.result
                        } else {
                            console.log('没有数据')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            // 获取拼团详信息
            getGroup() {
                this.$post('goods/getAvailableGroup', {
                    goods_id: this.$route.query.goods_id
                })
                    .then((res) => {
                        if (res.status == '1') {
                            this.groupInfo = res.result
                        } else {
                            console.log('没有数据')
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .detail {
        margin-bottom: 120px;
    }

    .fixedApp {
        position: fixed;
        top: 40px;
        right: 0;
        padding: 10px 30px;
        border-radius: 8px;
        background-color: #ff7500;
        color: #fff;
    }


</style>

