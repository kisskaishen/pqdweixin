<template>
    <div class="bottom">
        <div class="bottomFl">
            <div>
                <router-link to="/">
                    <i class="iconHome"></i>
                    首页
                </router-link>
            </div>
            <div>
                <i class="iconCollection"></i>
                收藏
            </div>
            <div>
                <i class="iconTalk"></i>
                客服
            </div>
        </div>
        <div class="bottomFr">
            <button class="buyFl" @click="showSpec(2)">
                <p>￥{{goodsInfo.shop_price}}</p>
                <p>单独购买</p>
            </button>
            <button class="buyFr" @click="showSpec(1)">
                <p>￥{{goodsInfo.prom_price}}</p>
                <p>发起拼团</p>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['bottomInfo'],
        data() {
            return {}
        },
        computed: {
            goodsInfo() {
                return this.bottomInfo
            }
        },
        mounted() {

        },
        methods: {
            showSpec(val) {
                this.$emit('buyClick', val)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bottom {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background-color: #fff;
        border-top: 1px solid #ccc;
    }

    .bottomFl {
        display: flex;
        align-items: center;
        div {
            width: 100px;
            text-align: center;
            i {
                display: block;
                width: 40px;
                height: 40px;
                margin: 0 auto;
            }
            .iconHome {
                background: url("../images/icon_home.png") no-repeat center /100%;
            }
            .iconCollection {
                background: url("../images/icon_collection.png") no-repeat center /100%;
            }
            .iconTalk {
                background: url("../images/icon_talk.png") no-repeat center /100%;
            }
        }

    }

    .bottomFr {
        display: flex;
        align-items: center;
        button {
            padding: 20px 0;
            color: #fff;
        }
        .buyFl {
            width: 200px;
            background-color: #f3aba7;
        }
        .buyFr {
            width: 250px;
            background-color: #e02e24;
        }
    }
</style>
