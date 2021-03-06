<!--登陆-->
<template>
    <!--登录表单的容器-->
    <div class="login_container"
         style="background-image: url('https://s1.ax1x.com/2022/04/30/OpsuRS.jpg');
                background-repeat: no-repeat;
                background-size: cover">
        <!--登录区域-->
        <div class="login_box">
            <el-form :model="loginForm" :rules="loginRules" class="login_form" ref="loginForm">
                <el-form-item prop="email">
                    <el-input placeholder="请输入邮箱" prefix-icon="Message"
                              v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入登录密码" prefix-icon="Lock"
                              type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="password" v-if="type === 'register'">
                    <el-input placeholder="请重复输入一次登录密码" prefix-icon="Lock"
                              type="password" v-model="loginForm.RePassword"></el-input>
                </el-form-item>
                <el-form-item prop="username" v-if="type === 'register'">
                    <el-input placeholder="请输入用户昵称" prefix-icon="User"
                              v-model="loginForm.userName"></el-input>
                </el-form-item>
                <el-form-item prop="verifyCode">
                    <div class="verifyCode_box">
                        <el-input class="verifyCode" placeholder="请输入验证码"
                                  prefix-icon="Grid"
                                  ref="verifyCode" v-model="loginForm.verifyCode"></el-input>
                        <img @click="captcha" alt="你瞅啥" class="verifyCode_img" v-bind:src="captchaImg">
                    </div>
                </el-form-item>
                <el-form-item prop="mailCode" v-if="type === 'register'">
                    <div class="email_box">
                        <el-input class="mailCode" placeholder="请输入邮箱验证码"
                                  prefix-icon="Watermelon"
                                  ref="mailCode" v-model="loginForm.mailCode"></el-input>
                        <el-button :disabled="!loginForm.verifyCode" @click="getEmailCode()" class="email_button"
                                   type="primary">获取邮箱验证码
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item class="login_btn">
                    <el-button @click="submitForm('loginForm')" type="primary" v-if="type === 'register'">注册</el-button>
                    <el-button @click="submitForm('loginForm')" type="primary" v-else>登陆</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                    <el-button @click="type = 'login'" v-if="type === 'register'">去登陆</el-button>
                    <el-button @click="type = 'register'" v-else>去注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {captcha, getRegisterEmail, login, register} from '@/api/login'
    import {ElNotification} from 'element-plus'
    import {setUser} from "@/utils/token";

    export default {
        name: "LoginComponent",
        data() {
            return {
                type: "login",
                loginForm: {
                    userName: '',
                    password: '',
                    email: '',
                    age: '',
                    telephone: '',
                    verifyCode: '',
                    captchaVerification: '',
                    RePassword: '',
                    mailCode: ''
                },
                captchaImg: null,
                loginRules: {
                    userName: [{
                        required: true,
                        message: '请输入用户名称',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        max: 16,
                        message: '长度在 3 到 16 个字符',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入登录密码',
                        trigger: 'blur'
                    }, {
                        min: 3,
                        max: 16,
                        message: '长度在 3 到 16 个字符',
                        trigger: 'blur'
                    }],
                    RePassword: [{
                        required: true,
                        message: '请重复输入一次登录密码',
                        trigger: 'blur'
                    }],
                    verifyCode: [{
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    }]
                },
            }
        },
        created() {
            this.captcha()
        },
        methods: {
            async submitForm() {
                if (this.type === 'login') {
                    const res = await login(this.loginForm)
                    if (res.success) {
                        setUser(res.data);
                        ElNotification({
                            message: '登陆成功',
                            type: 'success'
                        });
                        await this.$router.push('/blood/home');
                    } else {
                        //重新获取验证码
                        await this.captcha()
                        //验证码获得焦点
                        this.$refs.verifyCode.$el.querySelector('input').focus()
                    }
                } else {
                    if (this.loginForm.RePassword !== this.loginForm.password) {
                        ElNotification({
                            message: '两次输入的密码不相同',
                            type: 'error'
                        })
                        return false;
                    }
                    const res = await register(this.loginForm)
                    if (res.success) {
                        ElNotification({
                            message: '注册成功，快去登陆吧',
                            type: 'success'
                        })
                        //重新获取验证码
                        await this.captcha()
                        //验证码获得焦点
                        this.$refs.verifyCode.$el.querySelector('input').focus()
                        this.type = 'login'
                    } else {
                        //重新获取验证码
                        await this.captcha()
                        //验证码获得焦点
                        this.$refs.verifyCode.$el.querySelector('input').focus()
                    }
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            async captcha() {
                let captchaRes = await captcha()
                this.captchaImg = captchaRes.data.img
                this.loginForm.captchaVerification = captchaRes.data.captchaVerification
                this.loginForm.verifyCode = ''
            },
            async getEmailCode() {
                if (this.loginForm.userName === '' || this.loginForm.email === '' || this.loginForm.verifyCode === '') {
                    ElNotification({
                        message: '请输入用户名或邮箱或验证码',
                        type: 'error'
                    })
                    return false;
                }
                let res = await getRegisterEmail(this.loginForm);
                if (res.success) {
                    ElNotification({
                        message: '发送成功',
                        type: 'success'
                    })
                } else {
                    //重新获取验证码
                    await this.captcha()
                    //验证码获得焦点
                    this.$refs.verifyCode.$el.querySelector('input').focus()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 80px;
        min-height: calc(100vh - 80px);
    }

    .login_box {
        border: 1px solid black;
        margin: 0 auto;
        padding: 20px;
        background-color: #f3f2f2;
        width: 300px;
        border-radius: 18px;

        .login_form {
            width: 100%;

            .login_btn {
                display: flex;
                justify-content: flex-end;
                margin-top: 30px;
                margin-left: 20px;
            }

            .verifyCode_box {
                width: 100%;
                display: flex;

                .verifyCode {
                    width: 50%;
                    justify-content: left;
                }

                .verifyCode_img {
                    width: 50%;
                    height: 30px;
                    justify-content: flex-end;
                }
            }

            .email_box {
                width: 100%;
                display: flex;

                .mailCode {
                    width: 50%;
                    justify-content: left;
                }

                .email_button {
                    width: 50%;
                    height: 30px;
                    justify-content: flex-end;
                }
            }
        }
    }
</style>
