<template>
    <div class="login">
        <div class="logo">
            <img src="../../images/login_logo.png" alt="这里是logo">
        </div>
        <div class="form">
            <div class="mobile">
                <input type="tel" v-model="mobile" placeholder="请输入手机号" @blur="checkMobile">
            </div>
            <div class="captcha">
                <input type="text" v-model="captcha" placeholder="请输入验证码" @blur="checkCaptcha">
                <span @click="getCaptcha">获取验证码</span>
            </div>
            <div class="loginBtn">
                <button @click="submitBtn">登录</button>
            </div>
            <div class="tip">
                <mt-checklist
                    v-model="checkVal"
                    :options="checkOptions">我已阅读并同意
                </mt-checklist>
                <router-link to="">拼趣多用户协议</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';

    export default {
        name: "index",
        data() {
            return {
                mobile:'',
                captcha:'',
                checkOptions:[
                    {
                        label:'我已阅读并同意',
                        value:'1'
                    }
                ],
                checkVal:['1'],

                userInfo:'',   //登录成功后的用户信息
            }
        },
        methods:{
            // 手机号验证
            checkMobile() {
                if (this.mobile == '') {
                    Toast({
                        message:'请填写手机号',
                        duration:1200
                    })
                } else if (!/^1[34578]\d{9}$/.test(this.mobile)) {
                    Toast({
                        message:'请填写正确的手机号',
                        duration:1200
                    })
                }
            },
            // 获取验证码
            getCaptcha() {},
            // 验证码验证
            checkCaptcha() {},
            // 登录
            submitBtn() {
                this.$post('login/login',{
                    type:1,
                    mobile:this.mobile,
                    sms_code:this.captcha
                })
                    .then(res=>{
                        this.userInfo = res
                        this.$token = res.token
                        this.$local.set('userInfo',this.userInfo)
                        Indicator.open('登陆中...');
                        setTimeout(()=>{
                            Indicator.close()
                            location.reload()
                        },600)
                        this.$router.push(this.$session.get('loginBeforeUrl'))
                    })
            }
        }
    }
</script>
<style lang="scss">
    .tip {
        .mint-checklist {
            margin: 0;
            padding: 0;
            .mint-checklist-title {
                margin: 0;
            }
            .mint-checkbox-core {
                width: 32px;
                height: 32px;
            }
            .mint-checkbox-input:checked + .mint-checkbox-core {
                background-color:#ff4862;
                border-color:#ff4862;
            }
            .mint-checkbox-core::after {
                width: 12px;
                height: 20px;
                left: 8px;
                top: 0px;
            }
            .mint-checklist-label {
                padding: 0;
            }
            .mint-checkbox-label {
                color: #999;
            }
        }
    }
</style>
<style scoped lang="scss">
    .login {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        .logo {
            padding: 52px 0 160px;
            img {
                width: 256px;
                height: 144px;
                margin: 0 auto;
            }
        }
        .form {
            > div {
                width: 600px;
                height: 98px;
                margin: 0 auto;
                font-size: 32px;
                input {
                    width: 100%;
                    padding: 26px 0;
                    font-size: 32px;
                    border: none;
                    border-bottom:2px solid #eee;
                }
                button {
                    width: 100%;
                    height: 98px;
                    border-radius: 8px;
                    background-color:#ff4862;
                    box-shadow: 0 0 4px #ff464e;
                }
            }
            .captcha {
                position: relative;
                margin: 26px auto 100px;
                span {
                    position: absolute;
                    right: 0;
                    top: 20px;
                    color: #4c4c4c;
                }
            }
            .tip {
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                font-size: 24px;
                a {
                    color: #ff4862;
                    margin-top: -4px;
                }
            }
        }
    }
</style>
