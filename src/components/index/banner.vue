<template>
    <div class="banner">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item,index in banner" :key="item.ad_code">
                <img :src="item.ad_code" :alt="item.ad_name">
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

<style lang="scss">
    .banner {
        .mint-swipe {
            height: 300px;
            .mint-swipe-item {
                img {
                    width: 100%;
                    height: 300px;
                }
            }
            .mint-swipe-indicators {
                .mint-swipe-indicator {
                    width: 18px;
                    height: 18px;
                    margin: 0 10px;
                }
                .is-active {
                    background-color: #df2728;
                }
            }
        }

    }
</style>
