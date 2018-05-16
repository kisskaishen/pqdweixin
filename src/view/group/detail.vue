<template>
    <div class="groupDetail">
        <div class="goods">
            <router-link :to="'/detail/index?goods_id='+groupInfo.goods_info.goods_id">
                <div class="divFl">
                    <img :src="groupInfo.goods_info.list_img" alt="">
                </div>
                <div class="divFr">
                    <p>{{groupInfo.goods_info.goods_name}}</p>
                    <p class="otherInfo">
                        <label>
                            <span>{{groupInfo.goods_info.prom}}人团</span>
                            <span class="red">￥{{groupInfo.goods_info.prom_price}}</span>
                        </label>
                        <label>已经出{{groupInfo.goods_info.sales}}件</label>
                    </p>
                </div>
            </router-link>
            <div class="flow">
                <div>
                    <p>
                        <span style="color: #333;">拼单流程</span>
                        <span style="color: #999;">(若人数不足将自动退款)</span>
                    </p>
                    <p @click="remarkClick">说明></p>
                </div>
                <div>
                    <span><i>1</i>支付开团/参团</span>
                    <span><i>2</i>邀请参团</span>
                    <span><i>3</i>人满成团</span>
                </div>
            </div>
        </div>
        <div class="group">
            <div class="groupImg">
                <div>
                    <div v-for="item,index in groupInfo.list">
                        <img src="../../images/icon-king.png" alt="" class="king">
                        <img :src="item.photo" alt="">
                    </div>
                    <div>
                        <img src="../../images/img-unknown.png" alt="" v-if="groupInfo.list.length != groupInfo.goods_num">
                    </div>
                </div>
                <p v-if="groupInfo.list.length != groupInfo.goods_num">拼团中</p>
                <p v-else>团已满</p>
            </div>
            <div class="groupOperate">
                <mt-button type="danger" size="large">再开一团</mt-button>
                <mt-button type="danger" size="large" class="joinGroup" >立即参团</mt-button>
                <mt-button type="danger" size="large" class="joinGroup" >我要分享</mt-button>
            </div>

        </div>
        <div class="groupList">
        <!--<div class="groupList" v-if="groupInfo.group_status=='2'">-->
            <div v-for="item in groupInfo.list">
                <p><img :src="item.photo" alt="头像"></p>
                <p><span>{{item.nick_name}}</span></p>
                <p><span>{{item.add_time|formatDate}}</span></p>
                <p><span>{{item.is_group=='1'?'开团':'参团'}}</span></p>
            </div>
        </div>
        <div class="groupTip">
            <div>
                <i></i>
                <span>全场包邮</span>
            </div>
            <div>
                <i></i>
                <span>7天退换</span>
            </div>
            <div>
                <i></i>
                <span>48小时发货</span>
            </div>
            <div>
                <i></i>
                <span>假一赔十</span>
            </div>
        </div>
        <div class="goodsList">
            <goods-squared></goods-squared>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "../../config/date";
    import GoodsSquared from "../../components/index/goodsSquared";

    export default {
        name: "group-detail",
        data() {
            return {
                groupInfo: {goods_info:{},list:[]}
            }
        },
        components: {formatDate,GoodsSquared},
        mounted() {
            this.getGroup()
        },
        filters:{
            formatDate(time) {
                let date = new Date(time * 1000)
                return formatDate(date,'yyyy-MM-dd hh:mm:ss')
            }
        },
        methods: {
            getGroup() {
                this.$post('group/getGroupInfo',{
                    group_id:this.$route.query.group_id
                })
                    .then(res=>{
                        console.log(res)
                        this.groupInfo = res
                    })
            },
            // 说明介绍
            remarkClick() {

            }
        }
    }
</script>
<style lang="scss">
    .group {
        .mint-button {
            height: 80px;
            margin: 40px 0;
        }
    }
</style>
<style scoped lang="scss">
    .groupDetail {
        > div {
            width: 100%;
            padding: 20px;
            background-color: #fff;
        }
    }

    .goods {
        padding: 0 !important;
        > a {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            padding: 20px;
            .divFl {
                img {
                    display: block;
                    width: 168px;
                    height: 168px;
                }
            }
            .divFr {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                p {
                    text-align: left;
                    color: #333;
                    font-size: 26px;
                    width: 100%;
                }
                .otherInfo {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    label {
                        span {
                            &:first-child {
                                background-color: rgb(27, 209, 165);
                                color: #fff;
                                padding: 4px 6px;
                            }
                        }
                        &:last-child {
                            color: #999;
                        }
                    }
                }
            }
        }
        .flow {
            width: 100%;
            border-top: 1px solid #eee;
            padding: 10px 20px;
            > div {
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                span {
                    color: #999;
                    i {
                        vertical-align: middle;
                        display: inline-block;
                        width: 26px;
                        height: 26px;
                        color: #fff;
                        background-color: #999;
                        text-align: center;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                    }
                }
            }
        }
    }

    .group {
        margin-top: 20px;
        .groupImg {
            > div {
                display: flex;
                justify-content: center;
                padding: 20px 0;
                > div {
                    position: relative;
                    img {
                        display: block;
                        width: 88px;
                        height: 88px;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        overflow: hidden;
                        margin: 0 4px;
                    }
                    .king {
                        position: absolute;
                        width: 36px;
                        height: 24px;
                        left: 50%;
                        margin-left: -18px;
                        top: -20px;
                        -webkit-border-radius: 0;
                        -moz-border-radius: 0;
                        border-radius: 0;
                    }
                }
            }
            p {
                text-align: center;
                margin-top: 10px;
            }
        }
        .groupOperate {
            .joinGroup {
                width: 200px;
                height: 200px;
                margin: 0 auto;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                font-size: 30px;
            }
        }
    }

    .groupList {
        margin-top: 20px;
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            -webkit-border-radius: 80px;
            -moz-border-radius: 80px;
            border-radius: 80px;
            border: 2px solid #f13d3c;
            margin: 20px auto;
            p {
                flex: 2;
                span {
                    display: block;
                    width: 100%;
                }
                &:nth-child(1) {
                    flex: 1;
                    img {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                    }
                }
                &:nth-child(2) {
                    span {
                        overflow: hidden;
                        -ms-text-overflow: ellipsis;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: 240px;
                    }
                }
                &:nth-child(3) {
                    span {
                    }
                }
                &:nth-child(4) {
                    flex: 1;
                    span {
                        text-align: center;
                    }
                }
            }
        }
    }

    .groupTip {
        display: flex;
        justify-content: space-around;
        color: #666;
        border-top: 1px solid #eee;
        i {
            display: inline-block;
            width: 30px;
            height: 30px;
            vertical-align: middle;
            background: url("../../images/icon-check.png") no-repeat center /100%;
            box-sizing: border-box;
        }
    }
</style>
