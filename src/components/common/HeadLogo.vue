<template>
    <div class="head-box">
        <span>欢迎您 , {{ username }}</span>
        <i class="el-icon-user-solid"></i>
        <span class="sign-out" @click="logOut">退出</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'HeadLogo',
    computed: {
        ...mapGetters(['username']),
    },
    methods: {
        logOut() {
            this.$store.dispatch('user/logOut')
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../theme/base.less';
.head-box {
    height: 60px;
    background-color: @headBarColor;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    .el-icon-user-solid {
        margin-left: 10px;
        font-size: 20px;
    }
    .sign-out {
        cursor: pointer;
        color: #007cf9;
        margin-left: 10px;
    }
}
</style>
