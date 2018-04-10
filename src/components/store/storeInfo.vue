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
    </div>
</template>

<script>
    export default {
        name: "storeInfo",
        props:['store'],
        data() {
            return {}
        },
        computed:{
            storeData() {
                return this.store
            }
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    .storeInfo {
        width: 100%;
        height: 100px;
        background-color: #fff;
        > div {
            padding: 0 20px;
        }
        .storeTop {
            display: flex;
            justify-content: space-between;
            .storeTopFl {
                display: flex;
                justify-content: flex-start;
                img {
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

</style>
