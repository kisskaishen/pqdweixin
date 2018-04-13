<template>
    <div class="address">
        <div class="addressDiv detailsDiv" v-for="item,index in addressList" :key="item.address_id">
            <div class="divFl">
                <i></i>
                <div>
                    <p>{{item.consignee}} {{item.mobile}}</p>
                    <p>{{item.address_base}}{{item.address}}</p>
                </div>
            </div>
        </div>
        <div class="payBtn">
            <router-link to="/address/addAddress">
                <mt-button type="danger">新增收货地址</mt-button>
            </router-link>
        </div>
    </div>
</template>

<script>
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
                this.$post('goods/getUserAddressList', {
                    user_id: '2556555'
                })
                    .then(res => {
                        this.addressList = res.result.address
                    })
                    .catch(err => {
                        console.log(err)
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
                p {
                    text-align: left;
                    padding: 4px 0;
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
