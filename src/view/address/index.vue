<template>
    <div class="address">
        <div class="addressDiv detailsDiv" v-for="item,index in addressList" :key="item.address_id"
             @click="goPayPage(item)">
            <div class="divFl">
                <i></i>
                <div>
                    <p>{{item.consignee}} {{item.mobile}} <span v-if="item.is_default=='1'">默认地址</span></p>
                    <p>{{item.address_base}}{{item.address}}</p>
                </div>
            </div>
        </div>
        <div class="payBtn">
            <router-link
                :to="'/address/addAddress?goods_id='+this.$route.query.goods_id+'&goods_number='+this.$route.query.goods_number+'&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id+'&type=1'">
                <mt-button type="danger">新增收货地址</mt-button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "index",
        data() {
            return {
                addressList: [],     // 地址列表
            }
        },
        mounted() {
            this.getAddressList()
        },
        methods: {
            getAddressList() {
                this.$post('user/getAddressList', {
                    token: this.$token
                })
                    .then(res => {
                        if (res.list == '') {
                            Toast('暂无地址')
                        }
                        this.addressList = res.list
                    })
            },
            goPayPage(val) {
                this.$router.push({
                    path: '/pay/index',
                    query: {
                        goods_id: this.$route.query.goods_id,
                        goods_number: this.$route.query.goods_number,
                        spec_key: this.$route.query.spec_key,
                        order_class: this.$route.query.order_class,
                        group_id: this.$route.query.group_id,
                        address_id:val.address_id
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .address {
        padding-bottom: 120px;
        .addressDiv {
            padding: 20px;
            .divFl {
                > div {
                    width: 100%;
                    p {
                        position: relative;
                        width: 100%;
                        text-align: left;
                        padding: 4px 0;
                        span {
                            position: absolute;
                            right: 0;
                            top: 0;
                            width: 96px;
                            color: red;
                        }
                    }
                }

                i {
                    width: 42px;
                    height: 60px;
                    margin-right: 20px;
                    background: url("../../images/icon-address.png") no-repeat center /100%;
                }
            }
        }
        .payBtn {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            .mint-button {
                width: 100%;
                height: 100px;
                font-size: 30px;
            }
        }
    }
</style>
