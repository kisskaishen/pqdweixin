<template>
    <div class="banner">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item,index in bannerImg" :key="item.origin">
                <img :src="item.origin" alt="商品图片">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    import {Swipe, SwipeItem} from 'mint-ui';

    export default {
        props: ['banner'],
        data() {
            return {}
        },
        computed: {
            bannerImg() {
                return this.banner
            }
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .banner {
        .mint-swipe {
            height: 750px;
            .mint-swipe-items-wrap {
                .mint-swipe-item {
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .mint-swipe-indicators {
                .mint-swipe-indicator {
                    width: 18px;
                    height: 18px;
                    margin: 0 10px;
                }
                .is-active {
                    background-color: red;
                }
            }
        }
    }
</style>
