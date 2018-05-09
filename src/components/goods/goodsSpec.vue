<template>
    <transition name="fade">
        <div class="goodsSpec" v-if="specDiv">
            <div class="specBg" @click="closeSpec"></div>
            <div class="specInfo">
                <div class="closeImg" @click="closeSpec">X</div>
                <div class="infoTop divFl">
                    <div class="topImg">
                        <img :src="filterSpec.original" alt="图片">
                    </div>
                    <div class="topTxt">
                        <h5>{{filterSpec.goods_name}}</h5>
                        <b v-if="buyTypeVal == '1'">￥{{promPrice||specPriceInfo.spec_goods_price[0].price}}</b>
                        <b v-if="buyTypeVal == '2'">￥{{promPrice||specPriceInfo.spec_goods_price[0].prom_price}}</b>
                    </div>
                </div>
                <div v-if="specPriceInfo.spec.length == 1">
                    <div class="infoSpec">
                        <p>{{specPriceInfo.spec[0].name}}</p>
                        <ul>
                            <li :class="{'specActive':ind0 == index}"
                                v-for="item,index in specPriceInfo.spec[0].item" :key="item.spec_item_id"
                                @click="specChoose0(item,index)">{{item.item}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div v-if="specPriceInfo.spec.length == 2">
                    <div class="infoSpec">
                        <p>{{specPriceInfo.spec[0].name}}</p>
                        <ul>
                            <li :class="{'specActive':ind0 == index}"
                                v-for="item,index in specPriceInfo.spec[0].item" :key="item.spec_item_id"
                                @click="specChoose0(item,index)">{{item.item}}
                            </li>
                        </ul>
                    </div>
                    <div class="infoSpec">
                        <p>{{specPriceInfo.spec[1].name}}</p>
                        <ul>
                            <li :class="{'specActive':ind1 == index}"
                                v-for="item,index in specPriceInfo.spec[1].item" :key="item.spec_item_id"
                                @click="specChoose1(item,index)">{{item.item}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="infoSpec">
                    <p>数量</p>
                    <div class="number">
                        <button @click="reduceNum" v-if="goodsNumber > 1">-</button>
                        <input type="number" v-model="goodsNumber">
                        <button @click="addNum">+</button>
                    </div>
                </div>
                <div class="infoBtn">
                    <mt-button type="danger" @click.native="specBtn">确认</mt-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['specGoodsInfo', 'isShowSpec', 'buyTypeNum'],
        data() {
            return {
                specPriceInfo: {spec: [{item: []}], spec_goods_price: [{prom_price:''}]},

                ind0: '0',
                ind0Id: '',
                ind1: '0',
                ind1Id: '',
                groupId: '',             // 用于最终的spec_key，或者为group1Id或者为group2Id
                group1Id: '',           // 规格1的id_规格2的id
                group2Id: '',           // 规格2的id_规格1的id
                goodsNumber: 1,
                isDisabled: true,
                promPrice: '',

            }
        },

        computed: {
            filterSpec() {
                return this.specGoodsInfo
            },
            specDiv() {
                return this.isShowSpec
            },
            buyTypeVal() {
                return this.buyTypeNum          // '1'=>'单买 ,'2'=>'拼团'
            }
        },
        mounted() {
            this.getSpecPrice()
        },
        methods: {
            // 获取价格规则getGroup() {
            getSpecPrice() {
                this.$post('goods/getGoodsSpecPrice', {
                    goods_id: this.$route.query.goods_id
                })
                    .then((res) => {
                        this.specPriceInfo = res
                        this.ind0Id = res.spec[0].item[0].spec_item_id
                        this.ind1Id = res.spec.length == '2' ? res.spec[1].item[0].spec_item_id : ''

                    })
            },
            // 点击阴影关闭规格选择弹框
            closeSpec() {
                this.$emit('reviseSpec', false)
            },

            // 规格选择
            specChoose0(val, index) {
                this.ind0 = index
                this.ind0Id = val.spec_item_id           // 点击一个规格，获取到ind0Id值
                if (!this.ind1Id) {                 // 只点击第一个，if 第二个值不存在（不点击），默认为第二个值得第一个
                    this.ind1Id = this.specPriceInfo.spec.length == '2' ? this.specPriceInfo.spec[1].item[0].spec_item_id : ''
                }
                this.group1Id = this.ind0Id + '_' + this.ind1Id         // 当有两个规格的时候，有出现过这种情况    规格1的id_规格2的id/规格2的id_规格1的id,
                this.group2Id = this.ind1Id + '_' + this.ind0Id
                // 循环遍历确定是    规格1的id_规格2的id  还是  规格2的id_规格1的id，然后确定其价格
                for (let i = 0; i < this.specPriceInfo.spec_goods_price.length; i++) {
                    if (this.group1Id == this.specPriceInfo.spec_goods_price[i].key || this.group2Id == this.specPriceInfo.spec_goods_price[i].key) {
                        this.promPrice = this.buyTypeNum == '1' ? this.specPriceInfo.spec_goods_price[i].price : this.specPriceInfo.spec_goods_price[i].prom_price
                        this.groupId = this.group1Id == this.specPriceInfo.spec_goods_price[i].key ? this.group1Id : this.group2Id
                    }
                }
            },
            specChoose1(val, index) {
                this.ind1 = index
                this.ind1Id = val.spec_item_id
                if (!this.ind0Id) {                 // 只点击第二个，if 第一个值不存在（不点击），默认为第一个值得第一个
                    this.ind0Id = this.specPriceInfo.spec[0].item[0].spec_item_id
                }
                this.group1Id = this.ind0Id + '_' + this.ind1Id
                this.group2Id = this.ind1Id + '_' + this.ind0Id
                for (let i = 0; i < this.specPriceInfo.spec_goods_price.length; i++) {
                    if (this.group1Id == this.specPriceInfo.spec_goods_price[i].key || this.group2Id == this.specPriceInfo.spec_goods_price[i].key) {
                        this.promPrice = this.buyTypeNum == '1' ? this.specPriceInfo.spec_goods_price[i].price : this.specPriceInfo.spec_goods_price[i].prom_price
                        this.groupId = this.group1Id == this.specPriceInfo.spec_goods_price[i].key ? this.group1Id : this.group2Id
                    }
                }
            },

            addNum() {
                this.goodsNumber += 1
            },
            reduceNum() {
                this.goodsNumber -= 1
            },


            // 确认按钮
            specBtn() {
                this.groupId = this.specPriceInfo.spec.length == '2'?this.ind0Id + '_' + this.ind1Id:this.ind0Id
                this.$emit('reviseSpec', false)
                this.$router.push({
                    path: '/pay/index',
                    query: {
                        goods_id: this.$route.query.goods_id,
                        goods_number: this.goodsNumber,
                        spec_key: this.groupId,
                        order_class: this.$route.query.group_id ? '0' : this.buyTypeNum,      // 1：单买 2：拼团 3：秒杀 4：免单
                        group_id: this.$route.query.group_id ? this.$route.query.group_id : ''
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodsSpec {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(#000, .6);
        .specBg {
            position: absolute;
            right: 0;
            left: 0;
            top: 0;
            bottom: 0;
        }
        .specInfo {
            position: absolute;
            width: 100%;
            bottom: 0;
            background-color: #fff;
            z-index: 99;
            padding-bottom: 100px;
            .closeImg {
                position: absolute;
                right: 20px;
                top: -25px;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-weight: bolder;
                font-size: 30px;
                color: #000;
                background-color: #fff;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                z-index: 999;
            }
            .infoTop {
                position: relative;
                padding: 0 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .topImg {
                    flex: 1;
                    width: 200px;
                    height: 180px;
                    margin-right: 30px;
                    img {
                        position: absolute;
                        top: -60px;
                        width: 200px;
                        height: 200px;
                        background-color: #fff;
                        border-radius: 16px;
                    }
                }

                .topTxt {
                    flex: 2;

                    b {
                        color: red;
                        font-size: 32px;
                    }
                }

            }

            .infoSpec {
                padding: 0 20px;
                border-bottom: 1px solid #efefef;
                p {
                    padding: 20px 0;
                }
                ul {
                    padding: 10px 20px 30px;
                    li {
                        display: inline-block;
                        padding: 8px 40px;
                        background-color: #f5f5f5;
                        border-radius: 10px;
                        margin-right: 10px;
                        color: #333;
                        font-size: 14px;
                    }
                    .specActive {
                        background-color: red;
                        color: #fff;
                    }
                }
                .number {
                    margin-bottom: 20px;
                    button {
                        padding: 6px 24px;
                        font-size: 36px;
                        border-radius: 4px;
                        font-weight: bolder;
                        color: #333;
                    }
                    input {
                        width: 100px
                    }
                }
            }
        }
        .infoBtn {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99;
            .mint-button {
                width: 100%;
                height: 96px;
            }
        }
    }


</style>
