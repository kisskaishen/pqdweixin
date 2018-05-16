<template>
    <div class="myCollection">
        <div class="list" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="100">
            <div class="collect divDiv" v-for="item,index in list">
                <div class="divFl">
                    <img :src="item.original_img" :alt="item.goods_name">
                </div>
                <div class="divFr">
                    <p>
                        <span>{{item.goods_name}}</span>
                        <i class="icon-delete" @click="cancelCollect(item,index)"></i>
                    </p>
                    <p>
                        <span>{{item.prom}}人团</span>
                        <span style="color: #f13d3c;">￥{{item.prom_price}}</span>
                    </p>
                    <p>单买价格：￥{{item.shop_price}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "myCollection",
        data() {
            return {
                list: [],
                loading: false,
            }
        },
        mounted() {

        },
        methods: {
            getList(page) {
                this.$post('user/getGoodsCollectList', {
                    token: this.$token,
                    page: page
                })
                    .then(res => {
                        console.log(res)
                        this.list = res.list
                    })
            },
            // 取消收藏
            cancelCollect(val, index) {
                this.$post('user/cancelGoodsCollect', {
                    token: this.$token,
                    goods_id: val.goods_id
                })
                    .then(res => {
                        Toast({
                            message: '已取消收藏',
                            duration: 1400
                        })
                        this.list.splice(index, 1)
                    })
            },
            // 无限加载
            loadMore() {
                this.loading = true
                let page = 0;
                page++;
                this.getList(page)
                this.loading = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .collect {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
        margin-top: 20px;
        padding: 20px;
        .divFl {
            img {
                display: block;
                width: 160px;
                height: 160px;
                border: 1px solid red;
            }
        }
        .divFr {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            align-content: space-around;
            p {
                width: 100%;
                &:nth-child(1) {
                    display: flex;
                    justify-content: space-between;
                    span {
                        flex: 5;
                        font-size: 28px;
                        color: #000;
                    }
                    .icon-delete {
                        width: 48px;
                        height: 48px;
                        margin: 0 10px;
                        background: url("../../images/delete.png") no-repeat center /100%;
                    }
                }
            }

        }
    }
</style>
