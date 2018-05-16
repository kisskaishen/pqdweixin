<template>
    <div class="address">
        <div class="addressDiv detailsDiv" v-for="item,index in addressList" :key="item.address_id">
            <div class="divFl">
                <i></i>
                <div>
                    <p>{{item.consignee}} {{item.mobile}} <span v-if="item.is_default=='1'">默认地址</span></p>
                    <p>{{item.address_base}}{{item.address}}</p>
                </div>
            </div>
            <div class="divFr">
                <mt-button type="primary" @click="goPayPage(item)" v-if="buttonStatus">选中</mt-button>
                <mt-button type="danger" @click="deleteAddress(item,index)">删除</mt-button>
            </div>
        </div>
        <div class="payBtn">
            <router-link
                :to="'/address/addAddress?from=user&type=1'" v-if="this.$route.query.from == 'user'">
                <mt-button type="danger">新增收货地址</mt-button>
            </router-link>
            <router-link v-else
                         :to="'/address/addAddress?goods_id='+this.$route.query.goods_id+'&goods_number='+this.$route.query.goods_number+'&spec_key='+this.$route.query.spec_key+'&order_class='+this.$route.query.order_class+'&group_id='+this.$route.query.group_id+'&type=1'">
                <mt-button type="danger">新增收货地址</mt-button>
            </router-link>

        </div>
        <mt-popup
            v-model="popupVisible"
            position="top"
            :modal="modal">
            {{tipText}}
        </mt-popup>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';

    export default {
        name: "index",
        data() {
            return {
                addressList: [],     // 地址列表
                popupVisible: false,
                tipText: '',
                modal: false,       /// 阴影隐藏
                buttonStatus: this.$route.query.from == 'user' ? false : true
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
            // 选中地址
            goPayPage(val) {
                if (this.$route.query.from == 'user') {

                } else {
                    this.$router.push({
                        path: '/pay/index',
                        query: {
                            goods_id: this.$route.query.goods_id,
                            goods_number: this.$route.query.goods_number,
                            spec_key: this.$route.query.spec_key,
                            order_class: this.$route.query.order_class,
                            group_id: this.$route.query.group_id,
                            address_id: val.address_id
                        }
                    })
                }
            },
            // 删除地址
            deleteAddress(val, index) {
                MessageBox.confirm('确定删除此地址?')
                    .then(res => {
                        this.$post('user/delAddress', {
                            token: this.$token,
                            address_id: val.address_id
                        })
                            .then(res => {
                                this.popupVisible = true
                                this.tipText = '删除成功'
                                this.addressList.splice(index, 1)
                                setTimeout(() => {
                                    this.popupVisible = false
                                }, 1000)
                            })
                    })
                    .catch(err => {
                        this.popupVisible = true
                        this.tipText = '取消删除'
                        setTimeout(() => {
                            this.popupVisible = false
                        }, 1000)
                    })
            }
        }
    }
</script>
<style lang="scss">
    .mint-msgbox {
        .mint-msgbox-header {
            padding: 20px 0 0;
            .mint-msgbox-title {
                font-size: 28px;
            }
        }
        .mint-msgbox-content {
            padding: 60px 0;
            .mint-msgbox-message {
                font-size: 30px;
            }
        }
        .mint-msgbox-btns {
            height: auto;
            .mint-msgbox-btn {
                padding: 20px 0;
            }
            .mint-msgbox-cancel {
                color: #888;
            }
        }
    }

    .address {
        .mint-popup {
            width: 100%;
            padding: 30px;
            text-align: center;
            background-color: rgba(0, 0, 0, .7);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            color: #fff;
            font-size: 30px;
        }
    }
</style>
<style scoped lang="scss">
    .address {
        padding-bottom: 120px;
        .addressDiv {
            padding: 20px;
            user-select: none;
            width: 100%;
            position: relative;
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
            .divFr {
                justify-content: flex-end;
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
