<template>
    <div class="service">
        <div class="goods">
            <p>退款商品</p>
            <div class="goodsInfo">
                <img src="https://cdn2.pinquduo.cn/5aefb4f2a99dd74652.jpg" alt="商品图片">
                <span>商品名称</span>
            </div>
        </div>
        <div class="type">
            <div class="typeDiv typeSelect">
                <p><span class="icon red">*</span>退款方式</p>
                <select v-model="refundType">
                    <option v-for="item,index in refundTypes" :value="item">{{item}}</option>
                </select>
            </div>
            <div class="typeDiv typeInput">
                <p><span class="icon red">*</span>退款额度（元）<span class="tip">(最高可退款***金额)</span></p>
                <input type="number" v-model="refundMoney" placeholder="退款金额">
            </div>
            <div class="typeDiv typeSelect">
                <p><span class="icon red">*</span>退款理由</p>
                <select v-model="refundReason">
                    <option v-for="item,index in refundReasons" :value="item">{{item}}</option>
                </select>
            </div>
            <div class="typeDiv typeInput">
                <p><span class="icon red">*</span>退款说明</p>
                <textarea v-model="refundRemark" rows="5" placeholder="请输入问题可增加退款/退货的成功几率"></textarea>
            </div>
            <div class="typeDiv typeImg">
                <p><span class="icon red">*</span>上传凭证<span class="tip">(最多三张)</span></p>
                <div class="typeImgList">
                    <div class="imgList" v-for="item,index in imgList">
                        <i class="red" @click="deleteImg(item,index)">x</i>
                        <img src="https://cdn2.pinquduo.cn/5aefb4f2a99dd74652.jpg" alt="">
                    </div>
                    <div class="addImg" v-if="imgList.length<3">
                        <input type="file">
                        <span>+</span>
                    </div>
                </div>
                <span>最多不超过3张图</span>
                <span>照片大小不超过5M，支持png、jpg</span>
            </div>

        </div>
        <div class="applyBtn">
            <mt-button size="large" type="danger" @click="submitApply">提交申请</mt-button>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "applyAfterService",
        data() {
            return {
                // 退款方式
                refundTypes: ['请选择退款方式', '退款退货', '我要换货'],
                refundType: '请选择退款方式',
                // 退款金额
                refundMoney: '',
                // 退款理由
                refundReasons: ['请选择退款理由', '未收货', '卖家发错货', '尺寸拍错，不喜欢，效果差', '假冒品牌', '收到商品少件或破损', '大小尺寸与商品描述不符', '材料面料与商品描述不符', '材料款式图案与商品描述不符', '质量问题', '其他原因'],
                refundReason: '请选择退款理由',
                // 退款说明
                refundRemark: '',
                // 上传凭证
                imgList: ['https://cdn2.pinquduo.cn/5aefb4f2a99dd74652.jpg', 'https://cdn2.pinquduo.cn/5aefb4f2a99dd74652.jpg', 'https://cdn2.pinquduo.cn/5aefb4f2a99dd74652.jpg'],

            }
        },
        methods: {
            // 删除图片
            deleteImg(val, index) {
                this.imgList.splice(index, 1)
            },
            // 提交申请
            submitApply() {
                if (this.refundType == '请选择退款方式') {
                    Toast({
                        message: '请选择退款方式',
                        duration: 1400
                    })
                } else if (this.refundMoney == '' || this.refundMoney == '0') {
                    Toast({
                        message: '请输入退款金额',
                        duration: 1400
                    })
                } else if (this.refundReason == '请选择退款理由') {
                    Toast({
                        message: '请选择退款理由',
                        duration: 1400
                    })
                } else if (this.refundRemark == '') {
                    Toast({
                        message: '请填写退款说明',
                        duration: 1400
                    })
                } else if (this.imgList == []) {
                    Toast({
                        message: '请上传凭证',
                        duration: 1400
                    })
                } else {
                    console.log('调用提交接口')
                    Toast({
                        message: '申请已提交，请等待商家处理~',
                        duration: 1600
                    })
                    this.$router.push('/user/order?id=5')
                }
            },

        },
    }
</script>

<style scoped lang="scss">
    .service {
        padding-bottom: 100px;
        .goods {
            margin: 20px 0;
            padding: 30px 20px;
            background-color: #fff;
            > p {
                font-size: 28px;
                margin-bottom: 6px;
            }
            .goodsInfo {
                display: flex;
                justify-content: flex-start;
                img {
                    width: 136px;
                    height: 136px;
                    border: 1px solid red;
                    margin-right: 20px;
                }

            }
        }

        .type {
            background-color: #fff;
            .typeDiv {
                display: flex;
                justify-content: flex-start;
                padding: 30px 20px;
                border-bottom: 2px dashed #ececec;
                > p {
                    color: #333;
                    font-size: 28px;
                    .red {
                        margin-right: 8px;

                    }
                    .tip {
                        font-size: 24px;
                        color: #999;
                    }
                }

            }
            .typeSelect {
                position: relative;
                align-items: center;
                select {
                    border: none;
                    flex: 1;
                    padding: 4px 8px 10px;
                    font-size: 28px;
                }
                &:after {
                    position: absolute;
                    content: '';
                    right: 40px;
                    top: 50%;
                    margin-top: -10px;
                    width: 20px;
                    height: 20px;
                    border-right: 1px solid #999;
                    border-top: 1px solid #999;
                    transform: rotate(45deg);
                }
            }
            .typeInput {
                flex-direction: column;
                input {
                    padding: 30px;
                    border: none;
                }
                textarea {
                    border: none;
                    padding: 20px;
                    resize: none;
                }
            }
            .typeImg {
                flex-direction: column;
                > span {
                    font-size: 24px;
                }
                .typeImgList {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .imgList {
                        display: inline-block;
                        position: relative;
                        margin-right: 20px;
                        img {
                            width: 120px;
                            height: 120px;
                        }
                        .red {
                            position: absolute;
                            right: -15px;
                            top: -15px;
                            width: 30px;
                            height: 30px;
                            text-align: center;
                            color: #fff;
                            background-color: red;
                            -webkit-border-radius: 50%;
                            -moz-border-radius: 50%;
                            border-radius: 50%;
                        }
                    }
                    .addImg {
                        position: relative;
                        input[type='file'] {
                            position: absolute;
                            width: 120px;
                            height: 120px;
                            opacity: 0;
                        }
                        span {
                            display: block;
                            width: 120px;
                            height: 120px;
                            line-height: 120px;
                            overflow: hidden;
                            border: 1px dashed #ccc;
                            font-size: 80px;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .applyBtn {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }

</style>
