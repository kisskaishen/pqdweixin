<template>
    <div class="address">
        <mt-field label="收件人" placeholder="请输入收件人姓名" v-model="username" :state="nameState"></mt-field>
        <mt-field label="联系电话" type="number" placeholder="请输入联系电话" v-model="userTel" :state="telState"></mt-field>
        <mt-field label="所在地区" class="addressDiv">
            <p @click="showAreaChange">{{address||'请选择所在地区'}}</p>
        </mt-field>
        <mt-field label="详细地址" placeholder="街道、小区" v-model="detailAddress" :state="detailState"></mt-field>

        <mt-checklist
            v-model="checkbox"
            :options="options">
        </mt-checklist>

        <div class="sureBtn">
            <mt-button type="danger" size="large" @click.native="saveAdd">保存地址</mt-button>
        </div>
        <div class="bg" v-if="showArea" @click="sureAddress"></div>
        <mt-picker v-if="showArea" :slots="myAddressSlots" value-key="region_name" @change="onMyAddressChange"></mt-picker>
        <div class="payBtn">
            <mt-button v-if="showArea" type="danger" @click="sureAddress">确定</mt-button>
        </div>

    </div>
</template>

<script>
    import myaddress from '../../components/area.json'
    import {Toast} from 'mint-ui';

    export default {
        name: "addAddress",
        data() {
            return {
                username: '',
                userTel: '',
                address: '',
                detailAddress: '',
                nameState: '',
                telState: '',
                detailState: '',
                checkbox: [],
                options:[
                    {
                        label:'设为默认地址',
                        value:'1'
                    }
                ],

                myAddressSlots: [
                    {
                        flex: 1,
                        defaultIndex: 1,
                        values: myaddress,
                        className: 'slot1',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    },
                    {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '-',
                        className: 'slot4'
                    },
                    {
                        flex: 1,
                        values: [],
                        className: 'slot5',
                        textAlign: 'center'
                    }
                ],
                showArea: false,
                provinceId: '',
                cityId: '',
                districtId: '',
            }
        },

        mounted() {
            // this.getAddress()
            // 获取三级联动信息
            this.$nextTick(() => {
                this.myAddressSlots[0].defaultIndex = 0
            });
        },
        methods: {
            // 显示三级联动
            showAreaChange() {
                this.showArea = true

            },
            // 隐藏三级联动
            sureAddress() {
                this.showArea = false
            },
            // // 获取三级联动信息
            // getAddress() {
            //     this.$post('common/getRegion',{
            //         region_type:4
            //     })
            //         .then((res)=>{
            //             this.addressArr = res
            //         })
            // },
            // 三级联动数据
            onMyAddressChange(picker, values) {
                if (values[0]) {  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                    picker.setSlotValues(1, values[0].children); // Object.keys()会返回一个数组，当前省的数组
                    if(values[1]) {
                        picker.setSlotValues(2, values[1].children); // 区/县数据就是一个数组
                    }
                    this.address = values[0].region_name + '' + values[1].region_name + '' + values[2].region_name;
                    this.provinceId=values[0].region_id
                    this.cityId=values[1].region_id
                    this.districtId=values[2].region_id
                } else {
                    this.$nextTick(()=>{
                        picker.setValues([values[0],values[0].children[0],values[0].children[0].children[0]])
                    })
                }
            },
            // 保存地址
            saveAdd() {
                if (this.nameState == this.userTel == this.detailAddress == 'error' || this.nameState == '' || this.userTel == '' || this.detailAddress == '') {
                    let instance = Toast('请填写正确的地址信息');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                } else {
                    this.$post('user/handleAddress', {
                        address_id: this.$route.query.type == '2' ? this.$route.query.address_id : '',        // 修改地址的id
                        token: this.$token,
                        type: this.$route.query.type,            // '添加'=>'1','修改'=>'2'
                        consignee: this.username,
                        province: this.provinceId,
                        city: this.cityId,
                        district: this.districtId,
                        is_default: this.checkbox.join() == '1' ? '1' : '0',     //  0：不默认 1：默认地址
                        address_base: this.address,
                        address: this.detailAddress,
                        mobile: this.userTel,
                    })
                        .then(res => {
                            Toast('添加成功');
                            setTimeout(() => {
                                this.$router.push('/address')
                            }, 1000);

                        })
                }
            }
        },
        watch: {
            username() {
                if (this.username) {
                    this.nameState = 'success'
                } else {
                    this.nameState = 'error'
                }
            },
            userTel() {
                if (this.userTel) {
                    this.telState = 'success'
                } else {
                    this.telState = 'error'
                }
            },
            // address() {
            //     if (this.address) {
            //         this.addressState = 'success'
            //     } else {
            //         this.addressState = 'error'
            //     }
            // },
            detailAddress() {
                if (this.detailAddress) {
                    this.detailState = 'success'
                } else {
                    this.detailState = 'error'
                }
            },

        }
    }
</script>

<style lang="scss">
    .address {
        .addressDiv {
            .mint-field-core, .mint-field-state {
                display: none;
            }

            .mint-field-other {
                width: 100%;
                text-align: left;
                text-indent: 28px;
                color: #888;
                font-size: 25px;
            }
        }

        .mintui {
            font-size: 40px;
        }
        input {
            text-indent: 20px;
        }
        .mint-checklist {
            .mint-checklist-label {
                text-align: right;
            }
            .mint-checkbox-core {
                width: 36px;
                height: 36px;
                &::after {
                    width: 12px;
                    height: 24px;
                    left: 12px;
                    top: 2px;
                }
            }
        }
    }
</style>
<style scoped lang="scss">
    .address {
        .mint-field {
            padding: 20px 0;
            border-bottom: 1px solid #f3f3f3;
        }
        .mint-checklist {
            padding: 20px 0;
            background-color: #fff;
            text-align: right;
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
        .sureBtn {
            .mint-button {
                width: 92%;
                height: 80px;
                line-height: 80px;
                margin: 40px auto 0;
            }
        }

        .picker {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 500px;
            background-color: #fff;
        }
        .bg {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(0, 0, 0, .6);
        }
    }
</style>
