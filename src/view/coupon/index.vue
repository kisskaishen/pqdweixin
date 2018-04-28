<template>
    <div class="coupon">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">平台优惠券</mt-tab-item>
            <mt-tab-item id="2">商家优惠券</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <coupon :list="couponList"></coupon>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div v-infinite-scroll="loadMore"
                     infinite-scroll-disabled="loading"
                     infinite-scroll-distance="100">
                    <coupon :list="couponList"></coupon>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    import Coupon from '../../components/coupon/coupon';
    import { Toast } from 'mint-ui';
    export default {
        name: "index",
        data() {
            return {
                selected: '1',
                coupon:{},
                couponList:[],
                loading:false,
                page:0
            }
        },
        components: { Coupon },
        mounted() {
            // this.getCoupon(1)
        },
        methods:{
            getCoupon(page) {
                this.$post('coupon/couponList',{
                    user_id: this.$getCookie('user_id'),
                    type:this.selected == '1'?'1':'2',
                    page:page
                })
                    .then(res=>{
                        this.coupon = res
                        if (res.items == '') {
                            Toast({message:'没有数据啦',duration:1000})
                        } else {
                            this.couponList = this.couponList.concat(res.items)
                        }
                    })
            },
            loadMore() {
                this.loading = true
                this.page++;
                this.getCoupon(this.page)
                this.loading = false
            }
        },
        watch:{
            selected(val) {
                this.selected = val
                this.$post('coupon/couponList',{
                    user_id: this.$getCookie('user_id'),
                    type:this.selected == '1'?'1':'2',
                })
                    .then(res=>{
                        this.couponList = []
                        this.coupon = res
                        if (res.items == '') {
                            Toast({message:'没有数据啦',duration:1000})
                        } else {
                            this.couponList = res.items
                        }
                    })
            }
        }
    }
</script>
<style lang="scss">
    .coupon {
        .mint-navbar {
            .is-selected {
                color: #f61027;
                border-bottom-color: #f61027;
            }
        }
        .mint-tab-container {
            margin-top: 40px;
        }
    }
</style>
<style scoped lang="scss">

</style>
