<template>
    <div class="list">
        <div  v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="100">
            <router-link :to="'/detail/index?goods_id='+item.goods_id" class="goods" v-for="item,index in goodsList" :key="item.goods_id">
                <div class="goodsImg">
                    <img :src="item.original" :alt="item.goods_name">
                    <span class="markNum">{{index+1}}</span>
                </div>
                <div class="goodsInfo">
                    <p class="goodsName">
                        【正品限时亏本抢购】短筒中筒袜子男女袜子男士袜子纯棉中筒袜冬季男袜子全棉袜子男棉袜防臭四季袜
                    </p>
                    <p class="goodsProm">
                        <span>2人团</span>
                        <span>￥18.90</span>
                    </p>
                    <p class="goodsSingle">
                        <span>单买价格：29.00</span>
                        <router-link to="/detail/index"></router-link>
                    </p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                goods: {},
                goodsList:[],
                loading: false,
                page:0
            }
        },
        mounted() {
        },
        methods: {
            getList(page) {
                this.$post('index/getRankingList', {
                    page: page
                })
                    .then(res => {
                        if (page == '1') {
                            this.goods = res.result
                            this.goodsList = res.result.items
                        } else {
                            this.goodsList = this.goodsList.concat(res.result.items)
                        }
                        this.loading = false

                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            loadMore() {
                this.loading = true
                this.page++
                this.getList(this.page)

            }
        }
    }
</script>

<style scoped lang="scss">
    .list {
        width: 100%;
        .goods {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background-color: #fff;
            padding: 10px 36px;
            margin-bottom: 10px;
            color: #333;
            text-align: left;
            &:nth-child(1) {
                .goodsImg {
                    .markNum {
                        background: url("../../images/img_fillet_09@2x.png") no-repeat center /100%;
                    }
                }
            }
            &:nth-child(2) {
                .goodsImg {
                    .markNum {
                        background: url("../../images/img_ranking_02@2x.png") no-repeat center /100%;
                    }
                }
            }
            &:nth-child(3) {
                .goodsImg {
                    .markNum {
                        background: url("../../images/img_ranking_03@2x.png") no-repeat center /100%;
                    }
                }
            }
            .goodsImg {
                position: relative;
                margin-right: 20px;
                img {
                    display: block;
                    width: 210px;
                    height: 210px;
                }
                .markNum {
                    position: absolute;
                    top: 0;
                    left: 0;
                    min-width: 40px;
                    height: 48px;
                    text-align: center;
                    line-height: 48px;
                    color: #fff;
                    background: url("../../images/img_ranking_04@2x.png") no-repeat center /100%;
                }
            }
            .goodsInfo {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                align-content: center;
                p {
                    width: 446px;
                    font-size: 26px;
                }
                .goodsName {
                    height: 76px;
                    font-size: 27px;
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                .goodsProm {
                    span {
                        margin-right: 10px;
                        &:nth-child(2) {
                            color: red;
                        }
                    }

                }
                .goodsSingle {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    span {
                        color: #999;
                    }
                    a {
                        display: block;
                        width: 120px;
                        height: 48px;
                        background: url("../../images/icon_open_group@2x.png") no-repeat center /100%;
                    }
                }
            }
        }
    }
</style>
