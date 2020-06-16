<template>
    <div class="login-box">
        <el-form
            :model="loginForm"
            status-icon
            ref="loginForm"
            label-width="100px"
        >
            <el-form-item label="用户名" prop="userName">
                <el-input
                    v-model="loginForm.userName"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input
                    type="password"
                    v-model="loginForm.pass"
                    autocomplete="off"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import loginApi from '@/api/login.js'
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                userName: '',
                pass: ''
            }
        }
    },
    methods: {
        loginSubmit() {
            const param = this.loginForm
            loginApi.login(param).then(data => {
                const token = '123456'
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('userName', this.loginForm.userName)
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
.login-box {
    height: 100vh;
    width: 100%;
    background-color: #2d3a4b;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
