<template>
    <div class="logistics">
        <div class="logisticsCompany">
            <b>物流公司：</b>
            <p>物流单号：</p>
            <p>物流电话：</p>
        </div>
        <div class="logisticsDetail">
            <ul>
                <li v-for="item,index in 2" :class="index=='0'?'active':''">
                    <div class="fl">
                        <span></span>
                    </div>
                    <div class="fr">
                        <p>物流地址-状态</p>
                        <p>时间</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "logistics",
        data() {
            return{

            }
        }
    }
</script>

<style scoped lang="scss">
    .logistics {
        > div {
            background-color: #fff;
            margin-bottom: 20px;
            padding: 20px;
        }
        .logisticsCompany {
            b {
                display: block;
                font-size: 30px;
                margin-bottom: 10px;
            }
            p {
                padding: 2px 0;
                color: #999;
            }
        }
        .logisticsDetail {
            ul {
                li {
                    display: flex;
                    justify-content: flex-start;
                    margin-left: 20px;
                    border-left: 1px solid #ccc;
                    .fl {
                        position: relative;
                        span {
                            position: absolute;
                            display: block;
                            width: 40px;
                            height: 40px;
                            left: 50%;
                            margin-left: -20px;
                            top: 50%;
                            margin-top: -20px;
                            border: 2px solid #999;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                            background-color: #fff;
                            &:after {
                                position: absolute;
                                content: '';
                                width: 24px;
                                height: 24px;
                                left: 50%;
                                margin-left: -12px;
                                top:50%;
                                margin-top: -12px;
                                background-color: #999;
                                border-radius: 50%;
                            }
                        }
                    }
                    .fr {
                        width: 100%;
                        margin-left: 40px;
                        padding: 40px 0;
                        border-bottom: 1px solid #ccc;
                    }
                }
                .active {
                    .fl {
                        span {
                            border: 2px solid red;
                            &:after {
                                background-color: red;
                            }
                        }
                    }
                    .fr {
                        p {
                            color: red;
                        }
                    }

                }
            }
        }
    }

</style>
