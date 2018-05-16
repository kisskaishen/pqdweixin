<template>
    <div class="myCoupon"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100">
        <mt-navbar v-model="selected" v-if="this.$route.query.from!='pay'" fixed>
            <mt-tab-item id="1">未使用</mt-tab-item>
            <mt-tab-item id="2">已使用</mt-tab-item>
            <mt-tab-item id="3">已过期</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <coupon :list="couponList"></coupon>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <coupon :list="couponList"></coupon>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <coupon :list="couponList"></coupon>
            </mt-tab-container-item>
        </mt-tab-container>
        <router-link to="/coupon">领取优惠券</router-link>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>

    </div>
</template>

<script>
    import Coupon from '../../components/user/coupon';
    import {Toast} from 'mint-ui';

    export default {
        name: "my-coupon",
        data() {
            return {
                selected: '1',
                loading: false,
                couponList: [],
                page: 0,
                iconTopShow: false
            }
        },
        components: {Coupon},
        mounted() {
            window.addEventListener('scroll', this.handScroll)
        },
        methods: {
            getCoupon(page) {
                this.$post('user/getCouponList', {
                    type: this.selected,
                    token: this.$token,
                    page: page
                })
                    .then(res => {
                        if (page == '1') {
                            this.couponList = res.list
                        } else {
                            if (res.list == '') {
                                Toast({message: '没有数据啦', duration: 1000})
                            } else {
                                this.couponList = this.couponList.concat(res.list)
                            }
                        }
                    })
            },
            loadMore() {
                this.loading = true
                this.page++;
                this.getCoupon(this.page)
                this.loading = false
            },
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },

            // 监听滚动方法
            handScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 156) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            }
        },
        watch: {
            selected(val) {
                this.couponList = []
                this.selected = val
                this.page = 1
                this.toTopClick()
                this.getCoupon(this.page)

            }
        }
    }
</script>

<style lang="scss">
    .myCoupon {
        .mint-navbar {
            .is-selected {
                color: #f61027;
                border-bottom-color: #f61027;
            }
        }
        .mint-tab-container {
            margin-top: 72px;
        }
    }
</style>
<style scoped lang="scss">
    .myCoupon {
        position: relative;
        > a {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 78px;
            line-height: 78px;
            color: #fff;
            background-color: red;
        }
    }

</style>
