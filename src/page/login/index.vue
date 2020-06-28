<template>
    <div class="login-box">
        <img src="@/images/logo.jpg" alt="" class="logo" />
        <el-form :model="loginForm" status-icon ref="loginForm">
            <el-form-item prop="userName" class="form-item">
                <el-input
                    v-model="loginForm.userName"
                    autocomplete="off"
                    placeholder="admin"
                >
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" class="form-item">
                <el-input
                    type="password"
                    v-model="loginForm.password"
                    autocomplete="off"
                    placeholder="password"
                >
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="loginSubmit"
                    class="login-submit"
                    >登录</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import loginApi from '@/api/login.js'
import sidebarMenu from '@/config/menu.js'
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                userName: '',
                paspasswords: ''
            },
            checked: true // 复选框
        }
    },
    methods: {
        loginSubmit() {
            const param = this.loginForm
            loginApi.login(param).then(data => {
                // 按理说token userName  sidebarMenu 都是从后台拿回的数据 但是目前没有接口 暂时先写死
                const token = '123456'
                // 普通用户和高级用户两种角色
                // 普通用户没有下载海报的功能
                sidebarMenu[1].children[2].show = false
                console.log(sidebarMenu);               
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('userName', this.loginForm.userName)
                sessionStorage.setItem(
                    'sidebarMenu',
                    JSON.stringify(sidebarMenu)
                )
                this.$store.dispatch('user/saveSidebarMenu', sidebarMenu)
                this.$store.dispatch(
                    'user/saveUserName',
                    this.loginForm.userName
                )
                this.$store.dispatch('user/saveToken', token)
                console.log(data)
                this.$router.push({
                    name: 'Home'
                })
            })
        }
    }
}
</script>

<style lang="less" scoped>
// 登录页所有input的高度
@inputWidth: 440px;
.login-box {
    height: 100vh;
    width: 100%;
    background-color: #2d3a4b;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .form-item {
        height: 60px;
    }
    .logo {
        width: 90px;
        height: 90px;
        margin-bottom: 20px;
    }
    .el-icon-user {
        font-size: 18px;
    }
    .el-icon-lock {
        font-size: 18px;
    }
    .login-submit {
        width: @inputWidth;
    }
    /Deep/ .el-input__inner {
        width: @inputWidth;
        height: 50px;
        // input的背景色改成#283443
        box-shadow: 0 0 0px 1000px #283443 inset;
        // input中的text文字改成#fff
        -webkit-text-fill-color: #fff;
        border-radius: 5px;
    }
}
</style>
