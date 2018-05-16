<template>
    <div>
        <div class="groupInfo detailsDiv">
            <!--<div class="tip">{{groupInfo.group_buy.length}}人拼团中，可直接参与</div>-->
            <div class="groupBody">
                <div class="bodyList divDiv" v-for="item,index in groupList" :key="item.group_id">
                    <div class="bodyListFl divFl">
                        <img :src="item.photo" alt="头像">
                        <span>{{item.nicke_name}}</span>
                    </div>
                    <div class="bodyListFr divFr">
                        <div class="frTime">
                            <p>还差<span>{{item.order_pay_num}}人</span>成团</p>
                            <p>
                                <count-down :endTime="item.end_time"></count-down>
                            </p>
                        </div>
                        <div>
                            <router-link :to="'/group/detail?group_id='+item.group_id">参与拼单</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import countDown from '../../components/groupCountDown'

    export default {
        data() {
            return {
                groupList: [],

            }
        },
        mounted() {
            this.getGroupList()
        },
        components: {countDown},
        methods: {
            getGroupList() {
                this.$post('group/getGoodsGroupList', {
                    goods_id: this.$route.query.goods_id
                })
                    .then(res => {
                        this.groupList = res.list
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .groupInfo {
        .tip {
            padding: 0 0 10px 0;
            font-size: 30px;
        }
        .groupBody {
            .bodyList {
                display: flex;
                justify-content: space-between;
                -webkit-border-radius: 60px;
                -moz-border-radius: 60px;
                border-radius: 60px;
                margin-bottom: 16px;
                background-color: #eee;
                .bodyListFl {
                    flex: 1;
                    img {
                        width: 72px;
                        height: 72px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        border: none;
                    }
                    span {
                        width: 240px;
                    }
                }
                .bodyListFr {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    align-content: center;
                    justify-content: space-between;
                    .frTime {
                        span {
                            color: red;
                        }
                    }
                    a {
                        display: block;
                        width: 120px;
                        height: 98px;
                        line-height: 98px;
                        margin-left: 40px;
                        background-color: red;
                        color: #fff;
                        -webkit-border-radius: 0 60px 60px 0;
                        -moz-border-radius: 0 60px 60px 0;
                        border-radius: 0 60px 60px 0;
                    }
                }
            }
        }
    }
</style>
