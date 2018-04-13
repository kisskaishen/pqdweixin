<template>
    <div>
        <div class="storeInfo">
            <div class="storeTop">
                <div class="storeTopFl">
                    <img :src="storeData.store_logo" :alt="storeData.store_name">
                    <div>
                        <b>{{storeData.store_name}}</b>
                        <p>销量：{{storeData.sales}}件</p>
                    </div>
                </div>
                <div class="storeTopFr">
                    <mt-button type="danger">联系卖家</mt-button>
                </div>
            </div>
            <div class="storeBottom">
                {{storeData.introduce}}
            </div>
        </div>
        <div class="title">
            <div>全部商品（{{storeData.goods.total}}）</div>
            <div>
                <mt-button type="danger" :plain="!isPlain" @click="plainChange">销量</mt-button>
                <mt-button type="danger" :plain="isPlain" @click="plain2Change">上新</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "storeInfo",
        props: ['store','list'],
        data() {
            return {
                isPlain:false,
            }
        },
        computed: {
            storeData() {
                return this.store
            },
            listData() {
                return this.list
            }
        },
        methods: {
            // 条件筛选
            plainChange() {
                this.isPlain = !this.isPlain
            },
            plain2Change() {
                this.isPlain = !this.isPlain
            }
        }
    }
</script>

<style scoped lang="scss">
    .storeInfo {
        width: 100%;
        background-color: #fff;
        > div {
            padding: 20px;
        }
        .storeTop {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .storeTopFl {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                img {
                    width: 100px;
                    height: 100px;
                    margin-right: 20px;
                }
                div {
                    color: #666;
                    font-size: 24px;
                    b {
                        color: #000;
                        font-size: 28px;
                    }
                }
            }
        }
    }
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 20px !important;
        margin: 20px 0;
        > div {
            color: #333;
        }
        .mint-button {

        }
    }
</style>
