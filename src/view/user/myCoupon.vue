<template>
    <div class="myCoupon">
        <mt-navbar v-model="selected" v-if="this.$route.query.from!='pay'">
            <mt-tab-item id="0">未使用</mt-tab-item>
            <mt-tab-item id="1">已使用/已过期</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="0">
                <coupon :list="couponList"></coupon>
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
                <coupon :list="couponList"></coupon>
            </mt-tab-container-item>
        </mt-tab-container>
        <router-link to="/coupon">领取优惠券</router-link>
    </div>
</template>

<script>
    import Coupon from '../../components/user/coupon';
    import { Toast } from 'mint-ui';

    export default {
        name: "my-coupon",
        data() {
            return {
                selected: '0',
                coupon:{},
                couponList:[]
            }
        },
        components: { Coupon },
        mounted() {
            this.getCoupon()
        },
        methods:{
            getCoupon() {
                this.$post('user/getCouponList',{
                    user_id: this.$getCookie('user_id'),
                    state:this.selected == '0'?'0':'1'
                })
                    .then(res=>{
                        this.couponList = []
                        this.coupon = res.result
                        if (res.result.items == '') {
                            Toast({message:'没有数据啦',duration:1000})
                        } else {
                            this.couponList = res.result.items
                        }
                    })
            }
        },
        watch:{
            selected(val) {
                this.selected = val
                this.getCoupon()
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
            margin-top: 40px;
        }
    }
</style>
<style scoped lang="scss">
    .myCoupon {
        position: relative;
        >a {
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
