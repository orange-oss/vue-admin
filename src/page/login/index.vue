<template>
    <div class="login-box">
        <img src="@/images/logo.jpg" alt="" class="logo" />
        <el-form :model="loginForm" status-icon ref="loginForm">
            <el-form-item prop="username" class="form-item">
                <el-input
                    v-model="loginForm.username"
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
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            checked: true // 复选框
        }
    },
    methods: {
        loginSubmit() {
            this.$store.dispatch('user/login', this.loginForm)
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
